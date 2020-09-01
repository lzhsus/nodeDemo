import Api from 'Api';
let uploadFile = async (file,dir)=> {
    return new Promise(function (resolve, reject) { 
        Api.ossSign({
            dir: dir||'uploadFile'
        }).then((res)=>{
            if( res.success ){
                let ossKey = res.result            
                let promiseAll = []
                file.forEach((obj,index)=>{
                    promiseAll.push(wxUploadFile(file[index], ossKey))
                })
                Promise.all(promiseAll).then((fileURL)=> {
                    resolve(fileURL)
                }).catch(error=>{
                    wx.hideLoading()
                    resolve(false)
                })
            }else{
                wx.showModal({
                    content: res.msg,
                    showCancel: false
                })
                wx.hideLoading()
                resolve(false)
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
                    reject(false)
                    return
                }
                let url = JSON.parse(res.data).result.url                
                resolve(url)
            },
            fail: (error)=> {
                reject(false)
            }
        })
    })    
}

export {
    uploadFile
}