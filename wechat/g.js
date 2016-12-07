var sha1 = require('sha1');
var getRawBody = require('raw-body');
var typer = require('media-typer');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function(opts){
	var wechat = new Wechat(opts);
	return function(req,res){
		var that = res;
		var token = opts.token;
		var signature = req.query.signature;
		var nonce = req.query.nonce;
		var timestamp = req.query.timestamp;
		var echostr = req.query.echostr;
		var str = [token,timestamp,nonce].sort().join('');
		var sha = sha1(str);
		if (req.method === 'GET') {
			if (sha === signature) {
				req.body = echostr + '';
				res.send(echostr+'');
			} else {
				req.body = 'wrong';
			}
		} else if(req.method === 'POST') {
			if (sha !== signature) {
				req.body = 'wrong';
				return false;
			}
			var data = getRawBody(req, {
	    		length: req.headers['content-length'],
	    		limit: '1mb',
	   		    encoding: typer.parse(req.headers['content-type']).parameters.charset
  			},function (err, string) {
			    if (err) 
			    	return next(err)
			    var data = string.toString();
			    // console.log(data);
			    var content = util.parseXMLAsync(data);
			    // console.log(content._rejectionHandler0.xml);
			    var message = util.formatMessage(content._rejectionHandler0.xml);
			    // console.log(message);

			    if (message.MsgType === 'event') {
			    	if (message.Event === 'subscribe') {
			    		var now = new Date().getTime();

			    		// that.status = 200;
			    		// that.type = 'application/xml'
			    		var reply =  '<xml>'
									+'<ToUserName><![CDATA['+message.FromUserName+']]></ToUserName>'
									+'<FromUserName><![CDATA['+message.ToUserName+']]></FromUserName>'
									+'<CreateTime>'+now+'</CreateTime>'
									+'<MsgType><![CDATA[text]]></MsgType>'
									+'<Content><![CDATA[亲爱滴~你终于关注我了]]></Content>'
									+'</xml>';
						console.log(reply);
						res.end(reply);
			    		// that.body =reply;
			    	}
			    }

			  });
  			
		}
		
	};
};