const stick1 = document.querySelector('#stick1');
const stick2 = document.querySelector('#stick2');
const stick3 = document.querySelector('#stick3');
const canvas1 = document.querySelector('#canvas1');
const context1 = canvas1.getContext("2d");
const canvas2 = document.querySelector('#canvas2');
const context2 = canvas2.getContext("2d");
const canvas3 = document.querySelector('#canvas3');
const context3 = canvas3.getContext("2d");
const sticks = [stick1, stick2, stick3];
const canvases = [canvas1,canvas2,canvas3];
const contexts = [context1,context2,context3];
const startBtn = document.querySelector('#startBtn');
const stepCounter = document.querySelector(".counter");
const highScoreText = document.querySelector(".highscore");
const WIDTH = 181;
const HEIGHT = 176;
const BLOCK_COLORS = ['red','green','white','blue','purple'];

let selected = '';
let selectedCanvas = '';
let stack1 = []
let stack2 = []
let stack3 = []
let steps = 0
let stacks = [stack1, stack2, stack3];
let selectedStack;
let highscore = 0;
let gameStarted = false;

function draw_blocks() {
	if (stack1.length !== 0){
		for (let i=0; i< stack1.length+1; i++) {
			context1.fillStyle = BLOCK_COLORS[stack1[stack1.length-i]-1]
			context1.fillRect((WIDTH-(stack1[stack1.length-i]*28))/2, HEIGHT-((stack1.length+1)*30)+(i*30), stack1[stack1.length-i]*28,29)
			context1.strokeRect((WIDTH-(stack1[stack1.length-i]*28))/2, HEIGHT-((stack1.length+1)*30)+(i*30), stack1[stack1.length-i]*28,29)
		}
	}
	if (stack2.length !== 0){
		for (let i=0; i< stack2.length+1; i++) {
			context2.fillStyle = BLOCK_COLORS[stack2[stack2.length-i]-1]
			context2.fillRect((WIDTH-(stack2[stack2.length-i]*28))/2, HEIGHT-((stack2.length+1)*30)+(i*30), stack2[stack2.length-i]*28,29)
			context2.strokeRect((WIDTH-(stack2[stack2.length-i]*28))/2, HEIGHT-((stack2.length+1)*30)+(i*30), stack2[stack2.length-i]*28,29)
		}
	}
	if (stack3.length !== 0){
		for (let i=0; i< stack3.length+1; i++) {
			context3.fillStyle = BLOCK_COLORS[stack3[stack3.length-i]-1]
			context3.fillRect((WIDTH-(stack3[stack3.length-i]*28))/2, HEIGHT-((stack3.length+1)*30)+(i*30), stack3[stack3.length-i]*28,29)
			context3.strokeRect((WIDTH-(stack3[stack3.length-i]*28))/2, HEIGHT-((stack3.length+1)*30)+(i*30), stack3[stack3.length-i]*28,29)
		}
	}


}






for (let stick of sticks){
	stick.addEventListener('click', function(e) {
		if (gameStarted){
		if (!(selected === '')) {
			selected = '';
			//check if selectedstack[-1] is smaller than this stack
			check_illegal_move(selectedStack, stacks[sticks.indexOf(this)]) 
			draw_blocks()
			check_win()
			selectedStack = '';
		} else {
			selectedStack = stacks[sticks.indexOf(this)]
			if (selectedStack.length === 0) {
				alert('bad move')
			} else {
				selected = this.id;
				canvases[sticks.indexOf(this)].classList.add('selected');
				selectedCanvas = sticks.indexOf(this);
				if (selectedCanvas === 0) {
					context1.clearRect(0,0,WIDTH, HEIGHT-((stack1.length+1)*30)+60)
				} else if (selectedCanvas === 1) {
					context2.clearRect(0,0,WIDTH, HEIGHT-((stack2.length+1)*30)+60)
				} else {
					context3.clearRect(0,0,WIDTH, HEIGHT-((stack3.length+1)*30)+60)
				}
			}
		}
	}
	})
}

startBtn.addEventListener('click', function(e) {
	start()
})


function check_win() {
	if (stack3.length === 5) {
		if (highscore === 0) {
			highscore = steps
		} else {
			highscore = Math.min(highscore, steps)
		}
		sessionStorage.setItem('highscore',highscore);
		alert(`congratulations! you won! you took ${steps} moves! Your best score is ${sessionStorage.getItem('highscore')}`)
		highScoreText.innerText = `Highscore: ${highscore}`
		start()
	}
}
function check_illegal_move(from, to) {
	if (to.length === 0 || from[from.length-1] < to[to.length-1]) {
		to.push(from.pop())
		steps++;
		stepCounter.innerText = `Steps: ${steps}`;
	} else if (from !== to) {
		alert('bad move')
	}
	for (let canvas of canvases) {
		canvas.classList.remove('selected');
		selectedCanvas = '';
	}
}

function start() {
	stack1 = [5,4,3,2,1]
	stack2 = []
	stack3 = []
	steps = 0
	selected = '';
	selectedStack = '';
	selectedCanvas = '';
	stacks = [stack1, stack2, stack3];
	stepCounter.innerText = "Steps: 0"

	for (let context of contexts) {
		context.clearRect(0,0,WIDTH,HEIGHT);
	}
	draw_blocks()
	gameStarted = true;
}