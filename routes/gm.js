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

const nodeGm = async function (req, res, next) {
    // 获取数据
    let data = await getData(__dirname + '/../public/data/siginactivity.json',Object.assign(headers,{
        sort:0,
        isOpenid:true
    }),res)
    
    //如果文件名字不是这样的，那么需要对排序处做下处理。
    const folderPath = __dirname + '/img/';
    //该目录为合并后的文件存储目录
    const targetFolder = __dirname + '/output/item-img01.jpg';
    var buf = require('fs').readFileSync(folderPath + 'item-img01.jpg');

    let fileList = fs.readdirSync(folderPath);
    fileList.sort((a, b) => {
        return path.basename(a) - path.basename(b);
    })
    //以第一个文件名命名
    let leftFile = path.join(folderPath, fileList[0]);
    let rightFile = path.join(folderPath, fileList[1]);
    let data = await collapse(leftFile, rightFile);


    Ut.requestSuccess({
        result: {
            buf: buf,
            data: data,
            leftFile,
            rightFile,
            targetFolder: targetFolder,
            fileList: fileList,
            gm: "success"
        }
    }, res)

    function collapse(left, right) {
        return new Promise((r, j) => {
            gm(left).append(right).write(targetFolder, err => { //改行为上下拼接
                // gm(left).append(right, true).write(target, err => {
                console.log('err',err)
                r(err); //忽略报错
            })
        })
    }
}



module.exports = nodeGm;