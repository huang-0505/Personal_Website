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
    link.download = "Junhui_Huang_Resume.pdf"
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
                      • Data scientist and ML Engineer with end-to-end experience building robust solutions across
                      Generative AI (LLMs), Computer vision and predictive modeling to improve efficiency and product
                      innovation across data-rich industries.
                    </p>
                    <p>
                      • Lead the full project lifecycle, from architecting scalable data curation pipelines (ETL) to
                      fine-tuning Transformer-based models (LoRA) and optimizing for high-throughput, low-latency
                      deployment (vLLM, TensorRT)
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
                      <strong>Programming & Database:</strong> Python (Pandas, Scikit-learn), SQL, R, Spark, MongoDB,
                      Snowflake, Hadoop, OOP
                    </p>
                    <p>
                      <strong>Data Science and GenAI:</strong> A/B testing, PyTorch, TensorFlow, Hugging Face
                      Transformers, LangChain, RAG, LoRA
                    </p>
                    <p>
                      <strong>MLOps & Production:</strong> GCP, AWS, vLLM, SGLang, TensorRT, ONNX, FastAPI, Kubernetes,
                      Docker, Git, CI/CD
                    </p>
                    <p>
                      <strong>Modeling & Statistics:</strong> regression, A/B testing, statistical inference,
                      clustering, classification, data mining, PowerBI
                    </p>
                    <p>
                      <strong>Data Visualization & Communication:</strong> Tableau, Matplotlib, Seaborn, PowerBI;
                      translate analytic into business insights
                    </p>
                    <p>
                      <strong>Project Delivery:</strong> Agile methodology, stakeholder collaboration, KPI reporting,
                      cross-functional execution
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
                    {/* Nala PetPages */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Machine Learning Engineer Intern – Veterinary LLM Development
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">Nala PetPages</p>
                        </div>
                        <div className="text-right text-slate-600 dark:text-slate-400">
                          <p>May 2025 – Aug 2025</p>
                          <p>Providence, RI</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-700 dark:text-slate-300">
                        <p>
                          • Reduced manual data preparation by 30% by building a data curation pipeline with
                          de-duplication, labeling, and domain-specific parsing and creating a high-quality, proprietary
                          dataset in a PostgreSQL backend.
                        </p>
                        <p>
                          • Fine-tuned a VetLLM on the curated dataset using Hugging Face Transformers and LoRA on H100
                          GPUs, boosting question-answering accuracy by 18% and validating its expert-level performance
                          via an LLM-as-a-judge framework.
                        </p>
                        <p>
                          • Benchmarked the model on a custom VetAI Leaderboard, outperforming industry standards like
                          Google's Gemma-7B and Meta's LLaMA-3.1-8B on veterinary board exam questions.
                        </p>
                        <p>
                          • Optimized the LLM model for deployment, cutting inference latency by 20% using TensorRT and
                          ONNX. Delivered a production-ready REST API using vLLM as the serving engine, containerized
                          with Docker for internal demos.
                        </p>
                      </div>
                    </div>

                    {/* Ecoforge */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Data Scientist Intern – Forecasting and Optimization
                          </h3>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">Ecoforge</p>
                        </div>
                        <div className="text-right text-slate-600 dark:text-slate-400">
                          <p>Oct 2024 – Apr 2025</p>
                          <p>Somerville, MA</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-slate-700 dark:text-slate-300">
                        <p>
                          • Developed and deployed an ML-based pipeline to predict cement compressive strength based on
                          material composition, enabling clients to optimize material costs and carbon reduction
                          targets, leading to $2M in annual cost saving.
                        </p>
                        <p>
                          • Led hands-on development and iteration of a machine learning model using XGBoost, making key
                          decisions on feature engineering, selection, and model architecture to significantly
                          outperform distance-based benchmarks.
                        </p>
                        <p>
                          • Designed and executed A/B testing experiments to validate model-driven recommendations,
                          ensuring statistical significance and stakeholder confidence before full-scale deployment.
                        </p>
                        <p>
                          • Designed physics-informed neural networks and applied transfer learning to enhance model
                          robustness against low-quality, sparse data, improving generalization and applicability across
                          diverse production environments.
                        </p>
                        <p>
                          • Collaborated cross-functionally with engineering, IT, and operations teams; delivered
                          Tableau dashboards visualizing price-performance trade-offs for management decisions.
                        </p>
                      </div>
                    </div>

                    {/* Lifespan Health System */}
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Healthcare Data Scientist Intern – Medical Image Modeling
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
                          • Built multi-modal brain tumor segmentation models using U-Net and Transformer-based
                          TransUNet on UCSF's MRI dataset, improving tumor localization accuracy by 17% from baseline
                          model for clinical application.
                        </p>
                        <p>
                          • Developed end-to-end scalable ETL pipelines compatible with 8 MRI modalities, applying
                          adaptive cropping using tissue masks, tailored normalization, and denoising techniques that
                          account for varying contrast and noise profiles.
                        </p>
                        <p>
                          • Established an evaluation framework based on the Dice coefficient to measure tumor
                          segmentation performance, enabling standardized model benchmarking and iterative improvements
                          for clinical use.
                        </p>
                        <p>
                          • Contributed to the development of model performance dashboards for clinical validation;
                          facilitated feedback loops with radiologists to refine model outputs.
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
