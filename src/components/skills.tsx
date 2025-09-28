"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Alias the lucide icons to avoid name collisions with the HTML <code> tag
import {
  Code as CodeIcon,
  Database as DatabaseIcon,
  Palette as PaletteIcon,
  Wrench as WrenchIcon,
} from "lucide-react";

export function Skills({ skillsData }: { skillsData: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // If your backend returns icon names (strings), map them to actual icon components here.
  const iconMap: Record<string, any> = {
    Frontend: CodeIcon,
    Backend: DatabaseIcon,
    "Tools & Technologies": WrenchIcon,
    "Design & UX": PaletteIcon,
    // you can also map specific icon names if you return e.g. "CodeIcon" etc.
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30"
    >
      <div className="max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            {/* Use the aliased icon component here */}
            <CodeIcon className="h-6 w-6 text-primary animate-bounce-subtle" />
            <h2 className="text-sm font-medium text-primary uppercase tracking-wider">
              Technical Skills
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent" />
          </div>

          <p className="text-muted-foreground mb-12 text-lg">
            A comprehensive toolkit of technologies and methodologies I use to
            bring ideas to life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {(skillsData?.data ?? []).map(
            (category: any, categoryIndex: number) => {
              // category.icon may be a component already, or may be a string returned from the API.
              const IconComponent =
                typeof category?.icon === "string"
                  ? // try to resolve by icon name, fall back to mapping by category name, then to CodeIcon
                    iconMap[category.icon] ?? iconMap[category.name] ?? CodeIcon
                  : category?.icon ?? iconMap[category?.name] ?? CodeIcon;

              return (
                <div
                  key={category.id ?? `cat-${categoryIndex}`}
                  className={`transition-all duration-1000 ${
                    isVisible
                      ? `animate-slide-up animate-stagger-${categoryIndex + 1}`
                      : "opacity-0 translate-y-8"
                  }`}
                  onMouseEnter={() => setHoveredCategory(categoryIndex)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <Card className="h-full hover-lift bg-card/50 backdrop-blur-sm border-primary/30 transition-all duration-500">
                    <CardContent>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-primary/10">
                          {/* render resolved icon */}
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {category.name}
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {(category?.skills ?? []).map(
                          (skill: any, skillIndex: number) => {
                            const skillName = skill?.name ?? skill; // handle both {id,name} objects and plain strings
                            const badgeKey =
                              skill?.id ??
                              `${
                                category.id ?? categoryIndex
                              }-skill-${skillIndex}`;

                            return (
                              <Badge
                                key={badgeKey}
                                variant="secondary"
                                className={`transition-all border-primary/30 duration-300 hover:bg-primary hover:text-primary-foreground hover:scale-105 ${
                                  hoveredCategory === categoryIndex
                                    ? "animate-pulse-slow"
                                    : ""
                                }`}
                                style={{
                                  animationDelay: `${skillIndex * 100}ms`,
                                }}
                              >
                                {skillName}
                              </Badge>
                            );
                          }
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}
