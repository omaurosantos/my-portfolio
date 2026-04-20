# Contexto do Projeto — Portfólio Mauro Santos

Documento de referência para IAs e colaboradores. Descreve o que é o projeto, como está estruturado, quais decisões foram tomadas e o estado atual.

---

## O que é

Site de portfólio pessoal de **Mauro Santos, Product Analyst**. Site estático puro (HTML + CSS + JS vanilla), sem frameworks, sem build step, publicável diretamente no GitHub Pages a partir da pasta `docs/`.

**Público-alvo:** recrutadores e times de produto que avaliam candidatos.  
**Objetivo principal:** mostrar capacidade analítica e de produto através de cases reais com impacto mensurável.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Markup | HTML5 semântico (`<section>`, `<article>`, `<time>`, `<nav>`, `<main>`) |
| Estilo | CSS puro com custom properties (sem pré-processador) |
| Script | JavaScript vanilla (ES6+, sem dependências) |
| Fontes | Google Fonts — Fraunces (display serif) + Inter (body sans) |
| Deploy | GitHub Pages — serve diretamente de `docs/` |

---

## Estrutura de arquivos

```
ra2581392323009/
├── docs/                        ← raiz publicada no GitHub Pages
│   ├── index.html               ← única página (SPA estático)
│   ├── assets/
│   │   └── profile_photo.png    ← foto de perfil do hero
│   ├── css/
│   │   └── styles.css           ← todo o CSS (~1300 linhas)
│   ├── js/
│   │   └── script.js            ← todo o JS (~115 linhas)
│   └── .claude/
│       └── launch.json          ← config do servidor de preview (npx serve)
├── CONTEXT.md                   ← este arquivo
└── README.md                    ← instruções de deploy
```

---

## Design System

### Paleta — Light Mode (padrão CSS)

```css
--bg:         #F3F5FA   /* fundo principal */
--bg-surface: #FFFFFF   /* cards e superfícies */
--bg-alt:     #E4EAF5   /* seções alternadas */
--text-900:   #111827   /* títulos */
--text-600:   #4B5563   /* corpo */
--text-400:   #9CA3AF   /* secundário / placeholder */
--accent:     #2B63D9   /* azul frio principal */
--accent-dim: #EBF1FD   /* fundo azul suave */
--border:     #DDE2EF
```

### Paleta — Dark Mode (`[data-theme="dark"]`)

```css
--bg:         #0D1117
--bg-surface: #161B27
--bg-alt:     #121720
--text-900:   #E2E8F4
--text-600:   #9AABC4
--text-400:   #6B7A92
--accent:     #5B8DEF   /* azul mais brilhante para fundo escuro */
--accent-dim: #172040
--border:     #1E2A3E
```

### Categorias de skill (tokens separados)

```css
--prod-color / --prod-bg   /* Produto — azul */
--neg-color  / --neg-bg    /* Negócio & Colaboração — verde */
--tech-color / --tech-bg   /* Base Técnica — âmbar */
```

### Tipografia

- **Display:** Fraunces (variable serif, 300–700) → títulos, hero name, card names
- **Body:** Inter (400/500/600) → tudo mais
- Hierarquia: `section-label` (11px, caps, letter-spacing) → `section-title` (clamp serif) → body text

### Raios, sombras, espaçamento

```css
--r-sm: 8px  |  --r: 12px  |  --r-lg: 20px
--s-sm / --s-md / --s-lg   /* escalam com o contexto */
--sec-py: 96px             /* padding vertical das seções */
--wrap: 1100px             /* max-width do container */
--nav-h: 64px              /* altura da navbar */
```

---

## Seções da página (ordem no DOM)

| ID | Título | Conteúdo |
|----|--------|----------|
| `#hero` | — | Nome, cargo, tagline, CTAs, social links, foto |
| `#sobre` | Produto com visão de negócio e base técnica | Bio em 2 parágrafos + 2 info-cards (Fatec + PM3) |
| `#experiencia` | Trajetória profissional | 3 itens: Product Analyst (Qeevo/atual), IT Analyst + IT Intern agrupados sob GasGas Motorcycles |
| `#projetos` | Projetos da graduação | Featured card Mentora + card horizontal floatData |
| `#cases` | Impacto real | 2 case cards: Cross Sell pós-compra (+50% receita) e Automação de reembolso (35→15 dias) |
| `#skills` | Ferramentas e práticas | 3 categorias: Produto, Negócio & Colaboração, Base Técnica |
| `#contato` | Vamos conversar? | 3 botões (e-mail, LinkedIn, GitHub) + email clicável em monospace |

---

## Funcionalidades do JavaScript

### 1. Tema dark/light
- **Dark é o modo primário.** Default para novos visitantes.
- Toggle via botão ☀️/🌙 na navbar.
- Preferência persistida em `localStorage` com chave `'theme'`.
- Anti-FOUC: inline script no `<head>` aplica o tema antes do primeiro paint.
- Alternância: `data-theme="dark"` ou `data-theme="light"` no `<html>`.

### 2. Navbar scroll
- Ao rolar > 16px, adiciona classe `.scrolled` → backdrop-filter blur + border + shadow.

### 3. Menu mobile
- Hamburger button togla classe `.open` no `<ul.nav-menu>` e `aria-expanded` no botão.
- Fecha ao clicar em link ou fora do menu.

### 4. Active nav link
- `IntersectionObserver` com threshold 0.35 detecta qual seção está visível.
- Aplica classe `.active` ao link correspondente no nav.

### 5. Scroll reveal
- Classe `.reveal` em elementos → opacidade 0 e `translateY(24px)` por padrão.
- `IntersectionObserver` adiciona `.visible` quando elemento entra na viewport.
- Stagger automático (75ms entre irmãos) em containers: `.sobre-cards`, `.timeline`, `.projects-grid`, `.skills-grid`, `.contact-inner`.
- Respeita `prefers-reduced-motion`: mostra tudo imediatamente se ativado.

---

## Decisões de arquitetura

### Sem framework
Escolha deliberada: site estático simples, zero dependências, deploy instantâneo no GitHub Pages, sem build step. Performance máxima, manutenção trivial.

### CSS custom properties como design tokens
Toda a paleta vive em `:root`. O dark mode sobrescreve apenas o bloco `[data-theme="dark"]` — os componentes usam as variáveis e adaptam automaticamente. Exceções (cores hardcoded em alguns componentes) são tratadas com overrides específicos no bloco de dark mode no final do CSS.

### Navbar com `nav-end` wrapper
O container `div.nav-end` agrupa `nav-menu`, `.theme-toggle` e `nav-toggle` (hamburger) como bloco à direita do nav. O menu mobile usa `position: absolute` relativo ao `navbar` (fixed), independentemente do wrapper.

### Timeline agrupada por empresa
IT Analyst e IT Intern na GasGas Motorcycles são agrupados em `div.timeline-group` com o nome da empresa uma vez só como cabeçalho, evitando repetição visual.

### Foto escondida no mobile
A foto do hero tem fundo escuro; em telas ≤ 600px fica visualmente ruim. Solução: `display: none` via media query. Em tablet (600–860px) aparece centralizada abaixo do texto.

### Cases separados de Projetos
- **Projetos** = acadêmicos (Fatec): Mentora (featured) + floatData (card horizontal)
- **Cases** = profissionais com impacto real: estrutura Contexto / Problema / Solução / Impacto

---

## Componentes CSS principais

| Classe | Descrição |
|--------|-----------|
| `.hero-layout` | Flexbox com foto à direita (desktop) / coluna (tablet) / sem foto (mobile) |
| `.project-featured` | Card grande com badge de destaque e layout interno em duas colunas |
| `.project-card-h` | Card horizontal em grid 2 colunas (floatData); empilha em mobile |
| `.case-card` | Card de case com linha gradiente no topo, grid 2x2 de campos |
| `.case-field--impact` | Campo de impacto destacado em `--accent-dim` (azul) |
| `.timeline-group` | Wrapper de empresa com `.timeline-item--sub` filhos |
| `.skills-cat` | Categoria de skill com header colorido por categoria |
| `.skill-pill--{cat}` | Pill colorida por categoria (produto/negocio/tech) |
| `.theme-toggle` | Botão ☀️/🌙 — `.icon-sun` visível em dark, `.icon-moon` em light |
| `.social-link` | 44×44px (WCAG touch target) com ícone SVG |
| `.contact-email` | Link `mailto:` estilizado em Courier New, fundo branco, hover azul |

---

## Conteúdo atual

**Pessoa:** Mauro Santos  
**Cargo:** Product Analyst  
**Tagline:** "PM que lê código, escreve SQL e faz as perguntas que a maioria evita."  
**E-mail:** maurodopradosantos@gmail.com  
**LinkedIn:** linkedin.com/in/omaurosantos  
**GitHub:** github.com/omaurosantos

**Experiências:**
1. Product Analyst — Qeevo Group / Quero Educação (ago/2025–atual)
2. IT Analyst — GasGas Motorcycles (fev/2024–ago/2025)
3. IT Intern — GasGas Motorcycles (nov/2023–fev/2024)

**Formação:**
- Desenvolvimento de Software Multiplataforma — Fatec Jacareí (ago/2023–jun/2026)
- Product Management — PM3 · 70 horas

**Cases:**
1. Cross Sell de pós-compra → +50% receita incremental
2. Automação do fluxo de reembolso → 35 → 15 dias

---

## Como rodar localmente

```bash
# Via npx (recomendado — mesmo config do preview)
npx serve docs -p 3457

# Via Python
python3 -m http.server 3000 --directory docs
```

O arquivo `.claude/launch.json` dentro de `docs/` configura o servidor de preview para ferramentas de IA.

---

## O que NÃO existe (decisões explícitas de não fazer)

- ❌ Framework JS (React, Vue, etc.)
- ❌ Build step (Webpack, Vite, etc.)
- ❌ CSS pré-processador (Sass, Less)
- ❌ Biblioteca de componentes
- ❌ Backend ou CMS
- ❌ Formulário de contato funcional (apenas links mailto/LinkedIn)
- ❌ Analytics (nenhum tracker instalado)
- ❌ Múltiplas páginas (tudo em `index.html`)
