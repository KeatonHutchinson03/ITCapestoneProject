function drawCheese(ctx, x, y) {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 30, y);       // Base of the triangle
    ctx.lineTo(x + 15, y - 20);  // Top of the triangle
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = 'lightgoldenrodyellow';
    const holes = [
        { dx: 8, dy: -5, radius: 3 },
        { dx: 18, dy: -10, radius: 4 },
        { dx: 12, dy: -15, radius: 2 }
    ];

    holes.forEach(hole => {
        ctx.beginPath();
        ctx.arc(x + hole.dx, y + hole.dy, hole.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}