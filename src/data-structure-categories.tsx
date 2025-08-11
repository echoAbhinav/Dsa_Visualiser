"use client"

import type React from "react"

import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Box,
  Database,
  Layers,
  ListTree,
  GitGraph,
  Hash,
  Grid3X3,
  BinaryIcon as BinaryTree,
  Sparkles,
  Clock,
  Zap,
  Eye,
  Plus,
  Minus,
  Search,
} from "lucide-react"
import { motion } from "framer-motion"

interface Operation {
  name: string
  complexity: string
  complexityLevel: "excellent" | "good" | "average" | "poor"
  icon: React.ReactNode
}

interface DataStructure {
  title: string
  description: string
  icon: React.ReactNode
  link: string
  status: "implemented" | "coming-soon"
  gradient: string
  borderGradient: string
  operations: Operation[]
  useCase: string
}

export default function DataStructureCategories() {
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

  const categories: DataStructure[] = [
    {
      title: "Arrays",
      description: "Explore the fundamental sequential data structure",
      icon: <Box className="h-6 w-6 text-purple-500" />,
      link: "/data-structures/arrays",
      status: "implemented",
      gradient: "from-purple-500/10 to-violet-500/10",
      borderGradient: "from-purple-500 to-violet-500",
      useCase: "Random access, mathematical operations",
      operations: [
        { name: "Access", complexity: "O(1)", complexityLevel: "excellent", icon: <Eye className="h-3 w-3" /> },
        { name: "Insert", complexity: "O(n)", complexityLevel: "average", icon: <Plus className="h-3 w-3" /> },
        { name: "Delete", complexity: "O(n)", complexityLevel: "average", icon: <Minus className="h-3 w-3" /> },
        { name: "Search", complexity: "O(n)", complexityLevel: "average", icon: <Search className="h-3 w-3" /> },
      ],
    },
    {
      title: "Stacks",
      description: "Understand the Last In First Out (LIFO) principle",
      icon: <Layers className="h-6 w-6 text-blue-500" />,
      link: "/data-structures/stacks",
      status: "implemented",
      gradient: "from-blue-500/10 to-cyan-500/10",
      borderGradient: "from-blue-500 to-cyan-500",
      useCase: "Function calls, undo operations, expression parsing",
      operations: [
        { name: "Push", complexity: "O(1)", complexityLevel: "excellent", icon: <Plus className="h-3 w-3" /> },
        { name: "Pop", complexity: "O(1)", complexityLevel: "excellent", icon: <Minus className="h-3 w-3" /> },
        { name: "Peek", complexity: "O(1)", complexityLevel: "excellent", icon: <Eye className="h-3 w-3" /> },
        { name: "Search", complexity: "O(n)", complexityLevel: "average", icon: <Search className="h-3 w-3" /> },
      ],
    },
    {
      title: "Queues",
      description: "Learn about First In First Out (FIFO) operations",
      icon: <Database className="h-6 w-6 text-green-500" />,
      link: "/data-structures/queues",
      status: "implemented",
      gradient: "from-green-500/10 to-emerald-500/10",
      borderGradient: "from-green-500 to-emerald-500",
      useCase: "Task scheduling, breadth-first search, buffering",
      operations: [
        { name: "Enqueue", complexity: "O(1)", complexityLevel: "excellent", icon: <Plus className="h-3 w-3" /> },
        { name: "Dequeue", complexity: "O(1)", complexityLevel: "excellent", icon: <Minus className="h-3 w-3" /> },
        { name: "Peek", complexity: "O(1)", complexityLevel: "excellent", icon: <Eye className="h-3 w-3" /> },
        { name: "Search", complexity: "O(n)", complexityLevel: "average", icon: <Search className="h-3 w-3" /> },
      ],
    },
    {
      title: "Linked Lists",
      description: "Visualize nodes connected via references",
      icon: <ListTree className="h-6 w-6 text-yellow-500" />,
      link: "/data-structures/linked-lists",
      status: "implemented",
      gradient: "from-yellow-500/10 to-amber-500/10",
      borderGradient: "from-yellow-500 to-amber-500",
      useCase: "Dynamic memory allocation, implementation of other structures",
      operations: [
        { name: "Access", complexity: "O(n)", complexityLevel: "average", icon: <Eye className="h-3 w-3" /> },
        { name: "Insert", complexity: "O(1)", complexityLevel: "excellent", icon: <Plus className="h-3 w-3" /> },
        { name: "Delete", complexity: "O(1)", complexityLevel: "excellent", icon: <Minus className="h-3 w-3" /> },
        { name: "Search", complexity: "O(n)", complexityLevel: "average", icon: <Search className="h-3 w-3" /> },
      ],
    },
    {
      title: "Trees",
      description: "Explore hierarchical node-based structures",
      icon: <BinaryTree className="h-6 w-6 text-red-500" />,
      link: "/data-structures/trees",
      status: "coming-soon",
      gradient: "from-red-500/10 to-rose-500/10",
      borderGradient: "from-red-500 to-rose-500",
      useCase: "Hierarchical data, searching, sorting, decision making",
      operations: [
        { name: "Access", complexity: "O(log n)", complexityLevel: "good", icon: <Eye className="h-3 w-3" /> },
        { name: "Insert", complexity: "O(log n)", complexityLevel: "good", icon: <Plus className="h-3 w-3" /> },
        { name: "Delete", complexity: "O(log n)", complexityLevel: "good", icon: <Minus className="h-3 w-3" /> },
        { name: "Search", complexity: "O(log n)", complexityLevel: "good", icon: <Search className="h-3 w-3" /> },
      ],
    },
    {
      title: "Graphs",
      description: "Understand networks of nodes and edges",
      icon: <GitGraph className="h-6 w-6 text-pink-500" />,
      link: "/data-structures/graphs",
      status: "coming-soon",
      gradient: "from-pink-500/10 to-rose-500/10",
      borderGradient: "from-pink-500 to-rose-500",
      useCase: "Social networks, maps, dependencies, recommendations",
      operations: [
        { name: "Add Vertex", complexity: "O(1)", complexityLevel: "excellent", icon: <Plus className="h-3 w-3" /> },
        { name: "Add Edge", complexity: "O(1)", complexityLevel: "excellent", icon: <Plus className="h-3 w-3" /> },
        {
          name: "Remove Vertex",
          complexity: "O(V+E)",
          complexityLevel: "average",
          icon: <Minus className="h-3 w-3" />,
        },
        { name: "Search", complexity: "O(V+E)", complexityLevel: "average", icon: <Search className="h-3 w-3" /> },
      ],
    },
    {
      title: "Hash Tables",
      description: "Learn key-value mappings with efficient lookups",
      icon: <Hash className="h-6 w-6 text-indigo-500" />,
      link: "/data-structures/hash-tables",
      status: "coming-soon",
      gradient: "from-indigo-500/10 to-purple-500/10",
      borderGradient: "from-indigo-500 to-purple-500",
      useCase: "Caching, databases, unique data storage, fast lookups",
      operations: [
        { name: "Access", complexity: "O(1)", complexityLevel: "excellent", icon: <Eye className="h-3 w-3" /> },
        { name: "Insert", complexity: "O(1)", complexityLevel: "excellent", icon: <Plus className="h-3 w-3" /> },
        { name: "Delete", complexity: "O(1)", complexityLevel: "excellent", icon: <Minus className="h-3 w-3" /> },
        { name: "Search", complexity: "O(1)", complexityLevel: "excellent", icon: <Search className="h-3 w-3" /> },
      ],
    },
    {
      title: "Heaps",
      description: "Visualize specialized tree-based priority structures",
      icon: <Grid3X3 className="h-6 w-6 text-orange-500" />,
      link: "/data-structures/heaps",
      status: "coming-soon",
      gradient: "from-orange-500/10 to-red-500/10",
      borderGradient: "from-orange-500 to-red-500",
      useCase: "Priority queues, heap sort, scheduling algorithms",
      operations: [
        { name: "Insert", complexity: "O(log n)", complexityLevel: "good", icon: <Plus className="h-3 w-3" /> },
        { name: "Delete", complexity: "O(log n)", complexityLevel: "good", icon: <Minus className="h-3 w-3" /> },
        { name: "Peek", complexity: "O(1)", complexityLevel: "excellent", icon: <Eye className="h-3 w-3" /> },
        { name: "Build", complexity: "O(n)", complexityLevel: "good", icon: <Zap className="h-3 w-3" /> },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
    <div className="relative container mx-auto px-4 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-32 h-32 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:48px_48px] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]" />

      {/* Enhanced Title Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 px-4 py-2 rounded-full mb-6"
        >
          <Database className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Fundamental Building Blocks</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          Data Structure{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Categories</span>
        </h2>

        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Master the fundamental data structures that power modern computing with interactive visualizations and
          complexity analysis
        </p>
      </motion.div>

      {/* Enhanced Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
      >
        {categories.map((category, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              y: -12,
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
                className={`absolute inset-0 bg-gradient-to-r ${category.borderGradient} opacity-0 group-hover:opacity-15 blur-sm transition-opacity duration-500`}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              <CardHeader className="relative pb-3">
                <div className="flex justify-between items-start mb-4">
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 10,
                    }}
                    transition={{ duration: 0.2 }}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors duration-300 shadow-sm"
                  >
                    {category.icon}
                  </motion.div>

                  {category.status === "implemented" ? (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Ready
                      </Badge>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Badge
                        variant="outline"
                        className="border-yellow-500 text-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
                      >
                        <Clock className="h-3 w-3 mr-1" />
                        Soon
                      </Badge>
                    </motion.div>
                  )}
                </div>

                <CardTitle className="relative text-slate-900 dark:text-white text-lg mb-2 group-hover:text-slate-800 dark:group-hover:text-white transition-colors duration-300">
                  {category.title}
                </CardTitle>

                <CardDescription className="relative text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-300 text-sm">
                  {category.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="relative pb-3 space-y-3">
                {/* Use Case */}
                <div className="p-2 rounded-lg bg-slate-50/50 dark:bg-slate-700/30">
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">Common Use Cases:</p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">{category.useCase}</p>
                </div>

                {/* Operations with Complexity */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Key Operations:</p>
                  <div className="grid grid-cols-2 gap-1">
                    {category.operations.map((operation, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="group/op"
                      >
                        <div className="flex flex-col gap-1 p-2 rounded-md bg-slate-50/50 dark:bg-slate-700/30 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors duration-200">
                          <div className="flex items-center gap-1">
                            {operation.icon}
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                              {operation.name}
                            </span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs font-mono ${getComplexityColor(operation.complexityLevel)} border-0 h-5`}
                          >
                            {operation.complexity}
                          </Badge>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="relative pt-2">
                {category.status === "implemented" ? (
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }} className="w-full">
                    <Link
                      to={category.link}
                      className={`text-transparent bg-gradient-to-r ${category.borderGradient} bg-clip-text hover:opacity-80 flex items-center text-sm font-medium group/link transition-all duration-300`}
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
                        <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ) : (
                  <span className="text-slate-500 dark:text-slate-500 text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
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
        className="mt-16 text-center relative z-10"
      >
        <div className="inline-flex flex-col items-center gap-4 p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Operation Complexity Guide</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Excellent - O(1), O(log n)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Good - O(n), O(n log n)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Average - O(n²), O(V+E)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Poor - O(2^n), O(n!)</span>
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
        className="text-center mt-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
          <Sparkles className="h-4 w-4" />
          Build your foundation with these essential data structures
          <Sparkles className="h-4 w-4" />
        </div>
      </motion.div>
    </div>
  )
}
