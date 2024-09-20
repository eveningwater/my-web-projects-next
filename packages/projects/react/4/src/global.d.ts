
declare interface Window {
    ewConfirm: (...a: PopBoxOptions[]) => any;
}

interface PopBoxOptions {
    title?: string;
    content: string;
    sure?: (i?: any, e?: Event) => void;
    cancel?: (i?: any, e?: Event) => void;
    afterClose?: (i?: any, e?: Event) => void;
    showCancel?: boolean;
    isClickModal?: boolean;
    closeTime?: number;
    align?: "left" | "center" | "right";
    cancelText?: string;
    sureText?: string;
    container?: HTMLElement;
    showClose?: boolean;
    rootClassName?: string;
    footer?: string;
  }