const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const url = require('url');
const models = require('../models/index.js');
const common = require('../libs/common.js');
const querystring = require('querystring')
router.use((req, res, next) => {
    next()
})
// 获取文件列表
router.get('/web/files',async function (req, res) {
    try {
        const data = await common.dive(__dirname+'/../public/web')
        // console.log('data',data)
        // 等待操作结果返回，然后打印结果
        var result = {
            errcode: 0,
            msg: '',
            result: data,
            success: true
        }
        res.json(result)
    } catch (e) {
        var result = {
            errcode: 0,
            msg: '读取文件发生错误',
            result: {},
            success: false
        }
        res.json(result)
    }
})

// 读取文件
router.get('/miniapp/api/test', function (req, res) {
    try {
        const data = fs.readFileSync(__dirname + '/../public/data/userInfo.json', 'utf-8');
        // 等待操作结果返回，然后打印结果
        var result = {
            errcode: 0,
            msg: '',
            result: data,
            success: true
        }
        res.json(result)
    } catch (e) {
        var result = {
            errcode: 0,
            msg: '读取文件发生错误',
            result: {},
            success: false
        }
        res.json(result)
    }
});

router.post('/miniapp/api/set_test', async function (req, res) {
    var data = {
        a: 11,
        b: 222,
        c: 9999
    }
    let body = req.body||{};
    let isRes = await writeJson(__dirname + '/../public/data/userInfo.json', body);
    var result = {
        errcode: 0,
        msg: '操作成功',
        result:{},
        success: true
    }
    res.json(result)
});
function writeJson(url, params) {
    return new Promise((resolev, reject) => {
        //现将json文件读出来
        fs.readFile(url, function (err, data) {
            if (err) {
                resolev({ success: false })
                return
            }
            var person = data.toString();//将二进制的数据转换为字符串
            person = JSON.parse(person);//将字符串转换为json对象
            if(person.total){
                person.total_num = Number(person.total_num) + 1;
            }else{
                person.total_num = 1;
            }
            params.weixin_id = person.total_num;

            person.data.push(params);//将传来的对象push进数组对象中
            person.total = person.data.length;//定义一下总条数，为以后的分页打基础
            var str = JSON.stringify(person);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(url, str, function (err) {
                if (err) {
                    resolev({ success: false })
                    return
                }
                resolev({ success: true })
                return
            })
        })
    })
}

module.exports = router;
