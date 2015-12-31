define(function(t,i,e){function s(t){function i(t,i){for(var e in i)t[e]=i[e];return t}this.defaults={baseWidth:640,baseSize:24,minWidth:320,maxWidth:768,delay:200},this.oHtml=document.getElementsByTagName("html")[0],this.opt=i(this.defaults,t),this.minScale=this.opt.minWidth/this.opt.baseWidth,this.maxScale=this.opt.maxWidth/this.opt.baseWidth,this.debounceTimer=null}s.prototype.init=function(){this.resize(),this.bind()},s.prototype.resize=function(){var t=this.oHtml.clientWidth;t>this.opt.maxWidth&&(t=this.opt.baseWidth);var i=t/this.opt.baseWidth;i<this.minScale&&(i=this.minScale),i>this.maxScale&&(i=this.maxScale),this.oHtml.style.fontSize=this.opt.baseSize*i+"px"},s.prototype.bind=function(){var t=this;window.onresize=function(){clearTimeout(t.debounceTimer),t.debounceTimer=setTimeout(function(){t.resize()},t.opt.delay)}},e.exports=s});