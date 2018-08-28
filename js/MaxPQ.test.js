const MaxPQ = require('./MaxPQ');

describe('[MaxPQ] isEmpty', () => {
  it('should be empty when init', () => {
    const pq = new MaxPQ();
    expect(pq.isEmpty()).toBe(true);
  });
  it('should be empty after insert and delMax same times', () => {
    const pq = new MaxPQ();
    pq.insert(1);
    pq.insert(2);
    pq.insert(3);
    pq.delMax();
    pq.delMax();
    pq.delMax();
    expect(pq.isEmpty()).toBe(true);
  });
});

describe('[MaxPQ] size', () => {
  it('should be n after insert n times', () => {
    let n = 5;
    const pq = new MaxPQ();
    for(let i = 0; i < n; i++) {
      pq.insert(i);
    }
    expect(pq.size()).toBe(n);
  });
});

describe('[MaxPQ] insert', () => {
  it('should go to top when insert max', () => {
    const pq = new MaxPQ();
    pq.insert(10);
    expect(pq._pq[1]).toBe(10);
    pq.insert(9);
    expect(pq._pq[1]).toBe(10);
    pq.insert(20);
    expect(pq._pq[1]).toBe(20);
  });
});

describe('[MaxPQ] delMax', () => {
  it('should return null when pq is empty', () => {
    const pq = new MaxPQ();
    expect(pq.delMax()).toBe(null);
  });
  it('should return max', () => {
    const pq = new MaxPQ();
    pq.insert(10);
    pq.insert(3);
    pq.insert(15);
    pq.insert(11);
    expect(pq.delMax()).toBe(15);
    expect(pq.delMax()).toBe(11);
    expect(pq.delMax()).toBe(10);
    expect(pq.delMax()).toBe(3);
  });
});

describe('[MaxPQ] max', () => {
  it('should get max', () => {
    const pq = new MaxPQ();
    pq.insert(10);
    pq.insert(3);
    pq.insert(15);
    pq.insert(11);
    expect(pq.max()).toBe(15);
    expect(pq.max()).toBe(15);
  });
});