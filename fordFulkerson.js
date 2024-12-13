
/**
 * Реализация алгоритма Форда-Фалкерсона для нахождения максимального потока
 * и минимального разреза в графе.
 * @param {number[][]} capacityMatrix - Матрица пропускных способностей графа.
 * @param {number} source - Источник (startNode).
 * @param {number} sink - Сток (endNode).
 * @returns {Object} - Максимальный поток и минимальный разрез.
 */
export function fordFulkerson(capacityMatrix, source, sink) {
    const n = capacityMatrix.length;
    const residual = capacityMatrix.map(row => row.slice());
    const parent = new Array(n).fill(-1);
  
    let maxFlow = 0;
  
    function bfs(residual, source, sink, parent) {
      const visited = new Array(n).fill(false);
      const queue = [];
  
      queue.push(source);
      visited[source] = true;
  
      while (queue.length > 0) {
        const u = queue.shift();
  
        for (let v = 0; v < n; v++) {
          if (!visited[v] && residual[u][v] > 0) {
            queue.push(v);
            parent[v] = u;
            visited[v] = true;
            if (v === sink) return true;
          }
        }
      }
  
      return false;
    }
  
    while (bfs(residual, source, sink, parent)) {
      // Найти минимальную пропускную способность вдоль пути
      let pathFlow = Infinity;
      let v = sink;
      while (v !== source) {
        const u = parent[v];
        pathFlow = Math.min(pathFlow, residual[u][v]);
        v = u;
      }
      v = sink;
      while (v !== source) {
        const u = parent[v];
        residual[u][v] -= pathFlow;
        residual[v][u] += pathFlow;
        v = u;
      }
  
      maxFlow += pathFlow;
    }
  
    const visited = new Array(n).fill(false);
    const queueFinal = [];
    queueFinal.push(source);
    visited[source] = true;
  
    while (queueFinal.length > 0) {
      const u = queueFinal.shift();
      for (let v = 0; v < n; v++) {
        if (!visited[v] && residual[u][v] > 0) {
          queueFinal.push(v);
          visited[v] = true;
        }
      }
    }
  
    const minCut = [];
    for (let u = 0; u < n; u++) {
      for (let v = 0; v < n; v++) {
        if (capacityMatrix[u][v] > 0 && visited[u] && !visited[v]) {
          minCut.push({ source: u, target: v });
        }
      }
    }
  
    return { maxFlow, minCut };
  }
  