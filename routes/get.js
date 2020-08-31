const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const url = require('url');
const models = require('../models/index.js');
const common = require('../libs/common.js');
const querystring = require('querystring')
const Ut = require("../common/utils");

module.exports = function(url, params={},res){
    return new Promise((resolev, reject) => {
        //现将json文件读出来
        fs.readFile(url, function (err, data) {
            if (err) {
                errFunc({err:err},res)
                resolev({ success: false })
                return
            }
            let str = data.toString();//将二进制的数据转换为字符串
            var result = (JSON.parse(str))['data'];
            result = result.map(res=>{
                var obj = res;
                // delete obj['session_key']
                return obj
            })
            // Ut.requestSuccess({result:{list:result}},res)
            resolev({ success: true,result:result,total:(JSON.parse(str))['total']})
        })
    })
}