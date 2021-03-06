#!/usr/bin/env node

/**
 * Module dependencies.
 */

var app = require('../app');
var debug = require('debug')('app-name:server');
var http = require('http');
const opn = require('opn');
const os = require('os');
/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '3002');
app.set('port', '127.0.0.1:3002');

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port,res=>{
    var localhost = ''
    try {
      var network = os.networkInterfaces()
      localhost = network[Object.keys(network)[0]][1].address
    } catch (e) {
      localhost = 'localhost';
    }
    var uri = 'http://' + localhost + ':' + port;
    console.log('listen at ' + uri + '\n')
    console.log('合成图片：'+uri+'/miniapp/api/node/canvas?isToken=true&time=XXXX')

    // opn(uri)
});
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
