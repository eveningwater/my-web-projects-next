import ewUtils from 'ew-utils';
/**
 * 页面逻辑
 */
const { $, on, off, replaceClass } = new ewUtils();
const video = $('video.screen');
const progressThumb = $('.progress .progress-thumb');
const progressItem = $('.progress .progress-item');
let totalWidth = $('.progress').offsetWidth - 5;
let leftSecond = totalWidth;

on(
  video,
  'canplay',
  () => (leftSecond = totalWidth / Math.floor(video.duration))
);

function progressHandle() {
  let isMove = false;
  // 拖动进度条
  let mouseFunction = function (e) {
    let mouseX = e.clientX;
    isMove = true;
    let defaultLeft = progressThumb.style.left;
    defaultLeft = defaultLeft ? parseInt(defaultLeft) : 0;
    document.onmousemove = eve => {
      let left = 0;
      // 判断拖动方向
      if (eve.clientX > mouseX && isMove) {
        left = defaultLeft + eve.clientX - mouseX;
        if (left > totalWidth) left = totalWidth;
      } else if (eve.clientX < mouseX && isMove) {
        left = defaultLeft - (mouseX - eve.clientX);
        if (left < 0) left = 0;
      }
      setLeft(left);
      setVideoCurrentTime(Math.floor(left / leftSecond));
      cancelHandle(isMove, progressThumb, mouseFunction);
    };
  };
  on(progressThumb, 'mousedown', mouseFunction);
  // 点击进度条
  on(progressItem, 'click', e => {
    let boundObj = progressItem.getBoundingClientRect();
    let left = e.clientX - boundObj.x;
    setLeft(left);
    setVideoCurrentTime(Math.floor(left / leftSecond));
    setTimeout(() => {
      video.play();
    }, 0);
  });
}
/**
 * 注销事件
 * @param {*} isMove
 * @param {*} el
 * @param {*} eventHandler
 */
function cancelHandle(isMove, el, eventHandler) {
  on(document, 'mouseup', function () {
    off(el, 'mousedown', eventHandler);
    document.onmousemove = null;
    isMove = false;
  });
}
/**
 * 播放视频
 */
function playVideo() {
  if (video.paused && video.readyState) {
    video.play();
  } else {
    video.pause();
  }
}
/**
 * 更新图标
 */
function updatePlayIcon() {
  if (!video.paused) {
    replaceClass($('#play').firstElementChild, 'fa-play', 'fa-pause');
  } else {
    replaceClass($('#play').firstElementChild, 'fa-pause', 'fa-play');
  }
}
/**
 * 更新进度条
 */
function updateProgress() {
  setVideoTime(video.currentTime);
  let curLeft = leftSecond * video.currentTime;
  let left = curLeft > totalWidth ? totalWidth : curLeft;
  setLeft(left);
}
/**
 * 设置偏移
 * @param {*} left
 */
function setLeft(left) {
  return (progressThumb.style.left = left + 'px');
}
/**
 * 设置视频播放时间
 * @param {*} time
 */
function setVideoCurrentTime(time) {
  if (isNaN(time)) return false;
  time = parseInt(time);
  return (video.currentTime = String(+time));
}
/**
 * 设置时间
 * @param {*} time
 */
function setVideoTime(time) {
  let minutes = Math.floor(time / 60),
    seconds = Math.floor(time % 60);
  if (minutes < 10) minutes = '0' + minutes.toString();
  if (seconds < 10) seconds = '0' + seconds.toString();
  $('#time').innerHTML = `${minutes}:${seconds}`;
}
window.onload = function () {
  progressHandle();
  on($('#play'), 'click', () => playVideo(video));
  on($('#stop'), 'click', () => {
    setVideoCurrentTime(0);
    video.pause();
  });
  on(video, 'click', playVideo);
  on(video, 'play', updatePlayIcon);
  on(video, 'pause', updatePlayIcon);
  on(video, 'timeupdate', updateProgress);
};
