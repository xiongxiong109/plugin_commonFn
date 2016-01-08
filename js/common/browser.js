/*
处理下载链接函数
主要根据微信、非微信浏览器；安卓、苹果机型进行浏览器检测
*/
define('browser',function(require,exports,module){
	var bw=navigator.userAgent;
	function TestBrower(){
		return {
				mobile:isMobile(),
				ios:isIOS(),
				android:isAndroid(),
				weChat:isWeixin()
		}
	}

	//判断所有移动端
	function isMobile(){
		return /AppleWebKit.*Mobile/i.test(bw) || /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/i.test(bw);
	}
	//判断是否微信
	function isWeixin(){
		return /MicroMessenger/i.test(bw);
	}

	//判断是否安卓
	function isAndroid(){
		return /Android/i.test(bw);
	}

	//判断是否苹果
	function isIOS(){
		return /iPhone|iPod|iPad/i.test(bw);
	}
	module.exports=TestBrower;
});