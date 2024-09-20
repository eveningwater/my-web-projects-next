export interface CSSProperties {
  [v: string]: string | number | undefined;
}

type EventElement = HTMLElement | Document | Window;
type QueryElement = HTMLElement | Document;
interface Utils {
  isServer: boolean;
  eventType: string[];
  isMobile: () => boolean;
  on: (
    e: EventElement,
    t: string,
    c: EventListenerOrEventListenerObject,
    u?: boolean
  ) => void;
  off: (
    e: EventElement,
    t: string,
    c: EventListenerOrEventListenerObject,
    u?: boolean
  ) => void;
  baseClickOutSide: (
    e: HTMLElement,
    b: boolean,
    c: (arg0: EventTarget, arg1: DOMRect) => void
  ) => void;
  isFunction: <T>(v: T) => boolean;
  getRect: (e: HTMLElement | Range) => DOMRect;
  $: (s: string, e?: QueryElement) => HTMLElement | null;
  $$: (s: string, e?: QueryElement) => NodeListOf<HTMLElement>;
  hasClass: (e: HTMLElement, c: string) => boolean;
  addClass: (e: HTMLElement, c: string) => void;
  removeClass: (e: HTMLElement, c: string) => void;
  toggleClass: (e: HTMLElement, c: string) => void;
  replaceClass: (e: HTMLElement, c1: string, c2: string) => void;
  toArray: <T>(value: ArrayLike<T>) => Array<T>;
  assign: <T extends object>(...args: T[]) => T;
  setStyle: (el: HTMLElement, style: CSSProperties) => CSSProperties;
  create: (t: string) => HTMLElement;
  isObject: <T>(o: T) => boolean;
  isNotEmptyObject: <T>(o: T) => boolean;
  setAttr: <T extends object>(el: HTMLElement, a: T) => void;
  getAttr: (el: HTMLElement, p: string[]) => string[];
  createUUID: () => string;
  setContent: (el?: HTMLElement, text: string) => void;
  removeStyle: (el?: HTMLElement, prop: string | string[]) => void;
}

export declare const ewUtils: new () => Utils;

declare const utils: Utils;

export default utils;
