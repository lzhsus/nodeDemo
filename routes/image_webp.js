const express = require('express');
const router = express.Router();
const getData = require('./get');
const Ut = require("../common/utils");
const config = require("../common/config");
const url = require("url");
const fs = require("fs");
const path = require("path");
var multiparty = require("multiparty");
const moment = require("moment");
const common = require('../libs/common');
const request = require('request');
const gm = require('gm')
const {
    createCanvas,
    loadImage
} = require('canvas')
var image = require("imageinfo"); //引用imageinfo模块


const nodeGm = async function (req, res, next) {
    let data = []
    
    let signPath = __dirname + `/../public/compress/`;
    let signPathList = fs.readdirSync(signPath);
    let id = 000
    for(let i=0;i<signPathList.length;i++){
 
        fs.rename(signPath+signPathList[i],signPath+20210126+'_00'+(id+i+1)+'.jpg',function(err,file){

        })
        // fs.readFile(path,function(err,data){
        //     console.log(err,data)
        //     // console.log(data.toString().split('\n')[0].split(' ')[1])
        //     // console.log(data.toString().split('\n')[1].split(' ')[1])
        //     // let newname = data.toString().split('\n')[1].split(' ')[1] + '-' + data.toString().split('\n')[0].split(' ')[1].replace(/['|']/g,'')
        //     // fs.rename(`${path}/${files[i]}`,`${path}/${newname}.md`)
        // })
    }
    Ut.requestSuccess({
        result: {}
    }, res)

    function createWuLingHaibao(item){
        return new Promise(async (resolve2,reject)=>{
            // 签名路径 + 名称
            let signMS = image(fs.readFileSync(signPath + item.name));
            signMS.singS = 750/signMS.width;
            let canvasH = 0,canvasW=750;
            canvasH = canvasH + signMS.height*signMS.singS;
            signMS.x = 0;
            signMS.y = canvasH - signMS.height*signMS.singS;

            const canvas = createCanvas(canvasW, canvasH);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle='#ffffff';
            ctx.fillRect(0,0,canvasW,canvasH);
            if(signMS){
                await load(item.name,signMS,signPath,ctx)
            }
            var path = `/compress/2021_.jpg`;//路径从app.js级开始找--

            var base64 = canvas.toDataURL('image/jpeg',0.8).replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
            var dataBuffer = new Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
            var filePath = __dirname+'/../public/'+path
            fs.writeFile(filePath,dataBuffer,function(err){//用fs写入文件
                let writeResult  = {}
                if (!err){
                    writeResult = Object.assign(item,{
                        img:path,
                        success:true
                    })
                }else{
                    writeResult = Object.assign(item,{
                        img:path,
                        success:false,
                        err:JSON.stringify(err)
                    })
                }
                resolve2(writeResult)
            });
        })
        function load(name,mc,folderPath,ctx){
            console.log('mc',mc)
            return new Promise((resolve,reject)=>{
                loadImage(folderPath + name).then((image) => {
                    ctx.drawImage(image, mc.x, mc.y, mc.width*mc.singS, mc.height*mc.singS)
                    resolve()
                })
            })
        }
    }
}



module.exports = nodeGm;