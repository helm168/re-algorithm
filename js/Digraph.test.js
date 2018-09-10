const createDigraph  = require('./createDigraph');

describe('[Graph] V', () => {
  it('should return correct vertex', () => {
    const g = createDigraph.createTinyDG();
    expect(g.V()).toBe(13);
  });
});

describe('[Graph] E', () => {
  it('should return correct edge', () => {
    const g = createDigraph.createTinyDG();
    expect(g.E()).toBe(22);
  });
});

describe('[Graph] adj', () => {
  it('should return iterator', () => {
    const g = createDigraph.createTinyDG();
    for (let i of g.adj(0));
    expect(true).toBe(true);
  });
  it('should get all adjacency of v', () => {
    const g = createDigraph.createTinyDG();
    const iter = g.adj(0);
    const adjsStr = '5,1';
    let adjs = [];
    for (let i of iter) {
      adjs.push(i);
    }
    expect(adjs.join(',')).toBe(adjsStr);
  });
});

describe('[Graph] addEdge', () => {
  it('should increase one edge', () => {
    const g = createDigraph.createTinyDG();
    const e = g.E();
    g.addEdge(7, 9);
    expect(g.E()).toBe(e + 1);
  });
  it('should add one adjacency', () => {
    const g = createDigraph.createTinyDG();
    g.addEdge(7, 9);
    let adjs = g._adjs[7];
    expect(adjs.includes(9)).toBe(true);
    adjs = g._adjs[9];
    expect(adjs.includes(7)).toBe(false);
  });
});

describe('[Graph] reverse', () => {
  it('should reverse graph', () => {
    const g = createDigraph.createTinyDG();
    expect(g.adj(0).includes(5)).toBe(true);
    expect(g.adj(5).includes(0)).toBe(false);
    const reverseG = g.reverse();
    expect(reverseG.adj(0).includes(5)).toBe(false);
    expect(reverseG.adj(5).includes(0)).toBe(true);
  });
});