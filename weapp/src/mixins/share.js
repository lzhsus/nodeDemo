import wepy from '@wepy/core';
import Api from 'Api';
import appConfig from 'Appconfig';
import * as common from 'Common';
import Log from 'Log';

export default {
    methods: {
        onShareAppMessage (res) {
            let shareObj = {
                title: appConfig.shareTitle||"宝宝软实力七天团战赛",
                imageUrl: appConfig.shareImageUrl||"https://qh.eintone.com/groupweapp/static/share.jpg",
                path: "/pages/index",
            }
            Log.info(shareObj);
            return shareObj;
        }
    }
}
