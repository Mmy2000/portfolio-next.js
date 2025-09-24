"use client"

import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Database, Palette, Wrench } from "lucide-react"

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: ["React", "Next.js", "TypeScript", "Vue.js", "Tailwind CSS", "SCSS", "JavaScript"],
    color: "text-primary",
  },
  {
    title: "Backend",
    icon: Database,
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Prisma", "GraphQL", "REST APIs"],
    color: "text-primary",
  },
  {
    title: "Tools & Technologies",
    icon: Wrench,
    skills: ["Git", "Docker", "AWS", "Vercel", "Webpack", "Vite", "Jest", "Cypress"],
    color: "text-primary",
  },
  {
    title: "Design & UX",
    icon: Palette,
    skills: ["Figma", "Adobe Creative Suite", "Responsive Design", "Accessibility", "User Research"],
    color: "text-primary",
  },
]

export function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
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
    <section id="skills" ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"}`}
        >
          <div className="flex items-center gap-4 mb-4">
            <Code className="h-6 w-6 text-primary animate-bounce-subtle" />
            <h2 className="text-sm font-medium text-primary uppercase tracking-wider">Technical Skills</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <p className="text-muted-foreground mb-12 text-lg">
            A comprehensive toolkit of technologies and methodologies I use to bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.title}
                className={`transition-all duration-1000 ${
                  isVisible ? `animate-slide-up animate-stagger-${categoryIndex + 1}` : "opacity-0 translate-y-8"
                }`}
                onMouseEnter={() => setHoveredCategory(categoryIndex)}
                onMouseLeave={() => setHoveredCategory(null)}
              >
                <Card className="h-full hover-lift bg-card/50 backdrop-blur-sm border-primary/30 transition-all duration-500">
                  <CardContent className="">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg bg-primary/10`}>
                        <IconComponent className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, skillIndex) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className={`transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 ${
                            hoveredCategory === categoryIndex ? "animate-pulse-slow" : ""
                          }`}
                          style={{
                            animationDelay: `${skillIndex * 100}ms`,
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
