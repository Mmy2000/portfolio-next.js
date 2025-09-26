"use client"

import React from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ExternalLink,
  Github,
  ArrowLeft,
  Calendar,
  Tag,
  Star,
  CheckCircle,
  Clock,
  Users,
  Code,
  Lightbulb,
  Target,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ProjectProps } from '@/interfaces/page';
import DOMPurify from "isomorphic-dompurify";


const ProjectPage: React.FC<ProjectProps> = ({
    project,
}) => {
      const [activeTab, setActiveTab] = useState("overview");

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
        <div className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background/90 border-b border-border/50">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)]" />
          <div className="absolute inset-0 backdrop-blur-sm bg-background/80" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/projects">
                <Button
                  variant="outline"
                  size="sm"
                  className="hover-glow bg-background/50 backdrop-blur-sm border-border/50 dark:hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Projects
                </Button>
              </Link>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    {project.title}
                  </h1>
                  {project.is_featured && (
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {project.cover_description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {new Date(project.created_at).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    {project.category}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4" />
                    {project.status}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {project.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    {project.team_size}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button className="hover-glow group/btn">
                    <a
                      href={project.url}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                      Live Demo
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="hover-glow group/btn bg-transparent dark:hover:text-primary"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
                      View Code
                    </a>
                  </Button>
                </div>
              </div>

              <div className="aspect-video overflow-hidden rounded-lg border border-border/50">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} - Main interface screenshot`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border/50">
            {[
              { id: "overview", label: "Overview", icon: Target },
              { id: "tech", label: "Technologies", icon: Code },
            ].map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className="mb-2"
              >
                <tab.icon className="h-4 w-4 mr-2" />
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {activeTab === "overview" && (
                <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">
                      Project Overview
                    </h2>
                    <p
                      className="text-muted-foreground leading-relaxed mb-6"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(project.description || ""),
                      }}
                    ></p>
                  </CardContent>
                </Card>
              )}

              {activeTab === "tech" && (
                <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-foreground">
                      Technologies Used
                    </h2>
                    <div className="flex flex-wrap gap-3">
                      {project?.tags?.map((tech: any, index: any) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="text-sm px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors duration-300 border-primary/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Status
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-500/10 text-green-500 border-green-500/30"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {project.status}
                      </Badge>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Duration
                      </div>
                      <div className="text-foreground">{project.duration}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Team Size
                      </div>
                      <div className="text-foreground">{project.team_size}</div>
                    </div>
                    <Separator />
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Category
                      </div>
                      <Badge variant="outline">{project.category}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button className="w-full hover-glow group/btn">
                      <a
                        href={project.url}
                        target="_blank"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                        View Live Demo
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full hover-glow group/btn bg-transparent dark:hover:text-primary"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300 " />
                        View Source Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage