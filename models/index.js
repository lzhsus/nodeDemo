const fsFiles = require('./fs/index')
// const fs = require('fs');

module.exports = {
    fs:fsFiles
}
function readFile(request,response,url,dirname){
    fs.readFile(url, function (err, data) {
        if (err) {
            response.writeHead(404, { "Content-Type": "text/html" });
        }else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data.toString());
        }
        response.end();
    });
}