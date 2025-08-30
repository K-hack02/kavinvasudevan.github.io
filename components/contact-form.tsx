"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // This can be connected to GitHub Pages or other form handling service
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 rounded-2xl bg-card/20 dark:bg-card/80 backdrop-blur-sm border border-border/20 dark:border-border/40"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-primary font-medium">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-background dark:bg-background/95 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-background dark:bg-background/95 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-primary font-medium">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="bg-background dark:bg-background/95 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors resize-none"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Send Message
        </Button>
      </form>
    </div>
  )
}
