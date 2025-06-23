"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Send, Bot, User, Github, Linkedin, Mail, MapPin, Briefcase } from "lucide-react"
import { useChat } from "ai/react"

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <Avatar className="w-32 h-32 mx-auto border-4 border-white shadow-xl">
              <AvatarImage src="/placeholder.svg?height=128&width=128" alt={personalInfo.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {personalInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{personalInfo.name}</h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">{personalInfo.title}</p>

          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-6">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              {personalInfo.experience}
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <a href={personalInfo.social.github} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </a>
            <a href={personalInfo.social.linkedin} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
            </a>
            <a href={`mailto:${personalInfo.email}`} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="bg-white hover:bg-slate-50">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-full p-1 shadow-lg">
            <Button
              variant={activeSection === "chat" ? "default" : "ghost"}
              onClick={() => setActiveSection("chat")}
              className="rounded-full px-6"
            >
              <Bot className="w-4 h-4 mr-2" />
              Ask Me Anything
            </Button>
            <Button
              variant={activeSection === "about" ? "default" : "ghost"}
              onClick={() => setActiveSection("about")}
              className="rounded-full px-6"
            >
              About
            </Button>
            <Button
              variant={activeSection === "skills" ? "default" : "ghost"}
              onClick={() => setActiveSection("skills")}
              className="rounded-full px-6"
            >
              Skills
            </Button>
          </div>
        </div>

        {/* Content Sections */}
        {activeSection === "chat" && (
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <Bot className="w-4 h-4" />
                  AI Assistant
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ask Anything About Me</h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Get instant answers about my background, projects, and experience
                </p>
              </div>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {messages.length === 0 && (
                  <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-slate-700 dark:text-slate-300">
                          Hi! I'm Junhui's AI assistant. Ask me anything about his background in data science, AI
                          projects, education, or experience!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`rounded-full p-2 ${message.role === "user" ? "bg-slate-200 dark:bg-slate-600" : "bg-gradient-to-r from-blue-500 to-purple-600"}`}
                    >
                      {message.role === "user" ? (
                        <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white"
                          : "bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-2">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              <div className="mb-6">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs bg-white hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeSection === "about" && (
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About Me</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6">{personalInfo.bio}</p>
              <Separator className="my-6" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Contact</h3>
                  <div className="space-y-2 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {personalInfo.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {personalInfo.location}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Experience</h3>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Briefcase className="w-4 h-4" />
                    {personalInfo.experience} in software development
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {activeSection === "skills" && (
          <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Technical Skills</h2>
              <div className="flex flex-wrap gap-3">
                {personalInfo.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
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
