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
    
    let signPath = __dirname + `/../public/imgSigin/`;
    let signPathList = fs.readdirSync(signPath);
    console.log('signPathList',signPathList)

    let loseList = []
    let successList = []
    let successTypeNum1=0
    let successTypeNum2=0
    let loseTypeNum1=0
    let loseTypeNum2=0
    for(let i=0;i<signPathList.length;i++){
        let item = {
            name:signPathList[i],
            type:signPathList[i].indexOf('_1_')!=-1?1:2
        }
        let result222 = await createWuLingHaibao(item)||{};
        
        if(result222&&result222.success){
            successList.push(result222)
            if(result222.type==1){
                successTypeNum1++
            }
            if(result222.type==2){
                successTypeNum2++
            }
        }else{
            loseList.push(result222)
            if(result222.type==1){
                loseTypeNum1++
            }
            if(result222.type==2){
                loseTypeNum1++
            }
        }
    }
    Ut.requestSuccess({
        result: {
            loseTypeNum1:loseTypeNum1,
            loseTypeNum2:loseTypeNum2,
            successTypeNum1:successTypeNum1,
            successTypeNum2:successTypeNum2,
            totel:signPathList.length,
            loseList:loseList,
            successList:successList
        }
    }, res)

    function createWuLingHaibao(item){
        return new Promise(async (resolve2,reject)=>{
            const folderPath = __dirname + `/../public/img${item.type}/`;
            let fileList = fs.readdirSync(folderPath);
            let list = []
            let canvasW=0,canvasH=0;
            for (let i = 0; i < fileList.length; i++) {
                let ms = image(fs.readFileSync(folderPath + fileList[i]));
                if(i==0) canvasW = ms.width;
                canvasH = canvasH + ms.height;
                ms.x = canvasW - ms.width;
                ms.y = canvasH - ms.height;
                list.push(ms)
            }
            // 签名路径 + 名称
            let signMS = image(fs.readFileSync(signPath + item.name));
            signMS.singS = 750/signMS.width;
            
            canvasH = canvasH + signMS.height*signMS.singS;
            signMS.x = 0;
            signMS.y = canvasH - signMS.height*signMS.singS;

            const canvas = createCanvas(canvasW, canvasH);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle='#ffffff';
            ctx.fillRect(0,0,canvasW,canvasH);

            for (let i = 0; i < list.length; i++) {
                await load2(fileList[i],list[i],folderPath,ctx)
            }
            if(signMS){
                await load(item.name,signMS,signPath,ctx)
            }
            
            // 
            if(item.type==1){
                var path = `/output/${item.name}`;//路径从app.js级开始找--
            }
            if(item.type==2){
                var path = `/output/${item.name}`;//路径从app.js级开始找--
            }
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
        function load2(name,mc,folderPath,ctx){
            return new Promise((resolve,reject)=>{
                loadImage(folderPath + name).then((image) => {
                    ctx.drawImage(image, mc.x, mc.y, mc.width, mc.height)
                    resolve()
                })
            })
        }
    }
}



module.exports = nodeGm;