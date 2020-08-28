const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const createError = require('http-errors');
const bodyParse = require('body-parser')
const cookieParser = require('cookie-parser') ;
const cors = require('cors');
const logger = require('morgan');

app.use(cookieParser()) ;
// 注册 解析表单的body-parser
app.use(bodyParse.urlencoded({extended:false})) ;
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
/**
 * 设置静态文件托管
 */
app.use(express.static(path.join(__dirname, 'public')));

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
app.use('/web', (res,req,next)=>{
    next(createError(404))
});
app.use(function (req, res, next) {
	next(createError(404));
});
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
    res.status(err.status || 500);
    
	res.render('error');
});
module.exports = app;
