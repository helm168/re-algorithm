const Graph = require('./Graph');

const tinyG = [
  13,
  [0, 5],
  [4, 3],
  [0, 1],
  [9, 12],
  [6, 4],
  [5, 4],
  [0, 2],
  [11, 12],
  [9, 10],
  [0, 6],
  [7, 8],
  [9, 11],
  [5, 3]
];

const tinyGG = [
  6,
  [0, 5],
  [2, 4],
  [2, 3],
  [1, 2],
  [0, 1],
  [3, 4],
  [3, 5],
  [0, 2],
];

module.exports = {
  createTinyG: function() {
    return new Graph(tinyG);
  },
  createTinyGG: function() {
    return new Graph(tinyGG);
  }
};