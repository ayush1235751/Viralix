// ============================================
// Error Handling for External Resources
// ============================================
window.addEventListener('error', function(e) {
    // Silently handle resource loading errors
    if (e.target && (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT')) {
        console.warn('External resource failed to load:', e.target.href || e.target.src);
        e.preventDefault();
    }
}, true);

// Ensure page works even if external resources fail
document.addEventListener('DOMContentLoaded', function() {
    // Check if Font Awesome loaded, if not, add fallback styles
    setTimeout(function() {
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-check';
        document.body.appendChild(testIcon);
        const computedStyle = window.getComputedStyle(testIcon, ':before');
        const hasIcon = computedStyle.getPropertyValue('content') !== 'none' && 
                       computedStyle.getPropertyValue('content') !== '';
        document.body.removeChild(testIcon);
        
        if (!hasIcon) {
            console.warn('Font Awesome not loaded, using fallback');
            // Add fallback class to body
            document.body.classList.add('no-fontawesome');
        }
    }, 1000);
});

// ============================================
// Theme Toggle Functionality
// ============================================

// Get theme from localStorage or default to light
const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
};

// Set theme
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeToggleIcon(theme);
};

// Update theme toggle icon
const updateThemeToggleIcon = (theme) => {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = getTheme();
    setTheme(currentTheme);
    
    // Setup theme toggle button (already in HTML)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            // Get current theme dynamically
            const currentTheme = getTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
});

// ============================================
// Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
});

// ============================================
// FAQ Accordion
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// ============================================
// Smooth Scroll
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Contact Form - WhatsApp Integration
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                company: document.getElementById('company').value.trim(),
                service: document.getElementById('service').value,
                message: document.getElementById('message').value.trim()
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.message) {
                alert('Please fill in all required fields (Name, Email, Message)');
                return;
            }
            
            // Format message for WhatsApp
            const whatsappMessage = formatWhatsAppMessage(formData);
            
            // WhatsApp number (with country code, no + sign)
            const whatsappNumber = '919027062147';
            
            // Create WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Format message for WhatsApp
function formatWhatsAppMessage(data) {
    let message = '🎯 *New Contact Form Submission*\n\n';
    message += `👤 *Name:* ${data.name}\n`;
    message += `📧 *Email:* ${data.email}\n`;
    
    if (data.phone) {
        message += `📞 *Phone:* ${data.phone}\n`;
    }
    
    if (data.company) {
        message += `🏢 *Company:* ${data.company}\n`;
    }
    
    if (data.service) {
        message += `🎯 *Service Interest:* ${data.service}\n`;
    }
    
    message += `\n💬 *Message:*\n${data.message}`;
    
    return message;
}

// Show success message
function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span style="font-size: 2rem;">✅</span>
            <div>
                <h4 style="margin: 0 0 0.5rem 0; font-size: 1.1rem;">Form Submitted!</h4>
                <p style="margin: 0; font-size: 0.9rem; opacity: 0.9;">Opening WhatsApp to send your message...</p>
            </div>
        </div>
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// Navbar Scroll Effect
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// ============================================
// Animation on Scroll
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.creator-card, .service-card, .case-study-card, .blog-card, .faq-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

