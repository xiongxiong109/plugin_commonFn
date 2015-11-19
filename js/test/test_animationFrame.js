define(function(require,exports,module){
	//加载兼容所有浏览器的animationFrame方法
	require('animationFrame');
	var oBox=document.querySelector("#box");	
	var animationTimer=null;

	var len=500;
	move();
	function move(){
		oBox.style.left=Math.ceil( oBox.offsetLeft+(len-oBox.offsetLeft)*0.05 )+'px';
		//cancel必须放到request的下面才会生效
		animationTimer=requestAnimationFrame(move);
		if(oBox.offsetLeft>=len){
			cancelAnimationFrame(animationTimer);
		}
	}
});