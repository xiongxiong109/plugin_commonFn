/*ajax请求函数
	 @url:请求地址
	 @jsonCode:传递的json数据
	 // <meta name="_token" content="{{ csrf_token() }}"/>
	 * */
	function sendAjax(url,jsonCode,successCall,errorCall){
		$.ajax({
			type: 'POST',
			url: url,
			data: jsonCode,
			dataType: 'json',
			headers: {
				'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
			},
			success:successCall,
			error:errorCall
		});
	}