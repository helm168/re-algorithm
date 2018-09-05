const Graph = require('./Graph');
const createGraph = require('./createGraph');

describe('[Graph] V', () => {
  it('should return correct vertex', () => {
    const g = createGraph.createTinyG();
    expect(g.V()).toBe(13);
  });
});

describe('[Graph] E', () => {
  it('should return correct edge', () => {
    const g = createGraph.createTinyG();
    expect(g.E()).toBe(13);
  });
});

describe('[Graph] adj', () => {
  it('should return iterator', () => {
    const g = createGraph.createTinyG();
    for (let i of g.adj(0));
    expect(true).toBe(true);
  });
  it('should get all adjacency of v', () => {
    const g = createGraph.createTinyG();
    const iter = g.adj(0);
    const adjsStr = '1,2,5,6';
    let adjs = [];
    for (let i of iter) {
      adjs.push(i);
    }
    expect(adjs.sort().join(',')).toBe(adjsStr);
  });
});

describe('[Graph] addEdge', () => {
  it('should increase one edge', () => {
    const g = createGraph.createTinyG();
    const e = g.E();
    g.addEdge(7, 9);
    expect(g.E()).toBe(e + 1);
  });
  it('should add two adjacency', () => {
    const g = createGraph.createTinyG();
    g.addEdge(7, 9);
    let adjs = g._adjs[7];
    expect(adjs.includes(9)).toBe(true);
    adjs = g._adjs[9];
    expect(adjs.includes(7)).toBe(true);
  });
});