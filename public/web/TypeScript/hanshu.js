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
function buildname(firstName) {
    var restofname = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        restofname[_i - 1] = arguments[_i];
    }
    console.log('restofname', restofname);
    return firstName + ' ' + restofname.join(" ");
}
var employeeName = buildname("Joseph", "Samuel", "Lucas", "MacKinzie");
console.log(employeeName);
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            console.log(_this);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
var Thing = /** @class */ (function () {
    function Thing() {
    }
    Thing.prototype.doSomething = function () { };
    return Thing;
}());
var MyThing = /** @class */ (function (_super) {
    __extends(MyThing, _super);
    function MyThing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyThing.prototype.myMethod = function () {
        // OK，可以在子类里访问受保护的成员
        this.doSomething();
    };
    return MyThing;
}(Thing));
var t = new MyThing();
t.myMethod(); // Error，不能在类外部访问受保护成员
