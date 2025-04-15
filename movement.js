let player;
let gamepad;
let enemy;

let jumpButtonPressed = false;
let crouchButtonPressed = false;
let isCrouching = false;

let parryButtonPressed = false;
let parryActive = false;
let parryTimeOut;

let mainAttackButtonPressed = false;
let mainAttacking = false;
let mainAttackHitBox;
let mainAttackDamage = 10; // random value to decide how much health we want the main attack to do

let specialAttackButtonPressed = false;
let specialAttacking = false;
let specialAttackHitBox = false;
let specialAttackDamage = 30; // random value we can change as well
let canSpcialAttack = true;
let specialAttackCoolDown = 30000 // 30 sec cooldown on special attack

let isBlocking = false;
let blockReduction = 0.5; // will still take damage while blocking but will only take reducded damage.

let secondaryAttackButtonPressed = false;
let secondaryAttacking = false;
let secondaryAttackHitBox;
let secodaryAttackDamage = 5;

function preload() {
// Load the player image or sprite
this.load.image('player', 'path/to/player/mouse.png');
this.load.image('enemy', 'path/to/enemy/cat.png');
}

function create() {
// Set up the player sprite with physics
player = this.physics.add.sprite(100, 450, 'player'); // where the player is at believe we can get rid of the 100 and 450
player.setBounce(0.2);
player.setCollideWorldBounds(true);
player.setGravityY(300); // Gravity that pulls the player down
player.health = 100;

enemy = this.physics.add.sprite('enemy');// creates the enemy // supposed to be enemy = this.physics.add.sprite(400, 450, 'enemy'); loads the enemy at this point but idk
enemy.health = 30; // could be the cat or something but need to grab the enery we want with their id

this.physics.add.sprite(mainAttackHitBox,enemy,hitEnemy, null ,this); // allows the enemy to get hit by main attack

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
if (player.body.touching.down) { // Check if the player is on the ground
player.setVelocityY(-330); // Apply an upward velocity (jump)
}
}
// If the A button is released, allow for subsequent jumps
if (!gamepad.buttons[0].pressed) { // A jump button
jumpButtonPressed = false;
}


if (gamepad.axes[0] < -0.1) { //
player.setVelocityX(-160); // Move left
} else if (gamepad.axes[0] > 0.1) {
player.setVelocityX(160); // Move right
} else {
player.setVelocityX(0); // No movement on the x-axis
}

if(!gamepad.buttons[1].pressed){ //1 = B button on xbox controller
crouchButtonPressed = true;
crouch();
}
if (!gamepad.buttons[1].pressed) {
crouchButtonPressed = false;
if (isCrouching) {
uncrouch();
}
}

if(!gamepad.buttons[4].pressed && !parryButtonPressed){ //4 = LB
parryButtonPressed = true;
activateParry();
}
if(!gamepad.buttons[4].pressed){
parryButtonPressed = false;
}

if(!gamepad.buttons[7].pressed){ //7 = RT
mainAttackButtonPressed = true;
mainAttack();
}
if(!gamepad.buttons[7].pressed){ // RT
mainAttackButtonPressed = false;
}
if(!gamepad.buttons[6].pressed){ //LT
secondaryAttackButtonPressed = true;
secondaryAttack();
}
if(!gamepad.buttons[6].pressed){ //LT
secondaryAttackButtonPressed = false;
}
if(!gamepad.buttons[5].pressed && canSpcialAttack){ //RB
specialAttackButtonPressed = true;
performSpecialAttack();
}
if(!gamepad.buttons[5].pressed){ //RB
specialAttackButtonPressed = false;

}
if(!gamepad.buttons[2].pressed){ //X
startBlocking();
} else{
stopBlocking();
}
}

function crouch(){
if(!isCrouching){
player.setScale(1,0.5);
console.log("Crouching")
player.setGravityY(150); // optional if we want to make it so they have crouch jump they have less gravity
isCrouching = true;

player.body.setSize(player.width, player.height *0.5); // changes collusiuin size
}
}

function uncrouch(){
if(!isCrouching){
player.setScale(1,1);
player.setGravityY(300);
console.log("Uncrouch") // test to see if we reading input
isCrouching = false;
player.body.setSize(player.width, player.height); //sets back to normal
}
}

function activateParry(){
if(!parryActive){
console.log("Parry Attempted") //just an output to see if the parry button is even working
parryActive = true;

parryTimeOut = setInterval(() => {
console.log("Parry window closed") // agaian just to see if the parrying window is opening and closing
parryActive = false;
}, 200 ); // 200 ms parry window time we can change this to make it harder or easier based on how we feel
}
}

function mainAttack(){ // main attack feature i believe can be changed if we have different weapons in our hands but we can try that later or if we just want the main attack to be the same and change our special attack
if(!mainAttacking){
console.log("Main Attack") //testing to see if we getting the input

mainAttacking = true;
mainAttackHitBox.setPosition(player.x + 40 , player.y + 10); // hitbox of the attack can change this if we dont like the height or wideth of hitbox
mainAttackHitBox.setVisible(true); // shows the hitbox

setTimeout(() => {
mainAttackHitBox.setVisible(false);
mainAttacking = false;
}, 200);
}
}

function secondaryAttack(){ // if this doesnt work main attack doesnt work legit same thing just different values
if(!secondaryAttacking){
console.log("Secondary Attack")

secondaryAttacking = true;
secondaryAttackHitBox.setPosition(player.x + 20, player.x +5);
secondaryAttackHitBox.setVisible(true);

setTimeout(() => {
secondaryAttackHitBox.setVisible(false);
secondaryAttacking = false;
})
}
}

function hitEnemy(mainAttackHitBox,specialAttackHitBox,secondaryAttackHitBox,enemy){ // that shows we are hitting the enemy we can get rid of the console logs once we know each function works believe we have to pass through everytime we make a new attack
console.log("Enemy was hit -" + mainAttackDamage + "HP");

enemy.health -= mainAttackDamage;

if(enemy.health <0 ){
console.log("Enemy was slain!")
enemy.destroy();
} else{
console.log("Enemy Health " + enemy.health);
}
}

function performSpecialAttack() {
console.log(" Special Attack Activated! ");

enemy.health -= specialAttackDamage;
specialAttackHitBox.setPosition(player.x + 40, player.y +10); //size of speicla attack we cna change
specialAttackHitBox.setVisible(true); //shows if the speicla attack is being seenhitbox

console.log(`Enemy hit! Took ${specialDamage} damage. Health left: ${enemy.health}`);

if (enemy.health <= 0) {
console.log("Enemy Defeated!");
enemy.destroy();
}

// Start Cooldown
canSpecialAttack = false;
setTimeout(() => {
canSpecialAttack = true;
console.log(" Special Attack Ready!");
}, specialAttackCoolDown);
}

function startBlocking(){
if(!isBlocking){
console.log("Attacked Blocked")
isBlocking = true;
}
}

function stopBlocking(){
if(isBlocking){
console.log("Stopped blocking")
isBlocking = false;
}
}
  