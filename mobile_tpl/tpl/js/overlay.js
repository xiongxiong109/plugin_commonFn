/*弹出层函数
@str:要显示的文字
@cb:点击确定后的回调函数,可选
**/
function showOverlay(str,cb){
	var clickEvent="ontouchevent" in document.documentElement ? "tap" : "click";
	str=str || '';
	$("#box").find('p').text(str.toString());

	$("#box").css({
		'opacity':0,
		'transform':'translateY(-35%)',
		'-webkit-transform':'translateY(-35%)',
		'top':($(window).height()+$(window).scrollTop()-$("#box").height())/2
	});

	//弹出框点击按钮
	$("#confirm").one(clickEvent,function(){

		$("#box").animate({
			'opacity':0,
			'transform':'translateY(-35%)',
			'-webkit-transform':'translateY(-35%)'
		},300,'ease',function(){
			cb && cb.call();
			$("#overlay").fadeOut();
		});

	});

	$("#overlay").fadeIn(200,function(){
		$("#box").animate({
			'opacity':1,
			'translateY':'0'
		},300,'ease');
	});
}