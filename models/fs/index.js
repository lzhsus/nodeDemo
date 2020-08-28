const fs = require('fs');
const path = require('path');
const common = require('../../libs/common')

module.exports = {
    readFile:readFile
}

function readFile(request,response,url){
    var type = url.substr(url.length - 4, url.length);
    //加载需要显示的图片资源
    console.log('------type',type)
    if (type == '.jpg') {
        fs.readFile(url,function (err, data) {
            //获取文件类型
            if (err) {
                const file =path.join(__dirname+'/../../public/err/404.html');
                readFile(request,response,file)
                return
            }else {
                response.writeHead(200, { "Content-Type": "image/png;" });
                response.write(data.toString());
            }
            response.end();
        });
    }else{
        fs.readFile(url,'utf8',function (err, data) {
            //获取文件类型
            if (err) {
                const file =path.join(__dirname+'/../../public/err/404.html');
                readFile(request,response,file)
                return
            }else {
                response.writeHead(200, { "Content-Type": "text/html;charset=UTF8" });
                response.write(data.toString());
            }
            response.end();
        });
    }
}

//req.url请求地址 和真实加载文件没有关系
// if(req.url=='/index'){
// 	fs.readFile(path.join(__dirname,'index.html'),(err,data)=>{
// 		//设置响应头，解决乱码问题
// 		res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
// 		res.end(data)
//     })
// }else if(req.url=='/css/a.css'){
//     fs.readFile(path.join(__dirname,'css/a.css'),(err,data)=>{
//         res.writeHead(200,{'Content-Type':'text/css;charset=utf-8'})
//         res.end(data)
//     })
// }else if(req.url=='/www/images/404.png'){
//     fs.readFile(path.join(__dirname,'/www/images/404.png'),(err,data)=>{
//         res.writeHead(200,{'Content-Type':'image/png;charset=utf-8'})
//         res.end(data)
//     })
// }else{
//     fs.readFile(path.join(__dirname,'www/404.html'),(err,data)=>{
//         res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
//         res.end(data)
//     })
// }