/*
图片懒加载插件
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