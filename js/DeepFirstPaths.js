class DeepFirstPaths {
  constructor(graph, s)  {
    this._marked = new Array(graph.V()).fill(false);
    this._edgeTo = new Array(graph.V()).fill(0);
    this._s = s;
    this._dfs(graph, s);
  }

  _dfs(g, v) {
    this._marked[v] = true;
    const adjv = g.adj(v);
    for(let w of adjv) {
      if (this._marked[w]) continue;
      this._edgeTo[w] = v;
      this._dfs(g, w);
    }
  }

  hasPathTo(v) {
    return this._marked[v];
  }

  pathTo(v) {
    const paths = [];
    if (!this.hasPathTo(v)) return paths;
    const s = this._s;
    for(let w = v; w !== s; w = this._edgeTo[w]) {
      paths.unshift(w);
    }
    paths.unshift(s);
    return paths;
  }
}

module.exports = DeepFirstPaths;