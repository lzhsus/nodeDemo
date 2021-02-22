var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var isDone = false;
var decLiteral = 6; //十进制
var hexLiteral = 0xf00d; //十六进制
var binaryLiteral = 10; // ES6 中的二进制表示法
var octalLiteral = 484; // ES6 中的八进制表示法
function query(name) {
    alert("");
}
var tom = {
    name: "Tom",
    age: 25
};
var mySun = function (x, y) {
    return x * y;
};
var arr1 = [1, 2, 3];
var arr2 = [1, 2, 3];
var arr3 = [{ id: 1 }];
var arr4;
arr4 = [1, '1'];
console.log(arr4[1]);
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
}
catch (error) {
}
var Greeter = /** @class */ (function () {
    function Greeter(message) {
        this.greeting = message;
    }
    Greeter.prototype.greet = function () {
        return "Hello, " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter("world");
console.log(greeter.greet());
// 继承
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + "m.");
    };
    return Animal;
}());
// 类从积累中继承了属性和方法
// dog 是一个派生类 他派生自 animal 基类
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('woof!woof!');
    };
    return Dog;
}(Animal));
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log('slithering...');
        // super.move(distanceInMeters)
    };
    return Snake;
}(Animal));
var dog = new Dog();
// dog.bark()
// dog.move(10)
// dog.bark()
var snake = new Snake("Sammy the Python");
snake.move();
