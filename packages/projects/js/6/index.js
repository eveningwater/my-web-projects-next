import ewUtils from 'ew-utils';
/**
 * 页面逻辑
 */

const utils = new ewUtils();
const { $, toggleClass, hasClass, on } = utils;
const confirmTemplate = `
<p>向我们注册以获得更多信息，更多支持等</p>
<form class="modal-form">
    <div>
        <label>姓名:</label>
        <input type="text" placeholder="请输入姓名">
    </div>
    <div>
        <label>邮箱:</label>
        <input type="email" placeholder="请输入邮箱">
    </div>
    <div>
        <label>密码:</label>
        <input type="password" placeholder="请输入密码">
    </div>
    <div>
        <label>确认密码:</label>
        <input type="password" placeholder="请输入密码">
    </div>
</form>
`;
const content =
  '如果我有一个仇人，这个仇人就是生活。如果生活发怒报复我，活的更好就是报复生活最好的方法。如果我不快乐，生活势必在阴暗的角落偷偷嘲笑我。如果我活的快乐，能让生活沮丧，能让羡慕我快乐的生活羞愧，生活羞愧，我就快乐。生活难受，我就兴奋，因为我让我的仇人失落。';
function openMenu() {
  toggleClass($('.nav'), 'show-nav');
  utils.setStyle($('.main'), {
    left: hasClass($('.nav'), 'show-nav') ? '200px' : 0
  });
}
/**
 * 创建诗歌
 * @param {*} poem
 */
function createPoem(poem) {
  poem = poem || content;
  let contentArr = poem.split(/，|。/g),
    contentSymbolArr = poem.match(/，|。/g);
  let contentHTML = '';
  contentArr.forEach(function (text, index) {
    if (!contentSymbolArr[index]) return;
    contentHTML +=
      '<p><span>' + text + contentSymbolArr[index] + '</span></p >';
  });
  return contentHTML;
}
function setHeight() {
  utils.setStyle($('.content'), {
    height: window.innerHeight - $('.main .header').offsetHeight + 'px'
  });
}
window.onload = function () {
  on($('.toggle'), 'click', openMenu);
  $('#poem').innerHTML = createPoem();
  setHeight();
  window.onresize = function () {
    setHeight();
  };
  on($('.register'), 'click', function () {
    ewConfirm({
      title: '注册用户',
      content: confirmTemplate,
      showCancel: true,
      sureText: '注册',
      cancelText: '取消注册',
      footerAlign: 'center',
      isClickModal: false,
      sure: context => {
        context.close(1000);
      }
    });
  });
};
