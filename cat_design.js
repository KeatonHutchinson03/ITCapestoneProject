function drawAngryCat(ctx, x, y, size = 50) {
    // Body
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.6, size, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(x, y - size, size * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.beginPath();
    ctx.moveTo(x - size * 0.5, y - size * 1.5);
    ctx.lineTo(x - size * 0.8, y - size * 2);
    ctx.lineTo(x - size * 0.3, y - size * 1.6);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + size * 0.5, y - size * 1.5);
    ctx.lineTo(x + size * 0.8, y - size * 2);
    ctx.lineTo(x + size * 0.3, y - size * 1.6);
    ctx.fill();

    // Legs
    ctx.fillStyle = "darkgray";
    ctx.beginPath();
    ctx.ellipse(x - size * 0.4, y + size * 0.5, size * 0.2, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x + size * 0.4, y + size * 0.5, size * 0.2, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail
    ctx.strokeStyle = "gray";
    ctx.lineWidth = size * 0.1;
    ctx.beginPath();
    ctx.moveTo(x + size * 0.6, y + size * 0.2);
    ctx.quadraticCurveTo(x + size * 1.2, y, x + size * 1.4, y - size * 0.5);
    ctx.stroke();

    // Eyes (Angry look)
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(x - size * 0.2, y - size, size * 0.15, size * 0.2, Math.PI / 8, 0, Math.PI * 2);
    ctx.ellipse(x + size * 0.2, y - size, size * 0.15, size * 0.2, -Math.PI / 8, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x - size * 0.2, y - size, size * 0.05, 0, Math.PI * 2);
    ctx.arc(x + size * 0.2, y - size, size * 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Angry Eyebrows (moved upward)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.4, y - size * 1.2);  // Left eyebrow higher
    ctx.lineTo(x - size * 0.1, y - size * 1.05); // Sharper angle
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + size * 0.4, y - size * 1.2);  // Right eyebrow higher
    ctx.lineTo(x + size * 0.1, y - size * 1.05); // Sharper angle
    ctx.stroke();

    // Mouth (Angry frown)
    ctx.beginPath();
    ctx.moveTo(x - size * 0.2, y - size * 0.8);
    ctx.quadraticCurveTo(x, y - size * 0.9, x + size * 0.2, y - size * 0.8); // Frown shape
    ctx.stroke();
}