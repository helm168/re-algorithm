const createUF = require('./createUF');

describe('count', () => {
  it('should has two component', () => {
    const uf = createUF.createWeightedQuickUnionUF();
    expect(uf.count()).toBe(2);
  })
})
