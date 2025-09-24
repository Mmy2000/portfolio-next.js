"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Code,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [displayText, setDisplayText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);

  const roles = [
    "Full Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "UI/UX Designer",
  ];

  useEffect(() => {
    setIsVisible(true);

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typewriterEffect = () => {
      const currentText = roles[roleIndex];

      if (!isDeleting) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentText.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        setDisplayText(currentText.slice(0, charIndex));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setCurrentRole(roleIndex);
        }
      }
    };

    const typingInterval = setInterval(typewriterEffect, isDeleting ? 50 : 100);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(typingInterval);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
          }}
        />
        <div
          className="absolute w-64 h-64 bg-primary/15 rounded-full blur-2xl animate-float"
          style={{
            right: `${mousePosition.x * 0.01}px`,
            bottom: `${mousePosition.y * 0.01}px`,
            animationDelay: "2s",
          }}
        />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/8 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Section */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div
              className={`transition-all duration-1200 ${
                isVisible ? "animate-fade-in" : "opacity-0"
              }`}
            >
              <div className="flex items-center justify-center lg:justify-start mb-8">
                <div className="flex items-center space-x-2 bg-primary/10 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-primary font-medium tracking-wide text-sm">
                    Available for work
                  </span>
                  <Sparkles className="h-4 w-4 text-primary animate-pulse-slow" />
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-8 text-balance">
                <span className="inline-block ">Mahmoud</span>{" "}
                <span className="inline-block text-primary  ">Yousef</span>
              </h1>

              <div className="flex items-center justify-center lg:justify-start mb-12">
                <Code className="h-6 w-6 text-primary mr-4 animate-bounce-subtle" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground text-balance font-light min-h-[2.5rem] flex items-center">
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent font-medium">
                    {displayText}
                  </span>
                  <span className="animate-pulse text-primary ml-1">|</span>
                </h2>
                <Code
                  className="h-6 w-6 text-primary ml-4 animate-bounce-subtle"
                  style={{ animationDelay: "1s" }}
                />
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "animate-slide-up" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto lg:mx-0 text-pretty leading-relaxed">
                I build accessible, pixel-perfect digital experiences that blend
                thoughtful design with robust engineering. My favorite work lies
                at the intersection of design and development.
              </p>
            </div>

            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? "animate-scale-in" : "opacity-0 scale-95"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-16">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground hover-lift group"
                >
                  <a href="#projects" className="flex items-center gap-2">
                    View My Work
                    <ArrowDown className="h-4 w-4 group-hover:translate-y-1 transition-transform duration-300" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="hover-lift group bg-transparent"
                >
                  <a
                    href="#contact"
                    className="flex items-center gap-2 dark:text-primary"
                  >
                    Get In Touch
                    <Mail className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                </Button>
              </div>

              <div className="flex justify-center lg:justify-start space-x-6">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com",
                    label: "LinkedIn",
                  },
                  {
                    icon: Mail,
                    href: "mailto:alex@example.com",
                    label: "Email",
                  },
                ].map(({ icon: Icon, href, label }, index) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={
                      href.startsWith("mailto:")
                        ? undefined
                        : "noopener noreferrer"
                    }
                    className={`text-muted-foreground hover:text-primary transition-all duration-300 hover-glow animate-stagger-${
                      index + 1
                    }`}
                  >
                    <Icon className="h-6 w-6 hover:scale-125 transition-transform duration-300" />
                    <span className="sr-only">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              className={`transition-all duration-1000 delay-200 ${
                isVisible ? "animate-fade-in animate-float" : "opacity-0"
              }`}
            >
              <div className="relative">
                {/* Glowing background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-2xl scale-110 animate-pulse-slow"></div>

                {/* Main image container */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/professional-developer-working-on-laptop-with-mode.jpg"
                    alt="Alex Johnson - Full Stack Developer"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                    priority
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating tech icons */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce-subtle">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce-subtle"
                  style={{ animationDelay: "1s" }}
                >
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
