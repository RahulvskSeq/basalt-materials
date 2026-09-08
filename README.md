# BASALT — Surface. Structure. Precision.

**Live demo: https://rahulvskseq.github.io/basalt-materials/**

Design direction 3 of 3 for the interior-materials brief (see also ARVÉRA and
KANSO). Dark architectural: near-black UI, Archivo condensed caps, JetBrains
Mono for all data, a fixed vertical navigation rail at desktop widths, and an
index-table treatment in place of card grids.

Front-end only. Cart and saved items persist in `localStorage` under a
`basalt.*` namespace so the demos never overwrite one another.

## Run it

```bash
npm install && npm run dev
```

## Deploy

```bash
npm run deploy
```

Rebuilds and force-pushes `dist/` to `gh-pages`. `scripts/postbuild.mjs`
prerenders a directory per route so deep links return a genuine 200.

## Stack

React 18 · Vite 5 · React Router 6 · Tailwind CSS 3 · Framer Motion 11 · Lucide
