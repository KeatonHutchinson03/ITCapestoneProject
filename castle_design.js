function drawCastleBackground(ctx) {
    // Stone wall background
    ctx.fillStyle = "#d9d9d9"; // Light gray stone
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw brick pattern
    ctx.fillStyle = "#b0b0b0"; // Slightly darker gray
    for (let y = 0; y < canvas.height; y += 40) {
        for (let x = 0; x < canvas.width; x += 80) {
            ctx.fillRect(x + (y % 80 === 0 ? 0 : 40), y, 80, 40);
        }
    }

    // Towers
    ctx.fillStyle = "#888"; // Darker stone color
    ctx.fillRect(50, canvas.height - 180, 60, 180);
    ctx.fillRect(canvas.width - 110, canvas.height - 180, 60, 180);

    // Tower tops (battlements)
    function drawBattlements(x, y, count) {
        for (let i = 0; i < count; i++) {
            ctx.fillRect(x + i * 15, y, 10, 10);
        }
    }
    drawBattlements(50, canvas.height - 180, 4);
    drawBattlements(canvas.width - 110, canvas.height - 180, 4);

    // Flags
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(80, canvas.height - 180);
    ctx.lineTo(100, canvas.height - 170);
    ctx.lineTo(80, canvas.height - 160);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width - 80, canvas.height - 180);
    ctx.lineTo(canvas.width - 60, canvas.height - 170);
    ctx.lineTo(canvas.width - 80, canvas.height - 160);
    ctx.fill();

    // Torches
    ctx.fillStyle = "black";
    ctx.fillRect(150, canvas.height - 100, 10, 30);
    ctx.fillRect(canvas.width - 160, canvas.height - 100, 10, 30);

    // Torch flames
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(155, canvas.height - 105, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(canvas.width - 155, canvas.height - 105, 7, 0, Math.PI * 2);
    ctx.fill();
}