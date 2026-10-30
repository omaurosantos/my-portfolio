/* =========================================
   TEMA — dark (primário) / light toggle
   ========================================= */
const root = document.documentElement;

// Lê preferência salva; padrão é dark
let savedTheme = 'dark';
try { savedTheme = localStorage.getItem('theme') || 'dark'; } catch (e) {}
root.setAttribute('data-theme', savedTheme);

document.getElementById('theme-toggle').addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

/* =========================================
   NAVBAR — scroll effect
   ========================================= */
const navbar = document.getElementById('navbar');

const updateNavbarState = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 16);
};

/* =========================================
   MOBILE MENU — toggle
   ========================================= */
const toggle = document.getElementById('nav-toggle');
const menu   = document.getElementById('nav-menu');
const projectsDropdown = document.querySelector('.nav-dropdown');
const projectsToggle = document.getElementById('projects-toggle');
const projectSectionIds = ['projetos', 'cases', 'pessoais'];

const closeProjectsDropdown = () => {
  if (!projectsDropdown || !projectsToggle) return;
  projectsDropdown.classList.remove('open');
  projectsToggle.setAttribute('aria-expanded', 'false');
};

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', isOpen);
  toggle.setAttribute('aria-label', i18n.t(isOpen ? 'Fechar menu' : 'Abrir menu'));
});

projectsToggle.addEventListener('click', () => {
  const isOpen = projectsDropdown.classList.toggle('open');
  projectsToggle.setAttribute('aria-expanded', isOpen);
});

const closeMobileMenu = () => {
  menu.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', i18n.t('Abrir menu'));
};

// Escape fecha dropdown e menu mobile, devolvendo o foco ao botão correspondente
navbar.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  const dropdownOpen = projectsDropdown.classList.contains('open');
  const menuOpen = menu.classList.contains('open');
  if (!dropdownOpen && !menuOpen) return;
  closeProjectsDropdown();
  if (dropdownOpen && projectsDropdown.contains(document.activeElement)) projectsToggle.focus();
  if (menuOpen) {
    closeMobileMenu();
    toggle.focus();
  }
});

// Close on nav link click
menu.querySelectorAll('.nav-link, .nav-dropdown__link').forEach(link => {
  link.addEventListener('click', () => {
    if (link === projectsToggle) return;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', i18n.t('Abrir menu'));
    closeProjectsDropdown();
  });
});

// Close on outside click
document.addEventListener('click', e => {
  if (!navbar.contains(e.target)) {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', i18n.t('Abrir menu'));
    closeProjectsDropdown();
  }
});

/* =========================================
   ACTIVE NAV LINK — highlight on scroll
   ========================================= */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const projectLinks = document.querySelectorAll('.nav-dropdown__link');

const updateActiveNav = () => {
  const navHeight = navbar.offsetHeight || 0;
  const activeLine = window.scrollY + navHeight + 32;
  let activeId = sections[0]?.id;

  sections.forEach(section => {
    if (section.offsetTop <= activeLine) {
      activeId = section.id;
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isProjectsToggle = link === projectsToggle;
    link.classList.toggle('active',
      href === `#${activeId}` || (isProjectsToggle && projectSectionIds.includes(activeId))
    );
  });

  projectLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
  });
};

window.addEventListener('scroll', () => {
  updateNavbarState();
  updateActiveNav();
}, { passive: true });
window.addEventListener('resize', updateActiveNav);
updateNavbarState();
updateActiveNav();

/* =========================================
   IDIOMA — atualiza rótulos dinâmicos
   ========================================= */
const updateMenuLabel = () => {
  const isOpen = menu.classList.contains('open');
  toggle.setAttribute('aria-label', i18n.t(isOpen ? 'Fechar menu' : 'Abrir menu'));
};

document.addEventListener('langchange', updateMenuLabel);
updateMenuLabel(); // o i18n.js roda antes e já pode ter trocado para EN
