/*zepto datepicker日期选择插件
* author:xiongjianqiao
* 依赖了iScroll(会将iScroll集成到插件中)
* 年份默认从当前年份起正负5年
* 调用方式:
	<input type="text" readonly="readonly" id="date">
	$("#date").datepicker(options);
*/
;(function($){
	$.fn.datepicker=function(opt){
		var defaults={
			type:'datetime', //date:只选择年月日,time:只选择时分,datetime:选择年月日时分秒
			confirm:null,
			cancel:null
		}
		opt=$.extend(defaults,opt || {});

		//变量
		var thStr=[{'year':'年'},{'mon':'月'},{'day':'日'},{'hour':'时'},{'min':'分'}];
		var $Ipt=$(this);
		//iScroll
		var yearScroll,monScroll,dayScroll,hourScroll,minScroll;
		var scrollArr=[
			{iscroll:yearScroll,dom:'yearScroll'},
			{iscroll:monScroll,dom:'monScroll'},
			{iscroll:dayScroll,dom:'dayScroll'},
			{iscroll:hourScroll,dom:'hourScroll'},
			{iscroll:minScroll,dom:'minScroll'}
		];
		//如果页面中没有picker-wrap,就在页面中append一个panel模板
		if(!$(".picker-wrap")[0]){
			createPickerPanel();
		}

		//事件
		//点击初始化日历组件
		$Ipt.on('tap',initPanel);
		//点击隐藏
		$("body").delegate('.picker-mask','tap',hidePanel);
		/*初始化日历面板函数,主要是根据type初始化面板*/
		function initPanel(){
			switch (opt.type){
				case 'datetime':
				createScrollPanel(thStr);
				break;
			}
		}

		//动态创建滚动基础面板
		function createScrollPanel(arr){
			var thStr="",scrollStr="";
			$.each(arr,function(idx,th){
				var k=Object.keys(th);//ymd
				var scrollId=k+'Scroll';
				var v=th[k];//年月日
				thStr+=['<li>',v,'</li>'].join('');
				scrollStr+='<div class="picker-scroll-wrap" id="'+scrollId+'"></div>';
			});
			$(".panel-table-th").html(thStr);
			$('.scroll-wraps').html(scrollStr);
			createScrollDetail();
		}

		//创建滚动数据
		function createScrollDetail(){
			var date=new Date(),
					curYear=date.getFullYear(),
					curMonth=date.getMonth()+1,
					curDay=date.getDate(),
					curHour=date.getHours(),
					curMin=date.getMinutes();
			var maxMon=getMonthDay(curMonth,curYear);
			//根据当前月份与年份判断该月有多少天
			createList("#yearScroll",curYear,curYear-5,curYear+5);
			createList('#monScroll',curMonth,1,12);
			createList('#dayScroll',curDay,1,maxMon+1);
			createList('#hourScroll',curHour,1,23);
			createList('#minScroll',curMin,0,59);
			//显示面板
			showPanel();
		}
		//判断每月天数
		function getMonthDay(mon,year){
			if(mon==2){
				if(isLeapYear(year)){
					return 29;
				}else{
					return 28;
				}
			}else if(mon%2!=0){//奇数月
				if(mon<=7){//<=7
					return 31;
				}else{
					return 30;
				}
			}else{//偶数月(无2月)
				if(mon<=7){//<=7
					return 30;
				}else{
					return 31;
				}
			}
		}

		//判断闰年
		function isLeapYear(year){
			if( (year%4==0 && year%100!=0) || year%400==0){
				return true;
			}
			return false;
		}
		//创建年份列表
		function createList(id,cur,from,to){
			//创建年份
			var str="<ul>";
			str+="<li>&nbsp;</li>";
			for(var i=from;i<to;i++){
				if(i==cur){
					str+=['<li class="active">',i,'</li>'].join('');
				}else{
					str+=['<li>',i,'</li>'].join('');
				}
			}
			str+="<li>&nbsp;</li>";
			str+="</ul>";
			$(id).html(str);
		}
		//显示面板函数
		function showPanel(){
			var w=$(".picker-wrap"),m=$(".picker-mask"),p=$(".picker-panel");
			w.show();
			m.fadeIn(200,function(){
				p.animate({
					'translate3d':'0,0,0'
				},200,'ease-out');
			});
			//初始化IScroll
			initScroll();
		}

		//隐藏面板函数
		function hidePanel(){
			var w=$(".picker-wrap"),m=$(".picker-mask"),p=$(".picker-panel");
			p.animate({
				'translate3d':'0,100%,0'
			},200,'ease-out',function(){
				m.fadeOut(200,function(){
					w.hide();
				});
			});
			//销毁IScroll
			destroyScroll();
		}

		//初始化IScroll函数
		function initScroll(){
			$.each(scrollArr,function(idx,obj){
				obj.iscroll=new IScroll('#'+obj.dom,{
					snap:'li',
					proType:2,
					tap:true
				});
				//滚动到默认位置
				scrollToDefault(obj.iscroll);
				//给每个scroll添加滚动事件监听 
				obj.iscroll.on('scrollStart',removeAct);
				obj.iscroll.on('scrollEnd',addAct);
			});
		}
		//销毁IScroll
		function destroyScroll(){
			$.each(scrollArr,function(idx,obj){
				obj.iscroll.destroy();
			});
		}

		//移除active样式
		function removeAct(){
			var oWrap=this.wrapper;
			var oLis=$(oWrap).find('li');
			oLis.removeClass('active');
		}
		//给特定元素添加样式,并获取该元素的值
		function addAct(){
			var oWrap=this.wrapper;
			var oLis=$(oWrap).find('li');
			var baseH=oLis.height();
			var curIndex=this.y/baseH-0.2;
			console.log(curIndex);
			oLis.eq(curIndex).addClass('active');
		}
		//滚动到默认位置
		function scrollToDefault(scrollObj){
			var curLi=$(scrollObj.wrapper).find('li.active').prev()[0];
			scrollObj.scrollToElement(curLi,500,0,0,IScroll.utils.ease.back);
		}
		/*创建日历面板函数*/
		function createPickerPanel(){
			var $wrap=$('<div class="picker-wrap">'),//大包裹
					$mask=$('<div class="picker-mask">'),//遮罩层
					$panel=$('<div class="picker-panel">'),//日期选择面板
					$header=$('<div class="picker-panel-header">请选择时间</div>'),//title
					$main=$('<div class="picker-panel-main">'),//主体部分
					$table=$('<div class="picker-panel-table">'),//表格部分
					$th=$('<ul class="panel-table-th">'),//表格title年月日ul
					$scrollWrap=$('<div class="scroll-wraps">'),//滚动部分
					$footer=$('<div class="picker-panel-footer">'),//footer
					$btnConfirm=$('<a href="javascript:void(0);" class="picker-btn btn-confirm">确定</a>'),
					$btnCancel=$('<a href="javascript:void(0);" class="picker-btn btn-confirm">取消</a>'),
					$line=$('<div class="picker-fixed-line">');
			$panel.append($header);
			$table.append($th);
			$table.append($scrollWrap);
			$main.append($table);
			$panel.append($main);
			$footer.append($btnConfirm);
			$footer.append($btnCancel);
			$panel.append($footer);
			$panel.append($line);
			$wrap.append($mask);
			$wrap.append($panel);
			$('body').append($wrap);
		} 
	}
})(Zepto);