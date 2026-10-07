"use strict";
let language="fa";
try{language=localStorage.getItem("portfolio-language")==="en"?"en":"fa";document.documentElement.dataset.theme=localStorage.getItem("portfolio-theme")==="light"?"light":"dark";}catch{}
function refresh(){document.documentElement.lang=language;document.documentElement.dir=language==="fa"?"rtl":"ltr";document.querySelectorAll("[data-fa][data-en]").forEach(n=>n.textContent=n.dataset[language]);document.getElementById("language-toggle").textContent=language==="fa"?"EN":"فا";document.title=document.querySelector("h1").textContent;refreshThemeLabel();}
document.getElementById("language-toggle").addEventListener("click",()=>{language=language==="fa"?"en":"fa";try{localStorage.setItem("portfolio-language",language)}catch{}refresh();renderIcons()});
document.getElementById("theme-toggle").addEventListener("click",()=>{const theme=document.documentElement.dataset.theme==="light"?"dark":"light";document.documentElement.dataset.theme=theme;try{localStorage.setItem("portfolio-theme",theme)}catch{}refreshThemeLabel();renderIcons()});
function refreshThemeLabel(){const dark=document.documentElement.dataset.theme==="dark",label=language==="fa"?(dark?"فعال کردن حالت روشن":"فعال کردن حالت تیره"):(dark?"Switch to light mode":"Switch to dark mode");const button=document.getElementById("theme-toggle");button.setAttribute("aria-label",label);button.title=label;}
refresh();
function renderIcons(){if(window.lucide?.createIcons)window.lucide.createIcons();}
renderIcons();
