const BreadthFirstPath = require('./BreadthFirstPaths');
const createGraph = require('./createGraph');

describe('[DeepFirstPath] hasPathTo', () => {
  const graph = createGraph.createTinyGG();
  const dfp0 = new BreadthFirstPath(graph, 0);
  it('should 0 hasPathTo 1', () => {
    expect(dfp0.hasPathTo(1)).toBe(true);
  });
  it('should 0 hasPathTo 3', () => {
    expect(dfp0.hasPathTo(3)).toBe(true);
  });
});

describe('[DeepFirstPath] pathTo', () => {
    const graph = createGraph.createTinyGG();
    const dfp0 = new BreadthFirstPath(graph, 0);
  it('should has correct path to 2', () => {
    expect(dfp0.pathTo(2).join('')).toBe('02');
  });
  it('should has correct path to 3', () => {
    expect(dfp0.pathTo(3).join('')).toBe('023');
  });
  it('should has correct path to 5', () => {
    expect(dfp0.pathTo(5).join('')).toBe('05');
  });
});