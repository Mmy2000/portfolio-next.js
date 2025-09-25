"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  Code2,
  MessageSquare,
  Download,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "#", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Experience", href: "#experience", icon: Briefcase },
  { name: "Projects", href: "#projects", icon: Code2 },
  { name: "Skills", href: "#skills", icon: Code2 },
  { name: "Contact", href: "#contact", icon: MessageSquare },
];

const Navigation = ({ aboutData }: { aboutData: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems
        .map((item) => item.href.replace("#", ""))
        .filter((href) => href);
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const handleDownload = async () => {
    const url = aboutData?.data?.resume;
    if (!url) return;

    const response = await fetch(url);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${aboutData?.data?.username}_resume.pdf`; // filename here
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl  border-primary/20 shadow-2xl shadow-primary/5"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleSmoothScroll("#");
              }}
              className="group flex items-center space-x-3"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-all duration-300 group-hover:scale-110">
                  <span className="text-black font-bold text-lg">MY</span>
                </div>
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-foreground group-hover:text-primary transition-all duration-300">
                  {aboutData?.data?.username}
                </span>
                <div className="text-xs text-muted-foreground font-medium">
                  {aboutData?.data?.headline}
                </div>
              </div>
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive =
                activeSection === item.href.replace("#", "") ||
                (item.href === "#" && activeSection === "");

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(item.href);
                  }}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group flex items-center space-x-2 ${
                    isActive
                      ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon
                    className={`h-4 w-4 transition-all duration-300 ${
                      isActive ? "text-primary" : "group-hover:scale-110"
                    }`}
                    aria-hidden="true"
                  />
                  <span>{item.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/5 rounded-xl animate-pulse"></div>
                  )}
                </a>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="ml-4 bg-transparent border-primary/30 hover:bg-primary hover:text-black transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 dark:hover:text-primary dark:border-primary/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Resume
            </Button>

            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button and theme toggle */}
          <div className="lg:hidden flex items-center space-x-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative transition-all duration-300 hover:scale-110 hover:bg-primary/10"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-0 rotate-180"
                      : "opacity-100 rotate-0"
                  }`}
                />
                <X
                  className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "opacity-100 rotate-0"
                      : "opacity-0 -rotate-180"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>

        <div
          className={`lg:hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen
              ? "max-h-96 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-4 overflow-hidden"
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-2 bg-card/95 backdrop-blur-xl border border-primary/20 rounded-2xl mt-4 shadow-2xl shadow-primary/10">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive =
                activeSection === item.href.replace("#", "") ||
                (item.href === "#" && activeSection === "");

              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(item.href);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "text-primary bg-primary/10 shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:translate-x-2"
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: isMobileMenuOpen
                      ? "translateX(0)"
                      : "translateX(-20px)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}

            <div className="pt-4 border-t border-border/50">
              <Button
                variant="outline"
                className="w-full bg-transparent border-primary/30 hover:bg-primary hover:text-black transition-all duration-300"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navigation };