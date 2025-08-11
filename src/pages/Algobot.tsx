"use client"

import { useState, useRef, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Copy, MessageCircle, Sparkles, Zap } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function AlgoBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "")

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (question?: string) => {
    const messageContent = question || input.trim()
    if (!messageContent || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Check if API key is available
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error("API key not found. Please check your .env file.")
      }

      console.log("API Key available:", apiKey ? "Yes" : "No")
      
      // Prepare conversation history for context
      const conversationHistory = messages.slice(-6).map(msg => 
        `${msg.role === 'user' ? 'Student' : 'AlgoBot'}: ${msg.content}`
      ).join('\n\n')
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
      const prompt = `You are AlgoBot! 🤖 I'm your friendly coding buddy who's smart about when to chat vs. when to teach!

${conversationHistory ? `What we've talked about before:\n${conversationHistory}\n\n` : ''}

SMART RESPONSE LOGIC:
📚 **Give DETAILED explanations when they ask for:**
- How algorithms work (like "explain binary search", "how does quicksort work")
- Implementation details ("show me code for...", "implement...", "write...")
- Deep concepts ("time complexity", "space complexity", "Big O")
- Problem-solving ("solve this problem", "approach for...", "algorithm for...")
- Learning requests ("teach me", "explain in detail", "walk me through")

💬 **Keep it SHORT and conversational for:**
- Greetings ("hello", "hi", "hey")
- General chat ("how are you", "what's up")
- Simple questions ("what is...", "define...")
- Follow-up acknowledgments ("ok", "thanks", "cool")
- Casual responses

Their message: "${messageContent}"

**ANALYZE THE MESSAGE ABOVE:**
If it's asking for learning/implementation/deep explanation → Give comprehensive response with:
- Clear step-by-step explanation
- Code examples with comments
- Visual diagrams/ASCII art
- Time/space complexity
- Real examples and applications
- Best practices and tips

If it's casual chat/simple question → Keep it short, friendly, and conversational (2-3 sentences max)

Always end with a relevant follow-up question! 😊`

      console.log("Sending request to Gemini API...")
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      console.log("Response received:", text ? "Success" : "Empty response")

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: text,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error calling Gemini API:", error)
      
      let errorMessage = "I apologize, but I'm experiencing technical difficulties. "
      
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage += "The API key is not configured properly. Please check your environment variables."
        } else if (error.message.includes("SAFETY")) {
          errorMessage += "The content was flagged by safety filters. Please try rephrasing your question."
        } else if (error.message.includes("QUOTA_EXCEEDED")) {
          errorMessage += "API quota has been exceeded. Please try again later."
        } else if (error.message.includes("PERMISSION_DENIED")) {
          errorMessage += "Permission denied. Please check your API key permissions."
        } else {
          errorMessage += `Error details: ${error.message}`
        }
      } else {
        errorMessage += "An unexpected error occurred. Please try again."
      }

      const assistantErrorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorMessage,
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantErrorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50 min-h-screen overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-600/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative flex" style={{ height: "calc(100vh - 80px)" }}>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="w-80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-r border-white/20 dark:border-slate-700/50 flex flex-col shadow-2xl shadow-black/10"
            >
              <div className="p-6 border-b border-white/20 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Bot className="w-6 h-6 text-white" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></div>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      AlgoBot
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      DSA Expert
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-b border-white/20 dark:border-slate-700/50">
                <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" />
                  Quick Topics
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "Arrays & Strings", query: "Explain arrays and string algorithms", icon: "📊" },
                    { name: "Linked Lists", query: "How do linked lists work?", icon: "🔗" },
                    { name: "Trees & Graphs", query: "Explain binary trees and graph algorithms", icon: "🌳" },
                    { name: "Sorting Algorithms", query: "Compare different sorting algorithms", icon: "🔄" },
                    { name: "Dynamic Programming", query: "Explain dynamic programming with examples", icon: "⚡" },
                    { name: "Big O Analysis", query: "Explain time and space complexity", icon: "📈" },
                  ].map((topic) => (
                    <motion.button
                      key={topic.name}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSubmit(topic.query)}
                      className="w-full p-3 text-left text-sm bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm rounded-xl transition-all duration-200 border border-white/20 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-700/50 hover:shadow-lg hover:shadow-blue-500/10 group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                          {topic.icon}
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-medium">
                          {topic.name}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 flex flex-col">
          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-b border-white/20 dark:border-slate-700/50 p-4 shadow-lg shadow-black/5">
            <div className="flex items-center justify-between max-w-5xl mx-auto">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/20 dark:border-slate-700/50"
                >
                  <MessageCircle className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </motion.button>
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                      AlgoBot
                    </h1>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Data Structures & Algorithms</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 rounded-full border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-400">Online</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent hover:scrollbar-thumb-slate-400 dark:hover:scrollbar-thumb-slate-500">
            <div className="max-w-5xl mx-auto space-y-6">
              {messages.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  className="text-center py-20"
                >
                  <motion.div
                    className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-blue-500/25"
                    animate={{
                      boxShadow: [
                        "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                        "0 25px 50px -12px rgba(147, 51, 234, 0.25)",
                        "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Bot className="w-10 h-10 text-white" />
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Sparkles className="w-3 h-3 text-white" />
                    </motion.div>
                  </motion.div>

                  <motion.h2
                    className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Hi! I'm AlgoBot
                  </motion.h2>

                  <motion.p
                    className="text-slate-600 dark:text-slate-400 mb-12 max-w-md mx-auto text-lg leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    Ask me anything about data structures, algorithms, or coding concepts.
                  </motion.p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {[
                      { q: "How does binary search work?", icon: "🔍" },
                      { q: "Explain Big O notation", icon: "📊" },
                      { q: "What's the difference between arrays and linked lists?", icon: "🔗" },
                      { q: "How do sorting algorithms compare?", icon: "🔄" },
                    ].map((item, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSubmit(item.q)}
                        className="group p-5 text-left bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 hover:border-blue-200 dark:hover:border-blue-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                            {item.icon}
                          </span>
                          <span className="text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white font-medium leading-relaxed">
                            {item.q}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <>
                  {messages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25"
                          whileHover={{ scale: 1.05 }}
                        >
                          <Bot className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                      <div className={`max-w-4xl ${message.role === "user" ? "order-1" : ""}`}>
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className={`rounded-2xl px-6 py-4 shadow-lg ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white ml-auto shadow-blue-500/25"
                              : "bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 shadow-black/5"
                          }`}
                        >
                          {message.role === "assistant" ? (
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              <ReactMarkdown
                                components={{
                                  code({ node, className, children, ...props }: any) {
                                    const match = /language-(\w+)/.exec(className || "")
                                    const language = match ? match[1] : ""
                                    const isInline = !language && !className

                                    if (!isInline && language) {
                                      return (
                                        <div className="relative my-4 rounded-xl overflow-hidden shadow-lg">
                                          <div className="flex items-center justify-between bg-slate-800 text-slate-200 px-4 py-3 text-sm border-b border-slate-700">
                                            <span className="font-medium">{language.toUpperCase()}</span>
                                            <Button
                                              size="sm"
                                              variant="ghost"
                                              className="h-6 px-2 text-slate-400 hover:text-white hover:bg-slate-700"
                                              onClick={() => navigator.clipboard.writeText(String(children))}
                                            >
                                              <Copy className="h-3 w-3" />
                                            </Button>
                                          </div>
                                          <SyntaxHighlighter
                                            style={oneDark}
                                            language={language}
                                            PreTag="div"
                                            className="!mt-0 !rounded-t-none"
                                          >
                                            {String(children).replace(/\n$/, "")}
                                          </SyntaxHighlighter>
                                        </div>
                                      )
                                    }
                                    return (
                                      <code
                                        className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md text-sm font-mono"
                                        {...props}
                                      >
                                        {children}
                                      </code>
                                    )
                                  },
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-white font-medium">{message.content}</p>
                          )}
                        </motion.div>
                        <div
                          className={`flex items-center gap-2 mt-3 text-xs text-slate-500 dark:text-slate-400 ${
                            message.role === "user" ? "justify-end" : "justify-start"
                          }`}
                        >
                          <span>
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          {message.role === "assistant" && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                              onClick={() => navigator.clipboard.writeText(message.content)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                      {message.role === "user" && (
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25"
                          whileHover={{ scale: 1.05 }}
                        >
                          <User className="w-5 h-5 text-white" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-4 justify-start"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 rounded-2xl px-6 py-4 shadow-lg shadow-black/5">
                        <div className="flex items-center gap-3">
                          <div className="flex space-x-1">
                            <motion.div
                              className="w-2 h-2 bg-blue-500 rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-purple-500 rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                            />
                            <motion.div
                              className="w-2 h-2 bg-indigo-500 rounded-full"
                              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                            />
                          </div>
                          <span className="text-sm text-slate-600 dark:text-slate-400 font-medium">Thinking...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl border-t border-white/20 dark:border-slate-700/50 p-6 shadow-lg shadow-black/5">
            <div className="max-w-5xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="relative"
              >
                <div className="relative">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me about data structures, algorithms, or coding concepts..."
                    disabled={isLoading}
                    className="pr-14 h-14 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-white/20 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-300 dark:focus:border-blue-600 text-base placeholder:text-slate-500 dark:placeholder:text-slate-400 shadow-lg shadow-black/5"
                  />
                  <motion.button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-2 h-10 w-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 transition-all duration-200"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
