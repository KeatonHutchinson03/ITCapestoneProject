function drawGardenBackground(ctx) {
    // Sky
    ctx.fillStyle = "skyblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grass
    ctx.fillStyle = "green";
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Sun
    ctx.beginPath();
    ctx.arc(700, 80, 50, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fill();

    // Bushes
    ctx.fillStyle = "darkgreen";
    ctx.beginPath();
    ctx.arc(150, canvas.height - 100, 30, 0, Math.PI * 2);
    ctx.arc(180, canvas.height - 100, 30, 0, Math.PI * 2);
    ctx.arc(210, canvas.height - 100, 30, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(400, canvas.height - 100, 30, 0, Math.PI * 2);
    ctx.arc(430, canvas.height - 100, 30, 0, Math.PI * 2);
    ctx.arc(460, canvas.height - 100, 30, 0, Math.PI * 2);
    ctx.fill();

    // Flowers
    for (let i = 50; i < canvas.width; i += 100) {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(i, canvas.height - 110, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(i - 5, canvas.height - 115, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(i + 5, canvas.height - 115, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(i, canvas.height - 120, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "yellow";
        ctx.beginPath();
        ctx.arc(i, canvas.height - 115, 4, 0, Math.PI * 2); // Flower center
        ctx.fill();
    }
}