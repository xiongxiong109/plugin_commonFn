/*弹出层函数
@str:要显示的文字
@cb:点击确定后的回调函数,可选
@author:xiongjianqiao
**/
;(function($){
	$.showOverlay=function(str,cb){
		var clickEvent="ontouchevent" in document.documentElement ? "tap" : "click";
		str=str || '';
		$("#box").find('p').text(str.toString());

		$("#box").css({
			'opacity':0,
			'position':'fixed',
			'transform':'scale(0) translateY(-50%)',
			'-webkit-transform':'scale(0) translateY(-50%)',
			'top':'50%'
		});

		$("#overlay").fadeIn(200,showBox);

		function hideBox(){
				$("#box").animate({
					'opacity':0,
					'scale':0,
					'translateY':'-50%'
				},200,'ease-in',function(){
					$("#overlay").fadeOut(function(){
						$("#overlay").hide();
						cb && cb.call();
					});
				});
		}

		function showBox(){
			$("#box").animate({
				'opacity':1,
				'scale':1,
				'translateY':'-50%'
			},300,'ease',function(){
				//弹出框点击按钮
				$("#confirm").one(clickEvent,hideBox);
			});
		}
	}
})(Zepto);