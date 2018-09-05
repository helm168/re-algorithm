class BreadthFirstPaths {
  constructor(graph, s) {
    this._marked = new Array(graph.V()).fill(false);
    this._edgeTo = new Array(graph.V()).fill(0);
    this._s = s;
    this._bfs(graph, s);
  }

  _bfs(g, s) {
    let queues = [s];
    this._marked[s] = true;
    while(queues.length) {
      let q = queues.shift();
      for(let w of g.adj(q)) {
        if (this._marked[w]) continue; 
        this._marked[w] = true;
        this._edgeTo[w] = q;
        queues.push(w);
      }
    }
  }

  hasPathTo(v) {
    return this._marked[v];
  }

  pathTo(v) {
    const s = this._s;
    const paths = [];
    if (!this.hasPathTo(v)) return paths;
    for(let w = v; w !== s; w = this._edgeTo[w]) {
      paths.unshift(w);
    }
    paths.unshift(s);
    return paths;
  }
}

module.exports = BreadthFirstPaths;