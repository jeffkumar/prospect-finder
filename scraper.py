#!/usr/bin/env python3
"""
Prospect scraper using Playwright directly (more reliable than browser-use).
"""

import asyncio
from playwright.async_api import async_playwright
import requests
from bs4 import BeautifulSoup
import re
import csv
import os
from urllib.parse import urlparse, urljoin
from concurrent.futures import ThreadPoolExecutor, as_completed

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
}


def extract_emails(text: str) -> set:
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    emails = set(re.findall(pattern, text.lower()))
    
    filtered = set()
    for email in emails:
        # Skip invalid/junk emails
        if any(x in email for x in ['.png', '.jpg', '.gif', '.svg', '.webp', 
                                     'example.com', 'domain.com', 'sentry.io', 
                                     'wordpress', 'wixpress', 'schema.org', 
                                     'w3.org', '.gov', 'noreply', 'donotreply',
                                     'support@', 'no-reply', 'test@', 'u003e',
                                     'u003c', '%', 'sentry', 'cloudflare']):
            continue
        # Basic validation - must have @ and valid structure
        if '@' in email and '.' in email.split('@')[1]:
            filtered.add(email)
    return filtered


def get_contact_pages(soup: BeautifulSoup, base_url: str) -> list:
    contact_pages = []
    base_domain = urlparse(base_url).netloc
    
    for link in soup.find_all('a', href=True):
        href = link.get('href', '').lower()
        text = link.get_text().lower()
        if any(x in href or x in text for x in ['contact', 'about', 'team', 'leadership']):
            full_url = urljoin(base_url, link['href'])
            if urlparse(full_url).netloc == base_domain:
                contact_pages.append(full_url)
    
    return list(set(contact_pages))[:3]


def extract_description(soup: BeautifulSoup) -> str:
    """Extract a brief description of the business from the page."""
    # Try meta description first (usually best summary)
    meta_desc = soup.find('meta', attrs={'name': 'description'})
    if meta_desc and meta_desc.get('content'):
        desc = meta_desc['content'].strip()
        if len(desc) > 20:
            return desc[:200].strip()
    
    # Try Open Graph description
    og_desc = soup.find('meta', attrs={'property': 'og:description'})
    if og_desc and og_desc.get('content'):
        desc = og_desc['content'].strip()
        if len(desc) > 20:
            return desc[:200].strip()
    
    # Fall back to first meaningful paragraph
    for p in soup.find_all('p'):
        text = p.get_text().strip()
        # Skip short or navigation-like text
        if len(text) > 50 and len(text) < 500:
            # Skip if it looks like boilerplate
            if not any(x in text.lower() for x in ['cookie', 'privacy', 'javascript', 'browser']):
                return text[:200].strip()
    
    return ''


def scrape_website_for_emails(url: str, industry: str) -> list:
    results = []
    all_emails = set()
    
    try:
        resp = requests.get(url, headers=HEADERS, timeout=10, allow_redirects=True)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        
        title = soup.find('title')
        business_name = title.get_text().split('|')[0].split('-')[0].strip()[:60] if title else urlparse(url).netloc
        
        description = extract_description(soup)
        
        all_emails.update(extract_emails(resp.text))
        
        for contact_url in get_contact_pages(soup, url):
            try:
                resp2 = requests.get(contact_url, headers=HEADERS, timeout=10)
                all_emails.update(extract_emails(resp2.text))
            except:
                pass
        
        for email in all_emails:
            results.append({
                'business_name': business_name,
                'industry': industry,
                'email': email,
                'website': urlparse(url).netloc,
                'description': description,
                'ai_opportunity': 'AI automation pilot'
            })
            
    except:
        pass
    
    return results


async def search_for_companies(industry: str, location: str) -> list:
    """Use Playwright to search Bing (less bot detection) and extract company URLs."""
    companies = []
    skip_domains = ['google.', 'youtube.', 'facebook.', 'linkedin.', 'yelp.', 
                   'yellowpages.', 'bbb.org', 'wikipedia.', 'instagram.', 
                   'twitter.', 'mapquest.', 'indeed.', 'glassdoor.', 'manta.',
                   'dnb.com', 'zoominfo.', 'crunchbase.', 'bing.', 'microsoft.',
                   'msn.', 'adobe.', 'amazon.', 'pinterest.', 'tiktok.']
    seen_domains = set()
    
    searches = [
        f"{industry} companies {location}",
        f"{industry} firms {location}",
        f"top {industry} {location}",
    ]
    
    print(f"🔍 Searching for: {industry} in {location}...")
    
    async with async_playwright() as p:
        # Use non-headless so you can see what's happening and solve CAPTCHAs if needed
        browser = await p.chromium.launch(headless=False)
        context = await browser.new_context(
            viewport={'width': 1280, 'height': 800},
        )
        page = await context.new_page()
        
        try:
            for search_query in searches:
                print(f"   Searching: {search_query}")
                
                # Use Bing - less aggressive bot detection
                url = f'https://www.bing.com/search?q={search_query.replace(" ", "+")}'
                await page.goto(url, timeout=30000)
                await asyncio.sleep(3)
                
                # Get page content and extract URLs with regex (more reliable)
                content = await page.content()
                
                # Find all URLs in the page
                url_pattern = r'https?://(?:www\.)?([a-zA-Z0-9][-a-zA-Z0-9]*(?:\.[a-zA-Z0-9][-a-zA-Z0-9]*)+)'
                found_domains = re.findall(url_pattern, content)
                
                for domain in found_domains:
                    domain = domain.lower()
                    if domain and domain not in seen_domains:
                        if not any(skip in domain for skip in skip_domains):
                            seen_domains.add(domain)
                            companies.append({
                                'name': domain,
                                'url': f"https://{domain}",
                                'industry': industry
                            })
                
                print(f"   Found {len(seen_domains)} unique domains so far...")
            
        except Exception as e:
            print(f"   Search error: {e}")
        finally:
            await browser.close()
    
    print(f"   ✓ Total: {len(companies)} company websites")
    return companies


async def main():
    print("="*60)
    print("  PROSPECT SCRAPER")
    print("="*60)
    print()
    
    # Get user input
    location = input("📍 Enter location (e.g., Utah, California, Texas): ").strip()
    if not location:
        location = "Utah"
        print(f"   Using default: {location}")
    
    print()
    industry = input("🏭 Enter industry (e.g., EPC contractor, construction, engineering): ").strip()
    if not industry:
        industry = "EPC contractor"
        print(f"   Using default: {industry}")
    
    # Output file
    safe_location = re.sub(r'[^a-zA-Z0-9]', '_', location.lower())
    safe_industry = re.sub(r'[^a-zA-Z0-9]', '_', industry.lower())
    output_file = os.path.join(OUTPUT_DIR, f"prospects_{safe_industry}_{safe_location}.csv")
    
    print()
    print(f"📁 Output: {output_file}")
    print("-"*60)
    
    # Phase 1: Find companies via search
    print("\n📡 PHASE 1: Finding companies (browser will open)...")
    companies = await search_for_companies(industry, location)
    
    if not companies:
        print("\n❌ No companies found. Try different search terms.")
        return
    
    # Phase 2: Scrape for emails
    print(f"\n📧 PHASE 2: Scraping {len(companies)} websites for emails...")
    
    all_prospects = []
    existing_emails = set()
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {
            executor.submit(scrape_website_for_emails, c['url'], industry): c 
            for c in companies
        }
        
        for future in as_completed(futures):
            try:
                results = future.result()
                for r in results:
                    if r['email'] not in existing_emails:
                        all_prospects.append(r)
                        existing_emails.add(r['email'])
                        desc_preview = r['description'][:50] + '...' if len(r['description']) > 50 else r['description']
                        print(f"   ✓ {r['email']} - {desc_preview}")
            except:
                pass
    
    # Save
    with open(output_file, 'w', newline='') as f:
        fieldnames = ['business_name', 'industry', 'email', 'website', 'description', 'ai_opportunity']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(all_prospects)
    
    print()
    print("="*60)
    print(f"✅ COMPLETE: {len(all_prospects)} prospects saved")
    print(f"📁 File: {output_file}")
    print("="*60)
    
    if all_prospects:
        print("\nResults:")
        for p in all_prospects[:15]:
            print(f"  • {p['email']} ({p['website']})")


if __name__ == "__main__":
    asyncio.run(main())
