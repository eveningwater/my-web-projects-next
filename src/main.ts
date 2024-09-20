import "./style.css";
import { ewUtils } from "ew-utils";
import { registerMicroApps, start } from "qiankun";
function getUrlParam(name: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

const childAppMap: Record<string, { title?: string; link?: string }> = {
  "/50-mini-website": {
    title: "50个miniweb项目官网",
    link: "/50-mini-website",
  },
};
class Main extends ewUtils {
  templateString = `
      <div class="micro-app-main">
        <div class="mwp-nav"><ul class="mwp-ul"></ul></div>
        <div class="mwp-github">
          <a href="https://github.com/eveningwater/my-web-projects" target="_blank" rel="noopener noreferrer">
              <svg 
                viewBox="0 0 1024 1024" 
                version="1.1" 
                xmlns="http://www.w3.org/2000/svg" 
                p-id="2426" 
                width="38" 
                height="38"
                class="mwp-link-icon"
              ><path 
                d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667" fill="#fff" p-id="2427"></path></svg>
          </a>
        </div>
      </div>
      <div class="micro-app-child hidden">
        <header class="micro-app-child-header">
          <div class="micro-app-child-header-title"></div>
          <div class="operate-btn-group">
            <div class="btn-open-app-new-window" title="从新窗口打开应用"></div>
            <div class="btn-app-close" title="关闭应用"></div>
          </div>
        </header>
        <div id="micro-app-child-content"></div>
      </div>
  `;
  rootApp: HTMLElement;
  main: HTMLElement | null;
  child: HTMLElement | null;
  isIframe: boolean | null;
  childHeader: HTMLElement | null;
  childHeaderTitle: HTMLElement | null;
  constructor() {
    super();
    this.rootApp = this.$("#app") as HTMLElement;
    this.isIframe = false;
    this.main = null;
    this.child = null;
    this.childHeader = null;
    this.childHeaderTitle = null;
    this.init();
  }
  mount(root?: HTMLElement) {
    const res = this.renderMain();
    if (res) {
      (root ?? this.rootApp).appendChild(res);
      this.main = this.$(".micro-app-main") as HTMLElement;
      this.child = this.$(".micro-app-child") as HTMLElement;
      this.childHeader = this.$(".micro-app-child-header") as HTMLElement;
      this.childHeaderTitle = this.$(
        ".micro-app-child-header-title"
      ) as HTMLElement;
      this.renderNav();
      this.watchUrl();
      start();
    }
  }
  async init() {
    this.isIframe = !!getUrlParam("iframe");
    registerMicroApps([
      {
        name: "50-mini-website",
        entry: "//localhost:3000",
        container: this.isIframe ? "#app" : "#micro-app-child-content",
        activeRule: "/50-mini-website",
      },
    ]);
  }
  watchUrl() {
    const handler = () => {
      const pathname = location.pathname;
      if (pathname !== "/") {
        if (this.main && this.child) {
          this.addClass(this.main!, "hidden");
          this.removeClass(this.child!, "hidden");
        }
        if (this.childHeader && this.isIframe) {
          this.childHeader?.parentElement?.removeChild(this.childHeader);
        }
        if (this.childHeaderTitle) {
          const text = childAppMap[location.pathname]?.title;
          if (text) {
            this.setContent(this.childHeaderTitle, text);
          }
        }
      }
    };
    window.addEventListener("popstate", () => {
      handler();
    });
    handler();
  }
  renderMain() {
    const node = document
      .createRange()
      .createContextualFragment(this.templateString);
    return node;
  }
  renderNav() {
    const linkList = [
      {
        text: "项目官网",
        href: "./home/index.html",
      },
      {
        text: "50个项目官网",
        href: "/50-mini-website",
      },
      {
        text: "个人介绍官网",
        href: "./website/index.html",
      },
    ];
    const container = this.$(".mwp-ul"),
      githubIcon = this.$(".mwp-link-icon");
    linkList.forEach((link) => {
      const node = document
        .createRange()
        .createContextualFragment(
          `<li class="mwp-li"><a href="${link.href}" rel="noopener noreferrer" class="mwp-link">${link.text}</a></li>`
        );
      container?.appendChild(node);
    });
    const handleColor = (children: HTMLCollection, color: string) => {
      this.toArray(children).forEach((item) =>
        this.setAttr(item as HTMLElement, { fill: color })
      );
    };
    this.on(githubIcon!, "mouseenter", () => {
      handleColor(githubIcon!.children, "rgba(0, 35, 122, 0.7)");
    });
    this.on(githubIcon!, "mouseleave", () => {
      handleColor(githubIcon!.children, "#ffffff");
    });
    this.on(container!, "click", (e) => {
      const target = e.target as HTMLElement;
      e.preventDefault();
      if (target?.tagName.toLowerCase() === "a") {
        const [link] = this.getAttr(target, ["href"]);
        this.addClass(this.main!, "hidden");
        this.removeClass(this.child!, "hidden");
        history.pushState(null, link, link);
      }
    });
    this.on(this.$(".operate-btn-group") as HTMLElement, "click", (e) => {
      if (this.hasClass(e.target as HTMLElement, "btn-open-app-new-window")) {
        const link = childAppMap[location.pathname]?.link;
        if (link) {
          window.open(`${link}?iframe=true`, "_blank");
        }
      }
      if (this.hasClass(e.target as HTMLElement, "btn-app-close")) {
        this.addClass(this.child!, "hidden");
        this.removeClass(this.main!, "hidden");
        history.pushState(null, "/", "/");
      }
    });
  }
}

window.onload = () => {
  new Main().mount();
};
