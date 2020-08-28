import Api from 'Api';
import appConfig from 'Appconfig';
import { checkSession } from '@/services/api/apiRequest';

export default async function(e){
    let userInfo = wx.getStorageSync(appConfig.envVersion+'UserInfo');
    let detail = e.detail||{};
    // 拒绝授权
    if( !detail.encryptedData ){
        wx.showModal({
            showCancel: false,
            content: '请允许获取用户信息！',
        })
        return;
    }
    let checkSessionRes = await checkSession();
    let data = {
        encryptedData: detail.encryptedData,
        iv: detail.iv,
        rawData: detail.rawData,
        signature: detail.signature,
    }
    return new Promise((resolve, reject)=>{
        if( !userInfo ){
            Api.userInfo(data).then((res)=>{ 
                if( res.success ){
                    userInfo = res.result;
                    wx.setStorageSync(appConfig.envVersion+'UserInfo', userInfo);
                    resolve(userInfo)
                }else if( res.msg ){
                    wx.showModal({
                        content: res.msg,
                        showCancel: false
                    });
                    reject(false);
                }
            })
        }else{
            resolve(userInfo);
        }
    });
}