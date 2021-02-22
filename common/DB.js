const { rejects } = require('assert');
let mysql = require('mysql');
const { resolve } = require('url');

class DB {
    constructor(height, width) {
        this.conn = null;
    };
    static mysql_Init(){
        return new Promise((resolve,rejects)=>{
            this.conn = mysql.createConnection({
                host:'localhost',
                user:'root',
                password:'root',
                database:'test',
                port:3306
            })
            // 连接
            this.conn.connect(function (err) {
                if (err) {
                    console.log('[query] - :' + err);
                    return;
                }
                console.log('[connection connect]  succeed!');
                resolve()
            });
        })
    }
    
}