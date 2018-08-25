class Matrix {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  multiplyCost(m) {
    if (this.y !== m.x) {
      throw new Error('cannot multiply');
    }
    return this.x * this.y * m.y;
  }

  multiplyCostWith(m1, m2) {
    return this.x * m1.y * m2.y;
  }
}

Matrix.createMatrixArray = function(arr) {
  let matrixArr = [];
  for (let i = 0; i < arr.length; i+=2 ) {
    let matrix = new Matrix(arr[i], arr[i + 1]);
    matrixArr.push(matrix);
  }
  return matrixArr;
}

function key(i, j) {
  return i + '_' + j;
}

function set(t, i, j, val) {
  t[key(i, j)] = val;
}

function get(t, i, j) {
  return t[key(i, j)];
}

function matrixChainOrder(matrixArr) {
  let m = {};
  let s = {};
  let n = matrixArr.length;
  for (let i = 1; i <= n; i++) {
    set(m, i, i, 0);
  }
  for (let l = 2; l <= n; l++) {
    for (let i = 1; i <= n - l + 1; i++) {
      let j = i + l - 1;
      set(m, i, j, Infinity);
      for (let k = i; k < j; k++) {
        let mi = matrixArr[i - 1];
        let mk = matrixArr[k - 1];
        let mj = matrixArr[j - 1];
        let m_i_j = get(m, i, k) + get(m, k + 1, j) + mi.multiplyCostWith(mk, mj);
        if (m_i_j < get(m, i, j)) {
          set(m, i, j, m_i_j);
          set(s, i, j, k);
        }
      }
    }
  }
  return [m, s];
}

function getOptimalParens(s, i, j) {
  let ret = '';
  if (i === j) {
    ret += i;
  } else {
    ret += '(';
    ret += getOptimalParens(s, i, get(s, i, j));
    ret += getOptimalParens(s, get(s, i, j) + 1, j);
    ret += ')';
  }
  return ret;
}

module.exports = {
  matrixChainOrder,
  getOptimalParens,
  get,
  Matrix
};
