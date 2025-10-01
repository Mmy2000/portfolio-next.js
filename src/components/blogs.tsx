"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye, Github, Star, Zap } from "lucide-react";
import Link from "next/link";
import ProjectsProps from "@/interfaces/page";

const Blogs: React.FC<ProjectsProps> = ({
  projectsData,
  isHomePage = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/50"
    >
      <div className="max-w-7xl mx-auto">
        {isHomePage ? (
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
                    Featured Blogs
                  </h2>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-primary to-transparent w-24"></div>
              </div>
              <h3 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
                Insights & <span className="text-primary">Stories</span>
              </h3>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty leading-relaxed">
                Explore a collection of articles covering development tips,
                coding best practices, and personal experiences from my journey
                as a developer.
              </p>
            </div>
          </div>
        ) : null}

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {projectsData?.data.map((project: any, index: any) => (
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
                  {project.is_featured && (
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
                      <Link href={`projects/${project.slug}`}>
                        {project.title}
                      </Link>
                    </h3>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">
                    {project.cover_description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project?.tags
                      .slice(0, 4)
                      .map((tech: any, techIndex: any) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className={`border-primary/30 text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 ${
                            hoveredIndex === index
                              ? "animate-bounce-subtle"
                              : ""
                          }`}
                          style={{ animationDelay: `${techIndex * 100}ms` }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    {project?.tags.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs border-primary/30"
                      >
                        +{project?.tags.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <Link href={`/projects/${project.slug}`}>
                    <Button size="sm" className="w-full hover-glow group/btn">
                      <Eye className="h-3 w-3 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        {isHomePage ? (
          <div>
            <div className="text-center mt-6">
              <Link href={"/blogs"}>
                <Button
                  size="lg"
                  variant="outline"
                  className="hover-glow group/btn bg-transparent dark:hover:text-primary border-primary/40 dark:border-primary/40 w-1/2"
                >
                  <Eye className="h-3 w-3 mr- group-hover/btn:scale-110 transition-transform duration-300" />
                  All Blogs
                </Button>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Blogs;
