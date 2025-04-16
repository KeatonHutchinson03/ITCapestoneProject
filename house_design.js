function drawLivingRoom() {
    ctx.fillStyle = "#f5e1da"; // soft wall color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floor
    ctx.fillStyle = "#d2b48c";
    ctx.fillRect(0, 300, canvas.width, 100);

    // Couch
    ctx.fillStyle = "#8b0000";
    ctx.fillRect(100, 250, 150, 40); // seat
    ctx.fillRect(100, 210, 30, 40);  // left arm
    ctx.fillRect(220, 210, 30, 40);  // right arm

    // TV
    ctx.fillStyle = "black";
    ctx.fillRect(500, 220, 100, 60);

    // Picture Frame
    ctx.strokeStyle = "gold";
    ctx.strokeRect(350, 100, 60, 40);
}