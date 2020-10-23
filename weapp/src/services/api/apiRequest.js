import appConfig from 'Appconfig';
import request from "./request";
import { globalApi } from "./global";
import * as common from 'Common';
import Log from 'Log';

var loginPromis;
export default async function apiRequest(url, params={}, opt={}){
    // 显示Loading
    if( opt.isShowLoading ) {
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
    } 
    let res;
    let userInfo = wx.getStorageSync('userInfo');
    if(!userInfo){
        if(!loginPromis){  
            loginPromis = login();
        }
        userInfo = await loginPromis||{};
    }
    let header={
        'authorization':'Bearer ' + userInfo.token,
        'appid':appConfig.appid,
        'openid':userInfo.openid||''
    }

    
    loginPromis = null
    appConfig.appUserinfo = userInfo
    // 请求接口
    res = await request(url, params, opt.method, header);
    // token 过期
    if([41001,42001].indexOf(Number(res.errcode))!=-1){
        wx.removeStorageSync('userInfo');
        console.log('opt.method',opt.method)
        res = await apiRequest(url, params, opt);
    }
    // 隐藏Loading
    if( opt.isShowLoading ){
        wx.hideLoading();
    }
    
    return res;
}

// 登录
export async function login(){
    let res = await wxLogin();
    res = await globalApi.login(res);
    try {
        wx.setStorageSync('userInfo', res.result);
    }catch(e) { }
    return res.result;
}

// 微信登录
export async function wxLogin(){
    return new Promise(function(resolve, reject) {
        wx.login({
            success: function (data) {
                let res = {
                    code: data['code'],
                };
                resolve(res);
            }
        });
    });
}

// 检查 session
export async function checkSession(){
    return new Promise(function(resolve, reject) {
        wx.checkSession({
            success: ()=>{
                resolve(1)
            },
            fail: ()=>{
                login().then(()=>{
                    resolve(1);
                });
            }
        });
    });
}