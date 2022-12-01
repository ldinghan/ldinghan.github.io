const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const clickbtn = document.querySelector("#clickbtn");
const scoreBoard = document.querySelector("#scoreboard");
const timescore = document.querySelector("#timescore");
let popScore = 0;
let hasPopped = false;
let x = 0;
let y = 0;
let r = 0;
let startTime;
let endTime;
let prevTime = Infinity;

const startGame = () => {
    context.clearRect(0, 0, 500, 500);
    x = 0;
    y = 0;
    r = 0;
    popScore = 0;
    prevTime = Infinity;
    hasPopped = false;
    scoreBoard.innerHTML = "Score: 0";
    timescore.style.color = "black";
    timescore.innerHTML = "Average time: 0s";
    startTime = new Date();
    makeBubble();
    const gameLoop = setInterval(() => {
        if (popScore >= 4) {
            clearInterval(gameLoop);
        }
        main();
    }, 100)
}

const makeBubble = () => {
    r = Math.random() * 25+2;
    x = Math.random() * 500;
    y = Math.random() * 500;
    const newb = new Bubble(x, y, r);
    newb.spawnBubble();
}

clickbtn.addEventListener("click", startGame);


class Bubble {
    constructor(bubbleX, bubbleY, bubbleSize) {
        this.bubbleX = bubbleX;
        this.bubbleY = bubbleY;
        this.bubbleSize = bubbleSize;
        this.isPopped = false;
    }
    spawnBubble() {
        let bubbleColor = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        console.log(bubbleColor);
        while (bubbleColor === "ffffff") {
            bubbleColor = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);
        }
        context.fillStyle = `#${bubbleColor}`;
        context.beginPath();
        context.arc(this.bubbleX, this.bubbleY, this.bubbleSize, 0, 2*Math.PI);
        context.fill();
        context.stroke();
    }

}
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    return [x,y];
};

canvas.addEventListener('mousedown', function(e) {
    const coords = getCursorPosition(canvas, e);
    if (checkHit(coords[0], coords[1], x, y, r)) {
        popScore++;
        scoreBoard.innerHTML = `Score: ${popScore}`;
        endTime = new Date();
        const avgTime = (endTime - startTime) / 1000 / (popScore+1);
        if (prevTime > avgTime) {
            timescore.style.color = 'green';
        } else {
            timescore.style.color = 'red';
        }
        prevTime = avgTime;
        timescore.innerHTML = `Average time: ${avgTime.toFixed(4)}s`;
        context.clearRect(0, 0, 500, 500)
        hasPopped = true;
    }
});

function checkHit(checkX, checkY, bubbleX, bubbleY, radius) {
    const distance = Math.sqrt(Math.pow(checkX - bubbleX, 2) + Math.pow(checkY - bubbleY, 2));
    return distance <= radius;
}

function main() {
    if (hasPopped) {
        makeBubble();
        hasPopped = false;
    }
}

