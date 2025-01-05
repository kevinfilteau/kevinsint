(function () {

    // Create Background Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'background';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawRandomBoxes() {
        // Base thickness as a percentage of the smaller screen dimension
        const BaseThickness = 0.015 * Math.min(canvas.width, canvas.height);

        // Up to 30% bigger than BaseThickness
        const ThicknessFactor = 0.3;

        // Dynamically set boxCount to scale with screen area
        // Larger screens = more boxes
        const boxCount = Math.floor((canvas.width * canvas.height) / 30000);

        // Configure min/max box sizes for big overlapping boxes
        const minBoxWidth = 150;
        const maxBoxWidth = 600;
        const minBoxHeight = 150;
        const maxBoxHeight = 600;

        // Color palette
        const colors = ['#ff4500', '#ff6347', '#ffa07a', '#ff69b4', '#8a2be2', '#6a5acd'];

        // Draw the boxes
        for (let i = 0; i < boxCount; i++) {
            // Random size within specified range
            const width = Math.random() * (maxBoxWidth - minBoxWidth) + minBoxWidth;
            const height = Math.random() * (maxBoxHeight - minBoxHeight) + minBoxHeight;

            // Random position allows overlapping
            // Sometimes they go off-screen to make sure coverage is strong
            const x = -width / 2 + Math.random() * (canvas.width + width);
            const y = -height / 2 + Math.random() * (canvas.height + height);

            ctx.beginPath();
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.strokeStyle = '#111';

            // Thicker lines with slight variation
            ctx.lineWidth = BaseThickness * (1 + ThicknessFactor * Math.random());

            ctx.roundRect(x, y, width, height, 15);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

// Redraw on Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawRandomBoxes();
    });

// Initial Draw
    drawRandomBoxes();

})();
