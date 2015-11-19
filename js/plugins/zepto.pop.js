/*
*自定义弹窗
*调用方法示例:$("#foo").pop(options)
@author:xiongjianqiao
*/
;(function($){

	var clickEvent="ontouchstart" in document.documentElement ? "tap" : "click";
	var inDom;

	var defaults={
		width:"50%",//响应式弹窗,宽度50%
		cfmOnly:true,//是否只有确定按钮
		msg:'',
		cfmText:"确定",
		cancelText:"取消",
		tapDispear:true,
		effect:'', //可选参数,表示弹出层的弹出方式,这一块的如果有，那么要引入animate.css
		cfmCall:function(){},
		cancelCall:function(){}//确定或者取消后的回调函数
	}
	
	$.fn.pop=function(opt){
		$.fn.pop.opt=$.extend(defaults,opt);
		var wrap=$(this);
		var options=$.fn.pop.opt;

		var overlay=wrap.find("#popOverLay");

			if(options.cfmOnly){
				var layer=$('<div id="popOverLay"></div>'
										+'<div id="popBox">'
										+'<div id="popTxt">'+options.msg+'</div>'
										+'<div id="cfmBtn" class="pop-btn">'+options.cfmText+'</div>'
										+'</div>');
			}
			else{
				var layer=$('<div id="popOverLay"></div>'
										+'<div id="popBox">'
										+'<div id="popTxt">'+options.msg+'</div>'
										+'<div id="cancelBtn" class="pop-btn half br">'+options.cancelText+'</div>'
										+'<div id="cfmBtn" class="pop-btn half">'+options.cfmText+'</div>'
										+'</div>');
			}

			wrap.html(layer);
			overlay=wrap.find("#popOverLay");
			wrap.hide().fadeIn();
		//create
		overlay.css({
			"width":"100%",
			"height":$('body').height()
		});
		$("#popBox").css({
			"width":options.width
		}).css({
			"top":($(window).height()-$("#popBox").height())/2,
			"left":($(window).width()-$("#popBox").width())/2
		});

		//animate
		if(options.effect){
			$("#popBox").addClass('animated').addClass(options.effect);
		}
		overlay.hide().fadeIn(function(){
			//triggerEvent
			if(options.tapDispear){
				overlay.on(clickEvent,function(){
					wrap.fadeOut();
					setTimeout(function(){
							$.fn.pop.opt={};
					},200);
				});
			}
			$("#cfmBtn").on(clickEvent,function(e){
				e.stopPropagation();
				wrap.fadeOut(function(){
					options.cfmCall && options.cfmCall.call(wrap);
					overlay.hide();
					setTimeout(function(){
							$.fn.pop.opt={};
					},200);
				});
			});
			$("#cancelBtn").on(clickEvent,function(e){
				e.stopPropagation();
				wrap.fadeOut(function(){
					options.cancelCall && options.cancelCall.call(wrap);
					overlay.hide();
					setTimeout(function(){
							$.fn.pop.opt={};
					},200);
				});
			});

		});

	}
})(Zepto)