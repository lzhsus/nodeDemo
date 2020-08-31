const fs = require('fs');
const Ut = require("../common/utils");

module.exports = function(url, params,res){
    return new Promise((resolev, reject) => {
        //现将json文件读出来
        fs.readFile(url, function (err, data) {
            if (err) {
                Ut.requestErr({err:err},res);
                resolev({ success: false })
                return
            }
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            if(person.total){
                person.total_num = Number(person.total_num) + 1;
            }else{
                person.total_num = 1;
            }
            params[params['id']] = person.total_num;

            person.data.push(params);//将传来的对象push进数组对象中
            person.total = person.data.length;//定义一下总条数，为以后的分页打基础
            var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(url, str, function (err) {
                if (err) {
                    Ut.requestErr({err:err},res);
                    resolev({ success: false })
                    return
                }
                Ut.requestSuccess({},res);
                resolev({ success: true })
                return
            })
        })
    })
}