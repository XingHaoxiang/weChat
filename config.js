
var path = require('path');
var util = require('./libs/util');


var wechat_file = path.join(__dirname,'./config/wechat.txt');

var config = {
	wechat:{
		appId : 'wx461baad951f54348',
		appSecret : 'b417cc8b628df610d9de890c1e288e1c',
		token : 'xinghaoxiang',
		getAccessToken: function(){
			return util.readFileAsync(wechat_file)
		},
		saveAccessToken: function(data){
			data = JSON.stringify(data);
			return util.writeFileAsync(wechat_file,data);
		}
	}
}

module.exports = config;