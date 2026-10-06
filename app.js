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
let resetScene = () => {};
let restartAnimations = () => {};
const themeButton = document.getElementById("theme-toggle");
const languageButton = document.getElementById("language-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
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
  if(!grid)return;
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
  const action=element("button","project-open");action.type="button";
  action.setAttribute("aria-label",localized(item.title));action.addEventListener("click",()=>openReader(item,"projects"));
  const visual=element("div","project-visual "+(item.visual||"staging"));visual.setAttribute("aria-hidden","true");
  for(let i=0;i<5;i++)visual.append(element("span","visual-node"));
  action.append(visual,element("h3","",localized(item.title)));
  if(item.summary)action.append(element("p","item-summary",localized(item.summary)));
  action.append(element("span","project-link",language==="fa"?"دربارهٔ پروژه ←":"About the project →"));
  card.append(action);return card;
}
function readingBody(item) {
  const value=item.body||item.content||item.description;
  if(Array.isArray(value))return value.map(localized).filter(Boolean);
  return localized(value).split(/\n\s*\n/).filter(Boolean);
}
function openReader(item,type) {
  const dialog=document.getElementById("reader"),body=document.getElementById("reader-body");
  body.replaceChildren();
  const imageUrl=safeLink(item.image||item.cover);
  if(imageUrl){const image=element("img","reader-image");image.src=imageUrl;image.alt=localized(item.imageAlt)||localized(item.title);body.append(image);}
  const heading=element("h2","",localized(item.title));heading.id="reader-title";
  body.append(element("p","reader-kind",t(type)),heading);
  if(item.author)body.append(element("p","item-meta",localized(item.author)));
  readingBody(item).forEach(paragraph=>body.append(element("p","reader-paragraph",paragraph)));
  for(const section of [
    {key:"experience",fa:"تجربهٔ ساخت",en:"Building experience"},
    {key:"challenges",fa:"چالش‌ها و راه‌حل‌ها",en:"Challenges and solutions"},
    {key:"lessons",fa:"چیزهایی که یاد گرفتم",en:"What I learned"},
    {key:"notes",fa:"یادداشت من",en:"My notes"}
  ]){
    const value=item[section.key],paragraphs=Array.isArray(value)?value.map(localized).filter(Boolean):localized(value).split(/\n\s*\n/).filter(Boolean);
    if(!paragraphs.length)continue;
    body.append(element("h3","reader-section-title",language==="fa"?section.fa:section.en));
    paragraphs.forEach(text=>body.append(element("p","reader-paragraph",text)));
  }
  const href=safeLink(localized(item.url));
  if(href)body.append(link(href,"read-link",language==="fa"?"منبع اصلی ↗":"Original source ↗"));
  dialog.showModal();
}
function itemRow(item,type) {
  const article=element("article","reading-card "+type),imageUrl=safeLink(item.image||item.cover);
  if(imageUrl){const image=element("img","reading-image");image.src=imageUrl;image.alt=localized(item.imageAlt)||localized(item.title);image.loading="lazy";article.append(image);}
  const main=element("div","item-main");
  const button=element("button","item-title",localized(item.title));
  button.type="button";button.addEventListener("click",()=>openReader(item,type));
  main.append(button);
  const meta=element("p","item-meta",type==="books"?localized(item.author):item.date);
  if(meta.textContent)main.append(meta);
  const summary=localized(item.summary)||localized(item.description);
  if(summary)main.append(element("p","item-summary",summary));
  const note=localized(item.notePreview)||localized(item.notes);
  if(type==="books"&&note)main.append(element("p","book-note",note));
  const action=element("button","read-link",language==="fa"?(type==="books"?"دربارهٔ کتاب ←":"خواندن نوشته ←"):(type==="books"?"About the book →":"Read article →"));
  action.type="button";action.addEventListener("click",()=>openReader(item,type));
  main.append(action);article.append(main);return article;
}
function renderContent() {
  const valid=type=>Array.isArray(content?.[type])?content[type].filter(item=>item&&localized(item.title).trim()):[];
  const projects=valid("projects");
  const projectList=document.getElementById("projects-list");
  if(projects.length)projectList.replaceChildren(...projects.map(projectCard));
  else{const empty=element("div","empty-project"),symbol=element("span","empty-symbol","[ ]");symbol.setAttribute("aria-hidden","true");empty.append(symbol,element("p","",t(contentFailed?"loadError":"emptyProjects")));projectList.replaceChildren(empty);}
  for(const type of ["writing","books"]){const list=document.getElementById(`${type}-list`),items=valid(type);list.replaceChildren(...(items.length?items.map(item=>itemRow(item,type)):[element("p","empty-state",t(contentFailed?"loadError":type==="writing"?"emptyWriting":"emptyBooks"))]));}
}
function renderRole() {
  const title=document.getElementById("role-title");
  document.querySelectorAll(".role-word").forEach((node,index)=>node.textContent=t(index===0?"engineer":"analyst"));
  title.setAttribute("aria-label",t("fullRole"));
}
function applyLanguage(next) {
  language=next;document.documentElement.lang=next;document.documentElement.dir=next==="fa"?"rtl":"ltr";
  document.querySelectorAll("[data-i18n]").forEach(node=>node.textContent=t(node.dataset.i18n));
  document.querySelectorAll("[data-fa][data-en]").forEach(node=>node.textContent=node.dataset[next]);
  document.querySelectorAll("[data-i18n-aria]").forEach(node=>node.setAttribute("aria-label",t(node.dataset.i18nAria)));
  renderRole();
  languageButton.textContent=next==="fa"?"EN":"فا";languageButton.setAttribute("aria-label",next==="fa"?"Switch to English":"تغییر زبان به فارسی");languageButton.title=languageButton.getAttribute("aria-label");
  document.title=t("pageTitle");document.querySelector('meta[name="description"]').content=t("description");
  applyTheme(document.documentElement.dataset.theme);renderTools();renderContent();resetScene();
}
themeButton.addEventListener("click",()=>{const theme=document.documentElement.dataset.theme==="dark"?"light":"dark";applyTheme(theme);try{localStorage.setItem("portfolio-theme",theme);}catch{}});
languageButton.addEventListener("click",()=>{const next=language==="fa"?"en":"fa";applyLanguage(next);try{localStorage.setItem("portfolio-language",next);}catch{}});
applyLanguage(language);

async function loadContent(){try{const response=await fetch("content.json",{cache:"no-cache"});if(!response.ok)throw new Error("Content unavailable");content=await response.json();}catch{contentFailed=true;}renderContent();}
loadContent();

document.getElementById("reader-close").addEventListener("click",()=>document.getElementById("reader").close());

const roleWords=[...document.querySelectorAll(".role-word")];
let roleIndex=0,roleTimer;
function restartRole(){clearInterval(roleTimer);if(reducedMotion.matches||document.hidden)return;roleTimer=setInterval(()=>{roleWords[roleIndex].classList.remove("is-active");roleIndex=(roleIndex+1)%roleWords.length;roleWords[roleIndex].classList.add("is-active");},3400);}
document.addEventListener("visibilitychange",restartRole);
reducedMotion.addEventListener("change",restartRole);
restartRole();
