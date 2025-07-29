import { Node } from "./ll_Node.js";

class LinkedList {
    constructor() {
        this.head = null; //head points to null
    }

    append(value) {
        let currNode = new Node(value);
        if (!this.head) {
            this.head = currNode;
        } else {
            //if head exists, attach it to tail
            let tail = this.head;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = currNode;
        }
    }

    prepend(value) {
        if (this.head) {
            const newHead = new Node(value);
            newHead.next = this.head;
            this.head = newHead;
        } else {
            this.head = new Node(value);
        }
    }

    size() {
        let ct = 0;
        let head = this.head;
        while (head) {
            ct++;
            head = head.next;
        }
        return ct;
    }

    head() {
        return this.head;
    }

    tail() {
        let temp = this.head;
        if (!temp) return temp;
        while (temp.next) {
            temp = temp.next;
        }
        return temp;
    }

    at(ind) {
        let temp = this.head;
        let i = 0;
        while (i < ind && temp) {
            temp = temp.next;
            i++;
        }
        return temp;
    }

    pop() {
        if (!this.head) return null;
        if (!this.head.next) {
            this.head = null;
            return;
        }

        let temp = this.head;
        let prev = null;
        while (temp.next) {
            prev = temp;
            temp = temp.next;
        }
        //tmep's at tail now, prev is before it.
        prev.next = null;
    }

    contains(value) {
        if (!this.head) return false;
        let temp = this.head;
        while (temp) {
            if (temp.value === value) {
                return true;
            }
            temp = temp.next;
        }
        return false;
    }

    find(value) {
        if (!this.head) return null;
        let temp = this.head;
        let i = 0;

        while (temp) {
            if (temp.value === value) {
                return i;
            }
            temp = temp.next;
            i++;
        }
        return null;
    }

    toString() {
        let head = this.head;
        let str = "";
        while (head) {
            str += `${head.value} -> `;
            head = head.next;
        }
        str += "null";
        return str;
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
            return;
        }
        let i = 0;
        let temp = this.head;
        let prev = null;
        while (temp && i < index) {
            prev = temp;
            temp = temp.next;
            i++;
        }
        if (prev) {
            let newNode = new Node(value);
            prev.next = newNode;
            newNode.next = temp;
        }
    }

    removeAt(index) {
        if (!this.head) return;
        if (index === 0) {
            this.head = this.head.next;
            return;
        }

        let temp = this.head;
        let prev = null;
        let i = 0;
        while (temp && i < index) {
            prev = temp;
            temp = temp.next;
            i++;
        }

        if (temp) {
            prev.next = temp.next;
        }
    }
}

export { LinkedList };
