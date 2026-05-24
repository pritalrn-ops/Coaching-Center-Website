// ===================================
// VEDA INSIGHTS - JAVASCRIPT FILE
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // NAVIGATION FUNCTIONALITY
    // ===================================
    
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky Navbar on Scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update Scroll to Top Button
        updateScrollTopButton();
    });
    
    // Mobile Menu Toggle
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const navHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active link
                    navLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===================================
    // SCROLL TO TOP BUTTON
    // ===================================
    
    const scrollTopButton = document.getElementById('scrollTop');
    
    function updateScrollTopButton() {
        if (window.scrollY > 500) {
            scrollTopButton.classList.add('visible');
        } else {
            scrollTopButton.classList.remove('visible');
        }
    }
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===================================
    // GALLERY TABS FUNCTIONALITY
    // ===================================
    
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // In a real implementation, you would filter gallery items here
            // For now, we'll just show a console message
            const tabName = this.getAttribute('data-tab');
            console.log(`Showing gallery for: ${tabName}`);
            
            // You can add filtering logic here based on data-tab attribute
        });
    });
    
    // ===================================
    // FAQ ACCORDION
    // ===================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // ===================================
    // ENROLLMENT FORM HANDLING
    // ===================================
    
    const enrollmentForm = document.getElementById('enrollmentForm');
    
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateEnrollmentForm(data)) {
                // Show success message
                showNotification('Success! Your enrollment application has been submitted. We will contact you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // In a real implementation, you would send this data to a server
                console.log('Enrollment Form Data:', data);
                
                // Optional: Send to backend API
                // submitEnrollmentData(data);
            }
        });
    }
    
    function validateEnrollmentForm(data) {
        // Basic validation
        if (!data.studentName || !data.grade || !data.course || !data.phone || !data.parentName || !data.parentPhone || !data.batchTiming) {
            showNotification('Please fill in all required fields marked with *', 'error');
            return false;
        }
        
        // Phone number validation (basic)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(data.phone.replace(/[^0-9]/g, ''))) {
            showNotification('Please enter a valid 10-digit phone number', 'error');
            return false;
        }
        
        return true;
    }
    
    // ===================================
    // CONTACT FORM HANDLING
    // ===================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateContactForm(data)) {
                // Show success message
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                
                // Reset form
                this.reset();
                
                // In a real implementation, you would send this data to a server
                console.log('Contact Form Data:', data);
                
                // Optional: Send to backend API
                // submitContactData(data);
            }
        });
    }
    
    function validateContactForm(data) {
        // Basic validation
        if (!data.name || !data.email || !data.contactPhone || !data.subject || !data.contactMessage) {
            showNotification('Please fill in all required fields marked with *', 'error');
            return false;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return false;
        }
        
        return true;
    }
    
    // ===================================
    // NOTIFICATION SYSTEM
    // ===================================
    
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles dynamically
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            gap: 0.75rem;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 400px;
        `;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            margin-left: 0.5rem;
        `;
        
        closeBtn.addEventListener('click', function() {
            notification.remove();
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Add notification animations to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
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
    
    // ===================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ===================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.course-card, .stat-item, .topper-card, .testimonial-card, .method-item, .founder-card, .gallery-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
    
    // ===================================
    // FORM INPUT ANIMATIONS
    // ===================================
    
    const formInputs = document.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        // Add focus effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // ===================================
    // COURSE CARD HOVER EFFECTS
    // ===================================
    
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // ===================================
    // COUNTER ANIMATION FOR STATS
    // ===================================
    
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // 60 FPS
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = formatNumber(target);
                clearInterval(timer);
            } else {
                element.textContent = formatNumber(Math.floor(start));
            }
        }, 16);
    }
    
    function formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K+';
        }
        return num + (num < 100 ? '%' : '+');
    }
    
    // Observe stats section for counter animation
    const statsSection = document.querySelector('.stats');
    let statsAnimated = false;
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    const statNumbers = document.querySelectorAll('.stat-item h3');
                    statNumbers.forEach((stat, index) => {
                        const text = stat.textContent;
                        const number = parseInt(text.replace(/[^0-9]/g, ''));
                        setTimeout(() => {
                            animateCounter(stat, number, 2000);
                        }, index * 200);
                    });
                    statsAnimated = true;
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
    
    // ===================================
    // LAZY LOADING FOR IMAGES
    // ===================================
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // ===================================
    // BACK TO TOP SMOOTH SCROLL
    // ===================================
    
    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // ===================================
    // FORM FILE INPUT CUSTOM LABEL
    // ===================================
    
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const fileName = this.files[0]?.name || 'No file chosen';
            const label = this.parentElement.querySelector('label');
            if (label) {
                label.textContent = fileName;
            }
        });
    });
    
    // ===================================
    // PREVENT DEFAULT FORM SUBMISSION FOR DEMO
    // ===================================
    
    const allForms = document.querySelectorAll('form');
    allForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Forms are already handled by specific handlers above
            // This is just a safety measure
        });
    });
    
    // ===================================
    // COURSE BADGE ANIMATION
    // ===================================
    
    const courseBadges = document.querySelectorAll('.course-badge');
    
    courseBadges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ===================================
    // TYPING EFFECT FOR HERO SUBTITLE (Optional Enhancement)
    // ===================================
    
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Uncomment to enable typing effect
    // const heroSubtitle = document.querySelector('.hero-subtitle');
    // if (heroSubtitle) {
    //     const originalText = heroSubtitle.textContent;
    //     typeWriter(heroSubtitle, originalText, 100);
    // }
    
    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    
    console.log('%c🎓 Veda Insights', 'color: #2563eb; font-size: 24px; font-weight: bold;');
    console.log('%cYour Success, Our Commitment', 'color: #f59e0b; font-size: 16px;');
    console.log('%cWebsite loaded successfully!', 'color: #10b981; font-size: 14px;');
    
    // ===================================
    // UTILITY FUNCTIONS
    // ===================================
    
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll events if needed
    const debouncedScroll = debounce(function() {
        // Add any additional scroll-based functionality here
    }, 50);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // ===================================
    // ACCESSIBILITY IMPROVEMENTS
    // ===================================
    
    // Add keyboard navigation for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            mobileMenuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Focus trap for mobile menu when open
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            const focusableElements = this.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // ===================================
    // PERFORMANCE OPTIMIZATION
    // ===================================
    
    // Add passive event listeners for better scrolling performance
    window.addEventListener('scroll', function() {
        // Scroll functionality here
    }, { passive: true });
    
    // Preload critical resources
    const criticalResources = [
        // Add URLs of critical resources here
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'image'; // or 'script', 'style', etc.
        document.head.appendChild(link);
    });
    
    // ===================================
    // READY STATE
    // ===================================
    
    console.log('All interactive features initialized successfully!');
});

// ===================================
// ADDITIONAL HELPER FUNCTIONS (Global Scope)
// ===================================

// Function to handle external form submissions (if needed)
function submitEnrollmentData(data) {
    // Example API call structure
    /*
    fetch('/api/enrollment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
}

function submitContactData(data) {
    // Example API call structure
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
    */
}

// WhatsApp API Integration helper
function sendWhatsAppMessage(phoneNumber, message) {
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Phone call helper
function makePhoneCall(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

// Email helper
function sendEmail(email, subject = '', body = '') {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}