const path = require('path');
const url = require('url');
const fs = require('fs');
/**
 * 
 * @param {文件绝对路径} dir 
 */
const dive = function (dir) {
    return new Promise((resolve,reject)=>{
        var pathUrl = []
        dive2(dir,pathUrl)
        var num = 0,num2=0,dirNum=0;
        var isDir =false
        function dive2(dir,pathUrl){
            fs.readdir(dir, function (err, list) {
                if(err) { 
                    resolve(pathUrl)
                }else{
                    num = num+(list.length||0)
                    isDir = false
                    if(dirNum) dirNum--
                    list.forEach(function (file,i) {
                        num2++
                        var path = dir + "\\" + file;
                        var state = fs.lstatSync(path);
                        if (state.isDirectory()) {
                            // 如果需要对path进行操作 需要转字符串toString()
                            // console.log(path + '是文件夹');
                            //递归函数
                            isDir = true
                            dirNum++
                            dive2(path,pathUrl);
                        } else {
                            // console.log(path + '是文件');
                            pathUrl.push(path)
                            // console.log(num,num2,isDir,pathUrl)
                            if(num==num2&&!isDir&&dirNum<=0){
                                // console.log('遍历结束')
                                resolve(pathUrl)
                            }
                        }
                    });
                }
            });
        }
    })
};

module.exports = {
    dive:dive
}