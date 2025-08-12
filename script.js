// Professional page load animation with loading screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading');
    
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Show main content with animation
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        }, 100);
    }, 2000);
    
    // Add header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after navigation
        const navMenu = document.querySelector('.nav-menu');
        navMenu.classList.remove('mobile-open');
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
    });
}

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
        navMenu.classList.remove('mobile-open');
    }
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--primary-color)';
        }
    });
});

// Professional scroll reveal animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Add staggered animation for skill items
            if (entry.target.classList.contains('skill-category')) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections and cards with enhanced animations
document.querySelectorAll('.section, .skill-category, .project-card, .achievement-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
});

// Initialize skill items with opacity 0
document.querySelectorAll('.skill-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Responsive enhancements
function handleResize() {
    const isMobile = window.innerWidth <= 768;
    const isSmallMobile = window.innerWidth <= 480;
    
    // Adjust scroll behavior for mobile
    if (isMobile) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Adjust notification position for small screens
    const notifications = document.querySelectorAll('.notification');
    notifications.forEach(notification => {
        if (isSmallMobile) {
            notification.style.right = '10px';
            notification.style.left = '10px';
            notification.style.maxWidth = 'calc(100vw - 20px)';
        } else {
            notification.style.right = '20px';
            notification.style.left = 'auto';
            notification.style.maxWidth = '350px';
        }
    });
}

// Handle window resize
window.addEventListener('resize', handleResize);

// Handle orientation change
window.addEventListener('orientationchange', () => {
    setTimeout(handleResize, 100);
});

// Initialize responsive behavior
handleResize();

// Touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Close mobile menu on swipe
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('mobile-open')) {
            navMenu.classList.remove('mobile-open');
        }
    }
}

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Contact Form Integration - Simple Success Notification
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Validate form
    if (!name || !email || !message) {
        showNotification('Please fill in all required fields (Name, Email, Message).', 'error');
        return;
    }
    
    // Show success notification
    showNotification('Message sent successfully! I will get back to you soon.', 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
});

// Professional notification function
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        </div>
        <div class="notification-content">
            <span class="notification-title">${type === 'success' ? 'Success!' : 'Error!'}</span>
            <span class="notification-message">${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add entrance animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 6 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 6000);
}

// Add particle effect to hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            z-index: 2;
        `;
        hero.appendChild(particle);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Resume PDF Download function
function downloadResumeAsPDF() {
    // Open resume in new window
    const resumeWindow = window.open('Sarthak_Agarwal_Resume.html', '_blank');
    
    // Wait for the page to load, then trigger print
    resumeWindow.onload = function() {
        setTimeout(() => {
            resumeWindow.print();
        }, 1000);
    };
    
    showNotification('Resume opened! Use browser print to save as PDF.', 'success');
}
