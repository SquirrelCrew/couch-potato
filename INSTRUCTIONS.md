# Project Requirements: couch-potato

This file serves as the source of truth for all requirements and constraints provided by the user.

## Collected Requirements

### Overview
- **Name:** Couch Potato – Webbasierter Freizeitaktivitäts-Konfigurator
- **Type:** Static web app (no backend), deployable on GitHub Pages
- **Organization:** SquirrelCrew
- **Purpose:** Step-by-step mood/energy quiz that suggests creative leisure activities via LLM

### Companion Character
- Cartoon potato with minimalistic smiley face, small arms and legs
- Calls itself "Couch Potato"
- Guides user through the experience with humor

### Visual Design
- Minimalist, charming, slightly absurd
- Lots of whitespace
- Hand-drawn characters / doodles aesthetic
- Slightly quirky, humorous language (German)
- Editorial / Zine aesthetic
- Mix of: indie web design, art installation, personality quiz, Nintendo/playful UI
- Large typography, very reduced color palette
- Soft animations, organic lines
- Card-like screens, mobile-first, touch-friendly
- Smooth, premium-feeling transitions

### User Flow (Screens)
1. **API Key Input** – Ask for OpenRouter API key (stored in localStorage)
2. **1A: Grundrichtung** – "Wohin?" → Raus / Rein
3. **1B: Couch-Potato Intro** – Character introduces itself (info only)
4. **2: Social Battery** – 0 (Leer) to 3 (Voll), visualized as humorous battery
5. **3: Körperposition** – Stehen / Liegen / Sitzen / Gehen / Kopfstand / Fliegen (illustrated with potato)
6. **4: Verfügbare Zeit** – Vertical scrollable timeline from 5 minutes to 10 years (10+ screen heights)
7. **5: Stimmung/Mood** – 4 sliders: faul↔abenteuerlustig, kreativ↔berieselungsfreudig, hungrig↔übersättigt, ausbalanciert↔wirbelig
8. **6: Überraschungsmodus** – "Bock auf Mystery?" Ja/Nein
9. **Result Screen** – LLM-generated activity suggestion

### Navigation
- Bottom nav: two arrow buttons (left=back, right=forward)
- Progress indicator using small potato graphics

### Result Screen Contents
- Main suggestion (concrete leisure activity)
- Why this was suggested
- Mood tag
- Estimated duration
- Energy level
- Indoor/Outdoor
- Solo/Group
- "Alternative Vorschläge" button
- "Nochmal von vorne" button

### Technical Stack
- React (with Vite)
- Framer Motion for animations
- Responsive, mobile-first
- Component-based architecture
- Very performant UI
- No accessibility requirements specified

### AI/LLM Integration
- OpenRouter API with model: `anthropic/claude-sonnet-4.6`
- User provides their own API key (stored in localStorage, never committed)
- Prompt includes all 6 user parameters
- Suggestions should be: human-feeling, creative, non-generic, sometimes slightly absurd, but realistic

### Key Principle
- Must NOT feel like a product configurator
- Should feel like: a charming interactive art object, a digital walk through one's mood, with a mood companion
