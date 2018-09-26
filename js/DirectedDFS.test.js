const createDigraph  = require('./createDigraph');
const DirectedDFS = require('./DirectedDFS');

describe('[DirectedDFS] marked', () => {
  const g = createDigraph.createTinyDG();
  const dfs = new DirectedDFS(g, 4);
  it('should connect with 4 and 2', () => {
    expect(dfs.marked(2)).toBe(true);
  })

  it('should not connect with 4 and 12', () => {
    expect(dfs.marked(12)).toBe(false);
  })
});
