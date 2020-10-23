const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const createError = require('http-errors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser') ;
const cors = require('cors');
const logger = require('morgan');

app.use(cookieParser()) ;
// 注册 解析表单的body-parser
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
/**
 * 设置静态文件托管
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'weapp')));

app.all("*", function (req, res, next) {
	//设置允许跨域的域名，*代表允许任意域名跨域
	res.header("Access-Control-Allow-Origin", "*");
	//允许的header类型
	res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	//跨域允许的请求方式 
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By", 'unknown');
	res.header("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	if (req.method.toLowerCase() == 'options')
		res.send(200); //让options尝试请求快速结束
	else
		next();
})

app.use('/', require('./routes/index'));
app.use('/', require('./routes/weixinopen/index'));
module.exports = app;
