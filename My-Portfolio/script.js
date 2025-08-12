// Professional page load animation with loading screen
window.addEventListener('load', function() {
    try {
        const loadingScreen = document.getElementById('loading');
        
        if (loadingScreen) {
            // Hide loading screen after 2 seconds
            setTimeout(() => {
                try {
                    loadingScreen.classList.add('hidden');
                    
                    // Show main content with animation
                    document.body.style.opacity = '0';
                    document.body.style.transform = 'translateY(20px)';
                    document.body.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    
                    setTimeout(() => {
                        try {
                            document.body.style.opacity = '1';
                            document.body.style.transform = 'translateY(0)';
                        } catch (error) {
                            console.error('Main content animation failed:', error);
                        }
                    }, 100);
                } catch (error) {
                    console.error('Loading screen animation failed:', error);
                }
            }, 2000);
        }
    } catch (error) {
        console.error('Page load animation failed:', error);
    }
    
    // Add header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            try {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            } catch (error) {
                console.error('Header scroll effect failed:', error);
            }
        });
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        try {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu after navigation
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.remove('mobile-open');
            }
        } catch (error) {
            console.error('Smooth scrolling failed:', error);
            // Fallback to regular scrolling
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView();
            }
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
    });
}

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (navMenu && !e.target.closest('.nav')) {
        navMenu.classList.remove('mobile-open');
    }
});

// Add active class to navigation links on scroll
window.addEventListener('scroll', () => {
    try {
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
            try {
                link.style.color = '';
                if (link.getAttribute('href') === `#${current}`) {
                    link.style.color = 'var(--primary-color)';
                }
            } catch (error) {
                console.error('Error updating nav link:', error);
            }
        });
    } catch (error) {
        console.error('Scroll event handler failed:', error);
    }
});

// Professional scroll reveal animation
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        try {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for skill items
                if (entry.target.classList.contains('skill-category')) {
                    const skillItems = entry.target.querySelectorAll('.skill-item');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            try {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0)';
                            } catch (error) {
                                console.error('Skill item animation failed:', error);
                            }
                        }, index * 100);
                    });
                }
            }
        } catch (error) {
            console.error('Intersection observer callback failed:', error);
        }
    });
}, observerOptions);

// Observe all sections and cards with enhanced animations
document.querySelectorAll('.section, .skill-category, .project-card, .achievement-card, .timeline-item').forEach(el => {
    try {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    } catch (error) {
        console.error('Error setting up animation for element:', error);
    }
});

// Initialize skill items with opacity 0
document.querySelectorAll('.skill-item').forEach(item => {
    try {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    } catch (error) {
        console.error('Error setting up skill item animation:', error);
    }
});

// Responsive enhancements
function handleResize() {
    try {
        const isMobile = window.innerWidth <= 768;
        const isSmallMobile = window.innerWidth <= 480;
        
        // Adjust scroll behavior for mobile
        if (isMobile) {
            document.documentElement.style.scrollBehavior = 'smooth';
        }
        
        // Adjust notification position for small screens
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => {
            try {
                if (isSmallMobile) {
                    notification.style.right = '10px';
                    notification.style.left = '10px';
                    notification.style.maxWidth = 'calc(100vw - 20px)';
                } else {
                    notification.style.right = '20px';
                    notification.style.left = 'auto';
                    notification.style.maxWidth = '350px';
                }
            } catch (error) {
                console.error('Error adjusting notification position:', error);
            }
        });
    } catch (error) {
        console.error('Resize handler failed:', error);
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    try {
        handleResize();
    } catch (error) {
        console.error('Resize event handler failed:', error);
    }
});

// Handle orientation change
window.addEventListener('orientationchange', () => {
    try {
        setTimeout(handleResize, 100);
    } catch (error) {
        console.error('Orientation change handler failed:', error);
    }
});

// Initialize responsive behavior
try {
    handleResize();
} catch (error) {
    console.error('Initial responsive behavior setup failed:', error);
}

// Touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    try {
        touchStartY = e.changedTouches[0].screenY;
    } catch (error) {
        console.error('Touch start event failed:', error);
    }
});

document.addEventListener('touchend', (e) => {
    try {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    } catch (error) {
        console.error('Touch end event failed:', error);
    }
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        // Close mobile menu on swipe
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navMenu.classList.contains('mobile-open')) {
            navMenu.classList.remove('mobile-open');
        }
    }
}

// Prevent zoom on double tap for mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    try {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    } catch (error) {
        console.error('Double tap prevention failed:', error);
    }
}, false);

// Contact Form Integration - Simple Success Notification
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
        contactForm.reset();
    });
}

// Professional notification function
function showNotification(message, type) {
    try {
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
            try {
                notification.classList.add('show');
            } catch (error) {
                console.error('Notification animation failed:', error);
            }
        }, 100);
        
        // Auto hide after 6 seconds
        setTimeout(() => {
            try {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentElement) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            } catch (error) {
                console.error('Notification removal failed:', error);
            }
        }, 6000);
    } catch (error) {
        console.error('Notification creation failed:', error);
        // Fallback to alert
        alert(`${type === 'success' ? 'Success!' : 'Error!'}: ${message}`);
    }
}

// Add particle effect to hero section
function createParticles() {
    try {
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
    } catch (error) {
        console.error('Particle creation failed:', error);
    }
}

// Initialize particles
document.addEventListener('DOMContentLoaded', () => {
    try {
        createParticles();
    } catch (error) {
        console.error('Particle initialization failed:', error);
    }
});

// Resume PDF Download function
function downloadResumeAsPDF() {
    try {
        // Open resume in new window
        const resumeWindow = window.open('Sarthak_Agarwal_Resume.html', '_blank');
        
        if (resumeWindow) {
            // Wait for the page to load, then trigger print
            resumeWindow.onload = function() {
                setTimeout(() => {
                    try {
                        resumeWindow.print();
                    } catch (error) {
                        console.error('Print failed:', error);
                        showNotification('Print dialog failed to open. Please try manually printing the page.', 'error');
                    }
                }, 1000);
            };
            
            showNotification('Resume opened! Use browser print to save as PDF.', 'success');
        } else {
            showNotification('Failed to open resume. Please check your popup blocker settings.', 'error');
        }
    } catch (error) {
        console.error('Resume download failed:', error);
        showNotification('Failed to open resume. Please try again.', 'error');
    }
}

// ===== Service Worker Registration for PWA =====
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
}
