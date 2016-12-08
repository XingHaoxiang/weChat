var express = require('express');
var sha1 = require('sha1');
var app = express();

var config = require('./config');
var wechat = require('./wechat/g');
app.use(wechat(config.wechat));

app.listen(3000,function(req,res){
	console.log("开启服务:3000");
});