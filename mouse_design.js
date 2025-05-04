function drawMouse(ctx, x, y, playerWidth, playerHeight, player) {
    let size = Math.min(playerWidth, playerHeight) * 0.8; // Mouse size
    let ducking = player && player.isDucking;
    let isBlocking = player && player.blockFlashTimer > 0;

    if (ducking) {
        // Shrink the height while keeping feet on the ground
        size *= 0.6;
        y = y + (Math.min(playerWidth, playerHeight) * 0.8 - size); // Move up to keep feet aligned
    }

    const bodyHeight = size;
    const bodyWidth = size * 0.6;

    // Draw Ears
    ctx.fillStyle = "lightgray";
    ctx.beginPath();
    ctx.arc(x - size * 0.4, y - bodyHeight * 0.9, size * 0.25, 0, Math.PI * 2);
    ctx.arc(x + size * 0.4, y - bodyHeight * 0.9, size * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Draw Body
    ctx.fillStyle = isBlocking ? "#ff4c4c" : "gray";
    ctx.beginPath();
    ctx.ellipse(x, y, bodyWidth / 2, bodyHeight / 2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Belly
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(x, y, bodyWidth * 0.3, bodyHeight * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(x, y - bodyHeight * 0.7, size * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Cheeks
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(x - size * 0.2, y - bodyHeight * 0.7, size * 0.12, 0, Math.PI * 2);
    ctx.arc(x + size * 0.2, y - bodyHeight * 0.7, size * 0.12, 0, Math.PI * 2);
    ctx.fill();

    // Eyes
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(x - size * 0.12, y - bodyHeight * 0.75, size * 0.1, 0, Math.PI * 2);
    ctx.arc(x + size * 0.12, y - bodyHeight * 0.75, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x - size * 0.12, y - bodyHeight * 0.75, size * 0.04, 0, Math.PI * 2);
    ctx.arc(x + size * 0.12, y - bodyHeight * 0.75, size * 0.04, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.2, y - bodyHeight * 0.85);
    ctx.lineTo(x - size * 0.05, y - bodyHeight * 0.83);
    ctx.moveTo(x + size * 0.2, y - bodyHeight * 0.85);
    ctx.lineTo(x + size * 0.05, y - bodyHeight * 0.83);
    ctx.stroke();

    // Smile
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.arc(x, y - bodyHeight * 0.60, size * 0.15, 0, Math.PI);
    ctx.stroke();

    // Arms
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - bodyWidth / 2, y - 10);
    ctx.lineTo(x - bodyWidth, y + 10);
    ctx.moveTo(x + bodyWidth / 2, y - 10);
    ctx.lineTo(x + bodyWidth, y + 10);
    ctx.stroke();

    // Legs
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x - bodyWidth * 0.2, y + bodyHeight / 2);
    ctx.lineTo(x - bodyWidth * 0.2, y + bodyHeight * 0.8);
    ctx.moveTo(x + bodyWidth * 0.2, y + bodyHeight / 2);
    ctx.lineTo(x + bodyWidth * 0.2, y + bodyHeight * 0.8);
    ctx.stroke();

    // Tail
    ctx.beginPath();
    ctx.strokeStyle = "gray";
    ctx.lineWidth = 2;
    ctx.moveTo(x + bodyWidth / 2, y + bodyHeight / 2);
    ctx.quadraticCurveTo(x, y + size / 2, x + size * 1.2, y + size / 4);
    ctx.stroke();
}
