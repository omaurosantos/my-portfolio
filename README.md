# Portfólio — Mauro Santos

Portfólio pessoal de **Mauro Santos**, Product Owner com base técnica, com foco em discovery, dados e entrega de valor. Originado como portfólio da Fatec Jacareí (Desenvolvimento de Software Multiplataforma).

🔗 **Site:** https://omaurosantos.github.io/my-portfolio/

## Stack

HTML, CSS e JavaScript puros, sem build nem dependências.

- Tema claro/escuro com preferência salva em `localStorage`
- Animações de entrada com `IntersectionObserver` (respeita `prefers-reduced-motion`)
- Menu responsivo com dropdown de projetos

## Estrutura

```
docs/
├── index.html      # página única
├── css/styles.css
├── js/script.js
├── assets/         # favicon, foto, imagem Open Graph
├── robots.txt
└── sitemap.xml
```

## Rodando localmente

```bash
python -m http.server 8000 --directory docs
```

Depois abra http://localhost:8000.

## Deploy

GitHub Pages, publicando a pasta `/docs` da branch `main` (Settings → Pages).

## Vídeos de apresentação (Fatec)

- 2DSM — vídeo (ainda não era necessário construir o portfólio)
- 4DSM — [vídeo](https://www.youtube.com/watch?v=k0f10wmbGcw)
- 6DSM — [vídeo](https://youtu.be/pbHSSaS2Ffw?is=jgUdo4OCJuAWC6ui)
