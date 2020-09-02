import apiRequest from "./apiRequest";
import appConfig from 'Appconfig';
import { globalApi } from "./global";
import store from '../../store';

let Api = globalApi;

//测试
Api.test = function(data, opt={}){
    return apiRequest('miniapp/api/test', data, { ...{method:'GET',isShowLoading:true, isShowError:true} ,...opt });
}
Api.userinfo_log = function(data, opt={}){
    return apiRequest('miniapp/api/userinfo_log', data, { ...{method:'GET',isShowLoading:true, isShowError:true} ,...opt });
}

Api.campaign = function(data, opt={}){
    return apiRequest('miniapp/api/campaign', data, { ...{method:'GET',isShowLoading:true, isShowError:true} ,...opt });
}
// 签到
Api.sigin = function(data, opt={}){
    return apiRequest('miniapp/api/sigin', data, { ...{method:'POST',isShowLoading:true, isShowError:true} ,...opt });
}
// 获取签到数据
Api.siginList = function(data, opt={}){
    return apiRequest('miniapp/api/sigin/list', data, { ...{method:'GET',isShowLoading:true, isShowError:true} ,...opt });
}
// 签到流水
Api.siginListLog = function(data, opt={}){
    return apiRequest('miniapp/api/sigin/list/log', data, { ...{method:'GET',isShowLoading:true, isShowError:true} ,...opt });
}
export default Api;
