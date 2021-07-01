const https = require('https');
const crypto = require('crypto');
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2019-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2019-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
//字符串md5
exports.md5 = function md5(str) {
    return crypto.createHash('md5').update(str, 'utf-8').digest('hex');
};
//封装post请求
exports.post_https_requestXml = function (urlstring, post_data, callback) {

    callback = callback || function () {
    };
    var urlData = url.parse(urlstring);
    var hostIP = urlData.host;
    if (urlData.host.indexOf(":") > 0) {
        hostIP = urlData.host.substr(0, urlData.host.indexOf(":"));
    }
    var options = {
        hostname: hostIP,
        port: urlData.port,
         path: urlData.path,
        method: 'POST',
    };
    if(post_data.agentOptions){
        options.pfx = post_data.agentOptions.pfx;
        options.passphrase = post_data.agentOptions.passphrase;
    }
    var req = https.request(options, function (res) {
        var body = "";
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            body += chunk;
        });
        res.on('end', function () {
            callback(body);
        });
    });
    req.on('error', function (e) {
        console.log('error:' + e.message);
        callback('');
    });
    req.write(post_data.body);
    req.end();
};