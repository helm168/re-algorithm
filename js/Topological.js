const DirectedCycle = require('./DirectedCycle');
const DepthFirstOrder = require('./DepthFirstOrder');

class Topological {
  constructor(graph) {
    const dc = new DirectedCycle(graph);
    this._order = null;
    if (!dc.hasCycle()) {
      const dfo = new DepthFirstOrder(graph);
      this._order = dfo.reversePost();
    }
  }

  isDAG() {
    return !!this._order;
  }

  order() {
    return this._order; 
  }
}

module.exports = Topological;