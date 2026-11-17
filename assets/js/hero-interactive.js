/**
 * HERO INTERACTIVE - Minimal Version
 * Only Typing Animation (removed parallax, 3D tilt, spotlight for reduced motion)
 */

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
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