const YOUTUBE_CONFIG = {
    apiKey: 'AIzaSyDFkK5dkKtSIZfQCbdpb3nOw3JudB-QaJI', 
    maxResults: 6,
    baseUrl: 'https://www.googleapis.com/youtube/v3/search'
};

async function fetchCareerVideos(query) {
    const videoFeed = document.getElementById('video-feed');
    
    videoFeed.innerHTML = '<p class="loader">Searching for the best tutorials...</p>';

    try {

        const url = `${YOUTUBE_CONFIG.baseUrl}?part=snippet&q=${encodeURIComponent(query + " career tutorial")}&maxResults=${YOUTUBE_CONFIG.maxResults}&type=video&key=${YOUTUBE_CONFIG.apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        displayVideos(data.items);
    } catch (error) {
        console.error("YouTube API Error:", error);
        videoFeed.innerHTML = '<p>Error loading videos. Please check your API key.</p>';
    }
}

function displayVideos(videos) {
    const videoFeed = document.getElementById('video-feed');
    videoFeed.innerHTML = '';

    videos.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumb = item.snippet.thumbnails.medium.url;
        const channel = item.snippet.channelTitle;

        const videoCard = `
            <div class="video-item">
                <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                    <img src="${thumb}" alt="${title}">
                </a>
                <div class="video-info">
                    <h4>${title}</h4>
                    <p>${channel}</p>
                </div>
            </div>
        `;
        videoFeed.innerHTML += videoCard;
    });
}