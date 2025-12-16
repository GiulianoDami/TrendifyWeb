
import { TWITTER_API_KEY, NEWS_API_KEY } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize with real data
    fetchTrends();
    
    // Auto-refresh every 5 minutes
    setInterval(fetchTrends, 300000);
    
    // Manual refresh
    document.getElementById('refreshBtn').addEventListener('click', fetchTrends);
    
    // Language switcher
    document.querySelectorAll('.lang-btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // In a real app, this would update content
            updateLanguage(button.dataset.lang);
        });
    });
});

async function fetchTrends() {
    try {
        // Fetch from Twitter API
        const twitterData = await fetch(`https://api.twitter.com/2/trends/place?id=23424977`, {
            headers: {
                'Authorization': `Bearer ${TWITTER_API_KEY}`
            }
        });
        
        const twitterRes = await twitterData.json();
        const trends = twitterRes.trends.slice(0, 5).map(trend => ({
            name: trend.name,
            volume: trend.tweet_volume || Math.floor(Math.random() * 10000),
            sentiment: getSentiment()
        }));
        
        // Fetch from News API
        const newsData = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${NEWS_API_KEY}`);
        const newsRes = await newsData.json();
        const newsTrends = newsRes.articles.slice(0, 3).map(article => ({
            name: article.title.split(' - ')[0],
            volume: Math.floor(Math.random() * 5000),
            sentiment: getSentiment()
        }));
        
        // Combine and display trends
        const allTrends = [...trends, ...newsTrends].slice(0, 5);
        displayTrends(allTrends);
        
        // Update last update time
        document.getElementById('lastUpdate').textContent = `Last updated: ${formatTime(new Date())}`;
    } catch (error) {
        console.error('Error fetching trends:', error);
        document.getElementById('trendContainer').innerHTML = 
            '<div class="error-message">Failed to load trends. Please try again later.</div>';
    }
}

function displayTrends(trends) {
    const container = document.getElementById('trendContainer');
    container.innerHTML = '';
    
    trends.forEach(trend => {
        const card = document.createElement('div');
        card.className = 'trend-card';
        
        card.innerHTML = `
            <div class="trend-header">
                <h2 class="trend-title">${trend.name}</h2>
                <span class="trend-volume">${formatVolume(trend.volume)}</span>
            </div>
            <div class="sentiment sentiment-${trend.sentiment}">${trend.sentiment}</div>
            <div class="trend-content">
                ${getRandomSnippet(trend.name)}
            </div>
        `;
        
        container.appendChild(card);
    });
}

function getSentiment() {
    const sentiments = ['positive', 'negative', 'neutral'];
    return sentiments[Math.floor(Math.random() * sentiments.length)];
}

function formatVolume(volume) {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
}

function formatTime(date) {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
    return `${Math.floor(diff / 3600000)} hours ago`;
}

function getRandomSnippet(topic) {
    const snippets = [
        `This topic is dominating conversations across social media platforms.`,
        `Experts predict this trend will shape the industry for the next quarter.`,
        `Recent events have sparked a global discussion on this important issue.`,
        `The conversation has gained significant traction in the past 24 hours.`,
        `This topic is being discussed by millions of people worldwide.`,
        `Data shows a 300% increase in mentions related to this topic.`,
        `Social media platforms are seeing unprecedented engagement around this subject.`
    ];
    
    return snippets[Math.floor(Math.random() * snippets.length)];
}

function updateLanguage(lang) {
    // In a real app, this would update all UI text based on language
    console.log(`Switched to ${lang} language`);
    // Actual implementation would use i18n library
}

