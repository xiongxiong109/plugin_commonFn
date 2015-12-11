var seajsTimestamp=new Date().getTime();
seajs.config({

	// 别名配置
	alias:{
		'zepto':'zepto/zepto.min',
		'ajaxPost':'plugins/zepto.ajaxPost',
		'validator':'common/validator',
		'countTime':'common/countTime',
		'download':'common/download',
		'animationFrame':'common/requestAnimationFrame',
		'$overlay':'plugins/zepto.overlay',
		'$lazyload':'plugins/zepto.lazyload',
		'$pop':'plugins/zepto.pop'
	},

	//路径配置
	paths:{
		'test':'test',
		'plugins':'plugins',
		'css':'../../css/'
	},

	//预加载
	preload:['zepto'],

	//配置基本映射,在所有加载的文件后面自动添加后缀
	map: [
		[ /^(.*\.(?:css|js|tpl))(.*)$/i, '$1?v='+seajsTimestamp ]
	],

	debug:true,

	//文本编码
	charset:'utf-8'

});