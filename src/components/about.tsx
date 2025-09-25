"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { User, MapPin, Calendar, Target, Coffee } from "lucide-react"
import DOMPurify from "isomorphic-dompurify";


export function About({ aboutData }: { aboutData: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float"
          style={{
            left: `${mousePosition.x * 0.01}px`,
            top: `${mousePosition.y * 0.01}px`,
            animationDelay: "1s",
          }}
        />
        <div
          className="absolute w-48 h-48 bg-primary/10 rounded-full blur-2xl animate-float"
          style={{
            right: `${mousePosition.x * 0.005}px`,
            bottom: `${mousePosition.y * 0.005}px`,
            animationDelay: "3s",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <User className="h-6 w-6 text-primary animate-pulse-slow" />
            <h2 className="text-sm font-medium text-primary uppercase tracking-wider">
              About Me
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <p className="text-muted-foreground mb-12 text-lg">
            Get to know the person behind the code and the passion that drives
            my work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="space-y-6">
              <div
                className="text-lg text-muted-foreground leading-relaxed text-pretty hover:text-foreground transition-colors duration-300"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(aboutData?.data?.about || ""),
                }}
              />
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="hover-lift bg-card/50 backdrop-blur-sm border-primary/30 transition-all duration-500">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Coffee className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Quick Facts
                  </h3>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      icon: MapPin,
                      label: "Location",
                      value: "San Francisco, CA",
                    },
                    { icon: Calendar, label: "Experience", value: "8+ Years" },
                    {
                      icon: Target,
                      label: "Focus",
                      value: "Full-Stack Development & Accessibility",
                    },
                    {
                      icon: User,
                      label: "Availability",
                      value: "Open to opportunities",
                    },
                  ].map(({ icon: Icon, label, value }, index) => (
                    <div
                      key={label}
                      className={`flex items-center gap-4 group hover:bg-accent/15 -mx-2 px-2 py-2 rounded-lg transition-all duration-300 ${
                        isVisible
                          ? `animate-fade-in animate-stagger-${index + 1}`
                          : "opacity-0"
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <Icon className="h-4 w-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                          {label}
                        </dt>
                        <dd className="text-foreground font-medium">{value}</dd>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
