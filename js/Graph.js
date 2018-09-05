class Graph {
  // array => [3, [0, 1], [0, 2]];
  constructor(array) {
    this._v = 0;
    this._e = 0;
    this._adjs = [];

    array.forEach((val, index) => {
      if (index === 0) {
        this._v = val;
        for (let i = 0; i < this._v; i++) {
          this._adjs.push([]);
        }
      } else {
        this.addEdge(val[0], val[1]);
      }
    });
  }

  V() {
    return this._v;
  }

  E() {
    return this._e;
  }

  addEdge(v, w) {
    this._adjs[v].unshift(w);
    this._adjs[w].unshift(v);
    this._e++;
  }


  // array is iterator
  // just want implement for fun
  adj(v) {
    let adjs = this._adjs[v];
    return {
      [Symbol.iterator]: function () {
        return {
          i: 0,
          next() {
            const next = {
              value: adjs[this.i],
              done: this.i === adjs.length
            };
            this.i++;
            return next;
          }
        };
      }
    }
  }
}

module.exports = Graph;