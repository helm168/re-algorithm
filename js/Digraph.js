class Digraph {
  // array => [3, [0, 1], [0, 2]];
  constructor(array) {
    this._v = 0;
    this._e = 0;
    this._adjs = [];

    if (Array.isArray(array)) {
      array.forEach((val, index) => {
        if (index === 0) {
          this._v = val;
          this._initAdjs();
        } else {
          this.addEdge(val[0], val[1]);
        }
      });
    } else {
      this._v = array;
      this._initAdjs();
    }
  }

  _initAdjs() {
    for (let i = 0; i < this._v; i++) {
      this._adjs.push([]);
    }
  }

  V() {
    return this._v;
  }

  E() {
    return this._e;
  }

  addEdge(v, w) {
    this._adjs[v].unshift(w);
    this._e++;
  }

  adj(v) {
    return this._adjs[v];
  }

  reverse() {
    const g = new Digraph(this._v);
    for(let i = 0; i < this._v; i++) {
      const adjs = this.adj(i);
      for (let w of adjs) {
        g.addEdge(w, i);
      }
    }
    return g;
  }
}

module.exports = Digraph;