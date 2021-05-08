var xxk=xxk||{}
///
xxk.randomize=function (aArray) {
    var aCopy = aArray.concat();
    var aRandomized = new Array();
    var nRandom;
    for (var i = 0; i < aCopy.length; i++) {
        nRandom = Math.floor(Math.random() * aCopy.length);
        aRandomized.push(aCopy[nRandom]);
        aCopy.splice(nRandom, 1);
        i--;
    }
    return aRandomized;
}

/**
 * 
 */

xxk.data={
	iconSheet:new createjs.SpriteSheet({
			"images": ["pic/icon_all.png"],
			"frames": {"regX": 45, "height": 90, "count": 22, "regY": 45, "width": 90},
		})
}
/**
 * [description]
 * @return {[type]} [description]
 */
xxk.Icon=function($col,$row,frame,w,b){
	var self=this;
	//this.ID=$id;
	this.col=$col;
	this.row=$row;
	this.type=frame;
	this.isDown=false;
	this.showFrame=frame;
	//alert(222)
	this.sheet=new createjs.Sprite(xxk.data.iconSheet);
	this.sheet.gotoAndStop(frame);
	this.display=new createjs.Container();
	this.display.mouseChildren=false;
	this.display.addChild(this.sheet);
	this.tipSheet=new createjs.SpriteSheet({
			"images": ["pic/tip.png"],
			"frames": {"regX": 90, "height": 138, "count": 3, "regY": 83, "width": 146},
			"animations":{"play":{frames: [0,0,0,0,1,1,1,1,2,2,2,2]}}
		})
	this.frame= new createjs.Sprite(this.tipSheet,"play");
	this.frame.x=0;
	this.frame.y=0;
	this.frame.visible=false;
	this.frame.mouseEnabled=this.frame.mouseChildren=false;
	this.display.addChild(this.frame);

	var targetY=$row * w;
	this.display.x=$col* w;
	if(b){
		this.display.y=targetY-10*w;
		createjs.Tween.get(this.display).wait($col*100).to({y:targetY}, 500);
	}else{
		this.display.y=targetY;
	}
	
	this.count=0
	this.mouseDown=false;
	this.display.addEventListener("mousedown",iconClickHandler)
	function iconClickHandler(e){
		//alert(1)
		//self.show();
		if(!self.mouseDown){
			//$(".u_p_m.user").html(self.count++);
			self.dispatchEvent(new createjs.Event("icon_click"));
			self.mouseDown=true;
			setTimeout(function(){self.mouseDown=false},350)
		}
		
	}
	
}
xxk.Icon.prototype.show=function(){
	this.frame.visible=true;
	this.isDown=true;
	//this.sheet.gotoAndStop(this.showFrame+1);
}
xxk.Icon.prototype.hide=function(){
	this.frame.visible=false;
	this.isDown=false;
	//this.sheet.gotoAndStop(this.showFrame);
}
xxk.Icon.prototype.setY=function(value){
	this.display.y=value;
}


//////////////////////////
///////////////////////////////////////////////

xxk.game=(function(){
	createjs.EventDispatcher.initialize(xxk.Icon.prototype);

	var stage= new createjs.Stage("game");
	createjs.Ticker.setFPS(30)
    createjs.Touch.enable(stage);
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
    	movePieces();
	    stage.update();
	}


	var _gameContainer;
	var _score=0;
	var _per=0;
	var _col=7;
	var _row=6;
	var _iconWidth=90;
	var _numPieces = 22;
	var _spacing = _iconWidth;
	var _offsetX = 0;
	var _offsetY = 0;
	
		// game grid and mode
	var _grid=[];
	var _firstPiece;
	var _isDropping=false;
	var _isSwapping=false;
	var _startNum=0//Math.random()*14;
	var _autoFind=true;
	var _autoFindTime=10000;
	var _autoFindIntarvalID;
	var _isTimeOut=false
	init();
	function init(){
		_gameContainer=new createjs.Container();
		_gameContainer.x=49;
		_gameContainer.y=250;

		stage.addChild(_gameContainer);

		createScene();
	}

	function createScene(){
		
		while (true) {
			_grid=[];
			_gameContainer.removeAllChildren();
			for(var col=0;col<_col;col++) {
				_grid[col] = new Array();
				for(var row=0;row<_row;row++) {
					addPiece(col,row,true);
				}
			}
			if (lookForMatches().length != 0) continue;
			if (lookForPossibles() == false) continue;
			break;
		} 
		find();

	}
	function addPiece(col,row,b) {
		var newPiece = new xxk.Icon(col,row,Math.floor(Math.random()*6)*2,_iconWidth,b);
		_gameContainer.addChild(newPiece.display);
		_grid[col][row] = newPiece;
		newPiece.addEventListener("icon_click",clickPiece);
		return newPiece;
	}
	function clickPiece(event) {
		var piece = event.target;

		if (_firstPiece == null) {
			piece.show();
			_firstPiece = piece;
		} else if (_firstPiece == piece) {
			piece.hide();
			_firstPiece = null;
		} else {
			_firstPiece.hide();
			piece.hide();
			if (_firstPiece.row == piece.row) {
				if (Math.abs(_firstPiece.col-piece.col) == 1) {
					
					makeSwap(_firstPiece,piece);
					_firstPiece = null;
				}
			} else if (_firstPiece.col == piece.col) {
				if (Math.abs(_firstPiece.row-piece.row) == 1) {
					
					makeSwap(_firstPiece,piece);
					_firstPiece = null;
				}
			} else {
				_firstPiece = piece;
				_firstPiece.show();
			}
		}
		piece.display.parent.setChildIndex(piece.display,piece.display.parent.getNumChildren()-1);
	}
	function makeSwap(piece1,piece2) {
		swapPieces(piece1,piece2);
		
		if (lookForMatches().length == 0) {
			swapPieces(piece1,piece2);
		} else {
			_isSwapping = true;
		}
	}
	function swapPieces(piece1,piece2) {
		var tempCol = piece1.col;
		var tempRow = piece1.row;
		piece1.col = piece2.col;
		piece1.row = piece2.row;
		piece2.col = tempCol;
		piece2.row = tempRow;
		_grid[piece1.col][piece1.row] = piece1;
		_grid[piece2.col][piece2.row] = piece2;	
	}
	function movePieces() {
			var madeMove = false;
			for(var row=0;row<_row;row++) {
				for(var col=0;col<_col;col++) {
					if (_grid[col][row] != null) {
						var display=_grid[col][row].display
                        console.log(display.y,_grid[col][row].row*_spacing+_offsetY)
						if (display.y < _grid[col][row].row*_spacing+_offsetY) {
							_grid[col][row].display.y +=18;
							madeMove = true;
						} else if (display.y > _grid[col][row].row*_spacing+_offsetY) {
							_grid[col][row].display.y -= 18;
							madeMove = true;
						} else if (display.x < _grid[col][row].col*_spacing+_offsetX) {
							_grid[col][row].display.x += 18;
							madeMove = true;
						} else if (display.x > _grid[col][row].col*_spacing+_offsetX) {
							_grid[col][row].display.x -= 18;
							madeMove = true;
						}
					}
				}
			}
			if (_isDropping && !madeMove) {
				_isTimeOut=false;
				_isDropping = false;
				find();
				findAndRemoveMatches();
			} else if (_isSwapping && !madeMove) {
				_isSwapping = false;
				_isTimeOut=false;
				find();
				findAndRemoveMatches();
			}else{
				
			}
	}
	function findAndRemoveMatches() {
			var matches = lookForMatches();
			for(var i=0;i<matches.length;i++) {
				var numPoints = (matches[i].length-1)*5;
				for(var j=0;j<matches[i].length;j++) {
					if (_gameContainer.contains(matches[i][j].display)) {
						//var pb = new PointBurst(this,numPoints,matches[i][j].x,matches[i][j].y);
						addScore(numPoints);
						_gameContainer.removeChild(matches[i][j].display);
						//console.log(matches[i][j])
						//console.log(matches[i][j].col,matches[i][j].row)
						_grid[matches[i][j].col][matches[i][j].row] = null;
						//console.log(_grid[matches[i][j].col][matches[i][j].row])
						affectAbove(matches[i][j]);
					}
				}
			}
		
			addNewPieces();
			if (matches.length == 0) {
				if (!lookForPossibles()) {
					//endGame();
					//console.log("gameOver");
					createScene();
				}
			}
	}
	function addScore(value){
		_score+=value+value*_per;
		setScore();
	}
	function getScore(){
		return _score;
	}
	function lookForMatches() {
		var matchList = new Array();
		for (var row=0;row<_row;row++) {
			for(var col=0;col<(_col-2);col++) {
				var match = getMatchHoriz(col,row);
				if (match.length > 2) {
					matchList.push(match);
					col += match.length-1;
				}
			}
		}
		for(col=0;col<_col;col++) {
			for (row=0;row<(_row-2);row++) {
				match = getMatchVert(col,row);
				if (match.length > 2) {
					matchList.push(match);
					row += match.length-1;
				}
						
			}
		}
		return matchList;
	}
	function getMatchHoriz(col,row) {
		var match = new Array(_grid[col][row]);
		for(var i=1;col+i<_col;i++) {
			var piece1=_grid[col][row];
			var piece2=_grid[col+i][row];
			if (piece1.type == piece2.type) {
				match.push(piece2);
			} else {
				return match;
			}
		}
		return match;
	}

	function getMatchVert(col,row) {
		var match = new Array(_grid[col][row]);
		for(var i=1;row+i<_row;i++) {
			var piece1=_grid[col][row];
			var piece2=_grid[col][row+i];

			if (piece1.type == piece2.type) {
				match.push(piece2);
			} else {
				return match;
			}
		}
		return match;
	}
	function affectAbove(piece) {
		for(var row=piece.row-1;row>=0;row--) {
			if (_grid[piece.col][row] != null) {
				_grid[piece.col][row].row++;
				_grid[piece.col][row+1] = _grid[piece.col][row];
				_grid[piece.col][row] = null;
			}
		}
	}
	function addNewPieces() {
		for(var col=0;col<_col;col++) {
			var missingPieces = 0;
			for(var row=_row-1;row>=0;row--) {
				if (_grid[col][row]==null) {
					missingPieces++;

					var newPiece = addPiece(col,row);

					newPiece.setY(_offsetY-_spacing*missingPieces);
					_isDropping = true;
				}
			}
		}
	}
	function lookForPossibles() {
		for(var col=0;col<_col;col++) {
			for(var  row=0;row<_row;row++) {
				var arr=matchPattern(col, row, [[1,0]], [[-2,0],[-1,-1],[-1,1],[2,-1],[2,1],[3,0]])
				if (arr) {
					return arr;
				}
				arr=matchPattern(col, row, [[2,0]], [[1,-1],[1,1]])
				if (arr) {
					return arr;
				}
				arr=matchPattern(col, row, [[0,1]], [[0,-2],[-1,-1],[1,-1],[-1,2],[1,2],[0,3]])
				if (arr) {
					return arr;
				}
				arr=matchPattern(col, row, [[0,2]], [[-1,1],[1,1]])
				if (arr) {
					return arr;
				}
			}
		}
		return false;
	}
	function matchPattern(col,row, mustHave, needOne) {
		var thisType = _grid[col][row].type;
		for(var i=0;i<mustHave.length;i++) {
			if (!matchType(col+mustHave[i][0], row+mustHave[i][1], thisType)) {
				return false;
			}
		}
		for(i=0;i<needOne.length;i++) {
			if (matchType(col+needOne[i][0], row+needOne[i][1], thisType)) {
				return [col+needOne[i][0],row+needOne[i][1]];
			}
		}
		return false;
	}
	function matchType(col,row,type) {
		if (col < 0 || col > (_col-1) || row < 0 || row > (_row-1)) return false;
		return (_grid[col][row].type == type);
	}

	function lookfor(){
		if(_firstPiece){
			_firstPiece.hide();
			_firstPiece=null
		}
		var arr=lookForPossibles();
		_grid[arr[0]][arr[1]].show();
		_grid[arr[0]][arr[1]].dispatchEvent(new createjs.Event("icon_click"));
	}
	function next(){
		createScene();
	}
	function bombAll(){
		var length=Math.floor(_gameContainer.getNumChildren()/3);
		addScore(10*length);
	}
	function setPer(value){
		_per=value
	}
	function find(){
		
		if(_autoFind&&!_isTimeOut){
			if(_autoFindIntarvalID){
				clearTimeout(_autoFindIntarvalID);
				_autoFindIntarvalID=null;
			}
			_isTimeOut=true;
			_autoFindIntarvalID=setTimeout(lookfor,_autoFindTime);
		}
	}
	function setAutoFindTime(value){
		_autoFindTime=value;
	}
	function gameOver(){
		_gameContainer.mouseEnabled=_gameContainer.mouseChildren=false;
	}
	function resume(){
		createjs.Ticker.addEventListener("tick", handleTick);
	}
	return{
		gameOver:gameOver,
		lookfor:lookfor,
		getScore:getScore,
		next:next,
		bombAll:bombAll,
		setPer:setPer,
		setAutoFindTime:setAutoFindTime
	}

})()
/**
  * 道具
  */
$(".daoju1").on("click",function(){
	//xxk.game.lookfor();
	//$(".daoju1").hide();
})
$(".daoju2").on("click",function(){
	xxk.game.next();
	xxk.game.bombAll();
	$(".daoju2").hide();
	props+=$(".daoju2").attr('uid')+",";
})
$(".daoju3").on("click",function(){
	
	$(".daoju3").hide();
	props+=$(".daoju3").attr('uid')+",";
	addTime()
})
$(".daoju4").on("click",function(){
	$(".daoju4").hide();
})
$("#pauseBtn").on("click",function(){
	$("#pause").show();
	pause();
	//xxk.game.pause();
})
$(".backGame").on("click",function(){
	$("#pause").hide();
	resume();
	//xxk.game.play();
})
/**
 * 时间
 */
var upTime=0;
var timeTotal=60 * 100;
var timerCount =timeTotal;
var intervalID;
var progressBar=$("#time .progress .bar");
var timeT=$("#time .time_t");
function addTime(){
	timerCount+=10*100;

}
function setTime(){

	timerCount--;
	if(timerCount>timeTotal){
		timerCount=timeTotal;
	}
	if(upTime>0){
		upTime--;
		xxk.game.setPer(.2);
		$(".e_body").addClass('e_bodyBgp');
	}else{
		$(".e_body").removeClass('e_bodyBgp');
		xxk.game.setPer(0);
	}
	var second = Math.floor(timerCount / 100) % 60;
	var timePer = timerCount / timeTotal;
	progressBar.css("left",190*timePer-190+"px")
	timeT.text(second);
	if(timerCount<=0){
		gameOver();
		
	}
}
function pause(){
	clearInterval(intervalID);
}
function resume(){
	intervalID=setInterval(setTime,10);
}
function gameOver(){
	//alert("gameover")
	xxk.game.gameOver();
	pause();
	var data={
		gold:0,
		gameid:1,
		userid:userID,
		soccer:xxk.game.getScore(),
		used_prop:props,
		r:new Date().getTime()
	}
	//$.get('http://www.baoguoqi.com/api/game_records/load',data, function(data){

	//})
	//window.location.href='http://www.baoguoqi.com/api/game_records/load?'+$.param(data, true);
	$("#gameOver").css("display","block");
	// setTimeout(function(){window.location.href='http://www.baoguoqi.com/api/game_records/load?'+$.param(data, true);},1000);
}
/**
 *	设置游戏分数
 */
 function prefixInteger(num, length) {
	return (num / Math.pow(10, length)).toFixed(length).substr(2);
}
 setScore();
function setScore(){
	var score=xxk.game.getScore();
	if(String(score).length<5){
		var scoreStr=prefixInteger(score,5);
	}else{
		scoreStr=String(score);
	}
	
	for(var i=0;i<scoreStr.length;i++){
		var num=scoreStr.substr(i,1);
		$(".game_score_curr .na"+(i+1)+" span").css("background-position",(-50*num-15)+"px -10px");
	}
}
function setTopScore(topScore){
	var score=topScore;
	if(String(score).length<5){
		var scoreStr=prefixInteger(score,5);
	}else{
		scoreStr=String(score);
	}
	
	for(var i=0;i<scoreStr.length;i++){
		var num=scoreStr.substr(i,1);
		$(".game_score .na"+(i+1)+" span").css("background-position",(-40*num-12+"px -5px"));
	}
}
setTopScore(00000);

//开始动画
$("#go .ready_txt").animate({opacity: 1}, 300);
setTimeout(function(){
	$("#go .ready_txt").hide();
	$("#go .go_txt").animate({opacity: 1}, 300);
	setTimeout(function(){
		$("#go").hide()
		resume();
	},1500)
},1500)

///
$("#daoju li").hide();
var props="";
var userID=$.cookie("user_salt");
//
$.getJSON('http://www.baoguoqi.com/api/user_props',{userid:userID,gameid:1,r:new Date().getTime()}, function(data){
	if(data.code!=200){
		window.location.href="http://www.baoguoqi.com/api/client_users";
		return;
	}
  	$(".u_p_m.user").html(data.nickname+" 历史最高分");
  	setTopScore(data.point);
  	for(var i=0;i<data.props.length;i++){
  		if(data.props[i]["p_id"]==12){
  			upTime=30*100
  			$(".e_body").addClass('e_bodyBgp');
  			xxk.game.setPer(.2)
  			props+=data.props[i]["u_id"]+",";

  		}else if(data.props[i]["p_id"]==9){
  			xxk.game.setAutoFindTime(5000);
  			props+=data.props[i]["u_id"]+","
  			$('#daoju li[pid="9"]').show();
  		}else{
  			$('#daoju li[pid="'+data.props[i]["p_id"]+'"]').attr("uid",data.props[i]["u_id"]).show();
  		}
  		
  	}
})

