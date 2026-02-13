# KodNest Premium Build System — Design System

Design philosophy
- Calm, Intentional, Coherent, Confident
- Limited palette and restrained typography
- No gradients, no glassmorphism, no neon, minimal motion

Color system
- Background: #F7F6F3
- Primary text: #111111
- Accent: #8B0000
- Success: muted green (used sparingly)
- Warning: muted amber (used sparingly)
- Use maximum 4 colors across the system (background, primary text, accent, supportive semantic colors)

Typography
- Headings: Serif (`Merriweather`), confident sizes, generous spacing
- Body: Sans-serif (`Inter`), 16–18px base, line-height 1.6–1.8, max-width 720px for text blocks

Spacing scale
- 8px, 16px, 24px, 40px, 64px

Global layout
Every page follows: [Top Bar] → [Context Header] → [Primary Workspace + Secondary Panel] → [Proof Footer]

Component rules
- Primary button: solid deep red
- Secondary button: outlined
- Inputs: clean borders, clear focus state, no heavy shadows
- Cards: subtle border, balanced padding
- Transitions: 150–200ms, ease-in-out

Usage
- Import `src/index.css` in the app entry (already configured).
- Prefer CSS classes from `src/design-system/components.css` for visual consistency.
- Keep inline styles to a minimum. Use tokens (CSS variables) for colors, spacing, and typography.

Developer notes
- Keep the palette intentional: do not introduce extra colors.
- Respect spacing scale; avoid arbitrary pixel values.
- For new components, follow the patterns and add tokens to `index.css` if needed.
