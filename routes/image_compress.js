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
var images = require("images");


const compressImage = async function (req, res, next) {
    let data = []
    const folderPath = __dirname + `/../public/compress`;

    explorer(folderPath)
    function explorer(path) {
        fs.readdir(path, function (err, files) {
            if (err) return;
            files.forEach(function (file) {
                fs.stat(path + '/' + file, function (err, stat) {
                    if (err) return

                    if (stat.isDirectory()) {
                        // 如果是文件夹遍历
                        explorer(path + '/' + file);
                    } else {
                        // 读出所有的文件
                        console.log('文件名:' + path + '/' + file);
                        var name = path + '/' + file;
                        var outName = path + '/' + 'another_' + file
                        
                        images(name)
                            .save(outName, { //Save the image to a file,whih quality 50
                                quality: 60 //保存图片到文件,图片质量为50
                            });
                    }
                });
            });
        });
    }
}



module.exports = compressImage;