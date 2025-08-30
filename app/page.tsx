"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { DynamicBackground } from "@/components/dynamic-background"
import { ContactForm } from "@/components/contact-form"
import { AccessRequestModal } from "@/components/access-request-modal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Github, Calendar, Code, Database, Brain, Cpu, Lock } from "lucide-react"

const projects = [
  {
    id: "battery-management-system",
    title: "Battery Management System (BMS)",
    description:
      "Architected a FreeRTOS-based firmware for an electric vehicle's custom Battery Management System, coordinating cell monitoring, charging, fault detection, and safety-critical state transitions across concurrent tasks.",
    icon: Cpu,
    githubUrl: "https://github.com/K-hack02/Formula-Electric-Berkeley-SN4-Firmware/tree/main",
    isPrivate: false,
    badges: ["C", "STM32", "FreeRTOS", "CAN Bus", "GPIO"],
    features: [
      "Safety-critical state machine for charging, balancing, and fault handling",
      "Concurrency-safe data sharing across monitoring, telemetry, and control tasks",
      "CAN telemetry and fault reporting to vehicle subsystems",
    ],
  },
  {
    id: "powertrain-control-unit",
    title: "Powertrain Control Unit (PCU)",
    description:
      "Developed STM32 firmware for the Powertrain Control Unit, processing accelerator and brake inputs via ADC with normalization, plausibility checks, and fault detection, then transmitting values over CAN for safe, real-time vehicle control.",
    icon: Cpu,
    githubUrl: "https://github.com/k-hack02/powertrain-control-unit",
    isPrivate: false,
    badges: ["C", "STM32", "ADC", "CAN Bus", "UART"],
    features: [
      "Real-time pedal and brake sensor processing",
      "Normalization + plausibility checks for safety",
      "Millisecond-interval CAN telemetry for closed-loop control",
    ],
  },
  {
    id: "driver-dashboard",
    title: "Driver Dashboard (DASH)",
    description:
      "Designed the dashboard firmware with I²C I/O handling, CAN decoding, and real-time UI updates, adding fault indicators (IMD, BMS) and a Ready-to-Drive buzzer synchronized with the BMS state machine.",
    icon: Cpu,
    githubUrl: "https://github.com/k-hack02/driver-dashboard",
    isPrivate: false,
    badges: ["C", "STM32", "I²C", "CAN Bus", "SquareLine UI"],
    features: [
      "Superloop architecture with 10 ms refresh cycle",
      "Handles 3 driver switches + 2 safety buttons via I²C expanders",
      "Displays battery status, speed, tractive system, and coolant system data",
    ],
  },
  {
    id: "data-collection-unit",
    title: "Data Collection Unit (DCU)",
    description:
      "Implemented a circular buffer for high-throughput CAN logging, ensuring lossless real-time telemetry storage with minimal memory usage and providing persistent data for post-race analysis and debugging.",
    icon: Cpu,
    githubUrl: "https://github.com/k-hack02/data-collection-unit",
    isPrivate: false,
    badges: ["C", "STM32", "CAN Bus", "SDIO", "SPI", "Xbee"],
    features: [
      "Circular buffer for high-throughput CAN capture",
      "Persistent logging to SD card",
      "Live wireless telemetry streaming via XBee",
    ],
  },
  {
    id: "operating-system-pintos",
    title: "Operating System Development (Pintos)",
    description:
      "Extended Pintos OS by implementing a priority scheduler, kernel-mode synchronization primitives (locks, semaphores, alarm clock), and a UNIX-style file system with caching and hierarchical directories.",
    icon: Database,
    isPrivate: false,
    badges: ["C", "Scheduling", "Kernel/User Mode", "Synchronization", "File Systems"],
    features: [
      "Priority scheduler with donation to prevent inversion",
      "Kernel/user mode isolation with safe system calls",
      "FAT-style file system with caching, extensible files, and directories",
    ],
  },
  {
    id: "encrypted-file-sharing",
    title: "Encrypted File Sharing System",
    description:
      "Developed a secure file-sharing platform in Go with user authentication, AES/RSA encryption, and revocable access control, enabling safe collaboration across multiple users.",
    icon: Database,
    githubUrl: "https://github.com/k-hack02/encrypted-file-sharing",
    isPrivate: true,
    badges: ["Go", "Cryptography (AES/RSA)", "HMAC"],
    features: [
      "Linked-list file blocks with HMAC for integrity and secure appends",
      "Deterministic UUID-based key generation for encryption",
      "Fine-grained file sharing with re-keying + revocation",
    ],
  },
  {
    id: "csr-classification",
    title: "CSR Classification: Detecting Greenwashing",
    description:
      "Fine-tuned a BERT model to classify corporate sustainability statements as genuine or greenwashing, achieving 99% accuracy and highlighting linguistic markers that distinguish authentic impact from vague claims.",
    icon: Brain,
    githubUrl: "https://github.com/k-hack02/csr-greenwashing-classifier",
    isPrivate: false,
    badges: ["Python", "PyTorch", "Transformers", "NLP"],
    features: [
      "Fine-tuned BERT for sustainability statement classification",
      "99% test accuracy with CI (0.97–1.00)",
      "Detects linguistic markers of genuine impact vs greenwashing",
    ],
  },
  {
    id: "fia-wec-predictor",
    title: "FIA WEC Race Outcome Predictor",
    description:
      "Built a machine learning pipeline on FIA/WEC lap data, engineering features like start position and speed efficiency; trained Random Forest models achieving ~70% accuracy and an AUC of 0.82.",
    icon: Brain,
    githubUrl: "https://github.com/k-hack02/fia-wec-predictor",
    isPrivate: false,
    badges: ["Python", "Scikit-learn", "Pandas", "Random Forest"],
    features: [
      "Feature engineering on FIA/WEC lap telemetry",
      "Random Forest model with ~70% accuracy, AUC 0.82",
      "Identified start position, speed efficiency, and sector times as key predictors",
    ],
  },
  {
    id: "morphological-wug-test",
    title: "In-Context Morphological Wug Test",
    description:
      "Implemented a nanoGPT-style Transformer in PyTorch to evaluate in-context morphological learning, training a 10M-parameter model that achieved 63.5% accuracy on validation tasks across 18 transformations.",
    icon: Brain,
    githubUrl: "https://github.com/k-hack02/morphological-wug-test",
    isPrivate: false,
    badges: ["Python", "PyTorch", "nanoGPT", "Linguistics"],
    features: [
      "Custom 10M-parameter Transformer for morphological learning",
      "Evaluation across 18 transformations with 63.5% accuracy",
      "Benchmarks in-context learning limits on irregular forms",
    ],
  },
]

export default function Home() {
  const [accessModal, setAccessModal] = useState({
    isOpen: false,
    projectName: "",
    repositoryUrl: "",
  })

  const handleProjectClick = (project: (typeof projects)[0]) => {
    if (!project.githubUrl) {
      return // Do nothing for projects without GitHub URLs
    }

    if (project.isPrivate) {
      setAccessModal({
        isOpen: true,
        projectName: project.title,
        repositoryUrl: project.githubUrl,
      })
    } else {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer")
    }
  }

  const closeAccessModal = () => {
    setAccessModal({
      isOpen: false,
      projectName: "",
      repositoryUrl: "",
    })
  }

  return (
    <div className="min-h-screen relative">
      <DynamicBackground />
      <Navigation />

      {/* Hero Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 text-balance text-foreground drop-shadow-lg">
            Kavin Vasudevan
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-8 text-pretty drop-shadow-md">
            Software Engineer | Embedded Software Engineer
          </p>

          <div className="flex justify-center gap-4 mb-8">
            <a
              href="https://linkedin.com/in/kavin-vasudevan"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="border-border/20 hover:border-border/40 transition-colors w-28 cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="pt-3 pb-3">
                  <div className="flex flex-col items-center text-center">
                    <Linkedin className="h-5 w-5 text-primary mb-1 drop-shadow-sm" />
                    <h3 className="font-semibold text-xs text-foreground drop-shadow-sm">LinkedIn</h3>
                  </div>
                </CardContent>
              </Card>
            </a>

            <a href="https://github.com/k-hack02" target="_blank" rel="noopener noreferrer" className="block">
              <Card className="border-border/20 hover:border-border/40 transition-colors w-28 cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="pt-3 pb-3">
                  <div className="flex flex-col items-center text-center">
                    <Github className="h-5 w-5 text-primary mb-1 drop-shadow-sm" />
                    <h3 className="font-semibold text-xs text-foreground drop-shadow-sm">GitHub</h3>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16 text-foreground drop-shadow-lg">
            Education
          </h2>
          <Card className="border-border/20">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl font-playfair text-foreground drop-shadow-md">
                    University of California, Berkeley
                  </CardTitle>
                  <CardDescription className="text-lg mt-2 text-foreground/80 drop-shadow-sm">
                    Double Major: Bachelor of Arts in Computer Science and Data Science
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-foreground/70 mb-2 drop-shadow-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    May 2025
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16 text-foreground drop-shadow-lg">
            Professional Experience
          </h2>
          <div className="space-y-8">
            {/* Amazon */}
            <Card className="border-border/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-playfair text-foreground drop-shadow-md">Amazon</CardTitle>
                    <CardDescription className="text-lg mt-1 text-foreground/80 drop-shadow-sm">
                      Software Development Engineer Intern
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-foreground/70 drop-shadow-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      June 2024 – September 2024
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80 drop-shadow-sm">
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Integrated product images into an AWS ML pipeline, enabling 48% more categories and boosting
                    accuracy by 4.3%
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Reduced model inference latency by 3× through smarter API calls and CI/CD optimizations
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Lowered training costs with timeout/backoff tuning and synchronous data fetches
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Berkeley Formula SAE */}
            <Card className="border-border/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-playfair text-foreground drop-shadow-md">
                      Formula SAE Electric at Berkeley
                    </CardTitle>
                    <CardDescription className="text-lg mt-1 text-foreground/80 drop-shadow-sm">
                      Lead Firmware Engineer
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-foreground/70 drop-shadow-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      March 2023 – July 2025
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80 drop-shadow-sm">
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Directed 15+ engineers on 10+ projects, delivering milestones early and ensuring subsystem
                    integration
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Built vehicle telemetry and safety pipelines: live data streaming, fault-handling, BMS state
                    machine, and startup logic
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Led hardware-in-the-loop (HIL) testing, speeding up debugging cycles and improving real-time system
                    reliability
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* KeepFlying.aero */}
            <Card className="border-border/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-playfair text-foreground drop-shadow-md">
                      KeepFlying.aero
                    </CardTitle>
                    <CardDescription className="text-lg mt-1 text-foreground/80 drop-shadow-sm">
                      Machine Learning Engineer Intern
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-foreground/70 drop-shadow-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      August 2023 – December 2023
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80 drop-shadow-sm">
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Explored zero-shot vs. few-shot prompting for aviation record parsing, improving accuracy by 6% and
                    cutting hallucinations by 13%
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Compared Microsoft Semantic Kernel vs. LangChain, identifying key incompatibilities and guiding
                    framework choice
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Designed custom evaluation metrics (Extraction Fidelity Score, Hallucination Rate) to benchmark LLM
                    performance
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* The Coder School */}
            <Card className="border-border/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-playfair text-foreground drop-shadow-md">
                      The Coder School Berkeley
                    </CardTitle>
                    <CardDescription className="text-lg mt-1 text-foreground/80 drop-shadow-sm">
                      Computer Science Tutor
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-foreground/70 drop-shadow-sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      January 2022 – May 2023
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-foreground/80 drop-shadow-sm">
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Guided middle and high school students in web development, scripting, and block-based programming through
                    personalized projects
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Adapted teaching strategies using progress tracking and performance data
                  </li>
                  <li className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/80">
                    Maintained consistent communication with parents to support student growth
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16 text-foreground drop-shadow-lg">
            Projects
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon
              return (
                <Card key={project.id} className="border-border/20 hover:border-border/40 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-primary drop-shadow-sm" />
                        <CardTitle className="font-playfair text-foreground drop-shadow-md">{project.title}</CardTitle>
                      </div>
                      <button
                        onClick={() => handleProjectClick(project)}
                        className="text-primary hover:text-primary/80 hover:bg-primary/30 rounded-md p-2 transition-all duration-200 flex items-center gap-1"
                        title={project.isPrivate ? "Request access to private repository" : "View on GitHub"}
                        disabled={!project.githubUrl}
                      >
                        {project.isPrivate && <Lock className="h-3 w-3" />}
                        <Github className={`h-5 w-5 drop-shadow-sm ${!project.githubUrl ? "opacity-50" : ""}`} />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 mb-4 drop-shadow-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.badges.map((badge) => (
                        <Badge key={badge} variant="outline">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    <ul className="text-sm text-foreground/70 space-y-1 drop-shadow-sm">
                      {project.features.map((feature, index) => (
                        <li
                          key={index}
                          className="ml-6 relative before:content-['•'] before:absolute before:-ml-6 before:text-foreground/70"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-4xl font-bold text-center mb-16 text-foreground drop-shadow-lg">Skills</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground drop-shadow-md">
                  <Code className="h-5 w-5 text-primary drop-shadow-sm" />
                  Programming Languages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Python", "C", "Java", "C++", "Go", "JavaScript/TypeScript", "SQL", "noSQL", "Scala"].map(
                    (skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Embedded Systems */}
            <Card className="border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground drop-shadow-md">
                  <Cpu className="h-5 w-5 text-primary drop-shadow-sm" />
                  Embedded Systems
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "STM32 (CubeIDE)",
                    "FreeRTOS",
                    "CANalyzer",
                    "ADC",
                    "CAN",
                    "GPIO",
                    "I2C",
                    "SPI",
                    "SDIO",
                    "UART",
                    "Zigbee",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Software Engineering */}
            <Card className="border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground drop-shadow-md">
                  <Database className="h-5 w-5 text-primary drop-shadow-sm" />
                  Software Engineering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Git/GitHub", "AWS", "REST APIs", "Concurrency & Locking", "Security"].map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Machine Learning & Data Science */}
            <Card className="border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground drop-shadow-md">
                  <Brain className="h-5 w-5 text-primary drop-shadow-sm" />
                  Machine Learning & Data Science
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "PyTorch",
                    "Scikit-learn",
                    "Pandas",
                    "NumPy",
                    "Matplotlib",
                    "Seaborn",
                    "Transformers",
                    "spaCy",
                    "NLTK",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-playfair text-4xl font-bold mb-8 text-foreground drop-shadow-lg">Get In Touch</h2>

          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border/20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-foreground/70 drop-shadow-sm">© 2025 Kavin Vasudevan. All rights reserved.</p>
        </div>
      </footer>

      <AccessRequestModal
        isOpen={accessModal.isOpen}
        onClose={closeAccessModal}
        projectName={accessModal.projectName}
        repositoryUrl={accessModal.repositoryUrl}
      />
    </div>
  )
}
