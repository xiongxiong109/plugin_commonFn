seajs.config({

	// 别名配置
	alias:{
		'zepto':'zepto/zepto.min',
		'ajaxPost':'plugins/zepto.ajaxPost',
		'validator':'common/validator',
		'countTime':'common/countTime',
		'animationFrame':'common/requrestAnimationFrame',
		'$overlay':'plugins/zepto.overlay',
		'$lazyload':'plugins/zepto.lazyload',
		'$pop':'plugins/zepto.pop'
	},

	//预加载
	preload:['zepto'],

	//路径设置
	path:{
		'test':'test'
	},
	
	debug:true,

	//文本编码
	charset:'utf-8'

});