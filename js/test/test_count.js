define(function(require,module,exports){
	var Count=require('countTime');
	var codeCount=new Count();
	var options={
		btn:"btn",
		time:10,//10s倒计时
		countTag:'codeCount', //存储标记
		unlock:judge //传递阻塞函数,当函数判定为true的时候,执行点击事件,默认不阻塞,即点击后立刻倒计时
	}
	codeCount.init(options);

	var p=10;
	function judge(){
			if(p<10)
			return true;
			return false;
	}
});