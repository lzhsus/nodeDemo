import appConfig from 'Appconfig';
import request from "./request";
import apiRequest from "./apiRequest";



let globalApi = {}; 
globalApi.login = function(data, opt={}){
    return request('miniapp/api/login', data,'POST',{});
}
//扫描日志
globalApi.scan = function(data, opt={}){
    return apiRequest(appConfig[appConfig.envVersion].serverPath+'weixinopen/api/miniapp/scan-qrcode?appid2='+appConfig.appid2, data, { ...{method:'POST',isShowLoading:true, isShowError:true} ,...opt });
}

//获取手机
globalApi.loginPhonenumber = function(data, opt={}){
    return apiRequest(appConfig[appConfig.envVersion].serverPath+'weixinopen/api/miniapp/decrypt-phone?appid2='+appConfig.appid2, data, { ...{method:'POST',isShowLoading:true, isShowError:true} ,...opt });
}

//获取用户信息
globalApi.userInfo = function(data, opt={}){
    return apiRequest(appConfig[appConfig.envVersion].serverPath+'weixinopen/api/miniapp/decrypt-user-info?appid2='+appConfig.appid2, data, { ...{method:'POST',isShowLoading:true, isShowError:true} ,...opt });
}

//获取二维码
globalApi.createQrcode = function(data, opt={}){
    return apiRequest(appConfig[appConfig.envVersion].serverPath+'weixinopen/api/miniapp/create-qrcode?appid2='+appConfig.appid2, data, { ...{method:'POST',isShowLoading:true, isShowError:true} ,...opt });
}

//上传文件
globalApi.ossSign = function(data, opt={}){
    return apiRequest('oss/api/file/info', data, { ...{method:'GET',isShowLoading:false, isShowError:true} ,...opt });
}

// 验证 文本 图片 视频 音频的安全性
/**
 * @param {*} type 
 *  media >>视频音频
 *  img   >>图片
 *        >>文本
 */
globalApi.wxaSecurity = function(data, opt={}){
    return apiRequest('miniapp/api/wxa/security', data, { ...{method:'POST',isShowLoading:false, isShowError:true} ,...opt });
}

export {globalApi}