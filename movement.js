let player;
let gamepad;
let enemy;

let jumpButtonPressed = false;
let crouchButtonPressed = false;
let isCrouching = false;

let parryButtonPressed = false;
let parryActive = false;
let parryTimeout;

let mainAttacking = false;
let mainAttackHitBox;
let mainAttackDamage = 10;

let specialAttacking = false;
let specialAttackHitBox;
let specialAttackDamage = 30;
let canSpecialAttack = true;
let specialAttackCooldown = 30000;

let isBlocking = false;
let blockReduction = 0.5;

let secondaryAttacking = false;
let secondaryAttackHitBox;
let secondaryAttackDamage = 5;

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#222',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 500 }, debug: true }
    },
    scene: {
        preload,
        create,
        update
    }
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
    // Generate block textures for player and enemy
    this.textures.generate('player', {
        data: ['.11.', '1111', '.11.'],
        pixelWidth: 20
    });

    this.textures.generate('enemy', {
        data: ['2222', '2..2', '2222'],
        pixelWidth: 20
    });

    // Set up player and enemy sprites
    player = this.physics.add.sprite(100, 450, 'player');
    player.setCollideWorldBounds(true);
    player.setBounce(0.2);
    player.health = 100;

    enemy = this.physics.add.sprite(400, 450, 'enemy');
    enemy.setCollideWorldBounds(true);
    enemy.health = 50;

    // Create hitboxes for attacks
    mainAttackHitBox = this.add.rectangle(0, 0, 40, 40, 0xff0000).setVisible(false);
    this.physics.add.existing(mainAttackHitBox);
    this.physics.add.overlap(mainAttackHitBox, enemy, () => hitEnemy(enemy, mainAttackDamage), null, this);

    specialAttackHitBox = this.add.rectangle(0, 0, 60, 60, 0x00ffff).setVisible(false);
    this.physics.add.existing(specialAttackHitBox);
    this.physics.add.overlap(specialAttackHitBox, enemy, () => hitEnemy(enemy, specialAttackDamage), null, this);

    secondaryAttackHitBox = this.add.rectangle(0, 0, 30, 30, 0xffff00).setVisible(false);
    this.physics.add.existing(secondaryAttackHitBox);
    this.physics.add.overlap(secondaryAttackHitBox, enemy, () => hitEnemy(enemy, secondaryAttackDamage), null, this);
}

function update() {
    // Ensure the gamepad system is ready and a gamepad is connected
   
    const pads = navigator.getGamepads();
    if (pads[0]) {
        gamepad = pads[0]; // Get the first gamepad

        // Check if buttons are pressed
        if (gamepad.buttons[0].pressed && !jumpButtonPressed) { // A button (jump)
            jumpButtonPressed = true;
            if (player.body.touching.down) {  // Check if the player is on the ground
                player.setVelocityY(-330);  // Apply an upward velocity (jump)
                console.log("Jump!");
            }
        } else if (!gamepad.buttons[0].pressed) { // Reset jump when button is released
            jumpButtonPressed = false;
        }

        // Handle movement based on the left stick (X-axis)
        if (gamepad.axes[0] < -0.2) {
            player.setVelocityX(-160);
        } else if (gamepad.axes[0] > 0.2) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
        }

        // Handle crouch (B button)
        if (gamepad.buttons[1].pressed && !crouchButtonPressed) {
            crouchButtonPressed = true;
            crouch();
        } else if (!gamepad.buttons[1].pressed && crouchButtonPressed) {
            crouchButtonPressed = false;
            uncrouch();
        }

        // Handle parry (LB button)
        if (gamepad.buttons[4].pressed && !parryButtonPressed) {
            parryButtonPressed = true;
            activateParry();
        } else if (!gamepad.buttons[4].pressed) {
            parryButtonPressed = false;
        }

        // Handle main attack (RT button)
        if (gamepad.buttons[7].pressed) {
            mainAttack();
        }

        // Handle secondary attack (LT button)
        if (gamepad.buttons[6].pressed) {
            secondaryAttack();
        }

        // Handle special attack (RB button)
        if (gamepad.buttons[5].pressed && canSpecialAttack) {
            performSpecialAttack();
        }

        // Handle blocking (X button)
        if (gamepad.buttons[2].pressed) {
            startBlocking();
        } else {
            stopBlocking();
        }
    } else {
        console.log("No gamepad detected");
    }
}


function crouch() {
    if (!isCrouching) {
        console.log("Crouching");
        player.setScale(1, 0.5);
        player.setGravityY(200);
        player.body.setSize(player.width, player.height * 0.5);
        isCrouching = true;
    }
}

function uncrouch() {
    if (isCrouching) {
        console.log("Uncrouch");
        player.setScale(1, 1);
        player.setGravityY(500);
        player.body.setSize(player.width, player.height);
        isCrouching = false;
    }
}

function activateParry() {
    if (!parryActive) {
        console.log("Parry Activated");
        parryActive = true;
        parryTimeout = setTimeout(() => {
            console.log("Parry window closed");
            parryActive = false;
        }, 200);
    }
}

function mainAttack() {
    if (!mainAttacking) {
        console.log("Main Attack!");
        mainAttacking = true;
        mainAttackHitBox.setPosition(player.x + 40, player.y);
        mainAttackHitBox.setVisible(true);
        setTimeout(() => {
            mainAttackHitBox.setVisible(false);
            mainAttacking = false;
        }, 200);
    }
}

function secondaryAttack() {
    if (!secondaryAttacking) {
        console.log("Secondary Attack");
        secondaryAttacking = true;
        secondaryAttackHitBox.setPosition(player.x + 20, player.y);
        secondaryAttackHitBox.setVisible(true);
        setTimeout(() => {
            secondaryAttackHitBox.setVisible(false);
            secondaryAttacking = false;
        }, 200);
    }
}

function performSpecialAttack() {
    console.log("Special Attack Activated!");
    specialAttackHitBox.setPosition(player.x + 40, player.y);
    specialAttackHitBox.setVisible(true);
    setTimeout(() => {
        specialAttackHitBox.setVisible(false);
    }, 200);
    canSpecialAttack = false;
    setTimeout(() => {
        canSpecialAttack = true;
        console.log("Special Attack Ready!");
    }, specialAttackCooldown);
}

function hitEnemy(enemy, damage) {
    console.log(`Enemy hit for ${damage} damage`);
    enemy.health -= damage;
    if (enemy.health <= 0) {
        console.log("Enemy defeated!");
        enemy.destroy();
    } else {
        console.log("Enemy HP:", enemy.health);
    }
}

function startBlocking() {
    if (!isBlocking) {
        console.log("Started blocking");
        isBlocking = true;
    }
}

function stopBlocking() {
    if (isBlocking) {
        console.log("Stopped blocking");
        isBlocking = false;
    }
}

  