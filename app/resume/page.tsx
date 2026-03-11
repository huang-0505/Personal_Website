"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, FileText, Mail, Phone, Globe, Github, Linkedin, Upload, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"

export default function ResumePage() {
  const [pdfExists, setPdfExists] = useState(false)
  const [viewMode, setViewMode] = useState<"html" | "pdf">("html")
  const resumeHref = "/resume.pdf"

  // Check if PDF exists
  useEffect(() => {
    const checkPDF = async () => {
      try {
        const response = await fetch(resumeHref, { method: "HEAD" })
        setPdfExists(response.ok)
        if (response.ok) {
          setViewMode("pdf") // Default to PDF view if it exists
        }
      } catch {
        setPdfExists(false)
      }
    }
    checkPDF()
  }, [])

  const handleDownloadPDF = () => {
    if (!pdfExists) {
      alert("PDF file not found. Please add your resume.pdf file to the public folder.")
      return
    }
    const link = document.createElement("a")
    link.href = resumeHref
    link.download = "Junhui_Huang_MLE_Resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-purple-600 dark:text-purple-300" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Resume
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {pdfExists && (
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-full p-1 shadow-lg border border-white/20 dark:border-slate-700/50">
                <Button
                  variant={viewMode === "html" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("html")}
                  className={`rounded-full px-4 transition-all duration-300 ${
                    viewMode === "html"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "hover:bg-white/50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  HTML
                </Button>
                <Button
                  variant={viewMode === "pdf" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("pdf")}
                  className={`rounded-full px-4 transition-all duration-300 ${
                    viewMode === "pdf"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "hover:bg-white/50 dark:hover:bg-slate-700/50"
                  }`}
                >
                  PDF
                </Button>
              </div>
            )}

            {pdfExists ? (
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="border-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            ) : (
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="border-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Print as PDF
              </Button>
            )}

            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        <Card className="border-0 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg shadow-2xl print:shadow-none print:bg-white">
          <CardContent className="p-0">
            {!pdfExists && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-4 mb-6 mx-8 mt-8 rounded-r-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-3" />
                  <div>
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>PDF not found:</strong> Add your resume.pdf file to the public folder to enable PDF
                      viewing and downloading.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {pdfExists && viewMode === "pdf" ? (
              // PDF Viewer
              <div className="w-full h-[85vh] relative">
                <iframe
                  src={`${resumeHref}#view=FitH&toolbar=1&navpanes=0&scrollbar=1`}
                  className="w-full h-full rounded-2xl border-0"
                  title="Junhui Huang Resume PDF"
                  style={{
                    minHeight: "600px",
                  }}
                />
              </div>
            ) : (
              // HTML View
              <div className="p-8 print:p-6">
                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Junhui Huang</h1>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <a href="mailto:junhui_huang@brown.edu" className="hover:text-blue-600 dark:hover:text-blue-400">
                        junhui_huang@brown.edu
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      <a href="https://huangjunhui.dev" className="hover:text-blue-600 dark:hover:text-blue-400">
                        Personal Website
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Linkedin className="w-4 h-4" />
                      <a
                        href="https://www.linkedin.com/in/junhui-huang-816946179/"
                        className="hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        LinkedIn
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Github className="w-4 h-4" />
                      <a href="https://github.com/huang-0505" className="hover:text-blue-600 dark:hover:text-blue-400">
                        GitHub
                      </a>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span>862-242-6056</span>
                    </div>
                  </div>
                </div>

                <Separator className="mb-8" />

                {/* Summary */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    SUMMARY
                  </h2>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300">
                    <p>
                      • AI Engineer and Data Scientist with 1+ years of experience building traditional ML models & GenAI
                      solutions. Skilled in leading through fast pacing SDLC, from architecting scalable data pipelines
                      to deploying and optimizing large-scale models.
                    </p>
                    <p>
                      • Experience with architecting scalable data curation pipelines (ETL), fine-tuning Transformer-based
                      models (LoRA) and optimizing for high-throughput, low-latency deployment (vLLM, TensorRT)
                    </p>
                    <p>
                      • Excels at translating complex technical insights to diverse stakeholders, fostering
                      cross-functional collaboration in Agile environments to ensure the successful delivery of
                      scalable, cloud-native (GCP, AWS) analytics products.
                    </p>
                  </div>
                </section>

                <Separator className="mb-8" />

                {/* Education */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    EDUCATION
                  </h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Brown University</h3>
                        <p className="text-slate-700 dark:text-slate-300">M.S. Data Science</p>
                      </div>
                      <div className="text-right text-slate-600 dark:text-slate-400">
                        <p>Providence, RI</p>
                        <p>Expected May 2026</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Columbia University</h3>
                        <p className="text-slate-700 dark:text-slate-300">B.S. Applied Mathematics</p>
                      </div>
                      <div className="text-right text-slate-600 dark:text-slate-400">
                        <p>New York, NY</p>
                        <p>Sep 2020 - May 2022</p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="mb-8" />

                {/* Skills */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    SKILLS
                  </h2>
                  <div className="space-y-3 text-slate-700 dark:text-slate-300">
                    <p>
                      <strong>Data Science and GenAI:</strong> Natural Language Processing, Hugging Face Transformers,
                      LangChain, RAG, LoRA
                    </p>
                    <p>
                      <strong>Modeling & Statistics:</strong> regression, A/B testing, statistical inference,
                      clustering, classification, data mining
                    </p>
                    <p>
                      <strong>Programming:</strong> Python (Numpy, Pandas, PyTorch, Scikit-learn), C++, Java, R, SQL,
                      Spark, Unix/Linux
                    </p>
                    <p>
                      <strong>MLOps & Production:</strong> GCP, AWS, vLLM, SGLang, TensorRT, ONNX, FastAPI, Kubernetes,
                      Docker, Git, CI/CD
                    </p>
                  </div>
                </section>

                <Separator className="mb-8" />

                {/* Experience */}
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    RELEVANT EXPERIENCE
                  </h2>

                  <div className="space-y-8">
                    {/* Harvard - MLOps & LLMOps */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            MLOps & LLMOps – Production AI systems
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">Harvard University</p>
                        </div>
                        <div className="text-right text-slate-600 dark:text-slate-400">
                          <p>Sept 2025 – Dec 2025</p>
                          <p>Providence, RI</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-700 dark:text-slate-300">
                        <p>
                          • Designed and deployed a distributed multi-agent AI system using FastAPI microservices, Docker
                          and Nginx, orchestrating LLM-driven narrative, rule validation and combat reasoning for
                          complex, real-time interactive gameplay.
                        </p>
                        <p>
                          • Built scalable data pipelines for rulebook preprocessing, semantic text splitting and RAG
                          retrieval using ChromaDB; implemented model evaluation and iterative optimization to improve
                          intent detection and narrative quality.
                        </p>
                        <p>
                          • Engineered a tree-based game-state machine integrating multi-modal user signals, enabling
                          end-to-end ML workflows, recommendation-like decisioning and robust state tracking across
                          narrative, combat and exploration modes.
                        </p>
                        <p>
                          • Developed a full-stack AI product with Next.js, TypeScript and Tailwind, collaborating across
                          engineering and design workflows; delivered analytics tooling for gameplay insights, model
                          debugging and data-driven iteration.
                        </p>
                        <p>
                          • Fine-tuned LLM against 38k unstructured Q&A dataset on Google Cloud Vertex AI, applying
                          NLP, model training and agile experimentation techniques to enhance story generation, rule
                          adherence and harmful-content detection.
                        </p>
                      </div>
                    </div>

                    {/* Onawa Pet */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Machine Learning Engineer Intern – Veterinary LLM Development
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">Onawa Pet</p>
                        </div>
                        <div className="text-right text-slate-600 dark:text-slate-400">
                          <p>May 2025 – Aug 2025</p>
                          <p>Providence, RI</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-700 dark:text-slate-300">
                        <p>
                          • Built a scalable data curation pipeline with deduplication, automated labeling and
                          domain-specific parsing, reduced manual preparation by 30% and generating a high-quality
                          proprietary dataset in a PostgreSQL backend.
                        </p>
                        <p>
                          • Fine-tuned a VetLLM using Hugging Face Transformers and LoRA on H100 GPUs, improving QA
                          accuracy by 18% and validating expert-level performance through an LLM-as-a-Judge evaluation
                          framework.
                        </p>
                        <p>
                          • Developed a comprehensive multi-dimensional evaluation platform and custom VetAI Leaderboard
                          to benchmark model accuracy, robustness and safety, consistently outperforming industry
                          baselines (Gemma-7B & LLaMA-3.1-8B).
                        </p>
                        <p>
                          • Designed and executed large-scale training and experimentation workflows using distributed
                          data loaders and GPU-accelerated pipelines, enabling rapid model iteration, automated
                          hyperparameter tuning and reproducible end-to-end ML experiments across multiple environments.
                        </p>
                      </div>
                    </div>

                    {/* EcoForge */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Data Scientist – Forecasting and Optimization
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">EcoForge</p>
                        </div>
                        <div className="text-right text-slate-600 dark:text-slate-400">
                          <p>Aug 2023 – Aug 2024</p>
                          <p>Somerville, MA</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-700 dark:text-slate-300">
                        <p>
                          • Developed success metrics and forecasting analysis to monitor material performance trends;
                          built an ML pipeline to predict cement compressive strength to optimize carbon reduction and
                          deliver $2M annual savings.
                        </p>
                        <p>
                          • Led hands-on development of scalable ML models (XGBoost) across large, complex datasets,
                          driving feature engineering, model tuning and analytical validation to significantly outperform
                          distance-based benchmarks.
                        </p>
                        <p>
                          • Designed and executed A/B and causal impact experiments to evaluate model-recommended
                          formulation changes, ensuring statistical significance, lift attribution accuracy and
                          business readiness before global rollout.
                        </p>
                        <p>
                          • Applied physics-informed neural networks, transfer learning, and advanced regularization to
                          improve model robustness under sparse or noisy data, enhancing generalization across
                          production environments.
                        </p>
                        <p>
                          • Conducted deep-dive analyses and cost–benefit evaluations, partnering with Product,
                          Engineering, and Operations to translate quantitative insights into pricing, efficiency and
                          sustainability decisions supported by Tableau dashboards.
                        </p>
                      </div>
                    </div>

                    {/* Lifespan Health System - from DS resume */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Healthcare Data Scientist Intern – Medical Image Modelling
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">Lifespan Health System</p>
                        </div>
                        <div className="text-right text-slate-600 dark:text-slate-400">
                          <p>Jan 2025 – Apr 2025</p>
                          <p>Providence, RI</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-700 dark:text-slate-300">
                        <p>
                          • Developed scalable ETL and preprocessing pipelines across eight MRI modalities, applying
                          adaptive tissue-mask cropping, modality-specific normalization and denoising to ensure
                          consistent, high-quality model inputs at scale.
                        </p>
                        <p>
                          • Built multi-modal brain tumor segmentation models via U-Net and Transformer-based TransUNet
                          on UCSF's MRI dataset, improving tumor localization accuracy by 17%, enabled more reliable
                          clinical decision support.
                        </p>
                        <p>
                          • Designed an evaluation framework using Dice coefficient–based metrics to standardize
                          performance benchmarking, guide model iteration and quantify improvements for clinical
                          deployment requirements.
                        </p>
                        <p>
                          • Created performance monitoring dashboards and collaborated with radiologists to incorporate
                          qualitative feedback, refining model outputs and deriving actionable insights to strengthen
                          clinical validation workflows.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </CardContent>
        </Card>

        {!pdfExists && (
          <div className="mt-6">
            <Card className="border-0 bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-lg shadow-lg">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Add Your PDF Resume</h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      To enable PDF viewing and downloading, add your resume file to the project:
                    </p>
                  </div>
                  <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-lg text-left max-w-md mx-auto">
                    <ol className="text-sm text-slate-700 dark:text-slate-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          1
                        </span>
                        Save your resume as{" "}
                        <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">resume.pdf</code>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-purple-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          2
                        </span>
                        Place it in the <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">public/</code>{" "}
                        folder
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">
                          3
                        </span>
                        Refresh the page to see PDF view and download
                      </li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  )
}
