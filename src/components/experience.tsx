"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Building } from "lucide-react"

const experiences = [
  {
    period: "2024 — Present",
    title: "Senior Frontend Engineer, Accessibility",
    company: "TechCorp",
    description:
      "Build and maintain critical components used to construct TechCorp's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers, to implement and advocate for best practices in web accessibility.",
    technologies: ["JavaScript", "TypeScript", "React", "Storybook"],
    link: "#",
  },
  {
    period: "2022 — 2024",
    title: "Full Stack Developer",
    company: "StartupXYZ",
    description:
      "Led the development of a comprehensive e-commerce platform from concept to launch. Implemented modern web technologies and best practices to create a scalable, performant application serving thousands of users.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    link: "#",
  },
  {
    period: "2020 — 2022",
    title: "Frontend Developer",
    company: "Digital Agency",
    description:
      "Developed responsive web applications for various clients across different industries. Collaborated with design teams to create pixel-perfect implementations while ensuring optimal performance and accessibility.",
    technologies: ["React", "Vue.js", "SCSS", "Webpack"],
    link: "#",
  },
]

export function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"}`}
        >
          <div className="flex items-center gap-4 mb-4">
            <Building className="h-6 w-6 text-primary animate-float" />
            <h2 className="text-sm font-medium text-primary uppercase tracking-wider">Professional Experience</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <p className="text-muted-foreground mb-12 text-lg">
            My journey through various roles and companies, building impactful digital experiences.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible ? `animate-slide-up animate-stagger-${index + 1}` : "opacity-0 translate-y-8"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="group hover-lift border-primary/30 transition-all duration-500 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-48 flex-shrink-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <p className="text-sm font-medium text-muted-foreground">{experience.period}</p>
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                            {experience.title}
                          </h3>
                          <p className="text-primary font-medium flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            {experience.company}
                          </p>
                        </div>
                        <ExternalLink
                          className={`h-5 w-5 text-muted-foreground group-hover:text-primary transition-all duration-300 ${
                            hoveredIndex === index ? "rotate-45 scale-110" : ""
                          }`}
                        />
                      </div>

                      <p className="text-muted-foreground mb-6 leading-relaxed text-pretty">{experience.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className={`text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                              hoveredIndex === index ? "animate-bounce-subtle" : ""
                            }`}
                            style={{ animationDelay: `${techIndex * 100}ms` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
