// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
    throwOnNotFound: false
})
const _ = db.command
// 云函数入口函数
exports.main = async(event, context) => {
    try {
        let result = await cloud.openapi.security.msgSecCheck({
            content:event.content
        })
        return result
        if(result&&result.errCode.toString() == '87014'){
            return {code:300,msg:'内容含有违法违规内容',data:result}
        }else{
            return {code:200,msg:'ok',data:result}
        }
    } catch (error) {
        if(error.errCode.toString() == '87014'){
            return {code:300,msg:'内容含有违法违规内容',data:error}
        }
        return {code:400,msg:'调用security接口异常',data:error}
    }
}
