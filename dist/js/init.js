"use strict";var scr,size=60,page=1,more=!0,wHei,setTime,uInfo={mid:"",mobile:"",wxheadic:""};$.ajaxSetup({error:function(e,o,n){500!==e.status&&404!==e.status||Pub.msgTip("系统累趴了")},complete:function(e,o){Pub.hideLoad()},beforeSend:function(e){Pub.showLoad()}});var scrObj=document.getElementById("scrObj"),scrCon=document.getElementById("scroll");$(function(){wHei=$(window).height(),$("#noScro,#loading,#regist,#fBtn,#areaBg").on("touchmove",function(e){e.preventDefault()}),$("#fBtn").length>0&&FastClick.attach(document.getElementById("fBtn")),scr=Pub.cScroll("scroll"),scr.on("beforeScrollStart",function(){var e=scr.scrollerHeight,o=scrObj.offsetHeight;(o>e||o<e&&scrCon.offsetHeight<e)&&scr.refresh()}),scr.on("scrollStart",function(){1==scr.directionY?$(".person").addClass("c1"):$(".person").removeClass("c1")}),$("input").on("focus",function(){$(this).select()}),$(".input").on("focus",function(){if(!Pub.iOS){var e=$(this).closest(".layCon").prev()[0];setTimeout(function(){scr.refresh(),scr.scrollToElement(e)},300)}});var e=$.cookie("uinfo");e&&(uInfo=$.extend(uInfo,JSON.parse(e))),$.each(uInfo,function(e,o){"number"!=typeof o&&(uInfo[e]=o||"")}),$(window).on("hashchange",function(){var e=$.cookie("reload")||!1;"#"==(0===location.hash.indexOf("#")?location.hash:"#")&&(e&&"false"!=e&&(Pub.setCookie("reload",!1),location.reload(!0)),layer.closeAll())})});
//# sourceMappingURL=init.js.map
