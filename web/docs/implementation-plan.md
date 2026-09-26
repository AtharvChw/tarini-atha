# Implementation Plan

## Stack
- Vite + React + TypeScript + Tailwind CSS v4 + BrowserRouter; SPA fallback via public/_redirects.

## Data
- Supabase-ready with local fallback catalogue data.

## Routes
- / (home), /collections/:slug, /product/:slug, /weave, /journal, /stores, /contact, /checkout, /policies.

## Catalogue
- 3 collections, 12 products.

## Deploy (Cloudflare Pages)
- Build command: npm run build. Output directory: dist. Env vars per .env.example.

## Run
- npm install
- npm run dev
- npm run build
