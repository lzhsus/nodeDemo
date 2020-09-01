const request = require("request");
const url = require("url");
const fs = require("fs");
const path = require("path");
class Ut {
    /**
     * promise化request
     * @param {object} opts
     * @return {Promise<[]>}
     */
    static promiseReq(opts = {},res) {
        return new Promise((resolve, reject) => {
            request(opts, (e, r, d) => {
                if (e) {
                    requestErr(e,res)
                    return reject(e);
                }
                if (r.statusCode != 200) {
                    requestErr(e,res)
                    return reject(e);
                }
                return resolve(d);
            });
        })
    };
    /**
     * 请求发送错误 终端进程
     */
    static requestErr(params={},res){
        var result = {
            errcode: params.code||0,
            msg: params.err,
            result:{},
            success: false,
            params:params
        }
        if(!params.isErr) delete result.params
        res.json(result)
    };
    /**
     * 请求成功的返回
     */
    
    static requestSuccess(params={},res){
        var result = {
            errcode: params.code||200,
            msg: params.msg||"操作成功！",
            result:params.result||{},
            success: true
        }
        res.json(result)
    };
    /**
     * 创建目录
     */
    static makeDir(dirpath) {
        return new Promise((resolve,reject)=>{
            if (!fs.existsSync(dirpath)) {
                fs.mkdir(dirpath,res=>{
                    console.log('-----',res,dirpath)
                    resolve({success:true})
                })
            }else{
                resolve({success:true})
            }
        })
    };
    /**
     * 
     * @param {文件夹路径} dir 
     * @returns Promise<[]> 文件夹下全部文件的路径
     */
    static dirFilesPath(dir){
        return new Promise((resolve,reject)=>{
            var pathUrl = []
            dive2(dir,pathUrl)
            var num = 0,num2=0,dirNum=0;
            var isDir =false
            function dive2(dir,pathUrl){
                fs.readdir(dir, function (err, list) {
                    if(err) { 
                        resolve(pathUrl)
                    }else{
                        num = num+(list.length||0)
                        isDir = false
                        if(dirNum) dirNum--
                        list.forEach(function (file,i) {
                            num2++
                            var path = dir + "\\" + file;
                            var state = fs.lstatSync(path);
                            if (state.isDirectory()) {
                                // 如果需要对path进行操作 需要转字符串toString()
                                // console.log(path + '是文件夹');
                                //递归函数
                                isDir = true
                                dirNum++
                                dive2(path,pathUrl);
                            } else {
                                // console.log(path + '是文件');
                                pathUrl.push(path)
                                // console.log(num,num2,isDir,pathUrl)
                                if(num==num2&&!isDir&&dirNum<=0){
                                    // console.log('遍历结束')
                                    resolve(pathUrl)
                                }
                            }
                        });
                    }
                });
            }
        })
    };
    /**
     * 
     * @param { 数据库 } url 
     * @param {*} params 
     * @param {*} res 
     * @param {*} query 
     */
    static updataJsonDB(url, params,res,query){
        return new Promise((resolev, reject) => {
            //现将json文件读出来
            fs.readFile(url, function (err, data) {
                if (err) {
                    requestErr({err:err},res);
                    resolev({ success: false })
                    return
                }
                var person = data.toString();//将二进制的数据转换为字符串
                person = JSON.parse(person);//将字符串转换为json对象
                // 检查改openid 是否存在
                var index = -1;
                for(let i=0;i<person['data'].length;i++){
                    if(person['data'][i].openid == params.openid){
                        index = i;
                    }
                }
                if(index!=-1&&!query['isOpenid']){
                    if( params['id'] ) delete params['id'];
                    person.data[index] = Object.assign(person.data[index],params);
                    person.data[index].updata_time = new Date();
                }else{
                    if(person.total){
                        person.total_num = Number(person.total_num) + 1;
                    }else{
                        person.total_num = 1;
                    }
                    if(params['id']){
                        params[params['id']] = person.total_num;
                        delete params['id'];
                    }
                    params.updata_time = new Date();
                    params.create_time = new Date();
                    person.data.push(params);//将传来的对象push进数组对象中
                    person.total = person.data.length;//定义一下总条数，为以后的分页打基础
                }
    
                var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
                fs.writeFile(url, str, function (err) {
                    if (err) {
                        requestErr({err:err},res);
                        resolev({ success: false })
                        return
                    }
                    resolev({ success: true })
                    return
                })
            })
        })
    }
};
module.exports = Ut