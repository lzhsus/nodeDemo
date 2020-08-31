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
    }
};
module.exports = Ut