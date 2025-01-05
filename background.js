(function () {

    // Create Background Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'background';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawRandomBoxes() {
        // Base line thickness as a percentage of the smaller screen dimension
        const BaseThickness = 0.015 * Math.min(canvas.width, canvas.height);

        // Up to 30% bigger than BaseThickness
        const ThicknessFactor = 0.3;

        // Dynamically set boxCount based on screen area (fewer boxes = bigger overlap)
        const area = canvas.width * canvas.height;
        const boxCount = Math.floor(area / 50000);

        // Larger minimum sizes to avoid tiny leftover spaces
        const minBoxWidth = 200;
        const maxBoxWidth = 0.6 * canvas.width;
        const minBoxHeight = 200;
        const maxBoxHeight = 0.6 * canvas.height;

        const colors = ['#ff4500', '#ff6347', '#ffa07a', '#ff69b4', '#8a2be2', '#6a5acd'];

        for (let i = 0; i < boxCount; i++) {
            // Big random dimensions
            const width = Math.random() * (maxBoxWidth - minBoxWidth) + minBoxWidth;
            const height = Math.random() * (maxBoxHeight - minBoxHeight) + minBoxHeight;

            // Offset placement so boxes often extend outside the screen, ensuring overlap
            const x = -width / 2 + Math.random() * (canvas.width + width);
            const y = -height / 2 + Math.random() * (canvas.height + height);

            ctx.beginPath();
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.strokeStyle = '#111';

            // Vary line width within 30% of the base
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
