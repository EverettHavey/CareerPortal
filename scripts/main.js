document.addEventListener('DOMContentLoaded', () => {

    initApp();

    const syncBtn = document.getElementById('linkedin-sync-btn');
    if (syncBtn) {
        syncBtn.addEventListener('click', handleLinkedInSync);
    }

    updateProgressUI();
});

function initApp() {
    console.log("Career Portal Initialized...");
    
    const userData = localStorage.getItem('careerPortal_User');
    if (!userData) {

        const defaultState = {
            isSynced: false,
            targetGoal: "",
            completedMilestones: 0,
            totalMilestones: 5,
            skills: []
        };
        localStorage.setItem('careerPortal_User', JSON.stringify(defaultState));
    }
}

function handleLinkedInSync() {
    const userData = JSON.parse(localStorage.getItem('careerPortal_User'));

    userData.isSynced = !userData.isSynced;
    
    if (userData.isSynced) {
        alert("Connecting to LinkedIn... Profile data pulled successfully!");

        userData.targetGoal = "Data Analyst"; 
        localStorage.setItem('careerPortal_User', JSON.stringify(userData));
        location.reload();
    } else {
        localStorage.removeItem('careerPortal_User');
        location.reload();
    }
}

function updateProgressUI() {
    const userData = JSON.parse(localStorage.getItem('careerPortal_User'));
    const progressFill = document.querySelector('.progress-fill');
    const percentLabel = document.getElementById('percent-complete');

    if (userData && progressFill && percentLabel) {
        const percentage = (userData.completedMilestones / userData.totalMilestones) * 100;
        progressFill.style.width = `${percentage}%`;
        percentLabel.textContent = Math.round(percentage);
    }
}

function logoutUser() {
    localStorage.removeItem('careerPortal_User');
    window.location.href = "index.html";
}