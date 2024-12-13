/**
 * Реализация алгоритма Крускала для нахождения минимального остовного дерева.
 * @param {number[][]} edges - Список рёбер графа в формате [source, target, weight].
 * @param {number} n - Количество вершин в графе.
 * @returns {Object} - Минимальное остовное дерево и его вес.
 */
export function kruskal(edges, n) {ы
    edges.sort((a, b) => a[2] - b[2]);

    const parent = new Array(n).fill(0).map((_, i) => i);
    const rank = new Array(n).fill(0);

    function find(node) {
        if (parent[node] !== node) {
            parent[node] = find(parent[node]); // Сжатие пути
        }
        return parent[node];
    }

    function union(node1, node2) {
        const root1 = find(node1);
        const root2 = find(node2);

        if (root1 !== root2) {
            if (rank[root1] > rank[root2]) {
                parent[root2] = root1;
            } else if (rank[root1] < rank[root2]) {
                parent[root1] = root2;
            } else {
                parent[root2] = root1;
                rank[root1] += 1;
            }
        }
    }

    const mst = [];
    let totalWeight = 0;

    for (const [source, target, weight] of edges) {
        if (find(source) !== find(target)) {
            union(source, target);
            mst.push({ source, target, weight });
            totalWeight += weight;
        }
    }

    return { mst, totalWeight };
}
