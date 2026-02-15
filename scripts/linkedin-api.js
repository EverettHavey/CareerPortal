const LINKEDIN_CONFIG = {
    clientId: '86xmknsb1mj0jk', 
    redirectUri: window.location.origin + '/index.html',
    scope: 'openid profile email'
};

/**
 * Redirects the user to LinkedIn's official login page
 */
function loginWithLinkedIn() {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${LINKEDIN_CONFIG.clientId}&` +
        `redirect_uri=${encodeURIComponent(LINKEDIN_CONFIG.redirectUri)}&` +
        `state=WDD330_STATE&` +
        `scope=${LINKEDIN_CONFIG.scope}`;

    window.location.href = authUrl;
}

/**
 * Looks for the ?code= parameter in the URL when returning from LinkedIn
 */
function handleAuthCallback() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        console.log("LinkedIn Auth code received:", code);
        completeSync(code);
    }
}

/**
 * Saves the "Synced" status and cleans up the URL
 */
function completeSync(code) {
    let userData = JSON.parse(localStorage.getItem('careerPortal_User')) || {};

    userData.isSynced = true;
    userData.firstName = "Professional"; // Simulated data
    userData.targetGoal = "Data Analyst"; 

    localStorage.setItem('careerPortal_User', JSON.stringify(userData));

    // CLEANUP: Removes the ?code=... from the address bar
    window.history.replaceState({}, document.title, window.location.pathname);
    
    alert("LinkedIn Profile Synchronized!");

    // Safely refresh the progress bar if we are on the Home page
    if (typeof updateProgressUI === "function") {
        updateProgressUI(); 
    }
}

// Automatically check for the code every time a page loads
document.addEventListener('DOMContentLoaded', handleAuthCallback);