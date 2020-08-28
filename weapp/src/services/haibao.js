import * as common from 'Common';
import Log from 'Log';
let errorNum = 0
let ctx
let getImageInfo = (canvas, imgPath, resolve, reject)=>{
    var img=canvas.createImage();
    img.onload=function(){
        resolve(img);
    }
    img.src = imgPath;
}
/**
 * 渲染圆形图片
 *
 * @param {Object} obj
 */
let drawImg = function (obj) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(obj.width / 2 + obj.x, obj.height / 2 + obj.y, obj.width / 2, 0, Math.PI * 2, false);
    ctx.clip();
    ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height); 
    ctx.restore();
}

export async function haibaoGet(data){
    wx.showLoading({
        title: '加载中',
    });
    errorNum = 0
    return new Promise((cbResolve, cbReject)=> {
        const query = wx.createSelectorQuery();
        query.select("#"+data.id).fields({ node: true, size: true }).exec((res) => {
            const canvas = res[0].node;
            ctx = canvas.getContext('2d');
            canvas.width = 750;
            canvas.height = 1086;
            Log.info(JSON.stringify(data))
            data.headimgurl = data.headimgurl.replace('http://','https://')

            let img1 = new Promise((resolve, reject)=> {
                getImageInfo(canvas, data.imgurl, resolve, reject);
            })
            Log.info('第一张图片');
            let img2 = new Promise((resolve, reject)=> {
                getImageInfo(canvas, data.qrcode, resolve, reject);
            })
            Log.info('第二张图片');
            let img3 = new Promise((resolve, reject)=> {
                getImageInfo(canvas, data.headimgurl, resolve, reject);
            })  
            Log.info('第三张图片');  

            Promise.all([img1, img2, img3]).then(function (res) {
                // 首图
                ctx.drawImage(res[0], 0, 0, 750, 1086);

                // 二维码
                ctx.drawImage(res[1], 504, 860, 184, 184);            

                // 头像
                drawImg({
                    img: res[2],
                    x: 78,
                    y: 872,
                    width: 110,
                    height: 110,
                })
                ctx.font = '26px sans-serif';
                ctx.fillText(data.nickname, 78, 1025);
                ctx.font = 'bold 36px sans-serif';
                ctx.rotate((Math.PI / 180) * 3.3)
                ctx.fillStyle = "#9f4f50"
                
                const metrics = ctx.measureText(data.groupname)
                const fillTextWidth = 200
                ctx.fillText(data.groupname, 380+(~~((fillTextWidth-metrics.width)/2)), 330);

                // ctx.fillText("加入我的"+data.groupname, 290, 328);
                // ctx.fillText("一起组团答题",292, 363);
                ctx.save();
                wx.canvasToTempFilePath({
                    canvas: canvas,
                    width: 750,
                    height: 1086,
                    success:(res)=> {
                        cbResolve(res.tempFilePath);
                        wx.hideLoading();
                    },
                    fail:(res)=> {
                        wx.hideLoading();
                        Log.error(JSON.stringify(res));
                    },
                })         
            }).catch((res)=>{
                Log.error(JSON.stringify(res));
                wx.showToast({
                    title: '海报生成失败！',
                    icon: 'none',
                    duration: 3000,
                })
                setTimeout(()=>{
                    wx.navigateBack();
                },2000)
                cbReject(0);
            });

        })
    });
}