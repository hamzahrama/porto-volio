// Living Technology Orbit Animation System
// Cinematic futuristic developer portfolio animation
// Maintains Dark Gothic Cosmic theme with enhanced visual effects

class LivingTechOrbit {
    constructor() {
        this.config = this.getTechConfiguration();
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.particles = [];
        this.connections = [];
        this.mousePosition = { x: 0, y: 0 };
        this.lastMousePosition = { x: 0, y: 0 };
        this.isInitialized = false;
        this.isPaused = false;
        this.animationTime = 0;
        
        // Colors from specification
        this.colors = {
            electricCyan: '#00F5FF',
            neonBlue: '#168BFF',
            deepPurple: '#8B5CF6',
            softWhite: '#EAFBFF'
        };
        
        // Performance settings
        this.settings = {
            highPerformance: true,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
            particleCount: window.innerWidth > 768 ? 80 : 40,
            connectionDistance: 150,
            connectionLineWidth: 1.5,
            particleSpeed: 0.5,
            animationFrameThrottle: 1000 / 60
        };
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
        
        // Handle resize
        window.addEventListener('resize', this.debounce(() => this.handleResize(), 250));
        
        // Handle reduced motion preference
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.settings.reducedMotion = e.matches;
            if (e.matches) {
                this.pauseAnimation();
            } else {
                this.resumeAnimation();
            }
        });
    }
    
    // Main initialization
    init() {
        if (this.isInitialized) return;
        
        // Create canvas for particles and connections
        this.createCanvas();
        
        // Initialize tech items
        this.initTechItems();
        
        // Initialize particles
        this.initParticles();
        
        // Initialize connections
        this.initConnections();
        
        // Start animation loop
        this.startAnimation();
        
        // Setup interactions
        this.setupInteractions();
        
        this.isInitialized = true;
        
        // Dispatch event for completion
        window.dispatchEvent(new CustomEvent('livingTechOrbitInitialized'));
    }
    
    // Get technology configuration
    getTechConfiguration() {
        return {
            // Frontend Technologies
            html5: {
                name: 'HTML5',
                icon: 'fab fa-html5',
                category: 'Frontend',
                orbitRadius: 280,
                orbitSpeed: 0.0008,
                direction: 'counter-clockwise',
                animationDelay: 0,
                iconSize: 45,
                glowColor: '#E34F26',
                zIndex: 100
            },
            css3: {
                name: 'CSS3',
                icon: 'fab fa-css3-alt',
                category: 'Frontend',
                orbitRadius: 260,
                orbitSpeed: 0.0009,
                direction: 'clockwise',
                animationDelay: 0.2,
                iconSize: 40,
                glowColor: '#1572B6',
                zIndex: 99
            },
            javascript: {
                name: 'JavaScript',
                icon: 'fab fa-js',
                category: 'Frontend',
                orbitRadius: 240,
                orbitSpeed: 0.001,
                direction: 'counter-clockwise',
                animationDelay: 0.4,
                iconSize: 50,
                glowColor: '#F7DF1E',
                zIndex: 98
            },
            typescript: {
                name: 'TypeScript',
                icon: 'fab fa-typescript',
                category: 'Frontend',
                orbitRadius: 220,
                orbitSpeed: 0.0007,
                direction: 'clockwise',
                animationDelay: 0.6,
                iconSize: 42,
                glowColor: '#3178C6',
                zIndex: 97
            },
            react: {
                name: 'React',
                icon: 'fab fa-react',
                category: 'Frontend',
                orbitRadius: 200,
                orbitSpeed: 0.00085,
                direction: 'counter-clockwise',
                animationDelay: 0.8,
                iconSize: 48,
                glowColor: '#61DAFB',
                zIndex: 96
            },
            nextjs: {
                name: 'Next.js',
                icon: 'fas fa-arrow-right',
                category: 'Frontend',
                orbitRadius: 180,
                orbitSpeed: 0.0006,
                direction: 'clockwise',
                animationDelay: 1.0,
                iconSize: 44,
                glowColor: '#000000',
                zIndex: 95
            },
            tailwindcss: {
                name: 'Tailwind CSS',
                icon: 'fas fa-puzzle-piece',
                category: 'Frontend',
                orbitRadius: 160,
                orbitSpeed: 0.00095,
                direction: 'counter-clockwise',
                animationDelay: 1.2,
                iconSize: 38,
                glowColor: '#06B6D4',
                zIndex: 94
            },
            
            // Backend Technologies
            nodejs: {
                name: 'Node.js',
                icon: 'fab fa-node-js',
                category: 'Backend',
                orbitRadius: 360,
                orbitSpeed: 0.0005,
                direction: 'clockwise',
                animationDelay: 0.1,
                iconSize: 52,
                glowColor: '#339933',
                zIndex: 93
            },
            nestjs: {
                name: 'NestJS',
                icon: 'fas fa-layer-group',
                category: 'Backend',
                orbitRadius: 340,
                orbitSpeed: 0.00065,
                direction: 'counter-clockwise',
                animationDelay: 0.3,
                iconSize: 46,
                glowColor: '#E0234E',
                zIndex: 92
            },
            php: {
                name: 'PHP',
                icon: 'fab fa-php',
                category: 'Backend',
                orbitRadius: 320,
                orbitSpeed: 0.00075,
                direction: 'clockwise',
                animationDelay: 0.5,
                iconSize: 50,
                glowColor: '#777BB4',
                zIndex: 91
            },
            laravel: {
                name: 'Laravel',
                icon: 'fas fa-leaf',
                category: 'Backend',
                orbitRadius: 300,
                orbitSpeed: 0.00055,
                direction: 'counter-clockwise',
                animationDelay: 0.7,
                iconSize: 48,
                glowColor: '#FF2D20',
                zIndex: 90
            },
            python: {
                name: 'Python',
                icon: 'fab fa-python',
                category: 'Backend',
                orbitRadius: 280,
                orbitSpeed: 0.00065,
                direction: 'clockwise',
                animationDelay: 0.9,
                iconSize: 44,
                glowColor: '#3776AB',
                zIndex: 89
            },
            
            // Database Technologies
            postgresql: {
                name: 'PostgreSQL',
                icon: 'fas fa-database',
                category: 'Database',
                orbitRadius: 420,
                orbitSpeed: 0.00045,
                direction: 'counter-clockwise',
                animationDelay: 0.15,
                iconSize: 42,
                glowColor: '#336791',
                zIndex: 88
            },
            mysql: {
                name: 'MySQL',
                icon: 'fas fa-storage',
                category: 'Database',
                orbitRadius: 400,
                orbitSpeed: 0.00055,
                direction: 'clockwise',
                animationDelay: 0.35,
                iconSize: 46,
                glowColor: '#4479A1',
                zIndex: 87
            },
            mongodb: {
                name: 'MongoDB',
                icon: 'fas fa-leaf',
                category: 'Database',
                orbitRadius: 380,
                orbitSpeed: 0.00065,
                direction: 'counter-clockwise',
                animationDelay: 0.55,
                iconSize: 44,
                glowColor: '#47A248',
                zIndex: 86
            },
            redis: {
                name: 'Redis',
                icon: 'fas fa-memory',
                category: 'Database',
                orbitRadius: 360,
                orbitSpeed: 0.00075,
                direction: 'clockwise',
                animationDelay: 0.75,
                iconSize: 40,
                glowColor: '#DC382D',
                zIndex: 85
            },
            
            // DevOps & Infrastructure
            docker: {
                name: 'Docker',
                icon: 'fab fa-docker',
                category: 'DevOps & Infrastructure',
                orbitRadius: 440,
                orbitSpeed: 0.0004,
                direction: 'counter-clockwise',
                animationDelay: 0.2,
                iconSize: 48,
                glowColor: '#2496ED',
                zIndex: 84
            },
            git: {
                name: 'Git',
                icon: 'fab fa-git-alt',
                category: 'DevOps & Infrastructure',
                orbitRadius: 420,
                orbitSpeed: 0.00045,
                direction: 'clockwise',
                animationDelay: 0.4,
                iconSize: 42,
                glowColor: '#F05032',
                zIndex: 83
            },
            github: {
                name: 'GitHub',
                icon: 'fab fa-github',
                category: 'DevOps & Infrastructure',
                orbitRadius: 400,
                orbitSpeed: 0.00055,
                direction: 'counter-clockwise',
                animationDelay: 0.6,
                iconSize: 44,
                glowColor: '#181717',
                zIndex: 82
            },
            linux: {
                name: 'Linux',
                icon: 'fab fa-linux',
                category: 'DevOps & Infrastructure',
                orbitRadius: 380,
                orbitSpeed: 0.00065,
                direction: 'clockwise',
                animationDelay: 0.8,
                iconSize: 46,
                glowColor: '#FCC624',
                zIndex: 81
            },
            nginx: {
                name: 'Nginx',
                icon: 'fas fa-server',
                category: 'DevOps & Infrastructure',
                orbitRadius: 360,
                orbitSpeed: 0.00075,
                direction: 'counter-clockwise',
                animationDelay: 1.0,
                iconSize: 42,
                glowColor: '#009639',
                zIndex: 80
            },
            
            // Tools & Other
            vscod: {
                name: 'VS Code',
                icon: 'fas fa-code',
                category: 'Tools & Other',
                orbitRadius: 480,
                orbitSpeed: 0.0003,
                direction: 'clockwise',
                animationDelay: 0.25,
                iconSize: 40,
                glowColor: '#007ACC',
                zIndex: 79
            },
            restapi: {
                name: 'REST API',
                icon: 'fas fa-exchange-alt',
                category: 'Tools & Other',
                orbitRadius: 460,
                orbitSpeed: 0.00045,
                direction: 'counter-clockwise',
                animationDelay: 0.45,
                iconSize: 38,
                glowColor: '#FF6B35',
                zIndex: 78
            },
            graphql: {
                name: 'GraphQL',
                icon: 'fas fa-project-diagram',
                category: 'Tools & Other',
                orbitRadius: 440,
                orbitSpeed: 0.00055,
                direction: 'clockwise',
                animationDelay: 0.65,
                iconSize: 42,
                glowColor: '#E10098',
                zIndex: 77
            },
            figma: {
                name: 'Figma',
                icon: 'fas fa-pencil-alt',
                category: 'Tools & Other',
                orbitRadius: 420,
                orbitSpeed: 0.00065,
                direction: 'counter-clockwise',
                animationDelay: 0.85,
                iconSize: 36,
                glowColor: '#F24E1E',
                zIndex: 76
            }
        };
    }
    
    // Create main canvas
    createCanvas() {
        // Find or create container
        const container = document.querySelector('.tech-orbit-section');
        if (!container) return;
        
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'tech-orbit-canvas';
        
        // Set canvas to full size of container
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width * this.settings.devicePixelRatio;
        this.canvas.height = rect.height * this.settings.devicePixelRatio;
        
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        // Apply dark gothic cosmic styling
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '0';
        this.canvas.style.pointerEvents = 'all';
        
        // Append to container
        container.insertBefore(this.canvas, container.firstChild);
        
        // Get 2D context
        this.ctx = this.canvas.getContext('2d');
        
        // Set high-quality rendering
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        
        // Store container reference
        this.container = container;
    }
    
    // Initialize tech items with orbital positions
    initTechItems() {
        const orbitItems = document.querySelectorAll('.orbit-item-tech');
        this.techItems = [];
        
        orbitItems.forEach((item, index) => {
            const techKey = this.getTechKeyFromItem(item);
            const techConfig = this.config[techKey] || this.getDefaultConfig(index);
            
            const techData = {
                element: item,
                config: techConfig,
                angle: 0,
                radius: techConfig.orbitRadius,
                speed: techConfig.orbitSpeed,
                direction: techConfig.direction === 'counter-clockwise' ? -1 : 1,
                delay: techConfig.animationDelay,
                size: techConfig.iconSize,
                glowColor: techConfig.glowColor,
                category: techConfig.category,
                name: techConfig.name,
                x: 0,
                y: 0,
                zIndex: techConfig.zIndex,
                isHovered: false,
                isActive: false,
                lastPosition: { x: 0, y: 0 },
                rotationAngle: 0
            };
            
            // Apply initial styles
            this.updateTechItemStyle(techData);
            
            this.techItems.push(techData);
        });
        
        // Apply initial positions
        this.updateTechItemsPosition();
    }
    
    // Get tech key from DOM element
    getTechKeyFromItem(item) {
        const title = item.getAttribute('title');
        if (!title) return null;
        
        // Map tech names to config keys
        const nameMap = {
            'HTML5': 'html5',
            'CSS3': 'css3',
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'React': 'react',
            'Next.js': 'nextjs',
            'Tailwind CSS': 'tailwindcss',
            'Node.js': 'nodejs',
            'NestJS': 'nestjs',
            'PHP': 'php',
            'Laravel': 'laravel',
            'Python': 'python',
            'PostgreSQL': 'postgresql',
            'MySQL': 'mysql',
            'MongoDB': 'mongodb',
            'Redis': 'redis',
            'Docker': 'docker',
            'Git': 'git',
            'GitHub': 'github',
            'Linux': 'linux',
            'Nginx': 'nginx',
            'VS Code': 'vscod',
            'REST API': 'restapi',
            'GraphQL': 'graphql',
            'Figma': 'figma'
        };
        
        return nameMap[title] || null;
    }
    
    // Get default config for items not in config
    getDefaultConfig(index) {
        return {
            name: `Tech ${index + 1}`,
            icon: 'fas fa-cube',
            category: 'Other',
            orbitRadius: 200 + (index * 20),
            orbitSpeed: 0.0008,
            direction: index % 2 === 0 ? 'counter-clockwise' : 'clockwise',
            animationDelay: index * 0.1,
            iconSize: 35,
            glowColor: this.colors.electricCyan,
            zIndex: 50 + index
        };
    }
    
    // Update tech item style
    updateTechItemStyle(techData) {
        const element = techData.element;
        
        // Set z-index for layering
        element.style.zIndex = techData.zIndex;
        
        // Set initial opacity
        element.style.opacity = '0';
        
        // Set initial transform
        element.style.transform = `translate(-50%, -50%) scale(${techData.size / 45})`;
        
        // Apply glow effect
        element.style.filter = `drop-shadow(0 0 15px ${techData.glowColor}60)`;
        
        // Set transition
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Update all tech items positions
    updateTechItemsPosition() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const time = Date.now() * 0.001;
        
        this.techItems.forEach((tech, index) => {
            // Calculate angle with animation time
            let angle = tech.delay + (time * tech.speed * tech.direction);
            
            // Add some elliptical wobble
            const wobble = Math.sin(time * 0.001 * (index + 1)) * 0.1;
            const wobbleAngle = wobble * (Math.PI / 2);
            
            // Calculate position
            const x = centerX + Math.cos(angle + wobbleAngle) * tech.radius;
            const y = centerY + Math.sin(angle) * tech.radius * 0.8;
            
            tech.x = x;
            tech.y = y;
            tech.angle = angle;
            tech.lastPosition = { x, y };
            
            // Update element position
            tech.element.style.left = `${x}px`;
            tech.element.style.top = `${y}px`;
            tech.element.style.opacity = '1';
            
            // Add rotation based on movement
            const rotation = tech.direction * (time * 0.5 * (index + 1));
            tech.rotationAngle = rotation;
            tech.element.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(${tech.size / 45})`;
            
            // Update hover state
            if (tech.isHovered) {
                tech.element.style.transform += ` scale(1.2)`;
                tech.element.style.filter = `drop-shadow(0 0 25px ${tech.glowColor}) brightness(1.2)`;
                tech.element.style.zIndex = '1000';
            }
        });
    }
    
    // Initialize particles for background
    initParticles() {
        this.particles = [];
        const particleCount = this.settings.particleCount;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.settings.particleSpeed,
                vy: (Math.random() - 0.5) * this.settings.particleSpeed,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                color: Math.random() > 0.5 ? this.colors.electricCyan : this.colors.deepPurple,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01
            });
        }
    }
    
    // Initialize connection lines
    initConnections() {
        this.connections = [];
        
        // Create connection patterns
        for (let i = 0; i < this.techItems.length; i++) {
            for (let j = i + 1; j < this.techItems.length; j++) {
                const item1 = this.techItems[i];
                const item2 = this.techItems[j];
                
                // Calculate base distance
                const dx = item1.x - item2.x;
                const dy = item1.y - item2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.settings.connectionDistance * 1.2) {
                    this.connections.push({
                        from: item1,
                        to: item2,
                        distance: distance,
                        lineWidth: Math.max(0.5, 2 - distance / this.settings.connectionDistance),
                        opacity: Math.max(0.1, 1 - distance / (this.settings.connectionDistance * 2)),
                        pulsePhase: Math.random() * Math.PI * 2,
                        wavePhase: Math.random() * Math.PI * 2,
                        waveAmplitude: Math.random() * 10 + 5,
                        color: this.getConnectionColor(i, j),
                        active: false,
                        hoverLine: false
                    });
                }
            }
        }
    }
    
    // Get connection color based on items
    getConnectionColor(index1, index2) {
        const item1 = this.techItems[index1];
        const item2 = this.techItems[index2];
        
        // Determine color based on categories
        const categories = [item1.category, item2.category];
        if (categories.includes('Frontend') && categories.includes('Backend')) {
            return this.colors.electricCyan;
        } else if (categories.includes('Database') && categories.includes('DevOps & Infrastructure')) {
            return this.colors.deepPurple;
        } else if (categories.includes('Tools & Other')) {
            return this.colors.neonBlue;
        } else {
            return this.colors.softWhite;
        }
    }
    
    // Setup interactions
    setupInteractions() {
        // Mouse move on canvas for parallax effect
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mousePosition.x = (e.clientX - rect.left) * this.settings.devicePixelRatio;
            this.mousePosition.y = (e.clientY - rect.top) * this.settings.devicePixelRatio;
        });
        
        // Mouse leave
        this.canvas.addEventListener('mouseleave', () => {
            this.mousePosition.x = -1000;
            this.mousePosition.y = -1000;
        });
        
        // Tech item hover
        this.techItems.forEach(tech => {
            tech.element.addEventListener('mouseenter', () => this.onTechItemHover(tech));
            tech.element.addEventListener('mouseleave', () => this.onTechItemLeave(tech));
            tech.element.addEventListener('click', (e) => this.onTechItemClick(e, tech));
        });
        
        // Tech item touch support (mobile)
        this.techItems.forEach(tech => {
            tech.element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.onTechItemHover(tech);
            }, { passive: false });
            
            tech.element.addEventListener('touchend', (e) => {
                e.preventDefault();
                setTimeout(() => this.onTechItemLeave(tech), 1000);
            }, { passive: false });
        });
    }
    
    // Tech item hover handler
    onTechItemHover(tech) {
        tech.isHovered = true;
        tech.element.style.zIndex = '1000';
        tech.element.style.transform = `translate(-50%, -50%) rotate(${tech.rotationAngle}deg) scale(${tech.size / 45 * 1.2})`;
        tech.element.style.filter = `drop-shadow(0 0 25px ${tech.glowColor}) brightness(1.2)`;
        
        // Update connections
        this.updateConnectionsForHover(tech, true);
        
        // Show tooltip
        this.showTechTooltip(tech);
    }
    
    // Tech item leave handler
    onTechItemLeave(tech) {
        tech.isHovered = false;
        tech.element.style.transform = `translate(-50%, -50%) rotate(${tech.rotationAngle}deg) scale(${tech.size / 45})`;
        tech.element.style.filter = `drop-shadow(0 0 15px ${tech.glowColor}60)`;
        tech.element.style.zIndex = tech.zIndex;
        
        // Update connections
        this.updateConnectionsForHover(tech, false);
        
        // Hide tooltip
        this.hideTechTooltip();
    }
    
    // Tech item click handler
    onTechItemClick(e, tech) {
        e.preventDefault();
        
        // Create ripple effect
        this.createRipple(tech, e);
        
        // Toggle active state
        tech.isActive = !tech.isActive;
        tech.element.classList.toggle('active', tech.isActive);
        
        // Show notification
        this.showNotification(`Exploring ${tech.name} technology!`, 'info');
    }
    
    // Update connections for hover
    updateConnectionsForHover(hoveredTech, isHovering) {
        this.connections.forEach(connection => {
            const isInvolving = connection.from === hoveredTech || connection.to === hoveredTech;
            
            if (isInvolving) {
                connection.active = isHovering;
                connection.hoverLine = isHovering;
            }
            
            // Update other connections for visual feedback
            this.techItems.forEach((tech, index) => {
                if (tech !== hoveredTech && tech !== connection.from && tech !== connection.to) {
                    const distance = Math.sqrt(
                        Math.pow(tech.x - hoveredTech.x, 2) + 
                        Math.pow(tech.y - hoveredTech.y, 2)
                    );
                    
                    if (distance < this.settings.connectionDistance * 2 && isHovering) {
                        const relatedConnection = this.connections.find(conn => 
                            (conn.from === tech && conn.to === hoveredTech) || 
                            (conn.to === tech && conn.from === hoveredTech)
                        );
                        
                        if (relatedConnection) {
                            relatedConnection.active = true;
                        }
                    }
                }
            });
        });
    }
    
    // Show tech tooltip
    showTechTooltip(tech) {
        // Create or get tooltip element
        let tooltip = document.querySelector('.tech-tooltip');
        
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            document.body.appendChild(tooltip);
            
            // Add tooltip styles
            const style = document.createElement('style');
            style.textContent = `
                .tech-tooltip {
                    position: absolute;
                    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    border-radius: 8px;
                    padding: 12px 16px;
                    color: var(--text-primary);
                    font-size: 14px;
                    font-weight: 500;
                    pointer-events: none;
                    opacity: 0;
                    transform: translate(-50%, -100%);
                    transition: all 0.3s ease;
                    z-index: 10000;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 20px rgba(59, 130, 246, 0.2);
                }
                
                .tech-tooltip.show {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
                
                .tech-tooltip::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    border: 6px solid transparent;
                    border-top-color: rgba(59, 130, 246, 0.3);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Update tooltip content
        tooltip.innerHTML = `
            <div style="font-weight: 600; color: var(--primary-color); margin-bottom: 4px;">${tech.name}</div>
            <div style="font-size: 12px; color: var(--text-secondary);">${tech.category}</div>
        `;
        
        // Position and show tooltip
        const rect = tech.element.getBoundingClientRect();
        tooltip.style.left = (rect.left + rect.width / 2) + 'px';
        tooltip.style.top = (rect.top + window.scrollY) + 'px';
        tooltip.classList.add('show');
    }
    
    // Hide tech tooltip
    hideTechTooltip() {
        const tooltip = document.querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }
    
    // Create ripple effect
    createRipple(tech, event) {
        const ripple = document.createElement('div');
        ripple.className = 'tech-ripple';
        
        const rect = tech.element.getBoundingClientRect();
        const x = (event.clientX || event.touches?.[0]?.clientX) - rect.left;
        const y = (event.clientY || event.touches?.[0]?.clientY) - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        tech.element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Show notification
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
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
    
    // Handle resize
    handleResize() {
        if (!this.canvas || !this.container) return;
        
        const rect = this.container.getBoundingClientRect();
        const newWidth = rect.width * this.settings.devicePixelRatio;
        const newHeight = rect.height * this.settings.devicePixelRatio;
        
        // Resize canvas
        this.canvas.width = newWidth;
        this.canvas.height = newHeight;
        
        // Update tech settings for smaller screens
        if (rect.width < 768) {
            this.settings.particleCount = 30;
            this.settings.connectionDistance = 120;
        } else {
            this.settings.particleCount = 80;
            this.settings.connectionDistance = 150;
        }
        
        // Reinitialize particles and connections
        this.initParticles();
        this.initConnections();
    }
    
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) { // eslint-disable-line no-unused-vars
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Start animation loop
    startAnimation() {
        const animate = () => {
            if (this.isPaused || this.settings.reducedMotion) {
                this.animationId = requestAnimationFrame(animate);
                return;
            }
            
            // Update animation time
            this.animationTime = Date.now() * 0.001;
            
            // Clear canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw particles
            this.updateAndDrawParticles();
            
            // Update and draw connections
            this.updateAndDrawConnections();
            
            // Update and draw tech items
            this.updateTechItemsPosition();
            
            // Add energy waves
            this.drawEnergyWaves();
            
            // Draw background grid
            this.drawBackgroundGrid();
            
            // Continue animation
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
    
    // Update and draw particles
    updateAndDrawParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Update rotation
            particle.rotation += particle.rotationSpeed;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Update pulse
            const pulse = Math.sin(this.animationTime * particle.pulseSpeed + particle.pulsePhase);
            const size = particle.size * (1 + pulse * 0.5);
            const opacity = particle.opacity * (0.5 + pulse * 0.5);
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowBlur = size * 2;
            this.ctx.shadowColor = particle.color;
            this.ctx.beginPath();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation);
            this.ctx.fillRect(-size / 2, -size / 2, size, size);
            this.ctx.restore();
        });
    }
    
    // Update and draw connections
    updateAndDrawConnections() {
        this.connections.forEach((connection, index) => {
            const fromItem = connection.from;
            const toItem = connection.to;
            
            // Calculate animated line path
            const dx = toItem.x - fromItem.x;
            const dy = toItem.y - fromItem.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Determine if connection should be visible
            let shouldShow = distance < this.settings.connectionDistance;
            
            // Check if connection involves hovered items
            const isInvolvingHovered = 
                (connection.from.isHovered && connection.to.isHovered) ||
                connection.active ||
                connection.hoverLine;
            
            if (isInvolvingHovered) {
                shouldShow = true;
            }
            
            if (shouldShow) {
                // Update pulse phase
                connection.pulsePhase += 0.02;
                connection.wavePhase += 0.01;
                
                // Calculate wave offset
                const waveOffset = Math.sin(connection.wavePhase) * connection.waveAmplitude;
                
                // Draw connection line
                this.drawConnectionLine(fromItem, toItem, connection, waveOffset);
            }
        });
    }
    
    // Draw connection line
    drawConnectionLine(fromItem, toItem, connection, waveOffset) {
        const startX = fromItem.x;
        const startY = fromItem.y;
        const endX = toItem.x;
        const endY = toItem.y;
        
        // Calculate distance for line width and opacity
        const dx = endX - startX;
        const dy = endY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Calculate line properties
        const lineWidth = connection.lineWidth * (connection.active ? 2 : 1);
        const opacity = connection.opacity * (connection.active ? 1 : 0.6);
        const color = connection.color;
        
        // Set line properties
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = color;
        this.ctx.shadowBlur = lineWidth * 3;
        this.ctx.shadowColor = color;
        this.ctx.lineWidth = lineWidth;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        
        // Draw line with wave effect
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        
        // Add wave animation
        const wavePoints = 20;
        for (let i = 0; i <= wavePoints; i++) {
            const t = i / wavePoints;
            const x = startX + dx * t;
            const y = startY + dy * t;
            
            // Add wave offset
            const waveX = x + Math.sin(t * Math.PI * 5 + connection.pulsePhase) * waveOffset * t;
            const waveY = y + Math.sin(t * Math.PI * 3 + connection.wavePhase) * waveOffset * t * 0.5;
            
            if (i === 0) {
                this.ctx.moveTo(waveX, waveY);
            } else {
                this.ctx.lineTo(waveX, waveY);
            }
        }
        
        this.ctx.stroke();
        this.ctx.restore();
        
        // Draw energy particles along the line
        if (connection.active || connection.hoverLine) {
            this.drawConnectionParticles(startX, startY, endX, endY, distance, color);
        }
    }
    
    // Draw energy particles along connection lines
    drawConnectionParticles(startX, startY, endX, endY, distance, color) {
        const particleCount = Math.min(10, distance / 30);
        
        for (let i = 0; i < particleCount; i++) {
            const t = (this.animationTime * 2 + i * 0.3) % 1;
            const x = startX + (endX - startX) * t;
            const y = startY + (endY - startY) * t;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = 0.8;
            this.ctx.fillStyle = color;
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = color;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 2, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }
    
    // Draw energy waves
    drawEnergyWaves() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const time = this.animationTime;
        
        // Draw multiple concentric waves
        for (let wave = 0; wave < 3; wave++) {
            const radius = 100 + wave * 150 + time * 50;
            const opacity = 0.1 / (wave + 1);
            const color = wave === 0 ? this.colors.electricCyan : 
                         wave === 1 ? this.colors.neonBlue : 
                         this.colors.deepPurple;
            
            this.ctx.save();
            this.ctx.globalAlpha = opacity;
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = 1 / (wave + 1);
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = color;
            this.ctx.beginPath();
            
            for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
                const x = centerX + Math.cos(angle) * radius;
                const y = centerY + Math.sin(angle) * radius;
                
                if (angle === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            
            this.ctx.stroke();
            this.ctx.restore();
        }
    }
    
    // Draw background grid
    drawBackgroundGrid() {
        const gridSize = 50;
        const opacity = 0.05;
        
        this.ctx.save();
        this.ctx.globalAlpha = opacity;
        this.ctx.strokeStyle = this.colors.softWhite;
        this.ctx.lineWidth = 0.5;
        
        // Draw horizontal lines
        for (let y = 0; y <= this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        // Draw vertical lines
        for (let x = 0; x <= this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }
    
    // Pause animation
    pauseAnimation() {
        this.isPaused = true;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    // Resume animation
    resumeAnimation() {
        this.isPaused = false;
        this.startAnimation();
    }
    
    // Add CSS for ripple effect
    addRippleStyles() {
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
            
            .tech-item.active {
                animation: pulseActive 1s infinite;
            }
            
            @keyframes pulseActive {
                0%, 100% {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
                }
                50% {
                    box-shadow: 0 0 40px rgba(59, 130, 246, 0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Cleanup
    destroy() {
        this.pauseAnimation();
        
        if (this.canvas) {
            this.canvas.removeEventListener('mousemove', this.handleMouseMove);
            this.canvas.removeEventListener('mouseleave', this.handleMouseLeave);
            this.canvas.remove();
            this.canvas = null;
        }
        
        this.techItems = [];
        this.particles = [];
        this.connections = [];
        this.ctx = null;
        this.isInitialized = false;
    }
}

// Export for global access
window.LivingTechOrbit = LivingTechOrbit;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.techOrbit = new LivingTechOrbit();
        window.techOrbit.addRippleStyles();
    });
} else {
    window.techOrbit = new LivingTechOrbit();
    window.techOrbit.addRippleStyles();
}

// Handle theme changes
window.addEventListener('themeChanged', (e) => {
    if (window.techOrbit) {
        // Update colors based on theme
        const isDark = e.detail.theme === 'dark';
        if (window.techOrbit.colors) {
            window.techOrbit.colors.electricCyan = isDark ? '#00F5FF' : '#0066CC';
            window.techOrbit.colors.neonBlue = isDark ? '#168BFF' : '#0066FF';
            window.techOrbit.colors.deepPurple = isDark ? '#8B5CF6' : '#6B46C1';
            window.techOrbit.colors.softWhite = isDark ? '#EAFBFF' : '#1A202C';
        }
    }
});