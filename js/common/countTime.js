/*
验证码倒计时插件
@author:xiongjianqiao
@count:默认会根据浏览器的支持情况,使用localStorage或者cookie来存储计时变量
@btn:dom元素,以document.getElementById(str)的形式获取
@time:计时时间
@countTag:存储标记
@使用示例:
var codeCount=new Count();
var options={
	btn:"btn",
	time:10,//60s倒计时
	countTag:'codeCount'
}
codeCount.init(options);
*/
define('countTime',function(require,exports,module){

	function Count(){
		this.defaults={
			btn:null,
			time:30,
			unlock:true,//锁存函数
			countTag:'Count', //使用localStorage的标记
			refresh:true //刷新页面后是否仍然记录时间
		}	
	}

	/*初始化*/
	Count.prototype.init=function(opt){
		this.opt=this.extend(this.defaults,opt);
		var btn=document.getElementById(this.opt.btn);
		if(getItem(this.opt.countTag)){
			if(this.opt.refresh){//刷新仍然记录时间
				var curTime=new Date().getTime();
				this.countTime(curTime);
				btn.setAttribute('disabled','disabled');
			}
			else{
				removeItem(this.opt.countTag);
			}
		}
		else{
			this.bindEvent(this.opt.btn);
		}
	}

	Count.prototype.bindEvent=function(selector){
		var obj=null,counter=this;
		obj=document.getElementById(selector);
		bind(obj,'click',lockBtn);
		function lockBtn(){
			if(typeof counter.opt.unlock=='function' && counter.opt.unlock()){
				this.setAttribute('disabled','disabled');
				counter.countTime(new Date().getTime());
				unbind(obj,'click',lockBtn);
			}
			else if(counter.opt.unlock==true){
				this.setAttribute('disabled','disabled');
				counter.countTime(new Date().getTime());
				unbind(obj,'click',lockBtn);
			}
		}
	}

	/*从当前计时开始计数*/
	Count.prototype.countTime=function(startTime){
		var c=this;
		var opt=this.opt,timer=null;
		var oBtn=document.getElementById(opt.btn);
		if(!getItem(opt.countTag)){
			setItem(opt.countTag,startTime,opt.time);
		}
		var start=getItem(opt.countTag);

		count();
		timer=setInterval(count,1e3);
		/*计时子函数*/
		function count(){
			var cur=new Date().getTime();
			var disTime=opt.time-Math.floor((cur-start)/1000);
			oBtn.value=disTime+"秒后重新获取";
			if(disTime<=0){
				disTime=0;
				clearInterval(timer);
				removeItem(opt.countTag);
				oBtn.removeAttribute('disabled');
				oBtn.value="获取验证码";
				c.bindEvent(opt.btn);
			}
		}
	}
	/*清除计时信息*/
	Count.prototype.clear=function(){
		var opt=this.opt;
		removeItem(opt.countTag);
	}
	/*扩展对象方法*/
	Count.prototype.extend=function(obj1,obj2){
		for(var i in obj2){
			obj1[i]=obj2[i];
		}
		return obj1;
	}

	/*存储方法封装*/
	function getItem(key){
		if(window.localStorage){
			return window.localStorage.getItem(key);
		}
		else{
			return getCookie(key);
		}
	}
	function setItem(key,value){
		if(window.localStorage){
			window.localStorage.setItem(key,value);
		}
		else{
			setCookie(key,value,time);
		}
	}
	function removeItem(key){
		if(window.localStorage){
			window.localStorage.removeItem(key);
		}
		else{
			removeCookie(key);
		}
	}

	/*cookie操作*/
	function getCookie(key){
		var arr,reg=new RegExp("(^| )"+key+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg))
		return unescape(arr[2]); 
		else 
		return null;
	}
	/*time以秒为单位*/
	function setCookie(key,value,time){
		document.cookie=key+"="+value+";expires="+time*1000;
	}
	function removeCookie(key){
		setCookie(key,null,-1);
	}

	// 绑定事件
	function bind(obj,ev,fn){
		if(obj.addEventListener){
			obj.addEventListener(ev,fn,false);
		}
		else{
			obj.attachEvent('on'+ev,fn);
		}
	}
	//取消事件绑定
	function unbind(obj,ev,fn){
		if(obj.removeEventListener){
			obj.removeEventListener(ev,fn);
		}
		else{
			obj.detachEvent('on'+ev,fn);
		}
	}
	module.exports=Count;
});