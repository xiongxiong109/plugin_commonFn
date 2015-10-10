/*
一套表单验证插件,工具方法。
调用方法:
$.validator({
	items:[
		{
			input1.name:{
				require:true,
			}  --input的dom选择器,后面跟一个正则
		}
	],
	msgs:[
		{
			input1.name:{
				retuire:'内容不能为空'
			},
		}
	],
	passHandle:function(){} //执行验证通过的方法
});

html结构要求:

最终触发提交操作的按钮
*/

;(function($){
	var defaults={
		items:[],
		msgs:[],
		passHandle:function(){}
	};
	$.validator=function(options){
		options=$.extend(defaults,options);
	}
})(Zepto);