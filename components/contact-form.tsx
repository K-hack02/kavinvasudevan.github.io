"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import emailjs from "@emailjs/browser"

const SERVICE_ID = "service_850accq"    // process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const TEMPLATE_ID = "template_589i5am"  // process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const PUBLIC_KEY = "vx09EguFKzgFRE83C"  //process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Kavin Vasudevan",
        },
        PUBLIC_KEY,
      )

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", message: "" })
      }, 4000)
    } catch (err) {
      console.error("EmailJS error:", err)
      setError("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 sm:p-8 rounded-2xl bg-card/20 dark:bg-card/80 backdrop-blur-sm border border-border/20 dark:border-border/40">
          <div className="text-center py-4 sm:py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-destructive/10 mb-4 sm:mb-6">
              <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-destructive" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Message Failed</h3>
            <p className="text-foreground/70 text-base sm:text-lg mb-4">{error}</p>
            <Button onClick={() => setError(null)} variant="outline" className="min-h-[44px]">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="p-4 sm:p-8 rounded-2xl bg-card/20 dark:bg-card/80 backdrop-blur-sm border border-border/20 dark:border-border/40">
          <div className="text-center py-4 sm:py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 mb-4 sm:mb-6">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Message Sent!</h3>
            <p className="text-foreground/70 text-base sm:text-lg">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6 p-4 sm:p-8 rounded-2xl bg-card/20 dark:bg-card/80 backdrop-blur-sm border border-border/20 dark:border-border/40"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-primary font-medium text-sm sm:text-base">
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
            className="bg-background dark:bg-background/95 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors min-h-[44px] text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary font-medium text-sm sm:text-base">
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
            className="bg-background dark:bg-background/95 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors min-h-[44px] text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-primary font-medium text-sm sm:text-base">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Your message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="bg-background dark:bg-background/95 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors resize-none text-base min-h-[120px]"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium py-3 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 min-h-[48px] text-base"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  )
}
