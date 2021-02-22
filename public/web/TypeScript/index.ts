let isDone: boolean = false;
let decLiteral: number = 6; //十进制
let hexLiteral: number = 0xf00d;   //十六进制
let binaryLiteral: number = 0b1010; // ES6 中的二进制表示法
let octalLiteral: number = 0o744;  // ES6 中的八进制表示法

function query(name: string): void {
    alert("")
}
interface Person {
    readonly name: String,//只读属性
    age?: number
}
let tom: Person = {
    name: "Tom",
    age: 25
}
let mySun = function (x: number, y: number): number {
    return x * y;
}
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
let arr3: Array<Object> = [{ id: 1 }]


let arr4: [number, string];

arr4 = [1, '1']
console.log(arr4[1])

arr4[1] = "2";

for (var i = 0; i < 10; i++) {
    // capture the current state of 'i'
    // by invoking a function with its current value
    (function (i) {
        // setTimeout(function () { console.log(i); }, 100 * i);
    })(i);
}
try {
    throw "oh no!";
} catch (error) {
    
}

class Greeter {
    greeting:String;//属性
    constructor(message:string) {
        this.greeting = message;
    }
    greet():string{//构造方法
        return "Hello, "+this.greeting;
    }
}
let greeter = new Greeter("world")
console.log(greeter.greet());

// 继承
class Animal {
    name:String;
    constructor(theName?:string){
        this.name = theName;
    }
    move(distanceInMeters:number=0){
        console.log(`Animal moved ${distanceInMeters}m.`)
    }
}
// 类从积累中继承了属性和方法
// dog 是一个派生类 他派生自 animal 基类
class Dog extends Animal {
    bark(){
        console.log('woof!woof!')
    }
}
class Snake extends Animal {
    constructor(name?:string){
        super(name)
    }
    move(distanceInMeters = 5){
        console.log('slithering...')
        super.move(distanceInMeters)
    }

}

let dog = new Dog();

// dog.bark()
// dog.move(10)
// dog.bark()
let snake = new Snake("Sammy the Python");
snake.move()