# Design Brief: Real Multiplayer Racer

## Tone & Purpose
Futuristic neon arcade racing game. Dark, high-energy maximalism with precision control and visual feedback. Fast-paced, arcade-style gameplay with bold neon accents against dark navy background.

## Color Palette (OKLCH)
| Token | Purpose | OKLCH | HEX Ref |
|-------|---------|-------|---------|
| Background | Dark navy game canvas | 0.15 0.15 300 | #0D1B2A |
| Primary | Neon orange, CTAs, highlights | 0.60 0.20 30 | #FF6B2B |
| Secondary | Neon teal, fuel bars, status | 0.65 0.20 175 | #00D4AA |
| Accent | Gold coins, score | 0.80 0.15 90 | #FFD700 |
| Foreground | White text, high contrast | 0.95 0.02 300 | #FFFFFF |
| Border | Dark road/UI dividers | 0.28 0.10 300 | #1E2D40 |
| Destructive | Red crash warning | 0.55 0.22 25 | #E63946 |

## Typography
| Layer | Font | Usage | Weight |
|-------|------|-------|--------|
| Display | Space Grotesk | Titles, scores, HUD labels | 700 Bold |
| Body | Plus Jakarta Sans | UI labels, descriptions | 400–700 |
| Mono | JetBrains Mono | Debug/technical info (if needed) | 400–700 |

## Structural Zones
| Zone | Background | Border | Notes |
|------|-----------|--------|-------|
| Game Canvas | Dark navy (var(--background)) | None | Full-screen gameplay area, road scrolls vertically |
| HUD Overlay | Transparent/0.05 dark card | Neon glow (var(--secondary)) | Score, fuel, time — top and bottom safe areas |
| Menu Cards | 0.22 dark card (var(--card)) | Neon border (var(--primary)) | Semi-transparent, slight glow, rounded-lg |
| Buttons | Primary or secondary OKLCH | Neon glow on hover | arcade-button utility, high contrast text |

## Spacing & Density
- Tight arcade UI: 8px/16px gaps, 12px padding on buttons
- Full-bleed game canvas: no margins, safe zones only for HUD
- Cards: 16px–24px internal padding, 20px border-radius

## Elevation & Depth
- No soft shadows; all shadows are neon glows
- Glow utilities: `.glow-primary`, `.glow-secondary`, `.glow-accent` for neon depth
- Inset glows for button/input focus states: `.neon-border-primary`, `.neon-border-secondary`

## Component Patterns
- **Buttons**: `.arcade-button` + glow on hover/active. No rounded-full.
- **Inputs**: `.neon-border-secondary`, dark background, high contrast text
- **Cards**: `var(--card)` background, rounded-lg, `.neon-border-primary` for interactive cards
- **Score Bubbles**: `.glow-accent`, centered text, float animation
- **Fuel Bar**: `.neon-border-secondary` container, gradient fill (secondary OKLCH 0–100%)
- **HUD Elements**: Semi-transparent overlays, no drop shadows, neon glow only

## Motion & Animation
- **Transition**: `.transition-smooth` (0.3s cubic-bezier) for UI interactions
- **Glow Animation**: `.animate-glow` (2s pulse opacity)
- **Float**: `.animate-float` (coin/score particles, 3s ease)
- **Spin**: `.animate-spin` (power-up icons, 1s linear)
- **Bounce**: `.animate-bounce` (active button feedback)
- Car engine sound visualizer: pulse on HUD
- Boost flame trail: rainbow gradient with fade

## Signature Detail
Neon glow effects on all interactive elements. Rainbow glow trails behind boosting cars. Semi-transparent cards with strong neon borders. No soft shadows—all depth via colored glows and layered opacity.

## Constraints
- No generic shadows; all depth via OKLCH glow tokens
- No color outside primary/secondary/accent/destructive palette
- Fonts: Space Grotesk + Plus Jakarta Sans only (no system fallbacks in game UI)
- Game canvas: full viewport, safe zone HUD positioning
- Mobile-first responsive (Tailwind sm/md/lg breakpoints)

## Assets Copied
- SpaceGrotesk.woff2 → /src/frontend/public/assets/fonts/
- PlusJakartaSans.woff2 → /src/frontend/public/assets/fonts/
- JetBrainsMono.woff2 → /src/frontend/public/assets/fonts/
