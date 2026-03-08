from browser_use import Agent, Browser, ChatAnthropic
from dotenv import load_dotenv
import asyncio
import os
import glob

load_dotenv()

OUTPUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")
os.makedirs(OUTPUT_DIR, exist_ok=True)
CSV_PATH = os.path.join(OUTPUT_DIR, "prospects.csv")

TASK = """
Find business emails in Bozeman, Montana for AI sales outreach.

You already found 3 law firm emails. Now find more from OTHER industries.

DO THIS:
1. Go to google.com
2. Search: accountant Bozeman MT contact email
3. Click on ACTUAL accounting firm websites (not directories)
4. Find their Contact page and look for email addresses
5. Save each email you find using write_file

When you find an email, save it with write_file using:
- file_name: prospects.csv
- append: True  
- content: the business name, industry, email, their actual website URL, and AI opportunity

After accountants, also search for:
- dentist Bozeman MT contact email
- real estate Bozeman MT contact email
- insurance agency Bozeman MT contact email

IMPORTANT:
- Visit REAL business websites, not example.com or placeholder URLs
- Look for actual email addresses on their Contact or About pages
- Skip sites that don't show an email within 30 seconds
- Goal: Find 15-20 more business emails

START NOW: Go to google.com and search for Bozeman accountants
"""


async def main():
    print(f"Output: {CSV_PATH}")
    print("Starting agent...")
    print("="*50)
    
    llm = ChatAnthropic(model="claude-sonnet-4-0", temperature=0.0)
    browser = Browser(headless=True)
    
    agent = Agent(
        task=TASK,
        llm=llm,
        browser=browser,
    )
    
    try:
        await agent.run()
    finally:
        await browser.close()
    
    # Collect all results from temp directories
    print("\n" + "="*50)
    print("Collecting results...")
    
    all_prospects = set()
    
    # Get from temp files
    temp_files = glob.glob("/var/folders/**/browseruse_agent_data/prospects.csv", recursive=True)
    for tf in temp_files:
        try:
            with open(tf, 'r') as f:
                for line in f:
                    line = line.strip()
                    if line and 'business_name' not in line.lower() and 'example' not in line.lower():
                        all_prospects.add(line)
        except:
            pass
    
    # Get existing
    if os.path.exists(CSV_PATH):
        with open(CSV_PATH, 'r') as f:
            for line in f:
                line = line.strip()
                if line and 'business_name' not in line.lower():
                    all_prospects.add(line)
    
    # Write final
    with open(CSV_PATH, 'w') as f:
        f.write("business_name,industry,email,website,ai_opportunity\n")
        for p in sorted(all_prospects):
            f.write(p + '\n')
    
    print(f"Total prospects: {len(all_prospects)}")
    print(f"Saved to: {CSV_PATH}")
    print("\nContents:")
    with open(CSV_PATH, 'r') as f:
        print(f.read())


if __name__ == "__main__":
    asyncio.run(main())
