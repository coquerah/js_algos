/**
 * Реализация алгоритма Дейкстры для нахождения кратчайшего пути от источника.
 * @param {number[][]} graph - Матрица смежности графа (веса рёбер).
 * @param {number} source - Источник (стартовая вершина).
 * @returns {Object} - Кратчайшие расстояния до всех вершин и пути.
 */
export function dijkstra(graph, source) {
    const n = graph.length;
    const distances = new Array(n).fill(Infinity);
    const visited = new Array(n).fill(false);
    const previous = new Array(n).fill(null);

    distances[source] = 0;

    for (let i = 0; i < n; i++) {
        let minDistance = Infinity;
        let currentNode = -1;

        for (let j = 0; j < n; j++) {
            if (!visited[j] && distances[j] < minDistance) {
                minDistance = distances[j];
                currentNode = j;
            }
        }

        if (currentNode === -1) break; 

        visited[currentNode] = true;

        for (let v = 0; v < n; v++) {
            if (graph[currentNode][v] > 0 && !visited[v]) {
                const newDist = distances[currentNode] + graph[currentNode][v];
                if (newDist < distances[v]) {
                    distances[v] = newDist;
                    previous[v] = currentNode;
                }
            }
        }
    }


    const paths = new Array(n).fill(null).map(() => []);
    for (let v = 0; v < n; v++) {
        if (distances[v] !== Infinity) {
            let path = [];
            for (let at = v; at !== null; at = previous[at]) {
                path.push(at);
            }
            paths[v] = path.reverse();
        }
    }

    return { distances, paths };
}
