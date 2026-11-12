/**
 * INTERACTIVE HERO HANDLER
 * Handles Typing Animation, 3D Tilt, Parallax, and Spotlight Effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    init3DTilt();
    initParallax();
    initSpotlight();
});

/**
 * 1. Typing Animation
 */
function initTypingEffect() {
    const textElement = document.getElementById('typingText');
    if (!textElement) return;

    const roles = ["Fullstack Developer", "UI/UX Enthusiast", "Web Architect", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            textElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            textElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/**
 * 2. 3D Tilt Effect for Tech Panel
 */
function init3DTilt() {
    const panels = document.querySelectorAll('.tech-panel, .stat-item, .tech-item');
    
    panels.forEach(panel => {
        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        panel.addEventListener('mouseleave', () => {
            panel.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });
}

/**
 * 3. Mouse Parallax for Orbit & Portrait
 */
function initParallax() {
    const hero = document.querySelector('.hero');
    const portrait = document.querySelector('.portrait-container');
    const orbits = document.querySelector('.orbit-rings');
    
    if (!hero || !portrait || !orbits) return;

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const moveX = (clientX - innerWidth / 2) / 50;
        const moveY = (clientY - innerHeight / 2) / 50;
        
        // Portrait move slightly
        portrait.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        
        // Orbits move in opposite direction for depth
        orbits.style.transform = `translate(-50%, -50%) translate3d(${-moveX * 1.5}px, ${-moveY * 1.5}px, -50px)`;
    });
}

/**
 * 4. Spotlight Follower for Tech Panel
 */
function initSpotlight() {
    const panel = document.querySelector('.tech-panel');
    if (!panel) return;

    panel.addEventListener('mousemove', (e) => {
        const rect = panel.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        panel.style.setProperty('--mouse-x', `${x}%`);
        panel.style.setProperty('--mouse-y', `${y}%`);
    });
}
