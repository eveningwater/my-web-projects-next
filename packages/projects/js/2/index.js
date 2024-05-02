import ewUtils from 'ew-utils';
/***
 * 节选自:https://www.eveningwater.com/my-web-projects/
 * github:https://github.com/eveningwater/my-web-projects/tree/master/js/2
 * author:eveningwater
 * date:2020/7
 */
/**
 *  页面功能
 */

const utils = new ewUtils();
const {
  $,
  $$,
  on,
  hasClass,
  replaceClass,
  addClass,
  toggleClass,
  toArray,
  removeClass
} = utils;
/**
 * 页面数据
 */
var pageData = getData() || {
  movieIndex: 0,
  moviePrice: 10,
  seatsIndexArr: []
};
/**
 * 存储数据
 * @param {*} data
 */
function setData(data) {
  return localStorage.setItem('pageData', JSON.stringify(data));
}
/**
 * 获取数据
 */
function getData() {
  let data = localStorage.getItem('pageData');
  if (!data) return;
  return JSON.parse(data);
}
/**
 * 下拉逻辑
 */
function selectHandle(selectContainer) {
  let selectFlag = false,
    selectOptionArr = toArray(selectContainer.lastElementChild.children);
  let showSelect = function (el, bool) {
    if (bool) {
      if (hasClass(el.lastElementChild, 'select-down')) {
        replaceClass(el.lastElementChild, 'select-down', 'select-up');
      } else {
        addClass(el.lastElementChild, 'select-up');
      }
      el.nextElementSibling.style.display = 'block';
    } else {
      if (hasClass(el.lastElementChild, 'select-up')) {
        replaceClass(el.lastElementChild, 'select-up', 'select-down');
      } else {
        addClass(el.lastElementChild, 'select-down');
      }
      el.nextElementSibling.style.display = 'none';
    }
  };
  on(selectContainer.firstElementChild, 'click', function () {
    selectFlag = !selectFlag;
    showSelect(this, selectFlag);
    selectOptionArr.map(opt => {
      removeClass(opt, 'select-this');
    });
    addClass(selectOptionArr[pageData.movieIndex], 'select-this');
  });
  selectOptionArr.forEach((item, index) => {
    on(item, 'click', function () {
      selectFlag = false;
      let select_content = this.innerHTML;
      this.parentElement.previousElementSibling.firstElementChild.innerHTML =
        select_content;
      selectOptionArr.map(opt => {
        removeClass(opt, 'select-this');
      });
      addClass(item, 'select-this');
      pageData.movieIndex = index;
      pageData.moviePrice = Number(this.dataset.value);
      setValue($('.select-container'), $$('.container .seat'));
      showSelect(this.parentElement.previousElementSibling, false);
    });
  });
  const clickOutsideElement =
    selectContainer.firstElementChild.firstElementChild;
  utils.baseClickOutSide(clickOutsideElement, false, () => {
    if (selectFlag) {
      setTimeout(() => {
        selectFlag = false;
        showSelect(clickOutsideElement.parentElement, false);
      }, 200);
    }
  });
}
/**
 * 设置默认值
 * @param {*} selectContainer
 * @param {*} seats
 */
function setValue(selectContainer, seats) {
  setData(pageData);
  selectContainer.firstElementChild.firstElementChild.innerHTML =
    selectContainer.lastElementChild.children[pageData.movieIndex].innerHTML;
  computedSeat(pageData.seatsIndexArr, pageData.moviePrice);
  for (let i = 0; i < pageData.seatsIndexArr.length; i++) {
    addClass(seats[pageData.seatsIndexArr[i]], 'selected');
  }
}
/**
 * 座位逻辑
 */
function seatHandle(seats) {
  for (let i = 0; i < seats.length; i++) {
    if (!hasClass(seats[i], 'occupied')) {
      on(seats[i], 'click', function () {
        toggleClass(seats[i], 'selected');
        let idx = pageData.seatsIndexArr.indexOf(i);
        if (!hasClass(seats[i], 'selected') && idx > -1) {
          pageData.seatsIndexArr.splice(idx, 1);
        } else if (hasClass(seats[i], 'selected')) {
          pageData.seatsIndexArr.push(i);
        }
        setValue($('.select-container'), seats);
      });
    }
  }
}
/**
 * 计算座位逻辑
 * @param {*} totalSeats
 */
function computedSeat(totalSeats, curPrice) {
  $('#seat-total-count').innerHTML = totalSeats.length;
  $('#seat-total-price').innerHTML = totalSeats.length * curPrice;
}
window.onload = function () {
  setValue($('.select-container'), $$('.container .seat'));
  selectHandle($('.select-container'));
  seatHandle($$('.container .seat'));
};
