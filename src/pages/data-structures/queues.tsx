"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DataStructureVisualizer from "./data-structure-visualizer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Plus,
  Minus,
  Eye,
  ArrowRight,
  ArrowLeft,
  Database,
  Zap,
  Clock,
  Sparkles,
  CheckCircle,
  Users,
  Timer,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface QueueElement {
  value: number
  id: string
  timestamp: number
}

export default function QueuesPage() {
  const [queue, setQueue] = useState<QueueElement[]>([
    { value: 10, id: "elem-0", timestamp: Date.now() - 4000 },
    { value: 20, id: "elem-1", timestamp: Date.now() - 3000 },
    { value: 30, id: "elem-2", timestamp: Date.now() - 2000 },
    { value: 40, id: "elem-3", timestamp: Date.now() - 1000 },
    { value: 50, id: "elem-4", timestamp: Date.now() },
  ])
  const [newValue, setNewValue] = useState<string>("")
  const [isEnqueueDialogOpen, setIsEnqueueDialogOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animationState, setAnimationState] = useState<"idle" | "enqueueing" | "dequeueing" | "peeking">("idle")
  const [animationStep, setAnimationStep] = useState<number>(0)
  const [animationMessage, setAnimationMessage] = useState<string>("")
  const [newElement, setNewElement] = useState<QueueElement | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [dequeuedElement, setDequeuedElement] = useState<QueueElement | null>(null)

  // Reset animation state after completion
  useEffect(() => {
    if (animationState !== "idle" && animationStep > 0) {
      const timer = setTimeout(() => {
        if (animationStep < getMaxSteps()) {
          setAnimationStep(animationStep + 1)
          updateAnimationMessage()
        } else {
          // Animation complete
          setTimeout(() => {
            if (animationState !== "peeking") {
              setAnimationState("idle")
              setAnimationStep(0)
              setActiveIndex(null)
              setAnimationMessage("")
              setNewElement(null)
              setDequeuedElement(null)
              setIsLoading(false)
            } else {
              // For peeking, just keep highlighting the front element for a bit longer
              setTimeout(() => {
                setAnimationState("idle")
                setAnimationStep(0)
                setActiveIndex(null)
                setAnimationMessage("")
                setIsLoading(false)
              }, 2000)
            }
          }, 1500)
        }
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [animationState, animationStep])

  // Get max steps for current animation
  const getMaxSteps = () => {
    switch (animationState) {
      case "enqueueing":
        return 3
      case "dequeueing":
        return 3
      case "peeking":
        return 1
      default:
        return 0
    }
  }

  // Update animation message based on current step
  const updateAnimationMessage = () => {
    const val = newElement?.value || dequeuedElement?.value

    switch (animationState) {
      case "enqueueing":
        if (animationStep === 1) {
          setAnimationMessage(`🔧 Creating new element with value ${val}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`🚀 Moving element to the rear of the queue`)
        } else if (animationStep === 3) {
          setAnimationMessage(`✅ Successfully enqueued ${val} at the rear`)
        }
        break
      case "dequeueing":
        if (animationStep === 1) {
          setAnimationMessage(`🎯 Accessing front element: ${queue[0]?.value}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`🗑️ Removing front element from the queue`)
        } else if (animationStep === 3) {
          setAnimationMessage(`✅ Successfully dequeued ${queue[0]?.value}`)
        }
        break
      case "peeking":
        setAnimationMessage(`👀 Peeking at front element: ${queue[0]?.value} (no removal)`)
        break
    }
  }

  // Queue operations with enhanced UX
  const handleEnqueue = () => {
    if (newValue.trim() === "") return
    const value = Number.parseInt(newValue)
    if (isNaN(value)) return

    const newElem = { value, id: `elem-${Date.now()}`, timestamp: Date.now() }
    setNewElement(newElem)
    setIsLoading(true)
    setAnimationState("enqueueing")
    setAnimationStep(1)
    updateAnimationMessage()

    setTimeout(() => {
      setQueue([...queue, newElem])
      setActiveIndex(queue.length)
    }, 3000)

    setNewValue("")
    setIsEnqueueDialogOpen(false)
  }

  const handleDequeue = () => {
    if (queue.length === 0) return

    setDequeuedElement(queue[0])
    setIsLoading(true)
    setAnimationState("dequeueing")
    setAnimationStep(1)
    setActiveIndex(0)
    updateAnimationMessage()

    setTimeout(() => {
      setQueue(queue.slice(1))
    }, 4500)
  }

  const handlePeek = () => {
    if (queue.length === 0) return

    setIsLoading(true)
    setAnimationState("peeking")
    setAnimationStep(1)
    setActiveIndex(0)
    updateAnimationMessage()
  }

  const getComplexityColor = (complexity: string) => {
    if (complexity === "O(1)") return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20"
    if (complexity === "O(n)") return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20"
    return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20"
  }

  const renderQueueVisualization = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: animationState !== "idle" ? [0, 360] : 0,
              }}
              transition={{
                duration: 2,
                repeat: animationState !== "idle" ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              }}
              className="p-2 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 shadow-lg"
            >
              <Database className="h-5 w-5 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Queue Visualization (FIFO)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
              <Users className="h-3 w-3 mr-1" />
              Size: {queue.length}
            </Badge>
            {animationState !== "idle" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Timer className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Processing</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Animation Message */}
        <AnimatePresence>
          {animationMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 rounded-xl border border-green-200 dark:border-green-700/50 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="h-4 w-4 text-green-600 dark:text-green-400" />
                </motion.div>
                <p className="text-green-800 dark:text-green-300 font-medium">{animationMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Queue Container */}
        <div className="flex-grow flex items-center justify-center min-h-[280px] p-4">
          <div className="w-full max-w-6xl overflow-x-auto">
            <div className="flex items-center justify-center gap-4 min-w-fit px-4 py-8">
              {/* Front Indicator */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="text-xs font-bold text-green-600 dark:text-green-400 mb-2 bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full whitespace-nowrap">
                  FRONT
                </div>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="flex items-center"
                >
                  <ArrowRight className="h-6 w-6 text-green-500" />
                </motion.div>
              </motion.div>

              {/* Queue Elements */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <AnimatePresence mode="popLayout">
                  {queue.map((element, idx) => (
                    <motion.div
                      key={element.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8, x: idx === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        x: -100,
                        transition: { duration: 0.5 },
                      }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`
                relative flex flex-col items-center justify-center w-20 h-24 rounded-2xl border-2 shadow-lg cursor-pointer overflow-hidden flex-shrink-0
                ${
                  activeIndex === idx
                    ? animationState === "dequeueing"
                      ? "border-red-500 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50"
                      : animationState === "peeking"
                        ? "border-blue-500 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50"
                        : "border-green-500 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50"
                    : "border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 hover:border-slate-400 dark:hover:border-slate-500"
                }
                transition-all duration-500
              `}
                    >
                      {/* Glow effect for active element */}
                      {activeIndex === idx && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-lg"
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                          }}
                        />
                      )}

                      {/* Element Value */}
                      <motion.span
                        className="text-lg font-bold text-slate-900 dark:text-white relative z-10"
                        animate={activeIndex === idx ? { scale: [1, 1.1, 1] } : {}}
                        transition={{
                          duration: 0.5,
                          repeat: activeIndex === idx ? Number.POSITIVE_INFINITY : 0,
                        }}
                      >
                        {element.value}
                      </motion.span>

                      {/* Wait Time */}
                      {/* <span className="text-xs text-slate-500 dark:text-slate-400 font-medium relative z-10">
                        Wait: {getWaitTime(element.timestamp)}
                      </span> */}

                      {/* Position Indicator */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full whitespace-nowrap">
                          [{idx}]
                        </span>
                      </div>

                      {/* Operation indicators */}
                      <AnimatePresence>
                        {animationState === "dequeueing" && activeIndex === idx && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-20"
                          >
                            <Minus className="h-3 w-3 text-white" />
                          </motion.div>
                        )}

                        {animationState === "peeking" && activeIndex === idx && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg z-20"
                          >
                            <Eye className="h-3 w-3 text-white" />
                          </motion.div>
                        )}

                        {idx === 0 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                          >
                            <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm whitespace-nowrap">
                              NEXT OUT
                            </div>
                          </motion.div>
                        )}

                        {idx === queue.length - 1 && queue.length > 1 && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                          >
                            <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm whitespace-nowrap">
                              LAST IN
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  {/* New element being enqueued */}
                  {animationState === "enqueueing" && (animationStep === 1 || animationStep === 2) && newElement && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, y: -100 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: animationStep === 1 ? -60 : 0,
                        x: animationStep === 1 ? 0 : 0,
                      }}
                      transition={{ duration: 0.8, type: "spring" }}
                      className="flex flex-col items-center justify-center w-20 h-24 rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 shadow-lg relative z-30 flex-shrink-0"
                    >
                      <motion.span
                        className="text-lg font-bold text-green-700 dark:text-green-300"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {newElement.value}
                      </motion.span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">NEW</span>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                        <Plus className="h-3 w-3 text-white" />
                      </div>
                      {animationStep === 1 && (
                        <div className="absolute -bottom-12 text-xs text-green-600 dark:text-green-400 font-medium whitespace-nowrap">
                          Moving to rear...
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty Queue State */}
                {queue.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 px-8"
                  >
                    <div className="w-32 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center mb-4">
                      <Database className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Queue is empty</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      Add elements to see FIFO in action
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Rear Indicator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center flex-shrink-0"
              >
                <div className="text-xs font-bold text-blue-600 dark:text-blue-400 mb-2 bg-blue-100 dark:bg-blue-900/20 px-3 py-1 rounded-full whitespace-nowrap">
                  REAR
                </div>
                <motion.div
                  animate={{ x: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="flex items-center"
                >
                  <ArrowLeft className="h-6 w-6 text-blue-500" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Queue Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Queue Size</p>
              <motion.p
                key={queue.length}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                {queue.length}
              </motion.p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Memory Usage</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{queue.length * 4} bytes</p>
            </div>
            {queue.length > 0 && (
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Front Element</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{queue[0]?.value}</p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge className={`${getComplexityColor("O(1)")} border-0`}>
              <Clock className="h-3 w-3 mr-1" />
              Enqueue: O(1)
            </Badge>
            <Badge className={`${getComplexityColor("O(1)")} border-0`}>
              <Zap className="h-3 w-3 mr-1" />
              Dequeue: O(1)
            </Badge>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Enhanced Dialog Component
  const EnhancedDialog = ({
    isOpen,
    onOpenChange,
    title,
    description,
    icon,
    onSubmit,
    submitLabel,
    submitColor = "bg-green-600 hover:bg-green-700",
    children,
  }: {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    title: string
    description: string
    icon: React.ReactNode
    onSubmit: () => void
    submitLabel: string
    submitColor?: string
    children: React.ReactNode
  }) => (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-w-md">
        <DialogHeader className="text-center pb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl mx-auto mb-4 shadow-lg"
          >
            {icon}
          </motion.div>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">{title}</DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">{description}</DialogDescription>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-6 py-4"
        >
          {children}
        </motion.div>

        <DialogFooter className="gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button onClick={onSubmit} className={`${submitColor} text-white shadow-lg`} disabled={isLoading}>
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mr-2"
                >
                  <Timer className="h-4 w-4" />
                </motion.div>
              ) : null}
              {submitLabel}
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const EnhancedInput = ({ label, ...props }: { label: string } & React.ComponentProps<typeof Input>) => (
    <div className="space-y-2">
      <Label className="text-slate-700 dark:text-slate-300 font-medium">{label}</Label>
      <Input
        {...props}
        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center"
      >
        Queues
      </motion.h1>

      <DataStructureVisualizer
        title="Queue"
        description="A linear data structure that follows the First In First Out (FIFO) principle"
        operations={[
          {
            name: "Enqueue",
            description: "Add an element to the rear of the queue",
            action: () => setIsEnqueueDialogOpen(true),
            disabled: animationState !== "idle",
          },
          {
            name: "Dequeue",
            description: "Remove the front element from the queue",
            action: handleDequeue,
            disabled: queue.length === 0 || animationState !== "idle",
          },
          {
            name: "Peek",
            description: "View the front element without removing it",
            action: handlePeek,
            disabled: queue.length === 0 || animationState !== "idle",
          },
        ]}
        renderVisualization={renderQueueVisualization}
        codeImplementation={{
          JavaScript: `// Queue implementation using array
class Queue {
  constructor() {
    this.items = [];
  }
  
  // Add element to the end of the queue
  enqueue(element) {
    this.items.push(element);
  }
  
  // Remove and return the front element
  dequeue() {
    if (this.isEmpty()) {
      return "Underflow";
    }
    return this.items.shift();
  }
  
  // Return the front element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }
  
  // Check if queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the size of the queue
  size() {
    return this.items.length;
  }
  
  // Clear the queue
  clear() {
    this.items = [];
  }
  
  // Print the queue
  printQueue() {
    return this.items.join(' <- ');
  }
}

// Usage
const queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.printQueue()); // 10 <- 20 <- 30
console.log(queue.peek()); // 10
console.log(queue.dequeue()); // 10
console.log(queue.size()); // 2

// Circular Queue implementation for better performance
class CircularQueue {
  constructor(capacity) {
    this.items = new Array(capacity);
    this.capacity = capacity;
    this.front = -1;
    this.rear = -1;
    this.size = 0;
  }
  
  enqueue(element) {
    if (this.isFull()) {
      return "Queue is full";
    }
    
    if (this.isEmpty()) {
      this.front = 0;
      this.rear = 0;
    } else {
      this.rear = (this.rear + 1) % this.capacity;
    }
    
    this.items[this.rear] = element;
    this.size++;
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    
    const element = this.items[this.front];
    this.items[this.front] = null;
    
    if (this.size === 1) {
      this.front = -1;
      this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.capacity;
    }
    
    this.size--;
    return element;
  }
  
  peek() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[this.front];
  }
  
  isEmpty() {
    return this.size === 0;
  }
  
  isFull() {
    return this.size === this.capacity;
  }
  
  getSize() {
    return this.size;
  }
}`,
          Python: `# Queue implementation using list
class Queue:
    def __init__(self):
        self.items = []
    
    # Add element to the end of the queue
    def enqueue(self, item):
        self.items.append(item)
    
    # Remove and return the front element
    def dequeue(self):
        if self.is_empty():
            return "Underflow"
        return self.items.pop(0)
    
    # Return the front element without removing it
    def peek(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items[0]
    
    # Check if queue is empty
    def is_empty(self):
        return len(self.items) == 0
    
    # Return the size of the queue
    def size(self):
        return len(self.items)
    
    # Clear the queue
    def clear(self):
        self.items = []
    
    # Print the queue
    def print_queue(self):
        return ' <- '.join(map(str, self.items))

# Usage
queue = Queue()
queue.enqueue(10)
queue.enqueue(20)
queue.enqueue(30)
print(queue.print_queue())  # 10 <- 20 <- 30
print(queue.peek())         # 10
print(queue.dequeue())      # 10
print(queue.size())         # 2

# Using collections.deque for better performance
from collections import deque

class EfficientQueue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items.popleft()
    
    def peek(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
    
    def clear(self):
        self.items.clear()

# Circular Queue implementation
class CircularQueue:
    def __init__(self, capacity):
        self.items = [None] * capacity
        self.capacity = capacity
        self.front = -1;
        self.rear = -1;
        self.size = 0
    
    def enqueue(self, item):
        if self.is_full():
            return "Queue is full"
        
        if self.is_empty():
            self.front = 0
            self.rear = 0
        else:
            self.rear = (self.rear + 1) % self.capacity
        
        self.items[self.rear] = item
        self.size += 1
    
    def dequeue(self):
        if self.is_empty():
            return "Queue is empty"
        
        item = self.items[self.front]
        self.items[self.front] = None
        
        if self.size == 1:
            self.front = -1
            self.rear = -1
        else:
            self.front = (self.front + 1) % self.capacity
        
        self.size -= 1
        return item
    
    def peek(self):
        if self.is_empty():
            return "Queue is empty"
        return self.items[self.front]
    
    def is_empty(self):
        return self.size == 0
    
    def is_full(self):
        return self.size == self.capacity
    
    def get_size(self):
        return self.size`,
          Java: `// Queue implementation using array
public class Queue {
    private int maxSize;
    private int[] queueArray;
    private int front;
    private int rear;
    private int currentSize;
    
    // Constructor
    public Queue(int size) {
        maxSize = size;
        queueArray = new int[maxSize];
        front = 0;
        rear = -1;
        currentSize = 0;
    }
    
    // Add element to the end of the queue
    public void enqueue(int value) {
        if (isFull()) {
            System.out.println("Queue is full");
            return;
        }
        
        // Circular queue implementation
        if (rear == maxSize - 1) {
            rear = -1;
        }
        
        queueArray[++rear] = value;
        currentSize++;
    }
    
    // Remove and return the front element
    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        
        int temp = queueArray[front++];
        
        // Circular queue implementation
        if (front == maxSize) {
            front = 0;
        }
        
        currentSize--;
        return temp;
    }
    
    // Return the front element without removing it
    public int peek() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        return queueArray[front];
    }
    
    // Check if queue is empty
    public boolean isEmpty() {
        return (currentSize == 0);
    }
    
    // Check if queue is full
    public boolean isFull() {
        return (currentSize == maxSize);
    }
    
    // Return the size of the queue
    public int size() {
        return currentSize;
    }
    
    // Print the queue
    public void printQueue() {
        if (isEmpty()) {
            System.out.println("Queue is empty");
            return;
        }
        
        System.out.print("Queue: ");
        int i = front;
        for (int j = 0; j < currentSize; j++) {
            System.out.print(queueArray[i] + " ");
            i = (i + 1) % maxSize;
        }
        System.out.println();
    }
}

// Usage
Queue queue = new Queue(10);
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.printQueue();         // Queue: 10 20 30
System.out.println(queue.peek());    // 10
System.out.println(queue.dequeue()); // 10
System.out.println(queue.size());    // 2

// Using LinkedList for dynamic queue
import java.util.LinkedList;
import java.util.Queue;

public class DynamicQueue {
    private Queue<Integer> queue;
    
    public DynamicQueue() {
        queue = new LinkedList<>();
    }
    
    public void enqueue(int value) {
        queue.offer(value);
    }
    
    public int dequeue() {
        if (queue.isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        return queue.poll();
    }
    
    public int peek() {
        if (queue.isEmpty()) {
            System.out.println("Queue is empty");
            return -1;
        }
        return queue.peek();
    }
    
    public boolean isEmpty() {
        return queue.isEmpty();
    }
    
    public int size() {
        return queue.size();
    }
    
    public void printQueue() {
        System.out.println("Queue: " + queue);
    }
}`,
        }}
        information={{
          characteristics: [
            "Follows First In First Out (FIFO) principle",
            "Elements are added at the rear and removed from the front",
            "Insertion and deletion operations are performed at opposite ends",
            "Can be implemented using arrays or linked lists",
            "Has a restricted access pattern - only the front element can be removed",
          ],
          useCases: [
            "CPU scheduling in operating systems",
            "Handling of interrupts in real-time systems",
            "Breadth-first search algorithm implementation",
            "Print job scheduling",
            "Buffering for data streams",
            "Managing requests in web servers",
            "Call center phone systems",
            "Playlist management in media players",
          ],
          timeComplexity: {
            Enqueue: "O(1)",
            Dequeue: "O(1) for linked list, O(n) for array",
            Peek: "O(1)",
            Search: "O(n)",
            "Access (other than front)": "O(n)",
          },
          spaceComplexity: "O(n)",
          types: [
            {
              name: "Simple Queue",
              description:
                "Basic queue with elements added at rear and removed from front. When using arrays, dequeue operations can be inefficient as they require shifting elements.",
            },
            {
              name: "Circular Queue",
              description:
                "Efficient implementation using arrays where the queue wraps around to the beginning when it reaches the end, avoiding the need to shift elements.",
            },
            {
              name: "Priority Queue",
              description:
                "Elements have associated priorities and are dequeued based on their priority rather than insertion order.",
            },
            {
              name: "Double-ended Queue (Deque)",
              description:
                "Allows insertion and removal of elements from both ends, providing more flexibility than standard queues.",
            },
          ],
        }}
      />

      {/* Enhanced Enqueue Dialog */}
      <EnhancedDialog
        isOpen={isEnqueueDialogOpen}
        onOpenChange={setIsEnqueueDialogOpen}
        title="Enqueue Element"
        description="Add a new element to the rear of the queue"
        icon={<Plus className="h-6 w-6 text-white" />}
        onSubmit={handleEnqueue}
        submitLabel="Enqueue"
        submitColor="bg-green-600 hover:bg-green-700"
      >
        <EnhancedInput
          label="Value"
          type="number"
          placeholder="Enter a number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-700 dark:text-green-300">
            Time Complexity: <strong>O(1)</strong> - Constant time operation
          </span>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-sm text-blue-700 dark:text-blue-300">
            FIFO Principle: <strong>First In, First Out</strong> - Elements are served in order
          </span>
        </div>
      </EnhancedDialog>
    </motion.div>
  )
}
