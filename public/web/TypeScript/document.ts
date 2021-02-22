
enum Color { Red, Yellow, Blue };
let c: Color = Color.Red;
console.log(Color[0])

let a:null;
console.log(a)
let d:undefined;
console.log(d)

for(let i:number = 0;i<[1,2,3].length;i++){

}
/**
 * 
 * @param num 
 * @param result 
 */
function jc(num:number,result:number = 1):number{
    console.log(num,result)
    if(num<=1) return result;
    result = result*num;
    num--;
    jc(num,result)
}
console.log("5 的阶乘为：",jc(5))

var num:number = 5; 
var factorial:number = 1; 
 
while(num >=1) { 
    factorial = factorial * num; 
    num--; 
} 
console.log("5 的阶乘为："+factorial);