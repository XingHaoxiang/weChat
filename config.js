
var path = require('path');
var util = require('./libs/util');


var wechat_file = path.join(__dirname,'./config/wechat.txt');

var config = {
	wechat:{
		appId : 'your appID',
		appSecret : ' your appSecret',
		token : 'your token',
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