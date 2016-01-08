/**
*窗口自适应函数
*/
define('flexResize',function(require,exports,module){
	function FlexResize(opt){
		this.defaults={
			baseWidth:640,//基准屏幕宽640px
			baseSize:24,//基准字体大小24px
			minWidth:320,
			maxWidth:768,
			delay:200
		}
		this.oHtml=document.getElementsByTagName('html')[0];
		this.opt=extend(this.defaults,opt);
		this.minScale=this.opt.minWidth/this.opt.baseWidth;
		this.maxScale=this.opt.maxWidth/this.opt.baseWidth;
		this.debounceTimer=null;
		//默认配置扩展
		function extend(obj1,obj2){
			for(var key in obj2){
				obj1[key]=obj2[key];
			}
			return obj1;
		}
	}
	FlexResize.prototype.init=function(){
		this.resize();
		this.bind();
	}
	FlexResize.prototype.resize=function(){
		var baseW=this.oHtml.clientWidth;
		if(baseW>this.opt.maxWidth){//PC大页面尺寸
			baseW=this.opt.baseWidth;
		}
		var scaleRadio=baseW/this.opt.baseWidth;
		if(scaleRadio<this.minScale)scaleRadio=this.minScale;
		if(scaleRadio>this.maxScale)scaleRadio=this.maxScale;
		this.oHtml.style.fontSize=this.opt.baseSize*scaleRadio+'px';
	}
	FlexResize.prototype.bind=function(){
		var f=this;
		window.onresize=function(){
			clearTimeout(f.debounceTimer);
			f.debounceTimer=setTimeout(function(){
				f.resize();
			},f.opt.delay);
		}
	}
	module.exports=FlexResize;
});