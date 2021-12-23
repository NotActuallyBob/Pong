let canvas;
let ctx;

const PaddleLeft = {
    xPos: 50,
    yPos: 400,
    xSize: 50,
    ySize: 200
};

window.onload = function () {
    canvas = document.getElementById('main-canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
    drawPaddle(PaddleLeft);
}

function drawPaddle(paddle){
    ctx.fillRect(paddle.xPos - paddle.xSize/2, paddle.yPos - paddle.ySize/2, paddle.xSize, paddle.ySize);
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}