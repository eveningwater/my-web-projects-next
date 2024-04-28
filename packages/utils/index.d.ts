type EventElement = HTMLElement | Document | Window;
interface Utils {
    isServer: boolean;
    eventType: string[];
    isMobile: () => boolean;
    on: (e: EventElement, t: string, c: EventListenerOrEventListenerObject, u: boolean) => void;
    off: (e: EventElement, t: string, c: EventListenerOrEventListenerObject, u: boolean) => void;
    baseClickOutSide: (e: HTMLElement, b: boolean, c: (arg0: EventTarget, arg1: DOMRect) => void) => void;
    isFunction: <T>(v: T) => boolean;
    getRect: (e: HTMLElement | Range) => DOMRect;
}
declare const ewUtils: () => Utils;
export default ewUtils;