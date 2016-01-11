define(function(require,exports,module){
	var Swipe=require('swipe');
	console.log(Swipe);
	var oNavList=$(".swipe-nav-list");
	var oNavSwipeImgs=$(".swipe-wrap").find('div img');
	var oNavLen=oNavSwipeImgs.length;
	var startSlide=0,oLis;
	//初始化导航点
	initSwipeNav();
	//加载当前图片
	loadImg(oNavSwipeImgs.eq(startSlide));
	oLis=oNavList.find('li');
	//初始化swipe
	var navSwipe=new Swipe($("#swipe")[0],{
		startSlide:startSlide,
	  speed: 400,
	  auto: 2000,
	  continuous: true,
	  disableScroll: false,
	  stopPropagation: false,
	  callback: function(index, elem) {
	  	oLis.removeClass('active');
	  	oLis.eq(index).addClass('active');
	  },
	  transitionEnd: function(index, elem) {
	  	var curImg=oNavSwipeImgs.eq(index);
	  	loadImg(curImg);
	  }
	});

	function loadImg($img){
		$img.attr('src',$img.data('src'));
	}
	function initSwipeNav(){
		var liStr='';
		for(var i=0;i<oNavLen;i++){
			liStr+='<li></li>';
		}
		oNavList.html(liStr);
		oLis=oNavList.find('li');
		oLis.eq(startSlide).addClass('active');
	}
});