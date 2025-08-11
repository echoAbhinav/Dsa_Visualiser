"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Pause, RotateCcw, Settings, Zap, AlertCircle, Trophy, Timer, BarChart3, Target } from "lucide-react"
import AlgorithmVisualizer from "./algorithm-visualizer"
import CustomInput from "./custom-input"
import RaceLeaderboard from "./race-leaderboard"
import { generateRandomArray } from "@/lib/array-utils"
import { sortingAlgorithms } from "@/lib/sorting-algorithms"
import { searchingAlgorithms } from "@/lib/searching-algorithms"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

export default function AlgorithmRace() {
  const [algorithmType, setAlgorithmType] = useState<"sorting" | "searching">("sorting")
  const [array, setArray] = useState<number[]>([])
  const [arraySize, setArraySize] = useState(30)
  const [speed, setSpeed] = useState(50)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<string[]>([])
  const [algorithmStates, setAlgorithmStates] = useState<{ [key: string]: any }>({})
  const [searchTarget, setSearchTarget] = useState<number | null>(null)

  // Initialize array and algorithm states
  useEffect(() => {
    resetArray()
  }, [arraySize, algorithmType])

  const resetArray = () => {
    const newArray = generateRandomArray(arraySize, 5, 100)
    // If searching with binary search selected, sort the array
    if (algorithmType === "searching" && selectedAlgorithms.includes("binarySearch")) {
      newArray.sort((a, b) => a - b)
    }
    setArray(newArray)
    // If searching, set a random target
    if (algorithmType === "searching") {
      const randomIndex = Math.floor(Math.random() * newArray.length)
      setSearchTarget(newArray[randomIndex])
    }
    // Reset algorithm states
    const algorithms = algorithmType === "sorting" ? sortingAlgorithms : searchingAlgorithms
    const initialStates: { [key: string]: any } = {}
    Object.keys(algorithms).forEach((key) => {
      initialStates[key] = {
        progress: 0,
        comparisons: 0,
        swaps: 0,
        currentArray: [...newArray],
        currentIndices: [],
        completed: false,
        timeElapsed: 0,
      }
    })
    setAlgorithmStates(initialStates)
    setIsRunning(false)
    setIsPaused(false)
  }

  const toggleAlgorithm = (algorithmName: string) => {
    if (selectedAlgorithms.includes(algorithmName)) {
      setSelectedAlgorithms(selectedAlgorithms.filter((name) => name !== algorithmName))
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, algorithmName])
      // If binary search is selected, sort the array
      if (algorithmType === "searching" && algorithmName === "binarySearch") {
        const sortedArray = [...array].sort((a, b) => a - b)
        setArray(sortedArray)
        // Update all algorithm states with the sorted array
        setAlgorithmStates((prevStates) => {
          const newStates = { ...prevStates }
          Object.keys(newStates).forEach((key) => {
            newStates[key] = {
              ...newStates[key],
              currentArray: [...sortedArray],
            }
          })
          return newStates
        })
      }
    }
  }

  const startRace = () => {
    // If we're resuming from a paused state
    if (isPaused) {
      setIsPaused(false)
      return
    }
    if (selectedAlgorithms.length === 0) return
    setIsRunning(true)
    // Start time for each algorithm
    const startTimes: { [key: string]: number } = {}
    const pausedTimes: { [key: string]: number } = {}
    selectedAlgorithms.forEach((algo) => {
      startTimes[algo] = Date.now()
      pausedTimes[algo] = 0
    })

    // Store the interval ID so we can clear it when pausing
    let intervalId: NodeJS.Timeout
    const runInterval = () => {
      intervalId = setInterval(() => {
        setAlgorithmStates((prevStates) => {
          const newStates = { ...prevStates }
          let allCompleted = true
          selectedAlgorithms.forEach((algo) => {
            if (!newStates[algo].completed) {
              // Calculate elapsed time, accounting for paused time
              const timeElapsed = Date.now() - startTimes[algo] - pausedTimes[algo]
              // Simulate progress based on algorithm efficiency
              let progressIncrement = 0
              let comparisonIncrement = 0
              let swapIncrement = 0
              if (algorithmType === "sorting") {
                // Different progress rates based on algorithm efficiency
                switch (algo) {
                  case "quickSort":
                  case "mergeSort":
                    progressIncrement = (Math.random() * 3 + 2) * (speed / 50)
                    comparisonIncrement = Math.floor(Math.random() * 2) + 1
                    swapIncrement = Math.floor(Math.random() * 1) + 1
                    break
                  case "insertionSort":
                    progressIncrement = (Math.random() * 2 + 1) * (speed / 50)
                    comparisonIncrement = Math.floor(Math.random() * 3) + 1
                    swapIncrement = Math.floor(Math.random() * 2) + 1
                    break
                  case "selectionSort":
                  case "bubbleSort":
                    progressIncrement = (Math.random() * 1 + 0.5) * (speed / 50)
                    comparisonIncrement = Math.floor(Math.random() * 4) + 2
                    swapIncrement = Math.floor(Math.random() * 3) + 1
                    break
                  default:
                    progressIncrement = Math.random() * 2 * (speed / 50)
                    comparisonIncrement = Math.floor(Math.random() * 3) + 1
                    swapIncrement = Math.floor(Math.random() * 2) + 1
                }
              } else {
                // Searching algorithms
                switch (algo) {
                  case "binarySearch":
                    progressIncrement = (Math.random() * 5 + 5) * (speed / 50)
                    comparisonIncrement = 1
                    break
                  case "linearSearch":
                    progressIncrement = (Math.random() * 2 + 1) * (speed / 50)
                    comparisonIncrement = Math.floor(Math.random() * 3) + 1
                    break
                  default:
                    progressIncrement = Math.random() * 3 * (speed / 50)
                    comparisonIncrement = Math.floor(Math.random() * 2) + 1
                }
              }
              const newProgress = Math.min(100, newStates[algo].progress + progressIncrement)
              // Simulate array changes
              let currentArray = [...newStates[algo].currentArray]
              let currentIndices: number[] = []
              if (algorithmType === "sorting") {
                // For sorting, gradually sort the array as progress increases
                if (newProgress > newStates[algo].progress) {
                  const sortProgress = newProgress / 100
                  const originalArray = [...array]
                  const sortedArray = [...array].sort((a, b) => a - b)
                  // Create a partially sorted array based on progress
                  currentArray = originalArray.map((val, idx) => {
                    if (Math.random() < sortProgress) {
                      return sortedArray[idx]
                    }
                    return val
                  })
                  // Add some random indices for visualization
                  const numIndices = Math.floor(Math.random() * 3) + 1
                  for (let i = 0; i < numIndices; i++) {
                    currentIndices.push(Math.floor(Math.random() * array.length))
                  }
                }
              } else {
                // For searching, simulate the search process
                if (algo === "binarySearch") {
                  // Binary search visualization
                  const progress = newProgress / 100
                  const arrayLength = array.length
                  const left = Math.floor((arrayLength * (1 - progress)) / 2)
                  const right = Math.floor((arrayLength * (1 + progress)) / 2)
                  const mid = Math.floor((left + right) / 2)
                  currentIndices = [left, mid, right]
                } else {
                  // Linear search visualization
                  const progress = newProgress / 100
                  const searchPosition = Math.floor(array.length * progress)
                  currentIndices = [searchPosition]
                }
              }
              newStates[algo] = {
                ...newStates[algo],
                progress: newProgress,
                comparisons: newStates[algo].comparisons + comparisonIncrement,
                swaps: algorithmType === "sorting" ? newStates[algo].swaps + swapIncrement : 0,
                timeElapsed: timeElapsed,
                currentArray: currentArray,
                currentIndices: currentIndices,
                completed: newProgress >= 100,
              }
              if (newProgress < 100) allCompleted = false
            }
          })
          if (allCompleted) {
            clearInterval(intervalId)
            setIsRunning(false)
          }
          return newStates
        })
      }, 100) // Update every 100ms for smoother animation
    }

    // Start the interval
    runInterval()
    // Store the interval cleanup function
    const cleanupInterval = () => {
      if (intervalId) clearInterval(intervalId)
    }
    return cleanupInterval
  }

  const pauseRace = () => {
    setIsPaused(true)
    // When pausing, we clear the current interval
    // The startRace function will create a new one when resuming
  }

  const resetRace = () => {
    resetArray()
  }

  const handleCustomInput = (input: number[]) => {
    setArray(input)
    // If binary search is selected, sort the array
    if (algorithmType === "searching" && selectedAlgorithms.includes("binarySearch")) {
      input.sort((a, b) => a - b)
    }
    // Reset algorithm states with new array
    const algorithms = algorithmType === "sorting" ? sortingAlgorithms : searchingAlgorithms
    const initialStates: { [key: string]: any } = {}
    Object.keys(algorithms).forEach((key) => {
      initialStates[key] = {
        progress: 0,
        comparisons: 0,
        swaps: 0,
        currentArray: [...input],
        currentIndices: [],
        completed: false,
        timeElapsed: 0,
      }
    })
    setAlgorithmStates(initialStates)
    setIsRunning(false)
    setIsPaused(false)
  }

  const handleSearchTargetChange = (target: number) => {
    setSearchTarget(target)
  }

  const handleAlgorithmTypeChange = (type: string) => {
    setAlgorithmType(type as "sorting" | "searching")
    setSelectedAlgorithms([])
  }

  const getStatusColor = () => {
    if (isRunning && !isPaused) return "text-green-500"
    if (isPaused) return "text-yellow-500"
    return "text-slate-500"
  }

  const getStatusText = () => {
    if (isRunning && !isPaused) return "Racing..."
    if (isPaused) return "Paused"
    return "Ready"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-xl"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-40 h-40 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-2xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Enhanced Header */}
      <div className="relative p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{
                  rotate: isRunning && !isPaused ? [0, 360] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: isRunning && !isPaused ? Number.POSITIVE_INFINITY : 0,
                  ease: "linear",
                }}
                className="p-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg"
              >
                <Zap className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Algorithm Race</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor().replace("text-", "bg-")}`} />
                  <p className={`text-sm font-medium ${getStatusColor()}`}>{getStatusText()}</p>
                </div>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Compare algorithm performance in real-time with interactive visualizations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm bg-transparent"
                onClick={resetRace}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </motion.div>

            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div
                  key="pause-resume"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={isPaused ? "default" : "outline"}
                    size="sm"
                    className={
                      isPaused
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                        : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm"
                    }
                    onClick={isPaused ? startRace : pauseRace}
                  >
                    {isPaused ? (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Resume
                      </>
                    ) : (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    )}
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                    onClick={startRace}
                    disabled={selectedAlgorithms.length === 0}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Race
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm bg-transparent"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="relative p-6">
        {/* Enhanced Algorithm Type Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <Tabs defaultValue="sorting" className="w-full" onValueChange={handleAlgorithmTypeChange}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 rounded-xl">
              <TabsTrigger
                value="sorting"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Sorting Algorithms
              </TabsTrigger>
              <TabsTrigger
                value="searching"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 rounded-lg"
              >
                <Target className="h-4 w-4 mr-2" />
                Searching Algorithms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sorting" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
              >
                {Object.keys(sortingAlgorithms).map((algo, index) => (
                  <motion.div
                    key={algo}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant={selectedAlgorithms.includes(algo) ? "default" : "outline"}
                      className={
                        selectedAlgorithms.includes(algo)
                          ? "w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg border-0"
                          : "w-full border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                      }
                      onClick={() => toggleAlgorithm(algo)}
                      disabled={isRunning && !isPaused}
                    >
                      {sortingAlgorithms[algo].name}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="searching" className="mt-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {Object.keys(searchingAlgorithms).map((algo, index) => (
                    <motion.div
                      key={algo}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant={selectedAlgorithms.includes(algo) ? "default" : "outline"}
                        className={
                          selectedAlgorithms.includes(algo)
                            ? "w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg border-0"
                            : "w-full border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                        }
                        onClick={() => toggleAlgorithm(algo)}
                        disabled={isRunning && !isPaused}
                      >
                        {searchingAlgorithms[algo].name}
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {algorithmType === "searching" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-xl border border-amber-200 dark:border-amber-800"
                  >
                    <Target className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    <span className="text-slate-700 dark:text-white font-medium">Search Target:</span>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 text-amber-800 dark:text-amber-300 px-4 py-2 rounded-lg font-mono font-bold shadow-sm"
                    >
                      {searchTarget !== null ? searchTarget : "None"}
                    </motion.div>
                  </motion.div>
                )}

                <AnimatePresence>
                  {algorithmType === "searching" && selectedAlgorithms.includes("binarySearch") && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                        <AlertDescription className="text-amber-800 dark:text-amber-400">
                          <strong>Binary Search</strong> requires a sorted array. The array has been automatically
                          sorted for optimal performance.
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                <span className="text-slate-700 dark:text-white font-semibold">Array Size: {arraySize}</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">(5-100 elements)</span>
            </div>
            <Slider
              value={[arraySize]}
              min={5}
              max={100}
              step={1}
              onValueChange={(value) => setArraySize(value[0])}
              disabled={isRunning && !isPaused}
              className="py-4"
            />
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-blue-500" />
                <span className="text-slate-700 dark:text-white font-semibold">Animation Speed: {speed}%</span>
              </div>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">(Slow → Fast)</span>
            </div>
            <Slider
              value={[speed]}
              min={10}
              max={100}
              step={1}
              onValueChange={(value) => setSpeed(value[0])}
              className="py-4"
            />
          </div>
        </motion.div>

        {/* Enhanced Custom Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <CustomInput
            onSubmit={handleCustomInput}
            onSearchTargetChange={handleSearchTargetChange}
            algorithmType={algorithmType}
            disabled={isRunning && !isPaused}
          />
        </motion.div>

        {/* Algorithm Visualizers */}
        <AnimatePresence>
          {selectedAlgorithms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {selectedAlgorithms.map((algo, index) => (
                <motion.div
                  key={algo}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <AlgorithmVisualizer
                    algorithm={algorithmType === "sorting" ? sortingAlgorithms[algo] : searchingAlgorithms[algo]}
                    array={array}
                    state={algorithmStates[algo]}
                    type={algorithmType}
                    searchTarget={searchTarget}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Race Leaderboard */}
        <AnimatePresence>
          {selectedAlgorithms.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Race Leaderboard</h3>
              </div>
              <RaceLeaderboard
                algorithms={selectedAlgorithms.map((algo) => ({
                  name: algorithmType === "sorting" ? sortingAlgorithms[algo].name : searchingAlgorithms[algo].name,
                  progress: algorithmStates[algo]?.progress || 0,
                  comparisons: algorithmStates[algo]?.comparisons || 0,
                  swaps: algorithmStates[algo]?.swaps || 0,
                  timeElapsed: algorithmStates[algo]?.timeElapsed || 0,
                  completed: algorithmStates[algo]?.completed || false,
                }))}
                type={algorithmType}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {selectedAlgorithms.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="mb-4"
              >
                <Zap className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto" />
              </motion.div>
              <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-400 mb-2">Ready to Race!</h3>
              <p className="text-slate-500 dark:text-slate-500">
                Select one or more algorithms above to start comparing their performance
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
