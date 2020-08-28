var log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null;
module.exports = {
    info(res, isPostLog=true) {
        console.log(res);
        if (!log) return;
        if( isPostLog ){
            log.info.apply(log, arguments);
        }
    },
    warn(res, isPostLog=true) {
        console.log(res);
        if (!log) return;
        if( isPostLog ){
            log.warn.apply(log, arguments);
        }
    },
    error(res, isPostLog=true) {
        console.log(res);
        if (!log) return;
        if( isPostLog ){
            log.error.apply(log, arguments);
        }
    },
    setFilterMsg(msg) {
        // 从基础库2.7.3开始支持
        if (!log || !log.setFilterMsg) return;
        if (typeof msg !== 'string') return;
        log.setFilterMsg(msg);
    }
}