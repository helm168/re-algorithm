class DepthFirstOrder {
  constructor(graph) {
    this._pre = new Array(graph.V()).fill(0);
    this._post = new Array(graph.V()).fill(0);
    this._reversePost = new Array(graph.V()).fill(0);
    this._marked = new Array(graph.V()).fill(false);
    for(let s = 0; s < graph.V(); s++) {
      if (!this._marked[s]) {
        this._dfs(graph, s);
      }
    }
  }

  _dfs(g, v) {
    this._marked[v] = true;
    this._pre.push(v);
    for(let w of g.adj(v)) {
      if (!this._marked[w]) {
        this._dfs(g, w);
      }
    }
    this._post.push(v);
    this._reversePost.unshift(v);
  }

  pre() {
    return this._pre;
  }

  post() {
    return this._post;
  }

  reversePost() {
    return this._reversePost;
  }
}

module.exports = DepthFirstOrder;