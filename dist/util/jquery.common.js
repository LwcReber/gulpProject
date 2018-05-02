"use strict";var Pub=function(e){
//表单序列化为JSON对象
function a(e){var a={},t=$("#"+e).serializeArray();
//将json数组转化为一个json对象
return $.each(t,function(){a[this.name]?(a[this.name].push||(a[this.name]=[a[this.name]]),a[this.name].push(this.value||"")):a[this.name]=this.value||""}),a}function t(e,a){var t;return e.find(".tmpData").val(JSON.stringify(a)),$.each(a,function(a,n){if("number"!=typeof n&&(n=n||""),t=e.find("."+a),"isread"==a)return void(1==n&&t.addClass("colC"));if(0!==t.length)switch(t.hasClass("trans")&&(n=t.data("value")[n]),t.hasClass("difTime")&&(n=g(n)),t[0].localName){case"select":t.children().removeAttr("selected").siblings('[value="'+n+'"]').attr("selected",!0);break;case"input":t.val(n);break;case"img":var i=t.data("value")||"";""===n&&(i=""),t.attr("onerror")||t.attr({onerror:"Pub.imgNoFind(this,1)"}),n.indexOf("http")<=-1?t.attr({src:"http://wufunong.oss-cn-shenzhen.aliyuncs.com/"+n+i}):t.attr({src:n+i});break;case"a":var i=t.data("value");"tel"==i&&(""!=n?t.attr("href","tel:"+n):t.click(function(){Pub.msgTip("暂未设置联系方式")}));break;default:t.html(n)}}),e[0].outerHTML}
//渲染列表数据
function n(e,a){var n="",i=$(e);return $.each(a,function(e,a){n+=t(i,a)}),n}
//渲染表单数据
function i(e,a){
//根据Id填充数据objs:数据formId:父级对象
var t,n=$("#"+a);$.each(e,function(e,a){if(null==a&&(a=""),t=n.find("#"+e),0!==t.length){if(t.hasClass("trans")&&(a=t.data("value")[a]),t.hasClass("difTime")&&(a=g(a)),t.hasClass("mult"))return void(a.length>0&&t.removeClass("nval").find("pre").html(a).next().val(a));switch(t[0].localName){case"select":t.children().removeAttr("selected").siblings('[value="'+a+'"]').attr("selected",!0);break;case"input":t.val(a);break;case"img":var i=t.data("value")||"";""===a&&(i=""),t.attr("onerror")||t.attr({onerror:"Pub.imgNoFind(this,1)"}),a.indexOf("http")<=-1?t.attr({src:"http://wufunong.oss-cn-shenzhen.aliyuncs.com/"+a+i}):t.attr({src:a+i});break;case"a":var i=t.data("value");"tel"==i&&(""!=a?t.attr("href","tel:"+a):t.click(function(){Pub.msgTip("暂未设置联系方式")}));break;default:t.html(a)}}})}
//测试数据
function s(e){Pub.tip({content:'<textarea rows="20" style="width:100%">'+JSON.stringify(e)+"</textarea>"})}function o(e){location.hash=$.now(),layer.open({type:1,content:'<iframe src="'+e+'"></iframe>',anim:!1,shade:!1,shadeClose:!1,className:"layIfr"})}
//多行文本输入控制
function r(e){var a=$(e),t=a.prev(),n=a.val();t.html(n+"&nbsp;")}
//数据请求
function l(e,a,t,n,i){$.ajax({url:e,type:"POST",contentType:"application/json",data:JSON.stringify({data:a}),dataType:"JSON",success:function(e){1==page&&n&&(scr.scrollTo(0,0),more=!0,$(n).html("")),t(e);
// if (d.code != 0) { Pub.msgTip(d.msg); return }
var a=e.data;i&&(a=e.data.rows),n&&(null==a||a.length<size?(more=!1,page>1?$("#more").text("无更多数据").show():$("#more").hide()):$("#more").text("上滑加载更多").show(),1==page&&(null==a||0==a.length?Pub.noData({isN:!0}):Pub.noData({cObj:n})))}})}
//无数据
function c(e){var a={isN:!1,nOnj:"#noData",cObj:"#loadHtml,#more"};a=$.extend(a,e),a.isN?($(a.nOnj).removeClass("tip"),$(a.cObj).html("")):$(a.nOnj).addClass("tip")}
//关闭窗口
function u(e){Pub.versions().weixin&&!e?WeixinJSBridge.call("closeWindow"):top.WeixinJSBridge.call("closeWindow")}
//时间格式化n:往前天数d:指定日期
function d(e,a){var t;return t=a?new Date(a):new Date,e&&t.setDate(t.getDate()-e),t=t.toJSON().split("T")[0],t.replace(/-/g,"/")}
//获取验证码
function A(e){var a=$(e),t=a.closest(".layui-m-layerchild").find("#telNum");!a.hasClass("disa")&&Pub.validate(11,t[0],"手机号",/^1\d{10}$/)&&(a.addClass("disa"),l("/wx/sendcode",{mobile:t.val()},function(e){if(e&&0==e.code){Pub.msgTip(e.msg);var t=61;setTime=setInterval(function(){t--,t<=0?(clearInterval(setTime),a.removeClass("disa").text("获取验证码")):a.text(t+"s")},1e3)}else Pub.msgTip(e.msg);0!=e.code&&a.removeClass("disa")}))}
//登录验证
function f(e){var a=$(e),t=a.closest(".layui-m-layerchild"),n=!0,i=t.find("#telNum"),s=t.find("#codNum"),o=i.val(),r=s.val();if(Pub.validate(11,i[0],"手机号",/^1\d{10}$/)||(n=!1),n&&!Pub.validate(6,s[0],"验证码",/\d/)&&(n=!1),n){l("/wx/register",{mobile:o,code:r},function(e){if(2==e.code)Pub.repUrl("/Home/Index");else if(3==e.code||0==e.code){var a=$.cookie("uinfo");a&&(uInfo=$.extend(uInfo,JSON.parse(a))),$.each(uInfo,function(e,a){"number"!=typeof a&&(uInfo[e]=a||"")}),Pub.msgTip("验证成功"),"function"==typeof info&&info(),"function"==typeof loadData&&loadData(1),Pub.hideLogin()}else Pub.msgTip(e.msg)})}}
//提交数据验证
function h(){for(var e="",a=!0,t=$(".validate"),n=0;n<t.length;n++){var i=t.eq(n);if(!i.val()){e=i.attr("placeholder"),a=!1;break}}return{msg:e,flag:a}}
//时间比较
function m(e,a){var t=new Date(e.replace("-","/").replace("-","/"));return!(new Date(a.replace("-","/").replace("-","/"))<t)}
//计算时间差，几天前
function g(e){var a,t,n;_time=new Date(e).getTime()/1e3;var i,s=parseInt((new Date).getTime()/1e3);return i=s-_time,n=parseInt(i/86400),t=parseInt(i/3600),a=parseInt(i/60),n>0&&n<4?n+"天前":n<=0&&t>0?t+"小时前":t<=0&&a>0?a+"分钟前":a<=0?"刚刚":e}
//设置cookie
function v(e,a){$.cookie(e,a,{path:"/"})}
//单选按钮
function p(e,a){var t=$(e).find(".rds"),n=t.hasClass("change"),a=a||"rds",i=Number($(e).find(".discount").val())||1;if(n)t.hasClass("coupon")&&(t.removeClass("change"),$("#payAt").text($("#at").data("value")));else{$("."+a+".change").removeClass("change"),t.addClass("change");var s="",o=$("#at").data("value");i<1&&0==pd.out_trade_no.indexOf("E")&&(s="预存享"+10*i+"折，折后",o=1*(o*i).toFixed(2));var r=o;$("#loadCoupon").find(".rds").hasClass("change")&&($("#wxrds").addClass("change"),r=o-$("#pay_coupon").data("value"),r=r>0?r:0),$("#payAt").text(r),$("#atDis").text(s),$("#at").text(o)}}return{formToJson:a,iOpen:o,tip:function(e){var a={content:"",shadeClose:!1,btn:["我知道了"]};a=$.extend(a,e),layer.open(a)},msgTip:function(e){layer.open({skin:"msg",time:2,content:e})},testTip:s,ajaxY:l,showLoad:function(){$("#loading").show()},hideLoad:function(){$("#loading").fadeOut()},closeWin:u,cScroll:function(e,a){a=a||{};//quadratic, circular, back, bounce, elastic
var t={click:!0,bounce:!1,tap:!1,probeType:3,preventDefaultException:{className:/(^|\s)noPrevent(\s|$)/}};return t=$.extend(t,a),new IScroll("#"+e,t)},tppl:n,loadHtml:i,noData:c,versions:function(){
//浏览器检测
var e=navigator.userAgent;return{weixin:e.indexOf("MicroMessenger")>-1,//是否微信
alipay:e.indexOf("Alipay")>-1}},sliceDate:d,isali:function(e){var a=e;return e.indexOf("http")<=-1&&(a="http://wufunong.oss-cn-shenzhen.aliyuncs.com/"+e),a},tareaIn:r,//多行文本输入控制
repUrl:function(e){location.replace(e)},imgNoFind:function(e,a){void 0==a&&(a=1);var t=["data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAJAQMAAAAB5D5xAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjwA0AABsAAQrj5HwAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAAA5AQMAAABEakRjAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAA5JREFUKM9jGAWjgL4AAAJzAAGTs3WOAAAAAElFTkSuQmCC"];e.src=t[a],e.onerror=null},inputNum:function(e,a){var t=e.value;t=t.replace(/[^\d]/g,""),//非数字的都替换掉
t=t.substr(0,a),e.value=t},getCode:A,//获取验证码
login:f,hideLogin:function(e){"number"==typeof isClose&&e?Pub.closeWin():($("#regist").hide().find("input").val(""),clearInterval(setTime),$("#getCode").removeClass("disa").text("获取验证码"))},validate:function(e,a,t,n){var i=$(a),s=i.val(),o=!0;return 0==s.length?(Pub.msgTip("请输入"+t),o=!1):s.length<e&&(Pub.msgTip(t+"不正确"),o=!1),o},isLogin:function(e){uInfo.mid>0?"function"==typeof e&&e():$("#regist").show()},getParam:function(e){
// 获取参数
var a=window.location.search,t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=a.substr(1).match(t);
//返回参数值
return n?decodeURIComponent(n[2]):null},vali:h,checkEndTime:m,setCookie:v,iOS:/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),changed:p}}(window);
//# sourceMappingURL=jquery.common.js.map
