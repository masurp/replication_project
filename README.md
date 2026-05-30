# GIRCS — Global Initiative for Replication in Communication Science

A static website for the Global Initiative for Replication in Communication Science, showcasing our multilab replication studies in communication science.

## Overview

GIRCS coordinates large-scale, preregistered replication studies targeting landmark findings in communication research. This website serves as the hub for our projects, member information, and collaborative network.

## Features

- **Multi-page static site** — HTML, CSS, and JavaScript served as-is (no build process)
- **Responsive design** — Mobile-first approach with fluid typography using CSS `clamp()`
- **Network visualization** — SVG-based interactive visualization of partner labs and institutions
- **Theme customization** — User can select color palettes (indigo, teal, navy) and heading fonts
- **Member profiles** — Team member bios with photos and institutional affiliations
- **Project documentation** — Detailed project pages with research questions, timelines, and outputs

## Pages

- **Home** (`index.html`) — Overview, featured projects, and partner network
- **Members** (`members.html`) — Founding members and community collaborators
- **Projects** (`projects.html`) — Active and completed replication studies
- **Contact** (`contact.html`) — Get in touch and collaboration opportunities
- **Join** (`become-a-member.html`) — Information about joining GIRCS

## Architecture

### Shared Resources
All pages import the same stylesheet and JavaScript bundle for consistency:
- `style.css` — Design system with CSS custom properties
- `main.js` — Navigation, theme customization, and interactivity

### Design System
The site uses a centralized design system based on CSS custom properties:
- **Colors** — Primary indigo palette with gold accents, optional theme variations
- **Typography** — Responsive heading sizes using `clamp()`, custom serif and sans-serif fonts
- **Spacing** — Consistent scale from `--sp-xs` to `--sp-2xl`
- **Shadows** — Three-tier pattern for subtle to prominent elevation

### Navigation
- Sticky navigation with transparency over the home hero section
- Mobile hamburger menu with click-outside close
- Active page indicator using `data-nav` attributes
- Persistent across all pages

## Development

### Making Changes

**Adding a new page:**
1. Create new HTML file with same `<nav>` and mobile menu structure
2. Link `style.css` and `main.js`
3. Add link to new page in all nav sections across all pages
4. Use `data-nav` attribute on the new page's nav link

**Styling:**
- Use CSS custom properties instead of hardcoding values
- Respect the `--max-w` constraint (1160px) for content width
- Keep typography responsive with `clamp()`

**Colors:**
- Primary theme uses `--c-primary`, accent uses `--c-gold`
- Built-in palettes: indigo, teal, navy
- Custom palettes can be added via `main.js` tweaks system

### Browser Support
- Modern browsers with CSS custom properties support
- No IE11 support
- Requires `localStorage` for theme persistence

## Access

**Password Protected:** During development, the site is protected with a password prompt (stored in `sessionStorage` per session).

## License

© 2026 The Global Initiative for Replication in Communication Science
