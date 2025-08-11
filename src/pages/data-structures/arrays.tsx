"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DataStructureVisualizer from "./data-structure-visualizer"
import { Input } from "../../components/ui/input"
import { Button } from "../../components/ui/button"
import { Label } from "../../components/ui/label"
import { Badge } from "../../components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog"
import {
  Plus,
  ArrowRight,
  Trash2,
  Edit3,
  Zap,
  Clock,
  Target,
  Sparkles,
  ArrowDown,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ArraysPage() {
  const [array, setArray] = useState<number[]>([10, 25, 100, 42, 999])
  const [newValue, setNewValue] = useState<string>("")
  const [index, setIndex] = useState<string>("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isInsertDialogOpen, setIsInsertDialogOpen] = useState(false)
  const [isRemoveDialogOpen, setIsRemoveDialogOpen] = useState(false)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animationState, setAnimationState] = useState<"idle" | "adding" | "inserting" | "removing" | "updating">(
    "idle",
  )
  const [animationStep, setAnimationStep] = useState<number>(0)
  const [animationMessage, setAnimationMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

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
            setAnimationState("idle")
            setAnimationStep(0)
            setActiveIndex(null)
            setAnimationMessage("")
            setIsLoading(false)
          }, 1000)
        }
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [animationState, animationStep])

  // Get max steps for current animation
  const getMaxSteps = () => {
    switch (animationState) {
      case "adding":
        return 2
      case "inserting":
        return 3
      case "removing":
        return 2
      case "updating":
        return 2
      default:
        return 0
    }
  }

  // Update animation message based on current step
  const updateAnimationMessage = () => {
    const idx = Number.parseInt(index)
    const val = Number(newValue)

    switch (animationState) {
      case "adding":
        if (animationStep === 1) {
          setAnimationMessage(`🔄 Creating space at the end of the array`)
        } else if (animationStep === 2) {
          setAnimationMessage(`✅ Successfully added ${val} at index ${array.length}`)
        }
        break
      case "inserting":
        if (animationStep === 1) {
          setAnimationMessage(`🔄 Shifting elements after index ${idx} to make space`)
        } else if (animationStep === 2) {
          setAnimationMessage(`🔄 Inserting ${val} at index ${idx}`)
        } else if (animationStep === 3) {
          setAnimationMessage(`✅ Successfully inserted ${val} at index ${idx}`)
        }
        break
      case "removing":
        if (animationStep === 1) {
          setAnimationMessage(`🗑️ Removing element at index ${idx}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`✅ Successfully removed element and shifted remaining elements`)
        }
        break
      case "updating":
        if (animationStep === 1) {
          setAnimationMessage(`🎯 Accessing element at index ${idx}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`✅ Successfully updated value at index ${idx} to ${val}`)
        }
        break
    }
  }

  // Array operations with enhanced UX
  const handleAdd = () => {
    if (newValue.trim() === "") return
    const value = Number(newValue)
    if (isNaN(value)) return

    setIsLoading(true)
    setAnimationState("adding")
    setAnimationStep(1)
    setActiveIndex(array.length)
    updateAnimationMessage()

    setTimeout(() => {
      setArray([...array, value])
    }, 1200)

    setNewValue("")
    setIsAddDialogOpen(false)
  }

  const handleInsert = () => {
    if (newValue.trim() === "" || index.trim() === "") return
    const value = Number(newValue)
    const idx = Number.parseInt(index)
    if (isNaN(value) || isNaN(idx) || idx < 0 || idx > array.length) return

    setIsLoading(true)
    setAnimationState("inserting")
    setAnimationStep(1)
    setActiveIndex(idx)
    updateAnimationMessage()

    setTimeout(() => {
      const newArray = [...array]
      newArray.splice(idx, 0, value)
      setArray(newArray)
    }, 2400)

    setNewValue("")
    setIndex("")
    setIsInsertDialogOpen(false)
  }

  const handleRemove = () => {
    if (index.trim() === "") return
    const idx = Number.parseInt(index)
    if (isNaN(idx) || idx < 0 || idx >= array.length) return

    setIsLoading(true)
    setAnimationState("removing")
    setAnimationStep(1)
    setActiveIndex(idx)
    updateAnimationMessage()

    setTimeout(() => {
      const newArray = [...array]
      newArray.splice(idx, 1)
      setArray(newArray)
    }, 2400)

    setIndex("")
    setIsRemoveDialogOpen(false)
  }

  const handleUpdate = () => {
    if (newValue.trim() === "" || index.trim() === "") return
    const value = Number(newValue)
    const idx = Number.parseInt(index)
    if (isNaN(value) || isNaN(idx) || idx < 0 || idx >= array.length) return

    setIsLoading(true)
    setAnimationState("updating")
    setAnimationStep(1)
    setActiveIndex(idx)
    updateAnimationMessage()

    setTimeout(() => {
      const newArray = [...array]
      newArray[idx] = value
      setArray(newArray)
    }, 1200)

    setNewValue("")
    setIndex("")
    setIsUpdateDialogOpen(false)
  }

  const getComplexityColor = (complexity: string) => {
    if (complexity === "O(1)") return "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20"
    if (complexity === "O(n)") return "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20"
    return "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20"
  }

  const renderArrayVisualization = () => {
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
            className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-xl"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4,
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
              className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
            >
              <Target className="h-5 w-5 text-white" />
            </motion.div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Array Visualization
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-sm">
              Length: {array.length}
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
                  <Zap className="h-3 w-3 text-blue-600 dark:text-blue-400" />
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
              className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl border border-purple-200 dark:border-purple-700/50 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </motion.div>
                <p className="text-purple-800 dark:text-purple-300 font-medium">{animationMessage}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Array Container */}
        <div className="flex-grow flex items-center justify-center min-h-[200px]">
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl">
            <AnimatePresence mode="popLayout">
              {array.map((value, idx) => (
                <motion.div
                  key={`${idx}-${value}`}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    x: animationState === "inserting" && animationStep === 1 && idx >= Number.parseInt(index) ? 20 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{
                    duration: 0.5,
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`
                    relative min-w-20 w-auto h-20 px-2 flex flex-col items-center justify-center rounded-2xl border-2 shadow-lg cursor-pointer
                    ${
                      activeIndex === idx
                        ? "border-purple-500 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 text-purple-700 dark:text-purple-300"
                        : "border-slate-300 dark:border-slate-600 bg-gradient-to-br from-white to-slate-50 dark:from-slate-700 dark:to-slate-800 text-slate-900 dark:text-white hover:border-slate-400 dark:hover:border-slate-500"
                    }
                    transition-all duration-300
                  `}
                >
                  {/* Glow effect for active element */}
                  {activeIndex === idx && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-lg"
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <motion.span
                    className="text-lg font-bold relative z-10"
                    animate={activeIndex === idx ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: activeIndex === idx ? Number.POSITIVE_INFINITY : 0 }}
                  >
                    {value}
                  </motion.span>

                  {/* Index label */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                      {idx}
                    </span>
                  </div>

                  {/* Operation indicators */}
                  {animationState === "removing" && activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Trash2 className="h-3 w-3 text-white" />
                    </motion.div>
                  )}

                  {animationState === "updating" && activeIndex === idx && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <Edit3 className="h-3 w-3 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* New element being added */}
              {animationState === "adding" && animationStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: -50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="w-20 h-20 flex flex-col items-center justify-center rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 text-green-700 dark:text-green-300 shadow-lg"
                >
                  <motion.span
                    className="text-lg font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {newValue}
                  </motion.span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Plus className="h-3 w-3 text-white" />
                  </div>
                </motion.div>
              )}

              {/* New element being inserted */}
              {animationState === "inserting" && animationStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0, y: -50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute w-20 h-20 flex flex-col items-center justify-center rounded-2xl border-2 border-green-500 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 text-green-700 dark:text-green-300 shadow-lg z-10"
                  style={{
                    left: `${(activeIndex ?? 0) * 92}px`,
                    top: "-60px",
                  }}
                >
                  <motion.span
                    className="text-lg font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {newValue}
                  </motion.span>
                  <motion.div
                    className="absolute -bottom-8"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowDown className="h-4 w-4 text-green-500" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Array Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Array Length</p>
              <motion.p
                key={array.length}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-slate-900 dark:text-white"
              >
                {array.length}
              </motion.p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Memory Usage</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{array.length * 4} bytes</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={`${getComplexityColor("O(1)")} border-0`}>
              <Clock className="h-3 w-3 mr-1" />
              Access: O(1)
            </Badge>
            <Badge className={`${getComplexityColor("O(n)")} border-0`}>
              <Zap className="h-3 w-3 mr-1" />
              Insert: O(n)
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
    submitColor = "bg-purple-600 hover:bg-purple-700",
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
            className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mx-auto mb-4 shadow-lg"
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
                  <Zap className="h-4 w-4" />
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
        className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  )

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8 text-center"
      >
        Arrays
      </motion.h1>

      <DataStructureVisualizer
        title="Array"
        description="A collection of elements stored at contiguous memory locations"
        operations={[
          {
            name: "Add Element",
            description: "Add a new element to the end of the array",
            action: () => setIsAddDialogOpen(true),
            disabled: animationState !== "idle",
          },
          {
            name: "Insert Element",
            description: "Insert a new element at a specific index",
            action: () => setIsInsertDialogOpen(true),
            disabled: animationState !== "idle",
          },
          {
            name: "Remove Element",
            description: "Remove an element at a specific index",
            action: () => setIsRemoveDialogOpen(true),
            disabled: array.length === 0 || animationState !== "idle",
          },
          {
            name: "Update Element",
            description: "Update an element at a specific index",
            action: () => setIsUpdateDialogOpen(true),
            disabled: array.length === 0 || animationState !== "idle",
          },
        ]}
        renderVisualization={renderArrayVisualization}
        codeImplementation={{
          JavaScript: `// Array declaration
const arr = [10, 20, 30, 40, 50];

// Access element (O(1))
const element = arr[2]; // Returns 30

// Add element to the end (O(1))
arr.push(60);

// Insert element at index 2 (O(n))
arr.splice(2, 0, 25);

// Remove element at index 3 (O(n))
arr.splice(3, 1);

// Update element at index 1 (O(1))
arr[1] = 22;

// Array traversal (O(n))
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}`,
          Python: `# Array declaration (list in Python)
arr = [10, 20, 30, 40, 50]

# Access element (O(1))
element = arr[2]  # Returns 30

# Add element to the end (O(1))
arr.append(60)

# Insert element at index 2 (O(n))
arr.insert(2, 25)

# Remove element at index 3 (O(n))
del arr[3]  # or arr.pop(3)

# Update element at index 1 (O(1))
arr[1] = 22

# Array traversal (O(n))
for i in range(len(arr)):
    print(arr[i])`,
          Java: `// Array declaration
int[] arr = {10, 20, 30, 40, 50};

// Access element (O(1))
int element = arr[2]; // Returns 30

// Add element to the end (requires new array)
// Java arrays have fixed size, so we need to create a new array
int[] newArr = new int[arr.length + 1];
System.arraycopy(arr, 0, newArr, 0, arr.length);
newArr[arr.length] = 60;
arr = newArr;

// Insert element at index 2 (O(n))
// Requires shifting elements
int[] insertArr = new int[arr.length + 1];
System.arraycopy(arr, 0, insertArr, 0, 2);
insertArr[2] = 25;
System.arraycopy(arr, 2, insertArr, 3, arr.length - 2);
arr = insertArr;

// Update element at index 1 (O(1))
arr[1] = 22;

// Array traversal (O(n))
for (int i = 0; i < arr.length; i++) {
    System.out.println(arr[i]);
}`,
        }}
        information={{
          characteristics: [
            "Elements are stored in contiguous memory locations",
            "Each element can be accessed directly using its index",
            "Fixed size in most low-level languages (dynamic in JavaScript, Python)",
            "Homogeneous elements (same data type) in most languages",
            "Memory is allocated at compile time in static arrays",
          ],
          useCases: [
            "Storing and accessing sequential data",
            "Temporary storage of objects in memory",
            "Implementing other data structures like stacks, queues",
            "Buffer for storing data being transferred",
            "Lookup tables and dynamic programming solutions",
          ],
          timeComplexity: {
            Access: "O(1)",
            Search: "O(n)",
            "Insert (at end)": "O(1)",
            "Insert (at position)": "O(n)",
            "Delete (at end)": "O(1)",
            "Delete (at position)": "O(n)",
          },
          spaceComplexity: "O(n)",
          types: [
            {
              name: "Static Arrays",
              description:
                "Fixed-size arrays where size is defined at compile time. Memory is allocated once and cannot be changed during execution.",
            },
            {
              name: "Dynamic Arrays",
              description:
                "Resizable arrays that can grow or shrink during execution. When capacity is reached, a new larger array is created and elements are copied.",
            },
            {
              name: "Multi-dimensional Arrays",
              description:
                "Arrays with multiple dimensions (2D, 3D, etc.). Elements are accessed using multiple indices, useful for representing matrices and tables.",
            },
          ],
        }}
      />

      {/* Enhanced Dialogs */}
      <EnhancedDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        title="Add Element"
        description="Add a new element to the end of the array"
        icon={<Plus className="h-6 w-6 text-white" />}
        onSubmit={handleAdd}
        submitLabel="Add Element"
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
      </EnhancedDialog>

      <EnhancedDialog
        isOpen={isInsertDialogOpen}
        onOpenChange={setIsInsertDialogOpen}
        title="Insert Element"
        description="Insert a new element at a specific index"
        icon={<ArrowRight className="h-6 w-6 text-white" />}
        onSubmit={handleInsert}
        submitLabel="Insert Element"
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
          label={`Index (0 to ${array.length})`}
          type="number"
          placeholder="Enter index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          min={0}
          max={array.length}
        />
        <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            Time Complexity: <strong>O(n)</strong> - Requires shifting elements
          </span>
        </div>
      </EnhancedDialog>

      <EnhancedDialog
        isOpen={isRemoveDialogOpen}
        onOpenChange={setIsRemoveDialogOpen}
        title="Remove Element"
        description="Remove an element at a specific index"
        icon={<Trash2 className="h-6 w-6 text-white" />}
        onSubmit={handleRemove}
        submitLabel="Remove Element"
        submitColor="bg-red-600 hover:bg-red-700"
      >
        <EnhancedInput
          label={`Index (0 to ${array.length - 1})`}
          type="number"
          placeholder="Enter index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          min={0}
          max={array.length - 1}
        />
        <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm text-yellow-700 dark:text-yellow-300">
            Time Complexity: <strong>O(n)</strong> - Requires shifting elements
          </span>
        </div>
      </EnhancedDialog>

      <EnhancedDialog
        isOpen={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        title="Update Element"
        description="Update an element at a specific index"
        icon={<Edit3 className="h-6 w-6 text-white" />}
        onSubmit={handleUpdate}
        submitLabel="Update Element"
        submitColor="bg-purple-600 hover:bg-purple-700"
      >
        <EnhancedInput
          label={`Index (0 to ${array.length - 1})`}
          type="number"
          placeholder="Enter index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          min={0}
          max={array.length - 1}
        />
        <EnhancedInput
          label="New Value"
          type="number"
          placeholder="Enter a number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl">
          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
          <span className="text-sm text-green-700 dark:text-green-300">
            Time Complexity: <strong>O(1)</strong> - Direct access by index
          </span>
        </div>
      </EnhancedDialog>
    </motion.div>
  )
}
