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
    let headers = req.headers||{};
    let data = await getData(__dirname + '/../public/data/code.txt',Object.assign(headers,{
        strShow:true
    }),res)
    let result = ((data.replace(/[\r\n]/g,",")).replace(/\"/g,"")).replace(/\,\,/g,",").split(',')
    
    await Ut.updataJsonDB(__dirname + '/../public/data/code.json', result, res,{isOpenid:true});

    Ut.requestSuccess({
        result: {
            data: result
        }
    }, res)

}



module.exports = nodeGm;