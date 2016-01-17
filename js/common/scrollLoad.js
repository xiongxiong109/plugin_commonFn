/**分段加载数据函数,将一段获取到内存里的数组数据分段加载出来
* 该函数只负责加载数据片段,不负责模板渲染，也不负责scroll事件监听
* 通过闭包函数不断加载新的数据片段，当数据片段的最后索引值大于数据总长度时返回false
* 正常情况下返回数据片段的数组
* @n: 表示每次加载数据的个数
* @data: 缓存下来的数组
*/
define('scrollLoad',function(require,exports,module){
	function Load(n,data){
		var start=0,end=0;
		return function(){

			if(end>=data.length){//如果数据已经全部加载,返回false
				return false;
			}
			//否则返回数组
			var temArr=[];
			end = (start+n) > data.length ? data.length : start+n;
			for(var i=start;i<end;i++){
				temArr.push(data[i]);
			}
			start=end;
			return temArr;
		}
	}

	module.exports=Load;
});