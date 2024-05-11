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
  $(selector, el = document) {
    return el.querySelector(selector);
  },
  $$(selector, el = document) {
    return el.querySelectorAll(selector);
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
  isObject(v) {
    return v && typeof v === 'object';
  },
  getRect(element) {
    return element.getBoundingClientRect();
  },
  hasClass(el, className) {
    if (el.classList.contains) {
      return el.classList.contains(className);
    } else {
      const matchRegExp = new RegExp('(^|\\s)' + className + '(\\s|$)');
      return matchRegExp.test(el.className);
    }
  },
  addClass(el, className) {
    return el.classList.add(className);
  },
  removeClass(el, className) {
    return el.classList.remove(className);
  },
  replaceClass(el, className, newClassName) {
    return el.classList.replace(className, newClassName);
  },
  toggleClass(el, className) {
    return el.classList.toggle(className);
  },
  toArray(value) {
    return Array.from ? Array.from(value) : Array.prototype.slice.call(value);
  },
  setStyle(el, style = {}) {
    return this.assign(el.style, style);
  },
  assign(target, ...args) {
    if (Object.assign) {
      return Object.assign(target, ...args);
    } else {
      if (target === null) {
        return;
      }
      const _ = Object(target);
      args.forEach(item => {
        if (this.isObject(item)) {
          for (let key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
              _[key] = item[key];
            }
          }
        }
      });
      return _;
    }
  },
  create(tagName) {
    return document.createElement(tagName);
  },
  isNotEmptyObject(o) {
    return this.isObject(o) && Object.keys(o).length > 0;
  },
  setAttr(el, attr = {}) {
    if (!this.isNotEmptyObject(attr)) {
      return;
    }
    for (const k in attr) {
      el.setAttribute(k, attr[k]);
    }
  },
  getAttr(el,paths = []){
    const res = [];
    for(const key of paths){
      const value = el.getAttribute(key);
      if(value !== null){
        res.push(value);
      }
    }
    return res;
  }
};

export default ewUtils;
