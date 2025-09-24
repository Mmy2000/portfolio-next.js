"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, Zap } from "lucide-react"

const projects = [
  {
    title: "E-Commerce Platform",
    description:
      "A comprehensive e-commerce solution built with Next.js and Stripe integration. Features include product management, user authentication, shopping cart, and payment processing.",
    image: "/modern-ecommerce-interface-dashboard.jpg",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/task-management-dashboard-kanban-board.jpg",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description:
      "A responsive weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "/weather-dashboard-interface-with-charts.jpg",
    technologies: ["Vue.js", "Chart.js", "OpenWeather API"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with Next.js, featuring smooth animations, responsive design, and optimized performance.",
    image: "/modern-portfolio-website.png",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export function Projects() {
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
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
              <div className="flex items-center gap-3 bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
                <Zap className="h-5 w-5 text-primary animate-pulse-slow" />
                <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                  Featured Projects
                </h2>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
            </div>
            <h3 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Things I've <span className="text-primary">Built</span>
            </h3>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty leading-relaxed">
              A collection of projects that showcase my technical skills,
              creative problem-solving abilities, and passion for building
              exceptional digital experiences.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`transition-all duration-1000 ${
                isVisible
                  ? `animate-scale-in animate-stagger-${(index % 4) + 1}`
                  : "opacity-0 scale-95"
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Card className="group h-full hover-lift border-primary/30 transition-all duration-700 overflow-hidden bg-card/80 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={`${project.title} - Screenshot showing the main interface and features`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-primary/95 backdrop-blur-sm text-black px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg">
                      <Star className="h-3 w-3" />
                      Featured
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <CardContent className="">
                  <div className="flex items-start justify-between ">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className={`text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                          hoveredIndex === index ? "animate-bounce-subtle" : ""
                        }`}
                        style={{ animationDelay: `${techIndex * 100}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent hover-glow group/btn dark:text-primary"
                    >
                      <a
                        href={project.liveUrl}
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                        Live Demo
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="hover-glow group/btn bg-transparent"
                    >
                      <a
                        href={project.githubUrl}
                        className="flex items-center gap-2 dark:text-primary"
                      >
                        <Github className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300 " />
                        Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
