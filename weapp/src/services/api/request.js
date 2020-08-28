import appConfig from 'Appconfig';
import Log from 'Log';

export default async function request(url, params={}, method="POST", header={}) {
    // 每个接口请求带上scene
    let data = {
        url: url.indexOf('http')!=-1 ? url : (appConfig[appConfig.envVersion].serverPath + url),
        data: params,
        method: method,
        dataType: 'json',
        header: Object.assign({
            'content-type': 'application/json',
        }, header),
    }
    let res;
    try{
        res = await wxRequest(data);
    }catch(e){
        res = {
            errcode: -1,
            msg: url+'网络错误，请重试！'
        }        
    } 
    return res;   
}

function wxRequest(data){    
    return new Promise((resolve, reject)=> {
        wx.request({
            ...data,
            ...{
                complete: (res)=>{
                    if( res.statusCode==200 ){
                        let data = res.data;
                        resolve(data);
                    }else{
                        reject();
                    }                    
                },
            }
        });
    });
}
