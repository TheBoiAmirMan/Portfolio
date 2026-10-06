"use strict";

const themeButton = document.getElementById("theme-toggle");
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const next = theme === "dark" ? "روشن" : "تیره";
  themeButton.setAttribute("aria-label", `فعال کردن حالت ${next}`);
  themeButton.title = `حالت ${next}`;
  document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#111211" : "#fafaf7";
}
applyTheme(document.documentElement.dataset.theme);
themeButton.addEventListener("click", () => {
  const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try { localStorage.setItem("portfolio-theme", theme); } catch {}
});

const words = [...document.querySelectorAll(".role-word")];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let wordIndex = 0;
let swapTimer;
let cleanupTimer;
function stopSwap() {
  clearInterval(swapTimer);
  clearTimeout(cleanupTimer);
  words.forEach((word, index) => {
    word.classList.remove("is-leaving");
    word.classList.toggle("is-active", index === wordIndex);
  });
}
function startSwap() {
  stopSwap();
  if (reducedMotion.matches || document.hidden) return;
  swapTimer = setInterval(() => {
    const previous = words[wordIndex];
    previous.classList.remove("is-active");
    previous.classList.add("is-leaving");
    wordIndex = (wordIndex + 1) % words.length;
    words[wordIndex].classList.add("is-active");
    cleanupTimer = setTimeout(() => previous.classList.remove("is-leaving"), 600);
  }, 3400);
}
document.addEventListener("visibilitychange", startSwap);
reducedMotion.addEventListener("change", startSwap);
startSwap();

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function safeLink(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value, document.baseURI);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
}
function link(href, className, text) {
  const node = element("a", className, text);
  node.href = href;
  if (new URL(href).origin !== location.origin) {
    node.target = "_blank";
    node.rel = "noopener noreferrer";
  }
  return node;
}
function row(item, type) {
  const article = element("article", "item-row");
  const main = element("div", "item-main");
  const title = element("h3", "item-title");
  const href = safeLink(item.url);
  if (href) title.append(link(href, "", item.title));
  else title.textContent = item.title;
  main.append(title);
  const meta = element("div", "item-meta");
  if (type === "projects" && Array.isArray(item.tags)) {
    for (const tag of item.tags.filter(value => typeof value === "string")) {
      const label = element("span", "", tag);
      label.dir = "auto";
      meta.append(label);
    }
  }
  if (type === "writing" && typeof item.date === "string") {
    const date = element("time", "", item.date);
    date.dir = "auto";
    if (/^\d{4}-\d{2}-\d{2}$/.test(item.date)) date.dateTime = item.date;
    meta.append(date);
  }
  if (type === "books") {
    if (item.author) meta.append(element("span", "", item.author));
    if (item.status) meta.append(element("span", "", item.status));
  }
  if (meta.childNodes.length) main.append(meta);
  article.append(main);
  if (href) {
    const arrow = link(href, "item-arrow", "↗");
    arrow.setAttribute("aria-label", `مشاهدهٔ ${item.title}`);
    article.append(arrow);
  }
  return article;
}
async function loadContent() {
  try {
    const response = await fetch("content.json", {cache: "no-cache"});
    if (!response.ok) throw new Error("Content unavailable");
    const content = await response.json();
    for (const type of ["projects", "writing", "books"]) {
      if (!Array.isArray(content[type])) continue;
      const items = content[type].filter(item => item && typeof item.title === "string" && item.title.trim());
      if (items.length) document.getElementById(`${type}-list`).replaceChildren(...items.map(item => row(item, type)));
    }
  } catch {
    for (const message of document.querySelectorAll(".empty-state")) message.textContent = "بارگذاری نشد؛ دوباره تلاش کنید.";
  }
}
loadContent();
