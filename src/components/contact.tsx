"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, MessageCircle } from "lucide-react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      setSubmitStatus("success")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      })
      setErrors({})
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <MessageCircle className="h-6 w-6 text-primary animate-bounce-subtle" />
            <h2 className="text-sm font-medium text-primary uppercase tracking-wider">
              Get In Touch
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-primary to-transparent"></div>
          </div>
          <p className="text-muted-foreground mb-12 text-lg">
            Ready to start a conversation? I'd love to hear about your next
            project or just chat about technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "animate-slide-in-left" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6 text-balance">
              Let's work together
            </h3>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed text-pretty">
              If you would like to discuss a project or just say hi, I'm always
              down to chat.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Mail,
                  label: "Email",
                  value: "alex@example.com",
                  href: "mailto:alex@example.com",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+1 (234) 567-8900",
                  href: "tel:+1234567890",
                },
                {
                  icon: MapPin,
                  label: "Location",
                  value: "San Francisco, CA",
                  href: null,
                },
              ].map(({ icon: Icon, label, value, href }, index) => (
                <div
                  key={label}
                  className={`flex items-center gap-4 group hover:bg-accent/10 -mx-2 px-2 py-3 rounded-lg transition-all duration-300 ${
                    isVisible
                      ? `animate-fade-in animate-stagger-${index + 1}`
                      : "opacity-0"
                  }`}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 hover-glow">
                    <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-foreground hover:text-primary transition-colors duration-300 font-medium"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "animate-slide-in-right" : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="hover-lift bg-card/50 backdrop-blur-sm border-primary/30 transition-all duration-500">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        First Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("firstName")}
                        onBlur={() => setFocusedField(null)}
                        className={`border-primary/20  transition-all duration-300 ${
                          focusedField === "firstName"
                            ? "ring-2 ring-primary/50 "
                            : ""
                        } ${errors.firstName ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={
                          errors.firstName ? "firstName-error" : undefined
                        }
                      />
                      {errors.firstName && (
                        <p
                          id="firstName-error"
                          className="text-destructive text-sm mt-1"
                          role="alert"
                        >
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Last Name <span className="text-destructive">*</span>
                      </label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("lastName")}
                        onBlur={() => setFocusedField(null)}
                        className={`border-primary/20  transition-all duration-300 ${
                          focusedField === "lastName"
                            ? "ring-2 ring-primary/50 "
                            : ""
                        } ${errors.lastName ? "border-destructive" : ""}`}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={
                          errors.lastName ? "lastName-error" : undefined
                        }
                      />
                      {errors.lastName && (
                        <p
                          id="lastName-error"
                          className="text-destructive text-sm mt-1"
                          role="alert"
                        >
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={`border-primary/20  transition-all duration-300 ${
                        focusedField === "email"
                          ? "ring-2 ring-primary/50 "
                          : ""
                      } ${errors.email ? "border-destructive" : ""}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        className="text-destructive text-sm mt-1"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject <span className="text-destructive">*</span>
                    </label>
                    <Input
                      id="subject"
                      placeholder="Project inquiry"
                      value={formData.subject}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      className={`border-primary/20  transition-all duration-300 ${
                        focusedField === "subject"
                          ? "ring-2 ring-primary/50 "
                          : ""
                      } ${errors.subject ? "border-destructive" : ""}`}
                      aria-invalid={!!errors.subject}
                      aria-describedby={
                        errors.subject ? "subject-error" : undefined
                      }
                    />
                    {errors.subject && (
                      <p
                        id="subject-error"
                        className="text-destructive text-sm mt-1"
                        role="alert"
                      >
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message <span className="text-destructive">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      className={`transition-a border-primary/20  ll duration-300 resize-none ${
                        focusedField === "message"
                          ? "ring-2 ring-primary/50 "
                          : ""
                      } ${errors.message ? "border-destructive" : ""}`}
                      aria-invalid={!!errors.message}
                      aria-describedby={
                        errors.message ? "message-error" : undefined
                      }
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        className="text-destructive text-sm mt-1"
                        role="alert"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {submitStatus === "success" && (
                    <div
                      className="p-4 bg-primary/10 border border-primary/20 rounded-lg"
                      role="alert"
                    >
                      <p className="text-primary font-medium">
                        Message sent successfully! I'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {submitStatus === "error" && (
                    <div
                      className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
                      role="alert"
                    >
                      <p className="text-destructive font-medium">
                        Failed to send message. Please try again.
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground hover-glow group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
