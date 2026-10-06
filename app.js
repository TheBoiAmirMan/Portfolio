"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("is-open", open);
});
navigation.addEventListener("click", event => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});
document.getElementById("year").textContent = new Intl.NumberFormat("fa-IR", {useGrouping: false}).format(new Date().getFullYear());

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
function card(item, type) {
  const article = element("article", "item-card");
  if (item.category || item.status) article.append(element("span", "category", item.category || item.status));
  article.append(element("h3", "", item.title));
  if (type === "books" && item.author) article.append(element("p", "item-description", item.author));
  if (item.description) article.append(element("p", "item-description", item.description));
  if (type === "writing" && item.date) {
    const time = element("time", "item-date", item.date);
    if (/^\d{4}-\d{2}-\d{2}$/.test(item.date)) time.dateTime = item.date;
    article.append(time);
  }
  if (Array.isArray(item.tags) && item.tags.length) {
    const tags = element("div", "tags");
    for (const tag of item.tags.filter(tag => typeof tag === "string")) {
      const label = element("span", "", tag);
      label.dir = "auto";
      tags.append(label);
    }
    article.append(tags);
  }
  const href = safeLink(item.url);
  if (href) {
    const link = element("a", "item-link", item.linkLabel || (type === "projects" ? "دیدن پروژه ↗" : "بیشتر بخوانید ↗"));
    link.href = href;
    if (new URL(href).origin !== location.origin) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
    link.setAttribute("aria-label", `${link.textContent} — ${item.title}`);
    article.append(link);
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
      if (!items.length) continue;
      const list = document.getElementById(`${type}-list`);
      list.replaceChildren(...items.map(item => card(item, type)));
    }
  } catch {
    // Preserve the visible static sections; distinguish a loading error from an empty collection.
    for (const list of document.querySelectorAll(".collection-list")) {
      const message = list.querySelector(".empty-state p");
      if (message) message.textContent = "محتوای این بخش فعلاً بارگذاری نشد. لطفاً صفحه را دوباره باز کنید.";
    }
  }
}
loadContent();
