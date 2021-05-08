// function bubbleSort(arr) {
//     var len = arr.length;
//     for (var i = 0; i < len - 1; i++) {
//         for (var j = 0; j < len - 1 - i; j++) {
//             if (arr[j] > arr[j + 1]) { // 相邻元素两两对比
//                 var temp = arr[j + 1]; // 元素交换
//                 arr[j + 1] = arr[j];
//                 arr[j] = temp;
//             }
//         }
//     }
//     return arr;
// }
// 理一下大体思路：

// 1.默认从 i = 1 开始判断，这样 preIndex 自然是内部循环的游标；

// 2.current 保存 arr[i]，通过循环来确定 current 的最终位置；

// 3.每个内循环开始的时候，arr[i] === current === arr[preIndex + 1]，所以在内循环首次时 arr[preIndex + 1] = arr[preIndex] 的时候不必担心 arr[i] 的值丢失；

// 4.总体思路是，需要排位的元素先额外缓存起来，然后套用内循环，使得需要调整的元素赋值给它后面的一个位置上，形成依次挪位，最后因为内循环在判断条件不生效的时候停止意味着找到了需要排位的元素的正确位置，然后赋值上去，完成排序。

let num = 1
// 插入
// 最普通的排序算法 从数组下标1开始每增1项排序一次 越往后面遍历次数越多
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        // 如果上一个大于当前
        while (preIndex >= 0 && arr[preIndex] > current) {
            // 那么当前就等于上一个
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
            num++
        }
        num++
        // 那么上一个就等于 当前
        arr[preIndex + 1] = current;
    }
    console.log(num)
    return arr;
}
// 二分插入排序
// 起始位置 终止位置
function insertionSortTow(arr){
    for (var i = 1; i < arr.length; i++) {
        // 当前数组
        var temp = arr[i], left = 0, right = i - 1;

        while (left <= right) {
            var middle = parseInt((left + right) / 2);
            if (temp < arr[middle]) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
            num++
        }

        for (var j = i - 1; j >= left; j--) {
            arr[j + 1] = arr[j];
            num++
        }
        arr[left] = temp;
    }
    return arr;
}
// 快速
function quickSort(arr) {
    if(arr.length<=1) return arr;
    let left = [];
    let right = [];
    let flag = arr.shift();
    for(let i=0;i<arr.length;i++){
        num++
        if(arr[i]<flag){
            left.push(arr[i])
        }else{
            right.push(arr[i])
        }
    }
    console.log(num)
    return quickSort(left).concat(flag,quickSort(right))
}
function quickSort2(arr) {
    if(arr.length<=1) return arr;
    var left=[];  // 用来存放左侧的数据的数组
    var right=[];  // 用来存放右侧数据的数组
    let index = Math.floor(arr.length/2);
    var middle = arr[index];
    arr.splice(index,1)
    for(var i=0;i<arr.length;i++){
        num++
        if(arr[i]>middle){
            right.push(arr[i]);
        }else if(arr[i]<middle){
            left.push(arr[i]);
        }
    }
    console.log(num)
    return quickSort2(left).concat(middle,quickSort2(right))
}
// 冒泡
function bubbleSort(arr) {
    let num = 1
    for(let j=0;j<arr.length;j++){
        for(let i=0;i<arr.length-1-j;i++){
            let temp;
            num++
            if(arr[i]>arr[i+1]){
                temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
            }
        }
    }
    console.log(num)
    return arr;
}

var arr = [6, 9, 5, 66, 522, 555, 663, 7451, 5454, 2, 88, 45, 63]

console.time('method1的消耗的时间为');
console.log(arr)
console.log( insertionSort(arr))
console.timeEnd('method1的消耗的时间为');