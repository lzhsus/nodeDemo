const fs = require('fs');
const Ut = require("../common/utils");
const moment = require("moment");

module.exports = function(url, params={},res){
    return new Promise((resolev, reject) => {
        //现将json文件读出来
        fs.readFile(url, function (err, data) {
            if (err) {
                Ut.requestErr({err:err},res)
                resolev({ success: false })
                return
            }
            let str = data.toString();//将二进制的数据转换为字符串
            console.log(params)
            if(params['strShow']){
                resolev(str)
                return
            }
            var result = (JSON.parse(str))['data'];
            if(params['wuling']){
                resolev(result||[])
            }
            // 排序 最新时间在最强
            if(params['sort']==1){
                var news = '';
                for(let i=0;i<result.length-1;i++){
                    for(let j=i;j<result.length-1;j++){
                        if(moment(result[j]['create_time']).format()>moment(result[j+1]['create_time']).format()){
                            news = result[j]
                            result[j] = result[j+1]
                            result[j+1] = news
                        }
                    }
                }
                result.reverse()
            }
            // 验证openid
            if(params['isOpenid']){
                result = result.filter(res=>{
                    return res['openid'] == params['openid']
                })
            }
            // 提取粉丝
            if(params['weixin_id']&&params['table']=='fans'){
                result = result.filter(res=>{
                    let userInfo = res['userInfo']||{};
                    return userInfo['weixin_id'] == params['weixin_id'];
                })
            }
            // 提取我的关注
            if(params['weixin_id']&&params['table']=='attention'){
                result = result.filter(res=>{
                    return res['weixin_id'] == params['weixin_id'];
                })
            }
            result = result.map(res=>{
                var obj = res;
                obj['create_time'] = moment(obj['create_time']).format("YYYY:MM:DD HH:mm:ss");
                obj['updata_time'] = moment(obj['updata_time']).format("YYYY:MM:DD HH:mm:ss");
                // if(obj['openid']) delete obj['openid'];
                // delete obj['session_key']
                return obj
            })
            // Ut.requestSuccess({result:{list:result}},res)
            resolev({ success: true,result:result,total:(JSON.parse(str))['total']})
        })
    })
}