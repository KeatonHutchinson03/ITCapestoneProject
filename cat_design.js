function drawAngryCat(ctx, x, y, size = 35) {
    // Body (smaller and rounder)
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.ellipse(x, y, size * 0.5, size * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(x, y - size, size * 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Ears (rounded)
    ctx.beginPath();
    ctx.arc(x - size * 0.4, y - size * 1.4, size * 0.2, 0, Math.PI * 2); // Left ear
    ctx.arc(x + size * 0.4, y - size * 1.4, size * 0.2, 0, Math.PI * 2); // Right ear
    ctx.fill();

    // Collar
    ctx.fillStyle = "red";
    ctx.fillRect(x - size * 0.3, y - size * 0.6, size * 0.6, size * 0.05);

    // Bell
    ctx.fillStyle = "gold";
    ctx.beginPath();
    ctx.arc(x, y - size * 0.55, size * 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Legs
    ctx.fillStyle = "darkgray";
    ctx.beginPath();
    ctx.ellipse(x - size * 0.3, y + size * 0.5, size * 0.2, size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(x + size * 0.3, y + size * 0.5, size * 0.2, size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail - curlier and stylized
    ctx.strokeStyle = "gray";
    ctx.lineWidth = size * 0.1;
    ctx.beginPath();
    ctx.moveTo(x + size * 0.5, y);
    ctx.quadraticCurveTo(x + size * 1, y - size * 0.3, x + size * 0.8, y - size);
    ctx.stroke();

    // Eyes - large and expressive
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(x - size * 0.2, y - size, size * 0.18, size * 0.25, Math.PI / 10, 0, Math.PI * 2);
    ctx.ellipse(x + size * 0.2, y - size, size * 0.18, size * 0.25, -Math.PI / 10, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x - size * 0.2, y - size, size * 0.05, 0, Math.PI * 2);
    ctx.arc(x + size * 0.2, y - size, size * 0.05, 0, Math.PI * 2);
    ctx.fill();

    // Angry Eyebrows (cartoony)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.3, y - size * 1.25);
    ctx.lineTo(x - size * 0.05, y - size * 1.15);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + size * 0.3, y - size * 1.25);
    ctx.lineTo(x + size * 0.05, y - size * 1.15);
    ctx.stroke();

    // Nose
    ctx.fillStyle = "pink";
    ctx.beginPath();
    ctx.arc(x, y - size * 0.85, size * 0.1, 0, Math.PI * 2);
    ctx.fill();

    // Mouth (cartoon-style frown)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.2, y - size * 0.70);
    ctx.quadraticCurveTo(x, y - size * 0.85, x + size * 0.2, y - size * 0.75);
    ctx.stroke();
}