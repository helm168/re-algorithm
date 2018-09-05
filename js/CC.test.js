const CC = require('./CC');
const createGraph = require('./createGraph');

describe('[CC] connected', () => {
  const graph = createGraph.createTinyG();
  const cc = new CC(graph);
  it('should 1 and 2 connected', () => {
    expect(cc.connected(1, 2)).toBe(true);
  });
  it('should 0 and 7 not connected', () => {
    expect(cc.connected(0, 7)).toBe(false);
  });
});

describe('[CC] count', () => {
  const graph = createGraph.createTinyG();
  const cc = new CC(graph);
  it('should has 3 connected component', () => {
    expect(cc.count()).toBe(3);
  });
});

describe('[CC] id', () => {
  const graph = createGraph.createTinyG();
  const cc = new CC(graph);
  it('should 0 has id 0', () => {
    expect(cc.id(0)).toBe(0);
  });
  it('should 6 has id 0', () => {
    expect(cc.id(6)).toBe(0);
  });
  it('should 7 has id 1', () => {
    expect(cc.id(7)).toBe(1);
  });
  it('should 9 has id 2', () => {
    expect(cc.id(9)).toBe(2);
  });
});