function drawCastleBackground(ctx){
    const floorHeight = 80;
    const floorY = canvas.height - floorHeight;

    // Stone wall background
    ctx.fillStyle = "#d9d9d9"; // Light gray stone
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    
    // Horizontal top blocks to represent the top of the castle wall
    ctx.fillStyle = "#cfcfcf";
    for (let x = 0; x < canvas.width; x += 80) {
        ctx.fillRect(x, 0, 40, 40);
    }

// Decorative battlements under the top blocks
    ctx.fillStyle = "#a0a0a0";
    for (let x = 0; x < canvas.width; x += 40) {
        ctx.fillRect(x + 10, 40, 20, 10);
    }
    // Draw the stone floor
    ctx.fillStyle = "#777"; // Darker stone floor
    ctx.fillRect(0, floorY, canvas.width, floorHeight);

    // Towers
    ctx.fillStyle = "#888"; // Darker stone color
    const towerHeight = 180;
    ctx.fillRect(50, floorY - towerHeight, 60, towerHeight);
    ctx.fillRect(canvas.width - 110, floorY - towerHeight, 60, towerHeight);

    // Tower tops (battlements)
    function drawBattlements(x, y, count) {
        for (let i = 0; i < count; i++) {
            ctx.fillRect(x + i * 15, y, 10, 10);
        }
    }
    drawBattlements(50, floorY - towerHeight, 4);
    drawBattlements(canvas.width - 110, floorY - towerHeight, 4);

    // Torches
    ctx.fillStyle = "black";
    const torchHeight = 30;
    ctx.fillRect(150, floorY - torchHeight, 10, torchHeight);
    ctx.fillRect(canvas.width - 160, floorY - torchHeight, 10, torchHeight);

    // Torch flames
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(155, floorY - torchHeight - 5, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width - 155, floorY - torchHeight - 5, 7, 0, Math.PI * 2);
    ctx.fill();
}