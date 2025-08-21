# Portfolio Starter (HTML + CSS + JS)

A minimal, cybersecurity-themed portfolio ready for **GitHub + Netlify/Vercel**.

## 1) Edit your info
- Open `index.html` and update:
  - Resume link (`assets/Resume.pdf`)
  - Email address (`you@example.com`)
  - GitHub username in `script.js` (set `GH_USERNAME`)
  - Project links in the Projects section
- Replace `assets/favicon.png` (optional) and `assets/Resume.pdf` (optional).

## 2) Run locally
Just open `index.html` in your browser. No build tools required.

## 3) Git & GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio-website.git
git push -u origin main
```

## 4) Deploy
### Netlify
- Create account → **New site from Git** → pick your repo → Deploy (no build command).
- Forms work automatically thanks to `data-netlify="true"`.

### Vercel
- Create account → **New Project** → import your GitHub repo → Deploy.
- For contact forms on Vercel, use a service like **Formspree** or keep the `mailto:` link.

## 5) Customize further
- Add more projects as `<article class="card">` items.
- Edit colors in `:root` CSS variables.
- Replace fonts by editing the Google Fonts link in `index.html`.
