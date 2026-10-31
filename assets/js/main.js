// Main Application JavaScript
// Portfolio interactivity and animations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupProjectFilter();
        this.setupCounterAnimation();
        this.setupFormSubmission();
        this.setupScrollToTop();
        this.setupHoverEffects();
        this.setupTerminalConsole();
        this.setupAudioVisualizer();
        this.setupClickFeedback();
        this.setupScrollSpy();
        this.loadExternalResources();
        this.setupLivingTechOrbit();
    }

    // Theme Toggle System
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const savedTheme = localStorage.getItem('theme') || 'dark';
        
        if (savedTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon based on theme
            const icon = themeToggle.querySelector('i');
            if (newTheme === 'light') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
            
            // Trigger custom event for other components
            window.dispatchEvent(new CustomEvent('themeChanged', { 
                detail: { theme: newTheme } 
            }));
        });
    }

    // Mobile Menu System
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileNavClose = document.getElementById('mobile-nav-close');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu on close button
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            mobileMenuToggle.classList.remove('active');
        });

        // Close menu on link click
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu on outside click
        mobileNav.addEventListener('click', (e) => {
            if (e.target === mobileNav) {
                mobileNav.classList.remove('open');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // Smooth Scroll Effects
    setupScrollEffects() {
        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const offset = 80; // Account for navbar height
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add scroll animations
        this.setupScrollAnimations();
    }

    setupScrollAnimations() {
        // Create intersection observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section, .project-card, .skill-item, .about-card, .contact-item').forEach(el => {
            el.classList.add('scroll-animate');
            observer.observe(el);
        });
    }

    // Project Filter System
    setupProjectFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                const filter = button.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        // Add animation
                        setTimeout(() => {
                            card.classList.add('show');
                        }, 100);
                    } else {
                        card.classList.remove('show');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Counter Animation
    setupCounterAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        const speed = 200; // Animation speed

        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = parseInt(stat.textContent);
            const increment = target / speed;

            if (count < target) {
                stat.textContent = Math.floor(count + increment);
                setTimeout(() => this.updateCounters(stat, target, increment), 20);
            } else {
                stat.textContent = target;
            }
        });
    }

    updateCounters(stat, target, increment) {
        const count = parseInt(stat.textContent);
        if (count < target) {
            stat.textContent = Math.floor(count + increment);
            setTimeout(() => this.updateCounters(stat, target, increment), 20);
        } else {
            stat.textContent = target;
        }
    }

    // Form Submission Handler
    setupFormSubmission() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!this.validateForm(data)) {
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                this.showNotification('Message sent successfully!', 'success');
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    validateForm(data) {
        const requiredFields = ['name', 'email', 'subject', 'message'];
        
        for (const field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                this.showNotification(`Please fill in the ${field} field.`, 'error');
                return false;
            }
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification('Please enter a valid email address.', 'error');
            return false;
        }
        
        return true;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Scroll to Top Button
    setupScrollToTop() {
        const scrollTop = document.getElementById('scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTop.classList.add('visible');
            } else {
                scrollTop.classList.remove('visible');
            }
        });
        
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Hover Effects
    setupHoverEffects() {
        // Project cards hover
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
        
        // Skill items hover
        document.querySelectorAll('.skill-item').forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                item.style.setProperty('--mouse-x', `${x}px`);
                item.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // Scroll Spy
    setupScrollSpy() {
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
            
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
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
    }

    // Terminal Console
    setupTerminalConsole() {
        const terminalContent = document.getElementById('terminal-content');
        const terminalInput = document.querySelector('.terminal-input');
        
        if (!terminalContent || !terminalInput) return;
        
        const commands = {
            'help': `Available commands:
- help : Show help list
- about : Developer profile info
- skills : Tech stack overview
- projects : List of featured projects
- clear : Clear terminal
- echo <message> : Repeat your message
- date : Show current date
- whoami : Show current user`,
            
            'about': `Paramatama Hamzah Boyle Fairuz
Fullstack Developer & Designer
Location: Yogyakarta, Indonesia
Specialization: Next.js, React, Node.js, PostgreSQL
Status: Available for work`,
            
            'skills': `Languages & Tools:
- JavaScript (ES6+)
- TypeScript
- React/Next.js
- Node.js & NestJS
- PostgreSQL & MongoDB
- Docker & Git
- Tailwind CSS
- Python

Framework Experience:
- Frontend: React, Next.js, Vue.js
- Backend: Node.js, Express, NestJS
- Database: PostgreSQL, MongoDB, SQLite
- DevOps: Docker, AWS, Vercel`,
            
            'projects': `Featured Projects:
1. E-commerce Platform (React, Node.js, PostgreSQL)
2. Task Manager App (Next.js, Tailwind)
3. REST API Service (Node.js, Express)
4. Portfolio Website (Next.js, Tailwind)

Use: 'projects <project-name>' for details`,
            
            'clear': '',
            
            'date': () => new Date().toLocaleString(),
            
            'whoami': 'Paramatama Hamzah'
        };
        
        function termOut(text, isError = false) {
            const line = document.createElement('div');
            line.className = 'terminal-output';
            line.style.color = isError ? '#ef4444' : '#10b981';
            line.textContent = text;
            terminalContent.appendChild(line);
            terminalContent.scrollTop = terminalContent.scrollHeight;
        }
        
        function handleTerminalSubmit(e) {
            e.preventDefault();
            const inputVal = terminalInput.value.trim();
            
            if (!inputVal) return;
            
            termOut(`$ ${inputVal}`);
            
            const lowerInput = inputVal.toLowerCase();
            let response = '';
            
            if (lowerInput === 'clear') {
                terminalContent.innerHTML = '';
                termOut('$ system cleared.');
            } else if (commands[lowerInput]) {
                const cmd = commands[lowerInput];
                response = typeof cmd === 'function' ? cmd() : cmd;
                termOut(response);
            } else if (lowerInput.startsWith('echo ')) {
                const message = lowerInput.substring(5);
                termOut(message);
            } else {
                termOut(`Command not found: ${lowerInput}. Type 'help' for available commands.`, true);
            }
            
            terminalInput.value = '';
        }
        
        const terminalForm = document.querySelector('.terminal-form');
        if (terminalForm) {
            terminalForm.addEventListener('submit', handleTerminalSubmit);
        }
        
        // Initialize terminal greeting
        setTimeout(() => {
            termOut('$ Welcome to the portfolio terminal!');
            termOut('$ Type "help" for available commands');
        }, 500);
    }

    // Audio Visualizer
    setupAudioVisualizer() {
        const audio = document.getElementById('bg-audio');
        const visualizer = document.querySelector('.visualizer');
        const toggleBtn = document.querySelector('.audio-widget-toggle');
        const isPlaying = false;
        let animationFrame;
        
        if (!visualizer || !audio) return;
        
        // Create visualizer bars
        visualizer.innerHTML = '';
        const numBars = 20;
        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'visualizer-bar';
            visualizer.appendChild(bar);
        }
        
        const bars = visualizer.querySelectorAll('.visualizer-bar');
        
        function animateVisualizer() {
            if (!isPlaying) return;
            
            bars.forEach((bar, index) => {
                const height = Math.random() * 40 + 10;
                bar.style.height = `${height}px`;
                
                // Stagger animation
                bar.style.animationDelay = `${index * 0.1}s`;
            });
            
            animationFrame = requestAnimationFrame(animateVisualizer);
        }
        
        function resetVisualizerBars() {
            bars.forEach(bar => {
                bar.style.height = '10px';
            });
        }
        
        function toggleAudio() {
            const icon = toggleBtn.querySelector('i');
            
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                icon.className = 'fas fa-play';
                toggleBtn.classList.remove('active');
                cancelAnimationFrame(animationFrame);
            } else {
                audio.play().catch(err => {
                    console.log('Audio playback blocked:', err);
                });
                isPlaying = true;
                icon.className = 'fas fa-pause';
                toggleBtn.classList.add('active');
                animateVisualizer();
            }
        }
        
        toggleBtn.addEventListener('click', toggleAudio);
        
        // Pause visualization when page is not active
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                if (isPlaying) {
                    audio.pause();
                    isPlaying = false;
                    toggleBtn.querySelector('i').className = 'fas fa-play';
                    toggleBtn.classList.remove('active');
                    cancelAnimationFrame(animationFrame);
                }
            }
        });
    }

    // Click Feedback Effect
    setupClickFeedback() {
        const feedback = document.getElementById('click-feedback');
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('a, button, .btn')) {
                feedback.style.left = (e.clientX - 5) + 'px';
                feedback.style.top = (e.clientY - 5) + 'px';
                feedback.style.transform = 'scale(1)';
                feedback.style.opacity = '1';
                
                setTimeout(() => {
                    feedback.style.transform = 'scale(0)';
                    feedback.style.opacity = '0';
                }, 300);
            }
        });
    }

    // Load External Resources
    loadExternalResources() {
        // Load Font Awesome if needed
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
            document.head.appendChild(fontAwesome);
        }
    }

    // Living Technology Orbit Setup
    setupLivingTechOrbit() {
        // Only initialize if living tech orbit section exists
        if (document.querySelector('.tech-orbit-section')) {
            // Initialize the living tech orbit animation
            window.techOrbit = new LivingTechOrbit();
        }
    }

    // Initialize app when DOM is ready
    run() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
}

// Initialize the portfolio app
const app = new PortfolioApp();
app.run();

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
.fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
}

.scroll-animate {
    opacity: 0;
    transform: translateY(30px);
}

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

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: var(--shadow-lg);
}

.notification.show {
    transform: translateX(0);
}

.notification.success {
    background: linear-gradient(135deg, #10b981, #059669);
}

.notification.error {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}

.notification.info {
    background: linear-gradient(135deg, #3b82f6, #2563eb);
}

/* Project card mouse interaction */
.project-card {
    --mouse-x: 0px;
    --mouse-y: 0px;
}

.project-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.project-card:hover::before {
    opacity: 1;
}

/* Skill item mouse interaction */
.skill-item {
    --mouse-x: 0px;
    --mouse-y: 0px;
    position: relative;
}

.skill-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.1), transparent 50%);
    border-radius: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.skill-item:hover::before {
    opacity: 1;
}
`;

document.head.appendChild(style);

// Tech Orbit and Animation Features
function setupTechOrbit() {
    const orbitItems = document.querySelectorAll('.orbit-item-tech');
    const techProfile = document.querySelector('.tech-profile-image');
    
    if (!orbitItems.length || !techProfile) return;
    
    // Add click handlers to tech items
    orbitItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the tech name from title attribute
            const techName = item.getAttribute('title');
            
            // Create ripple effect
            createRipple(item, e);
            
            // Show tech info in profile glow
            showTechInfo(techName);
            
            // Highlight related items
            highlightRelatedTechItems(index);
            
            // Show notification
            showNotification(`Exploring ${techName} technology!`, 'info');
        });
        
        // Add hover sound effect (visual)
        item.addEventListener('mouseenter', () => {
            item.style.filter = 'brightness(1.5)';n        });
        
        item.addEventListener('mouseleave', () => {
            item.style.filter = 'brightness(1)';
        });
    });
    
    // Profile hover effects
    techProfile.addEventListener('mouseenter', () => {
        techProfile.style.animationPlayState = 'paused';
    });
    
    techProfile.addEventListener('mouseleave', () => {
        techProfile.style.animationPlayState = 'running';
    });
    
    // Auto-rotate through tech items (every 3 seconds)
    let currentIndex = 0;
    setInterval(() => {
        rotateTechHighlight();
    }, 3000);
}

function createRipple(event, target) {
    const ripple = document.createElement('div');
    ripple.className = 'tech-ripple';
    
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showTechInfo(techName) {
    const profileGlow = document.querySelector('.tech-profile-glow');
    if (!profileGlow) return;
    
    // Change glow color based on tech
    const colors = {
        'Next.js': 'rgba(59, 130, 246, 0.5)',
        'React': 'rgba(97, 219, 213, 0.5)',
        'TypeScript': 'rgba(49, 120, 198, 0.5)',
        'Tailwind CSS': 'rgba(56, 189, 248, 0.5)',
        'Node.js': 'rgba(134, 220, 143, 0.5)',
        'NestJS': 'rgba(255, 107, 107, 0.5)',
        'PostgreSQL': 'rgba(0, 112, 192, 0.5)',
        'PHP': 'rgba(119, 93, 240, 0.5)',
        'phpMyAdmin': 'rgba(0, 102, 204, 0.5)',
        'Supabase': 'rgba(255, 65, 54, 0.5)',
        'Neon': 'rgba(24, 180, 244, 0.5)'
    };
    
    const color = colors[techName] || 'rgba(59, 130, 246, 0.5)';
    profileGlow.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
    
    // Reset after 2 seconds
    setTimeout(() => {
        profileGlow.style.background = 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)';
    }, 2000);
}

function highlightRelatedTechItems(index) {
    orbitItems = document.querySelectorAll('.orbit-item-tech');
    orbitItems.forEach((item, i) => {
        const distance = Math.abs(i - index);
        if (distance === 0) {
            item.style.transform = 'scale(1.5)';
            item.style.borderColor = '#60a5fa';
            item.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.8)';
        } else if (distance <= 2) {
            item.style.opacity = '0.7';
            item.style.transform = 'scale(1.1)';
        }
    });
    
    // Reset after 2 seconds
    setTimeout(() => {
        orbitItems.forEach(item => {
            item.style.transform = '';
            item.style.borderColor = '';
            item.style.boxShadow = '';
            item.style.opacity = '';
        });
    }, 2000);
}

function rotateTechHighlight() {
    const orbitItems = document.querySelectorAll('.orbit-item-tech');
    const randomIndex = Math.floor(Math.random() * orbitItems.length);
    
    // Remove previous highlight
    orbitItems.forEach(item => {
        item.style.boxShadow = item.style.boxShadow.replace('0 0 30px', '0 0 15px');
        item.style.transform = '';
    });
    
    // Add new highlight
    const targetItem = orbitItems[randomIndex];
    targetItem.style.transform = 'scale(1.2)';
    targetItem.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
    
    // Show tech info
    const techName = targetItem.getAttribute('title');
    showTechInfo(techName);
}

function setupTechProfileAnimation() {
    const profileImage = document.querySelector('.tech-profile-image');
    if (!profileImage) return;
    
    // Add magnetic effect
    const orbitContainer = document.querySelector('.orbit-container');
    if (!orbitContainer) return;
    
    orbitContainer.addEventListener('mousemove', (e) => {
        const rect = orbitContainer.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
            const angle = Math.atan2(y, x);
            const magnetDistance = (1 - distance / maxDistance) * 30;
            
            profileImage.style.transform += ` translate(${Math.cos(angle) * magnetDistance}px, ${Math.sin(angle) * magnetDistance}px)`;
        }
    });
    
    orbitContainer.addEventListener('mouseleave', () => {
        profileImage.style.transform = '';
    });
}

// Initialize tech features
function initTechFeatures() {
    if (document.querySelector('.tech-orbit-section')) {
        setupTechOrbit();
        setupTechProfileAnimation();
    }
}

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
.tech-ripple {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: rippleEffect 0.6s ease-out;
    z-index: 100;
}

@keyframes rippleEffect {
    to {
        width: 400px;
        height: 400px;
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Export for global access
window.TechFeatures = {
    setupTechOrbit,
    initTechFeatures
};

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechFeatures);
} else {
    initTechFeatures();
}
