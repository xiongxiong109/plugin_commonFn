define(function(require,exports,module){
	require('iscroll');
	var oPickerBar=$(".picker-fixed-line");
	var oPanel=$(".picker-panel");
	var oMask=$(".picker-mask");
	var oYear=$("#scrollYear");
	var oYearScroll=new IScroll(oYear[0],{
		snap:'li',//通过snap直接捕获单个元素,但是要引入的是完整的iscroll.js
		tap:true,
		proType:2,
		bounceEasing:{//通过bounceEasing可以配置动画ease
			style:'cubic-bezier(.9,.22,.05,1.34)',
			fn:function(k){return k}
		}
	});
	//调用scrollToElement方法滚动到某个元素所在的位置
	oYearScroll.scrollToElement($("li.active").prev()[0],500,0,0,IScroll.utils.ease.back);
});