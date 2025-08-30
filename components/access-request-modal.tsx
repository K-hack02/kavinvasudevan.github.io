"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Lock, Github, Loader2, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

interface AccessRequestModalProps {
  isOpen: boolean
  onClose: () => void
  projectName: string
  repositoryUrl: string
}

export function AccessRequestModal({ isOpen, onClose, projectName, repositoryUrl }: AccessRequestModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reason: "",
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
          message: `Repository Access Request for: ${projectName}\n\nRepository URL: ${repositoryUrl}\n\nReason: ${formData.reason}`,
          to_name: "Kavin Vasudevan",
          subject: `Access Request: ${projectName}`,
        },
        PUBLIC_KEY,
      )

      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setFormData({ name: "", email: "", reason: "" })
        onClose()
      }, 3000)
    } catch (err) {
      console.error("EmailJS error:", err)
      setError("Failed to send access request. Please try again.")
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
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-4 max-w-[calc(100vw-2rem)]">
          <div className="text-center py-4 sm:py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 mb-4">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Request Failed</h3>
            <p className="text-foreground/70 mb-4 text-sm sm:text-base">{error}</p>
            <Button onClick={() => setError(null)} variant="outline" className="min-h-[44px]">
              Try Again
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md mx-4 max-w-[calc(100vw-2rem)]">
          <div className="text-center py-4 sm:py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Github className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Request Submitted!</h3>
            <p className="text-foreground/70 text-sm sm:text-base">
              I'll review your access request for <strong>{projectName}</strong> and get back to you soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg mx-4 max-w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            Request Repository Access
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            <strong>{projectName}</strong> is a private repository. Please fill out this form to request access.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="access-name" className="text-primary font-medium text-sm sm:text-base">
              Name
            </Label>
            <Input
              id="access-name"
              name="name"
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-background border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors min-h-[44px] text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-email" className="text-primary font-medium text-sm sm:text-base">
              Email
            </Label>
            <Input
              id="access-email"
              name="email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-background border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors min-h-[44px] text-base"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-reason" className="text-primary font-medium text-sm sm:text-base">
              Reason for Access
            </Label>
            <Textarea
              id="access-reason"
              name="reason"
              placeholder="Please explain why you'd like access to this repository (e.g., for learning, collaboration, code review, etc.)"
              value={formData.reason}
              onChange={handleChange}
              required
              rows={4}
              className="bg-background border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors resize-none text-base min-h-[100px]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent min-h-[44px] order-2 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium transition-all duration-200 disabled:opacity-50 min-h-[44px] order-1 sm:order-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Request Access"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
