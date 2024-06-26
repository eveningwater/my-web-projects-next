import './style.css'
import opendebugger from 'debugger';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="sing-box">
<header class="sing-header">
  <a href="#" class="sing-link">
    <img src="images/logo.png" alt="唱吧" title="唱吧" class="sing-header-logo">
  </a>
  <div class="sing-right">
    <a href="#" class="sing-nav-link checked">首页</a>
    <a href="#" class="sing-nav-link">精彩表演</a>
    <a href="#" class="sing-nav-link">会员中心</a>
    <a href="#" class="sing-nav-link">金币充值</a>
    <a href="#" class="sing-nav-link">分享伴奏</a>
    <a href="#" class="sing-nav-link">直播</a>
    <a href="#" class="sing-nav-link">音乐人</a>
    <a href="#" class="sing-nav-link">加入我们</a>
  </div>
</header>
<div class="sing-container">
  <img src="images/ktvNew.png" alt="ktv new" class="sing-container-img">
  <a href="#" class="sing-download">免费下载</a>
</div>
<div class="sing-wrap">
  <img src="images/top1.png" alt="demo1" title="demo1" class="sing-wrap-img">
  <img src="images/top2.png" alt="demo2" title="demo2" class="sing-wrap-img">
  <img src="images/top3.png" alt="demo3" title="demo3" class="sing-wrap-img">
  <img src="images/top4.png" alt="demo4" title="demo4" class="sing-wrap-img">
  <img src="images/top5.png" alt="demo5" title="demo5" class="sing-wrap-img">
</div>
</div>
<ul class="sing-public-area">
<li class="sing-public-area-li">
  <img src="images/display1.jpg" alt="demo" title="demo" class="sing-public-area-img">
  <div class="sing-public-area-info">最时尚的手机KTV</div>
</li>
<li class="sing-public-area-li">
  <img src="images/display2.jpg" alt="demo" title="demo" class="sing-public-area-img">
  <div class="sing-public-area-info">上百万高品质伴奏</div>
</li>
<li class="sing-public-area-li">
  <img src="images/display3.jpg" alt="demo" title="demo" class="sing-public-area-img">
  <div class="sing-public-area-info">人气最高的K歌社区</div>
</li>
<li class="sing-public-area-li">
  <img src="images/display4.jpg" alt="demo" title="demo" class="sing-public-area-img">
  <div class="sing-public-area-info">附近的兴趣群组</div>
</li>
</ul>
<div class="sing-public-container">
<a href="#" class="sing-public-container-link iphone">
  <span class="sing-public-container-home-icon">iPhone</span>
</a>
<a href="#" class="sing-public-container-link android">
  <span class="sing-public-container-home-icon">Android</span>
</a>
<a href="#" class="sing-public-container-link ipad">
  <span class="sing-public-container-home-icon">iPad</span>
</a>
<a href="#" class="sing-public-container-link win-phone">
  <span class="sing-public-container-home-icon">WinPhone 8</span>
</a>
<a href="#" class="sing-public-container-link home-icon sing-public-container-home-icon">二维码</a>
<div class="sing-public-container-inline-block"></div>
</div>
<footer class="sing-public-footer">
<a href="#" class="sing-public-footer-link">沃唱吧</a>|
<a href="#" class="sing-public-footer-link">English</a>|
<a href="#" class="sing-public-footer-link">重新设置密码</a>|
<a href="#" class="sing-public-footer-link">帮助中心</a>|
<a href="#" class="sing-public-footer-link">联系我们</a>|
<a href="#" class="sing-public-footer-link">加入唱吧</a>|
<a href="#" class="sing-public-footer-link">防诈骗专栏</a>|
<a href="#" class="sing-public-footer-link">商品防伪查询</a>|<br>
北京酷智科技有限公司 ©2017 changba.com |
<a href="#" class="sing-public-footer-link">京ICP证110298 </a>
| 办公电话：010-84299866
<br>
<a href="#" class="sing-public-footer-link"> 京网文[2015]0390-170号</a>|
<a href="#" class="sing-public-footer-link">  营业性演出许可证 </a>|
<a href="#" class="sing-public-footer-link">
  <img src="images/ghs.png" alt="ghs" title="ghs" class="sing-public-footer-ghs-img">
  京公网安备11010502025063号
</a>|
<a href="#" class="sing-public-footer-link">
  <img src="images/sf.png" alt="sf" title="sf" class="sing-public-footer-sf-img">
</a>
</footer>
`;

window.onload = () => {
  opendebugger();
}