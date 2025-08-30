"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Lock, Github } from "lucide-react"

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create access request data
    const accessRequest = {
      type: "repository_access_request",
      project: projectName,
      repository: repositoryUrl,
      requester: formData,
      timestamp: new Date().toISOString(),
    }

    // This can be connected to your preferred form handling service
    console.log("Access request submitted:", accessRequest)

    setIsSubmitted(true)

    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", reason: "" })
      onClose()
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
              <Github className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Request Submitted!</h3>
            <p className="text-foreground/70">
              I'll review your access request for <strong>{projectName}</strong> and get back to you soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            Request Repository Access
          </DialogTitle>
          <DialogDescription>
            <strong>{projectName}</strong> is a private repository. Please fill out this form to request access.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="access-name" className="text-primary font-medium">
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
              className="bg-background border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-email" className="text-primary font-medium">
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
              className="bg-background border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="access-reason" className="text-primary font-medium">
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
              className="bg-background border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 transition-colors resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium transition-all duration-200"
            >
              Request Access
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
