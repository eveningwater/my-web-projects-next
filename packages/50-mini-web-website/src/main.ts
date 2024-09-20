import { App as RootApp,createApp } from 'vue'
import { qiankunWindow,renderWithQiankun } from 'vite-plugin-qiankun/dist/helper';
import App from './App.vue'

createApp(App).mount('#app')

let root: RootApp;

function render(props: any) {
  const { container } = props;
  root = createApp(App)
  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app")
  root.mount(c)
}
console.log(3333)

renderWithQiankun({
  mount(props) {
    console.log("vue3sub mount");
    render(props);
  },
  bootstrap() {
    console.log("bootstrap");
  },
  unmount(props: any) {
    console.log("vue3sub unmount");
    root.unmount();
  },
  update(props: any) {
    console.log("vue3sub update");
    console.log(props)
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}