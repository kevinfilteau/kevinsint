(function () {

    // Create Background Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'background';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    const areaFactor = Math.floor(Math.sqrt(canvas.width * canvas.height) / 100);

    function drawRandomBoxesStatic() {

        const areaFactor = Math.floor(Math.sqrt(canvas.width * canvas.height) / 100);

        console.log(areaFactor);

        // Baseline thickness as a percentage of the smaller screen dimension
        const BaseThickness = 2 + areaFactor * 0.0002 * Math.min(canvas.width, canvas.height);
        const ThicknessFactor = 0.3;
        const boxCount = 10 + areaFactor;

        // Box size ranges as fractions of screen dimensions
        const minBoxWidth = canvas.width * 0.01 + 10;
        const maxBoxWidth = canvas.width * 0.2 + 10;
        const minBoxHeight = canvas.height * 0.01 + 10;
        const maxBoxHeight = canvas.height * 0.2 + 10;

        // Overlap threshold (fraction of smaller box area)
        const maxOverlapFraction = 0.4;

        // Color palette
        const colors = ['#ff4500', '#ff6347', '#ffa07a', '#ff69b4', '#8a2be2', '#6a5acd'];

        // Keep track of placed boxes
        const placedBoxes = [];

        function overlapArea(box1, box2) {
            const overlapX = Math.max(
                0,
                Math.min(box1.x + box1.w, box2.x + box2.w) - Math.max(box1.x, box2.x)
            );
            const overlapY = Math.max(
                0,
                Math.min(box1.y + box1.h, box2.y + box2.h) - Math.max(box1.y, box2.y)
            );
            return overlapX * overlapY;
        }

        function boxesTooOverlapped(x, y, w, h) {
            const newArea = w * h;
            for (const b of placedBoxes) {
                const oArea = overlapArea(b, {x, y, w, h});
                if (oArea > 0) {
                    const smallerArea = Math.min(newArea, b.w * b.h);
                    // If overlap exceeds max fraction of smaller box, it's too overlapped
                    if (oArea / smallerArea > maxOverlapFraction) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Try placing each box with limited attempts
        for (let i = 0; i < boxCount; i++) {
            let attempts = 0, placed = false;
            while (attempts < 30 && !placed) {
                const w = Math.random() * (maxBoxWidth - minBoxWidth) + minBoxWidth;
                const h = Math.random() * (maxBoxHeight - minBoxHeight) + minBoxHeight;
                const x = -w / 2 + Math.random() * (canvas.width + w);
                const y = -h / 2 + Math.random() * (canvas.height + h);

                if (!boxesTooOverlapped(x, y, w, h)) {
                    placed = true;
                    placedBoxes.push({x, y, w, h});

                    // Draw the box
                    ctx.beginPath();
                    ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
                    ctx.strokeStyle = '#111';
                    ctx.lineWidth = BaseThickness * (1 + ThicknessFactor * Math.random());
                    ctx.roundRect(x, y, w, h, 15);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                }
                attempts++;
            }
        }
    }


    function drawNeonBackground() {
        const w = canvas.width,
            h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const boxCount = 10 + areaFactor * 50;

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
            const bw = 30 + Math.random() * 100;
            const bh = 30 + Math.random() * 100;
            const x = Math.random() * (w - bw);
            const y = Math.random() * (h - bh);
            ctx.fillRect(x, y, bw, bh);
            ctx.restore();
        }
    }


    function drawRandomBoxes() {
        // Convert hex color to an {r,g,b} object
        function hexToRGB(hex) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return {r, g, b};
        }

        // Convert {r,g,b} back to a CSS rgb(...) string
        function rgbToString(r, g, b) {
            return `rgb(${r}, ${g}, ${b})`;
        }

        // A quick “desaturate” that pushes the color toward a neutral gray
        // factor=1 => full color, factor=0 => completely gray
        function desaturate(r, g, b, factor) {
            // Find average
            const gray = (r + g + b) / 3;
            // Lerp each channel toward gray
            const R = Math.round(r * factor + gray * (1 - factor));
            const G = Math.round(g * factor + gray * (1 - factor));
            const B = Math.round(b * factor + gray * (1 - factor));
            return {R, G, B};
        }

        const areaFactor = Math.floor(Math.sqrt(canvas.width * canvas.height) / 100);

        // Baseline thickness
        const BaseThickness = 2 + areaFactor * 0.0002 * Math.min(canvas.width, canvas.height);
        const ThicknessFactor = 0.3;

        // More boxes overall
        const boxCount = 10 + areaFactor * 5;

        // Box size ranges
        const minBoxWidth = canvas.width * 0.01 + 10;
        const maxBoxWidth = canvas.width * 0.2 + 10;
        const minBoxHeight = canvas.height * 0.01 + 10;
        const maxBoxHeight = canvas.height * 0.2 + 10;

        // Overlap threshold
        const maxOverlapFraction = 0.4;

        // Depth-of-field config:
        // depth=0 => near, depth=1 => far
        const focalDepth = 0;   // near is in focus
        const DOFRange = 1; // how much around focalDepth is sharp
        const MaxBlur = 5;   // max blur for far-away boxes

        // We’ll fade color with a factor 0..1, where 1=full color, 0=gray
        const minSaturationFactor = 0.3; // how washed-out far boxes get
        const maxSaturationFactor = 1.0; // fully saturated near focal

        const colors = ['#F230AE', '#2690E2', '#F2E530', '#F2921D', '#F24B0F'];
        const placedBoxes = [];
        const boxes = [];

        function overlapArea(box1, box2) {
            const overlapX = Math.max(
                0,
                Math.min(box1.x + box1.w, box2.x + box2.w) - Math.max(box1.x, box2.x)
            );
            const overlapY = Math.max(
                0,
                Math.min(box1.y + box1.h, box2.y + box2.h) - Math.max(box1.y, box2.y)
            );
            return overlapX * overlapY;
        }

        function boxesTooOverlapped(x, y, w, h) {
            const newArea = w * h;
            for (const b of placedBoxes) {
                const oArea = overlapArea(b, {x, y, w, h});
                if (oArea > 0) {
                    const smallerArea = Math.min(newArea, b.w * b.h);
                    if (oArea / smallerArea > maxOverlapFraction) {
                        return true;
                    }
                }
            }
            return false;
        }

        // Generate all box data
        for (let i = 0; i < boxCount; i++) {
            let attempts = 0, placed = false;
            while (attempts < 30 && !placed) {
                const w0 = Math.random() * (maxBoxWidth - minBoxWidth) + minBoxWidth;
                const h0 = Math.random() * (maxBoxHeight - minBoxHeight) + minBoxHeight;

                // depth=0 => near, depth=1 => far
                const depth = Math.random();
                // near => bigger, far => smaller
                const scale = 1 - 0.5 * depth;

                const w = w0 * scale;
                const h = h0 * scale;
                const x = -w / 2 + Math.random() * (canvas.width + w);
                const y = -h / 2 + Math.random() * (canvas.height + h);

                if (!boxesTooOverlapped(x, y, w, h)) {
                    placed = true;
                    placedBoxes.push({x, y, w, h});
                    boxes.push({x, y, w, h, depth, scale});
                }
                attempts++;
            }
        }

        // Sort so we draw far boxes first (depth=1), near last (depth=0)
        boxes.sort((a, b) => b.depth - a.depth);

        // Now draw
        for (const box of boxes) {
            // Distance from focal plane
            const distFromFocal = Math.abs(box.depth - focalDepth);

            // Blur
            let blurVal;
            if (distFromFocal >= DOFRange) {
                blurVal = MaxBlur;
            } else {
                blurVal = (distFromFocal / DOFRange) * MaxBlur;
            }

            // Compute how “colorful” the box is
            //  distFromFocal=0 => factor=1,
            //  distFromFocal=DOFRange => factor=0
            // We'll clamp so factor never < 0
            const ratio = Math.min(distFromFocal / DOFRange, 1);
            // factor 1 => near/focal => full color, factor 0 => outside DOF => less color
            const colorFactor = maxSaturationFactor - ratio * (maxSaturationFactor - minSaturationFactor);

            // Thicker lines if near focal plane
            const focusFactor = 1 - ratio;
            const lineWidthFactor = 0.5 + focusFactor;

            // Pick a color, reduce saturation
            const chosenColor = colors[Math.floor(Math.random() * colors.length)];
            const {r, g, b} = hexToRGB(chosenColor);
            const {R, G, B} = desaturate(r, g, b, colorFactor);

            ctx.save();
            ctx.filter = `blur(${blurVal.toFixed(1)}px)`;
            ctx.beginPath();

            // Always full opacity: “fade” done by reducing saturation
            ctx.fillStyle = rgbToString(R, G, B);
            ctx.strokeStyle = '#111';

            // Combine line thickness
            ctx.lineWidth =
                BaseThickness *
                box.scale *
                lineWidthFactor *
                (1 + ThicknessFactor * Math.random());

            ctx.roundRect(box.x, box.y, box.w, box.h, 15);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }

// Redraw on Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawNeonBackground();
    });

// Initial Draw
    drawNeonBackground();

})();
