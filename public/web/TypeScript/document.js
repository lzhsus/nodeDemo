var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Red;
console.log(Color[0]);
var a;
console.log(a);
var d;
console.log(d);
for (var i = 0; i < [1, 2, 3].length; i++) {
}
function jc(num, result) {
    if (result === void 0) { result = 1; }
    console.log(num, result);
    if (num <= 1)
        return result;
    result = result * num;
    num--;
    jc(num, result);
}
console.log("5 的阶乘为：", jc(5));
var num = 5;
var factorial = 1;
while (num >= 1) {
    factorial = factorial * num;
    num--;
}
console.log("5 的阶乘为：" + factorial);
