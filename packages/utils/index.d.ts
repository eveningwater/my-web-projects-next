export interface CSSProperties extends CSS.Properties<string | number>, CSS.PropertiesHyphen<string | number> {
    /**
     * The index signature was removed to enable closed typing for style
     * using CSSType. You're able to use type assertion or module augmentation
     * to add properties or an index signature of your own.
     *
     * For examples and more information, visit:
     * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
     */
    [v: `--${string}`]: string | number | undefined;
}

type EventElement = HTMLElement | Document | Window;
type QueryElement = HTMLElement | Document;
interface Utils {
    isServer: boolean;
    eventType: string[];
    isMobile: () => boolean;
    on: (e: EventElement, t: string, c: EventListenerOrEventListenerObject, u?: boolean) => void;
    off: (e: EventElement, t: string, c: EventListenerOrEventListenerObject, u?: boolean) => void;
    baseClickOutSide: (e: HTMLElement, b: boolean, c: (arg0: EventTarget, arg1: DOMRect) => void) => void;
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
}
declare const ewUtils: new () => Utils;
export default ewUtils;