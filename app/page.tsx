"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { Send, Bot, User, Github, Linkedin, Mail, MapPin, Briefcase, Sparkles, Star, Zap } from "lucide-react"
import { useChat } from "ai/react"
import { MarkdownRenderer } from "@/components/markdown-renderer"

const suggestedQuestions = [
  "Tell me about your education",
  "What projects have you worked on?",
  "What's your experience with AI?",
  "What are your technical skills?",
  "Tell me about VetLLM",
  "What are you currently working on?",
]

const personalInfo = {
  name: "Junhui Huang",
  title: "Data Scientist & ML Engineer",
  location: "Providence, RI",
  experience: "AI/ML Specialist",
  email: "junhui_huang@brown.edu",
  bio: "Data Scientist and ML Engineer with expertise in healthcare AI and large language models. Currently pursuing Master's in Data Science at Brown University.",
  skills: [
    "Python",
    "A/B Testing",
    "SQL",
    "Databricks",
    "PySpark",
    "PyTorch",
    "HuggingFace",
    "TensorFlow",
    "LangChain",
    "Next.js",
    "FastAPI",
    "GCP",
    "AWS",
    "Vercel",
  ],
  social: {
    github: "https://github.com/huang-0505",
    linkedin: "https://www.linkedin.com/in/junhui-huang-816946179/",
    website: "https://huangjunhui.dev",
  },
}

// Floating particles component
const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-20 dark:opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        >
          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-300 dark:to-purple-300 rounded-full blur-sm" />
        </div>
      ))}
    </div>
  )
}

export default function PersonalWebsite() {
  const [activeSection, setActiveSection] = useState("chat")
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isLoading])

  const handleSuggestedQuestion = (question: string) => {
    handleInputChange({ target: { value: question } } as any)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20 relative overflow-hidden transition-all duration-700">
      <FloatingParticles />
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-400/30 to-pink-400/30 dark:from-purple-500/20 dark:to-pink-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400/30 to-blue-400/30 dark:from-pink-500/20 dark:to-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl animate-blob animation-delay-4000"></div>
      <ThemeToggle />

      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="relative inline-block mb-6 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
            <div className="relative w-32 h-32 mx-auto border-4 border-white dark:border-slate-700 shadow-2xl transition-transform duration-300 group-hover:scale-105 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
              <img
                src="/profile.jpg"
                alt={personalInfo.name}
                className="w-full h-full object-cover object-center"
                style={{
                  imageRendering: "-webkit-optimize-contrast",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
                }}
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-green-400 to-emerald-500 w-8 h-8 rounded-full border-4 border-white dark:border-slate-700 animate-pulse shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-ping"></div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2 animate-gradient-x">
              {personalInfo.name}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400 animate-spin-slow" />
              <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">{personalInfo.title}</p>
              <Sparkles className="w-5 h-5 text-blue-500 dark:text-blue-400 animate-spin-slow" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
              <MapPin className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              {personalInfo.location}
            </div>
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
              <Briefcase className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              {personalInfo.experience}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border-2 hover:border-slate-300 dark:hover:border-slate-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                GitHub
              </Button>
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border-2 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Linkedin className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                LinkedIn
              </Button>
            </a>
            <a href={`mailto:${personalInfo.email}`} target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm border-2 hover:border-purple-300 dark:hover:border-purple-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
              >
                <Mail className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                Contact
              </Button>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8 animate-fade-in-up animation-delay-200">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-full p-1 shadow-2xl border border-white/20 dark:border-slate-700/50">
            <Button
              variant={activeSection === "chat" ? "default" : "ghost"}
              onClick={() => setActiveSection("chat")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeSection === "chat"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "hover:bg-white/50 dark:hover:bg-slate-700/50"
              }`}
            >
              <Bot className="w-4 h-4 mr-2" />
              Ask Me Anything
            </Button>
            <Button
              variant={activeSection === "about" ? "default" : "ghost"}
              onClick={() => setActiveSection("about")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeSection === "about"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "hover:bg-white/50 dark:hover:bg-slate-700/50"
              }`}
            >
              About
            </Button>
            <Button
              variant={activeSection === "skills" ? "default" : "ghost"}
              onClick={() => setActiveSection("skills")}
              className={`rounded-full px-6 transition-all duration-300 ${
                activeSection === "skills"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "hover:bg-white/50 dark:hover:bg-slate-700/50"
              }`}
            >
              Skills
            </Button>
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === "chat" && (
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg animate-fade-in-up animation-delay-300 hover:shadow-3xl transition-all duration-500">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Bot className="w-5 h-5 animate-pulse" />
                  <Zap className="w-4 h-4" />
                  AI Assistant
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-3">
                  Ask Anything About Me
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  Get instant answers about my background, projects, and experience
                </p>
              </div>

              {/* Chat Messages */}
              <div className="space-y-6 mb-8 max-h-96 overflow-y-auto custom-scrollbar">
                {messages.length === 0 && (
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-6 shadow-lg animate-fade-in">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 shadow-lg">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
                          <MarkdownRenderer content="Hi! I'm Junhui's AI assistant. Ask me anything about his background in data science, AI projects, education, or experience!" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-4 animate-fade-in-up ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`rounded-full p-3 shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-500"
                          : "bg-gradient-to-r from-blue-500 to-purple-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-900 dark:text-white"
                          : "bg-gradient-to-r from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <div className="leading-relaxed">
                        <MarkdownRenderer content={message.content} />
                      </div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-4 animate-fade-in">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-3 shadow-lg">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-white to-slate-50 dark:from-slate-700 dark:to-slate-600 rounded-2xl p-4 shadow-lg">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-3 h-3 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="mb-8">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 font-medium">Try asking:</p>
                <div className="flex flex-wrap gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600 backdrop-blur-sm border-2 hover:border-blue-300 dark:hover:border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/80 dark:bg-slate-700/80 backdrop-blur-sm border-2 border-slate-200 dark:border-slate-600 rounded-xl shadow-lg focus:shadow-xl transition-all duration-300 text-base py-3"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 py-3 rounded-xl"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeSection === "about" && (
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg animate-fade-in-up animation-delay-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  About Me
                </h2>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-8 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl shadow-lg">
                {personalInfo.bio}
              </p>
              <Separator className="my-8 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent" />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl shadow-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">Contact</h3>
                  <div className="space-y-3 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                      {personalInfo.email}
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-700/50 dark:to-slate-600/50 p-6 rounded-2xl shadow-lg">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4 text-xl">Experience</h3>
                  <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                    <Briefcase className="w-5 h-5 text-green-500 dark:text-green-400" />
                    {personalInfo.experience} in software development
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "skills" && (
          <Card className="shadow-2xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg animate-fade-in-up animation-delay-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-8">
                <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Technical Skills
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {personalInfo.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-6 py-3 text-sm bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 text-slate-700 dark:text-slate-300 border-2 border-white/50 dark:border-slate-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
