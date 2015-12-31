事件监听是有返回值的,即使事件监听中传递的是匿名函数,依然可以利用赋值的方式获取到匿名函数,然后就可以取消事件监听了。

对于游戏级别的keydown事件,keydown事件其实是有一定的延迟的,所以不可直接在addEventListener的keydown事件中绑定位移事件,而是应该把事件存储起来,然后利用更高效的渲染方式去渲染动画。

例如：
function bindEvent(plane,enableKeyboard){

	planeTimer.press=mainPanel.addEventListener('pressup',function(e){
		var L=e.stageX;
		if(L<=16){
			L=16;
		}else if(L>canvas.width-16){
			L=canvas.width-16;
		}
		createjs.Tween.get(plane)
		.to({
			x:L
		},400,createjs.Ease.circOut);

	});
	if(enableKeyboard){//是否开启键盘监听,游戏级的按键处理
		var keyDown={};
		document.addEventListener('keydown',function(e){

			if(e.keyCode==39 || e.keyCode==68){//右
				keyDown['right']=true;
			}
			else if(e.keyCode==37 || e.keyCode==65){//左
				keyDown['left']=true;
			}

		});
		document.addEventListener('keyup',function(e){
				var key=null;
				if(e.keyCode==39 || e.keyCode==68){
					key='right';
				}
				if(e.keyCode==37 || e.keyCode==65){
					key='left';
				}
				if(key){
					delete keyDown[key];
				}
		});
		planeTimer.move=createjs.Ticker.addEventListener('tick',function(){
			if('right' in keyDown){
				if(plane.x>=canvas.width-16){
					plane.x=canvas.width-16;
				}
				else{
					plane.x+=8;
				}
				
			}
			if('left' in keyDown){
				if(plane.x<=16){
					plane.x=16;
				}
				else{
					plane.x-=8;
				}
			}
		});
	}
}