var express = require('express');
var sha1 = require('sha1');
var app = express();
var path = require('path');
var util = require('./libs/util');
var wechat = require('./wechat/g');

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


app.use(wechat(config.wechat));

app.listen(3000,function(req,res){
	console.log("开启服务:3000");
});