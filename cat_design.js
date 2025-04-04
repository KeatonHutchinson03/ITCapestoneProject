function drawAngryCat(ctx, x, y, size = 50) {
    // Cache size-dependent values to reduce recalculations
    const s1 = size * 0.6;
    const s2 = size * 0.5;
    const s3 = size * 0.4;
    const s4 = size * 0.2;
    const s5 = size * 0.15;
    const s6 = size * 0.1;
    
    // Body
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.ellipse(x, y, s1, size, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(x, y - size, s1, 0, Math.PI * 2);
    ctx.fill();

    // Ears
    ctx.beginPath();
    ctx.moveTo(x - s2, y - s2);
    ctx.lineTo(x - size * 0.8, y - size * 2);
    ctx.lineTo(x - s3, y - s2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + s2, y - s2);
    ctx.lineTo(x + size * 0.8, y - size * 2);
    ctx.lineTo(x + s3, y - s2);
    ctx.fill();

    // Legs
    ctx.fillStyle = "darkgray";
    ctx.beginPath();
    ctx.ellipse(x - s3, y + s4, s4, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x + s3, y + s4, s4, size * 0.4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Tail
    ctx.strokeStyle = "gray";
    ctx.lineWidth = s6;
    ctx.beginPath();
    ctx.moveTo(x + s1, y + s4);
    ctx.quadraticCurveTo(x + size * 1.2, y, x + size * 1.4, y - size * 0.5);
    ctx.stroke();

    // Eyes (Angry look)
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.ellipse(x - s5, y - size, s5, s5 * 1.3, Math.PI / 8, 0, Math.PI * 2);
    ctx.ellipse(x + s5, y - size, s5, s5 * 1.3, -Math.PI / 8, 0, Math.PI * 2);
    ctx.fill();

    // Pupils
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(x - s5, y - size, s5 * 0.25, 0, Math.PI * 2);
    ctx.arc(x + s5, y - size, s5 * 0.25, 0, Math.PI * 2);
    ctx.fill();

    // Angry Eyebrows (moved upward)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x - s2, y - size * 1.2);
    ctx.lineTo(x - s1, y - size * 1.05);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + s2, y - size * 1.2);
    ctx.lineTo(x + s1, y - size * 1.05);
    ctx.stroke();

    // Mouth (Angry frown)
    ctx.beginPath();
    ctx.moveTo(x - s5, y - size * 0.8);
    ctx.quadraticCurveTo(x, y - size * 0.9, x + s5, y - size * 0.8); // Frown shape
    ctx.stroke();
}