/*
*自定义弹窗
*调用方法示例:$("#foo").pop(options)
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
		effect:'', //可选参数,表示弹出层的弹出方式,这一块的如果有，那么要引入animate.css
		cfmCall:function(){},
		cancelCall:function(){}//确定或者取消后的回调函数
	}

	$.fn.pop=function(opt){

		var wrap=$(this);
		opt=$.extend(defaults,opt);

		var overlay=wrap.find("#popOverLay");

			if(opt.cfmOnly){
				var layer=$('<div id="popOverLay">'
										+'<div id="popBox">'
										+'<div id="popTxt">'+opt.msg+'</div>'
										+'<div id="cfmBtn" class="pop-btn">'+opt.cfmText+'</div>'
										+'</div>'
										+'</div>');
			}
			else{
				var layer=$('<div id="popOverLay">'
										+'<div id="popBox">'
										+'<div id="popTxt">'+opt.msg+'</div>'
										+'<div id="cancelBtn" class="pop-btn half br">'+opt.cancelText+'</div>'
										+'<div id="cfmBtn" class="pop-btn half">'+opt.cfmText+'</div>'
										+'</div>'
										+'</div>');
			}

			wrap.html(layer);
			overlay=wrap.find("#popOverLay");
			wrap.hide().fadeIn();
		//create
		overlay.css({
			"width":"100%",
			"height":"100%"
		});
		$("#popBox").css({
			"width":opt.width
		}).css({
			"top":($(window).height()-$("#popBox").height())/2,
			"left":($(window).width()-$("#popBox").width())/2
		});

		//animate
		if(opt.effect){
			$("#popBox").addClass('animated').addClass(opt.effect);
		}
		overlay.hide().fadeIn(function(){
			//triggerEvent
			$("#cfmBtn").on(clickEvent,function(){
				wrap.fadeOut(function(){
					opt.cfmCall && opt.cfmCall.call(wrap);
					overlay.hide();

					setTimeout(function(){
						opt={};
					},20);

				});
			});
			$("#cancelBtn").on(clickEvent,function(){
				wrap.fadeOut(function(){
					opt.cancelCall && opt.cancelCall.call(wrap);
					overlay.hide();

					setTimeout(function(){
						opt={};
					},20);

				});
			});

		});

	}
})(Zepto)