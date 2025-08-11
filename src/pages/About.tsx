"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  CheckCircle,
  Sparkles,
  Rocket,
  Palette,
  TrendingUp,
  User,
  Code2,
  Brain,
  Zap,
  Play,
  Moon,
  Layers,
  Target,
  Users,
  Trophy,
} from "lucide-react"
import { motion } from "framer-motion"

const About = () => {
  const features = [
    {
      icon: <Target className="h-5 w-5" />,
      text: "Visualizes Sorting, Searching, Graph, and DP Algorithms",
      color: "text-purple-500",
    },
    {
      icon: <Play className="h-5 w-5" />,
      text: "Step-by-step animations for enhanced understanding",
      color: "text-blue-500",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Interactive controls to play, pause, and reset visualizations",
      color: "text-green-500",
    },
    {
      icon: <Moon className="h-5 w-5" />,
      text: "Dark mode support for a seamless coding experience",
      color: "text-indigo-500",
    },
    {
      icon: <Layers className="h-5 w-5" />,
      text: "User-friendly interface with modern UI components",
      color: "text-pink-500",
    },
  ]

  const futureEnhancements = [
    {
      icon: <Brain className="h-5 w-5" />,
      text: "AI-powered suggestions for next best steps",
      color: "text-purple-500",
    },
    {
      icon: <Palette className="h-5 w-5" />,
      text: "Customizable themes and colors",
      color: "text-blue-500",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      text: "More algorithm visualizations (Trie, AVL Tree, etc.)",
      color: "text-green-500",
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Multiplayer mode for coding competitions",
      color: "text-orange-500",
    },
  ]

  const socialLinks = [
    {
      icon: <Github className="h-6 w-6" />,
      href: "https://github.com/echoabhinav",
      label: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-white",
      bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      icon: <Linkedin className="h-6 w-6" />,
      href: "https://www.linkedin.com/echoabhinav",
      label: "LinkedIn",
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-950",
    },
    {
      icon: <Twitter className="h-6 w-6" />,
      href: "https://x.com/illuslikkt",
      label: "Twitter",
      color: "hover:text-gray-600",
      bgColor: "hover:bg-gray-50 dark:hover:bg-gray-800",
    },
    {
      icon: <Instagram className="h-6 w-6" />,
      href: "https://www.instagram.com/echoabhinav/",
      label: "Instagram",
      color: "hover:text-pink-500",
      bgColor: "hover:bg-pink-50 dark:hover:bg-pink-950",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-2xl"
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)]" />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-4xl mx-auto px-6 py-20"
      >
        {/* Enhanced Header Section */}
        <motion.div variants={cardVariants} className="mb-12">
          <Card className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-0 shadow-2xl">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

            {/* Animated Elements */}
            <motion.div
              className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"
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
              className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"
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

            <CardHeader className="relative text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mx-auto mb-4"
              >
                <Code2 className="h-8 w-8 text-white" />
              </motion.div>
              <CardTitle className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  DSA Visualizer
                </motion.span>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative text-center pb-8">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto"
              >
                An interactive learning tool designed to help students, developers, and professionals grasp complex{" "}
                <span className="font-semibold text-white">Data Structures and Algorithms</span> with real-time
                visualizations and engaging animations.
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Features Section */}
        <motion.div variants={cardVariants} className="mb-12">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Key Features
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 group"
                  >
                    <div className={`${feature.color} group-hover:scale-110 transition-transform duration-200`}>
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className={`${feature.color} group-hover:scale-110 transition-transform duration-200`}>
                      {feature.icon}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Future Enhancements */}
        <motion.div variants={cardVariants} className="mb-12">
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-l-4 border-gradient-to-b from-purple-500 to-pink-500 shadow-xl relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20" />

            <CardHeader className="relative">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                  className="p-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                >
                  <Rocket className="h-6 w-6 text-white" />
                </motion.div>
                <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Future Enhancements
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {futureEnhancements.map((enhancement, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.2 } }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800 transition-all duration-300 group"
                  >
                    <div className={`${enhancement.color} group-hover:scale-110 transition-transform duration-200`}>
                      {enhancement.icon}
                    </div>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{enhancement.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Developer Info */}
        <motion.div variants={cardVariants}>
          <Card className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100 to-transparent dark:from-purple-900/20 rounded-bl-full" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-100 to-transparent dark:from-pink-900/20 rounded-tr-full" />

            <CardHeader className="relative text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                >
                  <User className="h-8 w-8 text-white" />
                </motion.div>
                <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  About the Developer
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="relative text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <p className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">Abhinav Tiwari</p>
                <p className="text-slate-600 dark:text-slate-400">
                  Passionate developer creating interactive learning experiences for the programming community
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex justify-center gap-4"
              >
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="lg"
                      asChild
                      className={`${social.color} ${social.bgColor} transition-all duration-300 rounded-xl shadow-sm hover:shadow-lg`}
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                        {social.icon}
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.div>

              {/* Achievement Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-full border border-yellow-200 dark:border-yellow-800"
              >
                <Trophy className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                  Building the future of algorithm education
                </span>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Start your DSA learning journey today</span>
            <Sparkles className="h-4 w-4" />
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default About
