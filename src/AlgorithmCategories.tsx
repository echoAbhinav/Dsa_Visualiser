"use client"

import type React from "react"

import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  BarChart3,
  GitBranch,
  Network,
  Search,
  Sigma,
  Workflow,
  Sparkles,
  Clock,
  Timer,
  HardDrive,
} from "lucide-react"
import { motion } from "framer-motion"

interface Algorithm {
  name: string
  timeComplexity: string
  spaceComplexity: string
  timeComplexityLevel: "excellent" | "good" | "average" | "poor"
  spaceComplexityLevel: "excellent" | "good" | "average" | "poor"
}

interface Category {
  title: string
  description: string
  icon: React.ReactNode
  link: string
  algorithms: Algorithm[]
  status: "implemented" | "coming-soon"
  gradient: string
  borderGradient: string
}

export default function AlgorithmCategories() {
  const getComplexityColor = (level: "excellent" | "good" | "average" | "poor") => {
    switch (level) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
      case "average":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "poor":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    }
  }

  const categories: Category[] = [
    {
      title: "Sorting Algorithms",
      description: "Visualize and compare different sorting techniques",
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      link: "/algorithms/sorting",
      algorithms: [
        {
          name: "Bubble Sort",
          timeComplexity: "O(n²)",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "average",
          spaceComplexityLevel: "excellent",
        },
        {
          name: "Selection Sort",
          timeComplexity: "O(n²)",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "average",
          spaceComplexityLevel: "excellent",
        },
        {
          name: "Insertion Sort",
          timeComplexity: "O(n²)",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "average",
          spaceComplexityLevel: "excellent",
        },
        {
          name: "Merge Sort",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
        {
          name: "Quick Sort",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(log n)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "excellent",
        },
      ],
      status: "implemented",
      gradient: "from-purple-500/10 to-pink-500/10",
      borderGradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Searching Algorithms",
      description: "Explore efficient ways to find elements in data structures",
      icon: <Search className="h-6 w-6 text-blue-500" />,
      link: "/algorithms/searching",
      algorithms: [
        {
          name: "Linear Search",
          timeComplexity: "O(n)",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "excellent",
        },
        {
          name: "Binary Search",
          timeComplexity: "O(log n)",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "excellent",
          spaceComplexityLevel: "excellent",
        },
      ],
      status: "implemented",
      gradient: "from-blue-500/10 to-cyan-500/10",
      borderGradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Graph Algorithms",
      description: "Visualize traversal and pathfinding techniques",
      icon: <Network className="h-6 w-6 text-green-500" />,
      link: "/algorithms/graph",
      algorithms: [
        {
          name: "BFS",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
        {
          name: "DFS",
          timeComplexity: "O(V + E)",
          spaceComplexity: "O(V)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
        {
          name: "Dijkstra's",
          timeComplexity: "O((V + E) log V)",
          spaceComplexity: "O(V)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
        {
          name: "Prim's",
          timeComplexity: "O(E log V)",
          spaceComplexity: "O(V)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
        {
          name: "Kruskal's",
          timeComplexity: "O(E log E)",
          spaceComplexity: "O(V)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
      ],
      status: "coming-soon",
      gradient: "from-green-500/10 to-emerald-500/10",
      borderGradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Dynamic Programming",
      description: "Understand optimization through subproblem solutions",
      icon: <GitBranch className="h-6 w-6 text-yellow-500" />,
      link: "/algorithms/dp",
      algorithms: [
        {
          name: "Fibonacci",
          timeComplexity: "O(n)",
          spaceComplexity: "O(n)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
        {
          name: "Knapsack",
          timeComplexity: "O(nW)",
          spaceComplexity: "O(nW)",
          timeComplexityLevel: "average",
          spaceComplexityLevel: "average",
        },
        {
          name: "LCS",
          timeComplexity: "O(mn)",
          spaceComplexity: "O(mn)",
          timeComplexityLevel: "average",
          spaceComplexityLevel: "average",
        },
        {
          name: "LIS",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
      ],
      status: "coming-soon",
      gradient: "from-yellow-500/10 to-orange-500/10",
      borderGradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Greedy Algorithms",
      description: "Learn optimal local choices for global solutions",
      icon: <Workflow className="h-6 w-6 text-red-500" />,
      link: "/algorithms/greedy",
      algorithms: [
        {
          name: "Activity Selection",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "excellent",
        },
        {
          name: "Huffman Coding",
          timeComplexity: "O(n log n)",
          spaceComplexity: "O(n)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
      ],
      status: "coming-soon",
      gradient: "from-red-500/10 to-rose-500/10",
      borderGradient: "from-red-500 to-rose-500",
    },
    {
      title: "Mathematical Algorithms",
      description: "Explore fundamental mathematical computations",
      icon: <Sigma className="h-6 w-6 text-pink-500" />,
      link: "/algorithms/math",
      algorithms: [
        {
          name: "GCD (Euclidean)",
          timeComplexity: "O(log min(a,b))",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "excellent",
          spaceComplexityLevel: "excellent",
        },
        {
          name: "Sieve of Eratosthenes",
          timeComplexity: "O(n log log n)",
          spaceComplexity: "O(n)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "good",
        },
        {
          name: "Prime Factorization",
          timeComplexity: "O(√n)",
          spaceComplexity: "O(1)",
          timeComplexityLevel: "good",
          spaceComplexityLevel: "excellent",
        },
      ],
      status: "coming-soon",
      gradient: "from-pink-500/10 to-purple-500/10",
      borderGradient: "from-pink-500 to-purple-500",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div id="algorithms" className="relative container mx-auto px-4 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-green-400/10 to-teal-400/10 rounded-full blur-2xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Enhanced Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 px-4 py-2 rounded-full mb-6"
        >
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Interactive Learning Modules</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Algorithm{" "}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Categories</span>
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Dive deep into different algorithm categories with interactive visualizations and complexity analysis
        </p>
      </motion.div>

      {/* Enhanced Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            className="group"
          >
            <Card className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-500 overflow-hidden h-full">
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              {/* Animated Border */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${category.borderGradient} opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500`}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              <CardHeader className="relative pb-2">
                <div className="flex justify-between items-start mb-2">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      rotate: 5,
                    }}
                    transition={{ duration: 0.2 }}
                    className="p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors duration-300"
                  >
                    {category.icon}
                  </motion.div>

                  {category.status === "implemented" ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg text-xs">
                        <Sparkles className="h-2.5 w-2.5 mr-1" />
                        Implemented
                      </Badge>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant="outline"
                        className="border-yellow-500 text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20 text-xs"
                      >
                        <Clock className="h-2.5 w-2.5 mr-1" />
                        Coming Soon
                      </Badge>
                    </motion.div>
                  )}
                </div>

                <CardTitle className="relative text-slate-900 dark:text-white text-lg mb-1 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300">
                  {category.title}
                </CardTitle>

                <CardDescription className="relative text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative pb-2 space-y-2">
                {/* Algorithm List with Complexity */}
                <div className="space-y-1.5">
                  {category.algorithms.slice(0, 3).map((algo, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="group/algo"
                    >
                      <div className="flex items-center justify-between p-2 rounded-md bg-slate-50/50 dark:bg-slate-700/30 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                        <span className="font-medium text-xs text-slate-800 dark:text-slate-200">{algo.name}</span>

                        <Badge
                          variant="outline"
                          className={`text-xs font-mono ${getComplexityColor(algo.timeComplexityLevel)} border px-1.5 py-0.5`}
                        >
                          {algo.timeComplexity}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                  {category.algorithms.length > 3 && (
                    <div className="text-center">
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        +{category.algorithms.length - 3} more algorithms
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="relative pt-2">
                {category.status === "implemented" ? (
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="w-full">
                    <Link
                      to={category.link}
                      className={`text-transparent bg-gradient-to-r ${category.borderGradient} bg-clip-text hover:opacity-80 flex items-center text-xs font-medium group/link transition-all duration-300`}
                    >
                      Explore {category.title}
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                        className="ml-2"
                      >
                        <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ) : (
                  <span className="text-slate-500 dark:text-slate-500 text-xs flex items-center">
                    <Clock className="h-3 w-3 mr-2" />
                    Coming soon...
                  </span>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Complexity Legend */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex flex-col items-center gap-4 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Complexity Legend</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Excellent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Good</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Average</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Poor</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Timer className="h-3 w-3" />
              <span>Time Complexity</span>
            </div>
            <div className="flex items-center gap-1">
              <HardDrive className="h-3 w-3" />
              <span>Space Complexity</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-8"
      >
        <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
          <Sparkles className="h-4 w-4" />
          More categories and algorithms coming soon
          <Sparkles className="h-4 w-4" />
        </div>
      </motion.div>
    </div>
  )
}
