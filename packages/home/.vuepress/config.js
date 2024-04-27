import { defaultTheme } from '@vuepress/theme-default';
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top';
import { webpackBundler } from '@vuepress/bundler-webpack';
import { searchPlugin } from '@vuepress/plugin-search';
import { mdEnhancePlugin } from 'vuepress-plugin-md-enhance';
import { defineUserConfig } from 'vuepress';
import { sidebarZh, sidebarEn, navBarZh, navBarEn } from './configs';

const themeConfig = {
  docsRepo: 'https://github.com/eveningwater/my-web-projects',
  docsBranch: 'master',
  docsDir: 'home',
  locales: {
    '/': {
      selectLanguageName: '简体中文',
      selectLanguageText: '选择语言',
      selectLanguageAriaLabel: '选择语言',
      editLinkText: '在 GitHub 上编辑此页',
      lastUpdatedText: '上次更新',
      navbar: navBarZh,
      sidebar: sidebarZh
    },
    '/en/': {
      selectLanguageName: 'English',
      selectLanguageText: 'Languages',
      selectLanguageAriaLabel: 'Select language',
      editLinkText: 'Edit this page on GitHub',
      lastUpdatedText: 'Last Updated',
      navbar: navBarEn,
      sidebar: sidebarEn
    }
  }
};
export default defineUserConfig({
  dest: './dist',
  base: '/my-web-projects/home/',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/logo.svg'
      }
    ]
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '我的个人项目',
      description:
        '这是我的个人项目的一个集合，涉及html,css,js,vue.js,react.js等多种前端技术，当然也有可能会涉及到后端技术。'
    },
    '/en/': {
      lang: 'en-US',
      title: 'my-web-projects',
      description:
        'This is a collection of my personal projects, involving html, css, js, vue.js, react.js and other front-end technologies. Of course, back-end technologies may also be involved.'
    }
  },
  theme: defaultTheme(themeConfig),
  plugins: [
    mediumZoomPlugin({
      selector: '#app img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16
      }
    }),
    backToTopPlugin(),
    searchPlugin(),
    mdEnhancePlugin({
      demo: true
    })
  ],
  bundler: webpackBundler({
    resolve: {
      alias: {
        '@': '/'
      }
    }
  })
});
