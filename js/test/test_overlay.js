define(function(require,exports,module){
	require('$overlay');
	$.showOverlay("hello",function(){
		$.showOverlay('message');
	});
});