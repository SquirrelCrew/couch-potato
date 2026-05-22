# 🥔 Couch Potato

Ein charmanter, interaktiver Freizeitaktivitäts-Konfigurator. Nicht ganz ernst gemeint, aber voll funktionsfähig.

Die App führt dich Schritt für Schritt durch Fragen zu deiner Stimmung, Energie und Situation — und schlägt am Ende eine kreative Freizeitaktivität vor. Powered by LLM.

## Features

- 🎨 Minimalistisches, verspieltes Design im Zine-Stil
- 🥔 Begleitung durch die charmante Couch-Potato
- 📱 Mobile-first mit smooth Animationen (Framer Motion)
- 🧠 KI-generierte Aktivitätsvorschläge via OpenRouter API
- 🔒 API-Key bleibt lokal im Browser (localStorage)
- 🚀 Static Site — kein Backend nötig

## Tech Stack

- React + Vite
- Framer Motion
- OpenRouter API (anthropic/claude-sonnet-4.6)

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Deployed via GitHub Pages. Push to `main` triggers automatic deployment.

## API Key

Du brauchst einen [OpenRouter API-Key](https://openrouter.ai/keys). Der Key wird nur lokal in deinem Browser gespeichert und nie an Dritte übermittelt.
