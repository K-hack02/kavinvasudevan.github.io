import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Code, Database, Brain } from "lucide-react"

export function AboutSection() {
  const skills = {
    Languages: ["Python", "C", "Java", "Go", "Scala", "JavaScript", "HTML/CSS"],
    "ML/AI": ["NumPy", "Pandas", "Scikit-Learn", "Transformers", "NLTK", "spaCy"],
    Tools: ["AWS", "Git", "GitHub", "REST APIs", "CI/CD", "Apache Spark"],
    Specialties: ["LLM Integration", "Text Summarization", "Sentiment Analysis", "Data Wrangling"],
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            I'm a double major in Computer Science and Data Science at UC Berkeley, passionate about leveraging AI and
            machine learning to solve real-world problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <GraduationCap className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Education</h3>
              </div>
              <div className="space-y-2">
                <p className="font-medium">University of California, Berkeley</p>
                <p className="text-muted-foreground">Double Major: Computer Science & Data Science</p>
                <p className="text-sm text-muted-foreground">Expected Graduation: May 2025</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Brain className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Focus Areas</h3>
              </div>
              <div className="space-y-2">
                <p>• Machine Learning & Deep Neural Networks</p>
                <p>• Natural Language Processing</p>
                <p>• Data Mining & Analytics</p>
                <p>• Software Engineering at Scale</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-center">Technical Skills</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <Card key={category}>
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-3 flex items-center">
                    {category === "Languages" && <Code className="h-4 w-4 mr-2 text-primary" />}
                    {category === "ML/AI" && <Brain className="h-4 w-4 mr-2 text-primary" />}
                    {category === "Tools" && <Database className="h-4 w-4 mr-2 text-primary" />}
                    {category === "Specialties" && <GraduationCap className="h-4 w-4 mr-2 text-primary" />}
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
