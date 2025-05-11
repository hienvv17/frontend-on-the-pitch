"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Box, IconButton } from "@mui/material"
import { ArrowBackIos, ArrowForwardIos, FiberManualRecord } from "@mui/icons-material"
import { motion, AnimatePresence } from "framer-motion"

interface ImageSliderProps {
  images: string[]
  defaultImage: string
  interval?: number
  height?: number
  showControls?: boolean
  showIndicators?: boolean
}

export default function ImageSlider({
  images,
  defaultImage,
  interval = 3000,
  height = 160,
  showControls = true,
  showIndicators = true,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef<number | null>(null)

  // Use default image if no images are provided
  const displayImages = images.length > 0 ? images : [defaultImage]

  // Set up auto-slide timer
  useEffect(() => {
    if (!isPaused && displayImages.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length)
      }, interval)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [displayImages.length, interval, isPaused])

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length)
    resetTimer()
  }

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex - 1 + displayImages.length) % displayImages.length)
    resetTimer()
  }

  const handleIndicatorClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex(index)
    resetTimer()
  }

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % displayImages.length)
      }, interval)
    }
  }

  // Touch event handlers for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsPaused(true)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe left
        handleNext()
      } else {
        // Swipe right
        handlePrev()
      }
    }

    touchStartX.current = null
    setIsPaused(false)
  }

  // Mouse event handlers for hover pause
  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: height,
        overflow: "hidden",
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            component="img"
            src={displayImages[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {showControls && displayImages.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255, 255, 255, 0.5)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
              width: 30,
              height: 30,
              zIndex: 2,
            }}
            size="small"
          >
            <ArrowBackIos sx={{ fontSize: 16, ml: 1 }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              bgcolor: "rgba(255, 255, 255, 0.5)",
              "&:hover": { bgcolor: "rgba(255, 255, 255, 0.8)" },
              width: 30,
              height: 30,
              zIndex: 2,
            }}
            size="small"
          >
            <ArrowForwardIos sx={{ fontSize: 16 }} />
          </IconButton>
        </>
      )}

      {/* Indicators */}
      {showIndicators && displayImages.length > 1 && (
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
            zIndex: 2,
          }}
        >
          {displayImages.map((_, index) => (
            <Box
              key={index}
              component={motion.div}
              whileHover={{ scale: 1.2 }}
              onClick={(e) => handleIndicatorClick(index, e)}
              sx={{
                cursor: "pointer",
                opacity: currentIndex === index ? 1 : 0.5,
                transition: "opacity 0.3s",
              }}
            >
              <FiberManualRecord
                sx={{
                  fontSize: 12,
                  color: "white",
                  filter: "drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.5))",
                }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Gradient overlay for better visibility of controls and indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "30%",
          background: "linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0))",
          pointerEvents: "none",
        }}
      />
    </Box>
  )
}
