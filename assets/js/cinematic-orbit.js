/**
 * CINEMATIC ORBIT SYSTEM - Enhanced Living Technology Orbit
 * Premium portfolio animation with particles, trails, and interactive depth
 */

class CinematicOrbit {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particlesContainer = null;
        this.animationId = null;
        this.mousePos = { x: 0, y: 0 };
        this.time = 0;
        this.isInitialized = false;
        
        // Technology icons configuration
        this.technologies = [
            { name: 'HTML5', icon: '󰌝', color: '#E34F26', orbit: 1, speed: 0.8, angle: 0 },
            { name: 'CSS3', icon: '󰌜', color: '#1572B6', orbit: 1, speed: 0.9, angle: 60 },
            { name: 'JavaScript', icon: '󰌞', color: '#F7DF1E', orbit: 1, speed: 0.85, angle: 120 },
            { name: 'TypeScript', icon: '󰛦', color: '#3178C6', orbit: 1, speed: 0.95, angle: 180 },
            { name: 'React', icon: '󰜈', color: '#61DAFB', orbit: 2, speed: 0.7, angle: 0 },
            { name: 'Next.js', icon: '󰫢', color: '#00F5FF', orbit: 2, speed: 0.75, angle: 72 },
            { name: 'Node.js', icon: '󰎙', color: '#339933', orbit: 2, speed: 0.8, angle: 144 },
            { name: 'NestJS', icon: '󱓞', color: '#E0234E', orbit: 2, speed: 0.72, angle: 216 },
            { name: 'PHP', icon: '󰌟', color: '#777BB4', orbit: 2, speed: 0.78, angle: 288 },
            { name: 'PostgreSQL', icon: '󰐫', color: '#336791', orbit: 3, speed: 0.6, angle: 0 },
            { name: 'MySQL', icon: '󰐫', color: '#4479A1', orbit: 3, speed: 0.65, angle: 90 },
            { name: 'Docker', icon: '󰡨', color: '#2496ED', orbit: 3, speed: 0.55, angle: 180 },
            { name: 'Git', icon: '󰊤', color: '#F05032', orbit: 3, speed: 0.62, angle: 270 }
        ];
        
        // Particle system
        this.particles = [];
        this.maxParticles = 80;
        this.trails = [];
        
        // Colors
        this.colors = {
            cyan: '#00F5FF',
            purple: '#9D4EDD',
            amber: '#FFB000',
            white: '#FFFFFF'
        };
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.canvas = document.getElementById('orbitCanvas');
        this.particlesContainer = document.getElementById('orbitParticles');
        
        if (!this.canvas) {
            console.warn('Orbit canvas not found');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createParticles();
        this.setupMouseTracking();
        this.startAnimation();
        
        window.addEventListener('resize', () => this.handleResize());
        
        this.isInitialized = true;
    }
    
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        
        this.ctx.scale(dpr, dpr);
        
        this.centerX = rect.width / 2;
        this.centerY = rect.height / 2;
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [this.colors.cyan, this.colors.purple, this.colors.amber];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    setupMouseTracking() {
        const heroCenter = document.querySelector('.hero-center');
        if (!heroCenter) return;
        
        heroCenter.addEventListener('mousemove', (e) => {
            const rect = heroCenter.getBoundingClientRect();
            this.mousePos.x = e.clientX - rect.left;
            this.mousePos.y = e.clientY - rect.top;
        });
    }
    
    startAnimation() {
        const animate = () => {
            this.time += 0.01;
            this.update();
            this.render();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    }
    
    update() {
        // Update technology positions
        this.technologies.forEach(tech => {
            tech.angle += tech.speed * 0.01;
        });
        
        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            const rect = this.canvas.getBoundingClientRect();
            if (particle.x < 0 || particle.x > rect.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > rect.height) particle.vy *= -1;
            
            // Mouse interaction
            const dx = this.mousePos.x - particle.x;
            const dy = this.mousePos.y - particle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 100) {
                const force = (100 - dist) / 100;
                particle.vx -= (dx / dist) * force * 0.1;
                particle.vy -= (dy / dist) * force * 0.1;
            }
            
            // Limit velocity
            const speed = Math.sqrt(particle.vx ** 2 + particle.vy ** 2);
            if (speed > 2) {
                particle.vx = (particle.vx / speed) * 2;
                particle.vy = (particle.vy / speed) * 2;
            }
        });
    }
    
    render() {
        const rect = this.canvas.getBoundingClientRect();
        
        // Clear canvas with fade effect
        this.ctx.fillStyle = 'rgba(8, 9, 13, 0.1)';
        this.ctx.fillRect(0, 0, rect.width, rect.height);
        
        // Draw orbit rings
        this.drawOrbitRings();
        
        // Draw particles
        this.drawParticles();
        
        // Draw technology icons with trails
        this.drawTechnologies();
        
        // Draw connections
        this.drawConnections();
    }
    
    drawOrbitRings() {
        const orbits = [
            { radius: 120, color: this.colors.cyan, width: 1, opacity: 0.3 },
            { radius: 180, color: this.colors.purple, width: 1, opacity: 0.25 },
            { radius: 240, color: this.colors.amber, width: 1, opacity: 0.2 }
        ];
        
        orbits.forEach(orbit => {
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, orbit.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = orbit.color;
            this.ctx.globalAlpha = orbit.opacity;
            this.ctx.lineWidth = orbit.width;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
            
            // Glow effect
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    drawTechnologies() {
        const orbitRadii = { 1: 120, 2: 180, 3: 240 };
        
        this.technologies.forEach(tech => {
            const radius = orbitRadii[tech.orbit];
            const x = this.centerX + Math.cos(tech.angle) * radius;
            const y = this.centerY + Math.sin(tech.angle) * radius;
            
            // Draw trail
            this.drawTrail(x, y, tech.color);
            
            // Draw icon circle
            this.ctx.beginPath();
            this.ctx.arc(x, y, 20, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(16, 19, 28, 0.8)';
            this.ctx.fill();
            this.ctx.strokeStyle = tech.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Glow
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = tech.color;
            this.ctx.stroke();
            this.ctx.shadowBlur = 0;
            
            // Icon text
            this.ctx.fillStyle = tech.color;
            this.ctx.font = '16px Inter';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(tech.icon, x, y);
        });
    }
    
    drawTrail(x, y, color) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, 25, 0, Math.PI * 2);
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 25);
        gradient.addColorStop(0, `${color}00`);
        gradient.addColorStop(1, `${color}40`);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
    }
    
    drawConnections() {
        // Connect nearby particles
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 80) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = this.colors.cyan;
                    this.ctx.globalAlpha = (1 - dist / 80) * 0.2;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                    this.ctx.globalAlpha = 1;
                }
            }
        }
    }
    
    handleResize() {
        this.setupCanvas();
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.cinematicOrbit = new CinematicOrbit();
    });
} else {
    window.cinematicOrbit = new CinematicOrbit();
}
