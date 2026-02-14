
const CAREER_MAPS = {
    "Data Analyst": [
        { step: 1, title: "Data Foundations", skills: ["Excel", "Statistics", "Data Cleaning"] },
        { step: 2, title: "SQL Mastery", skills: ["Queries", "Joins", "Database Design"] },
        { step: 3, title: "Python for Data", skills: ["Pandas", "NumPy", "Matplotlib"] },
        { step: 4, title: "Business Intelligence", skills: ["Tableau", "Power BI", "Storytelling"] }
    ],
    "Web Developer": [
        { step: 1, title: "Frontend Basics", skills: ["HTML5", "CSS3 Flexbox", "JavaScript Basics"] },
        { step: 2, title: "Modern JS & Tooling", skills: ["ES6+", "Git/GitHub", "NPM"] },
        { step: 3, title: "Framework Mastery", skills: ["React", "State Management", "Routing"] },
        { step: 4, title: "Backend & Deployment", skills: ["Node.js", "Express", "Vercel/Netlify"] }
    ]
};

function generateRoadmap(careerGoal) {
    const container = document.getElementById('roadmap-display');
    if (!container) return;

    container.innerHTML = '';

    const path = CAREER_MAPS[careerGoal];

    if (!path) {
        container.innerHTML = `<p class="error">Roadmap for "${careerGoal}" is coming soon!</p>`;
        return;
    }

    path.forEach((item, index) => {
        const stepHTML = `
            <div class="roadmap-step" data-step="${item.step}">
                <div class="step-circle">${item.step}</div>
                <div class="step-info">
                    <h3>${item.title}</h3>
                    <div class="skill-chips">
                        ${item.skills.map(s => `<span class="chip">${s}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += stepHTML;

        if (index < path.length - 1) {
            container.innerHTML += `<div class="roadmap-connector"></div>`;
        }
    });

    console.log(`Roadmap generated for: ${careerGoal}`);
}