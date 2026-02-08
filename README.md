# Valentine Link App 💘

Simple deployable prank/proposal app.

## What it does
- Page 1 (`/`): enter your name + valentine name, generate shareable link
- Page 2 (`/ask`): shows "Will you be my Valentine?"
  - **Yes** works
  - **No** dodges cursor/tap and keeps moving

## Run locally

```bash
cd valentine-link-app
npx serve .
```

Open the printed localhost URL.

## Deploy on Vercel

### Option A: GitHub import
1. Push this folder to GitHub
2. In Vercel, **Add New Project** → import repo
3. Framework preset: **Other**
4. Deploy (no env vars needed)

### Option B: Vercel CLI
```bash
npm i -g vercel
cd valentine-link-app
vercel
```

## Quick customization
- Edit text/styles directly in `index.html` and `ask.html`
- Change result lines in `ask.html` script section
