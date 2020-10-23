const express = require('express');
const router = express.Router();
const getData = require('../get');
const Ut = require("../../common/utils");
const config = require("../../common/config");
const url = require("url");
const fs = require("fs");
const path = require("path");
var multiparty = require("multiparty");
const moment = require("moment");
const common = require('../../libs/common');
const request = require('request');
const WXBizDataCrypt = require('./WXBizDataCrypt');
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
        let data = await getData(__dirname + '/../../public/data/userInfo.json',{},res);
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
        Ut.requestErr({err:'缺少token,请卸载重试！',code:41001},res)
    }
})
/**
 * 解密用户信息
 */
router.post('/weixinopen/api/miniapp/decrypt-user-info', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let body = req.body||{};
    let headers = req.headers||{};
    var { encryptedData,iv } = req.body||{};
    // 获取用户数
    let data = await getData(__dirname + '/../../public/data/userInfo.json',Object.assign(headers,{
        sort:0,
        type:"Object",
        isOpenid:true
    }),res)
    let list = data.result||[]
    let userInfo = list[0]||{};

    encryptedData = encryptedData.replace(/ /g,'+')
    iv = iv.replace(/ /g,'+');
    var pc = new WXBizDataCrypt(config['appid'], userInfo['session_key']);
    var result = await pc.decryptData(encryptedData,iv)

    if(result&&result.avatarUrl){
        await Ut.updataJsonDB(__dirname + '/../../public/data/userInfo.json', Object.assign({},{
            openid:headers['openid'],
            is_need_get_user_info:0,
            userInfo:result
        }), res,{isOpenid:false});
    }
    Ut.requestSuccess({result:result},res)
});

module.exports = router