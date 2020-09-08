import wepy from '@wepy/core';
import Api from 'Api';
import appConfig from 'Appconfig';
import appData from '../common/app_data';
import * as common from 'Common';
import store from '../store';
import { resolve } from 'url';

export default {
    data: {

    },
    methods: {
       getuserProfile(){
           return new Promise(async (resolve,reject)=>{
                let userProfile = await Api.userProfile()
                if(!userProfile['success']){
                    wx.showModal({
                        content:res['msg'],
                        showCancel:false
                    })
                    reject();
                    return;
                }
                userProfile = userProfile['result']||{}
                this.$store.state.userProfile = userProfile||{};
                resolve({ 
                    success:true
                });
           })
        },
        getCampaignUGCSort(){
            return new Promise(async(resolev,reject)=>{
                let sort = await Api.campaignUGCSort({});
                if(!sort['success']){
                    console.log(sort)
                    wx.showModal({
                        content:sort['msg'],
                        showCancel:false
                    })
                    reject();
                    return;
                }
                sort = sort['result']||{};
                let ugcSortList = sort['list']||[];
                resolev({success:true,ugcSort:ugcSortList})
            })
        }
    },
    onLoad(opt) {
        let q = opt['q']?decodeURIComponent(opt.q):'';
        appConfig.scene = opt['scene']? decodeURIComponent(opt.scene):appConfig.scene||'';
        appConfig.scene = q||appConfig.scene
        if( appConfig.scene ) {
            Api.scan({scene:appConfig.scene}).then(res=>{
                wx.reportAnalytics('scan', {
                    scan_scene: appConfig.scene,
                });
            });
        }

        wx.getClipboardData({
            success: (res)=>{
                if( res.data=="开启调试" ){
                    wx.setEnableDebug({
                        enableDebug: true
                    })
                    wx.setClipboardData({
                        data: 'data',
                    });
                }
                if( res.data=="清空缓存" ){
                    wx.clearStorageSync();
                    wx.setClipboardData({
                        data: 'data',
                    });
                    wx.showToast({
                        title: '清除成功',
                        icon: 'none',
                    });
                }                
            }
        });
    }
}
