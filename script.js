// Cabeçalho sólido quando o hero sai da tela (sem listener de scroll)
const nav = document.querySelector(".nav");
const sentinel = document.querySelector(".hero__sentinel");
if (sentinel && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => {
    nav.classList.toggle("is-solid", entry.boundingClientRect.top < 72);
  }, { rootMargin: "-72px 0px 0px 0px" }).observe(sentinel);
} else {
  nav.classList.add("is-solid");
}

// Menu mobile
const toggle = document.querySelector(".nav__toggle");
const mobile = document.getElementById("menu-mobile");
const icon = toggle.querySelector("i");
const setMenu = (open) => {
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  icon.className = open ? "ph ph-x" : "ph ph-list";
  mobile.hidden = !open;
  nav.classList.toggle("menu-open", open);
};
toggle.addEventListener("click", () => setMenu(mobile.hidden));
mobile.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

// Entrada dos elementos ao aparecer na tela
const items = document.querySelectorAll(".reveal");
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && "IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const siblings = [...entry.target.parentElement.children].filter((el) => el.classList.contains("reveal"));
      entry.target.style.transitionDelay = `${Math.min(siblings.indexOf(entry.target), 5) * 70}ms`;
      entry.target.classList.add("is-in");
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  items.forEach((el) => io.observe(el));
} else {
  items.forEach((el) => el.classList.add("is-in"));
}

// FAQ: uma pergunta aberta por vez
const faqs = document.querySelectorAll(".faq details");
faqs.forEach((d) => d.addEventListener("toggle", () => {
  if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
}));

document.getElementById("ano").textContent = new Date().getFullYear();
