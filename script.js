const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#score"); // Updated the selector here
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;

let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
createFood();

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    } else {
        displayGameOver();
    }
}

function clearBoard() {
    ctx.clearRect(0, 0, gameWidth, gameHeight); // Clear the canvas
}

function createFood() {
    function randomFood(min, max) {
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameHeight - unitSize); // Fix: Use gameHeight instead of gameWidth
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
    const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
    snake.unshift(head);

    // Check if the snake has eaten the food
    if (head.x === foodX && head.y === foodY) {
        score += 10;
        scoreText.textContent = score;
        createFood();
    } else {
        // If the snake hasn't eaten the food, remove the tail
        snake.pop();
    }

    // Check if the snake collides with the walls
    if (head.x < 0 || head.x >= gameWidth || head.y < 0 || head.y >= gameHeight) {
        running = false;
    }

    // Check if the snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            running = false;
            break;
        }
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart => {
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection(event) {
    const keyPressed = event.key;
    switch (keyPressed) {
        case "ArrowUp":
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case "ArrowDown":
            xVelocity = 0;
            yVelocity = unitSize;
            break;
        case "ArrowLeft":
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case "ArrowRight":
            xVelocity = unitSize;
            yVelocity = 0;
            break;
    }
}

function checkGameOver() {
    // Add additional game over conditions if needed
    if (!running) {
        displayGameOver();
    }
}

function displayGameOver() {
    alert("Game Over! Your score is: " + score);
}

function resetGame() {
    running = false;
    score = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    xVelocity = unitSize;
    yVelocity = 0;
    scoreText.textContent = score;
    gameStart();
}
