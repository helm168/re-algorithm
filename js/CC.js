class CC {
  constructor(graph) {
    this._marked = new Array(graph.V()).fill(false);
    this._id = new Array(graph.V()).fill(0);
    this._count = 0;
    for (let s = 0; s < graph.V(); s++) {
      if (this._marked[s]) continue;
      this._dfs(graph, s);
      this._count++;
    }
  }

  _dfs(g, v) {
    this._marked[v] = true;
    this._id[v] = this._count;
    for(let w of g.adj(v)) {
      if (this._marked[w]) continue;
      this._dfs(g, w);
    }
  }

  count() {
    return this._count;
  }

  connected(v, w) {
    return this._id[v] === this._id[w];
  }

  id(v) {
    return this._id[v];
  }
}

module.exports = CC;