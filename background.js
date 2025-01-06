(function () {

    // Create Background Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'background';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const areaFactor = Math.floor(Math.sqrt(canvas.width * canvas.height) / 100);

    // 1) Wrap the draw calls in an animation that runs for ~3s and slows down:
    function animateNeon() {
        let frameCount = 0;
        const maxFrames = 5;
        const fps = 20;
        function step() {
            if (frameCount < maxFrames) {
                drawNeonBackground();
                frameCount++;
                setTimeout(() => requestAnimationFrame(step), 1000 / fps);
            } else {
                drawNeonBackground();
            }
        }
        requestAnimationFrame(step);
    }


    // 3) Debounce the resize. Only redraw if width/height changes by >=20%:
    let oldW = window.innerWidth, oldH = window.innerHeight;
    window.addEventListener('resize', () => {
        clearTimeout(window.__resizeTimer);
        window.__resizeTimer = setTimeout(() => {
            const newW = window.innerWidth, newH = window.innerHeight;
            if (
                newW >= oldW * 1.2 || newW <= oldW * 0.8 ||
                newH >= oldH * 1.2 || newH <= oldH * 0.8
            ) {
                canvas.width = newW;
                canvas.height = newH;
                drawNeonBackground();
                oldW = newW;
                oldH = newH;
            }
        }, 300);
    });

    function getItemCountLog(area, minItems, maxItems) {
        const scaled = Math.log(area) - Math.log(1000);
        const clampedRatio = Math.max(0, Math.min(1, scaled / 10));
        console.log("Scaled:", scaled, "Clamped ratio:", clampedRatio);
        return Math.round(minItems + (maxItems - minItems) * clampedRatio);
    }

    function calculateItems(areaWidth, areaHeight, baseCount = 10, baseSize = 50) {
        const area = areaWidth * areaHeight;
        const ratio = Math.floor(Math.sqrt(area) / 5);
        console.log("ratio", ratio);
        const itemCount = getItemCountLog(area, 100,600);
        const itemSize = baseSize * ratio;
        return { itemCount, itemSize };
    }

    function drawNeonBackground() {
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Boxes per pixel² (tweak to taste):
        // const density = 0.00005;
        const areaFactor = Math.floor(Math.sqrt(canvas.width * canvas.height) / 5);
        const {itemCount, itemSize } = calculateItems(w, h, 1, 10);
        //const boxCount = 10 + areaFactor * 5;
        const boxCount = itemCount;
        // Number of boxes scales with area:
        // const boxCount = Math.floor(w * h * density);

        // Base background
        const grad = ctx.createLinearGradient(0, 0, w, h);
        grad.addColorStop(0, '#1a1a2e');
        grad.addColorStop(1, '#111122');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        // Neon-ish blocks
        const colors = ['#f72585', '#b5179e', '#7209b7', '#560bad', '#4361ee', '#4cc9f0'];
        for (let i = 0; i < boxCount; i++) {
            ctx.save();
            ctx.globalAlpha = 0.1 + Math.random() * 0.9;
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];

            // Boxes sized as a fraction of canvas:
            const bw = (0.02 + 0.08 * Math.random()) * w; // e.g. 2%–10% of width
            const bh = (0.02 + 0.08 * Math.random()) * h; // e.g. 2%–10% of height
            const x = Math.random() * (w - bw);
            const y = Math.random() * (h - bh);

            ctx.fillRect(x, y, bw, bh);
            ctx.restore();
        }
    }

    // Initial Draw
    animateNeon();

})();
