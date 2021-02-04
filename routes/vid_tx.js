const express = require('express');
const router = express.Router();
const getData = require('./get');
const Ut = require("../common/utils");
const config = require("../common/config");
const nodeUrl = require("url");
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


const txVID = async function (req, res, next) {
    function isQQVideo(videoUrl) {
        return new Promise((resolve,reject)=>{
            let ret = false
            let url = nodeUrl.parse(videoUrl)
            let hostName = url.hostname
            ret = hostName.indexOf("qq.com") != -1
            resolve(ret)
        })
    }
    function parseQuery(query) {
        return new Promise((resolve,reject)=>{
            let queryObj = {}
            const queryList = query.split("&")
            queryList.forEach( q => {
                let pair = q.split("=")
                queryObj[pair[0]] = pair[1]
            })
            resolve(queryObj)
        })
    }
    function getVideoId(videoUrl) {
        return new Promise(async (resolve,reject)=>{
            let vid = ""
            let url = nodeUrl.parse(videoUrl)
            // let retImag = await isQQVideo(videoUrl);
            // const queryObj = await parseQuery(url.query)
            // vid = queryObj.vid || ''
            // if(!vid) {
            //     let paths = url.pathname.split("/")
            //     let lastPath = paths[paths.length-1]
            //     let regx = /(.*)\.html/
            //     vid = lastPath.match(regx)[1]
            //     // vid = lastPath.slice(0, lastPath.lastIndexOf("."))
            // }
            resolve(url)
        })
    }
    let vidRes = await getVideoId("https://v.qq.com/x/cover/mzc00200bsne2at/r00358kkr8x.html")
    Ut.requestSuccess({
        result: {
            vidRes
        }
    }, res)

}



module.exports = txVID;