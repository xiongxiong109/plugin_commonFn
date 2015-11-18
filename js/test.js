$(function(){
	//新建验证参数
	var validator=new FormValidator();
	validator.add([
		{
			name:'regTel',
			reg:{
				required:true,
				tel:/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
			},
			msg:{
				required:'手机号码不能为空',
				tel:'请输入正确的手机号码'
			}
		}
	]);
	//新建验证码实例
	var count=new Count();
	var options={
		btn:'code',
		time:30,
		unlock:unlock,
		countTag:'countCode'
	}
	count.init(options);
	//获取表单dom
	var oForm=document.forms['form'];
	oForm.code.onclick=function(){
		var rst=validator.valid(oForm.tel.value,'regTel');
		if(typeof rst=='string'){
			$.showOverlay(rst);
		}
		else{
			// ajax post
			// removeItem(options.countTag);//清除获取验证码的时间
		}
	}

	//unlock
	function unlock(){
		var rst=validator.valid(oForm.tel.value,'regTel');
		if(typeof rst=='boolean'){
			return true;
		}
		return false;
	}
});