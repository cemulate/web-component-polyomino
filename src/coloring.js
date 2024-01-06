function computeAdjacency(polyominos) {
    // Returns g : (indices) -> (lists of indicies),
    // i -> (indices of) neighbors of polyominos[i]
    const adj = new Map(polyominos.map((p, i) => [ i, [] ]));

    const tdist = ([ x1, y1 ], [ x2, y2 ]) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

    for (let i = 0; i < polyominos.length; i += 1) {
        for (let j = i + 1; j < polyominos.length; j += 1) {
            if (polyominos[i].some(c => polyominos[j].some(d => tdist(c, d) == 1))) {
                adj.get(i).push(j);
                adj.get(j).push(i);
            }
        }
    }

    return adj;
}

function color(graph, vertices = [ ...graph.keys() ]) {
    // Simple greedy algorithm to 6-color a planar graph
    // Delete vertices with deg <= 5 (which exist), and recurse
    if (vertices.length == 1) {
        return new Map([ [ vertices[0], 0] ]);
    }

    for (let [ i, v ] of vertices.entries()) {
        const neighbors = graph.get(v).filter(i => vertices.includes(i));
        if (neighbors.length > 5) continue;

        const coloring = color(graph, vertices.toSpliced(i, 1));
        const neighborColors = neighbors.map(u => coloring.get(u));
        let c = 0;
        while (neighborColors.includes(c)) c += 1;
        coloring.set(v, c);

        return coloring;
    }
}

export function computeColoring(polyominos) {
    const g = computeAdjacency(polyominos);
    return color(g);
}
