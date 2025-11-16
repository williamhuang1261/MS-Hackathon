/**
 * Lotus Flower Designs - High resolution 600x600 pixel art
 * Each design uses canvas drawing functions for smooth, detailed rendering
 */

export const LOTUS_STAGES = {
    0: {
        name: "Seed",
        description: "A seed planted in soil",
        draw: drawStage0
    },
    1: {
        name: "Germination",
        description: "First signs of life",
        draw: drawStage1
    },
    2: {
        name: "Sprout",
        description: "Breaking through",
        draw: drawStage2
    },
    3: {
        name: "Young Shoot",
        description: "Growing upward",
        draw: drawStage3
    },
    4: {
        name: "Stem Development",
        description: "Building strength",
        draw: drawStage4
    },
    5: {
        name: "Early Bud",
        description: "Promise of beauty",
        draw: drawStage5
    },
    6: {
        name: "Bud Formation",
        description: "Preparing to bloom",
        draw: drawStage6
    },
    7: {
        name: "Early Bloom",
        description: "Petals emerging",
        draw: drawStage7
    },
    8: {
        name: "Blooming",
        description: "Opening up",
        draw: drawStage8
    },
    9: {
        name: "Full Bloom",
        description: "Radiant and complete",
        draw: drawStage9
    },
    10: {
        name: "Perfect Bloom",
        description: "Transcendent beauty",
        draw: drawStage10
    },
    11: {
        name: "Radiant Glory",
        description: "Ultimate magnificence",
        draw: drawStage11
    }
};

// Helper functions
function drawSoil(ctx, size) {
    const gradient = ctx.createLinearGradient(0, size * 0.8, 0, size);
    gradient.addColorStop(0, '#A0522D');
    gradient.addColorStop(0.5, '#8B4513');
    gradient.addColorStop(1, '#654321');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, size * 0.8, size, size * 0.2);
}

function drawStem(ctx, x, yTop, yBottom, width) {
    const gradient = ctx.createLinearGradient(x - width/2, 0, x + width/2, 0);
    gradient.addColorStop(0, '#1a5f1a');
    gradient.addColorStop(0.3, '#228B22');
    gradient.addColorStop(0.7, '#32CD32');
    gradient.addColorStop(1, '#90EE90');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x - width/2, yTop, width, yBottom - yTop);
}

function drawLeaf(ctx, centerX, y, width, height, isRight = false) {
    ctx.save();
    
    // Draw connecting petiole (leaf stem)
    const petioleLength = isRight ? 15 : 15;
    const petioleX = isRight ? centerX : centerX;
    const petioleEndX = isRight ? petioleX + petioleLength : petioleX - petioleLength;
    
    ctx.strokeStyle = '#228B22';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(centerX, y + height/2);
    ctx.lineTo(petioleEndX, y + height/2);
    ctx.stroke();
    
    // Draw leaf
    const leafX = isRight ? petioleEndX : petioleEndX - width;
    ctx.translate(leafX, y);
    
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    if (isRight) {
        gradient.addColorStop(0, '#90EE90');
        gradient.addColorStop(0.6, '#32CD32');
        gradient.addColorStop(1, '#1a5f1a');
    } else {
        gradient.addColorStop(0, '#1a5f1a');
        gradient.addColorStop(0.4, '#32CD32');
        gradient.addColorStop(1, '#90EE90');
    }
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(width/2, height/2, width/2, height/2, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

// Stage 0: Seed in soil
function drawStage0(ctx, size) {
    drawSoil(ctx, size);
    
    // Seed
    const centerX = size / 2;
    const seedY = size * 0.88;
    
    const gradient = ctx.createRadialGradient(centerX - 5, seedY - 5, 5, centerX, seedY, 20);
    gradient.addColorStop(0, '#D2691E');
    gradient.addColorStop(0.7, '#A0522D');
    gradient.addColorStop(1, '#8B4513');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(centerX, seedY, 18, 15, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Stage 1: Germination
function drawStage1(ctx, size) {
    drawSoil(ctx, size);
    
    // Seed
    const centerX = size / 2;
    const seedY = size * 0.88;
    
    const gradient = ctx.createRadialGradient(centerX - 5, seedY - 5, 5, centerX, seedY, 20);
    gradient.addColorStop(0, '#D2691E');
    gradient.addColorStop(0.7, '#A0522D');
    gradient.addColorStop(1, '#8B4513');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(centerX, seedY, 18, 15, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Tiny sprout
    const sproutGradient = ctx.createLinearGradient(centerX - 5, size * 0.75, centerX + 5, size * 0.75);
    sproutGradient.addColorStop(0, '#90EE90');
    sproutGradient.addColorStop(1, '#B4F8B4');
    
    ctx.fillStyle = sproutGradient;
    ctx.fillRect(centerX - 4, size * 0.75, 8, size * 0.05);
}

// Stage 2: Sprout breaking soil
function drawStage2(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    
    // Stem
    drawStem(ctx, centerX, size * 0.65, size * 0.8, 12);
    
    // Small leaves
    drawLeaf(ctx, centerX, size * 0.7, 15, 20, false);
    drawLeaf(ctx, centerX, size * 0.7, 15, 20, true);
}

// Stage 3: Young shoot
function drawStage3(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    
    // Stem
    drawStem(ctx, centerX, size * 0.5, size * 0.8, 14);
    
    // Leaves
    drawLeaf(ctx, centerX, size * 0.58, 30, 35, false);
    drawLeaf(ctx, centerX, size * 0.58, 30, 35, true);
}

// Stage 4: Stem development
function drawStage4(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    
    // Stem
    drawStem(ctx, centerX, size * 0.38, size * 0.8, 16);
    
    // Multiple leaf sets
    drawLeaf(ctx, centerX, size * 0.48, 35, 40, false);
    drawLeaf(ctx, centerX, size * 0.48, 35, 40, true);
    
    drawLeaf(ctx, centerX, size * 0.65, 30, 35, false);
    drawLeaf(ctx, centerX, size * 0.65, 30, 35, true);
}

// Stage 5: Early bud
function drawStage5(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    
    // Stem
    drawStem(ctx, centerX, size * 0.32, size * 0.8, 16);
    
    // Leaves
    drawLeaf(ctx, centerX, size * 0.48, 35, 40, false);
    drawLeaf(ctx, centerX, size * 0.48, 35, 40, true);
    
    drawLeaf(ctx, centerX, size * 0.65, 30, 35, false);
    drawLeaf(ctx, centerX, size * 0.65, 30, 35, true);
    
    // Small bud
    const budGradient = ctx.createRadialGradient(centerX, size * 0.29, 5, centerX, size * 0.3, 25);
    budGradient.addColorStop(0, '#ADFF2F');
    budGradient.addColorStop(0.6, '#9ACD32');
    budGradient.addColorStop(1, '#7CB342');
    
    ctx.fillStyle = budGradient;
    ctx.beginPath();
    ctx.ellipse(centerX, size * 0.3, 20, 28, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Stage 6: Bud formation
function drawStage6(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    
    // Stem
    drawStem(ctx, centerX, size * 0.28, size * 0.8, 16);
    
    // Leaves
    drawLeaf(ctx, centerX, size * 0.48, 35, 40, false);
    drawLeaf(ctx, centerX, size * 0.48, 35, 40, true);
    
    // Larger bud with pink hints
    const budGradient = ctx.createRadialGradient(centerX, size * 0.23, 10, centerX, size * 0.26, 40);
    budGradient.addColorStop(0, '#FFE4E1');
    budGradient.addColorStop(0.3, '#FFB6C1');
    budGradient.addColorStop(0.6, '#9ACD32');
    budGradient.addColorStop(1, '#7CB342');
    
    ctx.fillStyle = budGradient;
    ctx.beginPath();
    ctx.ellipse(centerX, size * 0.26, 32, 45, 0, 0, Math.PI * 2);
    ctx.fill();
}

// Stage 7: Early bloom
function drawStage7(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    const centerY = size * 0.25;
    
    // Stem
    drawStem(ctx, centerX, centerY + 20, size * 0.8, 16);
    
    // Leaves
    drawLeaf(ctx, centerX, size * 0.5, 35, 40, false);
    drawLeaf(ctx, centerX, size * 0.5, 35, 40, true);
    
    // Outer petals (pink)
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2;
        const px = centerX + Math.cos(angle) * 45;
        const py = centerY + Math.sin(angle) * 45;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 25);
        gradient.addColorStop(0, '#FFB6C1');
        gradient.addColorStop(0.6, '#FF69B4');
        gradient.addColorStop(1, '#DB7093');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 22, 32, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Center
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 20);
    centerGradient.addColorStop(0, '#FFD700');
    centerGradient.addColorStop(0.7, '#FFA500');
    centerGradient.addColorStop(1, '#FF8C00');
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 18, 0, Math.PI * 2);
    ctx.fill();
}

// Stage 8: Blooming
function drawStage8(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    const centerY = size * 0.22;
    
    // Stem
    drawStem(ctx, centerX, centerY + 25, size * 0.8, 18);
    
    // Leaves
    drawLeaf(ctx, centerX, size * 0.52, 40, 45, false);
    drawLeaf(ctx, centerX, size * 0.52, 40, 45, true);
    
    // Outer petals (larger, more open)
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const px = centerX + Math.cos(angle) * 65;
        const py = centerY + Math.sin(angle) * 65;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 30);
        gradient.addColorStop(0, '#FFE4E1');
        gradient.addColorStop(0.5, '#FFB6C1');
        gradient.addColorStop(1, '#FF69B4');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 28, 40, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Inner white petals
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const px = centerX + Math.cos(angle) * 35;
        const py = centerY + Math.sin(angle) * 35;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 20);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.7, '#FFFFF0');
        gradient.addColorStop(1, '#FFE4E1');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 18, 28, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Center
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 8, centerX, centerY, 25);
    centerGradient.addColorStop(0, '#FFD700');
    centerGradient.addColorStop(0.5, '#FFA500');
    centerGradient.addColorStop(1, '#FF8C00');
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
    ctx.fill();
}

// Stage 9: Full bloom - magnificent lotus
function drawStage9(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    const centerY = size * 0.2;
    
    // Stem
    drawStem(ctx, centerX, centerY + 30, size * 0.8, 20);
    
    // Large leaves
    drawLeaf(ctx, centerX, size * 0.55, 50, 55, false);
    drawLeaf(ctx, centerX, size * 0.55, 50, 55, true);
    
    // Outermost petals (large, pink)
    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
        const px = centerX + Math.cos(angle) * 90;
        const py = centerY + Math.sin(angle) * 90;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 35);
        gradient.addColorStop(0, '#FFE4E1');
        gradient.addColorStop(0.4, '#FFB6C1');
        gradient.addColorStop(0.8, '#FF69B4');
        gradient.addColorStop(1, '#DB7093');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 32, 48, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Middle petals (light pink/white)
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const px = centerX + Math.cos(angle) * 55;
        const py = centerY + Math.sin(angle) * 55;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 28);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.6, '#FFFFF0');
        gradient.addColorStop(1, '#FFE4E1');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 24, 38, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Inner petals (pure white)
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 16;
        const px = centerX + Math.cos(angle) * 30;
        const py = centerY + Math.sin(angle) * 30;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 18);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.8, '#FFFFF0');
        gradient.addColorStop(1, '#FFF8DC');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 15, 25, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Center stamen - golden
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 30);
    centerGradient.addColorStop(0, '#FFD700');
    centerGradient.addColorStop(0.3, '#FFA500');
    centerGradient.addColorStop(0.7, '#FF8C00');
    centerGradient.addColorStop(1, '#FF6347');
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 28, 0, Math.PI * 2);
    ctx.fill();
    
    // Add stamen dots
    ctx.fillStyle = '#8B4513';
    for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 20;
        const dx = centerX + Math.cos(angle) * radius;
        const dy = centerY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(dx, dy, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Stage 10: Perfect Bloom - Enhanced magnificence with glow
function drawStage10(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    const centerY = size * 0.18;
    
    // Stem - thicker, more vibrant
    drawStem(ctx, centerX, centerY + 35, size * 0.8, 22);
    
    // Extra large leaves
    drawLeaf(ctx, centerX, size * 0.55, 55, 60, false);
    drawLeaf(ctx, centerX, size * 0.55, 55, 60, true);
    
    // Glow effect behind flower
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, 120);
    glowGradient.addColorStop(0, 'rgba(255, 182, 193, 0.4)');
    glowGradient.addColorStop(0.5, 'rgba(255, 105, 180, 0.2)');
    glowGradient.addColorStop(1, 'rgba(255, 105, 180, 0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 120, 0, Math.PI * 2);
    ctx.fill();
    
    // Outermost petals - larger and more vibrant
    for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2 - Math.PI / 2;
        const px = centerX + Math.cos(angle) * 105;
        const py = centerY + Math.sin(angle) * 105;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 40);
        gradient.addColorStop(0, '#FFF0F5');
        gradient.addColorStop(0.3, '#FFB6C1');
        gradient.addColorStop(0.6, '#FF69B4');
        gradient.addColorStop(0.9, '#DB7093');
        gradient.addColorStop(1, '#C71585');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 36, 52, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Second layer - medium petals
    for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + Math.PI / 32;
        const px = centerX + Math.cos(angle) * 70;
        const py = centerY + Math.sin(angle) * 70;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 32);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.5, '#FFF0F5');
        gradient.addColorStop(1, '#FFE4E1');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 28, 42, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Third layer - inner white petals
    for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const px = centerX + Math.cos(angle) * 40;
        const py = centerY + Math.sin(angle) * 40;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 22);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.7, '#FFFFF0');
        gradient.addColorStop(1, '#FFF8DC');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 18, 30, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Innermost petals
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + Math.PI / 16;
        const px = centerX + Math.cos(angle) * 22;
        const py = centerY + Math.sin(angle) * 22;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 15);
        gradient.addColorStop(0, '#FFFAFA');
        gradient.addColorStop(1, '#FFF8DC');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 12, 20, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Enhanced center stamen with sparkle
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 12, centerX, centerY, 35);
    centerGradient.addColorStop(0, '#FFD700');
    centerGradient.addColorStop(0.2, '#FFDF00');
    centerGradient.addColorStop(0.5, '#FFA500');
    centerGradient.addColorStop(0.8, '#FF8C00');
    centerGradient.addColorStop(1, '#FF6347');
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 32, 0, Math.PI * 2);
    ctx.fill();
    
    // Dense stamen dots
    ctx.fillStyle = '#8B4513';
    for (let i = 0; i < 30; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 24;
        const dx = centerX + Math.cos(angle) * radius;
        const dy = centerY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Stage 11: Radiant Glory - Ultimate $100K bloom with full radiance
function drawStage11(ctx, size) {
    drawSoil(ctx, size);
    
    const centerX = size / 2;
    const centerY = size * 0.16;
    
    // Stem - maximum vibrancy
    drawStem(ctx, centerX, centerY + 40, size * 0.8, 24);
    
    // Maximum sized leaves
    drawLeaf(ctx, centerX, size * 0.56, 60, 65, false);
    drawLeaf(ctx, centerX, size * 0.56, 60, 65, true);
    
    // Multiple glow layers for radiance
    const outerGlow = ctx.createRadialGradient(centerX, centerY, 40, centerX, centerY, 150);
    outerGlow.addColorStop(0, 'rgba(255, 215, 0, 0.3)');
    outerGlow.addColorStop(0.3, 'rgba(255, 182, 193, 0.25)');
    outerGlow.addColorStop(0.6, 'rgba(255, 105, 180, 0.15)');
    outerGlow.addColorStop(1, 'rgba(255, 105, 180, 0)');
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 150, 0, Math.PI * 2);
    ctx.fill();
    
    // Inner radiant glow
    const innerGlow = ctx.createRadialGradient(centerX, centerY, 20, centerX, centerY, 80);
    innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
    innerGlow.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
    innerGlow.addColorStop(1, 'rgba(255, 215, 0, 0)');
    ctx.fillStyle = innerGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
    ctx.fill();
    
    // Outermost ring - maximum petals with shimmer
    for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
        const px = centerX + Math.cos(angle) * 115;
        const py = centerY + Math.sin(angle) * 115;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 42);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.2, '#FFF0F5');
        gradient.addColorStop(0.5, '#FFB6C1');
        gradient.addColorStop(0.7, '#FF69B4');
        gradient.addColorStop(0.9, '#DB7093');
        gradient.addColorStop(1, '#C71585');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 38, 56, angle, 0, Math.PI * 2);
        ctx.fill();
        
        // Add shimmer tips
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.beginPath();
        ctx.arc(px + Math.cos(angle) * 25, py + Math.sin(angle) * 25, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Second ring - luminous petals
    for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2 + Math.PI / 36;
        const px = centerX + Math.cos(angle) * 80;
        const py = centerY + Math.sin(angle) * 80;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 35);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.4, '#FFFACD');
        gradient.addColorStop(0.8, '#FFF0F5');
        gradient.addColorStop(1, '#FFE4E1');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 30, 45, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Third ring - pure white petals
    for (let i = 0; i < 14; i++) {
        const angle = (i / 14) * Math.PI * 2;
        const px = centerX + Math.cos(angle) * 50;
        const py = centerY + Math.sin(angle) * 50;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 25);
        gradient.addColorStop(0, '#FFFFFF');
        gradient.addColorStop(0.6, '#FFFFF0');
        gradient.addColorStop(1, '#FFF8DC');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 22, 35, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Fourth ring - delicate inner petals
    for (let i = 0; i < 10; i++) {
        const angle = (i / 10) * Math.PI * 2 + Math.PI / 20;
        const px = centerX + Math.cos(angle) * 28;
        const py = centerY + Math.sin(angle) * 28;
        
        const gradient = ctx.createRadialGradient(px, py, 5, px, py, 18);
        gradient.addColorStop(0, '#FFFAFA');
        gradient.addColorStop(0.8, '#FFF8DC');
        gradient.addColorStop(1, '#FFFACD');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.ellipse(px, py, 14, 24, angle, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Radiant center - golden brilliance
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 15, centerX, centerY, 40);
    centerGradient.addColorStop(0, '#FFFFFF');
    centerGradient.addColorStop(0.2, '#FFD700');
    centerGradient.addColorStop(0.4, '#FFA500');
    centerGradient.addColorStop(0.7, '#FF8C00');
    centerGradient.addColorStop(0.9, '#FF6347');
    centerGradient.addColorStop(1, '#DC143C');
    
    ctx.fillStyle = centerGradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 38, 0, Math.PI * 2);
    ctx.fill();
    
    // Ultra-dense stamen with sparkles
    ctx.fillStyle = '#8B4513';
    for (let i = 0; i < 40; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 28;
        const dx = centerX + Math.cos(angle) * radius;
        const dy = centerY + Math.sin(angle) * radius;
        ctx.beginPath();
        ctx.arc(dx, dy, 2.5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Add golden sparkle dots around center
    ctx.fillStyle = '#FFD700';
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dx = centerX + Math.cos(angle) * 35;
        const dy = centerY + Math.sin(angle) * 35;
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

