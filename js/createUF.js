const QuickFindUF = require('./QuickFindUF');
const QuickUnionUF = require('./QuickUnionUF');

const tinyUF = [
  10,
  [4, 3],
  [3, 8],
  [6, 5],
  [9, 4],
  [2, 1],
  [8, 9],
  [5, 0],
  [7, 2],
  [6, 1],
  [1, 0],
  [6, 7]
];

module.exports = {
  createQuickFindUF() {
    const uf = new QuickFindUF(tinyUF[0]);
    for(let i = 1; i < tinyUF.length; i++) {
      const p = tinyUF[i][0];
      const q = tinyUF[i][1];
      if (uf.connected(p, q)) continue;
      uf.union(p, q);
    }
    return uf;
  },
  createQuickUnionUF() {
    const uf = new QuickUnionUF(tinyUF[0]);
    for(let i = 1; i < tinyUF.length; i++) {
      const p = tinyUF[i][0];
      const q = tinyUF[i][1];
      if (uf.connected(p, q)) continue;
      uf.union(p, q);
    }
    return uf;
  }
}