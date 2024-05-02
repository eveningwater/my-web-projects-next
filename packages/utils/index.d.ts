type EventElement = HTMLElement | Document | Window;
type QueryElement = HTMLElement | Document;
interface Utils {
    isServer: boolean;
    eventType: string[];
    isMobile: () => boolean;
    on: (e: EventElement, t: string, c: EventListenerOrEventListenerObject, u: boolean) => void;
    off: (e: EventElement, t: string, c: EventListenerOrEventListenerObject, u: boolean) => void;
    baseClickOutSide: (e: HTMLElement, b: boolean, c: (arg0: EventTarget, arg1: DOMRect) => void) => void;
    isFunction: <T>(v: T) => boolean;
    getRect: (e: HTMLElement | Range) => DOMRect;
    $: (s: string, e: QueryElement) => HTMLElement | null;
    $: (s: string, e: QueryElement) => NodeListOf<HTMLElement>;
    hasClass: (e: HTMLElement, c: string) => boolean;
    addClass: (e: HTMLElement, c: string) => void;
    removeClass: (e: HTMLElement, c: string) => void;
    toggleClass: (e: HTMLElement, c: string) => void;
    replaceClass: (e: HTMLElement, c1: string, c2: string) => void;
    toArray: <T>(value: ArrayLike<T>) => Array<T>
}
declare const ewUtils: () => Utils;
export default ewUtils;