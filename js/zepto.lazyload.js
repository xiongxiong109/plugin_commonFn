/*
图片懒加载插件
@effect:显示效果,目前是fadeIn和常规显示
@offsetTop:top偏移量
@使用方法:图片资源的src使用placeholder图片,真实的图片路径则放置在data-src里面
@author:xiongjianqiao
调用示例:
$("img.lazy").lazyload({
	effect:'fadeIn',
	offsetTop:30
});

*/
;(function($){
	var defaults={
		effect:null,
		offsetTop:0
	}
	$.fn.lazyload=function(opt){
		opt=$.extend(defaults,opt);
		var imgs=$(this);
		imgs.each(function(idx,ele){
			ele.isOver=false;
		});
		var iCur=0;
		checkImg();
		$(window).on('scroll',checkImg);
		function checkImg(){
			console.log(iCur);
			var scrollTop=$(window).height()+$(window).scrollTop();
			if(iCur>=imgs.length-1){
				$(window).off('scroll',checkImg);
			}
			imgs.each(function(idx,ele){
				var top=$(ele).offset().top-opt.offsetTop;
				if(scrollTop>=top){
					if(!ele.isOver){
						ele.isOver=true;
						iCur=idx;
						ele.src=$(ele).data('src');
						$(ele).on('load',function(){
							if(opt.effect){
								$(ele).fadeIn();
							}
							else{
								$(ele).show();
							}
						});
					}
				}
			});
		}
	}
})(Zepto);