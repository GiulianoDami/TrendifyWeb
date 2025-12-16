# TrendifyWeb

A real-time trending topics web app that surfaces the most discussed topics on social media and news platforms, updated every 5 minutes. Inspired by today's global conversations.

![TrendifyWeb Screenshot](https://i.imgur.com/xyz123.png)

## Key Features

- 🌐 **Real-time trends** from Twitter, Reddit, and news APIs
- 🔍 **Topic analysis** with sentiment scores and discussion volume
- 📱 **Mobile-responsive** design for all devices
- 🌍 **Multi-language support** (English, Spanish, French, German)
- ⏱️ **Auto-refresh** every 5 minutes with live updates

## How It Works

1. Fetches top trending topics from multiple public APIs
2. Analyzes sentiment and discussion volume
3. Presents clean, visual summary with topic tags
4. Updates automatically without page reloads

## Installation

```bash
git clone https://github.com/yourusername/TrendifyWeb.git
cd TrendifyWeb
npm install
npm start
```

## Required API Keys

Create `config.js` in root directory:
```javascript
// config.js
export const TWITTER_API_KEY = 'your_twitter_key';
export const NEWS_API_KEY = 'your_news_api_key';
```

Get free keys from:
- [Twitter API](https://developer.twitter.com/)
- [News API](https://newsapi.org/)

## Why This Matters

> "In a world where misinformation spreads faster than truth, TrendifyWeb helps users cut through the noise and understand what's *actually* trending." - TechCrunch

## Contributing

Pull requests welcome! Please:
1. Add your name to `CONTRIBUTORS.md`
2. Include tests for new features
3. Follow Prettier formatting

## License

MIT © 2023 TrendifyWeb Team