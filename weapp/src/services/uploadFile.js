import Api from 'Api';
import appConfig from 'Appconfig';
let uploadFile = async (file,dir)=> {
    return new Promise(function (resolve, reject) { 
        Api.ossSign({
            dir: dir||'uploadFile'
        }).then(async (res)=>{
            if( res.success ){
                let ossKey = res.result            
                let promiseAll = []
                for(let i=0;i<file.length;i++){
                    if(file[i]['url']&&!file[i]['success']){
                        let url = await wxUploadFile(file[i]['url'], ossKey).catch(error=>{
                                    wx.showModal({
                                        content: '资源上传失败，请重新上传！',
                                        showCancel: false
                                    })
                                    reject(error)
                                    wx.hideLoading()
                                })
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

let wxUploadFile = (file, ossKey)=> {
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

export {
    uploadFile
}