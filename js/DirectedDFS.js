class DirectedDFS {
  constructor(graph, sources) {
    this._marked = new Array(graph.V()).fill(false);
    if (!Array.isArray(sources)) {
      sources = [sources];
    }

    sources.forEach(s => {
      if (!this._marked[s]) {
        this._dfs(graph, s);
      }
    });
  }

  _dfs(g, v) {
    this._marked[v] = true;
    for(let w of g.adj(v)) {
      if (!this._marked[w]) {
        this._dfs(g, w);
      }
    }
  }

  marked(v) {
    return this._marked[v];
  }
}

module.exports = DirectedDFS;