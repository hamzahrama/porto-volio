// LIVING TECHNOLOGY ORBIT - Premium Portfolio JavaScript
// Cyber Streetwear / Dark Neo-Brutalist Theme

class PortfolioApp {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupCursor();
        this.setupTheme();
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupScrollToTop();
        this.setupCounterAnimation();
        this.setupProjectFilters();
        this.setupContactForm();
        this.setupParticles();
        this.setupIntersectionObserver();
        this.setupNavigationActive();
    }
    
    // Custom Cursor
    setupCursor() {
        const cursor = document.getElementById('customCursor');
        if (!cursor || window.innerWidth < 968) return;
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        const hoverElements = document.querySelectorAll('a, button, .btn, .nav-link, .tech-item, .project-card, .contact-item, .floating-badge');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
    
    // Theme Toggle
    setupTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        const currentTheme = localStorage.getItem('theme') || 'dark';
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        this.updateThemeIcon(themeToggle, currentTheme);
        
        themeToggle?.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(themeToggle, newTheme);
        });
    }
    
    updateThemeIcon(toggle, theme) {
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
    
    // Mobile Menu
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavClose = document.getElementById('mobile-nav-close');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        mobileMenuToggle?.addEventListener('click', () => {
            mobileNav?.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
        
        mobileNavClose?.addEventListener('click', () => {
            mobileNav?.classList.remove('open');
            document.body.style.overflow = 'auto';
        });
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav?.classList.remove('open');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav?.contains(e.target) && !mobileMenuToggle?.contains(e.target)) {
                mobileNav?.classList.remove('open');
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Smooth Scroll
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Scroll to Top
    setupScrollToTop() {
        const scrollTopBtn = document.getElementById('scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn?.classList.add('visible');
            } else {
                scrollTopBtn?.classList.remove('visible');
            }
        });
        
        scrollTopBtn?.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Counter Animation
    setupCounterAnimation() {
        const counters = document.querySelectorAll('.hero-stat-number, .stat-number');
        const observerOptions = {
            threshold: 0.5
        };
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    
                    if (!isNaN(target) && target > 0) {
                        this.animateCounter(counter, target);
                    }
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 16);
    }
    
    // Project Filters
    setupProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    } else {
                        if (card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                            card.style.animation = 'fadeInUp 0.5s ease forwards';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Contact Form
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        contactForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Create mailto link
            const mailtoLink = `mailto:paramatamahamzah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            )}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show feedback
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Opening Email...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        });
    }
    
    // Particles
    setupParticles() {
        const container = document.getElementById('particlesContainer');
        if (!container) return;
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: ${Math.random() > 0.5 ? '#00F5FF' : '#9D4EDD'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
                opacity: ${0.3 + Math.random() * 0.7};
                box-shadow: 0 0 5px currentColor;
            `;
            container.appendChild(particle);
        }
        
        // Add keyframes
        if (!document.getElementById('particleStyles')) {
            const style = document.createElement('style');
            style.id = 'particleStyles';
            style.textContent = `
                @keyframes floatParticle {
                    0% { transform: translate(0, 0); }
                    33% { transform: translate(30px, -50px); }
                    66% { transform: translate(-20px, -30px); }
                    100% { transform: translate(10px, -80px); }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        const elementsToObserve = document.querySelectorAll('.tech-category-card, .stat-card, .project-card, .contact-item, .about-text');
        elementsToObserve.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `all 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // Navigation Active State
    setupNavigationActive() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const sectionHeight = section.clientHeight;
                if (sectionTop < 200 && sectionTop + sectionHeight > 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new PortfolioApp());
} else {
    new PortfolioApp();
}

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
