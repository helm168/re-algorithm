const {
  arrayIsOrderASC,
  randomArr,
} = require('./utils');

describe('function arrayIsOrderASC', () => {
  it('black array is order asc', () => {
    const arr = [];
    expect(arrayIsOrderASC(arr)).toBe(true);
  });

  it('array with one element is order asc', () => {
    const arr = [1];
    expect(arrayIsOrderASC(arr)).toBe(true);
  });

  it('array with same element is order asc', () => {
    const arr = [1, 1];
    expect(arrayIsOrderASC(arr)).toBe(true);
  });

  it('shuffle array is not order asc', () => {
    const arr = [10, 8, 7];
    expect(arrayIsOrderASC(arr)).toBe(false);
  });

  it('asc array is order asc', () => {
    const arr = [6, 7, 8];
    expect(arrayIsOrderASC(arr)).toBe(true);
  });
});

describe('function randomArr', () => {
  // TODO
});

