# Personal Website

[![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-black?style=for-the-badge&logo=github)](https://k-hack02.github.io/)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/)

## Overview

This repository hosts the source code for my personal website, designed to showcase my experience, projects, and skills.  
The site was initially built with [v0.app](https://v0.app) and extended with custom React, Next.js, and Tailwind CSS components.  
It is fully responsive, mobile-friendly, and deployed using **GitHub Pages**.

## Features

- **Dynamic Background**:  
  Light and dark mode themed parallax backgrounds with smooth scrolling, sourced from Pixabay:  
  - [Sunset Mountains](https://pixabay.com/photos/sunset-mountains-forest-fog-nature-6369825/)  
  - [Night City](https://pixabay.com/photos/building-night-city-long-exposure-7185822/)

- **EmailJS Integration**:  
  - Contact form and repository access requests are powered by [EmailJS](https://www.emailjs.com/).  
  - Messages and access requests are delivered directly via email with error handling and success states.

- **Project Portfolio**:  
  - Interactive project cards with technology badges.  
  - Private repositories can be requested via an integrated modal form.  
  - Public repositories link directly to GitHub.

- **Navigation & Responsiveness**:  
  - Mobile-first design with smooth scrolling and sticky navigation.  
  - Adaptive theme with light/dark toggle powered by `next-themes`.  
  - Mobile drawer menu for small screens.

- **Custom Theming**:  
  - Tailwind CSS with custom color palettes and animations.  
  - Gradient overlays and animations for smooth UI experience.

- **Skills & Experience Sections**:  
  - Structured cards to highlight education, work experience, and technical skills.

## Tools & Technologies

- **Frontend**: React, Next.js, TypeScript, Tailwind CSS, shadcn/ui, Lucide Icons  
- **Frameworks**: v0.app for initial scaffolding, Next.js 15 for production  
- **Integrations**: EmailJS (contact and access requests)  
- **Styling**: Tailwind with custom global themes and parallax animations  
- **Deployment**: GitHub Pages via GitHub Actions

## Deployment

The website is deployed at:

**[https://k-hack02.github.io/kavinvasudevan.github.io/](https://k-hack02.github.io/kavinvasudevan.github.io/)**

## Local Development

To run locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:3000` to view the site locally.

---

© 2025 Kavin Vasudevan. All rights reserved.
