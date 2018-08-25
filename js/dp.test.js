const { Matrix, matrixChainOrder, get, getOptimalParens } = require('./dp.js');

describe('matrixChainOrder', () => {
  it('Introduction_To_Algorithms:figure 15.5', () => {
    let matrixArray = Matrix
      .createMatrixArray([30, 35, 35, 15, 15, 5, 5, 10, 10, 20, 20, 25]);
    const [m, s] = matrixChainOrder(matrixArray);
    expect(get(m, 1, 6)).toBe(15125);
    const solution = getOptimalParens(s, 1, 6);
    expect(solution).toBe('((1(23))((45)6))');
  })
});
