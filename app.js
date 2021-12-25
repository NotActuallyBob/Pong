let canvas;
let ctx;

let upPressedRight = false;
let downPressedRight = false;
let upPressedLeft = false;
let downPressedLeft = false;

const LeftPaddle = {
    xPos: 50,
    yPos: 400,
    xSize: 50,
    ySize: 200,
    speed: 5
};

const RightPaddle = {
    xPos: 50,
    yPos: 400,
    xSize: 50,
    ySize: 200,
    speed: 5
};

const Ball = {
    xPos: 100,
    yPos: 400,
    size: 40,
    xSpeed: 1,
    ySpeed: 1
}

function getRandomSign() {
    const rValue = Math.random();
    if(rValue > 0.5) {
        return 1;
    }
    return -1;
}

window.onload = function () {
    initVariables();
    setInterval(updateGame, 1);
}

function initVariables() {
    const paddleDistanceFromWall = 50;
    const ballSpeed = 1;

    canvas = document.getElementById('main-canvas');
    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    LeftPaddle.xPos = paddleDistanceFromWall;
    RightPaddle.xPos = canvas.width - paddleDistanceFromWall;

    LeftPaddle.yPos = canvas.height/2;
    RightPaddle.yPos = canvas.height/2;

    Ball.xPos = canvas.width/2;
    Ball.yPos = canvas.height/2;
    Ball.xSpeed = getRandomSign() * ballSpeed;
    Ball.ySpeed = getRandomSign() * ballSpeed;

    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
}

function keyDownHandler(event) {
    if(event.keyCode === 40) {
        downPressedRight = true;
    } else if(event.keyCode === 38) {
        upPressedRight = true;
    }

    if(event.keyCode === 83){
        downPressedLeft = true;
    } else if(event.keyCode === 87) {
        upPressedLeft = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode === 40) {
        downPressedRight = false;
    } else if(event.keyCode === 38) {
        upPressedRight = false;
    }

    if(event.keyCode === 83){
        downPressedLeft = false;
    } else if(event.keyCode === 87) {
        upPressedLeft = false;
    }
}


function updateGame() {
    movePaddles();
    moveBall();

    checkWarp();
    checkCollisions();
    checkLost();

    clearCanvas();
    drawBall();
    drawPaddles();
}

function movePaddles() {
    if(upPressedRight) {
        RightPaddle.yPos -= RightPaddle.speed;
    } else if(downPressedRight) {
        RightPaddle.yPos += RightPaddle.speed;
    }

    if(upPressedLeft) {
        LeftPaddle.yPos -= LeftPaddle.speed;
    } else if(downPressedLeft) {
        LeftPaddle.yPos += LeftPaddle.speed;
    }
}

function moveBall() {
    Ball.xPos += Ball.xSpeed;
    Ball.yPos += Ball.ySpeed;
}

function checkCollisions() {
    if(Ball.yPos + Ball.size/2 >= canvas.height) {
        Ball.ySpeed *= -1;
    } else if (Ball.yPos - Ball.size/2 <= 0) {
        Ball.ySpeed *= -1;
    }

    if(Ball.xPos - Ball.size/2 === LeftPaddle.xPos + LeftPaddle.xSize/2){
        if(Ball.yPos + Ball.size/2 >= LeftPaddle.yPos - LeftPaddle.ySize/2 && Ball.yPos - Ball.size <= LeftPaddle.yPos + LeftPaddle.ySize/2) {
            Ball.xSpeed *= -1;
        }
    }

    if(Ball.xPos + Ball.size/2 === RightPaddle.xPos - RightPaddle.xSize/2){
        if(Ball.yPos + Ball.size/2 >= RightPaddle.yPos - RightPaddle.ySize/2 && Ball.yPos - Ball.size <= RightPaddle.yPos + RightPaddle.ySize/2) {
            Ball.xSpeed *= -1;
        }
    }

    if(Ball.xPos + Ball.size/2 > canvas.width) {
        Ball.xSpeed *= -1;
    }
}

function checkWarp() {
    if(LeftPaddle.yPos < 0) {
        LeftPaddle.yPos = canvas.height;
    } else if(LeftPaddle.yPos > canvas.height) {
        LeftPaddle.yPos = 0;
    }

    if(RightPaddle.yPos < 0) {
        RightPaddle.yPos = canvas.height;
    } else if(RightPaddle.yPos > canvas.height) {
        RightPaddle.yPos = 0;
    }
}

function checkLost() {
    if(Ball.xPos - Ball.size/2 <= 0) {
        restartGame();
    }
    if(Ball.xPos + Ball.size/2 >= canvas.width) {
        restartGame();
    }
}

function restartGame() {
    Ball.xPos = canvas.width/2;
    Ball.yPos = canvas.height/2;

    Ball.xSpeed = getRandomSign() * Ball.xSpeed;
    Ball.ySpeed = getRandomSign() * Ball.ySpeed;
}

function drawBall() {
    ctx.fillRect(Ball.xPos - Ball.size/2, Ball.yPos - Ball.size/2, Ball.size, Ball.size);
}

function drawPaddles(){
    ctx.fillRect(LeftPaddle.xPos - LeftPaddle.xSize/2, LeftPaddle.yPos - LeftPaddle.ySize/2, LeftPaddle.xSize, LeftPaddle.ySize);
    ctx.fillRect(RightPaddle.xPos - RightPaddle.xSize/2, RightPaddle.yPos - RightPaddle.ySize/2, RightPaddle.xSize, RightPaddle.ySize);
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}