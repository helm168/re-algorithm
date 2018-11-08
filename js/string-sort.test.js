const sort = require('./string-sort');

function arrayIsOrderASC(arr) {
  let order = true;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i- 1].key > arr[i].key) {
      order = false;
      break;
    }
  }
  return order;
}

function isArrayEqual(one, other) {
  if (one.length !== other.length) return false;
  let equal = true;
  for(let i = 0; i < one.length; i++) {
    if(one[i] !== other[i]) {
      equal = false;
      break;
    }
  }
  return equal;
}

describe('keyIndextedStringSort', () => {
  const arr = [
    { key: 2, name: 'Anderson' },
    { key: 3, name: 'Brown' },
    { key: 3, name: 'Davis' },
    { key: 4, name: 'Garcia' },
    { key: 1, name: 'Harris' },
    { key: 3, name: 'Jackson' },
    { key: 4, name: 'Johnson' },
    { key: 3, name: 'Jones' },
    { key: 1, name: 'Martin' },
    { key: 2, name: 'Martinez' },
    { key: 2, name: 'Miller' },
    { key: 1, name: 'Moore' },
    { key: 2, name: 'Robinson' },
    { key: 4, name: 'Smith' },
    { key: 3, name: 'Taylor' },
    { key: 4, name: 'Thomas' },
    { key: 4, name: 'Thompson' },
    { key: 2, name: 'White' },
    { key: 3, name: 'Williams' },
    { key: 4, name: 'Wilson' },
  ];
  it('should sort array', () => {
    sort.keyIndextedStringSort(arr, 5);
    expect(arrayIsOrderASC(arr)).toBe(true);
  });
  it('should sort array2', () => {
    sort.keyIndextedStringSort2(arr, 5);
    expect(arrayIsOrderASC(arr)).toBe(true);
  });
});

describe('lsd', () => {
  const inputArr = [
    '4PGC938',
    '2IYE230',
    '3CIO720',
    '1ICK750',
    '1OHV845',
    '4JZY524',
    '1ICK750',
    '3CIO720',
    '1OHV845',
    '1OHV845',
    '2RLA629',
    '2RLA629',
    '3ATW723'
  ];
  const sortedArr = [
    '1ICK750',
    '1ICK750',
    '1OHV845',
    '1OHV845',
    '1OHV845',
    '2IYE230',
    '2RLA629',
    '2RLA629',
    '3ATW723',
    '3CIO720',
    '3CIO720',
    '4JZY524',
    '4PGC938'
  ]
  it('should sort array', () => {
    const w = inputArr[0].length;
    const outputArr = sort.lsd(inputArr, w);
    expect(isArrayEqual(outputArr, sortedArr)).toBe(true);
  });
});

describe('msd', () => {
  const inputArr = [
    'she',
    'sells',
    'seashells',
    'by',
    'the',
    'seashore',
    'the',
    'shells',
    'she',
    'sells',
    'are',
    'surely',
    'seashells'
  ];
  const sortedArr = [
    'are',
    'by',
    'seashells',
    'seashells',
    'seashore',
    'sells',
    'sells',
    'she',
    'she',
    'shells',
    'surely',
    'the',
    'the'
  ];
  it('should sort array', () => {
    const outputArr = sort.msd(inputArr);
    expect(isArrayEqual(outputArr, sortedArr)).toBe(true);
  });
});

describe('quick3string', () => {
  const inputArr = [
    'she',
    'sells',
    'seashells',
    'by',
    'the',
    'seashore',
    'the',
    'shells',
    'she',
    'sells',
    'are',
    'surely',
    'seashells'
  ];
  const sortedArr = [
    'are',
    'by',
    'seashells',
    'seashells',
    'seashore',
    'sells',
    'sells',
    'she',
    'she',
    'shells',
    'surely',
    'the',
    'the'
  ];
  it('should sort array', () => {
    const outputArr = sort.quick3string(inputArr);
    expect(isArrayEqual(outputArr, sortedArr)).toBe(true);
  });
});
