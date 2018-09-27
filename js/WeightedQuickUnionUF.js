class WeightedQuickUnionUF {
  constructor(ln) {
    this._id = new Array(ln);
    this._sz = new Array(ln); // size of component for root
    this._count = ln;
    for(let i = 0; i < ln; i++) {
      this._id[i] = i;
      this._sz[i] = 1;
    }
  }
  find(p) {
    while(p !== this._id[p]) p = this._id[p];
    return p;
  }
  count() {
    return this._count;
  }
  union(p, q) {
    const i = this.find(p);
    const j = this.find(q);

    if (i === j) return;

    if (this._sz[i] < this._sz[j]) {
      this._id[i] = j;
      this._sz[j] += this._sz[i];
    } else {
      this._id[j] = i;
      this._sz[i] += this._sz[j];
    }
    this._count--;
  }
  connected(p, q) {
    return this.find(p) == this.find(q);
  }
}

module.exports = WeightedQuickUnionUF;
