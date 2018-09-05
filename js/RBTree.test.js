const RBTree = require('./RBTree');
const { R, B } = RBTree.COLORS;

const {
  arrayIsOrderASC,
  randomArr,
} = require('./utils');

// RBTree properties
// 1. Every node is either red or black
// 2. The root is black
// 3. Every leaf is black
// 4. If a node is red, then both its children are black
// 5. For each node, all simple path from the node to descendant leaves contains the same number of black nodes

function generateTree(nodeNumber) {
  let arr = randomArr(nodeNumber);
  let rb = new RBTree();
  for (let key of arr) {
    rb.insert({ key });
  }
  return rb;
}

function generateExer1332Tree() {
  let keys = [41, 38, 31, 12, 19, 8];
  let rb = new RBTree();
  let keyToNode = {};
  for (let key of keys) {
    let node = { key };
    keyToNode[key] = node;
    rb.insert(node);
  }
  // 删除测试用
  rb.__keyToNode = keyToNode;
  return rb;
}

function sharedBehaviorForRBTreePropertyViolate(rb) {
  describe('RBTree properties violate test', () => {
    // always be true
    //it('Every node is either red or black', () => {
    //  expect(true).toBe(true);
    //});

    it('The root is black', () => {
      expect(rb.root.color).toBe(B);
    });

    it('Every leaf is black', () => {
      rb._inorderWalkLeafForTest(node => expect(node.color).toBe(B));
    });

    it('If a node is red, then both its children are black', () => {
      rb.inorderWalk((node) => {
        if (node.color === R) {
          expect(node.left.color).toBe(B);
          expect(node.right.color).toBe(B);
        }
      });
    });

    it('For each node, all simple path from the node to descendant leaves contains the same number of black nodes', () => {
      let violate = false;
      rb.inorderWalk((node) => {
        let leftBlackHeight = rb._blackHeightForTest(node.left);
        let rightBlackHeight = rb._blackHeightForTest(node.right);
        if (leftBlackHeight !== rightBlackHeight) violate = true;
      });
      expect(violate).toBe(false);
    });

  });
}

describe('insert', () => {
  it('Introduction_To_Algorithms:exercises 13.3-2', () => {
    const colorMap = new Map();
    colorMap.set(41, B); 
    colorMap.set(38, B); 
    colorMap.set(31, B); 
    colorMap.set(12, B); 
    colorMap.set(19, R); 
    colorMap.set(8, R); 
    let rb = generateExer1332Tree();
    let resultColor = {};
    let orderArr = [];
    rb.inorderWalk((node) => {
      expect(node.color).toBe(colorMap.get(node.key));
      orderArr.push(node.key); 
    });
    expect(arrayIsOrderASC(orderArr)).toBe(true);
  });

  let rb = generateTree(100);
  sharedBehaviorForRBTreePropertyViolate(rb);
});

describe('delete', () => {
  describe('Introduction_To_Algorithms:exercises 13.4-3', () => {
    let rb = generateExer1332Tree();
    let keyToNode = rb.__keyToNode;
    delete rb.__keyToNode;
    // key to delete 8; 12; 19; 31; 38; 41
    it('Delete 8', () => {
      const colorMap = new Map();
      colorMap.set(41, B); 
      colorMap.set(38, B); 
      colorMap.set(31, B); 
      colorMap.set(12, B); 
      colorMap.set(19, R); 
      rb.delete(keyToNode[8]);
      rb.inorderWalk((node) => {
        expect(node.color).toBe(colorMap.get(node.key));
      });
    });
    it('Delete 12', () => {
      const colorMap = new Map();
      colorMap.set(41, B); 
      colorMap.set(38, B); 
      colorMap.set(31, R); 
      colorMap.set(19, B); 
      rb.delete(keyToNode[12]);
      rb.inorderWalk((node) => {
        expect(node.color).toBe(colorMap.get(node.key));
      });
    });
    it('Delete 19', () => {
      const colorMap = new Map();
      colorMap.set(41, B); 
      colorMap.set(38, B); 
      colorMap.set(31, B); 
      rb.delete(keyToNode[19]);
      rb.inorderWalk((node) => {
        expect(node.color).toBe(colorMap.get(node.key));
      });
    });
    it('Delete 31', () => {
      const colorMap = new Map();
      colorMap.set(41, R); 
      colorMap.set(38, B); 
      rb.delete(keyToNode[31]);
      rb.inorderWalk((node) => {
        expect(node.color).toBe(colorMap.get(node.key));
      });
    });
    it('Delete 38', () => {
      const colorMap = new Map();
      colorMap.set(41, B); 
      rb.delete(keyToNode[38]);
      rb.inorderWalk((node) => {
        expect(node.color).toBe(colorMap.get(node.key));
      });
    });
    it('Delete 41', () => {
      rb.delete(keyToNode[41]);
      expect(rb.root).toBe(RBTree.sentinel);
    });
  });
  let rb = generateTree(15);
  let nodeToDelete = [];
  let count = 0;
  rb.inorderWalk((node) => {
    if (count++ < 80) {
      nodeToDelete.push(node);
    }
  });
  nodeToDelete.forEach(node => {
    rb.delete(node);
//    sharedBehaviorForRBTreePropertyViolate(rb);
  });
//  rb.delete(rb.root.left);
//  sharedBehaviorForRBTreePropertyViolate(rb);
});

