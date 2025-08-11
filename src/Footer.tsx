"use client"

import type React from "react"

import { Info, Mail, Github, Linkedin, Twitter, Instagram, Heart } from "lucide-react"
import { toast } from "sonner"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { motion } from "framer-motion"

export default function Footer() {
  const showComingSoonToast = (event: React.MouseEvent) => {
    event.preventDefault()
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

  const socialLinks = [
    {
      icon: <Github className="h-4 w-4" />,
      href: "https://github.com/echoabhinav",
      label: "GitHub",
      color: "hover:text-gray-800 dark:hover:text-white",
    },
    {
      icon: <Linkedin className="h-4 w-4" />,
      href: "https://www.linkedin.com/in/echoabhinav/",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: <Twitter className="h-4 w-4" />,
      href: "https://x.com/illuslikkt",
      label: "Twitter",
      color: "hover:text-gray-600",
    },
    {
      icon: <Instagram className="h-4 w-4" />,
      href: "https://www.instagram.com/echoabhinav/",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left - Developer Info */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
            <span>Developed with</span>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <Heart className="h-4 w-4 text-red-500 fill-current" />
            </motion.div>
            <span>
              by <strong className="text-slate-800 dark:text-slate-200">Abhinav Tiwari</strong>
            </span>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6 text-sm">
            <a
              href="https://github.com/echoabhinav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              GitHub
            </a>
            <button
              onClick={showComingSoonToast}
              className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
            >
              Documentation
            </button>

            {/* Contact Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                  Contact
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-500" />
                    Contact Me
                  </DialogTitle>
                  <DialogDescription className="text-slate-600 dark:text-slate-400">
                    Connect with <strong>Abhinav Tiwari</strong>
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-3 mt-4">
                  <a
                    href="mailto:abhinavt00001@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    <Mail className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">abhinavt00001@gmail.com</span>
                  </a>

                  <div className="grid grid-cols-2 gap-2">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200 ${social.color}`}
                      >
                        {social.icon}
                        <span className="text-sm">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg bg-slate-100 dark:bg-slate-800 ${social.color} transition-colors duration-200`}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
