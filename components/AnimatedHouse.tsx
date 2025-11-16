'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export default function AnimatedHouse() {
    const isAnimating = true
    const [stars] = useState(() =>
        Array.from({ length: 25 }, () => ({
            cx: Math.random() * 800,
            cy: Math.random() * 300,
            delay: Math.random() * 2
        }))
    )

    const windowRows = [0, 1, 2]
    const windowCols = [0, 1]
    const windowColumnPositions = [300, 440]
    const windowStartY = 170
    const windowVerticalSpacing = 95
    const windowWidth = 70
    const windowHeight = 55
    const flowerWindows = new Set(['0-0', '1-1', '2-0'])
    const flowerOffsets = [12, 38, 64]
    const flowerPetalOffsets = [
        { dx: 0, dy: -4 },
        { dx: 0, dy: 4 },
        { dx: -4, dy: 0 },
        { dx: 4, dy: 0 }
    ]
    const leafShapes = [
        { dx: -6, dy: 6, rotate: -25 },
        { dx: 6, dy: 6, rotate: 25 }
    ]
    const flowerColors = ['#facc15', '#f97316', '#fb7185', '#60a5fa']
    const houseBaseY = 140
    const houseHeight = 360
    const houseBottom = houseBaseY + houseHeight
    const sidewalkHeight = 10
    const sidewalkY = houseBottom
    const groundY = sidewalkY + sidewalkHeight
    const doorWidth = 64
    const doorHeight = 100
    const doorX = 400 - doorWidth / 2
    const doorY = houseBottom - doorHeight
    const fencePostHeight = 80
    const fenceRailYTop = groundY - 50
    const fenceRailYBottom = groundY - 25
    const picketWidth = 18
    const picketGap = 14

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            <svg
                viewBox="0 0 800 600"
                className="w-full h-full max-w-4xl"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="lampPost" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#6c5fbf" />
                        <stop offset="100%" stopColor="#473885" />
                    </linearGradient>
                    <linearGradient id="lampGlow" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#ffe16b" />
                        <stop offset="100%" stopColor="#ffb347" />
                    </linearGradient>
                </defs>
                {/* Dark sky background */}
                <motion.rect
                    x="0"
                    y="0"
                    width="800"
                    height="600"
                    fill="#1a1f3a"
                    animate={{
                        fill: isAnimating ? ['#1a1f3a', '#2d3561', '#3d4578'] : '#1a1f3a'
                    }}
                    transition={{ duration: 2, delay: 0.5 }}
                />

                {/* Stars */}
                {stars.map((star, i) => (
                    <motion.circle
                        key={i}
                        cx={star.cx}
                        cy={star.cy}
                        r="2"
                        fill="white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0.5, 1] }}
                        transition={{
                            duration: 2,
                            delay: star.delay,
                            repeat: Infinity,
                            repeatType: 'reverse'
                        }}
                    />
                ))}

                {/* Ground */}
                <rect x="0" y={groundY} width="800" height={600 - groundY} fill="#2d5016" />

                {/* Sidewalk */}
                <rect x="0" y={sidewalkY} width="800" height={sidewalkHeight} fill="#6b7280" />

                {/* House base */}
                <rect x="280" y={houseBaseY} width="240" height={houseHeight} fill="#eba469" stroke="#c1743e" strokeWidth="2" rx="6" />

                {/* Subtle texture */}
                {[...Array(60)].map((_, i) => (
                    <circle
                        key={`texture-${i}`}
                        cx={290 + (i % 10) * 22}
                        cy={170 + Math.floor(i / 10) * 25}
                        r="0.8"
                        fill="#d6864d"
                        opacity="0.25"
                    />
                ))}

                {/* Roof */}
                <polygon
                    points={`260,${houseBaseY} 540,${houseBaseY} 520,${houseBaseY - 30} 280,${houseBaseY - 30}`}
                    fill="#4b3a34"
                    stroke="#2d201d"
                    strokeWidth="2"
                />
                {[...Array(8)].map((_, i) => (
                    <rect
                        key={`shingle-${i}`}
                        x={280 + i * 30}
                        y={houseBaseY - 25}
                        width="18"
                        height="15"
                        fill="#2d201d"
                        opacity="0.4"
                    />
                ))}

                {/* Chimney */}
                <rect x="330" y={houseBaseY - 55} width="32" height="55" fill="#7d4a2a" stroke="#4b2b16" strokeWidth="2" />
                <rect x="324" y={houseBaseY - 60} width="44" height="12" rx="2" fill="#4b2b16" />

                {/* Smoke from chimney */}
                <motion.g
                    initial={{ opacity: 0, y: 0 }}
                    animate={isAnimating ? { opacity: [0, 0.7, 0], y: [0, -15, -30] } : {}}
                    transition={{ duration: 4, delay: 1.8, repeat: Infinity }}
                >
                    <ellipse cx="350" cy={houseBaseY - 60} rx="9" ry="13" fill="#e5e7eb" opacity="0.6" />
                    <ellipse cx="358" cy={houseBaseY - 75} rx="12" ry="16" fill="#e5e7eb" opacity="0.4" />
                    <ellipse cx="365" cy={houseBaseY - 95} rx="15" ry="18" fill="#e5e7eb" opacity="0.2" />
                </motion.g>

                {/* Door */}
                <rect x={doorX} y={doorY} width={doorWidth} height={doorHeight} rx="4" fill="#3a2a21" stroke="#1d140f" strokeWidth="2" />
                <rect x={doorX - 18} y={houseBottom} width={doorWidth + 36} height="10" rx="4" fill="#b08968" stroke="#8a5d3b" strokeWidth="1" />
                <rect x={doorX - 28} y={houseBottom + 10} width={doorWidth + 56} height="8" rx="4" fill="#8c96a5" opacity="0.75" />
                <circle cx={doorX + doorWidth - 14} cy={doorY + doorHeight / 2} r="4" fill="#d8e8ff" />

                {/* Windows */}
                {windowRows.map((row) => (
                    windowCols.map((col) => {
                        const x = windowColumnPositions[col]
                        const y = windowStartY + row * windowVerticalSpacing
                        const delay = 0.8 + row * 0.2 + col * 0.1
                        const windowKey = `${row}-${col}`
                        const hasFlowers = flowerWindows.has(windowKey)
                        return (
                            <g key={`window-${row}-${col}`}>
                                <rect x={x} y={y} width={windowWidth} height={windowHeight} fill="#cfefff" stroke="#2f2f35" strokeWidth="2" />
                                <line x1={x + windowWidth / 2} y1={y} x2={x + windowWidth / 2} y2={y + windowHeight} stroke="#2f2f35" strokeWidth="2" />
                                <line x1={x} y1={y + windowHeight / 2} x2={x + windowWidth} y2={y + windowHeight / 2} stroke="#2f2f35" strokeWidth="2" />

                                {/* Window ledge */}
                                <rect x={x - 6} y={y + windowHeight} width="82" height="8" fill="#3a2a21" />

                                {hasFlowers && (
                                    <>
                                        <motion.rect
                                            x={x - 2}
                                            y={y + windowHeight + 8}
                                            width="74"
                                            height="15"
                                            rx="4"
                                            fill="#a84f32"
                                            stroke="#6a2c1b"
                                            strokeWidth="1"
                                            animate={isAnimating ? { y: [y + windowHeight + 8, y + windowHeight + 5, y + windowHeight + 8] } : {}}
                                            transition={{ duration: 3, delay: delay + 0.2, repeat: Infinity }}
                                        />

                                        {flowerOffsets.map((offset, flowerIdx) => {
                                            const centerX = x - 2 + offset
                                            const baseY = y + windowHeight + 8
                                            const color = flowerColors[flowerIdx % flowerColors.length]
                                            return (
                                                <motion.g
                                                    key={`flower-${row}-${col}-${flowerIdx}`}
                                                    animate={isAnimating ? { y: [0, -2, 0] } : {}}
                                                    transition={{ duration: 2.2 + flowerIdx * 0.2, delay: delay + flowerIdx * 0.05, repeat: Infinity }}
                                                >
                                                    {leafShapes.map((leaf, leafIdx) => (
                                                        <ellipse
                                                            key={`leaf-${row}-${col}-${flowerIdx}-${leafIdx}`}
                                                            cx={centerX + leaf.dx}
                                                            cy={baseY + leaf.dy}
                                                            rx="5"
                                                            ry="2"
                                                            fill="#5fbf5f"
                                                            transform={`rotate(${leaf.rotate}, ${centerX + leaf.dx}, ${baseY + leaf.dy})`}
                                                        />
                                                    ))}
                                                    {flowerPetalOffsets.map((petal, petalIdx) => (
                                                        <ellipse
                                                            key={`petal-${row}-${col}-${flowerIdx}-${petalIdx}`}
                                                            cx={centerX + petal.dx}
                                                            cy={baseY + petal.dy}
                                                            rx="5"
                                                            ry="3"
                                                            fill={color}
                                                        />
                                                    ))}
                                                    <circle cx={centerX} cy={baseY} r="3" fill="#fff7ad" stroke="#fcd34d" strokeWidth="1" />
                                                </motion.g>
                                            )
                                        })}
                                    </>
                                )}

                                {/* Light animation */}
                                <motion.rect
                                    x={x}
                                    y={y}
                                    width={windowWidth}
                                    height={windowHeight}
                                    fill="#fff8c5"
                                    opacity="0"
                                    animate={isAnimating ? { opacity: [0, 0.7, 0.2, 0.8] } : {}}
                                    transition={{ duration: 1.8, delay, repeat: Infinity, repeatType: 'reverse' }}
                                />
                            </g>
                        )
                    })
                ))}

                {/* Streetlight */}
                <g>
                    <rect x="602" y="240" width="6" height={sidewalkY - 240} rx="3" fill="url(#lampPost)" />
                    <polygon points={`590,${sidewalkY} 620,${sidewalkY} 612,${sidewalkY + 12} 598,${sidewalkY + 12}`} fill="#3c2d6d" />
                    <rect x="596" y="230" width="18" height="18" fill="url(#lampPost)" rx="3" />
                    <polygon points="588,230 622,230 616,212 594,212" fill="#3c2d6d" />

                    <motion.polygon
                        points="596,212 624,212 612,190 608,190 600,190"
                        fill="url(#lampGlow)"
                        stroke="#f6c75d"
                        strokeWidth="1.5"
                        animate={isAnimating ? { opacity: [0, 0.9, 0.7, 1] } : {}}
                        transition={{ duration: 1.2, delay: 1.4, repeat: Infinity, repeatType: 'reverse' }}
                    />

                    <motion.ellipse
                        cx="608"
                        cy="210"
                        rx="28"
                        ry="32"
                        fill="#ffe37a"
                        opacity="0"
                        filter="blur(15px)"
                        animate={isAnimating ? { opacity: [0, 0.5, 0.2, 0.6] } : {}}
                        transition={{ duration: 1.2, delay: 1.4, repeat: Infinity, repeatType: 'reverse' }}
                    />

                    <motion.ellipse
                        cx="608"
                        cy={groundY + 8}
                        rx="90"
                        ry="20"
                        fill="#fff5c7"
                        opacity="0"
                        animate={isAnimating ? { opacity: [0, 0.4, 0.2, 0.5] } : {}}
                        transition={{ duration: 1.4, delay: 1.6, repeat: Infinity, repeatType: 'reverse' }}
                    />
                </g>

                {/* Wooden Fence - Rendered last to be in front */}
                <g>
                    {/* Grass blades */}
                    {[...Array(40)].map((_, i) => (
                        <path
                            key={`grass-${i}`}
                            d={`M${40 + i * 18},${groundY} q6,-18 0,-36 q-5,18 0,36`}
                            fill="#3d8b2f"
                            opacity="0.6"
                        />
                    ))}

                    {/* Horizontal rails */}
                    <rect x="20" y={fenceRailYTop} width="760" height="10" fill="#a86a3a" stroke="#6a3a1f" strokeWidth="1" />
                    <rect x="20" y={fenceRailYBottom} width="760" height="10" fill="#a86a3a" stroke="#6a3a1f" strokeWidth="1" />

                    {/* Pickets */}
                    {[...Array(26)].map((_, i) => {
                        const x = 30 + i * (picketWidth + picketGap)
                        const heightVariance = i % 2 === 0 ? fencePostHeight : fencePostHeight - 6
                        return (
                            <g key={`picket-${i}`}>
                                <polygon
                                    points={`${x},${groundY} ${x + picketWidth},${groundY} ${x + picketWidth},${groundY - heightVariance + 12} ${x + picketWidth / 2},${groundY - heightVariance} ${x},${groundY - heightVariance + 12}`}
                                    fill="#b3773d"
                                    stroke="#6a3a1f"
                                    strokeWidth="1"
                                />
                            </g>
                        )
                    })}

                    {/* Rail bolts */}
                    {[...Array(30)].map((_, i) => (
                        <circle key={`bolt-top-${i}`} cx={30 + i * 24} cy={fenceRailYTop + 5} r="2" fill="#5a3419" />
                    ))}
                    {[...Array(30)].map((_, i) => (
                        <circle key={`bolt-bottom-${i}`} cx={30 + i * 24} cy={fenceRailYBottom + 5} r="2" fill="#5a3419" />
                    ))}

                    {/* Flowers at base */}
                    {[...Array(14)].map((_, i) => (
                        <motion.g
                            key={`fence-flower-${i}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={isAnimating ? { scale: 1, opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 1.5 + i * 0.1, type: 'spring', stiffness: 120 }}
                        >
                            <line x1={70 + i * 50} y1={groundY} x2={70 + i * 50} y2={groundY - 30} stroke="#4ade80" strokeWidth="3" />
                            <circle cx={70 + i * 50} cy={groundY - 30} r="7" fill="#ec4899" />
                            <circle cx={63 + i * 50} cy={groundY - 30} r="6" fill="#fbbf24" />
                            <circle cx={77 + i * 50} cy={groundY - 30} r="6" fill="#fcd34d" />
                            <circle cx={70 + i * 50} cy={groundY - 37} r="6" fill="#f472b6" />
                            <circle cx={70 + i * 50} cy={groundY - 23} r="6" fill="#f472b6" />
                            <circle cx={70 + i * 50} cy={groundY - 30} r="4" fill="#fff7ad" />
                        </motion.g>
                    ))}
                </g>
            </svg>
        </div>
    )
}
