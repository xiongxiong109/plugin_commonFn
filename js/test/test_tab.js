define(function(require,exports,module){
	//自适应
	var Flex=require('flexResize');
	var f=new Flex();
	f.init();

	//轮播图
	//swipe
	var oNavLis=$(".list").find('li'),
			slideBar=$(".slide-bar");
	var Swipe=require('swipe');
	var tabSwipe=new Swipe($("#swipe")[0],{
			startSlide:0,
		  speed: 600,
		  // auto: 2000,
		  continuous: false,
		  disableScroll: false,
		  stopPropagation: false,
		  callback: function(index, elem) {
		  	moveBar(index);
		  },
		  transitionEnd: function(index, elem) {
		  }
	});

	oNavLis.on('tap',function(){
		var idx=$(this).index();
		moveBar(idx);
		tabSwipe.slide(idx);
	});

	function moveBar(idx){
		slideBar.css('left',oNavLis.width()*idx);
	}
});