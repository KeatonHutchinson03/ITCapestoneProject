const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

let selectedSaveSlot = 1;
let gameRunning = false;
let worldOffset = 0;
let distanceTraveled = 0;
let gameSpeed = 0.3;
let cheeseCollected = 0;
let obstacles = [];
let cheeseBlocks = [];
let platforms = [];
let gamepadIndex = null;
let currentLevel = "street"; 

const mouseSprite = new Image();
mouseSprite.src = "mouse.png";
const mousetrapSprite = new Image();
mousetrapSprite.src = "mousetrap.png";
const catSprite = new Image();
catSprite.src = "cat.png";

const player = {
    x: 100,
    y: 300,
    width: 30,
    height: 30,
    velocityY: 0,
    gravity: 0.2,
    isJumping: false,
    isDucking: false,
    isBlocking: false,
    blockFlashTimer: 0,
};
/*
// Add this function to draw the mouse with proper ducking behavior
function drawMouse(ctx, x, y, width, height) {
    if (player.isDucking) {
        // When ducking, reduce height by half but keep the feet on the ground
        const duckHeight = height / 2;
        const duckY = y + height - duckHeight; // Adjust Y to keep feet position
        
        if (mouseSprite.complete) {
            ctx.drawImage(mouseSprite, x, duckY, width, duckHeight);
        } else {
            ctx.fillStyle = "gray";
            ctx.fillRect(x, duckY, width, duckHeight);
        }
    } else {
        // Normal drawing
        if (mouseSprite.complete) {
            ctx.drawImage(mouseSprite, x, y, width, height);
        } else {
            ctx.fillStyle = "gray";
            ctx.fillRect(x, y, width, height);
        }
    }
}
*/
function generateObstaclesAndCheese() {
    obstacles = [];
    cheeseBlocks = [];
    platforms = [];

    for (let i = 300; i < 4000; i += Math.random() * 400 + 200) {
        let type = Math.random() > 0.5 ? "mousetrap" : "cat";
        let y = type === "mousetrap" ? 325 : 250;
        obstacles.push({ type, x: i, y, width: 50, height: type === "mousetrap" ? 20 : 50 });
    }

    for (let i = 400; i < 4000; i += Math.random() * 300 + 100) {
        let y = Math.random() > 0.5 ? 250 : 200;
        if (!obstacles.some(ob => Math.abs(ob.x - i) < 100)) {
            cheeseBlocks.push({ x: i, y, width: 30, height: 30 });
        }
    }

    for (let i = 400; i < 4000; i += Math.random() * 200 + 150) {
        let platformHeight = Math.random() * 100 + 150;
        platforms.push({ x: i, y: platformHeight, width: 100, height: 20 });

        if (Math.random() < 0.2) {
            obstacles.push({ type: "cat", x: i, y: platformHeight - 50, width: 50, height: 50 });
        }
    }
}

function updateLevel() {
    let levelText = "";
    if (distanceTraveled >= 1000) {
        gameRunning = false;
        showGameEndScreen();
    } else if (distanceTraveled >= 0 && distanceTraveled < 250) {
        currentLevel = "Street";
        
    } else if (distanceTraveled >= 250 && distanceTraveled < 500) {
        currentLevel = "House";
        
    } else if (distanceTraveled >= 500 && distanceTraveled < 750) {
        currentLevel = "Garden";

    } else if (distanceTraveled >= 750 && distanceTraveled < 1000) {
        currentLevel = "Castle";

    }
    return currentLevel
}

function drawBackground(ctx, currentLevel) {
    switch (currentLevel) {
        case "Street":
            drawStreetBackground(ctx);
            break;
        case "House":
            drawLivingRoom(ctx);
            break;
        case "Garden":
            drawGardenBackground(ctx);
            break;
        case "Castle":
            drawCastleBackground(ctx);
            break;
    }
}

function draw(currentLevel) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx, currentLevel);
    drawMouse(ctx, player.x, player.y, player.width, player.height, player);

    obstacles.forEach(obstacle => {
        if (obstacle.type === "mousetrap") {
            drawMousetrap(ctx, obstacle.x - worldOffset, obstacle.y);
        } else if (obstacle.type === "cat") {
            drawAngryCat(ctx, obstacle.x - worldOffset, obstacle.y);
        }
    });

    cheeseBlocks.forEach(cheese => {
        drawCheese(ctx, cheese.x - worldOffset, cheese.y);
    });

    platforms.forEach(platform => {
        ctx.fillStyle = "brown";
        ctx.fillRect(platform.x - worldOffset, platform.y, platform.width, platform.height);
    });

    if (distanceTraveled >= 1000) {
        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.arc(1100 - worldOffset, 280, 30, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Distance: ${Math.round(distanceTraveled)} meters`, 10, 30);
    ctx.fillText(`Cheese: ${cheeseCollected}`, 10, 60);

    if (player.isBlocking) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Blocking", canvas.width - 100, 30);
    }
    
    // Add visual feedback for ducking
    if (player.isDucking) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText("Ducking", canvas.width - 100, 60);
    }
}

function saveProgress() {
    const checkpointDistance = Math.floor(distanceTraveled / 250) * 250;
    localStorage.setItem(`platformerSave${selectedSaveSlot}`, JSON.stringify({ 
        distance: checkpointDistance, 
        cheese: cheeseCollected 
    }));
}

function resetSave(slot) {
    localStorage.removeItem(`platformerSave${slot}`);
    document.getElementById(`progress${slot}`).innerText = "Checkpoint: 0";
}

function loadProgress() {
    for (let i = 1; i <= 3; i++) {
        let saveData = localStorage.getItem(`platformerSave${i}`);
        let progress = saveData ? JSON.parse(saveData).distance : 0;
        let checkpoint = Math.floor(progress / 250);
        document.getElementById(`progress${i}`).innerText = `Checkpoint: ${checkpoint}`;
    }
}

function showGameEndScreen() {
    document.getElementById("endScreen").style.display = "block";
}

function selectSaveSlot(slot) {
    selectedSaveSlot = slot;
    let saveData = localStorage.getItem(`platformerSave${selectedSaveSlot}`);
    if (saveData) {
        let data = JSON.parse(saveData);
        distanceTraveled = data.distance;
        cheeseCollected = data.cheese;
        distanceTraveled = Math.floor(data.distance / 250) * 250;
        cheeseCollected = data.cheese || 0;
        worldOffset = distanceTraveled * 2;
    } else {
        distanceTraveled = 0;
        cheeseCollected = 0;
        worldOffset = 0;
    }
    document.getElementById("saveSelection").style.display = "none";
    startCountdown();
}

function startCountdown() {
    let count = 5;
    document.getElementById("countdown").style.display = "block";
    function tick() {
        document.getElementById("countdown").innerText = count;
        if (count === 0) {
            document.getElementById("countdown").style.display = "none";
            canvas.style.display = "block";
            gameRunning = true;
            generateObstaclesAndCheese();
            gameLoop();
        } else {
            count--;
            setTimeout(tick, 1000);
        }
    }
    tick();
}

window.addEventListener("gamepadconnected", (event) => {
    gamepadIndex = event.gamepad.index;
});

function checkGamepad() {
    if (gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[gamepadIndex];
        if (gamepad) {
            const moveX = gamepad.axes[0];
            const moveY = gamepad.axes[1];

            player.x += moveX * 1;
            player.y += moveY * 2;

            if (gamepad.buttons[0].pressed && !player.isJumping) { 
                player.velocityY = -10;
                player.isJumping = true;
            }
            if (gamepad.buttons[1].pressed) { 
                player.isDucking = true;
                console.log("ducking");
            } else {
                player.isDucking = false;
            }

            if (gamepad.buttons[2].pressed) {
                if (!player.isBlocking) {
                    player.blockFlashTimer = 10;
                }
                player.isBlocking = true;
            } else {
                player.isBlocking = false;
                player.blockFlashTimer = 0;
            }
        }
    }
}

function update() {
    if (!gameRunning) return;
    checkGamepad();
    
    if (player.blockFlashTimer > 0) {
        player.blockFlashTimer--;
    }
    player.y += player.velocityY;
    player.velocityY += player.gravity;

    // If ducking, adjust player's hitbox height for collision detection
    const playerHeight = player.isDucking ? player.height / 2 : player.height;
    const playerY = player.isDucking ? player.y + player.height / 2 : player.y;

    platforms.forEach(platform => {
        if (player.x + player.width > platform.x - worldOffset && player.x < platform.x - worldOffset + platform.width) {
            if (player.y + playerHeight <= platform.y && player.y + playerHeight + player.velocityY >= platform.y) {
                player.y = platform.y - playerHeight;
                player.velocityY = 0;
                player.isJumping = false;
            }
        }
    });

    if (player.y > 300) {
        player.y = 300;
        player.isJumping = false;
    }

    worldOffset += gameSpeed;
    distanceTraveled = worldOffset * 0.5;

    obstacles.forEach(obstacle => {
        // Use adjusted height and y position for collision when ducking
        if (checkCollision(
            { 
                x: player.x, 
                y: playerY, 
                width: player.width, 
                height: playerHeight 
            }, 
            { ...obstacle, x: obstacle.x - worldOffset })) {
            if (!player.isBlocking) {
                gameRunning = false;
                showGameOverScreen();
            }
        }
    });

    cheeseBlocks.forEach((cheese, index) => {
        // Use adjusted height and y position for collision when ducking
        if (checkCollision(
            { 
                x: player.x, 
                y: playerY, 
                width: player.width, 
                height: playerHeight 
            }, 
            { ...cheese, x: cheese.x - worldOffset })) {
            cheeseBlocks.splice(index, 1);
            cheeseCollected++;
            saveProgress();
        }
    });

    currentLevel = updateLevel();
    draw(currentLevel);
    saveProgress();
}

function checkCollision(player, object) {
    return player.x < object.x + object.width &&
        player.x + player.width > object.x &&
        player.y < object.y + object.height &&
        player.y + player.height > object.y;
}

function showGameOverScreen() {
    document.getElementById("gameOver").style.display = "block";

    const stats = `
        Cheese Collected: ${cheeseCollected}<br>
        Last Checkpoint: ${currentLevel}<br>
        Distance Traveled: ${Math.round(distanceTraveled)} meters
    `;
    document.getElementById("statsDisplay").innerHTML = stats;

    canvas.style.display = "none";
}

function restartGame() {
    document.getElementById("gameOver").style.display = "none";
    gameRunning = false;
    worldOffset = 0;
    distanceTraveled = 0;
    cheeseCollected = 0;
    player.x = 100;
    player.y = 300;
    startCountdown();
}

document.getElementById("restartButton").addEventListener("click", restartGame);
document.getElementById("exitButton").addEventListener("click", () => {
    window.location.reload();
});

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

loadProgress()

