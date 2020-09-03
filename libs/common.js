const path = require('path');
const url = require('url');
const fs = require('fs');
const moment = require("moment");


function getBetweenDates(day1,day2) {
    var getDate = function (str) {
        var tempDate = new Date();
        var list = str.split("-");
        tempDate.setFullYear(list[0]);
        tempDate.setMonth(list[1] - 1);
        tempDate.setDate(list[2]);
        return tempDate;
    }
    var date1 = getDate(day1);
    var date2 = getDate(day2);
    if (date1 > date2) {
        var tempDate = date1;
        date1 = date2;
        date2 = tempDate;
    }
    date1.setDate(date1.getDate() + 1);
    var dateArr = [];
    var i = 0;
    while (!(date1.getFullYear() == date2.getFullYear() &&
            date1.getMonth() == date2.getMonth() && date1.getDate() == date2
            .getDate())) {
        var dayStr = date1.getDate().toString();
        if (dayStr.length == 1) {
            dayStr = "0" + dayStr;
        }
        var monthStr = (date1.getMonth() + 1).toString();
        if (monthStr.length == 1) {
            monthStr = "0" + monthStr;
        }
        dateArr[i] = date1.getFullYear() + "-" + monthStr + "-" +
            dayStr;
        i++;
        date1.setDate(date1.getDate() + 1);
    }
    dateArr.splice(0, 0, day1)
    dateArr.push(day2);
    return dateArr;
}
module.exports = {
    getBetweenDates: getBetweenDates
}