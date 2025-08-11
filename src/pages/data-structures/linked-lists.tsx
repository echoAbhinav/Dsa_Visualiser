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
  ArrowRight,
  Trash2,
  LinkIcon,
  Zap,
  Clock,
  Sparkles,
  ArrowDown,
  AlertCircle,
  Navigation,
  GitBranch,
  Eye,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Node {
  value: number
  id: string
}

export default function LinkedListsPage() {
  const [linkedList, setLinkedList] = useState<Node[]>([
    { value: 10, id: "node-0" },
    { value: 20, id: "node-1" },
    { value: 30, id: "node-2" },
    { value: 40, id: "node-3" },
  ])
  const [newValue, setNewValue] = useState<string>("")
  const [index, setIndex] = useState<string>("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animationState, setAnimationState] = useState<"idle" | "adding" | "inserting" | "removing">("idle")
  const [animationStep, setAnimationStep] = useState<number>(0)
  const [animationMessage, setAnimationMessage] = useState<string>("")
  const [newElement, setNewElement] = useState<Node | null>(null)
  const [highlightedIndices, setHighlightedIndices] = useState<number[]>([])
  const [traversalIndex, setTraversalIndex] = useState<number>(-1)
  const [isLoading, setIsLoading] = useState(false)

  // Reset animation state after completion
  useEffect(() => {
    if (animationState !== "idle" && animationStep > 0) {
      const timer = setTimeout(() => {
        if (animationStep < getMaxSteps()) {
          setAnimationStep(animationStep + 1)
          updateAnimationMessage()
          updateHighlightedIndices()
        } else {
          // Animation complete
          setTimeout(() => {
            setAnimationState("idle")
            setAnimationStep(0)
            setActiveIndex(null)
            setAnimationMessage("")
            setNewElement(null)
            setHighlightedIndices([])
            setTraversalIndex(-1)
            setIsLoading(false)
          }, 1500)
        }
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [animationState, animationStep])

  // Get max steps for current animation
  const getMaxSteps = () => {
    switch (animationState) {
      case "adding":
        return 3
      case "inserting":
        return 4
      case "removing":
        return 3
      default:
        return 0
    }
  }

  // Update animation message based on current step
  const updateAnimationMessage = () => {
    const idx = Number.parseInt(index)

    switch (animationState) {
      case "adding":
        if (animationStep === 1) {
          setAnimationMessage(`🔧 Creating new node with value ${newElement?.value}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`🔍 Traversing to find the last node in the list`)
        } else if (animationStep === 3) {
          setAnimationMessage(`✅ Successfully linked new node to the end of the list`)
        }
        break
      case "inserting":
        if (animationStep === 1) {
          setAnimationMessage(`🔧 Creating new node with value ${newElement?.value}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`🔍 Traversing to position ${idx}`)
        } else if (animationStep === 3) {
          setAnimationMessage(`🔗 Updating next pointers to insert the new node`)
        } else if (animationStep === 4) {
          setAnimationMessage(`✅ Successfully inserted new node at position ${idx}`)
        }
        break
      case "removing":
        if (animationStep === 1) {
          setAnimationMessage(`🔍 Traversing to position ${idx}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`🔗 Updating next pointers to bypass the node`)
        } else if (animationStep === 3) {
          setAnimationMessage(`✅ Successfully removed node at position ${idx}`)
        }
        break
    }
  }

  // Update highlighted indices for traversal animation
  const updateHighlightedIndices = () => {
    const idx = Number.parseInt(index)
    switch (animationState) {
      case "adding":
        if (animationStep === 1) {
          setHighlightedIndices([])
          setTraversalIndex(-1)
        } else if (animationStep === 2) {
          // Simulate traversal to the end
          setTraversalIndex(linkedList.length - 1)
          setHighlightedIndices([linkedList.length - 1])
        }
        break
      case "inserting":
        if (animationStep === 1) {
          setHighlightedIndices([])
          setTraversalIndex(-1)
        } else if (animationStep === 2) {
          // Simulate traversal to the insertion point
          setTraversalIndex(Math.max(0, idx - 1))
          const traversalIndices = []
          for (let i = 0; i <= Math.max(0, idx - 1); i++) {
            traversalIndices.push(i)
          }
          setHighlightedIndices(traversalIndices)
        } else if (animationStep === 3) {
          setHighlightedIndices([Math.max(0, idx - 1), idx])
        }
        break
      case "removing":
        if (animationStep === 1) {
          // Simulate traversal to the removal point
          setTraversalIndex(Math.max(0, idx - 1))
          const traversalIndices = []
          for (let i = 0; i <= Math.max(0, idx - 1); i++) {
            traversalIndices.push(i)
          }
          setHighlightedIndices(traversalIndices)
        } else if (animationStep === 2) {
          setHighlightedIndices([Math.max(0, idx - 1), idx])
        }
        break
    }
  }

  // Linked List operations with enhanced UX
  const handleAddToEnd = () => {
    if (newValue.trim() === "") return
    const value = Number.parseInt(newValue)
    if (isNaN(value)) return

    const newNode = { value, id: `node-${Date.now()}` }
    setNewElement(newNode)
    setIsLoading(true)
    setAnimationState("adding")
    setAnimationStep(1)
    updateAnimationMessage()

    setTimeout(() => {
      setLinkedList([...linkedList, newNode])
    }, 4500)

    setNewValue("")
    setIsAddDialogOpen(false)
  }

  const handleInsert = () => {
    if (newValue.trim() === "" || index.trim() === "") return
    const value = Number.parseInt(newValue)
    const idx = Number.parseInt(index)
    if (isNaN(value) || isNaN(idx) || idx < 0 || idx > linkedList.length) return

    const newNode = { value, id: `node-${Date.now()}` }
    setNewElement(newNode)
    setIsLoading(true)
    setAnimationState("inserting")
    setAnimationStep(1)
    setActiveIndex(idx)
    updateAnimationMessage()

    setTimeout(() => {
      const newList = [...linkedList]
      newList.splice(idx, 0, newNode)
      setLinkedList(newList)
    }, 6000)

    setNewValue("")
    setIndex("")
    setIsInsertDialogOpen(false)
  }

  const handleRemove = () => {
    if (index.trim() === "") return
    const idx = Number.parseInt(index)
    if (isNaN(idx) || idx < 0 || idx >= linkedList.length) return

    setIsLoading(true)
    setAnimationState("removing")
    setAnimationStep(1)
    setActiveIndex(idx)
    updateAnimationMessage()

    setTimeout(() => {
      const newList = [...linkedList]
      newList.splice(idx, 1)
      setLinkedList(newList)
    }, 4500)

    setIndex("")
    setIsRemoveDialogOpen(false)
  }

  const getComplexityColor = (complexity: string) => {
    if (complexity === "O(1)") return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20"
    if (complexity === "O(n)") return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20"
    return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20"
  }

  const renderLinkedListVisualization = () => {
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
            className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-xl"
            animate={{
              y: [0, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 6,
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
              className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg"
            >
              <LinkIcon className="h-5 w-5 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Linked List Visualization
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
              <LinkIcon className="h-3 w-3 mr-1" />
              Nodes: {linkedList.length}
            </Badge>
            {animationState !== "idle" && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/20 rounded-full"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Navigation className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                </motion.div>
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Traversing</span>
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
              className="mb-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl border border-blue-200 dark:border-blue-700/50 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
                <p className="text-blue-800 dark:text-blue-300 font-medium">{animationMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Linked List Container */}
        <div className="flex-grow flex items-center justify-center min-h-[250px] overflow-x-auto">
          <div className="flex items-center gap-1 p-4">
            {/* Head Pointer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center mr-4"
            >
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">HEAD</div>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-8 h-1 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
              />
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500 mt-1" />
            </motion.div>

            <AnimatePresence mode="popLayout">
              {linkedList.map((node, idx) => (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="flex items-center"
                >
                  {/* Node */}
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    className={`
                      relative flex items-center bg-white dark:bg-slate-700 rounded-2xl border-2 shadow-lg cursor-pointer overflow-hidden
                      ${
                        activeIndex === idx
                          ? animationState === "removing" && animationStep >= 2
                            ? "border-red-500 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/50 dark:to-red-800/50"
                            : "border-purple-500 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50"
                          : highlightedIndices.includes(idx)
                            ? "border-blue-500 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50"
                            : traversalIndex === idx
                              ? "border-yellow-500 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50"
                              : "border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500"
                      }
                      ${animationState === "removing" && idx === activeIndex && animationStep === 3 ? "opacity-30 scale-90" : ""}
                      transition-all duration-500
                    `}
                  >
                    {/* Glow effect for active/highlighted elements */}
                    {(activeIndex === idx || highlightedIndices.includes(idx) || traversalIndex === idx) && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg"
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

                    {/* Data Section */}
                    <div className="relative z-10 w-20 h-20 flex flex-col items-center justify-center">
                      <motion.span
                        className="text-lg font-bold text-slate-900 dark:text-white"
                        animate={activeIndex === idx || traversalIndex === idx ? { scale: [1, 1.1, 1] } : {}}
                        transition={{
                          duration: 0.5,
                          repeat: activeIndex === idx || traversalIndex === idx ? Number.POSITIVE_INFINITY : 0,
                        }}
                      >
                        {node.value}
                      </motion.span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Node {idx}</span>
                    </div>

                    {/* Next Pointer Section */}
                    <div className="relative z-10 w-12 h-20 flex items-center justify-center border-l border-slate-200 dark:border-slate-600">
                      {idx < linkedList.length - 1 ? (
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                          className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-sm"
                        >
                          <ArrowRight className="h-3 w-3 text-white" />
                        </motion.div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-400">
                          ∅
                        </div>
                      )}
                    </div>

                    {/* Operation indicators */}
                    <AnimatePresence>
                      {animationState === "removing" && activeIndex === idx && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg z-20"
                        >
                          <Trash2 className="h-3 w-3 text-white" />
                        </motion.div>
                      )}

                      {traversalIndex === idx && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg z-20"
                        >
                          <Eye className="h-3 w-3 text-white" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Index label */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                        [{idx}]
                      </span>
                    </div>
                  </motion.div>

                  {/* Connection Arrow */}
                  {idx < linkedList.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-center mx-2"
                    >
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                      <div className="w-0 h-0 border-l-4 border-t-2 border-b-2 border-transparent border-l-purple-500" />
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* New element being added or inserted */}
              {(animationState === "adding" || animationState === "inserting") && animationStep === 1 && newElement && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: -100 }}
                  animate={{ opacity: 1, scale: 1, y: -60 }}
                  className="absolute flex flex-col items-center z-30"
                  style={{
                    left: animationState === "adding" ? "auto" : `${(activeIndex ?? 0) * 140}px`,
                    right: animationState === "adding" ? "100px" : "auto",
                  }}
                >
                  <div className="flex items-center bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 rounded-2xl border-2 border-green-500 shadow-lg">
                    <div className="w-20 h-20 flex flex-col items-center justify-center">
                      <motion.span
                        className="text-lg font-bold text-green-700 dark:text-green-300"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
                      >
                        {newElement.value}
                      </motion.span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">New</span>
                    </div>
                    <div className="w-12 h-20 flex items-center justify-center border-l border-green-300">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <ArrowRight className="h-3 w-3 text-white" />
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="mt-2"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  </motion.div>
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">
                    {animationState === "adding" ? "Adding to end" : `Inserting at [${index}]`}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty List State */}
            {linkedList.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center mb-4">
                  <LinkIcon className="h-8 w-8 text-slate-400 dark:text-slate-500" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">Linked List is empty</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Add nodes to see the visualization</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* List Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
        >
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">List Length</p>
              <motion.p
                key={linkedList.length}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                {linkedList.length}
              </motion.p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Memory Usage</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{linkedList.length * 8} bytes</p>
            </div>
            {linkedList.length > 0 && (
              <div className="text-center">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Head → Tail</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {linkedList[0]?.value} → {linkedList[linkedList.length - 1]?.value}
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Badge className={`${getComplexityColor("O(n)")} border-0`}>
              <Clock className="h-3 w-3 mr-1" />
              Access: O(n)
            </Badge>
            <Badge className={`${getComplexityColor("O(1)")} border-0`}>
              <Zap className="h-3 w-3 mr-1" />
              Insert: O(1)
            </Badge>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  // Enhanced Dialog Components
  const EnhancedDialog = ({
    isOpen,
    onOpenChange,
    title,
    description,
    icon,
    onSubmit,
    submitLabel,
    submitColor = "bg-blue-600 hover:bg-blue-700",
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
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 shadow-lg"
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
                  <Navigation className="h-4 w-4" />
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
        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center"
      >
        Linked Lists
      </motion.h1>

      <DataStructureVisualizer
        title="Linked List"
        description="A linear data structure where elements are stored in nodes that point to the next node"
        operations={[
          {
            name: "Add to End",
            description: "Add a new node to the end of the linked list",
            action: () => setIsAddDialogOpen(true),
            disabled: animationState !== "idle",
            icon: <Plus className="h-4 w-4" />,
            complexity: "O(n)",
          },
          {
            name: "Insert at Position",
            description: "Insert a new node at a specific position",
            action: () => setIsInsertDialogOpen(true),
            disabled: animationState !== "idle",
            icon: <GitBranch className="h-4 w-4" />,
            complexity: "O(n)",
          },
          {
            name: "Remove Node",
            description: "Remove a node at a specific position",
            action: () => setIsRemoveDialogOpen(true),
            disabled: linkedList.length === 0 || animationState !== "idle",
            icon: <Trash2 className="h-4 w-4" />,
            complexity: "O(n)",
          },
        ] as {
          name: string
          description: string
          action: () => void
          disabled?: boolean
          icon?: React.ReactNode
          complexity?: string
        }[]}
        renderVisualization={renderLinkedListVisualization}
        codeImplementation={{
          JavaScript: `// Node class
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// Linked List implementation
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  // Add a node to the end of the list
  append(value) {
    const newNode = new Node(value);
    
    // If list is empty, make the new node the head
    if (!this.head) {
      this.head = newNode;
    } else {
      // Traverse to the end of the list
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      
      // Add the new node at the end
      current.next = newNode;
    }
    
    this.size++;
  }
  
  // Insert a node at a specific position
  insertAt(value, position) {
    if (position < 0 || position > this.size) {
      return false;
    }
    
    const newNode = new Node(value);
    
    // Insert at the beginning
    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Insert at a specific position
      let current = this.head;
      let prev = null;
      let index = 0;
      
      while (index < position) {
        prev = current;
        current = current.next;
        index++;
      }
      
      newNode.next = current;
      prev.next = newNode;
    }
    
    this.size++;
    return true;
  }
  
  // Remove a node at a specific position
  removeAt(position) {
    if (position < 0 || position >= this.size || !this.head) {
      return null;
    }
    
    let current = this.head;
    
    // Remove the first element
    if (position === 0) {
      this.head = current.next;
    } else {
      // Remove at a specific position
      let prev = null;
      let index = 0;
      
      while (index < position) {
        prev = current;
        current = current.next;
        index++;
      }
      
      // Remove the node
      prev.next = current.next;
    }
    
    this.size--;
    return current.value;
  }
  
  // Get the size of the list
  getSize() {
    return this.size;
  }
  
  // Check if the list is empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Print the list
  printList() {
    let current = this.head;
    let result = '';
    
    while (current) {
      result += current.value + ' -> ';
      current = current.next;
    }
    
    return result + 'null';
  }
}

// Usage
const list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.insertAt(15, 1);
console.log(list.printList()); // 10 -> 15 -> 20 -> 30 -> null
list.removeAt(2);
console.log(list.printList()); // 10 -> 15 -> 30 -> null`,
          Python: `# Node class
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Linked List implementation
class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    # Add a node to the end of the list
    def append(self, value):
        new_node = Node(value)
        
        # If list is empty, make the new node the head
        if not self.head:
            self.head = new_node
        else:
            # Traverse to the end of the list
            current = self.head
            while current.next:
                current = current.next
            
            # Add the new node at the end
            current.next = new_node
        
        self.size += 1
    
    # Insert a node at a specific position
    def insert_at(self, value, position):
        if position < 0 or position > self.size:
            return False
        
        new_node = Node(value)
        
        # Insert at the beginning
        if position == 0:
            new_node.next = self.head
            self.head = new_node
        else:
            # Insert at a specific position
            current = self.head
            prev = None
            index = 0
            
            while index < position:
                prev = current
                current = current.next
                index += 1
            
            new_node.next = current
            prev.next = new_node
        
        self.size += 1
        return True
    
    # Remove a node at a specific position
    def remove_at(self, position):
        if position < 0 or position >= self.size or not self.head:
            return None
        
        current = self.head
        
        # Remove the first element
        if position == 0:
            self.head = current.next
        else:
            # Remove at a specific position
            prev = None
            index = 0
            
            while index < position:
                prev = current
                current = current.next
                index += 1
            
            # Remove the node
            prev.next = current.next
        
        self.size -= 1
        return current.value
    
    # Get the size of the list
    def get_size(self):
        return self.size
    
    # Check if the list is empty
    def is_empty(self):
        return self.size == 0
    
    # Print the list
    def print_list(self):
        current = self.head
        result = ""
        
        while current:
            result += str(current.value) + " -> "
            current = current.next
        
        return result + "None"

# Usage
linked_list = LinkedList()
linked_list.append(10)
linked_list.append(20)
linked_list.append(30)
linked_list.insert_at(15, 1)
print(linked_list.print_list())  # 10 -> 15 -> 20 -> 30 -> None
linked_list.remove_at(2)
print(linked_list.print_list())  # 10 -> 15 -> 30 -> None`,
          Java: `// Node class
class Node {
    int value;
    Node next;
    
    public Node(int value) {
        this.value = value;
        this.next = null;
    }
}

// Linked List implementation
public class LinkedList {
    private Node head;
    private int size;
    
    public LinkedList() {
        this.head = null;
        this.size = 0;
    }
    
    // Add a node to the end of the list
    public void append(int value) {
        Node newNode = new Node(value);
        
        // If list is empty, make the new node the head
        if (head == null) {
            head = newNode;
        } else {
            // Traverse to the end of the list
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            
            // Add the new node at the end
            current.next = newNode;
        }
        
        size++;
    }
    
    // Insert a node at a specific position
    public boolean insertAt(int value, int position) {
        if (position < 0 || position > size) {
            return false;
        }
        
        Node newNode = new Node(value);
        
        // Insert at the beginning
        if (position == 0) {
            newNode.next = head;
            head = newNode;
        } else {
            // Insert at a specific position
            Node current = head;
            Node prev = null;
            int index = 0;
            
            while (index < position) {
                prev = current;
                current = current.next;
                index++;
            }
            
            newNode.next = current;
            prev.next = newNode;
        }
        
        size++;
        return true;
    }
    
    // Remove a node at a specific position
    public Integer removeAt(int position) {
        if (position < 0 || position >= size || head == null) {
            return null;
        }
        
        Node current = head;
        
        // Remove the first element
        if (position == 0) {
            head = current.next;
        } else {
            // Remove at a specific position
            Node prev = null;
            int index = 0;
            
            while (index < position) {
                prev = current;
                current = current.next;
                index++;
            }
            
            // Remove the node
            prev.next = current.next;
        }
        
        size--;
        return current.value;
    }
    
    // Get the size of the list
    public int getSize() {
        return size;
    }
    
    // Check if the list is empty
    public boolean isEmpty() {
        return size == 0;
    }
    
    // Print the list
    public String printList() {
        Node current = head;
        StringBuilder result = new StringBuilder();
        
        while (current != null) {
            result.append(current.value).append(" -> ");
            current = current.next;
        }
        
        result.append("null");
        return result.toString();
    }
}

// Usage
LinkedList list = new LinkedList();
list.append(10);
list.append(20);
list.append(30);
list.insertAt(15, 1);
System.out.println(list.printList()); // 10 -> 15 -> 20 -> 30 -> null
list.removeAt(2);
System.out.println(list.printList()); // 10 -> 15 -> 30 -> null`,
        }}
        information={{
          characteristics: [
            "Dynamic data structure that can grow or shrink during execution",
            "Elements (nodes) are not stored in contiguous memory locations",
            "Each node contains data and a reference to the next node",
            "Efficient for insertions and deletions",
            "Inefficient for random access of elements",
          ],
          useCases: [
            "Implementation of stacks and queues",
            "Dynamic memory allocation",
            "Representation of sparse matrices",
            "Hash tables (for handling collisions)",
            "Adjacency lists for graphs",
          ],
          timeComplexity: {
            Access: "O(n)",
            Search: "O(n)",
            "Insert at beginning": "O(1)",
            "Insert at end": "O(n) or O(1) with tail pointer",
            "Insert at position": "O(n)",
            "Delete at beginning": "O(1)",
            "Delete at end": "O(n) or O(1) with tail pointer",
            "Delete at position": "O(n)",
          },
          spaceComplexity: "O(n)",
          types: [
            {
              name: "Singly Linked List",
              description:
                "Each node has data and a reference to the next node. Traversal is only possible in one direction.",
            },
            {
              name: "Doubly Linked List",
              description:
                "Each node has data and references to both the next and previous nodes. Allows traversal in both directions.",
            },
            {
              name: "Circular Linked List",
              description:
                "The last node points back to the first node, creating a circle. Can be singly or doubly linked.",
            },
            {
              name: "Circular Doubly Linked List",
              description:
                "Combines features of both circular and doubly linked lists. Each node has references to both next and previous nodes, and the last node points back to the first.",
            },
          ],
        }}
      />

      {/* Enhanced Dialogs */}
      <EnhancedDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="Add Node to End"
        description="Add a new node to the end of the linked list"
        icon={<Plus className="h-6 w-6 text-white" />}
        onSubmit={handleAddToEnd}
        submitLabel="Add Node"
        submitColor="bg-green-600 hover:bg-green-700"
      >
        <EnhancedInput
          label="Value"
          type="number"
          placeholder="Enter a number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            Time Complexity: <strong>O(n)</strong> - Must traverse to the end
          </span>
        </div>
      </EnhancedDialog>

      <EnhancedDialog
        isOpen={isInsertDialogOpen}
        onOpenChange={setIsInsertDialogOpen}
        title="Insert Node"
        description="Insert a new node at a specific position"
        icon={<GitBranch className="h-6 w-6 text-white" />}
        onSubmit={handleInsert}
        submitLabel="Insert Node"
        submitColor="bg-blue-600 hover:bg-blue-700"
      >
        <EnhancedInput
          label="Value"
          type="number"
          placeholder="Enter a number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <EnhancedInput
          label={`Position (0 to ${linkedList.length})`}
          type="number"
          placeholder="Enter position"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          min={0}
          max={linkedList.length}
        />
        <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            Time Complexity: <strong>O(n)</strong> - Requires traversal to position
          </span>
        </div>
      </EnhancedDialog>

      <EnhancedDialog
        isOpen={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
        title="Remove Node"
        description="Remove a node at a specific position"
        icon={<Trash2 className="h-6 w-6 text-white" />}
        onSubmit={handleRemove}
        submitLabel="Remove Node"
        submitColor="bg-red-600 hover:bg-red-700"
      >
        <EnhancedInput
          label={`Position (0 to ${linkedList.length - 1})`}
          type="number"
          placeholder="Enter position"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          min={0}
          max={linkedList.length - 1}
        />
        <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            Time Complexity: <strong>O(n)</strong> - Requires traversal to position
          </span>
        </div>
      </EnhancedDialog>
    </motion.div>
  )
}
