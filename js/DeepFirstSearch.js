class DeepFirstSearch {
  constructor(graph, s) {
    this._marked = new Array(graph.V()).fill(false);
    this._count = 0;
    this._gfs(graph, s);
  }

  _gfs(g, v) {
    this._marked[v] = true;
    this._count++;
    for(let w of g.adj(v)) {
      if (!this._marked[w]) this._gfs(g, w);
    }
  }

  marked(v) {
    return this._marked[v];
  }

  count() {
    return this._count;
  }
}

module.exports = DeepFirstSearch;