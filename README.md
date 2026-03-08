# Prospect Finder

Find business prospects by industry and location. Uses browser automation to search the web and scrape contact emails from company websites.

## Setup

1. Create a `.env` file with your Anthropic API key:
```bash
ANTHROPIC_API_KEY=your-api-key-here
```

2. Install dependencies:
```bash
uv sync                    # Install dependencies
uvx browser-use install    # Install Chromium if needed
```

## Usage

Run the scraper:
```bash
uv run scraper.py
```

You'll be prompted to enter:
- **Location** (e.g., Utah, California, Texas)
- **Industry** (e.g., EPC contractor, construction, solar)

The scraper will:
1. Search for companies matching your criteria
2. Visit their websites to find contact emails
3. Save results to `output/prospects_<industry>_<location>.csv`
