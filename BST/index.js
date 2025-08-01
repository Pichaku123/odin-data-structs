class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
        //arr to set to arr(removes dupes), then sorted and used in buildtree
    }
    buildTree(arr) {
        if (arr.length === 0) return null;
        arr = [...new Set(arr)].sort((a, b) => a - b);
        const mid = Math.floor((arr.length) / 2);
        //mid element to node
        let midNode = new Node(arr[mid]);
        midNode.left = this.buildTree(arr.slice(0, mid)); //left half of arr is passed for making subnodes
        midNode.right = this.buildTree(arr.slice(mid + 1));
        return midNode;
    }

    insert(key, node = this.root) {
        if (!this.root) {
            this.root = new Node(key);
            return this.root;
        }
        if (!node) {
            return new Node(key);
        }
        //move left
        if (key < node.data) {
            node.left = this.insert(key, node.left);
        } else if (key > node.data) {
            node.right = this.insert(key, node.right);
        }
        return node;
    }

    delete(key, node = this.root) {
        if (!node) return null;
        
        if (key < node.data) {
            node.left = this.delete(key, node.left);
        } else if (key > node.data) {
            node.right = this.delete(key, node.right);
        } else {
            //found the node, now delete
            if (!node.left && !node.right) return null; //just delete if its a leaf, so no children

            if (!node.left) return node.right; //for 1 child on either left or right
            if (!node.right) return node.left; //same

            //2 children, replace with next largest one
            let temp = node.right; //move to right once to ensure all values are > key.
            while (temp.left) {
                //now we move left to find smallest value, and the first move to right means we get smallest value > key.
                temp = temp.left;
            }
            node.data = temp.data; //replacing now
            node.right = this.delete(temp.data, node.right); //to remove the duplicate in right subtree.
        }
        return node;
    }

    find(value, node = this.root) {
        if (!node) return null;
        if (value == node.data) return node;
        else if (value < node.data) return this.find(value, node.left);
        else return this.find(value, node.right);
    }

    levelOrderForEach(callback) {
        let q = [];
        if (this.root) q.push(this.root);
        while (q.length > 0) {
            let curr = q[0];
            if (curr.left) q.push(curr.left);
            if (curr.right) q.push(curr.right);
            callback(curr);
            q.shift();
        }
    }

    inOrderForEach(callback, node = this.root) {
        //left, root, right
        if (!callback) throw new Error("A callback is required!");
        if (!node) return null;
        this.inOrderForEach(callback, node.left);
        callback(node);
        this.inOrderForEach(callback, node.right);
    }

    preOrderForEach(callback, node = this.root) {
        //root, then left, then right
        if (!callback) throw new Error("A callback is required!");
        if (!node) return null;
        callback(node);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    postOrderForEach(callback, node = this.root) {
        //left, right, root
        if (!callback) throw new Error("A callback is required!");
        if (!node) return null;
        this.postOrderForEach(callback, node.left);
        this.postOrderForEach(callback, node.right);
        callback(node);
    }

    height(value) {
        const node = this.find(value);
        if (!node) return null;

        function count(node) {
            if (!node) return 0;
            const leftH = count(node.left);
            const rightH = count(node.right);
            return 1 + Math.max(leftH, rightH); //basically consider height of null node as 0, and add 1 to its parent.
        }
        return count(node) - 1; //count() gives height in terms of nodes, not edges.
    }

    depth(value) {
        let ct = 0;
      let node = this.root;
      if (!node) return null;
        while (node) {
            if (value === node.data) return ct;
            else if (value < node.data) node = node.left;
            else node = node.right;
            ct++;
        }
        return ct;
    }

    isBalanced(node = this.root) {
        let balanced = true;
        function helper(node) {
            if (!node) return 0; //0 height for null
            const leftH = helper(node.left); //checking if subtrees are balanced
            const rightH = helper(node.right);
            if (Math.abs(leftH - rightH) > 1) {
                balanced = false;
            }
            //leftH and rightH should have diff. of <=1 only.
            return Math.max(leftH, rightH) + 1;   //same logic as height();
        }
        helper(node);
        return balanced;
  }
  
  rebalance() {
    let root = this.root;
    let list = [];
    function addToList(node) {
      list.push(node.data);
    }
    this.levelOrderForEach(addToList);
    this.root = this.buildTree(list);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let arr = [1, 2, 5, 3, 9, 4, -1];
let op = new Tree(arr);
op.insert(10);
op.insert(6);
op.insert(5);
prettyPrint(op.root);
op.delete(5);
op.find(1);
// op.levelOrderForEach((node) => console.log(node.data));
// op.preOrderForEach((node) => console.log(node.data));
// op.postOrderForEach((node) => console.log(node.data));
// op.inOrderForEach((node) => console.log(node.data));
// console.log(op.depth(10));
prettyPrint(op.root);
