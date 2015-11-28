define(function(require){
	var info=require('download')();
	if(info.mobile){//移动端
		if(info.ios){//ios
			if(info.weChat){//ios weiChat
				console.log('ios 微信客户端');
			}
			else {
				console.log('ios 浏览器客户端');
			}
		}
		else if(info.android){//android
			if(info.weChat){//android weChat
				console.log('android 微信客户端');
			}
			else{
				console.log('android 浏览器客户端');
			}
		}
		else{
			if(info.weChat){//other weChat
				console.log('其他微信客户端');
			}
			else{//other
				console.log('其他移动端');
			}
		}
	}
});