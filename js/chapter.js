// Chapter page functionality
document.addEventListener('DOMContentLoaded', () => {
    // Generate section links in sidebar
    generateSectionLinks();
    
    // Highlight active section on scroll
    initScrollSpy();
    
    // Setup chapter navigation
    setupChapterNav();
    
    // Add smooth scrolling
    initSmoothScroll();
});

// Generate sidebar section links
function generateSectionLinks() {
    const sectionLinks = document.getElementById('sectionLinks');
    const sections = document.querySelectorAll('.content-section, .memorization-area');
    
    if (!sectionLinks || sections.length === 0) return;
    
    sectionLinks.innerHTML = '';
    
    sections.forEach((section, index) => {
        const title = section.querySelector('h2, .mem-header');
        if (title) {
            const link = document.createElement('a');
            link.href = `#section-${index}`;
            link.textContent = title.textContent.replace(/[📝💡⚠️]/g, '').trim();
            
            // Add ID to section for linking
            section.id = `section-${index}`;
            
            sectionLinks.appendChild(link);
        }
    });
}

// ScrollSpy functionality
function initScrollSpy() {
    const sections = document.querySelectorAll('.content-section, .memorization-area');
    const sectionLinks = document.querySelectorAll('.section-links a');
    
    if (sections.length === 0 || sectionLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = `section-${index}`;
            }
        });
        
        sectionLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Setup chapter navigation
function setupChapterNav() {
    // Get current page info from URL
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/');
    const currentChapter = pathParts[pathParts.length - 1].replace('.html', '');
    const subjectFolder = pathParts[pathParts.length - 2];
    
    // Find current subject
    const currentSubject = subjects.find(s => 
        s.name.toLowerCase().replace(/\s+/g, '-') === subjectFolder
    );
    
    if (!currentSubject) return;
    
    // Find current chapter index
    const currentIndex = currentSubject.chapters.findIndex(c => 
        c.id === currentChapter
    );
    
    // Update navigation buttons
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (prevBtn) {
        if (currentIndex > 0) {
            prevBtn.href = currentSubject.chapters[currentIndex - 1].id + '.html';
            prevBtn.style.display = 'inline-block';
        } else {
            prevBtn.style.display = 'none';
        }
    }
    
    if (nextBtn) {
        if (currentIndex < currentSubject.chapters.length - 1) {
            nextBtn.href = currentSubject.chapters[currentIndex + 1].id + '.html';
            nextBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'none';
        }
    }
}

// Smooth scroll functionality
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Collapsible sections for memorization area
function initCollapsibleSections() {
    const memSections = document.querySelectorAll('.mem-section h3');
    
    memSections.forEach(header => {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            if (content) {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            }
        });
    });
}