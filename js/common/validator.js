define('validator',function(require,exports,module){
	// 表单验证插件
	function FormValidator(options){
		this.items=[];
	}

	FormValidator.prototype.add=function(opt){
		var items=this.items;
		if(opt.length){//数组形式插入
			for(var i=0;i<opt.length;i++){
				items.push(opt[i]);
			}
		}
		else{
			items.push(opt);
		}
		
	}

	FormValidator.prototype.valid=function(str,regName){
		var items=this.items;
		var idx=0;
		for(var i=0;i<items.length;i++){
			if(items[i].name===regName){
				idx=i;
				break;
			}
			if(i>=items.length-1){
				console.error('please use add function to get the \''+regName+'\' first!');
				return false;
			}
		}
		var reg=items[i].reg;
		var msg=items[i].msg;
		if(reg['required']){
			if(str==''){
				return msg['required'];
			}
		}
		for(var i in reg){
			if(i!='required' && !reg[i].test(str)){
				return msg[i];
			}
		}
		return true;
	}

	module.exports=FormValidator;
});