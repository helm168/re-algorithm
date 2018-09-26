class DirectedCycle {
  constructor(graph) {
    this._marked = new Array(graph.V()).fill(false);
    this._onStack = new Array(graph.V()).fill(false);
    this._edgeTo = new Array(graph.V()).fill(0);
    this._cycle = null;
    const v = graph.V();
    for(let s = 0; s < v; s++) {
      if (!this._marked[s]) {
        this._dfs(graph, s);
      }
    }
  }

  _dfs(g, v) {
    this._marked[v] = true;
    this._onStack[v] = true;
    for(let w of g.adj(v)) {
      if (this.hasCycle()) return;
      if (!this._marked[w]) {
        this._edgeTo[w] = v;
        this._dfs(g, w);
      } else if (this._onStack[w]) {
        this._cycle = [];
        for (let x = v; x != w; x = this._edgeTo[x]) {
          this._cycle.unshift(x);
        }
        this._cycle.unshift(w);
        this._cycle.unshift(v);
      }
    }
    this._onStack[v] = false;
  }

  hasCycle() {
    return !!this._cycle;
  }

  cycle() {
    return this._cycle;
  }
}

module.exports = DirectedCycle;