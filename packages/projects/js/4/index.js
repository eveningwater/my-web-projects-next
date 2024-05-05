/***
 * 节选自:https://www.eveningwater.com/my-web-projects/
 * github:https://github.com/eveningwater/my-web-projects/tree/master/js/4
 * author:eveningwater
 * date:2020/7
 */
import ewUtils from 'ew-utils';
const utils = new ewUtils();
const {
  $,
  $$,
  hasClass,
  replaceClass,
  addClass,
  toArray,
  on,
  create,
  removeClass
} = utils;
const API = 'https://api.exchangerate-api.com/v4/latest/';
const showSelect = function (el, bool) {
  const last = el.lastElementChild,
    next = el.nextElementSibling;
  if (bool) {
    if (hasClass(last, 'select-down')) {
      replaceClass(last, 'select-down', 'select-up');
    } else {
      addClass(last, 'select-up');
    }
    utils.setStyle(next, { display: 'block' });
  } else {
    if (hasClass(last, 'select-up')) {
      replaceClass(last, 'select-up', 'select-down');
    } else {
      addClass(last, 'select-down');
    }
    utils.setStyle(next, { display: 'none' });
  }
};
let rateData = null;
/**
 * 下拉逻辑
 */
function selectHandle(selectContainer) {
  let selectArr = toArray(selectContainer);
  selectArr.forEach(item => {
    showSelect(item.firstElementChild, false);
    on(item.firstElementChild, 'click', function () {
      selectArr.forEach(sel => {
        showSelect(sel.firstElementChild, false);
      });
      showSelect(this, true);
    });
  });
}
/**
 * 加载下拉列表
 * @param {*} data
 * @param {*} selectContainer
 */
function loadSelectOption(data, selectContainer) {
  Object.keys(data.rates).forEach(item => {
    var li = create('li');
    addClass(li, 'select-option');
    utils.setAttr(li, { 'data-value': item });
    li.innerHTML = item;
    selectContainer.lastElementChild.appendChild(li);
  });
  let selectOptionArr = toArray(selectContainer.lastElementChild.children);
  selectOptionArr.forEach(item => {
    on(item, 'click', function () {
      let select_content = this.dataset.value;
      this.parentElement.previousElementSibling.firstElementChild.innerHTML =
        select_content;
      selectOptionArr.map(opt => {
        removeClass(opt, 'select-this');
      });
      addClass(item, 'select-this');
      loadData();
      showSelect(this.parentElement.previousElementSibling, false);
    });
  });
  const baseEle = selectContainer.firstElementChild.firstElementChild;
  utils.baseClickOutSide(baseEle, false, () => {
    setTimeout(() => {
      showSelect(baseEle.parentElement, false);
    }, 200);
  });
}
/**
 * 设置汇率
 */
function loadData() {
  // 数据请求
  fetch(API + $('.currency-one .select-content').innerHTML)
    .then(res => res.json())
    .then(data => {
      loadSelectOption(data, $('.currency-one'));
      loadSelectOption(data, $('.currency-two'));
      let firstValue = $('.currency-one .select-content').innerHTML;
      let secondValue =
        data.rates[$('.currency-two .select-content').innerHTML];
      $('#rate').innerHTML = `1 ${firstValue} = ${secondValue} ${
        $('.currency-two .select-content').innerHTML
      }`;
      $('#amount-number-two').value = (
        $('#amount-number-one').value * secondValue
      ).toFixed(2);
    });
}
window.onload = function () {
  selectHandle($$('.select-container'));
  loadData();
  on($('#amount-number-one'), 'change', loadData);
  on($('#amount-number-two'), 'change', loadData);
  on($('#swap'), 'click', function () {
    const value = $('.currency-one .select-content').innerHTML;
    $('.currency-one .select-content').innerHTML = $(
      '.currency-two .select-content'
    ).innerHTML;
    $('.currency-two .select-content').innerHTML = value;
    loadData();
  });
};
