define(function(t,e,n){function o(){this.defaults={btn:null,time:30,unlock:!0,countTag:"Count",refresh:!0}}function i(t){return window.localStorage?window.localStorage.getItem(t):a(t)}function c(t,e){window.localStorage?window.localStorage.setItem(t,e):l(t,e,time)}function u(t){window.localStorage?window.localStorage.removeItem(t):r(t)}function a(t){var e,n=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return(e=document.cookie.match(n))?unescape(e[2]):null}function l(t,e,n){document.cookie=t+"="+e+";expires="+1e3*n}function r(t){l(t,null,-1)}function s(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent("on"+e,n)}function d(t,e,n){t.removeEventListener?t.removeEventListener(e,n):t.detachEvent("on"+e,n)}o.prototype.init=function(t){this.opt=this.extend(this.defaults,t);var e=document.getElementById(this.opt.btn);if(i(this.opt.countTag))if(this.opt.refresh){var n=(new Date).getTime();this.countTime(n),e.setAttribute("disabled","disabled")}else u(this.opt.countTag);else this.bindEvent(this.opt.btn)},o.prototype.bindEvent=function(t){function e(){"function"==typeof o.opt.unlock&&o.opt.unlock()?(this.setAttribute("disabled","disabled"),o.countTime((new Date).getTime()),d(n,"click",e)):1==o.opt.unlock&&(this.setAttribute("disabled","disabled"),o.countTime((new Date).getTime()),d(n,"click",e))}var n=null,o=this;n=document.getElementById(t),s(n,"click",e)},o.prototype.countTime=function(t){function e(){var t=(new Date).getTime(),e=o.time-Math.floor((t-r)/1e3);l.value=e+"秒后重新获取",0>=e&&(e=0,clearInterval(a),u(o.countTag),l.removeAttribute("disabled"),l.value="获取验证码",n.bindEvent(o.btn))}var n=this,o=this.opt,a=null,l=document.getElementById(o.btn);i(o.countTag)||c(o.countTag,t,o.time);var r=i(o.countTag);e(),a=setInterval(e,1e3)},o.prototype.clear=function(){var t=this.opt;u(t.countTag)},o.prototype.extend=function(t,e){for(var n in e)t[n]=e[n];return t},n.exports=o});