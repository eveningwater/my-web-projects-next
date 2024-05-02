import ewUtils from 'ew-utils';

/**
 *  表单验证功能
 */
const { $, $$, hasClass, addClass, replaceClass, toArray, on } = new ewUtils();
const form = $('.form');
const input = $$('.form input');
const submitBtn = $('.submit-btn');
/**
 * 显示成功
 * @param {*} el
 */
function showSuccess(el) {
  let parentElement = el.parentElement;
  if (hasClass(parentElement, 'error')) {
    replaceClass(parentElement, 'error', 'success');
  } else {
    addClass(parentElement, 'success');
  }
  el.nextElementSibling.style.visibility = 'hidden';
}
/**
 * 显示错误
 *
 * @param {*} el
 * @param {*} msg
 */
function showError(el, msg) {
  let parentElement = el.parentElement;
  if (hasClass(parentElement, 'success')) {
    replaceClass(parentElement, 'success', 'error');
  } else {
    addClass(parentElement, 'error');
  }
  el.nextElementSibling.style.visibility = 'visible';
  el.nextElementSibling.innerHTML = msg;
}
/**
 * 获取字段名
 * @param {*} el
 * @returns
 */
function getFieldName(el) {
  let text = el.previousElementSibling.innerHTML;
  return text.slice(0, text.indexOf(':'));
}
/**
 * 检查不能输入为空
 * @param {*} el
 */
function allCheck(el) {
  return new Promise(resolve => {
    toArray(el).forEach((item, index) => {
      checkDetail(item, index);
    });
    resolve();
  });
}
/**
 * 详情检查
 * @param {*} item
 * @param {*} index
 */
function checkDetail(item, index) {
  if (!item.value.trim()) {
    showError(item, getFieldName(item) + '不能为空!');
  } else {
    showSuccess(item);
    switch (index) {
      case 0:
        checkLength(item, 3, 20);
        break;
      case 1:
        let regEmail =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (regEmail.test(item.value)) {
          showSuccess(item);
        } else {
          showError(item, '输入的' + getFieldName(item) + '格式有误!');
        }
        break;
      case 2:
        checkLength(item, 6, 20);
        break;
      case 3:
        checkLength(item, 6, 20);
        break;
    }
  }
}
/**
 * 检查输入的字符数
 * @param {*} el
 * @param {*} min
 * @param {*} max
 */
function checkLength(el, min, max) {
  if (el.value.length < min) {
    showError(
      el,
      '输入的' + getFieldName(el) + '字符长度不能低于' + min + '个'
    );
  } else if (el.value.length > max) {
    showError(
      el,
      '输入的' + getFieldName(el) + '字符长度不能高于' + max + '个'
    );
  } else {
    showSuccess(el);
  }
}
// 点击提交
on(submitBtn, 'click', function () {
  allCheck(input).then(_ => {
    // 验证成功
    if ($$('.success', form).length === $$('.form-control', form).length) {
      if (input[2].value === input[3].value) {
        ewConfirm({
          title: '温馨提示',
          content: '验证成功',
          showCancel: false
        });
      } else {
        showError(input[3], '两次密码不一致');
      }
    }
  });
});
