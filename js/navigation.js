// Navigation data structure
const subjects = [
    {
        name: "AppDev",
        icon: "📱",
        color: "#2563eb",
        chapters: [
            { id: "unit1", title: "Unit 1: Intro to AppDev" },
            { id: "unit2", title: "Unit 2: Emerging Tech" },
            { id: "unit3", title: "Unit 3: UI and UX" },
            { id: "unit4", title: "Unit 4: VCS" }
        ]
    },
    {
        name: "Techno",
        icon: "🚀",
        color: "#10b981",
        chapters: [
            { id: "unit1", title: "Unit 1" },
            { id: "unit2", title: "Unit 2" },
            { id: "unit3", title: "Unit 3" }
        ]
    },
    {
        name: "Archi",
        icon: "🏛️",
        color: "#f59e0b",
        chapters: [
            { id: "review", title: "Review" },
            { id: "chap1", title: "Chapter 1: Introduction" },
            { id: "chap2", title: "Chapter 2: Computer Systems Organization" },
            { id: "chap3", title: "Chapter 3: The Digital Logic Level" }
        ]
    },
    {
        name: "SoftEng",
        icon: "💻",
        color: "#ef4444",
        chapters: [
            { id: "unit1", title: "Unit 1: Software Quality" },
            { id: "unit2", title: "Unit 2: User-Centered Design" },
            { id: "unit3", title: "Unit 3: Golden Rules of Interface Design" },
            { id: "unit4", title: "Unit 4: Pattern Based Design" },
            { id: "unit5", title: "Unit 5: Review Techniques and SQA" },
            { id: "unit5-1to5-2", title: "Unit 5.1 and 5.2: Cyclomatic Complexity and Reliability, Availability, Maintainability" }
        ]
    }
];

// Generate navigation menu
function generateNavMenu() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;

    navMenu.innerHTML = '';

    // Determine the base path based on the current page's location
    const isChapterPage = window.location.pathname.includes('/subjects/');
    const basePath = isChapterPage ? '../../' : '';

    subjects.forEach(subject => {
        const navItem = document.createElement('div');
        navItem.className = 'nav-item';
        
        const navLink = document.createElement('a');
        navLink.href = '#';
        navLink.className = 'nav-link';
        navLink.innerHTML = `${subject.icon} ${subject.name} <span>▼</span>`;
        
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown';
        
        // Sanitize subject name for URL path
        const subjectPathName = subject.name.split(' ')[0].toLowerCase().replace(/\(|\)/g, '');

        subject.chapters.forEach(Unit => {
            const dropdownItem = document.createElement('a');
            // Use the calculated base path to form the correct URL
            dropdownItem.href = `${basePath}subjects/${subjectPathName}/${Unit.id}.html`;
            dropdownItem.className = 'dropdown-item';
            dropdownItem.textContent = Unit.title;
            dropdown.appendChild(dropdownItem);
        });
        
        navItem.appendChild(navLink);
        navItem.appendChild(dropdown);
        navMenu.appendChild(navItem);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Toggle dropdown on mobile
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const navLink = item.querySelector('.nav-link');
            if (navLink) {
                navLink.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        item.classList.toggle('active');
                    }
                });
            }
        });
    }
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    generateNavMenu();
    initMobileMenu();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { subjects };
}