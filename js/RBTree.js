const R = 'red';
const B = 'black';

const sentinel = {
  color: B,
  leaf: true
}

class RBTree {
  constructor() {
    this.root = sentinel;
  }

  inorderWalk(callback) {
    this.inorderWalkAt(this.root, callback);
  }

  inorderWalkAt(z, callback) {
    if (z && z !== sentinel) {
      this.inorderWalkAt(z.left, callback);
      callback && callback(z);
      this.inorderWalkAt(z.right, callback);
    }
  }

  insert(z) {
    let y = sentinel;
    let x = this.root;
    while(x && x !== sentinel) {
      y = x;
      if (z.key < x.key) {
        x = x.left;
      } else {
        x = x.right;
      }
    }
    z.p = y;
    if (y === sentinel) {
      this.root = z;
    } else if (z.key < y.key) {
      y.left = z;
    } else {
      y.right = z;
    }
    z.color = R;
    z.left = sentinel;
    z.right = sentinel;
    this.insertFixup(z);
  }

  insertFixup(z) {
    while (z.p.color === R) {
      if (z.p === z.p.p.left) {
        let y = z.p.p.right;
        if (y.color === R) {
          z.p.color = B;
          y.color = B;
          z.p.p.color = R;
          z = z.p.p;
        } else if (z === z.p.right) {
          z = z.p;
          this.leftRotate(z);
        } else {
          z.p.color = B;
          z.p.p.color = R;
          this.rightRotate(z.p.p);
        }
      } else {
        let y = z.p.p.left;
        if (y.color === R) {
          y.color = B;
          z.p.color = B;
          z.p.p.color = R;
          z = z.p.p;
        } else if (z === z.p.left) {
          z = z.p;
          this.rightRotate(z);
        } else {
          z.p.color = B;
          z.p.p.color = R;
          this.leftRotate(z.p.p);
        }
      }
    }
    this.root.color = B;
  }

  leftRotate(x) {
    let y = x.right;
    let p = x.p;
    y.p = p;
    if (p === sentinel) {
      this.root = y;
    } else if (x === p.left) {
      p.left = y;
    } else {
      p.right = y;
    }
    x.right = y.left;
    y.left.p = x;
    y.left = x;
    x.p = y;
  }

  rightRotate(x) {
    let y = x.left;
    let p = x.p;
    y.p = p;
    if (p === sentinel) {
      this.root = y;
    } else if (x === p.left) {
      p.left = y;
    } else {
      p.right = y;
    }
    x.left = y.right;
    y.right.p = x;
    y.right = x;
    x.p = y;
  }

  transplant(x, y) {
    if (x.p === sentinel) {
      this.root = y;
    } else if (x.p.left === x) {
      x.p.left = y;
    } else {
      x.p.right = y;
    }
    y.p = x.p;
  }

  minimum(z) {
    while (z.left !== sentinel) {
      z = z.left;
    }
    return z;
  }

  delete(z) {
    if (z === sentinel) {
      console.error('delste sentinel');
    }
    let y = z;
    let yOriginalColor = y.color;
    let x;
    if (z.left === sentinel) {
      x = z.right;
      this.transplant(z, z.right);
    } else if (z.right === sentinel) {
      x = z.left;
      this.tranpslant(z, z.left);
    } else {
      y = this.minimum(z.right);
      yOriginalColor = y.color;
      x = y.right;
      if (y.p === z) {
        x.p = y;
      } else {
        this.transplant(y, x);
        y.right = z.right;
        y.right.p = y;
      }
      this.transplant(z, y);
      y.left = z.left;
      y.left.p = y;
      y.color = z.color;
    }
    if (yOriginalColor === B) {
      this.deleteFixup(x);
    }
  }

  deleteFixup(x) {
    while (x !== this.root && x.color === B) {
      if (x === x.p.left) {
        let w = x.p.right;
        if (w.color === R) {
          w.color = B;
          x.p.color = R;
          this.leftRotate(x.p);
          w = x.p.right;
        }
        if (w === sentinel || w.left === undefined || w.right === undefined) {
          debugger;
          return;
        }
        if (w.left.color === B && w.right.color === B) {
          w.color = R;
          x = x.p;
        } else if (w.right.color === B) {
          w.left.color = B;
          w.color = R;
          this.rightRotate(w);
          w = x.p.right;
        } else {
          w.color = x.p.color;
          x.p.color = B;
          w.right.color = B;
          this.leftRotate(x.p);
          x = this.root;
        }
      } else {
        let w = x.p.left;
        if (w.color === R) {
          w.color = B;
          x.p.color = R;
          this.rightRotate(x.p);
          w = x.p.left;
        }
        if (w.left.color === B && x.right.color === B) {
          w.color = R;
          x = x.p;
        } else if (w.left.color === B) {
          w.color = R;
          w.right.color = B;
          this.leftRotate(w);
          w = x.p.left;
        } else {
          w.color = w.p.color;
          w.p.color = B;
          w.left.color = B;
          this.rightRotate(x.p);
          x = this.root;
        }
      }
    }
    x.color = B;
  }

  _heightForTest(z) {
    if (!z || z === sentinel) return 0;
    return 1 + Math.max(this._heightForTest(z.left), this._heightForTest(z.right));
  }

  _blackHeightForTest(z) {
    if (!z || z === sentinel) return 0;
    let current = 0;
    if (z.color === B) current = 1;
    return current + Math.max(this._blackHeightForTest(z.left), this._blackHeightForTest(z.right));
  }

  // 红黑树不是balance树 
  _isBalancedForTest(z) {
    if (!z || z === sentinel) return true;
    let lh = this._heightForTest(z.left);
    let rh = this._heightForTest(z.right);
    if (Math.abs(lh - rh) <= 1 && this._isBalancedForTest(z.left)
      && this._isBalancedForTest(z.right)) return true;
    return false;
  }

  _inorderWalkLeafForTest(callback) {
    this._inorderWalkLeafAtForTest(this.root, callback);
  }

  _inorderWalkLeafAtForTest(z, callback) {
    if (!z) return;
    if (z === sentinel) return callback(z);
    this._inorderWalkLeafAtForTest(z.left, callback);
    this._inorderWalkLeafAtForTest(z.right, callback);
  }
}

RBTree.COLORS = {
  R,
  B,
};

RBTree.sentinel = sentinel;

module.exports = RBTree;

