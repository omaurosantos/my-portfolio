# Mauro Santos — Portfólio Pessoal

Site estático em HTML/CSS/JS puro, publicável diretamente no GitHub Pages.

## Desenvolvimento local

Qualquer servidor estático funciona:

```bash
# Python (sem instalação)
python3 -m http.server 3000

# Node.js
npx serve .

```

Acesse `http://localhost:3000`

## SEO e indexação

Arquivos publicados para GitHub Pages:

- `docs/sitemap.xml`
- `docs/robots.txt`

Metadados configurados em `docs/index.html`:

- canonical
- Open Graph (`og:url`, `og:image`)
- Twitter Cards
- JSON-LD (`schema.org/Person`)

Validação rápida após deploy:

- `https://omaurosantos.github.io/my-portfolio/sitemap.xml`
- `https://omaurosantos.github.io/my-portfolio/robots.txt`
- LinkedIn Post Inspector para prévia social
- Google Search Console para enviar sitemap e acompanhar cobertura
