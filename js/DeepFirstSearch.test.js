const DeepFirstSearch = require('./DeepFirstSearch');
const createGraph = require('./createGraph');

describe('[DeepFirstSearch] marked', () => {
  const graph = createGraph.createTinyG();
  const dfs0 = new DeepFirstSearch(graph, 0);
  it('should connected with 0 and 1', () => {
    expect(dfs0.marked(1)).toBe(true);
  });
  it('should connected with 0 and 4', () => {
    expect(dfs0.marked(4)).toBe(true);
  });
  it('should not connected with 0 and 7', () => {
    expect(dfs0.marked(7)).toBe(false);
  });
  const dfs7 = new DeepFirstSearch(graph, 7);
  it('should connected with 7 and 8', () => {
    expect(dfs7.marked(8)).toBe(true);
  });
  it('should not connected with 7 and 9', () => {
    expect(dfs7.marked(9)).toBe(false);
  });
});

describe('[DeepFirstSearch] count', () => {
  it('should has 7 vertices connected to 0', () => {
    const graph = createGraph.createTinyG();
    const dfs0 = new DeepFirstSearch(graph, 0);
    expect(dfs0.count()).toBe(7);
  });
  it('should has 2 vertices connected to 7', () => {
    const graph = createGraph.createTinyG();
    const dfs7 = new DeepFirstSearch(graph, 7);
    expect(dfs7.count()).toBe(2);
  });
  it('should has 4 vertices connected to 3', () => {
    const graph = createGraph.createTinyG();
    const dfs9 = new DeepFirstSearch(graph, 9);
    expect(dfs9.count()).toBe(4);
  });
});