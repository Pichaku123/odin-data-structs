import { LinkedList } from "../linkedList/ll.js";

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    hash(key) {
        let hshCode = 0;
        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hshCode = (prime * hshCode + key.charCodeAt(i)) % this.capacity;
        }
        return hshCode;
    }

    set(key, value) {
        const ind = this.hash(key); //gives hash key
        if (!this.buckets[ind]) {
            this.buckets[ind] = new LinkedList();
            this.buckets[ind].append({ key, value });
            this.size++;
        } else {
            //collision
            let node = this.buckets[ind].head;
            let found = false;
            while (node) {
                if (node.value.key === key) {
                    node.value.value = value;
                    found = true;
                    break;
                }
                node = node.next;
            }
            if (!found) {
                this.buckets[ind].append({ key, value });
                this.size++;
            }
        }

        if (this.size / this.capacity > this.loadFactor) {
            this.resize();
        }
    }

    get(key) {
        const ind = this.hash(key);
        const bucket = this.buckets[ind]; //returns arr element containing LL.

        if (!bucket) {
            return null;
        } else {
            let head = bucket.head;
            while (head != null) {
                if (head.value.key === key) {
                    return head.value.value;
                }
                head = head.next;
            }
            return null;
        }
    }

    has(key) {
        return this.get(key) !== null;
    }

    remove(key) {
        const ind = this.hash(key);
        const bucket = this.buckets[ind];

        if (!bucket) {
            return false;
        } else {
            let i = 0;
            let head = bucket.head;
            while (head) {
                if (head.value.key === key) {
                    bucket.removeAt(i);
                    this.size--;
                    return true;
                }
                head = head.next;
                i++;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
    }

    keys() {
        let res = [];
        for (let bucket of this.buckets) {
            //bucket is LL
            if (bucket) {
                let temp = bucket.head;
                while (temp) {
                    res.push(temp.value.key);
                    temp = temp.next;
                }
            }
        }
        return res;
    }

    values() {
        let res = [];
        for (let bucket of this.buckets) {
            //bucket is LL
            if (bucket) {
                let temp = bucket.head;
                while (temp) {
                    res.push(temp.value.value);
                    temp = temp.next;
                }
            }
        }
        return res;
    }

    entries() {
        let res = [];
        for (let bucket of this.buckets) {
            if (bucket) {
                let temp = bucket.head;
                while (temp) {
                    res.push([temp.value.key, temp.value.value]);
                    temp = temp.next;
                }
            }
        }
        return res;
    }

    resize() {
        let old = this.buckets;
        this.capacity *= 2;
        this.buckets = new Array(this.capacity).fill(null);
        this.size = 0;
        //put back again
        for (let bucket of old) {
            if (bucket) {
                let node = bucket.head;
                while (node) {
                    this.set(node.value.key, node.value.value);
                    node = node.next;
                }
            }
        }
    }
}

export { HashMap };
