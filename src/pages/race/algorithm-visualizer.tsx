"use client"

import { useEffect, useRef, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, BarChart3, Search, AlertCircle, Zap, Target, TrendingUp, Activity } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

interface AlgorithmVisualizerProps {
  algorithm: {
    name: string
    description: string
    timeComplexity: {
      best: string
      average: string
      worst: string
    }
    spaceComplexity: string
  }
  array: number[]
  state: {
    progress: number
    comparisons: number
    swaps: number
    currentArray: number[]
    currentIndices: number[]
    completed: boolean
    timeElapsed: number
  }
  type: "sorting" | "searching"
  searchTarget: number | null
}

export default function AlgorithmVisualizer({ algorithm, array, state, type, searchTarget }: AlgorithmVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [animationFrame, setAnimationFrame] = useState<number | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  const getComplexityColor = (complexity: string) => {
    if (complexity.includes("1") || complexity.includes("log")) return "text-green-600 dark:text-green-400"
    if (complexity.includes("n log n") || complexity.includes("n")) return "text-blue-600 dark:text-blue-400"
    if (complexity.includes("n²") || complexity.includes("n^2")) return "text-yellow-600 dark:text-yellow-400"
    return "text-red-600 dark:text-red-400"
  }

  const getAlgorithmGradient = () => {
    if (type === "sorting") {
      return "from-purple-500 to-pink-500"
    }
    return "from-blue-500 to-cyan-500"
  }

  // Enhanced canvas drawing with better visuals
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = rect.width + "px"
    canvas.style.height = rect.height + "px"

    // Clear canvas with subtle background
    const isDark = document.documentElement.classList.contains("dark")
    ctx.fillStyle = isDark ? "rgba(15, 23, 42, 0.5)" : "rgba(248, 250, 252, 0.5)"
    ctx.fillRect(0, 0, rect.width, rect.height)

    const currentArray = state.currentArray || array
    const currentIndices = state.currentIndices || []

    if (type === "sorting") {
      // Enhanced sorting visualization
      const barWidth = rect.width / currentArray.length
      const maxValue = Math.max(...currentArray)
      const padding = 20

      currentArray.forEach((value, index) => {
        const barHeight = (value / maxValue) * (rect.height - padding * 2)
        const x = index * barWidth
        const y = rect.height - barHeight - padding

        // Create gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight)

        if (state.completed) {
          // Success gradient
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.9)")
          gradient.addColorStop(1, "rgba(5, 150, 105, 0.9)")
        } else if (currentIndices.includes(index)) {
          // Active/comparing gradient
          gradient.addColorStop(0, "rgba(239, 68, 68, 0.9)")
          gradient.addColorStop(1, "rgba(220, 38, 38, 0.9)")
        } else {
          // Default gradient based on algorithm type
          if (type === "sorting") {
            gradient.addColorStop(0, "rgba(147, 51, 234, 0.8)")
            gradient.addColorStop(1, "rgba(126, 34, 206, 0.8)")
          }
        }

        // Draw bar with shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)"
        ctx.shadowBlur = 4
        ctx.shadowOffsetY = 2
        ctx.fillStyle = gradient
        ctx.fillRect(x + 1, y, barWidth - 2, barHeight)

        // Reset shadow
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Draw value on bars if space allows
        if (barWidth > 25 && barHeight > 20) {
          ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)"
          ctx.font = `${Math.min(12, barWidth / 3)}px Inter, sans-serif`
          ctx.textAlign = "center"
          ctx.fillText(value.toString(), x + barWidth / 2, y + 15)
        }

        // Add glow effect for active indices
        if (currentIndices.includes(index) && !state.completed) {
          ctx.shadowColor = "rgba(239, 68, 68, 0.6)"
          ctx.shadowBlur = 8
          ctx.strokeStyle = "rgba(239, 68, 68, 0.8)"
          ctx.lineWidth = 2
          ctx.strokeRect(x + 1, y, barWidth - 2, barHeight)
          ctx.shadowColor = "transparent"
          ctx.shadowBlur = 0
        }
      })
    } else if (type === "searching") {
      // Enhanced searching visualization
      const boxSize = Math.min(60, rect.width / Math.min(currentArray.length, 12))
      const boxesPerRow = Math.floor(rect.width / boxSize)
      const startX = (rect.width - boxesPerRow * boxSize) / 2

      currentArray.forEach((value, index) => {
        const row = Math.floor(index / boxesPerRow)
        const col = index % boxesPerRow
        const x = startX + col * boxSize
        const y = 20 + row * boxSize

        // Create gradient for boxes
        const gradient = ctx.createLinearGradient(x, y, x, y + boxSize)

        if (state.completed && currentIndices.includes(index)) {
          // Found target gradient
          gradient.addColorStop(0, "rgba(16, 185, 129, 0.9)")
          gradient.addColorStop(1, "rgba(5, 150, 105, 0.9)")
        } else if (currentIndices.includes(index)) {
          // Currently searching gradient
          gradient.addColorStop(0, "rgba(239, 68, 68, 0.9)")
          gradient.addColorStop(1, "rgba(220, 38, 38, 0.9)")
        } else if (value === searchTarget) {
          // Target value gradient
          gradient.addColorStop(0, "rgba(245, 158, 11, 0.9)")
          gradient.addColorStop(1, "rgba(217, 119, 6, 0.9)")
        } else {
          // Default gradient
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
          gradient.addColorStop(1, "rgba(37, 99, 235, 0.8)")
        }

        // Draw box with shadow
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)"
        ctx.shadowBlur = 3
        ctx.shadowOffsetY = 2
        ctx.fillStyle = gradient
        ctx.fillRect(x + 2, y + 2, boxSize - 4, boxSize - 4)

        // Reset shadow
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0

        // Draw value in box
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.9)"
        ctx.font = `${Math.min(14, boxSize / 4)}px Inter, sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(value.toString(), x + boxSize / 2, y + boxSize / 2)

        // Add glow effect for special boxes
        if (currentIndices.includes(index) || value === searchTarget) {
          const glowColor = currentIndices.includes(index) ? "rgba(239, 68, 68, 0.6)" : "rgba(245, 158, 11, 0.6)"
          ctx.shadowColor = glowColor
          ctx.shadowBlur = 6
          ctx.strokeStyle = glowColor
          ctx.lineWidth = 2
          ctx.strokeRect(x + 2, y + 2, boxSize - 4, boxSize - 4)
          ctx.shadowColor = "transparent"
          ctx.shadowBlur = 0
        }
      })

      // Enhanced binary search visualization
      if (algorithm.name === "Binary Search" && currentIndices.length > 0) {
        const left = currentIndices[0]
        const right = currentIndices[currentIndices.length - 1]
        const mid = currentIndices[Math.floor(currentIndices.length / 2)]

        if (left !== undefined && right !== undefined) {
          // Draw search range
          const leftCol = left % boxesPerRow
          const leftRow = Math.floor(left / boxesPerRow)
          const rightCol = right % boxesPerRow

          const leftX = startX + leftCol * boxSize
          const leftY = 20 + leftRow * boxSize
          const rightX = startX + (rightCol + 1) * boxSize

          // Draw range indicator
          ctx.strokeStyle = "rgba(245, 158, 11, 0.8)"
          ctx.lineWidth = 3
          ctx.setLineDash([5, 5])
          ctx.strokeRect(leftX, leftY, rightX - leftX, boxSize)
          ctx.setLineDash([])

          // Draw mid indicator
          if (mid !== undefined) {
            const midCol = mid % boxesPerRow
            const midRow = Math.floor(mid / boxesPerRow)
            const midX = startX + midCol * boxSize + boxSize / 2
            const midY = 20 + midRow * boxSize

            ctx.strokeStyle = "rgba(16, 185, 129, 0.9)"
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(midX, midY - 10)
            ctx.lineTo(midX, midY + boxSize + 10)
            ctx.stroke()

            // Add mid label with background
            ctx.fillStyle = "rgba(16, 185, 129, 0.9)"
            ctx.fillRect(midX - 15, midY - 25, 30, 15)
            ctx.fillStyle = "white"
            ctx.font = "10px Inter, sans-serif"
            ctx.textAlign = "center"
            ctx.fillText("MID", midX, midY - 15)
          }
        }
      }
    }

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
        setAnimationFrame(null)
      }
    }
  }, [array, state, type, searchTarget, algorithm.name])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getAlgorithmGradient()} opacity-0 hover:opacity-5 transition-opacity duration-500`}
      />

      {/* Animated Border */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${getAlgorithmGradient()} opacity-0 blur-sm transition-opacity duration-500`}
        animate={{
          opacity: isHovered ? 0.1 : 0,
          rotate: [0, 360],
        }}
        transition={{
          opacity: { duration: 0.3 },
          rotate: { duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
        }}
      />

      {/* Header Section */}
      <div className="relative p-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex justify-between items-start mb-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{
                  rotate: state.progress > 0 && !state.completed ? [0, 360] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: state.progress > 0 && !state.completed ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
                className={`p-2 rounded-lg bg-gradient-to-r ${getAlgorithmGradient()} shadow-lg`}
              >
                {type === "sorting" ? (
                  <BarChart3 className="h-5 w-5 text-white" />
                ) : (
                  <Search className="h-5 w-5 text-white" />
                )}
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{algorithm.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{algorithm.description}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <Badge className={`bg-gradient-to-r ${getAlgorithmGradient()} text-white shadow-sm`}>
              {type === "sorting" ? <BarChart3 className="h-3 w-3 mr-1" /> : <Search className="h-3 w-3 mr-1" />}
              {type === "sorting" ? "Sorting" : "Searching"}
            </Badge>

            <AnimatePresence>
              {state.completed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
                    <Clock className="h-3 w-3 mr-1" />
                    {(state.timeElapsed / 1000).toFixed(2)}s
                  </Badge>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">Progress</span>
            </div>
            <motion.span
              key={state.progress}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-slate-700 dark:text-slate-300 font-mono font-bold"
            >
              {Math.round(state.progress)}%
            </motion.span>
          </div>
          <div className="relative">
            <Progress value={state.progress} className="h-3 bg-slate-200 dark:bg-slate-700" />
            {state.progress > 0 && (
              <motion.div
                className={`absolute inset-0 h-3 bg-gradient-to-r ${getAlgorithmGradient()} rounded-full opacity-20`}
                initial={{ width: 0 }}
                animate={{ width: `${state.progress}%` }}
                transition={{ duration: 0.5 }}
              />
            )}
          </div>
        </motion.div>

        {/* Enhanced Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {/* Comparisons */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Comparisons</span>
            </div>
            <motion.p
              key={state.comparisons}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
              className="text-slate-900 dark:text-white font-mono text-lg font-bold"
            >
              {state.comparisons.toLocaleString()}
            </motion.p>
          </div>

          {/* Swaps (only for sorting) */}
          {type === "sorting" && (
            <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-purple-500" />
                <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Swaps</span>
              </div>
              <motion.p
                key={state.swaps}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-slate-900 dark:text-white font-mono text-lg font-bold"
              >
                {state.swaps.toLocaleString()}
              </motion.p>
            </div>
          )}

          {/* Time Complexity */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Time Complexity</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Best:</span>
                <span className={`font-mono text-xs ${getComplexityColor(algorithm.timeComplexity.best)}`}>
                  {algorithm.timeComplexity.best}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Avg:</span>
                <span className={`font-mono text-xs ${getComplexityColor(algorithm.timeComplexity.average)}`}>
                  {algorithm.timeComplexity.average}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Worst:</span>
                <span className={`font-mono text-xs ${getComplexityColor(algorithm.timeComplexity.worst)}`}>
                  {algorithm.timeComplexity.worst}
                </span>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-4 w-4 text-orange-500" />
              <span className="text-slate-600 dark:text-slate-400 text-sm font-medium">Space</span>
            </div>
            <p className={`font-mono text-lg font-bold ${getComplexityColor(algorithm.spaceComplexity)}`}>
              {algorithm.spaceComplexity}
            </p>
          </div>
        </motion.div>

        {/* Binary Search Alert */}
        <AnimatePresence>
          {type === "searching" && algorithm.name === "Binary Search" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                <AlertDescription className="text-amber-800 dark:text-amber-400">
                  <strong>Binary Search</strong> requires a sorted array to work correctly. The search space is divided
                  in half with each comparison.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Canvas Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative p-0 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-80 transition-all duration-300 hover:brightness-105"
          style={{ imageRendering: "crisp-edges" }}
        />

        {/* Canvas Overlay for Status */}
        <AnimatePresence>
          {state.completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm"
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">Completed!</h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Finished in {(state.timeElapsed / 1000).toFixed(2)} seconds
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
