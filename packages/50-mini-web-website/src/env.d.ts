/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare interface Window {
  mozRequestAnimationFrame?: AnimationFrameProvider['requestAnimationFrame'];
  msRequestAnimationFrame?: AnimationFrameProvider['requestAnimationFrame'];
  oRequestAnimationFrame?: AnimationFrameProvider['requestAnimationFrame'];
  mozCancelAnimationFrame?: AnimationFrameProvider['cancelAnimationFrame'];
  msCancelAnimationFrame?: AnimationFrameProvider['cancelAnimationFrame'];
  oCancelAnimationFrame?: AnimationFrameProvider['cancelAnimationFrame'];
  webkitRequestAnimationFrame?: AnimationFrameProvider['requestAnimationFrame'];
  webkitCancelAnimationFrame?: AnimationFrameProvider['cancelAnimationFrame'];
}