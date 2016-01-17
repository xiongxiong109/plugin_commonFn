define(function(require,exports,module){
	// 测试滚动加载插件
	var url=__uri("./scroll.json");
	var btnStatus={
		"static":"",
		"loading":"正在加载...",
		"end":"没有更多数据了"
	};
	var oBtn=$("#load"),
			oTip=$("#loadStatus"),
			oList=$("#list");
	var LoadPer5=null;
	$.getJSON(url,function(data){
		console.log(data.length);
		LoadPer5=require('scrollLoad')(5,data);
		oBtn.on('tap',loadData);
	});

	function loadData(){
		var data=LoadPer5();
		if(data){
			createDom(data);
			oTip.text(btnStatus.loading);
			hideTip();
		}else{
			oTip.text(btnStatus.end);
			hideTip();
			oBtn.attr('disabled','disabled');
			oBtn.off('tap',loadData);
		}
	}

	function hideTip(){
		setTimeout(function(){
			oTip.text(btnStatus.static);
		},500);
	}

	function createDom(data){
		var str="";
		$.each(data,function(idx,ele){
			str+="<li>"+ele.name+"</li>";
		});
		oList.append($(str));
	}
});