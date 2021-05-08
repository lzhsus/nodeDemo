// 创建游戏
class Game {
    constructor({gamePanel,type,iconNum}) {
        this.gamePanel = gamePanel;
        this.type = type||16;
        this.iconNum = iconNum||11;
        this.score = 0; // 分数
        this.time = 0; // 时间
        this.tracklist = []; // 轨迹列表
        this.isGameBegin = false; // 游戏是否开始
        this.isGameOver = false; // 游戏是否结束
        this.isGameReset = false; // 游戏是否重置
        this.isFirstClick = true; // 图片元素是否第一次点击
        this.pieceMap = null; // 图片映射表
        this.pieceList = [];// 图片列表
        this.randomList = []; // 图片随机数列表
        this.pieceImgList = [];// 图片列表不包含图片
    }
    init() {
        if (this.isGameBegin) return;
        this.isGameBegin = true;
        this.pieceMap = new Map();
        this.time = 0;		
        this.startTime();

        this.initPieces();
        this.initImgPieces();
    }
    initPieces() { // 将随机生成的150张图片添加进画布
        this.initRandomList()
        this.messRandomList(); // 打乱随机列表排序
        for (var i = 0; i < Math.pow((this.type+1),2); i++) {
            var piece = new Piece(this);
            this.pieceList.push(piece);
            var x = (i % (this.type+1));
            var y = Math.floor(i / (this.type+1));
            this.pieceMap.put(x + "," + y, piece);
            piece.setPosition(x, y);

            this.gamePanel.appendChild(piece.dom);
            // 外围 可以作为痕迹
            if(x==0||y==0||x==this.type+1||y==this.type+1){
                piece.track = document.createElement("div");
                piece.track.className = "track";
                piece.dom.appendChild(piece.track);
                piece.isTracked = true;
                continue;
            }else{
                if(x==1||y==1||x==this.type||y==this.type){
                    piece.setAtEdge(true);
                }
                this.pieceImgList.push(piece);
            }
        }
    }
    // 初始化图片
	initImgPieces() {
		for (var i = 0; i < this.pieceImgList.length; i ++) {
			this.pieceImgList[i].initImg();
			this.pieceImgList[i].img.src = "img/grade-"+this.randomList[i]+".png"
			this.pieceImgList[i].setImgSrc(this.pieceImgList[i].img.src);			
			// 执行图片点击事件
			this.pieceImgList[i].onClick();
		}
	}
    initRandomList() { // 初始化随机表
        // 获取随机数列，成双出现
        for (var i = 0; i < Math.pow((this.type+1),2)/2; i++) {
            var random = parseInt(Math.random() * (this.iconNum-1) * 10000, 10);
            var number = random % this.iconNum;
            this.randomList.push(number);
            this.randomList.push(number);
        }
    }
    messRandomList() {
        for (var i = 0; i < this.randomList.length; i++) {
            var random = parseInt(Math.random() * 15 * 10000, 10);
            var number = random % 150;
            var temp;
            temp = this.randomList[i];
            this.randomList[i] = this.randomList[number];
            this.randomList[number] = temp;
        }
    }
    startTime() { // 开始计时
        if (this.isGameOver) return;
        this.time++;
        document.getElementById("time").innerHTML = this.time;
        setTimeout(() => {
            this.startTime()
        }, 1000);
    }
    start() {
        if (this.isGameReset) {
            this.isGameOver = false;
            this.startTime();
            return;
        } else if (this.isGameBegin) {
            return;
        } else {
            this.init();
            return;
        }
    }
    reset() {

    }
}
class Piece {
    constructor(game) {
        this.game = game; // 游戏对象
        this.isEdge = false; // 是否为边缘元素
        this.atEdge = false; // 是否挨着边缘元素
        this.dom = null; // 图片dom元素
        this.img = null; // 图片元素
        this.src = null; // 图片元素来源
        this.track = null; // 轨迹元素
        this.isTracked = false; // 是否可以作为轨迹
        this.selected = null; // 选中标记元素
        this.x = 0; // 图片横向排列
        this.y = 0;  // 图片纵向排列
        this.flashId = null;  // 图片闪烁Id
        this.onClicked = false; // 图片是否点击
        this.flashCount = 0; // 闪烁次数
        this.init();
    }
    // 初始化
    init() {
        this.dom = document.createElement("div");

        this.dom.className = "piece";
        this.selected = document.createElement("img");
    }

    // 初始化图片
    initImg() {
        this.img = document.createElement("img");
        this.dom.appendChild(this.img);
    }
    // 满足算法后初始化track元素
    initTrack() {
        if (this.flashId != null) {
            // 停止闪烁
            this.stopFlash();
        }
        //alert("initTrack middle");
        if (this.track != null)  return;

        this.onClicked = false;

        this.dom.removeChild(this.img);
        this.track = document.createElement("div");
        this.track.className = "track";
        this.dom.appendChild(this.track);

    }

    // 位图片设置来源
    setImgSrc(src) {
        this.src = src;
    }

    // 为图片设置二维排列位置
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.dom.setAttribute("x",this.x);
        this.dom.setAttribute("y",this.y);
    }
    // 为图片设置选中元素
    setSelected() {
        if (this.flashCount++ % 2 == 0) {
            this.img.src = "img/medal-3.png";
        } else {
            this.img.src = this.src;
        }
    }

    // 设置是否为边缘元素
    setEdge(isEdge) {
        this.isEdge = isEdge;
    }

    // 设置是否挨着边缘元素
    setAtEdge(atEdge) {
        this.atEdge = atEdge;
    }

    // 开始闪烁
    flash() {
        this.flashId = setInterval(()=>{
            this.setSelected();
        }, 500);
    }

    // 停止闪烁
    stopFlash() {
        clearInterval(this.flashId);
        if (this.flashCount % 2 == 1) {
            this.img.src = this.src;
        }
    }

    // 对象被选择的内部函数
    onClick() {
        if (this.onClicked) {
            return;
        }
        var _this = this;
        this.img.onclick = function () {
            if (_this.onClicked) {
                return;
            }
            
            if (_this.checkPiece()) {
                return;
            }
            _this.flash();
            _this.onClicked = true;
        };
    }

    // 检查是否有被点击的图片
    checkPiece() {
        for (var i = 0; i < this.game.pieceList.length; i++) {
            if (this.game.pieceList[i].onClicked && !this.game.pieceList[i].equal(this)) {
                if (this.game.pieceList[i].equalImage(this)) {
                    this.searchTrack(this.game.pieceList[i]);
                } else {
                    this.game.pieceList[i].stopFlash();
                    this.game.pieceList[i].onClicked = false;
                    this.onClicked = false;
                    return false;
                }
                return true;
            } else {
                continue
            }
        }
        return false;
    }

    // 是否为同一个对象
    equal(piece) {
        return (this.x == piece.x && this.y == piece.y);
    }

    // 是否为同一个图片
    equalImage(piece) {
        return this.src == piece.src;
    }

    // 搜寻路径
    searchTrack(piece) {
        if (this.isNear(piece)) {
            this.linkTrack(piece);
            return;
        }

        if (this.isReach(piece) || this.isReach2(piece)) {
            this.linkTrack(piece);
            return;
        }

    }

    // 是否相邻
    isNear(piece) {
        var a = (Math.abs(piece.x - this.x) == 1) && (piece.y == this.y) ||
            (Math.abs(piece.y - this.y) == 1) && (piece.x == this.x);
        return a;
    }

    // 直线
    isStraightReach(piece) {
        if (this.isNear(piece))  return true;

        var a = false;
        var b = false;
        if (this.x == piece.x) {
            for (var i = this.min(this.y, piece.y) + 1; i < this.max(this.y, piece.y); i++) {
                if (this.game.pieceMap.get(piece.x + "," + i).isPass()) {

                    a = true;

                    this.game.trackList.push(this.game.pieceMap.get(piece.x + "," + i));

                    continue;
                } else {

                    a = false;
                    this.game.trackList = [];
                    return a;
                }
            }
        }

        if (this.y == piece.y) {
            for (var i = this.min(this.x, piece.x) + 1; i < this.max(this.x, piece.x); i++) {
                if (this.game.pieceMap.get(i + "," + piece.y).isPass()) {
                    b = true;
                    this.game.trackList.push(this.game.pieceMap.get(i + "," + piece.y));
                    continue;
                } else {
                    b = false
                    this.game.trackList = [];
                    return b;
                }
            }
        }
        return a || b;
    }
    // 拐一次弯搜索
    isReach1(piece) {
        var corner_1 = this.game.pieceMap.get(this.x + "," + piece.y);
        var corner_2 = this.game.pieceMap.get(piece.x + "," + this.y);
        var _this = this;
        if ((_this.isStraightReach(corner_1)) &&
            (corner_1.isStraightReach(piece)) &&
            corner_1.isPass()) {

            this.game.trackList.push(corner_1);
            return true;
        }
        if ((_this.isStraightReach(corner_2)) &&
            (corner_2.isStraightReach(piece)) &&
            corner_2.isPass()) {
            this.game.trackList.push(corner_2);
            return true;
        }
        return false;
    }
    // 直接或拐一次弯搜索
    isReach(piece) {
        var a = this.isStraightReach(piece);
        var b = this.isReach1(piece);
        return a || b;
    }
    // 拐两次弯搜索
    isReach2(piece) {
        // 沿x轴正向搜索
        for (var i = this.x + 1; i < 17; i++) {
            if (!this.game.pieceMap.get(i + "," + this.y).isPass()) {
                this.game.trackList = [];
                break;
            } else if (this.game.pieceMap.get(i + "," + this.y).isReach(piece) &&
                this.game.pieceMap.get(i + "," + this.y).isPass()) {
                this.game.trackList.push(this.game.pieceMap.get(i + "," + this.y));
                return true;
            }
        }
        // 沿x轴搜索
        for (var i = this.x - 1; i >= 0; i--) {
            if (!this.game.pieceMap.get(i + "," + this.y).isPass()) {
                this.game.trackList = [];
                break;
            } else if (this.game.pieceMap.get(i + "," + this.y).isReach(piece) &&
                this.game.pieceMap.get(i + "," + this.y).isPass()) {
                this.game.trackList.push(this.game.pieceMap.get(i + "," + this.y));
                return true;
            }
        }
        // 沿y轴搜索
        for (var i = this.y - 1; i >= 0; i--) {
            if (!this.game.pieceMap.get(this.x + "," + i).isPass()) {
                this.game.trackList = [];
                break;
            } else if (this.game.pieceMap.get(this.x + "," + i).isReach(piece) &&
                this.game.pieceMap.get(this.x + "," + i).isPass()) {
                this.game.trackList.push(this.game.pieceMap.get(this.x + "," + i));
                return true;
            }
        }
        // 沿y轴正向搜索
        for (var i = this.y + 1; i < 12; i++) {
            if (!this.game.pieceMap.get(this.x + "," + i).isPass()) {
                this.game.trackList = [];
                break;
            } else if (this.game.pieceMap.get(this.x + "," + i).isReach(piece) &&
                this.game.pieceMap.get(this.x + "," + i).isPass()) {
                this.game.trackList.push(this.game.pieceMap.get(this.x + "," + i));
                return true;
            }
        }
        return false;
    }

    // 路径连接
    linkTrack(piece) {
        this.initTrack();
        piece.initTrack();
        this.changeScore();
        this.showTrack(piece);
    }

    // 显示足迹
    showTrack(piece) {
        this.game.trackList.push(piece);
        this.track.className = "track2";
        for (var i = 0; i < this.game.trackList.length; i++) {
            //alert(i);
            this.game.trackList[i].track.className = "track2";
        }
        var _this = this;
        setTimeout(function () {
            _this.hideTrack()
        }, 500);
    }

    // 隐匿足迹
    hideTrack() {
        for (var i = 0; i < this.game.trackList.length; i++) {
            this.game.trackList[i].track.className = "track";
        }
        this.game.trackList = [];
        this.track.className = "track";
        this.isTracked = true;
    }
    // 分数增加
    changeScore() {
        this.game.score += 100;
        document.getElementById("score").innerHTML = this.game.score;
    }
    min(a, b) {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }
    max(a, b) {
        if (a > b) {
            return a;
        } else {
            return b;
        }
    }

    isPass() { // 判断是否通过
        return this.track != null;
    }

}

class Map {
    constructor() {
        this.data = [];
    }
    put(key, value) {
        this.data[key] = value;
    }
    get(key) {
        return this.data[key];
    }
    remove(key) {
        this.data[key] = null;

    }
    isEmpty() {
        return this.data.length == 0;
    }
    size() {
        return this.data.length;
    }
}