class QuickFindUF {
  constructor(ln) {
    this._ids = new Array(ln);
    this._count = ln;
    for (let i = 0; i < ln; i++) {
      this._ids[i] = i;
    }
  }

  count() {
    return this._count;
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  find(p) {
    return this._ids[p];
  }

  union(p, q) {
    const pID = this._ids[p];
    const qID = this._ids[q];

    if (pID === qID) return;

    for(let i = 0; i < this._ids.length; i++) {
      if (this._ids[i] === pID) {
        this._ids[i] = qID;
      }
    }
    this._count--;
  }
}

module.exports = QuickFindUF;