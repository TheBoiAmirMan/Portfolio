"use strict";

const translations = {
  fa: {
    skip:"محتوای اصلی",navigation:"ناوبری اصلی",expertise:"تخصص‌ها",tools:"ابزارها",projects:"پروژه‌ها",writing:"نوشته‌ها",books:"کتاب‌ها",name:"امیرعلی کوهپایه",data:"داده",engineer:"مهندس",analyst:"تحلیلگر",fullRole:"مهندس داده و تحلیلگر داده",heroFocus:"مهندسی داده / تحلیل / هوش تجاری",viewProjects:"دیدن پروژه‌ها",focusLabel:"حوزه‌های کاری",expertiseTitle:"از زیرساخت تا بینش",engineering:"مهندسی داده",engineeringShort:"پایپ‌لاین، ETL و مدل‌سازی داده",analytics:"تحلیل داده",analyticsShort:"کاوش، تحلیل و بصری‌سازی",bi:"هوش تجاری",biShort:"داشبورد، گزارش و شاخص‌های عملکرد",workflow:"مسیر داده",extract:"جمع‌آوری",transform:"آماده‌سازی",model:"مدل‌سازی",deliver:"ارائه",toolboxLabel:"جعبه‌ابزار",toolsTitle:"ابزارهایی که با آن‌ها کار می‌کنم",toolsNote:"کد، داده و داشبورد",workLabel:"کارها",projectsTitle:"پروژه‌ها و مطالعات موردی",filters:"فیلتر پروژه‌ها",all:"همه",football:"داده‌های فوتبال",emptyProjects:"هنوز پروژه‌ای اضافه نشده.",emptyFiltered:"پروژه‌ای در این دسته نیست.",journalLabel:"یادداشت‌ها",readingLabel:"مطالعه",emptyWriting:"هنوز نوشته‌ای اضافه نشده.",emptyBooks:"هنوز کتابی اضافه نشده.",connect:"در ارتباط باشیم",backTop:"برگشت به بالا",light:"فعال کردن حالت روشن",dark:"فعال کردن حالت تیره",pause:"توقف حرکت",play:"ادامهٔ حرکت",loadError:"بارگذاری نشد؛ دوباره تلاش کنید.",viewProject:"دیدن پروژه",viewItem:"مشاهده",pageTitle:"مهندسی و تحلیل داده | امیرعلی کوهپایه",description:"مهندسی و تحلیل داده؛ پروژه‌ها، ابزارها، نوشته‌ها و کتاب‌ها.",codeTool:"برنامه‌نویسی",databaseTool:"دیتابیس",pipelineTool:"پایپ‌لاین و پردازش",dashboardTool:"داشبورد و گزارش",infraTool:"زیرساخت",notebookTool:"تحلیل و کاوش",gitTool:"کنترل نسخه"
  },
  en: {
    skip:"Skip to content",navigation:"Main navigation",expertise:"Expertise",tools:"Toolkit",projects:"Projects",writing:"Writing",books:"Books",name:"Amirali Koohpayeh",data:"Data",engineer:"Engineer",analyst:"Analyst",fullRole:"Data engineer and data analyst",heroFocus:"Engineering / Analytics / Business intelligence",viewProjects:"Explore projects",focusLabel:"FOCUS AREAS",expertiseTitle:"From infrastructure to insight",engineering:"Data engineering",engineeringShort:"Pipelines, ETL & data modeling",analytics:"Data analytics",analyticsShort:"Exploration, analysis & visualization",bi:"Business intelligence",biShort:"Dashboards, reporting & KPIs",workflow:"Data workflow",extract:"Extract",transform:"Transform",model:"Model",deliver:"Deliver",toolboxLabel:"TOOLKIT",toolsTitle:"The tools I work with",toolsNote:"Code, data & dashboards",workLabel:"WORK",projectsTitle:"Projects & case studies",filters:"Filter projects",all:"All",football:"Football data",emptyProjects:"No projects added yet.",emptyFiltered:"No projects in this category yet.",journalLabel:"JOURNAL",readingLabel:"READING",emptyWriting:"No posts added yet.",emptyBooks:"No books added yet.",connect:"Let's connect",backTop:"Back to top",light:"Switch to light mode",dark:"Switch to dark mode",pause:"Pause animation",play:"Resume animation",loadError:"Could not load content. Please try again.",viewProject:"View project",viewItem:"Open",pageTitle:"Data engineering & analytics | Amirali Koohpayeh",description:"Data engineering and analytics. Projects, tools, writing and books.",codeTool:"Programming",databaseTool:"Database",pipelineTool:"Pipelines & processing",dashboardTool:"Dashboards & reporting",infraTool:"Infrastructure",notebookTool:"Analysis & exploration",gitTool:"Version control"
  }
};
const toolset = [
  {name:"Python",icon:"python",group:"codeTool"},
  {name:"SQL Server",icon:"sqlserver",group:"databaseTool",detail:"T-SQL · SSIS · SSAS"},
  {name:"PostgreSQL",icon:"postgresql",group:"databaseTool"},
  {name:"Airflow",icon:"airflow",group:"pipelineTool"},
  {name:"Apache Spark",icon:"spark",group:"pipelineTool"},
  {name:"Docker",icon:"docker",group:"infraTool"},
  {name:"Power BI",icon:"powerbi",group:"dashboardTool"},
  {name:"Excel",icon:"excel",group:"dashboardTool"},
  {name:"Superset",icon:"superset",group:"dashboardTool"},
  {name:"Metabase",icon:"metabase",group:"dashboardTool"},
  {name:"Jupyter",icon:"jupyter",group:"notebookTool"},
  {name:"Git",icon:"git",group:"gitTool"}
];
let language = document.documentElement.lang === "en" ? "en" : "fa";
let content = null;
let contentFailed = false;
let activeFilter = "all";
let resetScene = () => {};
let restartAnimations = () => {};
const themeButton = document.getElementById("theme-toggle");
const languageButton = document.getElementById("language-toggle");
const motionButton = document.getElementById("motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let motionPaused = false;
const t = key => translations[language][key];
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}
function localized(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") return value[language] || value.fa || value.en || "";
  return "";
}
function safeLink(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {const url = new URL(value,document.baseURI);return ["http:","https:"].includes(url.protocol) ? url.href : null;} catch {return null;}
}
function link(href,className,text) {
  const node = element("a",className,text);node.href=href;
  if(new URL(href).origin!==location.origin){node.target="_blank";node.rel="noopener noreferrer";}
  return node;
}
function applyTheme(theme) {
  document.documentElement.dataset.theme=theme;
  themeButton.setAttribute("aria-label",t(theme==="dark"?"light":"dark"));
  themeButton.title=themeButton.getAttribute("aria-label");
  document.querySelector('meta[name="theme-color"]').content=theme==="dark"?"#121214":"#faf9f7";
  resetScene();
}
function renderTools() {
  const grid=document.getElementById("tools-grid");
  grid.replaceChildren(...toolset.map(tool=>{
    const card=element("article",`tool-card ${tool.icon}`);
    const icon=element("div","tool-icon");const image=document.createElement("img");
    image.src=`assets/icons/${tool.icon}.svg`;image.alt="";image.width=32;image.height=32;image.loading="lazy";
    icon.append(image);const info=element("div","tool-info");const title=element("h3","",tool.name);title.lang="en";
    info.append(title,element("p","",tool.detail||t(tool.group)));card.append(icon,info);return card;
  }));
}
function projectCard(item) {
  const card=element("article","project-card");
  const imageUrl=safeLink(item.image);
  if(imageUrl){const image=document.createElement("img");image.src=imageUrl;image.alt=localized(item.imageAlt)||localized(item.title);image.loading="lazy";card.append(image);}
  const category=["engineering","analytics","football"].includes(item.category)?t(item.category):localized(item.category);
  if(category)card.append(element("span","project-category",category));
  card.append(element("h3","",localized(item.title)));
  if(Array.isArray(item.tags)){const tags=element("div","tags");item.tags.filter(tag=>typeof tag==="string").forEach(tag=>{const label=element("span","",tag);label.dir="auto";tags.append(label);});card.append(tags);}
  const href=safeLink(localized(item.url));
  if(href){const action=link(href,"project-link",`${t("viewProject")} ↗`);action.setAttribute("aria-label",`${t("viewProject")} — ${localized(item.title)}`);card.append(action);}
  return card;
}
function itemRow(item,type) {
  const article=element("article","item-row"),main=element("div","item-main"),title=element("h3","item-title");
  const href=safeLink(localized(item.url)),text=localized(item.title);
  if(href)title.append(link(href,"",text));else title.textContent=text;
  main.append(title);const meta=element("div","item-meta");
  if(type==="writing"&&typeof item.date==="string"){const date=element("time","",item.date);date.dir="auto";if(/^\d{4}-\d{2}-\d{2}$/.test(item.date))date.dateTime=item.date;meta.append(date);}
  if(type==="books"){if(item.author)meta.append(element("span","",localized(item.author)));if(item.status)meta.append(element("span","",localized(item.status)));}
  if(meta.childNodes.length)main.append(meta);article.append(main);
  if(href){const arrow=link(href,"item-arrow","↗");arrow.setAttribute("aria-label",`${t("viewItem")} ${text}`);article.append(arrow);}
  return article;
}
function renderContent() {
  const valid=type=>Array.isArray(content?.[type])?content[type].filter(item=>item&&localized(item.title).trim()):[];
  const projects=valid("projects").filter(item=>activeFilter==="all"||item.category===activeFilter);
  const projectList=document.getElementById("projects-list");
  if(projects.length)projectList.replaceChildren(...projects.map(projectCard));
  else{const empty=element("div","empty-project"),symbol=element("span","empty-symbol","[ ]");symbol.setAttribute("aria-hidden","true");empty.append(symbol,element("p","",t(contentFailed?"loadError":activeFilter==="all"?"emptyProjects":"emptyFiltered")));projectList.replaceChildren(empty);}
  for(const type of ["writing","books"]){const list=document.getElementById(`${type}-list`),items=valid(type);list.replaceChildren(...(items.length?items.map(item=>itemRow(item,type)):[element("p","empty-state",t(contentFailed?"loadError":type==="writing"?"emptyWriting":"emptyBooks"))]));}
}
function updateMotionButton() {
  const paused=motionPaused||reducedMotion.matches;
  motionButton.setAttribute("aria-pressed",String(paused));motionButton.setAttribute("aria-label",t(paused?"play":"pause"));motionButton.title=motionButton.getAttribute("aria-label");motionButton.disabled=reducedMotion.matches;
}
function applyLanguage(next) {
  language=next;document.documentElement.lang=next;document.documentElement.dir=next==="fa"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(node=>node.textContent=t(node.dataset.i18n));
  document.querySelectorAll("[data-i18n-aria]").forEach(node=>node.setAttribute("aria-label",t(node.dataset.i18nAria)));
  document.querySelectorAll(".role-word").forEach((node,index)=>node.textContent=t(index===0?"engineer":"analyst"));
  document.getElementById("role-title").setAttribute("aria-label",t("fullRole"));
  languageButton.textContent=next==="fa"?"EN":"فا";languageButton.setAttribute("aria-label",next==="fa"?"Switch to English":"تغییر زبان به فارسی");languageButton.title=languageButton.getAttribute("aria-label");
  document.title=t("pageTitle");document.querySelector('meta[name="description"]').content=t("description");
  applyTheme(document.documentElement.dataset.theme);updateMotionButton();renderTools();renderContent();resetScene();
}
themeButton.addEventListener("click",()=>{const theme=document.documentElement.dataset.theme==="dark"?"light":"dark";applyTheme(theme);try{localStorage.setItem("portfolio-theme",theme);}catch{}});
languageButton.addEventListener("click",()=>{const next=language==="fa"?"en":"fa";applyLanguage(next);try{localStorage.setItem("portfolio-language",next);}catch{}});
motionButton.addEventListener("click",()=>{motionPaused=!motionPaused;updateMotionButton();restartAnimations();});
document.getElementById("project-filters").addEventListener("click",event=>{const button=event.target.closest("button[data-filter]");if(!button)return;activeFilter=button.dataset.filter;document.querySelectorAll("[data-filter]").forEach(node=>node.setAttribute("aria-pressed",String(node===button)));renderContent();});
applyLanguage(language);

// The background is a decorative network, not a data visualization.
const canvas=document.getElementById("data-background"),ctx=canvas.getContext("2d");
let width=0,height=0,frame=0,lastFrame=0,points=[];
let rgb="255,83,97";
function resizeScene() {
  if(!ctx)return;
  const box=canvas.parentElement.getBoundingClientRect(),dpr=Math.min(window.devicePixelRatio||1,2);
  width=box.width;height=box.height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);
  const accent=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();rgb=[1,3,5].map(i=>parseInt(accent.slice(i,i+2),16)).join(",");
  points=Array.from({length:width<650?26:44},(_,i)=>{const seed=(Math.sin(i*127.1+13.7)*43758.5453)%1;const fraction=Math.abs(seed);return{x:width*(width<650?.07+fraction*.86:language==="fa"?.03+fraction*.54:.43+fraction*.54),y:height*(.12+Math.abs(Math.sin(i*78.23))*.73),phase:i*2.17};});
  drawScene(0);
}
function drawScene(time) {
  if(!ctx||!width)return;
  ctx.clearRect(0,0,width,height);
  const dark=document.documentElement.dataset.theme==="dark",opacity=width<650?.55:1;
  const center=language==="fa"?width*.25:width*.75,glow=ctx.createRadialGradient(center,height*.46,0,center,height*.46,width*.46);
  glow.addColorStop(0,`rgba(${rgb},${dark?.09:.055})`);glow.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
  const nodes=points.map(p=>({x:p.x+Math.sin(time*.00014+p.phase)*13,y:p.y+Math.cos(time*.00011+p.phase)*12}));
  const threshold=Math.min(width*.27,145);
  for(let i=0;i<nodes.length;i++){
    const a=nodes[i];
    for(let j=i+1;j<nodes.length;j++){
      const b=nodes[j],distance=Math.hypot(a.x-b.x,a.y-b.y);
      if(distance>threshold)continue;
      ctx.strokeStyle=`rgba(${rgb},${(1-distance/threshold)*(dark?.3:.23)*opacity})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
      if((i+j)%11===0){const progress=((time*.000075+i*.07)%1);ctx.fillStyle=`rgba(${rgb},${(dark?.5:.4)*opacity})`;ctx.beginPath();ctx.arc(a.x+(b.x-a.x)*progress,a.y+(b.y-a.y)*progress,1.6,0,Math.PI*2);ctx.fill();}
    }
    ctx.fillStyle=`rgba(${rgb},${(dark?.44:.34)*opacity})`;ctx.beginPath();ctx.arc(a.x,a.y,i%7===0?2.4:1.5,0,Math.PI*2);ctx.fill();
  }
}
function animate(time) {if(time-lastFrame>32){drawScene(time);lastFrame=time;}frame=requestAnimationFrame(animate);}
const words=[...document.querySelectorAll(".role-word")];
let wordIndex=0,swapTimer,cleanupTimer;
function restart() {
  cancelAnimationFrame(frame);clearInterval(swapTimer);clearTimeout(cleanupTimer);
  words.forEach((word,index)=>{word.classList.remove("is-leaving");word.classList.toggle("is-active",index===wordIndex);});
  if(motionPaused||reducedMotion.matches||document.hidden){drawScene(0);return;}
  if(ctx)frame=requestAnimationFrame(animate);
  swapTimer=setInterval(()=>{const previous=words[wordIndex];previous.classList.remove("is-active");previous.classList.add("is-leaving");wordIndex=(wordIndex+1)%words.length;words[wordIndex].classList.add("is-active");cleanupTimer=setTimeout(()=>previous.classList.remove("is-leaving"),600);},3400);
}
resetScene=resizeScene;restartAnimations=restart;
new ResizeObserver(resizeScene).observe(canvas.parentElement);
document.addEventListener("visibilitychange",restart);
reducedMotion.addEventListener("change",()=>{updateMotionButton();restart();});
resizeScene();restart();
const navLinks=[...document.querySelectorAll('.header-inner nav a')];
// Observe every content section using a shared observer.
const sectionObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)navLinks.forEach(a=>{const current=a.getAttribute("href")===`#${entry.target.id}`;a.classList.toggle("is-current",current);if(current)a.setAttribute("aria-current","location");else a.removeAttribute("aria-current");});});},{rootMargin:"-15% 0px -55% 0px"});
navLinks.forEach(a=>{const section=document.querySelector(a.getAttribute("href"));if(section)sectionObserver.observe(section);});
async function loadContent(){try{const response=await fetch("content.json",{cache:"no-cache"});if(!response.ok)throw new Error("Content unavailable");content=await response.json();}catch{contentFailed=true;}renderContent();}
loadContent();
