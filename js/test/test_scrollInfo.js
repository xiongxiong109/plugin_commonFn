define(function(require,exports,module){
	require('$scrollInfo');
	var oUl=$(".scroll-info-list");
	var options={
		duration:200,
		delay:1000,
		ease:'ease-out'
	};

	ajaxData();
	setInterval(ajaxData,5000);
	function ajaxData(){
		$.get('/js/test/scroll.json',function(data){
			var load4=require('scrollLoad')(4,data);
			var data=load4();
			updateData(data);
		});
	}

	function updateData(data){
		var str="";
		$.each(data,function(idx,ele){
			str+="<li>name:"+ele.name+"</li>";
		});
		oUl.html(str);
		$("#scrollInfo").scrollInfo(options);
	}
});