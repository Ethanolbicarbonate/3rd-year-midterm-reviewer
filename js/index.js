// Generate subject cards on the landing page
function generateSubjectCards() {
    const subjectsGrid = document.getElementById('subjectsGrid');
    if (!subjectsGrid) return;
    
    subjectsGrid.innerHTML = '';
    
    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        
        // Create folder path from subject name
        const folderPath = subject.name.toLowerCase().replace(/\s+/g, '-');
        
        card.innerHTML = `
            <div class="subject-icon" style="background: ${subject.color}20; color: ${subject.color}">
                ${subject.icon}
            </div>
            <h2>${subject.name}</h2>
            <p>Comprehensive study materials and review notes</p>
            <span class="chapter-count">${subject.chapters.length} Chapters</span>
        `;
        
        // Make card clickable to go to first chapter
        card.addEventListener('click', () => {
            window.location.href = `subjects/${folderPath}/${subject.chapters[0].id}.html`;
        });
        
        subjectsGrid.appendChild(card);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    generateSubjectCards();
});