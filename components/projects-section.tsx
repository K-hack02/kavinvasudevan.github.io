import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Lock, Car, Gamepad2 } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      title: "Encrypted File Sharing System",
      description:
        "Secure file sharing system with user authentication, encrypted storage, and robust access control using symmetric (AES) and asymmetric (RSA) cryptography.",
      icon: <Lock className="h-6 w-6" />,
      technologies: ["Go", "AES", "RSA", "Cryptography", "Data Structures"],
      features: [
        "Multi-user collaboration through secure invitations",
        "Revocable file sharing with linked-list storage",
        "End-to-end encryption for data confidentiality",
      ],
      github: "#",
      demo: null,
    },
    {
      title: "FIA WEC Race Outcome Predictor",
      description:
        "End-to-end machine learning pipeline to predict podium finishes in FIA/WEC races using car, driver, and circuit performance data.",
      icon: <Car className="h-6 w-6" />,
      technologies: ["Python", "Scikit-Learn", "Pandas", "Machine Learning"],
      features: [
        "Feature engineering from racing performance data",
        "Classification models with accuracy and F1 metrics",
        "Predictive race analytics dashboard",
      ],
      github: "#",
      demo: null,
    },
    {
      title: "Pacman AI with Bayesian Inference",
      description:
        "Probabilistic AI agents for Pacman using Bayes Nets, Hidden Markov Models, and particle filtering to locate invisible ghosts.",
      icon: <Gamepad2 className="h-6 w-6" />,
      technologies: ["Python", "Bayesian Networks", "HMM", "Particle Filtering"],
      features: [
        "Exact inference with variable elimination",
        "Multi-agent ghost tracking under sensor noise",
        "Dynamic inference for intelligent action planning",
      ],
      github: "#",
      demo: null,
    },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of my academic and personal projects demonstrating expertise in machine learning, cryptography,
            and AI systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">{project.icon}</div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                </div>
                <p className="text-muted-foreground text-sm text-pretty">{project.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="space-y-1">
                    {project.features.map((feature, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
