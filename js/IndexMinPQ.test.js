const IndexMinPQ = require('./IndexMinPQ');

describe('[IndexMinPQ] Insert', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });

  it('should insert with (1, 0.5)', () => {
    const res = pq.insert(1, 0.5);
    expect(res).toBe(true);
  });
  it('should not insert with a index twice', () => {
    pq.insert(1, 0.5);
    const res = pq.insert(1, 0.5);
    expect(res).toBe(false);
  });
  it('should not insert with index which greater than maxN', () => {
    const res = pq.insert(maxN, 0.5);
    expect(res).toBe(false);
  });
  it('should insert to pq top with the smallest key', () => {
    pq.insert(3, 3);
    expect(pq._pq[1]).toBe(3);
    pq.insert(1, 1);
    expect(pq._pq[1]).toBe(1);
  });
});

describe('[IndexMinPQ] delMin', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });
  it('should delete the minimum element', () => {
    const minimum = 1;
    pq.insert(1, minimum + 2);
    pq.insert(2, minimum);
    pq.insert(3, minimum * 4);
    const delMin = pq.delMin();
    expect(delMin).toBe(minimum);
    expect(pq.keyOf(2)).toBe(null);
  });
  it('should return null when there is no element', () => {
    expect(pq.delMin()).toBe(null);
  });
});

describe('[IndexMinPQ] delete', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });
  it('should delete the element with given index', () => {
    pq.insert(1, 0.01);
    pq.insert(2, 0.02);
    pq.insert(4, 0.04);
    expect(pq.delete(1)).toBe(0.01);
    expect(pq.delete(4)).toBe(0.04);
  });
  it('should return null when given index is no exist', () => {
    expect(pq.delete(1)).toBe(null);
  });
  it('should return null when given index is greater then maxN', () => {
    expect(pq.delete(6)).toBe(null);
  });
});

describe('[IndexMinPQ] changeKey', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
    pq.insert(1, 0.2);
    pq.insert(0, 0.3);
  });
  it('should change key with given index and key', () => {
    const res = pq.changeKey(1, 0.3);
    expect(res).toBe(true);
    expect(pq.keyOf(1)).toBe(0.3);
  });
  it('should become min when change key to smallest', () => {
    pq.changeKey(1, 0.1);
    expect(pq.delMin()).toBe(0.1);
  });
  it('should not change key with given index which does\'t exist', () => {
    const res = pq.changeKey(2, 0.3);
    expect(res).toBe(false);
  });
  it('should not change key with given index which out of bound', () => {
    const res = pq.changeKey(maxN, 0.3);
    expect(res).toBe(false);
  });
});

describe('[IndexMinPQ] decreaseKey', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
    pq.insert(0, 0.2);
    pq.insert(1, 0.1);
    pq.insert(3, 0.5);
    pq.insert(4, 0.15);
  });
  it('should decrease key when given index and key', () => {
    const res = pq.decreaseKey(0, 0.18);
    expect(res).toBe(true);
    expect(pq.keyOf(0)).toBe(0.18);
  });
  it('should not decrease key when given key bigger than the key to changed', () => {
    const res = pq.decreaseKey(0, 0.22);
    expect(res).toBe(false);
    expect(pq.keyOf(0)).toBe(0.2);
  });
  it('should not decrease key with given index which does\'t exist', () => {
    const res = pq.decreaseKey(2, 0.3);
    expect(res).toBe(false);
  });
  it('should not decrease key with given index which out of bound', () => {
    const res = pq.decreaseKey(maxN, 0.3);
    expect(res).toBe(false);
  });
});

describe('[IndexMinPQ] increaseKey', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
    pq.insert(0, 0.2);
    pq.insert(1, 0.1);
    pq.insert(3, 0.5);
    pq.insert(4, 0.15);
  });
  it('should increase key when given index and key', () => {
    const res = pq.increaseKey(0, 0.28);
    expect(res).toBe(true);
    expect(pq.keyOf(0)).toBe(0.28);
  });
  it('should not increase key when given key smaller than the key to changed', () => {
    const res = pq.increaseKey(0, 0.12);
    expect(res).toBe(false);
    expect(pq.keyOf(0)).toBe(0.2);
  });
  it('should not decrease key with given index which does\'t exist', () => {
    const res = pq.increaseKey(2, 0.3);
    expect(res).toBe(false);
  });
  it('should not decrease key with given index which out of bound', () => {
    const res = pq.increaseKey(maxN, 0.3);
    expect(res).toBe(false);
  });
});

describe('[IndexMinPQ] size', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });
  it('should get the rigth size', () => {
    pq.insert(0, 0.2);
    expect(pq.size()).toBe(1);
    pq.insert(1, 0.1);
    expect(pq.size()).toBe(2);
    pq.insert(3, 0.5);
    expect(pq.size()).toBe(3);
    pq.delete(3, 0.5);
    expect(pq.size()).toBe(2);
  });
});

describe('[IndexMinPQ] isEmpty', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });
  it('should be empty after create', () => {
    expect(pq.isEmpty()).toBe(true);
  });
  it('should not empty after insert', () => {
    pq.insert(0, 1);
    expect(pq.isEmpty()).toBe(false);
  });
  it('should not empty after delete', () => {
    pq.delete(0);
    expect(pq.isEmpty()).toBe(true);
  });
});

describe('[IndexMinPQ] contains', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });
  it('should not contains before insert', () => {
    expect(pq.contains(1)).toBe(false);
  });
  it('should contains after insert', () => {
    pq.insert(1, 10);
    expect(pq.contains(1)).toBe(true);
  });
  it('should not contains after delete', () => {
    pq.delete(1);
    expect(pq.contains(1)).toBe(false);
  });
});

describe('[IndexMinPQ] minIndex', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });
  it('should return min index with -1 when empty', () => {
    expect(pq.minIndex()).toBe(-1);
  });
  it('should return min index', () => {
    pq.insert(4, 1);
    expect(pq.minIndex()).toBe(4);
  });
  it('should return min index with -1 after delete to  empty', () => {
    pq.delete(4);
    expect(pq.minIndex()).toBe(-1);
  });
});

describe('[IndexMinPQ] minKey', () => {
  const maxN = 5;
  let pq;
  beforeEach(() => {
    pq = new IndexMinPQ(maxN);
  });
  it('should return min key with null when empty', () => {
    expect(pq.minKey()).toBe(null);
  });
  it('should return min key', () => {
    pq.insert(4, 1);
    expect(pq.minKey()).toBe(1);
  });
  it('should return min key with null after delete to  empty', () => {
    pq.delete(4);
    expect(pq.minKey()).toBe(null);
  });
});
