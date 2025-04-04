function drawMousetrap(ctx, x, y) {
    // Base of the mousetrap
    ctx.fillStyle = "#8B4513"; // Wood color
    ctx.fillRect(x, y, 60, 30);

    // Spring
    ctx.strokeStyle = "#555"; // Metal color
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x + 20, y + 15, 8, Math.PI, 2 * Math.PI); // Left coil
    ctx.arc(x + 40, y + 15, 8, Math.PI, 2 * Math.PI); // Right coil
    ctx.stroke();

    // Trap Arm
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(x + 30, y + 15);
    ctx.lineTo(x + 30, y - 10);
    ctx.stroke();

    // Bait Holder
    ctx.fillStyle = "#DAA520"; // Golden color for bait
    ctx.fillRect(x + 25, y + 5, 10, 10);
}