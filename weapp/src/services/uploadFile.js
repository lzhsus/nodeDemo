import Api from 'Api';
import appConfig from 'Appconfig';
import * as common from '../../common/common';
let uploadFile = async (file,dir)=> {
    return new Promise(function (resolve, reject) { 
        Api.ossSign({
            dir: dir||'uploadFile'
        }).then(async (res)=>{
            if( res.success ){
                let ossKey = res.result            
                let promiseAll = []
                // 文件压缩
                console.log('未压缩----',JSON.stringify(file))
                file = await common.compressImage(file);
                console.log('压缩----',JSON.stringify(file))

                for(let i=0;i<file.length;i++){
                    if(file[i]['url']&&!file[i]['success']){
                        console.log('imgUrl',imgUrl)
                        // 验证图片的合法性
                        let url = await wxUploadFile(imgUrl, ossKey).catch(error=>{
                                    wx.showModal({
                                        content: '资源上传失败，请重新上传！',
                                        showCancel: false
                                    })
                                    reject(error)
                                    wx.hideLoading()
                                })
                        console.log('url',url)
                        let isCheck = await Api.wxaSecurity({type:'img',content:url});
                
                        if(!isCheck['success']&&isCheck['errcode']==87014){
                            wx.showModal({
                                content: '存在图片资源违法，请检查！',
                                showCancel: false
                            })
                            reject()
                            wx.hideLoading()
                        }else if(!isCheck['success']){
                            wx.showModal({
                                content:isCheck.msg,
                                showCancel: false
                            })
                            reject()
                            wx.hideLoading()
                        }
                        if(url.indexOf('http://tmp/')==-1&&url.indexOf('wxfile://')==-1){
                            file[i]['path'] = url ;
                            file[i]['success'] = true;
                        }
                        promiseAll.push(file[i])
                    }else{
                        promiseAll.push(file[i])
                    }
                }
                resolve(promiseAll)
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel: false
                });
                wx.hideLoading();
            }
        })  
    })
}

let wxUploadFile =async (file, ossKey)=> {
    console.log(file)
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            url: ossKey.host, 
            filePath: file,
            name: 'file',
            header:{
                dir:ossKey.dir
            },
            formData: {
                OSSAccessKeyId: ossKey.accessid,
                token:ossKey.token,
                appid:ossKey.appid,
                openid:ossKey.openid,
                callback: ossKey.callback,
                policy: ossKey.policy,
                signature: ossKey.signature,
                key: ossKey.dir + file.replace('wxfile://', '').replace('http://tmp/', ''),
                success_action_status: '200',
                secure: true
            },
            success: (res)=> {
                if ( res.statusCode!=200 ) {         
                    resolve(file)
                    return
                }
                let url = JSON.parse(res.data).result.url        
                resolve(url)
            },
            fail: (error)=> {               
                reject(error)
            }
        })
    })    
}

let compressImage = (file,quality=80)=>{
    return new Promise((resolve,reject)=>{
        wx.compressImage({
            src: file, // 图片路径
            quality: quality, // 压缩质量,
            success:res=>{
                resolve(res['tempFilePath'])
            },
            fail:res=>{
                resolve(file)
            }
        })
    })
}
export {
    uploadFile
}