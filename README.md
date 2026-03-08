# Browser-Use Project

AI-powered browser automation using browser-use with Claude.

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

```bash
uv run main.py
```

Edit `main.py` to change the task the agent performs.
