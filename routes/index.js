const express = require('express');
const router = express.Router();
const common = require('../libs/common.js');
const getData = require('./get');
const updataJsonDB = require('./updataJsonDB');
const Ut = require("../common/utils");
const config = require("../common/config");
const url = require("url");
const fs = require("fs");
const path = require("path");
var multiparty = require("multiparty");

/**
 * 验证前端传过来的appid 是否匹配
 */
router.use(async (req, res, next) => {
    let headers = req.headers||{}
    if(headers['appid']&&(config['appid'] != headers['appid'])){
        Ut.requestErr({err:'appid不匹配！'},res)
    }else{
        next()
    }
})
/**
 * 验证token是否过去
 */
router.use(async (req, res, next) => {
    let headers = req.headers||{}
    if(headers&&headers['authorization']){
        let token = headers.authorization.replace('Bearer ','');
        let appid = headers.appid||'';
        let openid = headers.openid||'';
        let data = await getData(__dirname + '/../public/data/userInfo.json',{},res);
        let wxUserInfo = {};
        let isTrue = data.result.some(res=>{
            if(res.openid == openid){
                wxUserInfo = res
            }
            return res.openid == openid;
        })
        if(!isTrue){
            Ut.requestErr({err:"数据异常，请卸载小程序重新进入！"+openid,code:-1},res)
        }else{
            let updata_time = wxUserInfo.updata_time;
                updata_time = new Date(updata_time).getTime();
            let new_time = (new Date()).getTime();
            let resutl = (new_time - updata_time-10) / 1000 / 60 / 60;
            if (resutl > 2) {
                Ut.requestErr({err:'token已过期请重新获取',code:41001},res)
            }else{
                next() 
            }
        }
    }else{
        next() 
    }
})
// 获取文件列表
router.get('/web/files', async function (req, res) {
    try {
        const data = await common.dive(__dirname + '/../public/web')
        // 等待操作结果返回，然后打印结果
        Ut.requestSuccess({result:data},res)
    } catch (e) {
        Ut.requestErr({err:'读取文件发生错误',code:-1},res)
    }
})
/**
 * 获取用户信息 { openid access_token }
 * 创建用户流水
 * 存在的用户更新token 刷新updata_time
 */
router.post('/miniapp/api/login', async function (req, res) {
    try {
        let { code } = req.body;
        let opts = {
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=${config['appid']}&secret=${config['secret']}&js_code=${code}&grant_type=authorization_code`
        }
        let opts2 = {
            url: `https://api.weixin.qq.com/cgi-bin/token?appid=${config['appid']}&secret=${config['secret']}&code=${code}&grant_type=client_credential`
        }
        let r1 = await Ut.promiseReq(opts,res);
        let r2 = await Ut.promiseReq(opts2,res);

        // let opts3 = {
        //     url: `https://api.weixin.qq.com/cgi-bin/user/info?access_token=${JSON.parse(r2).access_token}$openid=${JSON.parse(r1).openid}`
        // }
        // console.log('opts3',opts3)
        // let r3 = await Ut.promiseReq(opts3,res);

        try {
            let params = Object.assign(JSON.parse(r1), {
                id: 'weixin_id',
                appid:config['appid'],
                expires_in:JSON.parse(r2).expires_in,
                access_token:JSON.parse(r2).access_token
            })
            await updataJsonDB(__dirname + '/../public/data/userInfo.json', params, res);
        } catch (error) { }
        Ut.requestSuccess({result:{token:JSON.parse(r2).access_token,openid:JSON.parse(r1).openid}},res)
    } catch (err) {
        Ut.requestErr({err:err},res)
    }
});
/**
 * 获取用户流水数据
 */
router.get('/miniapp/api/userinfo_log', async function (req, res,next) {
    let body = req.body || {};
    let data = await getData(__dirname + '/../public/data/userInfo.json',{},res)
    Ut.requestSuccess({result:{list:data.result}},res)
});
/**
 * 获取活动列表
 */
router.get('/miniapp/api/campaign', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    console.log('query',query)
    let data = await getData(__dirname + '/../public/data/campaign.json',query,res)
    let total = data.total;
    const per_page = 3;
    let last_page = Math.ceil(total/per_page);
    let current_page = query.page
    // current_page当前页  last_page 
    let list = data.result.filter((res,i)=>{
        return current_page*per_page >= (i+1)&&(i+1)>((current_page-1)*per_page);
    })
    Ut.requestSuccess({result:{list:list,last_page:Number(last_page),current_page:Number(current_page)}},res)
});
/**
 * 活动oss
 */
router.get('/oss/api/file/info', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let host = path.resolve(__dirname + '/../public/status/' + (query.dir||'dir'))
    fs.exists(host,async function(exists){
        if(!exists){
           await Ut.makeDir(host)
        }
    })
    Ut.requestSuccess({result:{
        host:"http://127.0.0.1:3000/images",
        dir:query.dir||'dir',
    }},res)
})
router.post('/images', async function (req, res,next) {
    let headers = req.headers||{}
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './public/status/' + headers['dir'] });
    form.parse(req,async function(err, fields, files) {
        if (err) {
            Ut.requestErr({},res)
        } else {
            let url = files['file'][0].path.replace('public','')
            if(url){
                url = url.replace(new RegExp('\\\\','g'),"/");
                // obj['url'] = obj['url'].replace(/\\\\/g,"/");
            }
            await updataJsonDB(__dirname + '/../public/data/campaign.json', {url:url}, res);
            Ut.requestSuccess({result:{code:200,url:url}},res)
        }
    });
})

module.exports = router;
