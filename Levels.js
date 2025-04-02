const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 1600;
canvas.height = 400;;


// Player properties
const player = {
   x: 50, y: 300, width: 30, height: 50, color: "red",
   speed: 5, dx: 0, dy: 0, gravity: 0.5, jumpPower: -10,
   isJumping: false, hasMelee: false, hasSpecial: false, hasThrowable: false
};


// Levels and Boss Progression with more platforms and holes
const levels = [
   {
       name: "Street Level",
       platforms: [
           { x: 100, y: 350, width: 400, height: 20 },
           { x: 600, y: 300, width: 400, height: 20 },
           { x: 1100, y: 250, width: 300, height: 20 },
           { x: 1500, y: 350, width: 200, height: 20 }
       ],
       holes: [ { x: 500, width: 100 } ]
   },
   {
       name: "House Level",
       platforms: [
           { x: 100, y: 300, width: 400, height: 20 },
           { x: 600, y: 250, width: 400, height: 20 },
           { x: 1100, y: 200, width: 300, height: 20 },
           { x: 1500, y: 350, width: 200, height: 20 }
       ],
       holes: [ { x: 800, width: 120 } ],
       unlocks: "melee"
   },
   {
       name: "Garden Level",
       platforms: [
           { x: 100, y: 250, width: 400, height: 20 },
           { x: 600, y: 200, width: 400, height: 20 },
           { x: 1100, y: 150, width: 300, height: 20 },
           { x: 1500, y: 300, width: 200, height: 20 }
       ],
       holes: [ { x: 700, width: 100 } ],
       unlocks: "special"
   },
   {
       name: "Castle Level",
       platforms: [
           { x: 100, y: 200, width: 400, height: 20 },
           { x: 600, y: 150, width: 400, height: 20 },
           { x: 1100, y: 100, width: 300, height: 20 },
           { x: 1500, y: 250, width: 200, height: 20 }
       ],
       holes: [ { x: 900, width: 130 } ],
       unlocks: "throwable"
   }
];


let currentLevel = 0;
let platforms = levels[currentLevel].platforms;
let holes = levels[currentLevel].holes;


// Gamepad Support
let gamepadIndex = null;
window.addEventListener("gamepadconnected", (event) => {
   gamepadIndex = event.gamepad.index;
   console.log("Gamepad connected at index", gamepadIndex);
});


window.addEventListener("gamepaddisconnected", () => {
   gamepadIndex = null;
   console.log("Gamepad disconnected");
});


// Game Loop
function update() {
   const gamepad = navigator.getGamepads()[gamepadIndex];
   if (gamepad) {
       const leftStickX = gamepad.axes[0];
       if (Math.abs(leftStickX) > 0.1) {
           player.dx = leftStickX * player.speed;
       } else {
           player.dx = 0;
       }
       if (gamepad.buttons[0].pressed && !player.isJumping) { // A Button
           player.dy = player.jumpPower;
           player.isJumping = true;
       }
   }
  
   player.dy += player.gravity;


   // Collision with platforms
   platforms.forEach(platform => {
       if (player.y + player.height >= platform.y && player.y + player.height <= platform.y + 10 &&
           player.x + player.width >= platform.x && player.x <= platform.x + platform.width) {
           player.y = platform.y - player.height;
           player.dy = 0;
           player.isJumping = false;
       }
   });


   // Check if player falls into a hole
   for (let hole of holes) {
       if (player.x > hole.x && player.x < hole.x + hole.width && player.y + player.height >= canvas.height) {
           alert("You fell into a hole! Game Over.");
           resetGame();
       }
   }


   // Advance Level
   if (player.x + player.width > canvas.width) {
       nextLevel();
   }
   player.x += player.dx;
   player.y += player.dy;
}


function nextLevel() {
   if (currentLevel < levels.length - 1) {
       currentLevel++;
       platforms = levels[currentLevel].platforms;
       holes = levels[currentLevel].holes;
       player.x = 50;
       player.y = 300;
   } else {
       alert("You defeated Wizard Cat and stole the cheese!");
       resetGame();
   }
}


function resetGame() {
   currentLevel = 0;
   platforms = levels[currentLevel].platforms;
   holes = levels[currentLevel].holes;
   player.x = 50;
   player.y = 300;
}


function draw() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.fillStyle = player.color;
   ctx.fillRect(player.x, player.y, player.width, player.height);
   ctx.fillStyle = "brown";
   platforms.forEach(platform => {
       ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
   });
}


function gameLoop() {
   update();
   draw();
   requestAnimationFrame(gameLoop);
}


gameLoop();
