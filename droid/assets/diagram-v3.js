



// Sample circuit data (replace with your config parsing logic)
const circuits = [
    { id: "A", inputs: [{ cable: "in1" }], outputs: [{ cable: "out1" }] },
    { id: "B", inputs: [{ cable: "out1" }], outputs: [{ cable: "out2" }] }
];
const links = [{ source: "A", target: "B", label: "out1" }];

// SVG setup
const svg = d3.select("#diagram");
const boxWidth = 200;
const boxHeight = 100;
const layerSpacing = 150;
const nodeSpacing = 50;

// Layered layout with Sugiyama
const graph = {
    nodes: circuits.map(d => ({ id: d.id })),
    links: links.map(d => ({ source: d.source, target: d.target }))
};
const dag = d3.dagStratify()(graph);
const layout = d3.sugiyama().nodeSize([boxWidth + nodeSpacing, boxHeight + layerSpacing]);
layout(dag);

// Assign positions
const nodeMap = new Map(dag.descendants().map(d => [d.id, d]));
circuits.forEach(d => {
    const node = nodeMap.get(d.id);
    d.x = node.x;
    d.y = node.y;
});

// Calculate pin positions
circuits.forEach(circuit => {
    const pinSpacing = boxHeight / (Math.max(circuit.inputs.length, circuit.outputs.length) + 1);
    circuit.inputPins = circuit.inputs.map((input, i) => ({
        x: circuit.x - boxWidth / 2,
        y: circuit.y - boxHeight / 2 + (i + 1) * pinSpacing,
        cable: input.cable
    }));
    circuit.outputPins = circuit.outputs.map((output, i) => ({
        x: circuit.x + boxWidth / 2,
        y: circuit.y - boxHeight / 2 + (i + 1) * pinSpacing,
        cable: output.cable
    }));
});

// Set SVG size
const minX = d3.min(circuits, d => d.x - boxWidth / 2);
const maxX = d3.max(circuits, d => d.x + boxWidth / 2);
const minY = d3.min(circuits, d => d.y - boxHeight / 2);
const maxY = d3.max(circuits, d => d.y + boxHeight / 2);
const svgWidth = maxX - minX + 100;
const svgHeight = maxY - minY + 100;
svg.attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("viewBox", `${minX - 50} ${minY - 50} ${svgWidth} ${svgHeight}`);

// Draw circuit boxes
const node = svg.selectAll(".node")
    .data(circuits)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.x},${d.y})`);

node.append("rect")
    .attr("width", boxWidth)
    .attr("height", boxHeight)
    .attr("x", -boxWidth / 2)
    .attr("y", -boxHeight / 2);

node.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", "0.35em")
    .text(d => d.id);

// Draw input/output labels
node.each(function(d) {
    d.inputPins.forEach((pin, i) => {
        d3.select(this).append("text")
            .attr("x", -boxWidth / 2 + 5)
            .attr("y", -boxHeight / 2 + (i + 1) * (boxHeight / (d.inputs.length + 1)))
            .text(pin.cable);
    });
    d.outputPins.forEach((pin, i) => {
        d3.select(this).append("text")
            .attr("x", boxWidth / 2 - 5)
            .attr("y", -boxHeight / 2 + (i + 1) * (boxHeight / (d.outputs.length + 1)))
            .attr("text-anchor", "end")
            .text(pin.cable);
    });
});

// Draw orthogonal cables with rounded bends
const linkData = links.map(link => {
    const sourceCircuit = circuits.find(c => c.id === link.source);
    const targetCircuit = circuits.find(c => c.id === link.target);
    const sourcePin = sourceCircuit.outputPins.find(p => p.cable === link.label);
    const targetPin = targetCircuit.inputPins.find(p => p.cable === link.label);
    return { sourcePin, targetPin, label: link.label };
});

svg.selectAll(".link")
    .data(linkData)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d => {
        const sx = d.sourcePin.x, sy = d.sourcePin.y;
        const tx = d.targetPin.x, ty = d.targetPin.y;
        const midX = (sx + tx) / 2;
        // Horizontal to mid-point, then vertical to target
        return `M${sx},${sy} H${midX} Q${midX},${sy} ${midX},${sy + (ty - sy) / 2} V${ty} H${tx}`;
    })
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("fill", "none");
