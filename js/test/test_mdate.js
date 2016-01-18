define(function(require,exports,module){
	require('iscroll');
	var oPickerBar=$(".picker-fixed-line");
	var oPanel=$(".picker-panel");
	var oMask=$(".picker-mask");

	$("#date").on('tap',function(){
		oMask.parent().show();
		oMask.fadeIn(200,function(){
			oPanel.animate({
				'translate3d':'0,0,0'
			},200,'ease-out',function(){
				var oYear=$("#scrollYear");
				var oYearScroll=new IScroll(oYear[0]);

				//滚动到当前年份
				var oLis=oYear.find('li');
				var oAct=oYear.find('li.active');
				var baseH=oAct.height();
				var maxH=(oLis.length-2)*baseH-oLis.height();
				scrollTop(oYearScroll,scrollTop);

				oYearScroll.on('scrollStart',function(){
					oLis.removeClass('active');
				});
				oYearScroll.on('scrollEnd',function(){
					var inter=this.y/baseH;
					var realH=Math.round(inter)*baseH;
					if(!isInteger(Math.abs(inter))){
						if( Math.abs(Math.abs(this.y)-maxH)<=20 ){
							realH=this.y;
						}
						oYearScroll.scrollTo(0,realH,200);
					}
					oLis.each(function(idx,ele){
						if( Math.abs($(ele).position().top-baseH)<=8 ){
							$(ele).addClass('active');
						}
					});
				});
				function isInteger(num){
					return num===parseInt(num);
				}
				function scrollTop(iScroll,scroll){
					var scroll=Math.floor( oAct.position().top )-oAct.height();
					iScroll.scrollTo(0,-scroll,200);
				}
			});
		});
	});
});