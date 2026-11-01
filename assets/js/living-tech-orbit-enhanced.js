// ENHANCED LIVING TECHNOLOGY ORBIT - Premium Version
// Makes orbit truly alive with dynamic effects

class LivingTechOrbitEnhanced {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.orbitItems = [];
        this.particles = [];
        this.energyRings = [];
        this.animationId = null;
        this.time = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseTargetX = 0;
        this.mouseTargetY = 0;
        this.isRunning = true;
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.setupOrbits();
        this.setupParticles();
        this.setupEventListeners();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'tech-orbit-canvas';
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.canvas.style.width = '500px';
        this.canvas.style.height = '500px';
        
        const container = document.querySelector('.orbit-container');
        if (container) {
            container.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 500;
        this.canvas.height = 500;
    }
    
    setupOrbits() {
        const techs = [
            { name: 'HTML5', icon: 'fab fa-html5', radius: 150, speed: 0.008, angle: 0, color: '#E34F26' },
            { name: 'CSS3', icon: 'fab fa-css3-alt', radius: 150, speed: 0.008, angle: Math.PI * 2 / 6, color: '#1572B6' },
            { name: 'JavaScript', icon: 'fab fa-js', radius: 150, speed: 0.008, angle: Math.PI * 4 / 6, color: '#F7DF1E' },
            { name: 'TypeScript', icon: 'fab fa-js-square', radius: 150, speed: 0.008, angle: Math.PI * 6 / 6, color: '#3178C6' },
            { name: 'React', icon: 'fab fa-react', radius: 150, speed: 0.008, angle: Math.PI * 8 / 6, color: '#61DAFB' },
            { name: 'Next.js', icon: 'fas fa-arrow-right', radius: 150, speed: 0.008, angle: Math.PI * 10 / 6, color: '#FFFFFF' },
            
            { name: 'Node.js', icon: 'fab fa-node-js', radius: 190, speed: 0.006, angle: 0, color: '#339933' },
            { name: 'NestJS', icon: 'fas fa-server', radius: 190, speed: 0.006, angle: Math.PI * 2 / 5, color: '#E0234E' },
            { name: 'PHP', icon: 'fab fa-php', radius: 190, speed: 0.006, angle: Math.PI * 4 / 5, color: '#777BB4' },
            { name: 'Laravel', icon: 'fab fa-laravel', radius: 190, speed: 0.006, angle: Math.PI * 6 / 5, color: '#FF2D20' },
            { name: 'Python', icon: 'fab fa-python', radius: 190, speed: 0.006, angle: Math.PI * 8 / 5, color: '#3776AB' },
            
            { name: 'PostgreSQL', icon: 'fas fa-database', radius: 230, speed: 0.004, angle: 0, color: '#336791' },
            { name: 'MySQL', icon: 'fas fa-database', radius: 230, speed: 0.004, angle: Math.PI * 2 / 6, color: '#4479A1' },
            { name: 'MongoDB', icon: 'fas fa-leaf', radius: 230, speed: 0.004, angle: Math.PI * 4 / 6, color: '#47A248' },
            { name: 'Docker', icon: 'fab fa-docker', radius: 230, speed: 0.004, angle: Math.PI * 6 / 6, color: '#2496ED' },
            { name: 'Git', icon: 'fab fa-git-alt', radius: 230, speed: 0.004, angle: Math.PI * 8 / 6, color: '#F05032' },
            { name: 'GitHub', icon: 'fab fa-github', radius: 230, speed: 0.004, angle: Math.PI * 10 / 6, color: '#FFFFFF' },
        ];
        
        techs.forEach((tech, idx) => {
            this.orbitItems.push({
                ...tech,
                x: 0,
                y: 0,
                vx: 0,
                vy: 0,
                baseX: 0,
                baseY: 0,
                radiusX: tech.radius,
                radiusY: tech.radius * 0.8,
                glow: 0,
                targetGlow: 0,
                angle: tech.angle,
                hovered: false,
                pulse: Math.random() * Math.PI * 2
            });
        });
    }
    
    setupParticles() {
        for (let i = 0; i < 60; i++) {
            this.particles.push({
                x: Math.random() * 500,
                y: Math.random() * 500,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5,
                life: Math.random(),
                maxLife: 1,
                color: Math.random() > 0.5 ? '#00F5FF' : '#9D4EDD'
            });
        }
    }
    
    setupEventListeners() {
        const canvas = this.canvas;
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseTargetX = (e.clientX - rect.left) - 250;
            this.mouseTargetY = (e.clientY - rect.top) - 250;
            
            // Check hover
            this.orbitItems.forEach(item => {
                const dist = Math.hypot(item.x - this.mouseTargetX, item.y - this.mouseTargetY);
                if (dist < 30) {
                    item.hovered = true;
                    item.targetGlow = 1;
                } else {
                    item.hovered = false;
                    item.targetGlow = 0;
                }
            });
        });
        
        canvas.addEventListener('mouseleave', () => {
            this.mouseTargetX = 0;
            this.mouseTargetY = 0;
            this.orbitItems.forEach(item => {
                item.hovered = false;
                item.targetGlow = 0;
            });
        });
    }
    
    animate() {
        if (!this.isRunning) return;
        
        this.time += 0.01;
        this.mouseX += (this.mouseTargetX - this.mouseX) * 0.05;
        this.mouseY += (this.mouseTargetY - this.mouseY) * 0.05;
        
        this.clear();
        this.drawEnergyRings();
        this.drawOrbits();
        this.drawParticles();
        this.drawCenter();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    clear() {
        this.ctx.clearRect(0, 0, 500, 500);
    }
    
    drawEnergyRings() {
        const centerX = 250;
        const centerY = 250;
        
        for (let i = 0; i < 3; i++) {
            this.ctx.save();
            this.ctx.globalAlpha = 0.1 + Math.sin(this.time * (i + 1) * 0.3) * 0.05;
            this.ctx.strokeStyle = i === 0 ? '#00F5FF' : i === 1 ? '#9D4EDD' : '#FFB000';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, 60 + i * 20, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
        }
    }
    
    drawOrbits() {
        const centerX = 250;
        const centerY = 250;
        
        this.orbitItems.forEach(item => {
            // Update position
            item.angle += item.speed;
            const x = centerX + Math.cos(item.angle) * item.radiusX;
            const y = centerY + Math.sin(item.angle) * item.radiusY;
            
            // Apply mouse influence
            item.x = x + this.mouseX * 0.1 * Math.cos(item.angle);
            item.y = y + this.mouseY * 0.1 * Math.sin(item.angle);
            
            // Glow animation
            item.glow += (item.targetGlow - item.glow) * 0.1;
            item.pulse += 0.05;
            
            // Draw orbit path (subtle)
            this.ctx.save();
            this.ctx.globalAlpha = 0.1;
            this.ctx.strokeStyle = item.color;
            this.ctx.lineWidth = 0.5;
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, item.radiusX, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.restore();
            
            // Draw glow
            if (item.glow > 0) {
                this.ctx.save();
                this.ctx.globalAlpha = item.glow * 0.3;
                this.ctx.beginPath();
                this.ctx.arc(item.x, item.y, 25, 0, Math.PI * 2);
                const gradient = this.ctx.createRadialGradient(item.x, item.y, 0, item.x, item.y, 25);
                gradient.addColorStop(0, item.color);
                gradient.addColorStop(1, 'transparent');
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
                this.ctx.restore();
            }
            
            // Draw item
            this.ctx.save();
            this.ctx.globalAlpha = 0.9 + Math.sin(item.pulse) * 0.1;
            this.ctx.beginPath();
            this.ctx.arc(item.x, item.y, 18 + item.glow * 3, 0, Math.PI * 2);
            const itemGradient = this.ctx.createRadialGradient(item.x, item.y, 0, item.x, item.y, 18 + item.glow * 3);
            itemGradient.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
            itemGradient.addColorStop(1, item.color + '80');
            this.ctx.fillStyle = itemGradient;
            this.ctx.strokeStyle = item.color;
            this.ctx.lineWidth = 2;
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
            
            // Draw icon (text representation)
            this.ctx.save();
            this.ctx.fillStyle = '#FFFFFF';
            this.ctx.font = 'bold 12px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.shadowColor = item.color;
            this.ctx.shadowBlur = 10;
            // Simplified - just dots
            this.ctx.fillText('●', item.x, item.y);
            this.ctx.restore();
        });
    }
    
    drawParticles() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.002;
            
            if (p.life <= 0) {
                p.x = Math.random() * 500;
                p.y = Math.random() * 500;
                p.life = 1;
                p.vx = (Math.random() - 0.5) * 0.3;
                p.vy = (Math.random() - 0.5) * 0.3;
            }
            
            if (p.x < 0 || p.x > 500) p.vx *= -1;
            if (p.y < 0 || p.y > 500) p.vy *= -1;
            
            this.ctx.save();
            this.ctx.globalAlpha = p.life * 0.6;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    drawCenter() {
        const centerX = 250;
        const centerY = 250;
        
        // Core glow
        this.ctx.save();
        const coreGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40);
        coreGradient.addColorStop(0, 'rgba(0, 245, 255, 0.4)');
        coreGradient.addColorStop(0.5, 'rgba(157, 77, 221, 0.2)');
        coreGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = coreGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
        
        // Core
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
        const innerGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 25);
        innerGradient.addColorStop(0, '#00F5FF');
        innerGradient.addColorStop(0.7, '#9D4EDD');
        innerGradient.addColorStop(1, '#08090D');
        this.ctx.fillStyle = innerGradient;
        this.ctx.strokeStyle = '#00F5FF';
        this.ctx.lineWidth = 2;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }
}

// Initialize enhanced orbit
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => new LivingTechOrbitEnhanced(), 500);
    });
} else {
    setTimeout(() => new LivingTechOrbitEnhanced(), 500);
}
