"use client"


import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import AnimatedHouse from '../AnimatedHouse'

interface Props {
  showHouseAnimation: boolean;
}

const HouseAnimation = ({showHouseAnimation}: Props) => {
  return (
          <AnimatePresence>
        {showHouseAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            {/* Dark backdrop that gradually lightens */}
            <motion.div
              className="absolute inset-0 backdrop-blur-sm"
              initial={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
              animate={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              transition={{ duration: 3, ease: "easeOut" }}
            />

            {/* Colored gradient overlay that fades in */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: "easeOut" }}
              style={{
                background:
                  "radial-gradient(circle at center, rgba(251, 146, 60, 0.25) 0%, rgba(192, 132, 252, 0.25) 50%, rgba(253, 230, 138, 0.15) 100%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
              <div className="text-center space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-serif font-bold text-white drop-shadow-2xl"
                >
                  You're Bringing Light to Someone's Darkest Hour
                </motion.h2>
                <AnimatedHouse />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-lg md:text-xl text-white/95 drop-shadow-lg"
                >
                  Thank you for making a home safe tonight...
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
  )
}

export default HouseAnimation