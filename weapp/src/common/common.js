import Api from 'Api';
import appConfig from 'Appconfig';
import { uploadFile } from '@/services/uploadFile';
let rightWrongAudio =[]; //对错音乐
// 深度拷贝
export const depthCopy = function (data){
    return JSON.parse(JSON.stringify(data));
}

// 资源路径拼接
export const getUrlPath = function (url){
    if( !url ) return '';
    return url.indexOf('http')!=-1 ? url : (appConfig.ossPath+(url.indexOf('?')!=-1?url+'&':url+'?')+'v=202007201644');
}

// 资源路径拼接
export const getWeappUrlPath = function (url){
    if( !url ) return '';
    return url.indexOf('http')!=-1 ? url : (appConfig.weappOssPath+(url.indexOf('?')!=-1?url+'&':url+'?')+'v=202007201644');
}

// 订阅模板消息
export const subscribeMessage = function(tmplIds=[]){
    return new Promise(function (resolve) {
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            complete:(res)=>{
                console.log('requestSubscribeMessage',res)
                res.tmplIds = tmplIds;
                resolve(res);
            }
        });
    });
}

// 题目随机
export const randomQuestion = function(data=[], number=6){
    data = randomArr(data); //打乱数组
    let localQuestion = wx.getStorageSync('localQuestion')||[];
    // 排除已经答过的题目
    let getQuestionArr = data.filter(item=>{
        let isOK = localQuestion.some(obj=>{
            return item.question_id==obj.question_id;
        });
        return !isOK;
    });
    let getQuestionData = getQuestionArr.slice(0,number);
    // 提交完答案把答过的记录到本地
    appConfig.localData = getQuestionData.concat(localQuestion);    
    return getQuestionData;
}

// 答题播放音乐（正确、错误）
export const answerPlayAudio = function (isCorrect){
    let audioData = rightWrongAudio[~~isCorrect];
    if( !audioData ){
        wx.showLoading({
            title: '加载中',
        });
        let innerAudioContext = wx.createInnerAudioContext();    
        innerAudioContext.autoplay = true;
        innerAudioContext.src = getUrlPath((isCorrect?'190822fg0464/video/success.mp3':'190822fg0464/video/error.mp3'));
        rightWrongAudio[~~isCorrect] = audioData = innerAudioContext;
    }
    console.log(isCorrect?'回答正确音效':'回答错误音效');
    audioData.play();
    return new Promise((resolve)=> {        
        audioData.onPlay(()=> {
            console.log('开始播放');
            audioData.offPlay();
        });
        audioData.onError((res)=> {
            console.log('播放失败',res);
            wx.hideLoading();
            audioData.offError();
            resolve({});
        });
        audioData.onEnded((res)=> {
            console.log('播放结束');
            wx.hideLoading();
            audioData.offEnded();
            resolve({});
        });
    });    
}

/**
 * 截字符串
 * @param str
 * @param len
 * @returns {*}
 */

export const cutString = function (str, len) {
    //length属性读出来的汉字长度为1
    if (str.length * 2 <= len) {
        return str;
    }
    let strlen = 0;
    let s = "";
    for (let i = 0; i < str.length; i++) {
        s = s + str.charAt(i);
        if (str.charCodeAt(i) > 128) {
            strlen = strlen + 2;
            if (strlen >= len) {
                return s.substring(0, s.length - 1) + "…";
            }
        } else {
            strlen = strlen + 1;
            if (strlen >= len) {
                return s.substring(0, s.length - 2) + "…";
            }
        }
    }
    return s;
};

/**
 * 获取字符数量
*/
export const getLength = function (str) {
    var len = 0;  
    for (var i=0; i<str.length; i++) {   
        var c = str.charCodeAt(i);   
        //单字节加1   
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {   
            len++;   
        }   
        else {   
            len+=2;   
        }   
    }   
    return len;  
};

// 页面跳转
export const openWeappLink = function (link, pages) {
    if( !link ) return;
    if( link.indexOf("https:")!=-1 ){
        if( pages ){
            wx.navigateTo({
                url: pages+'?link='+encodeURIComponent(getHttpsLink(link)),
            });
            return;
        }
        wx.navigateTo({
            url: '/pages/webview?link='+encodeURIComponent(getHttpsLink(link)),
        });
    }else{
        if( link.indexOf("appid:")!=-1 ){
            let path = link.split("##");
            let _appid = path[0].replace(/appid:/i, "");
            let _path = path[1]||'';
            if( _appid ){
                wx.navigateToMiniProgram({
                    appId: _appid,
                    path: _path,
                });
            }
        }else{
            let tabPathLink = link.split('?')[0];
            if( appConfig.tabPath.indexOf(tabPathLink)!=-1 ){
                wx.switchTab({
                    url: link,
                });
            }else{
                wx.navigateTo({
                    url: link
                });
            }
        }            
    }    
}

// 价格转换（分转元）
export const formatMoney = function (value){
    value = Number(value);
    if( isNaN(value) ) {
        return '--';
    }
    value = Number((value/100).toFixed(2));
    if( Math.abs(value)<1000 ) {
        return value;
    }
    return String(value).replace(/./g, (c, i, a) => i && c !== '.' && !((a.length - i) % 3) ? ',' + c : c);
}

// 特殊字符串检查
export const characterJudge = function (data) {
    let t = /[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/;
    return t.test(data);
}

// 随机数组
export const randomArr = function (data) {
    return data.sort(()=>{
        return Math.random()-0.5;
    });
}
// 有关页面路由重复跳转
export const pageJumps = function (url,type=1){
    let _getCurrentPages = getCurrentPages()
    var index=-1;
    for(let i=0;i<_getCurrentPages.length;i++){
        if(url.indexOf((_getCurrentPages[i].route))!=-1){
            index=i;
        }
    }
    // 代表路由中存在 pages/my
    if(index!=-1){
        wx.navigateBack({
            delta:((_getCurrentPages.length-1)-index)
        })
    }else{
        let tabPathLink = url.split('?')[0];
        if( appConfig.tabPath.indexOf(tabPathLink)!=-1 ){
            wx.switchTab({
                url: url,
            });
        }else if(type==1){
            wx.navigateTo({
                url: url
            });
        }else{
            wx.redirectTo({
                url: url
            });
        }
    }
}
// 获取当前小程序链接和参数
export const getCurrentPage = function (param=true){
    let _getCurrentPages = getCurrentPages()||[];
    let _Pages = _getCurrentPages[_getCurrentPages.length-1]||{};
    let _route = _Pages.route;
    let _parameter = urlEncode(_Pages.options).slice(1);
    let pagesUrl = param ? (_route+(_parameter?'?'+_parameter:_parameter)) : _route;
    return pagesUrl;
}

// obj转url参数
export const urlEncode = function(param, key, encode) {
    if (param==null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param); 
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += urlEncode(param[i], k, encode)
        }
    }
    return paramStr;  
}

// 上传文件
export const chooseMediaUpload=function(opt={}){
    return new Promise(function (resolve) {
        wx.chooseMedia({
            count: opt.count||9,
            mediaType: opt.mediaType||['image', 'video'],
            sourceType: opt.sourceType||['album', 'camera'],
            maxDuration: opt.maxDuration||30,
            camera: 'back',
            success: async (res)=> {
                console.log(res);
                let tempFiles = res.tempFiles;                
                wx.showLoading({
                    title:'正在上传',
                    mask: true,
                });

                // 视频长度超过
                if( opt.maxDuration&&res.type=="video"&&tempFiles[0].duration>opt.maxDuration ){
                    wx.showToast({
                        title: '视频长度不能大于'+opt.maxDuration+'s',
                        icon: 'none',
                    });
                    return;
                }

                let uploadArr = [];
                tempFiles.forEach(item=>{                    
                    uploadArr.push(item.tempFilePath);
                    if( opt.isUploadPoster&&res.type=='video' ){
                        // 视频封面（视频不能多个一起上传）               
                        uploadArr.push(item.thumbTempFilePath); 
                    }                    
                });

                let uplaodRes = await uploadFile(uploadArr); 
                if( !uplaodRes ){
                    wx.showToast({
                        title: '上传失败',
                        icon: 'none',
                    });
                    wx.hideLoading();
                    return;
                }
                wx.hideLoading();
                resolve({
                    type: res.type||'image',
                    result: uplaodRes,
                });
            },
            fail:()=> {
                wx.hideLoading();
            },
        });
    });
}

/**
 * 时间戳转年月日
 * @param strDate
 * @returns {string}
 */

export const formatDateTime = function (strDate) {
    if (this.isEmpty(strDate)) return ''; //如果传过来为空那么就是空字符串
    strDate = strDate + '';
    if (strDate.length === 10) strDate = strDate + '000';
    let date = new Date(Number(strDate));
    return date.getFullYear() + "-" + (formatDateTimeToDouble(date.getMonth() + 1)) + "-" + formatDateTimeToDouble(date.getDate()) +
      " " + formatDateTimeToDouble(date.getHours()) + ":" + formatDateTimeToDouble(date.getMinutes()) + ":" +
      formatDateTimeToDouble(date.getSeconds());
};
  
function formatDateTimeToDouble(s) {
    return s < 10 ? '0' + s : s;
}

/**
 * 判断是不是空的字符串
 * @param obj
 * @returns {boolean}
 */

export const isEmpty = function (obj) {
    return this.isNull(obj) || obj === '';
};

/**
 * 判断是不是空的或者undefined
 * @param obj
 * @returns {boolean}
 */

export const isNull = function (obj) {
    return obj === null || typeof obj === 'undefined' || obj === undefined;
};
/**
 * 监听事件删除重复的
 * @param {*} eventHub 
 */
export const eventHubDelRepeat = function(eventHub,types){
    if(eventHub._events&&types&&types.length){
        var _events = eventHub._events;
        for(let i=0;i<types.length;i++){
            if(_events[types[i]]){
                eventHub.$off(types[i])
            }
        }
    }else if(eventHub._events){
        var _events = eventHub._events;
        for (const key in _events) {
            if (_events.hasOwnProperty(key)) {
                const item = _events[key];
                if(!isArray(item)) break;
                if(item.length&&item.length>1){
                    eventHub._events[key]=[eventHub._events[key][item.length-1]]
                }
            }
        }
    }
}
/**
 * 判断是不是数组
 * @param {*} o 数组
 */
export const isArray = function(o){
    return Object.prototype.toString.call(o)== '[object Array]';
}

/**
 * 重复添加数组
 */
export const customAddArray = function(a,n){
    var o=[]
    for(let i=0;i<n;i++){
        o.push(Object.assign(a[0],{
            group_rank:i+1
        }))
    }
    return o;
}