export function diagram() {
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

    // ... (rest of the existing code)

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
}
