import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Calendar, MapPin } from "lucide-react"

export function ExperienceSection() {
  const experiences = [
    {
      title: "Software Development Engineer Intern",
      company: "Amazon",
      location: "Seattle, WA",
      period: "June 2024 – September 2024",
      description: [
        "Integrated image data via REST into an AWS ML pipeline, enabling 48% more image-dependent categories and improving accuracy by 4.3%",
        "Led image-feature integration; mitigated a 3x inference-latency hit and optimized training/inference costs via synchronous fetches, API timeout/backoff tuning, and CI/CD rollouts",
      ],
      technologies: ["AWS", "REST APIs", "Machine Learning", "CI/CD", "Python"],
    },
    {
      title: "Lead Firmware Engineer",
      company: "Berkeley Formula SAE Electric Club",
      location: "Berkeley, CA",
      period: "March 2023 – July 2025",
      description: [
        "Directed firmware development and data analysis across multiple EV subsystems, drove team recruitment and onboarding",
        "Developed STM32 firmware for custom Battery Management System with FreeRTOS task scheduling and inter-task communication",
        "Designed live telemetry and fault-handling pipelines using CAN, UART, SPI, I²C, SDIO, and Zigbee protocols",
      ],
      technologies: ["STM32", "FreeRTOS", "C", "CAN", "UART", "SPI", "I²C", "Zigbee"],
    },
    {
      title: "Machine Learning Engineer Intern",
      company: "KeepFlying.aero",
      location: "Remote",
      period: "August 2023 – December 2023",
      description: [
        "Integrated Microsoft Semantic Kernel with LangChain to operationalize LLMs for unstructured data conversion",
        "Led model performance analysis and optimization of LLM data workflows with custom evaluation metrics",
      ],
      technologies: ["LLMs", "LangChain", "Microsoft Semantic Kernel", "Python", "ETL"],
    },
    {
      title: "Computer Science Tutor",
      company: "The Coder School Berkeley",
      location: "Berkeley, CA",
      period: "January 2022 – May 2023",
      description: [
        "Designed customized coding projects based on individual student assessments",
        "Refined teaching strategies using data-driven insights and maintained active parent communication",
      ],
      technologies: ["Python", "Java", "JavaScript", "Teaching", "Curriculum Design"],
    },
  ]

  return (
    <section id="experience" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            My journey through internships and leadership roles, building expertise in software engineering, machine
            learning, and team leadership.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span className="font-medium">{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{exp.period}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
