class QuickUnionUF {
  constructor(ln) {
    this._id = new Array(ln);
    this._count = ln;
    for(let i = 0; i < ln; i++) {
      this._id[i] = i;
    }
  }
  count() {
    return this._count;
  }
  find(p) {
    while(this._id[p] !== p) p = this._id[p];
    return p;
  }
  connected(p, q) {
    return this.find(p) === this.find(q);
  }
  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);

    if (pRoot === qRoot) return;

    this._id[pRoot] = qRoot;
    this._count--;
  }
}

module.exports = QuickUnionUF;