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
        const BaseThickness = 0.003 * Math.min(canvas.width, canvas.height);

        // ThicknessFactor is the max percentage increase over BaseThickness
        // e.g., if BaseThickness=10, a factor of 0.3 means up to 30% bigger (10 -> 13)
        const ThicknessFactor = 2;

        const colors = ['#ff4500', '#ff6347', '#ffa07a', '#ff69b4', '#8a2be2', '#6a5acd'];
        const boxCount = 150;

        for (let i = 0; i < boxCount; i++) {
            const width = Math.random() * (canvas.width * 0.4) + 100;
            const height = Math.random() * (canvas.height * 0.4) + 100;
            const x = -width + Math.random() * (canvas.width + width);
            const y = -height + Math.random() * (canvas.height + height);

            ctx.beginPath();
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            ctx.strokeStyle = '#111';

            // lineWidth = BaseThickness plus up to ThicknessFactor * BaseThickness
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
