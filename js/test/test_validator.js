define(function(require,exports,module){
	var FormValidator=require('validator');
	var form=document.forms[0];
	var oTel=form.tel,
			oCode=form.code,
			oSmt=form.smt;
	var oTips=document.querySelector("#formTip");

	//调用formValidator;
	var validator=new FormValidator();

	validator.add([
		{
			name:'telReg',
			reg:{
					tel:/^(0|86|17951)?(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/,
					required:true
			},
			msg:{
					tel:'请填写正确的手机号码',
					required:'手机号码不能为空'
			}
		},
		{
				name:'codeReg',
				reg:{
						code:/^\d{6}$/,
						head:/^1/,
						required:true
				},
				msg:{
						code:'验证码长度不符',
						head:'必须以1开头',
						required:'请输入验证码'
				}
			}
	]);
	

	smt.onclick=function(e){
		e.preventDefault();
		var telValid=validator.valid(oTel.value,'telReg');
		var codeValid=validator.valid(oCode.value,'codeReg');

		if( !(telValid==true) ){
			oTips.innerHTML=telValid;
		}
		else if( !(codeValid==true) ){
			oTips.innerHTML=codeValid;
		}
		else{
			oTips.innerHTML='';
			form.submit();
		}

	}
});