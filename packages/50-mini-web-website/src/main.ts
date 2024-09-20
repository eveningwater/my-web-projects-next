import { App as RootApp, createApp } from "vue";
import {
  qiankunWindow,
  renderWithQiankun,
} from "vite-plugin-qiankun/dist/helper";
import App from "./App.vue";

let root: RootApp;

const render = (props: { container?: HTMLElement }) => {
  const { container } = props;
  root = createApp(App);
  const c = container
    ? container.querySelector("#app")
    : document.getElementById("app");
  root.mount(c);
};

renderWithQiankun({
  mount(props) {
    render(props);
  },
  bootstrap() {},
  unmount() {
    root.unmount();
  },
  update() {},
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
