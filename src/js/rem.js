// 假如是750的设计稿 按照设计稿提供的px，直接把参数小数点左移动两位， 例如设计稿宽度180px 1.8rem; iphone6上显示的是90px；
var designWidth = 750; // 设计稿大小, 按照实际提供的设计稿更改该值，默认750px
var width = document.documentElement.clientWidth;
if (width > designWidth) {
  // 如果页面的宽度超过了750px，那么页面中html的font-size固定为100px
  document.documentElement.style.fontSize = '100px';
} else {
  document.documentElement.style.fontSize = 100 * (width / designWidth) + 'px';
}
