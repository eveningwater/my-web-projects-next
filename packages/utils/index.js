const ewUtils = function () {
  if (new.target !== ewUtils) {
    throw new Error('error');
  }
  this.eventType = this.isMobile()
    ? ['touchstart', 'touchmove', 'touchend']
    : ['mousedown', 'mousemove', 'mouseup'];
};

ewUtils.prototype = {
  constructor: ewUtils,
  isMobile() {
    return !!navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i);
  },
  isServer: typeof window === 'undefined',
  on(element, type, handler, useCapture = false) {
    if (element && type && handler) {
      element.addEventListener(type, handler, useCapture);
    }
  },
  off(element, type, handler, useCapture = false) {
    if (element && type && handler) {
      element.removeEventListener(type, handler, useCapture);
    }
  },
  baseClickOutSide(element, isUnbind = true, callback) {
    const mouseHandler = event => {
      const target = event.target;
      if (!target) return;
      const targetRect = this.getRect(target);
      const rect = this.getRect(element);
      if (
        targetRect.x >= rect.x &&
        targetRect.y >= rect.y &&
        targetRect.width <= rect.width &&
        targetRect.height <= rect.height
      )
        return;
      if (this.isFunction(callback)) callback(target, targetRect);
      if (isUnbind) {
        // 延迟解除绑定
        setTimeout(() => {
          this.off(document, this.eventType[0], mouseHandler);
        }, 0);
      }
    };
    this.on(document, this.eventType[0], mouseHandler);
  },
  isFunction(v) {
    return typeof v === 'function';
  },
  getRect(element) {
    return element.getBoundingClientRect();
  }
};

export default ewUtils;
