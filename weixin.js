exports.reply = function(result,req,res){
	var message = result;
	console.log(message);

	if (message.MsgType === 'event') {
		if (message.Event === 'subscribe') {
			var now = new Date().getTime();
			var reply =  '<xml>'
									+'<ToUserName><![CDATA['+message.FromUserName+']]></ToUserName>'
									+'<FromUserName><![CDATA['+message.ToUserName+']]></FromUserName>'
									+'<CreateTime>'+now+'</CreateTime>'
									+'<MsgType><![CDATA[text]]></MsgType>'
									+'<Content><![CDATA[欢迎关注我的微信平台！！]]></Content>'
									+'</xml>';
			console.log(reply);
			res.end(reply);
			 
		} else if (message.Event === 'unsubscribe'){
			console.log('取消关注');
		}
	} else {
		console.log('其他');
	}

}