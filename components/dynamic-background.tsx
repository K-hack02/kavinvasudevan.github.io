"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DynamicBackground() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  const backgroundImage = theme === "dark" ? "images/dark-mountain.jpg" : "images/light-sunrise.jpg"
  const opacity = theme === "dark" ? 0.8 : 0.9

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute w-full bg-center bg-no-repeat"
        style={{
          top: 0,
          left: 0,
          height: isMobile ? "600vh" : "400vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: isMobile ? "cover" : "contain",
          backgroundPosition: isMobile ? "center center" : "center top",
          transform: `translate3d(0, ${scrollY * (isMobile ? -0.05 : -0.15)}px, 0)`,
          opacity: opacity,
          willChange: "transform",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/30" />
    </div>
  )
}
