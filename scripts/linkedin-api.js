const LINKEDIN_CONFIG = {
    clientId: 'LINKEDIN_CLIENT_ID_HERE', 
    redirectUri: window.location.origin + '/index.html',
    scope: 'openid profile email'
};

function loginWithLinkedIn() {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${LINKEDIN_CONFIG.clientId}&` +
        `redirect_uri=${encodeURIComponent(LINKEDIN_CONFIG.redirectUri)}&` +
        `state=random_string_123&` +
        `scope=${LINKEDIN_CONFIG.scope}`;

    window.location.href = authUrl;
}

function handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        console.log("Auth code received:", code);
        completeSync(code);
    }
}

function completeSync(code) {
    const userData = JSON.parse(localStorage.getItem('careerPortal_User')) || {};

    userData.isSynced = true;
    userData.firstName = "Professional";
    userData.lastName = "User";
    userData.profilePic = "https://via.placeholder.com/150"; 

    userData.targetGoal = "Data Analyst"; 

    localStorage.setItem('careerPortal_User', JSON.stringify(userData));

    window.history.replaceState({}, document.title, window.location.pathname);
    
    alert("LinkedIn Profile Synchronized!");

    if (typeof fetchCareerVideos === "function") {
        fetchCareerVideos(userData.targetGoal); 
    }

    if (typeof generateRoadmap === "function") {
        generateRoadmap(userData.targetGoal); 
    }

    if (typeof updateProgressUI === "function") {
        updateProgressUI(); 
    }
}

document.addEventListener('DOMContentLoaded', handleAuthCallback);