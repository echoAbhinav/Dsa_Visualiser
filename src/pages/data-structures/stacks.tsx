"use client"

import { useState, useEffect } from "react"
import DataStructureVisualizer from "./data-structure-visualizer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUp, Trash2, RotateCcw, Play, Pause, Zap, Target, Layers, TrendingUp } from "lucide-react"

interface StackElement {
  value: number
  id: string
  timestamp: number
}

export default function StacksPage() {
  const [stack, setStack] = useState<StackElement[]>([
    { value: 10, id: "1", timestamp: Date.now() - 4000 },
    { value: 20, id: "2", timestamp: Date.now() - 3000 },
    { value: 30, id: "3", timestamp: Date.now() - 2000 },
    { value: 40, id: "4", timestamp: Date.now() - 1000 },
    { value: 50, id: "5", timestamp: Date.now() },
  ])
  const [newValue, setNewValue] = useState<string>("")
  const [isPushDialogOpen, setIsPushDialogOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [animationState, setAnimationState] = useState<"idle" | "pushing" | "popping" | "peeking" | "clearing">("idle")
  const [animationStep, setAnimationStep] = useState<number>(0)
  const [animationMessage, setAnimationMessage] = useState<string>("")
  const [newElement, setNewElement] = useState<StackElement | null>(null)
  const [operationCount, setOperationCount] = useState(0)
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [autoSpeed] = useState(2000)
  const [highlightedElements, setHighlightedElements] = useState<Set<string>>(new Set())
  const [stackHistory, setStackHistory] = useState<StackElement[][]>([])

  // Auto mode effect
  useEffect(() => {
    if (isAutoMode && animationState === "idle") {
      const timer = setTimeout(() => {
        const operations = ["push", "pop", "peek"]
        const randomOp = operations[Math.floor(Math.random() * operations.length)]

        if (randomOp === "push" && stack.length < 10) {
          const value = Math.floor(Math.random() * 100) + 1
          setNewElement({ value, id: Date.now().toString(), timestamp: Date.now() })
          setAnimationState("pushing")
          setAnimationStep(1)
        } else if (randomOp === "pop" && stack.length > 0) {
          handlePop()
        } else if (randomOp === "peek" && stack.length > 0) {
          handlePeek()
        }
      }, autoSpeed)

      return () => clearTimeout(timer)
    }
  }, [isAutoMode, animationState, stack.length, autoSpeed])

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
            if (animationState === "pushing" && newElement) {
              setStack((prev) => {
                const newStack = [...prev, newElement]
                setStackHistory((prevHistory) => [...prevHistory.slice(-9), prev])
                return newStack
              })
              setOperationCount((prev) => prev + 1)
            } else if (animationState === "popping") {
              setStack((prev) => {
                setStackHistory((prevHistory) => [...prevHistory.slice(-9), prev])
                return prev.slice(0, -1)
              })
              setOperationCount((prev) => prev + 1)
            } else if (animationState === "clearing") {
              setStack([])
              setStackHistory([])
              setOperationCount(0)
            }

            if (animationState !== "peeking") {
              setAnimationState("idle")
              setAnimationStep(0)
              setActiveIndex(null)
              setAnimationMessage("")
              setNewElement(null)
              setHighlightedElements(new Set())
            } else {
              // For peeking, keep highlighting for a bit longer
              setTimeout(() => {
                setAnimationState("idle")
                setAnimationStep(0)
                setActiveIndex(null)
                setAnimationMessage("")
                setHighlightedElements(new Set())
              }, 1500)
            }
          }, 800)
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [animationState, animationStep, newElement])

  // Get max steps for current animation
  const getMaxSteps = () => {
    switch (animationState) {
      case "pushing":
        return 3
      case "popping":
        return 3
      case "peeking":
        return 2
      case "clearing":
        return 2
      default:
        return 0
    }
  }

  // Update animation message based on current step
  const updateAnimationMessage = () => {
    const val = newElement?.value
    switch (animationState) {
      case "pushing":
        if (animationStep === 1) {
          setAnimationMessage(`🔄 Creating new element with value ${val}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`⬆️ Moving element to stack top`)
        } else if (animationStep === 3) {
          setAnimationMessage(`✅ Successfully pushed ${val} to the stack`)
        }
        break
      case "popping":
        if (animationStep === 1) {
          setAnimationMessage(`🎯 Identifying top element: ${stack[stack.length - 1]?.value}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`⬇️ Removing element from stack`)
        } else if (animationStep === 3) {
          setAnimationMessage(`✅ Successfully popped ${stack[stack.length - 1]?.value}`)
        }
        break
      case "peeking":
        if (animationStep === 1) {
          setAnimationMessage(`👁️ Examining top element: ${stack[stack.length - 1]?.value}`)
        } else if (animationStep === 2) {
          setAnimationMessage(`📋 Top element is ${stack[stack.length - 1]?.value} (not removed)`)
        }
        break
      case "clearing":
        if (animationStep === 1) {
          setAnimationMessage(`🧹 Clearing all elements from stack`)
        } else if (animationStep === 2) {
          setAnimationMessage(`✅ Stack cleared successfully`)
        }
        break
    }
  }

  // Stack operations
  const handlePush = () => {
    if (newValue.trim() === "") return
    const value = Number.parseInt(newValue)
    if (isNaN(value)) return
    if (stack.length >= 10) {
      setAnimationMessage("⚠️ Stack overflow! Maximum capacity reached")
      return
    }

    const element: StackElement = {
      value,
      id: Date.now().toString(),
      timestamp: Date.now(),
    }

    setNewElement(element)
    setAnimationState("pushing")
    setAnimationStep(1)
    setNewValue("")
    setIsPushDialogOpen(false)
  }

  const handlePop = () => {
    if (stack.length === 0) return
    setAnimationState("popping")
    setAnimationStep(1)
    setActiveIndex(stack.length - 1)
    setHighlightedElements(new Set([stack[stack.length - 1].id]))
  }

  const handlePeek = () => {
    if (stack.length === 0) return
    setAnimationState("peeking")
    setAnimationStep(1)
    setActiveIndex(stack.length - 1)
    setHighlightedElements(new Set([stack[stack.length - 1].id]))
  }

  const handleClear = () => {
    if (stack.length === 0) return
    setAnimationState("clearing")
    setAnimationStep(1)
    setHighlightedElements(new Set(stack.map((el) => el.id)))
  }

  const handleUndo = () => {
    if (stackHistory.length === 0) return
    const previousState = stackHistory[stackHistory.length - 1]
    setStack(previousState)
    setStackHistory((prev) => prev.slice(0, -1))
    setOperationCount((prev) => Math.max(0, prev - 1))
  }

  const getElementAge = (timestamp: number) => {
    const age = Date.now() - timestamp
    if (age < 5000) return "new"
    if (age < 15000) return "recent"
    return "old"
  }

  const renderStackVisualization = () => {
    const stackCapacity = 10
    const emptySlots = stackCapacity - stack.length

    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-700 h-full flex flex-col shadow-lg">
        {/* Header with stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Stack Visualization</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">LIFO Data Structure</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-white dark:bg-slate-800">
              <TrendingUp className="w-3 h-3 mr-1" />
              {operationCount} ops
            </Badge>
            <Badge variant="outline" className="bg-white dark:bg-slate-800">
              {stack.length}/{stackCapacity}
            </Badge>
          </div>
        </div>

        {/* Animation message */}
        {animationMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 text-purple-800 dark:text-purple-300 rounded-lg text-center border border-purple-200 dark:border-purple-700 shadow-sm">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="font-medium">{animationMessage}</span>
            </div>
          </div>
        )}

        {/* Control panel */}
        <div className="mb-6 flex flex-wrap gap-2 justify-center">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAutoMode(!isAutoMode)}
            className={`${isAutoMode ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : ""}`}
          >
            {isAutoMode ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
            {isAutoMode ? "Stop Auto" : "Auto Mode"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleUndo}
            disabled={stackHistory.length === 0 || animationState !== "idle"}
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Undo
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={handleClear}
            disabled={stack.length === 0 || animationState !== "idle"}
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
        </div>

        {/* Stack visualization */}
        <div className="flex-grow flex items-center justify-center">
          <div className="relative">
            {/* Stack container */}
            <div className="flex flex-col-reverse gap-1 items-center min-h-[400px] justify-end">
              {/* New element being pushed */}
              {animationState === "pushing" && animationStep >= 1 && newElement && (
                <div
                  className={`
                    w-56 h-14 flex items-center justify-center rounded-xl border-2 border-green-500 
                    bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 
                    text-green-700 dark:text-green-300 shadow-lg transform transition-all duration-1000
                    ${
                      animationStep === 1
                        ? "translate-y-8 scale-110 animate-bounce"
                        : animationStep === 2
                          ? "translate-y-4 scale-105"
                          : "translate-y-0 scale-100"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <ArrowUp className="w-5 h-5 animate-pulse" />
                    <span className="text-lg font-bold">{newElement.value}</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              )}

              {/* Stack elements */}
              {stack.map((element, idx) => {
                const isTop = idx === stack.length - 1
                const isActive = activeIndex === idx
                const isHighlighted = highlightedElements.has(element.id)
                const age = getElementAge(element.timestamp)

                return (
                  <div
                    key={element.id}
                    className={`
                      w-56 h-14 flex items-center justify-center rounded-xl border-2 relative
                      transition-all duration-500 transform
                      ${
                        isActive || isHighlighted
                          ? animationState === "popping"
                            ? "border-red-500 bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 text-red-700 dark:text-red-300 animate-pulse scale-105"
                            : animationState === "peeking"
                              ? "border-blue-500 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 animate-pulse scale-105"
                              : animationState === "clearing"
                                ? "border-orange-500 bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/30 dark:to-yellow-900/30 text-orange-700 dark:text-orange-300 animate-pulse"
                                : "border-purple-500 bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/30 dark:to-violet-900/30 text-purple-700 dark:text-purple-300 animate-pulse scale-105"
                          : age === "new"
                            ? "border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-slate-900 dark:text-white shadow-md"
                            : age === "recent"
                              ? "border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-slate-900 dark:text-white shadow-sm"
                              : "border-slate-300 dark:border-slate-600 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 text-slate-900 dark:text-white"
                      }
                      ${
                        animationState === "popping" && idx === stack.length - 1 && animationStep >= 2
                          ? "transform -translate-y-12 opacity-0 scale-90"
                          : ""
                      }
                      ${
                        animationState === "clearing" && animationStep >= 2
                          ? "transform -translate-y-12 opacity-0 scale-75"
                          : ""
                      }
                      hover:scale-105 hover:shadow-lg
                    `}
                    style={{
                      transitionDelay: animationState === "clearing" ? `${idx * 100}ms` : "0ms",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      {isTop && <Target className="w-4 h-4 text-purple-500 animate-pulse" />}
                      <span className="text-lg font-bold">{element.value}</span>
                      {age === "new" && <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>}
                    </div>

                    {/* Top indicator */}
                    {isTop && (
                      <div className="absolute -right-20 flex items-center gap-2">
                        <ArrowUp className="w-4 h-4 text-purple-500" />
                        <span className="text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 py-1 rounded-full">
                          TOP
                        </span>
                      </div>
                    )}

                    {/* Element index */}
                    <div className="absolute -left-8 text-xs text-slate-500 dark:text-slate-400 font-mono">{idx}</div>
                  </div>
                )
              })}

              {/* Empty slots visualization */}
              {emptySlots > 0 && (
                <div className="flex flex-col-reverse gap-1">
                  {Array.from({ length: Math.min(emptySlots, 3) }).map((_, idx) => (
                    <div
                      key={`empty-${idx}`}
                      className="w-56 h-14 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl flex items-center justify-center opacity-30"
                    >
                      <span className="text-slate-400 dark:text-slate-500 text-sm">Empty</span>
                    </div>
                  ))}
                  {emptySlots > 3 && (
                    <div className="text-center text-slate-400 dark:text-slate-500 text-sm py-2">
                      +{emptySlots - 3} more slots
                    </div>
                  )}
                </div>
              )}

              {/* Base of stack */}
              <div className="w-56 h-3 bg-gradient-to-r from-slate-400 to-slate-500 dark:from-slate-600 dark:to-slate-700 rounded-b-xl shadow-lg"></div>
            </div>

            {/* Capacity indicator */}
            <div className="absolute -right-24 top-0 h-full flex flex-col justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">Max</div>
              <div className="flex-grow flex items-center">
                <Progress value={(stack.length / stackCapacity) * 100} className="h-2 w-4 rotate-90 origin-center" />
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">0</div>
            </div>
          </div>
        </div>

        {/* Stack info */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white">{stack.length}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Size</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {stack.length > 0 ? stack[stack.length - 1].value : "-"}
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Top</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white">{stackCapacity - stack.length}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Free</div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-slate-900 dark:text-white">{operationCount}</div>
              <div className="text-xs text-slate-600 dark:text-slate-400">Operations</div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Enhanced Push Dialog
  const PushDialog = () => (
    <Dialog open={isPushDialogOpen} onOpenChange={setIsPushDialogOpen}>
      <DialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowUp className="w-5 h-5 text-purple-600" />
            Push Element to Stack
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Add a new element to the top of the stack. The element will be placed above all existing elements.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="push-value" className="text-slate-700 dark:text-slate-300 font-medium">
              Element Value
            </Label>
            <Input
              id="push-value"
              type="number"
              placeholder="Enter a number (1-999)"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              min="1"
              max="999"
            />
          </div>
          {stack.length >= 10 && (
            <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
              ⚠️ Stack is at maximum capacity (10 elements)
            </div>
          )}
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm">
            💡 The new element will become the new top of the stack
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsPushDialogOpen(false)}
            className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePush}
            className="bg-purple-600 hover:bg-purple-700"
            disabled={!newValue.trim() || isNaN(Number(newValue)) || stack.length >= 10}
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Push Element
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">Stacks</h1>
      <DataStructureVisualizer
        title="Stack"
        description="A linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end, called the top of the stack."
        operations={[
          {
            name: "Push",
            description: "Add an element to the top of the stack",
            action: () => setIsPushDialogOpen(true),
            disabled: animationState !== "idle" || stack.length >= 10,
          },
          {
            name: "Pop",
            description: "Remove and return the top element from the stack",
            action: handlePop,
            disabled: stack.length === 0 || animationState !== "idle",
          },
          {
            name: "Peek",
            description: "View the top element without removing it",
            action: handlePeek,
            disabled: stack.length === 0 || animationState !== "idle",
          },
        ]}
        renderVisualization={renderStackVisualization}
        codeImplementation={{
          JavaScript: `// Enhanced Stack implementation with capacity management
class Stack {
  constructor(maxCapacity = 10) {
    this.items = [];
    this.maxCapacity = maxCapacity;
    this.operationCount = 0;
  }

  // Push element to the top of the stack
  push(element) {
    if (this.isFull()) {
      throw new Error("Stack Overflow: Cannot push to full stack");
    }
    this.items.push({
      value: element,
      id: Date.now().toString(),
      timestamp: Date.now()
    });
    this.operationCount++;
    return this.items.length;
  }

  // Remove and return the top element
  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow: Cannot pop from empty stack");
    }
    const poppedElement = this.items.pop();
    this.operationCount++;
    return poppedElement.value;
  }

  // Return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    }
    return this.items[this.items.length - 1].value;
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Check if stack is full
  isFull() {
    return this.items.length >= this.maxCapacity;
  }

  // Return the size of the stack
  size() {
    return this.items.length;
  }

  // Get remaining capacity
  remainingCapacity() {
    return this.maxCapacity - this.items.length;
  }

  // Clear the stack
  clear() {
    this.items = [];
    this.operationCount = 0;
  }

  // Get stack statistics
  getStats() {
    return {
      size: this.size(),
      capacity: this.maxCapacity,
      isEmpty: this.isEmpty(),
      isFull: this.isFull(),
      operations: this.operationCount,
      topElement: this.isEmpty() ? null : this.peek()
    };
  }

  // Convert stack to array (for visualization)
  toArray() {
    return this.items.map(item => item.value);
  }
}

// Usage with error handling
const stack = new Stack(5);

try {
  stack.push(10);
  stack.push(20);
  stack.push(30);
  
  console.log("Stack stats:", stack.getStats());
  console.log("Top element:", stack.peek()); // 30
  console.log("Popped:", stack.pop());       // 30
  console.log("Current size:", stack.size()); // 2
  console.log("Stack array:", stack.toArray()); // [10, 20]
} catch (error) {
  console.error("Stack operation failed:", error.message);
}`,

          Python: `# Enhanced Stack implementation with capacity management
class Stack:
    def __init__(self, max_capacity=10):
        self.items = []
        self.max_capacity = max_capacity
        self.operation_count = 0
    
    def push(self, item):
        """Push element to the top of the stack"""
        if self.is_full():
            raise OverflowError("Stack Overflow: Cannot push to full stack")
        
        element = {
            'value': item,
            'id': str(hash(f"{item}_{len(self.items)}")),
            'timestamp': __import__('time').time()
        }
        self.items.append(element)
        self.operation_count += 1
        return len(self.items)
    
    def pop(self):
        """Remove and return the top element"""
        if self.is_empty():
            raise IndexError("Stack Underflow: Cannot pop from empty stack")
        
        popped_element = self.items.pop()
        self.operation_count += 1
        return popped_element['value']
    
    def peek(self):
        """Return the top element without removing it"""
        if self.is_empty():
            raise IndexError("Stack is empty")
        return self.items[-1]['value']
    
    def is_empty(self):
        """Check if stack is empty"""
        return len(self.items) == 0
    
    def is_full(self):
        """Check if stack is full"""
        return len(self.items) >= self.max_capacity
    
    def size(self):
        """Return the size of the stack"""
        return len(self.items)
    
    def remaining_capacity(self):
        """Get remaining capacity"""
        return self.max_capacity - len(self.items)
    
    def clear(self):
        """Clear the stack"""
        self.items = []
        self.operation_count = 0
    
    def get_stats(self):
        """Get stack statistics"""
        return {
            'size': self.size(),
            'capacity': self.max_capacity,
            'is_empty': self.is_empty(),
            'is_full': self.is_full(),
            'operations': self.operation_count,
            'top_element': None if self.is_empty() else self.peek()
        }
    
    def to_list(self):
        """Convert stack to list (for visualization)"""
        return [item['value'] for item in self.items]
    
    def __str__(self):
        """String representation of stack"""
        if self.is_empty():
            return "Stack: []"
        return f"Stack: {self.to_list()} (top: {self.peek()})"

# Usage with error handling
stack = Stack(5)

try:
    stack.push(10)
    stack.push(20)
    stack.push(30)
    
    print("Stack stats:", stack.get_stats())
    print("Top element:", stack.peek())  # 30
    print("Popped:", stack.pop())        # 30
    print("Current size:", stack.size()) # 2
    print("Stack list:", stack.to_list()) # [10, 20]
    print(stack)  # Stack: [10, 20] (top: 20)
except (OverflowError, IndexError) as e:
    print(f"Stack operation failed: {e}")`,

          Java: `// Enhanced Stack implementation with generics and capacity management
import java.util.*;
import java.time.Instant;

public class EnhancedStack<T> {
    private List<StackElement<T>> items;
    private int maxCapacity;
    private int operationCount;
    
    // Inner class to represent stack elements
    private static class StackElement<T> {
        T value;
        String id;
        long timestamp;
        
        StackElement(T value) {
            this.value = value;
            this.id = String.valueOf(System.nanoTime());
            this.timestamp = Instant.now().toEpochMilli();
        }
    }
    
    // Constructor
    public EnhancedStack(int maxCapacity) {
        this.items = new ArrayList<>();
        this.maxCapacity = maxCapacity;
        this.operationCount = 0;
    }
    
    public EnhancedStack() {
        this(10); // Default capacity
    }
    
    // Push element to the top of the stack
    public int push(T element) throws StackOverflowError {
        if (isFull()) {
            throw new StackOverflowError("Stack Overflow: Cannot push to full stack");
        }
        items.add(new StackElement<>(element));
        operationCount++;
        return items.size();
    }
    
    // Remove and return the top element
    public T pop() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        StackElement<T> poppedElement = items.remove(items.size() - 1);
        operationCount++;
        return poppedElement.value;
    }
    
    // Return the top element without removing it
    public T peek() throws EmptyStackException {
        if (isEmpty()) {
            throw new EmptyStackException();
        }
        return items.get(items.size() - 1).value;
    }
    
    // Check if stack is empty
    public boolean isEmpty() {
        return items.isEmpty();
    }
    
    // Check if stack is full
    public boolean isFull() {
        return items.size() >= maxCapacity;
    }
    
    // Return the size of the stack
    public int size() {
        return items.size();
    }
    
    // Get remaining capacity
    public int remainingCapacity() {
        return maxCapacity - items.size();
    }
    
    // Clear the stack
    public void clear() {
        items.clear();
        operationCount = 0;
    }
    
    // Get stack statistics
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("size", size());
        stats.put("capacity", maxCapacity);
        stats.put("isEmpty", isEmpty());
        stats.put("isFull", isFull());
        stats.put("operations", operationCount);
        stats.put("topElement", isEmpty() ? null : peek());
        return stats;
    }
    
    // Convert stack to array (for visualization)
    public List<T> toList() {
        return items.stream()
                   .map(element -> element.value)
                   .collect(ArrayList::new, ArrayList::add, ArrayList::addAll);
    }
    
    @Override
    public String toString() {
        if (isEmpty()) {
            return "Stack: []";
        }
        return "Stack: " + toList() + " (top: " + peek() + ")";
    }
}

// Usage example with error handling
public class StackDemo {
    public static void main(String[] args) {
        EnhancedStack<Integer> stack = new EnhancedStack<>(5);
        
        try {
            stack.push(10);
            stack.push(20);
            stack.push(30);
            
            System.out.println("Stack stats: " + stack.getStats());
            System.out.println("Top element: " + stack.peek()); // 30
            System.out.println("Popped: " + stack.pop());       // 30
            System.out.println("Current size: " + stack.size()); // 2
            System.out.println("Stack list: " + stack.toList()); // [10, 20]
            System.out.println(stack); // Stack: [10, 20] (top: 20)
        } catch (StackOverflowError | EmptyStackException e) {
            System.err.println("Stack operation failed: " + e.getMessage());
        }
    }
}`,
        }}
        information={{
          characteristics: [
            "Follows Last In First Out (LIFO) principle - the last element added is the first to be removed",
            "Elements can only be added or removed from one end, called the 'top' of the stack",
            "Insertion (push) and deletion (pop) operations are performed at the same end",
            "Can be implemented using arrays (static) or linked lists (dynamic)",
            "Has a restricted access pattern - only the top element is directly accessible",
            "Memory efficient with constant time operations for basic stack operations",
          ],
          useCases: [
            "Function call management (call stack) - tracking function calls and returns",
            "Expression evaluation and syntax parsing - converting infix to postfix notation",
            "Undo/Redo operations in applications - maintaining operation history",
            "Backtracking algorithms - depth-first search, maze solving, N-Queens problem",
            "Browser history management - implementing back button functionality",
            "Memory management - stack frames for local variables and function parameters",
            "Compiler design - parsing nested structures and managing scope",
            "Mathematical calculations - evaluating arithmetic expressions",
          ],
          timeComplexity: {
            Push: "O(1) - constant time insertion at top",
            Pop: "O(1) - constant time removal from top",
            Peek: "O(1) - constant time access to top element",
            Search: "O(n) - linear search through all elements",
            "Access (other than top)": "O(n) - must pop elements to reach lower ones",
          },
          spaceComplexity: "O(n) - where n is the number of elements in the stack",
          types: [
            {
              name: "Array-based Stack (Static)",
              description:
                "Implemented using fixed-size arrays. Simple and memory-efficient but requires predefined maximum capacity. May need resizing if the stack grows beyond initial capacity.",
            },
            {
              name: "Linked List-based Stack (Dynamic)",
              description:
                "Implemented using linked lists. Dynamically grows and shrinks but uses extra memory for storing pointers. No capacity limitations.",
            },
            {
              name: "Dynamic Array Stack",
              description:
                "Automatically resizes when capacity is reached, providing flexibility at the cost of occasional O(n) operations during resizing. Combines benefits of both approaches.",
            },
            {
              name: "Bounded Stack",
              description:
                "Has a maximum capacity limit to prevent stack overflow. Useful in memory-constrained environments or when implementing stack-based algorithms with known limits.",
            },
          ],
        }}
      />
      <PushDialog />
    </>
  )
}
