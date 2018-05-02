"use strict";
// 假如是750的设计稿 按照设计稿提供的px，直接把参数小数点左移动两位， 例如设计稿宽度180px 1.8rem; iphone6上显示的是90px；
var designWidth=750,width=document.documentElement.clientWidth;
// 如果页面的宽度超过了750px，那么页面中html的font-size固定为100px
document.documentElement.style.fontSize=width>designWidth?"100px":width/designWidth*100+"px";
//# sourceMappingURL=rem.js.map
