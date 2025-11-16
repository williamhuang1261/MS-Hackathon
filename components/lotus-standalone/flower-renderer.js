/**
 * Flower Renderer - Simple canvas renderer for lotus flower pixel art
 */

import { LOTUS_STAGES } from './lotus-designs.js';

export class FlowerRenderer {
    constructor(container, size = 600) {
        this.container = container;
        this.canvas = null;
        this.ctx = null;
        this.canvasSize = size;
        this.currentStage = 0;
        
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'flower-canvas';
        this.canvas.width = this.canvasSize;
        this.canvas.height = this.canvasSize;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.display = 'block';
        
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.render();
    }

    setStage(stage) {
        this.currentStage = stage;
        this.render();
    }

    render() {
        if (!this.ctx) return;
        
        const stage = LOTUS_STAGES[this.currentStage];
        if (!stage) return;
        
        const drawFunc = stage.draw;
        
        // Clear canvas with transparency
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Call the stage's draw function
        if (drawFunc) {
            drawFunc(this.ctx, this.canvasSize);
        }
    }

    getStageName() {
        const stage = LOTUS_STAGES[this.currentStage];
        return stage ? stage.name : '';
    }

    getStageDescription() {
        const stage = LOTUS_STAGES[this.currentStage];
        return stage ? stage.description : '';
    }

    destroy() {
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

