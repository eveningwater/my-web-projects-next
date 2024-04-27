import { defineClientConfig } from 'vuepress/client';
import { nextTick, onMounted } from 'vue';

const documentTitleScroll = () => {
  (function () {
    let interval = null;
    const linkElement = document.querySelector('link[rel*="icon"]');
    if (!linkElement) {
      return;
    }
    const sourceTitle = document.title;
    const sourceLink = linkElement.href;
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        interval = setInterval(scroll, 1000);
        document.title =
          getUniCode(
            '\\u60a8\\u6b63\\u5728\\u6d4f\\u89c8\u5176\\u5b83\\u7f51\\u7ad9'
          ) + '...';
        linkElement.href =
          'https://www.eveningwater.com/my-web-projects/home/logo.svg';
        linkElement.type = 'image/svg';
      } else {
        clearInterval(interval);
        document.title = sourceTitle;
        linkElement.href = sourceLink;
      }
    });
    function scroll() {
      const titleInfo = document.title;
      const firstInfo = titleInfo.charAt(0);
      const lastInfo = titleInfo.substring(1, titleInfo.length);
      document.title = lastInfo + firstInfo;
    }
    function getUniCode(code) {
      let codeArr = code.split('\\u'),
        res = '';
      for (let i = 0, l = codeArr.length; i < l; i++) {
        res += String.fromCharCode(parseInt(codeArr[i], 16));
      }
      return res;
    }
  })();
};
function changeLinkHandler(container) {
  nextTick().then(() => {
    const allLinks = container.getElementsByTagName('a');
    const host = 'https://www.eveningwater.com/my-web-projects/home/';
    Array.from(allLinks).forEach(item => {
      const currentLink = item.getAttribute('href');
      if (
        item.getAttribute('target') === '_blank' &&
        currentLink.indexOf('online-template') === -1
      ) {
        item.setAttribute(
          'href',
          host +
            'online-template.html?target=' +
            encodeURIComponent(currentLink)
        );
      }
    });
  });
}
const runClient = container => {
  console.log(
    `%c my-web-projects%c 联系QQ：854806732 %c 联系微信：eveningwater %c github:https://github.com/eveningwater/my-web-projects %c `,
    'background:#0ca6dc ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#ff7878 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:#ff7878 ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
    'background:#ff7878 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
    'background:transparent'
  );
  console.log(
    '%c ',
    `
line-height:100px;
padding-left:400px;
background-repeat:no-repeat;
background-image:url("data:image/svg+xml,<svg viewBox='0 0 400 100' xmlns='http://www.w3.org/2000/svg'><style>path{stroke-dasharray: 400;animation: dash 10s linear;}@keyframes dash {to {stroke-dashoffset: 2000;}}</style><path d='M 0 50 Q 50 100 100 50 T 200 50 T 300 50 T 400 50 T 500 50' stroke='blue' fill='transparent' stroke-width='10'></path></svg>")
`
  );

  window.addEventListener('load', () => {
    changeLinkHandler(container);
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    };
    const callback = () => {
      changeLinkHandler(container);
    };
    const observer = new MutationObserver(callback);
    observer.observe(container, config);
  });
};
export default defineClientConfig({
  setup() {
    onMounted(() => {
      const app = document.querySelector('#app');
      if (app) {
        runClient(app);
        documentTitleScroll();
      }
    });
  }
});
