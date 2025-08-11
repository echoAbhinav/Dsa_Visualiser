"use client"

import { Link, useLocation } from "react-router"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Menu,
  X,
  ChevronDown,
  BarChart3,
  Search,
  Network,
  GitBranch,
  Info,
  Sun,
  Moon,
  Box,
  Layers,
  Database,
  ListTree,
  Bot,
  Car,
  Code2,
  Sparkles,
} from "lucide-react"
import { Toaster, toast } from "sonner"
import { ThemeProvider } from "./context/theme"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const showComingSoonToast = () => {
    toast.success("Coming Soon!", {
      icon: <Info className="h-5 w-5 text-blue-500" />,
      duration: 2500,
      style: {
        borderRadius: "12px",
        border: "1px solid rgba(59, 130, 246, 0.5)",
        background: "white",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "12px",
        fontWeight: "500",
      },
    })
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light")
    document.documentElement.classList.add(theme)
  }, [theme])

  const algorithmItems = [
    {
      to: "/algorithms/sorting",
      icon: <BarChart3 className="h-4 w-4 text-purple-500" />,
      label: "Sorting",
      available: true,
    },
    {
      to: "/algorithms/searching",
      icon: <Search className="h-4 w-4 text-blue-500" />,
      label: "Searching",
      available: true,
    },
    {
      to: "#",
      icon: <Network className="h-4 w-4 text-green-500" />,
      label: "Graph",
      available: false,
    },
    {
      to: "#",
      icon: <GitBranch className="h-4 w-4 text-yellow-500" />,
      label: "Dynamic Programming",
      available: false,
    },
  ]

  const dataStructureItems = [
    {
      to: "/data-structures/arrays",
      icon: <Box className="h-4 w-4 text-purple-500" />,
      label: "Arrays",
      available: true,
    },
    {
      to: "/data-structures/stacks",
      icon: <Layers className="h-4 w-4 text-blue-500" />,
      label: "Stacks",
      available: true,
    },
    {
      to: "/data-structures/queues",
      icon: <Database className="h-4 w-4 text-green-500" />,
      label: "Queues",
      available: true,
    },
    {
      to: "/data-structures/linked-lists",
      icon: <ListTree className="h-4 w-4 text-yellow-500" />,
      label: "Linked Lists",
      available: true,
    },
  ]

  return (
    <>
      <ThemeProvider
        value={{
          themeMode: theme,
          darkTheme: () => setTheme("dark"),
          lightTheme: () => setTheme("light"),
        }}
      >
        <Toaster position="top-center" richColors closeButton />
        <motion.nav
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-200/50 dark:border-slate-700/50"
              : "bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
                <Link to="/" className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg"
                  >
                    <Code2 className="h-5 w-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    DSA Visualizer
                  </span>
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1">
                {/* Algo Bot */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/Algobot"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 font-medium"
                  >
                    <Bot className="h-4 w-4 text-blue-500" />
                    Algo Bot
                  </Link>
                </motion.div>

                {/* Race Mode */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/race"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 font-medium"
                  >
                    <Car className="h-4 w-4 text-yellow-500" />
                    Race Mode
                  </Link>
                </motion.div>

                {/* Algorithms Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                      >
                        <BarChart3 className="h-4 w-4 text-purple-500" />
                        Algorithms
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2">
                    {algorithmItems.map((item, index) => (
                      <DropdownMenuItem key={index} className="p-0 focus:bg-transparent">
                        {item.available ? (
                          <Link
                            to={item.to}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                          >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        ) : (
                          <button
                            onClick={showComingSoonToast}
                            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-left"
                          >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                            <Sparkles className="h-3 w-3 text-amber-500 ml-auto" />
                          </button>
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Data Structures Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                      >
                        <Database className="h-4 w-4 text-blue-500" />
                        Data Structures
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl p-2">
                    {dataStructureItems.map((item, index) => (
                      <DropdownMenuItem key={index} className="p-0 focus:bg-transparent">
                        <Link
                          to={item.to}
                          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                        >
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* About */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/about"
                    className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 font-medium"
                  >
                    About
                  </Link>
                </motion.div>

                {/* Theme Toggle */}
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="ml-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  >
                    <AnimatePresence mode="wait">
                      {theme === "dark" ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-2">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <AnimatePresence mode="wait">
                      {theme === "dark" ? (
                        <motion.div
                          key="sun"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Sun className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="moon"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Moon className="h-4 w-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMenu}
                  className="p-2 rounded-lg text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                >
                  <AnimatePresence mode="wait">
                    {isOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-6 w-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-6 w-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Enhanced Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-700 shadow-lg"
              >
                <div className="px-4 py-6 space-y-4">
                  {/* Algo Bot */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Link
                      to="/Algobot"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Bot className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Algo Bot</span>
                    </Link>
                  </motion.div>

                  {/* Race Mode */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                  >
                    <Link
                      to="/race"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Car className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Race Mode</span>
                    </Link>
                  </motion.div>

                  {/* Algorithms Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold">
                      <BarChart3 className="h-5 w-5 text-purple-500" />
                      Algorithms
                    </div>
                    <div className="pl-8 space-y-1">
                      {algorithmItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.25 + index * 0.05 }}
                        >
                          {item.available ? (
                            <Link
                              to={item.to}
                              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {item.icon}
                              <span className="text-sm font-medium">{item.label}</span>
                            </Link>
                          ) : (
                            <button
                              onClick={() => {
                                showComingSoonToast()
                                setIsOpen(false)
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 text-left"
                            >
                              {item.icon}
                              <span className="text-sm font-medium">{item.label}</span>
                              <Sparkles className="h-3 w-3 text-amber-500 ml-auto" />
                            </button>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Data Structures Section */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 font-semibold">
                      <Database className="h-5 w-5 text-blue-500" />
                      Data Structures
                    </div>
                    <div className="pl-8 space-y-1">
                      {dataStructureItems.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: 0.35 + index * 0.05 }}
                        >
                          <Link
                            to={item.to}
                            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                            onClick={() => setIsOpen(false)}
                          >
                            {item.icon}
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* About */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                  >
                    <Link
                      to="/about"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      <Info className="h-5 w-5 text-slate-500" />
                      <span className="font-medium">About</span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </ThemeProvider>
    </>
  )
}
