const createDigraph  = require('./createDigraph');
const DirectedCycle = require('./DirectedCycle');

describe('[DirectedCycle] hasCycle', () => {
  it('should has cycle', () => {
    const g = createDigraph.createTinyDG();
    const dc = new DirectedCycle(g);
    expect(dc.hasCycle()).toBe(true);
  })

  it('should has not cycle', () => {
    const g = createDigraph.createTinyDGG();
    const dc = new DirectedCycle(g);
    expect(dc.hasCycle()).toBe(false);
  })
});


describe('[DirectedCycle] cycle', () => {
  const expectedCycle = '3->5->4->3'
  it('should cycle path equals ' + expectedCycle, () => {
    const g = createDigraph.createTinyDG();
    const dc = new DirectedCycle(g);
    expect(dc.cycle().join('->')).toBe(expectedCycle);
  })
});