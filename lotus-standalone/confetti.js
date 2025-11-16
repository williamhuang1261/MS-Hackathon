/**
 * Confetti celebration effect
 */

export class Confetti {
    constructor(container) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
    }

    celebrate() {
        this.createCanvas();
        this.generateParticles();
        this.animate();
        
        // Auto-cleanup after 4 seconds
        setTimeout(() => {
            this.stop();
        }, 4000);
    }

    createCanvas() {
        if (this.canvas) return;
        
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    generateParticles() {
        const colors = ['#FF69B4', '#FFB6C1', '#FFD700', '#FFA500', '#FF6347', '#90EE90', '#87CEEB', '#DDA0DD'];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 3;
        
        for (let i = 0; i < 150; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 10;
            
            this.particles.push({
                x: centerX,
                y: centerY,
                vx: Math.cos(angle) * velocity,
                vy: Math.sin(angle) * velocity - 5,
                size: 5 + Math.random() * 8,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.3,
                gravity: 0.3 + Math.random() * 0.2,
                life: 1
            });
        }
    }

    animate() {
        if (!this.ctx || !this.canvas) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update particle
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.99;
            p.rotation += p.rotationSpeed;
            p.life -= 0.01;
            
            // Remove dead particles
            if (p.life <= 0 || p.y > this.canvas.height) {
                this.particles.splice(i, 1);
                continue;
            }
            
            // Draw particle
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation);
            this.ctx.globalAlpha = p.life;
            this.ctx.fillStyle = p.color;
            
            // Draw as rectangle for confetti look
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
            
            this.ctx.restore();
        }
        
        if (this.particles.length > 0) {
            this.animationId = requestAnimationFrame(() => this.animate());
        } else {
            this.stop();
        }
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        if (this.canvas) {
            this.canvas.remove();
            this.canvas = null;
            this.ctx = null;
        }
        
        this.particles = [];
    }
}

