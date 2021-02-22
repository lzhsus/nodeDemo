function buildname(firstName:String,...restofname:string[]){
    console.log('restofname',restofname)
    return firstName + ' '+ restofname.join(" ");
}
let employeeName = buildname("Joseph", "Samuel", "Lucas", "MacKinzie");
console.log(employeeName)

let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards:Array(52),
    createCardPicker:function(){
        return ()=>{
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);
            console.log(this)
            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
class Thing {
    // 受保护的
    protected doSomething() { /* ... */ }
  }
  
  class MyThing extends Thing {
    public myMethod() {
      // OK，可以在子类里访问受保护的成员
      this.doSomething();
    }
  }
  var t = new MyThing();
  t.myMethod(); // Error，不能在类外部访问受保护成员
  function equal<T>(lhs: T, rhs: T): boolean {
    return lhs === rhs;
  }
  
  // 之前没有错误
  // 现在会报错：在string和number之前没有最佳的基本类型
  var e = equal("24", "1");