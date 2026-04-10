const root = document.documentElement;
const storageKey = "portfolio-theme";

const getPreferredTheme = () => {
  const savedTheme = localStorage.getItem(storageKey);

  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const updateToggleUi = (theme) => {
  const buttons = document.querySelectorAll("[data-theme-toggle]");

  buttons.forEach((button) => {
    const label = button.querySelector("[data-theme-toggle-label]");
    const icon = button.querySelector("[data-theme-toggle-icon]");
    const isDark = theme === "dark";

    button.setAttribute("aria-pressed", String(isDark));

    if (label) {
      label.textContent = isDark ? "Modo claro" : "Modo escuro";
    }

    if (icon) {
      icon.innerHTML = isDark
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
    }
  });
};

const applyTheme = (theme) => {
  root.setAttribute("data-theme", theme);
  localStorage.setItem(storageKey, theme);
  updateToggleUi(theme);
};

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getPreferredTheme());

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextTheme =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";

      applyTheme(nextTheme);
    });
  });
});
