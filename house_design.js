function drawLivingRoom() {
    ctx.fillStyle = "#f5e1da"; // soft wall color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Floor
    ctx.fillStyle = "#d2b48c";
    ctx.fillRect(0, 300, canvas.width, 100);

    ctx.fillStyle = "lightgrey";
    ctx.fillRect(100, 290, 150, 40); // seat moved from y=250 to y=290
    ctx.fillRect(100, 250, 30, 40);  // left arm moved from y=210 to y=250
    ctx.fillRect(220, 250, 30, 40);  // right arm moved from y=210 to y=250

    // Modern Flat-Screen TV
    ctx.fillStyle = "#111"; // Frame
    ctx.fillRect(500, 220, 100, 60);

    ctx.fillStyle = "#222"; // Screen
    ctx.fillRect(505, 225, 90, 50);

    ctx.fillStyle = "#444"; // Stand base
    ctx.fillRect(540, 280, 20, 5); // Stem
    ctx.fillRect(525, 285, 50, 5); // Base

    // TV Stand (added)
    ctx.fillStyle = "#654321"; // Stand Color
    ctx.fillRect(500, 290, 100, 20); // Base of the TV Stand

    // Power Light
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(590, 270, 2, 0, Math.PI * 2);
    ctx.fill();

    // Optional: screen reflection
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
    ctx.beginPath();
    ctx.moveTo(510, 230);
    ctx.lineTo(560, 230);
    ctx.lineTo(550, 250);
    ctx.lineTo(510, 250);
    ctx.closePath();
    ctx.fill();

    // Picture Frame Border
    ctx.strokeStyle = "gold";
    ctx.strokeRect(350, 100, 60, 40);

    // Inner White Background for the Picture
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(350, 100, 60, 40);

    // Simple Flower in the Picture Frame
    const flowerCenterX = 380; // center of the frame horizontally
    const flowerCenterY = 120; // center of the frame vertically
    const petalRadius = 6;
    const petalDistance = 10;

    ctx.fillStyle = "pink"; // Petals
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
        let x = flowerCenterX + Math.cos(angle) * petalDistance;
        let y = flowerCenterY + Math.sin(angle) * petalDistance;
        ctx.beginPath();
        ctx.arc(x, y, petalRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.fillStyle = "yellow"; // Flower center
    ctx.beginPath();
    ctx.arc(flowerCenterX, flowerCenterY, 5, 0, Math.PI * 2);
    ctx.fill();
}
