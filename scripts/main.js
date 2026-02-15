document.addEventListener('DOMContentLoaded', () => {
    initApp();
    updateProgressUI();
});

function initApp() {
    console.log("Career Portal Initialized...");
    const userData = localStorage.getItem('careerPortal_User');
    
    if (!userData) {
        const defaultState = {
            isSynced: false,
            targetGoal: "",
            skills: [],
            totalMilestones: 4 
        };
        localStorage.setItem('careerPortal_User', JSON.stringify(defaultState));
    }
}

function updateProgressUI() {
    const dataString = localStorage.getItem('careerPortal_User');
    if (!dataString) return;

    const userData = JSON.parse(dataString);
    
    // Select elements carefully
    const progressFill = document.querySelector('.progress-fill');
    const percentLabel = document.getElementById('percent-complete');

    // THE SHIELD: If these aren't found, we stop immediately.
    if (!progressFill || !percentLabel) {
        console.warn("UI Elements for progress not found on this page. Skipping update.");
        return; 
    }

    const completedCount = userData.skills ? userData.skills.length : 0;
    const total = userData.totalMilestones || 4;
    const percentage = (completedCount / total) * 100;

    // Apply updates safely
    progressFill.style.width = `${percentage}%`;
    percentLabel.textContent = Math.round(percentage);
}