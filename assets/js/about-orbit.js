// About Orbit Animation - Tech icons orbiting professional portrait
class AboutOrbit {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = 500;
        this.height = this.canvas.height = 500;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        
        // Colors
        this.colors = {
            cyan: '#00e5ff',
            purple: '#8b5cf6',
            amber: '#fbbf24',
            pink: '#ec4899'
        };
        
        // Tech stack items with specific positions
        this.technologies = [
            // Inner orbit - Frontend
            { name: 'HTML', icon: 'H', color: this.colors.amber, orbit: 1, angle: 0, speed: 0.008 },
            { name: 'CSS', icon: 'C', color: this.colors.cyan, orbit: 1, angle: Math.PI / 3, speed: 0.008 },
            { name: 'JS', icon: 'J', color: this.colors.amber, orbit: 1, angle: 2 * Math.PI / 3, speed: 0.008 },
            { name: 'React', icon: 'R', color: this.colors.cyan, orbit: 1, angle: Math.PI, speed: 0.008 },
            { name: 'Next', icon: 'N', color: this.colors.purple, orbit: 1, angle: 4 * Math.PI / 3, speed: 0.008 },
            
            // Middle orbit - Backend
            { name: 'Node', icon: '⬢', color: this.colors.cyan, orbit: 2, angle: Math.PI / 4, speed: 0.006 },
            { name: 'Nest', icon: '⬡', color: this.colors.pink, orbit: 2, angle: 3 * Math.PI / 4, speed: 0.006 },
            { name: 'PHP', icon: 'P', color: this.colors.purple, orbit: 2, angle: 5 * Math.PI / 4, speed: 0.006 },
            
            // Outer orbit - Database & Tools
            { name: 'PostgreSQL', icon: '◉', color: this.colors.cyan, orbit: 3, angle: 0, speed: 0.004 },
            { name: 'Docker', icon: '◈', color: this.colors.cyan, orbit: 3, angle: 2 * Math.PI / 3, speed: 0.004 },
            { name: 'Git', icon: 'G', color: this.colors.amber, orbit: 3, angle: 4 * Math.PI / 3, speed: 0.004 }
        ];
        
        // Animation
        this.particles = [];
        this.createParticles();
        this.animate();
    }
    
    createParticles() {
        // Ambient particles
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    drawOrbitRings() {
        const orbits = [
            { radius: 120, color: this.colors.cyan, width: 1, opacity: 0.2 },
            { radius: 170, color: this.colors.purple, width: 1, opacity: 0.15 },
            { radius: 220, color: this.colors.amber, width: 1, opacity: 0.1 }
        ];
        
        orbits.forEach(orbit => {
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, orbit.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = orbit.color;
            this.ctx.lineWidth = orbit.width;
            this.ctx.globalAlpha = orbit.opacity;
            this.ctx.stroke();
            this.ctx.globalAlpha = 1;
        });
    }
    
    drawTechnologies() {
        const orbitRadii = { 1: 120, 2: 170, 3: 220 };
        
        this.technologies.forEach(tech => {
            // Update angle
            tech.angle += tech.speed;
            
            const radius = orbitRadii[tech.orbit];
            const x = this.centerX + Math.cos(tech.angle) * radius;
            const y = this.centerY + Math.sin(tech.angle) * radius;
            
            // Draw glow
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 20);
            gradient.addColorStop(0, tech.color + '40');
            gradient.addColorStop(1, 'transparent');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x - 20, y - 20, 40, 40);
            
            // Draw tech icon background
            this.ctx.beginPath();
            this.ctx.arc(x, y, 16, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(8,9,13,0.8)';
            this.ctx.fill();
            this.ctx.strokeStyle = tech.color;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Draw icon text
            this.ctx.font = 'bold 14px monospace';
            this.ctx.fillStyle = tech.color;
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText(tech.icon, x, y);
            
            // Draw tech name on hover (simple always-on version)
            if (tech.orbit === 2) {
                this.ctx.font = '10px sans-serif';
                this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
                this.ctx.fillText(tech.name, x, y + 30);
            }
        });
    }
    
    drawParticles() {
        this.particles.forEach(p => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around
            if (p.x < 0) p.x = this.width;
            if (p.x > this.width) p.x = 0;
            if (p.y < 0) p.y = this.height;
            if (p.y > this.height) p.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0,229,255,${p.opacity})`;
            this.ctx.fill();
        });
    }
    
    animate() {
        // Clear with fade effect
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Draw elements
        this.drawParticles();
        this.drawOrbitRings();
        this.drawTechnologies();
        
        // Continue animation
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    const aboutCanvas = document.getElementById('aboutOrbitCanvas');
    if (aboutCanvas) {
        new AboutOrbit('aboutOrbitCanvas');
    }
});
