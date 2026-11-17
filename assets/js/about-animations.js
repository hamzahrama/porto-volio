// Scroll Reveal Animations - All Sections
// IntersectionObserver-based reveal animations for Hero, About, and other sections

(function() {
    'use strict';

    // Configuration
    const ANIMATION_CONFIG = {
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    // Animation classes
    const REVEAL_CLASSES = {
        'fade-up': { opacity: 0, transform: 'translateY(40px)', transition: 'opacity 0.8s ease, transform 0.8s ease' },
        'fade-down': { opacity: 0, transform: 'translateY(-40px)', transition: 'opacity 0.8s ease, transform 0.8s ease' },
        'slide-left': { opacity: 0, transform: 'translateX(-60px)', transition: 'opacity 0.8s ease, transform 0.8s ease' },
        'slide-right': { opacity: 0, transform: 'translateX(60px)', transition: 'opacity 0.8s ease, transform 0.8s ease' },
        'scale-up': { opacity: 0, transform: 'scale(0.9)', transition: 'opacity 0.6s ease, transform 0.6s ease' },
        'flip-up': { opacity: 0, transform: 'rotateX(20deg) translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }
    };

    // Elements to animate with their animation type and stagger delay
    const ANIMATION_TARGETS = [
        // Hero Section Elements
        { selector: '#home .hero-typing-container', animation: 'fade-up', delay: 0.1 },
        { selector: '#home .hero-description', animation: 'fade-up', delay: 0.2 },
        { selector: '#home .hero-cta', animation: 'fade-up', delay: 0.3 },
        { selector: '#home .hero-status', animation: 'fade-up', delay: 0.4 },
        { selector: '#home .portrait-container', animation: 'fade-up', delay: 0.1 },
        { selector: '#home .portrait-marquee', animation: 'fade-up', delay: 0.5 },
        { selector: '#home .tech-panel', animation: 'slide-left', delay: 0.1 },
        { selector: '#home .stats-panel', animation: 'slide-right', delay: 0.2 },
        { selector: '#home .music-dashboard-cta', animation: 'fade-up', delay: 0.3 },

        // About Header
        { selector: '#about .section-header', animation: 'fade-down', delay: 0 },
        
        // About Orbit Section
        { selector: '#about .about-portrait-container', animation: 'slide-left', delay: 0.1 },
        { selector: '#about .about-description', animation: 'slide-right', delay: 0.2 },
        
        // Journey Categories
        { selector: '#journey .journey-category', animation: 'fade-up', delay: 0, stagger: true, staggerDelay: 0.15 },
        
        // Timeline Items
        { selector: '#journey .timeline-item', animation: 'slide-left', delay: 0, stagger: true, staggerDelay: 0.1 },
        
        // Album Items
        { selector: '#albumGrid .album-item', animation: 'scale-up', delay: 0, stagger: true, staggerDelay: 0.08 },
        
        // Hobby Cards
        { selector: '#journey .hobby-card', animation: 'flip-up', delay: 0, stagger: true, staggerDelay: 0.1 },
        
        // Category Titles
        { selector: '#journey .category-title', animation: 'fade-down', delay: 0 },
        
        // Album Filters
        { selector: '#albumFilters', animation: 'fade-up', delay: 0.1 }
    ];

    function initScrollReveal() {
        // Create observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, ANIMATION_CONFIG);

        // Apply initial styles and observe
        ANIMATION_TARGETS.forEach(targetConfig => {
            const elements = document.querySelectorAll(targetConfig.selector);
            elements.forEach((el, index) => {
                // Set initial state
                const animProps = REVEAL_CLASSES[targetConfig.animation];
                if (animProps) {
                    el.style.opacity = animProps.opacity;
                    el.style.transform = animProps.transform;
                    el.style.transition = animProps.transition;
                    
                    // Add stagger delay if enabled
                    if (targetConfig.stagger) {
                        const staggerDelay = targetConfig.staggerDelay * index;
                        el.style.transitionDelay = `${targetConfig.delay + staggerDelay}s`;
                    } else {
                        el.style.transitionDelay = `${targetConfig.delay}s`;
                    }
                    
                    observer.observe(el);
                }
            });
        });
    }

    function animateElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translate(0) scale(1) rotateX(0)';
    }

    // Handle dynamic content (album items loaded after page load)
    function observeDynamicContent() {
        const albumGrid = document.getElementById('albumGrid');
        if (!albumGrid) return;

        const dynamicObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Re-observe new album items
                    const newItems = entry.target.querySelectorAll('.album-item:not([data-animated])');
                    newItems.forEach((item, index) => {
                        item.setAttribute('data-animated', 'true');
                        const animProps = REVEAL_CLASSES['scale-up'];
                        item.style.opacity = animProps.opacity;
                        item.style.transform = animProps.transform;
                        item.style.transition = animProps.transition;
                        item.style.transitionDelay = `${0.08 * index}s`;
                        
                        // Trigger animation in next frame
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    });
                    dynamicObserver.unobserve(entry.target);
                }
            });
        }, ANIMATION_CONFIG);

        dynamicObserver.observe(albumGrid);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initScrollReveal();
            observeDynamicContent();
        });
    } else {
        initScrollReveal();
        observeDynamicContent();
    }

    // Expose for manual re-trigger if needed
    window.reinitScrollReveal = function() {
        initScrollReveal();
        observeDynamicContent();
    };
})();