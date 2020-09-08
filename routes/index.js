const express = require('express');
const router = express.Router();
const getData = require('./get');
const Ut = require("../common/utils");
const config = require("../common/config");
const url = require("url");
const fs = require("fs");
const path = require("path");
var multiparty = require("multiparty");
const moment = require("moment");
const common = require('../libs/common');
const request = require('request');

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
        const data = await Ut.dirFilesPath(__dirname + '/../public/web')
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
                p_id: 'weixin_id',
                appid:config['appid'],
                expires_in:JSON.parse(r2).expires_in,
                access_token:JSON.parse(r2).access_token
            })
            await Ut.updataJsonDB(__dirname + '/../public/data/userInfo.json', params, res,{});
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
    let data = await getData(__dirname + '/../public/data/userInfo.json',{},res)
    Ut.requestSuccess({result:{list:data.result}},res)
});
/**
 * 获取活动列表
 */
router.get('/miniapp/api/campaign', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let data = await getData(__dirname + '/../public/data/campaign.json',Object.assign(query,{
        sort:1
    }),res)
    let total = data.total;
    const per_page = 15;
    let last_page = Math.ceil(total/per_page);
    let current_page = query.page
    // current_page当前页  last_page 
    let list = data.result.filter((res,i)=>{
        return current_page*per_page >= (i+1)&&(i+1)>((current_page-1)*per_page);
    })
    Ut.requestSuccess({result:{list:list,last_page:Number(last_page),current_page:Number(current_page)}},res)
});
router.get('/miniapp/api/campaign/ugcsort', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let data = await getData(__dirname + '/../public/data/ugcSort.json',Object.assign(query,{
        sort:0
    }),res)

    let list = data.result.filter((res,i)=>{
        return true;
    })
    Ut.requestSuccess({result:{list:list}},res)
});
// 
/**
 * 上传文章
 */
router.post('/miniapp/api/campaign/add', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let body = req.body||{};    
    let headers = req.headers||{};
    
    await Ut.updataJsonDB(__dirname + '/../public/data/campaign.json', Object.assign(body,{
        openid:headers['openid'],
        appid:headers['appid'],
        p_id:'id',
        status:0,
    }), res,{isOpenid:true});

    Ut.requestSuccess({result:''},res)
});
/**
 * 活动oss
 */
router.get('/oss/api/file/info', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let headers = req.headers||{};
    var token,appid,openid;
    if(headers&&headers['authorization']){
        token = headers.authorization.replace('Bearer ','');
        appid = headers.appid||'';
        openid = headers.openid||'';
    }
    let host = path.resolve(__dirname + '/../public/status/' + (query.dir||'dir'))
    fs.exists(host,async function(exists){
        if(!exists){
           await Ut.makeDir(host)
        }
    })
    Ut.requestSuccess({result:{
        host:"http://192.168.0.112:3000/images",
        dir:query.dir||'dir'+'/',
        token:token,
        appid:appid,
        openid:openid
    }},res)
})
// 上传图片
router.post('/images', async function (req, res,next) {
    let headers = req.headers||{};
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
            // 
            await Ut.updataJsonDB(__dirname + '/../public/data/campaign.json', {
                url:url,
                openid:fields['openid'][0],
                appid:fields['appid'][0]
            }, res,{isOpenid:true});

            Ut.requestSuccess({result:{code:200,url:url}},res)
        }
    });
})
// 签到
router.post('/miniapp/api/sigin', async function (req, res) {
    try {
        let body = req.body||{};    
        let headers = req.headers||{};
        let params = Object.assign(body, {
            p_id: 'id',
            appid:config['appid'],
            openid:headers['openid'],
            point_desc:"签到",
            points:1,
            sigin_time:moment().format("YYYY-MM-DD")
        })
        await Ut.updataJsonDB(__dirname + '/../public/data/sigin.json', params, res,{isOpenid:true});
        Ut.requestSuccess({result:{}},res)
    } catch (err) {
        Ut.requestErr({err:err},res)
    }
});
// 创建 更新 下架活动页
router.post('/miniapp/api/sigin/activity/updata', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let headers = req.headers||{};
    let body = req.body||{};    
    let data = await getData(__dirname + '/../public/data/siginactivity.json',Object.assign(headers,{
        sort:0,
        isOpenid:true
    }),res)
    const month = query['month']||moment().format("YYYY-MM-DD");

    let list = data.result.filter((res,i)=>{
        return res['sigin_time'].indexOf(month.substr(0,7))!=-1;
    })
    Ut.requestSuccess({result:{
        list:list,
        current_time:month,
        desc:moment().format("YYYY年MM月")+'签到记录'
    }},res)
});
// 签到页活动
router.get('/miniapp/api/sigin/activity', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let headers = req.headers||{};
    let data = await getData(__dirname + '/../public/data/siginactivity.json',Object.assign(headers,{
        sort:0,
        isOpenid:true
    }),res)
    const month = query['month']||moment().format("YYYY-MM-DD");

    let list = data.result.filter((res,i)=>{
        return res['sigin_time'].indexOf(month.substr(0,7))!=-1;
    })
    Ut.requestSuccess({result:{
        list:list,
        current_time:month,
        desc:moment().format("YYYY年MM月")+'签到记录'
    }},res)
});
// 获取当月签到列表
router.get('/miniapp/api/sigin/list', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let headers = req.headers||{};
    let data = await getData(__dirname + '/../public/data/sigin.json',Object.assign(headers,{
        sort:0,
        isOpenid:true
    }),res)
    const month = query['month']||moment().format("YYYY-MM-DD");

    let list = data.result.filter((res,i)=>{
        return res['sigin_time'].indexOf(month.substr(0,7))!=-1;
    })
    Ut.requestSuccess({result:{
        list:list,
        current_time:month,
        desc:moment().format("YYYY年MM月")+'签到记录'
    }},res)
});
// 签到全部签到流水 返回数据 自2020-09-01开始
router.get('/miniapp/api/sigin/list/log', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let headers = req.headers||{};

    let data = await getData(__dirname + '/../public/data/sigin.json',Object.assign(headers,{
        sort:0,
        isOpenid:true
    }),res)
    // 全部日期
    if(query['type']==1){
        const day1 = '2020-09-01';
        const day2 = moment().format("YYYY-MM-DD");
        var list = common.getBetweenDates(day1,day2).map(res=>{
            var obj = {};
            for(let i=0;i<data['result'].length;i++){
                if(data['result'][i]['sigin_time']==res){
                    obj = data['result'][i]
                    break
                }
            }
            return obj;
        })
    }else{
        var list = data.result.filter((res,i)=>{
            return true;
        })
    }
    Ut.requestSuccess({result:{list:list}},res)
});
// 检验文本 图片 视频音频 是否合法
router.post('/miniapp/api/wxa/security', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let headers = req.headers||{};
    let body = req.body||{};
    let token = headers.authorization.replace('Bearer ','');
    try {
        var r1,data,opts;
        if(body['type'] == 'img'){
            data ={
                media:request(config['serverPath'] + body['content']),
                // media:request('https://shared.ydstatic.com/fanyi/fanyi-ad-place/online/images/logo_fanyiwang.png')
            };
            opts = {
                url: `https://api.weixin.qq.com/wxa/img_sec_check?access_token=${token}`,
                method:"POST",
                formData: data,
            }
            r1 = await Ut.promiseReq(opts,res);
            r1 = JSON.parse(r1);
            console.log('r1',r1)
            if(r1['errcode']==0){
                Ut.requestSuccess({result:'',code:r1['errcode']},res)
            }else if(r1['errcode']==40006){
                Ut.requestErr({err:"图片大小超出限制！",code:r1['errcode']},res)
            }else if(r1['errcode']==45002){
                Ut.requestErr({err:"图片大小超出限制！",code:r1['errcode']},res)
            }else{
                Ut.requestErr({err:'内容含有违法违规内容',code:r1['errcode']},res)
            }
        }else if(body['type']=='media'){
            opts = {
                url: `https://api.weixin.qq.com/wxa/media_check_async?appid=${config['appid']}&secret=${config['secret']}&access_token=${token}`,
                method:"POST",
                media:""
            }
            r1 = await Ut.promiseReq(opts,res);
        }else{
            data ={
                content:body['content']
            };
            opts = {
                url: `https://api.weixin.qq.com/wxa/msg_sec_check?access_token=${token}`,
                method:"POST",
                body: JSON.stringify(data),
                headers: {//设置请求头
                    "content-type": "application/json",
                },
            }
            r1 = await Ut.promiseReq(opts,res);
            r1 = JSON.parse(r1);
            if(r1['errcode']==0){
                Ut.requestSuccess({result:'',code:200},res)
            }else{
                Ut.requestErr({err:'内容含有违法违规内容',code:87014},res)
            }
        }
    } catch (err) {
        Ut.requestErr({err:err},res)
    }
});

// 获取用户信息
router.get('/miniapp/api/user/profile', async function (req, res,next) {
    var query  = url.parse(req.url,true).query||{};
    let headers = req.headers||{};
    // 获取用户数
    let data = await getData(__dirname + '/../public/data/userInfo.json',Object.assign(headers,{
        sort:0,
        type:"Object",
        isOpenid:true
    }),res)
    let list = data.result.map((res,i)=>{
        var obj = res;
        delete obj['access_token'];
        delete obj['session_key'];
        delete obj['expires_in'];
        delete obj['appid'];
        return obj;
    })
    // 获取用户会员数据
    let data2 = await getData(__dirname + '/../public/data/userMember.json',Object.assign(headers,{
        sort:0,
        type:"Object",
        isOpenid:true
    }),res)
    // 获取用户管理员信息
    let data3 = await getData(__dirname + '/../public/data/admin.json',Object.assign(headers,{
        sort:0,
        type:"Object",
        isOpenid:true
    }),res)

    Ut.requestSuccess({result:Object.assign(list[0],{
        isMember:data2.result.length,
        isAdmin:data3.result.length,
    })},res)
});
module.exports = router;

