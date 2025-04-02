let player;
let gamepad;
let jumpButtonPressed = false;
let crouchButtonPressed = false;
let isCrouching = false;

let parryButtonPressed = false;

function preload() {
    // Load the player image or sprite
    this.load.image('player', 'path/to/player/image.png');
}

function create() {
    // Set up the player sprite with physics
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.setGravityY(300);  // Gravity that pulls the player down

    // You can set up gamepad controls here
    this.input.gamepad.once('connected', function (pad) {
        console.log('Gamepad connected: ', pad);
    });
}

function update() {
    // Check for gamepad input every frame

    // Get the first connected gamepad (0 index)
    gamepad = this.input.gamepad.gamepads[0];

    // If the gamepad is connected and has the A button pressed, make the player jump
    if (gamepad && gamepad.buttons[0].pressed && !jumpButtonPressed) { // 0 is typically the A button on Xbox controllers
        jumpButtonPressed = true;
        if (player.body.touching.down) {  // Check if the player is on the ground
            player.setVelocityY(-330);  // Apply an upward velocity (jump)
        }
    }

    // If the A button is released, allow for subsequent jumps
    if (!gamepad.buttons[0].pressed) {
        jumpButtonPressed = false;
    }

    // Optional: Handle other gamepad buttons (like moving the player)
    // Example: Move left and right with the gamepad's left joystick
    if (gamepad.axes[0].getValue() < -0.1) { // A is the jump button 
        player.setVelocityX(-160);  // Move left
    } else if (gamepad.axes[0].getValue() > 0.1) {
        player.setVelocityX(160);   // Move right
    } else {
        player.setVelocityX(0);     // No movement on the x-axis
    }

    if(!gamepad.buttons[1].pressed){ //1 = b button on xbox controller 
        crouchButtonPressed = true;
        crouch();
    }
    if (!gamepad.buttons[1].pressed) {
        crouchButtonPressed = false;
       
        if (isCrouching) {
            uncrouch();
        }
    }
}

function crouch(){
    if(!isCrouching){
        player.setScale(1,0.5);
        
        player.setGravityY(150); // optional if we want to make it so they have crouch jump they have less gravity
        isCrouching = true;

        player.body.setSize(player.width, player.height *0.5); // changes collusiuin size
    }
}

function uncrouch(){
    if(!isCrouching){
        player.setScale(1,1);
        player.setGravityY(300);
        isCrouching = false;
        player.body.setSize(player.width, player.height); //sets back to normal 
    }
}
  