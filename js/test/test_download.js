define(function(require){
	var info=require('browser')();
	if(info.mobile){//移动端
		if(info.ios){//ios
			if(info.weChat){//ios weiChat
				alert('ios 微信客户端');
			}
			else {
				alert('ios 浏览器客户端');
			}
		}
		else if(info.android){//android
			if(info.weChat){//android weChat
				alert('android 微信客户端');
			}
			else{
				alert('android 浏览器客户端');
			}
		}
		else{
			if(info.weChat){//other weChat
				alert('其他微信客户端');
			}
			else{//other
				alert('其他移动端');
			}
		}
	}
});