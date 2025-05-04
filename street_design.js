function drawStreetBackground(ctx) {
    
    // Clear the canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Street
    ctx.fillStyle = "#444"; // dark gray
    ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

    // Yellow center line
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 4;

    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, canvas.height * 0.8);
        ctx.lineTo(x + 20, canvas.height * 0.8);
        ctx.stroke();
    }
}