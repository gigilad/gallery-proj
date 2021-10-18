const WALL = 'WALL';
const FLOOR = 'FLOOR';
const BALL = 'BALL';
const GAMER = 'GAMER';

const GAMER_IMG = '<img src="img/gamer.png">';
const BALL_IMG = '<img src="img/ball.png">';

// Model:
var gBoard;
var gGamerPos;
var gBallBoard =2;
var gBallInterval;
var gBallEaten = 0;
function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gBallInterval= setInterval(getRandomBall, 2000); 

}

// Create the Matrix 10 * 12 
function buildBoard() {
	var board = createMat(10, 12);
	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			var cell = { type: FLOOR, gameElement: null };
			if (i === 0 || i === board.length - 1 ||
				j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			if (i=== 0 && j ===5 || i=== 9 && j === 5) {
				cell.type = FLOOR
			}
			if (i=== 5 && j === 0 || i=== 5&& j === 11) {
				cell.type = FLOOR
			}
			}
			board[i][j] = cell;
		}
	}
	// Place the gamer and two balls
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
	board[2][6].gameElement = BALL;
	board[3][8].gameElement = BALL;
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var elBoard = document.querySelector('.board');
	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j });
				
			if (currCell.type === FLOOR) cellClass += ' floor';
			else if (currCell.type === WALL) cellClass += ' wall';

			strHTML += `\t<td class=" cell ${cellClass}" onclick="moveTo(${i},${j})" >\n`;

			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}
	// console.log('strHTML is:');
	// console.log(strHTML);
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {
		if (targetCell.gameElement === BALL) {
			gBallEaten++
			playAudio()
			gBallBoard --;
			
		
		}

			var elScore = document.querySelector('h2 span')
			elScore.innerText = gBallEaten
			
			// Move the gamer
			// MODEL
			gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
			gBoard[i][j].gameElement = GAMER;
			
			// DOM
			renderCell(gGamerPos, '');
			
			gGamerPos = { i: i, j: j };
			renderCell(gGamerPos, GAMER_IMG);
			if (gBallBoard === 0) {
				gameOver() 
				
			}
			} else console.log('TOO FAR', iAbsDiff, jAbsDiff)
}

function getRandomBall(){
	var board = gBoard
	var currPos = getRandomEmptyCell(board)
	gBoard[currPos.i][currPos.j].gameElement = BALL
	 renderCell(currPos, BALL_IMG)
	 gBallBoard++
	

}

function getRandomEmptyCell(board){
	var gEmptyCells = getEmptyCells(board)
    var currIdx = getRandomInt(0, gEmptyCells.length - 1);
	return gEmptyCells[currIdx]

}


function getEmptyCells(board){
	var gEmptyCells = []
	for (var i = 0; i < board.length-1; i++) {
		for (var j = 0; j < board[0].length-1; j++) {
			if (board[i][j].type === FLOOR && board[i][j].gameElement === null){
				gEmptyCells.push ({i, j})
			}
		}
	}
return gEmptyCells
}


// Convert a location object {i, j} to a selector and render a value in that element

function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location);
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;
}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

function playAudio() {
	var gsound = new Audio('sound/collected.wav')
	gsound.play()

	
}


function gameOver() {
	var elBtn = document.querySelector('button')
	elBtn.style.display = 'block'
	clearInterval(gBallInterval)
	gBallEaten = 0;
	var elScore = document.querySelector('h2 span')
			elScore.innerText = gBallEaten
	console.log('big win!');
}

function restartGame() {
	var elBtn = document.querySelector('button')
	elBtn.style.display = 'none'
	initGame()
	
}