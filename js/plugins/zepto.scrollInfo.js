/**
Zepto无缝滚动消息插件
@author:xiongjianqiao,
注意,因为seemless为true时会在oUl后面append一个clone节点,所以当重复调用的时候有可能会生成多个节点
另外如果要重复调用这个函数,那么为了清除定时器，需要把定时器变量绑定到全局变量(比如$)中
调用示例:
$("#scrollInfo").scrollInfo({
	seemless:false,
	duration:200,
	delay:2000,
	ease:'ease-out',
	cb:function(){
		console.log('x');
	}
});

*/
;(function($){
	$.fn.scrollInfo=function(opt){
		var defaults={
			duration:200, //滚动消息动画时间
			delay:1000, //滚动延迟时间
			ease:'ease-in-out', //滚动ease函数
			cb:function(){}, //滚动回调函数
			auto:true, //是否自动滚动
			seemless:true //是否无缝滚动
		}
		opt=$.extend(defaults,opt || {});
		var oWrap=$(this),
				oUl=oWrap.find('ul');
		var curIndex=0;
		if(opt.seemless==true){//如果是无缝滚动
			cloneLi(oUl);//克隆第一个li
			scrollList(true);//无缝滚动
		}else{
			scrollList(false);//不是无缝滚动
		}


		function cloneLi(ul){
			var oLi=$(ul).find('li').eq(0)[0].cloneNode(true);//深拷贝第一个li
			$(ul).append(oLi);
		}

		function scrollList(isSeemLess){
			var oLi=oUl.find('li'),
					perH=oLi.height(),
					len=oLi.length; //总长度包括了被克隆的节点在内
			clearInterval($.scrollTimer);
			$.scrollTimer=setInterval(function(){
				curIndex++;
				animateUl( (-perH*curIndex),opt.duration);
				if(curIndex>=len-1){
					if(isSeemLess){
						animateUl( (-perH*curIndex),opt.duration,function(){
							animateUl(0,0,function(){
								curIndex=0;
							});
						});
					}else{
						curIndex=-1;
					}
				}
			},opt.delay);
		}

		function animateUl(disY,duration,cb){
			oUl.animate({
				'translate3d':'0,'+disY+'px,0'
			},duration,opt.ease,function(){
				cb && cb();
				opt.cb && opt.cb();
			});
		}
	}
})(Zepto);