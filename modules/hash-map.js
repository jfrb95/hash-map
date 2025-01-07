import { LinkedList } from "./linked-list.js";

const log = console.log;

export function HashMap(capacity=16) {
    const LOAD_FACTOR = 0.75
    let length = 0;

    function checkOutOfBounds(index) {
        if (index < 0 || index >= capacity/*buckets.length*/) {
            throw new Error(`Trying to access index out of bounds. Index = ${index}`);
        }
    }

    function hash(key) {
        
        if (typeof key !== 'string') {
            throw new Error('Key must be a string');
        }
        
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }
          

        //const hashCode = key % capacity;
     
        return hashCode;
    }

    let buckets = [];
    for (let i = 0; i < capacity; i+=1) {
        buckets.push(LinkedList());
    }
    
    return {
        set(key, value) {
            const index = hash(key);
            checkOutOfBounds(index);

            if (buckets[index].size) {
                let currentNode = buckets[index].head;
                while (currentNode) {
                    if (currentNode.value.key === key) {
                        currentNode.value.value = value;
                        return;
                    }
                    currentNode = currentNode.next;
                }
                buckets[index].append({ key, value });
            } else {
                buckets[index].append({ key, value });
            }
            length += 1;

            //UPDATING SIZE BELOW:
            if (length > LOAD_FACTOR * capacity) {
                capacity = 2 * capacity;
                const entries = this.entries();
                this.clear();

                for (const entry of entries) {
                    this.set(entry[0], entry[1]);
                }
            }
        },
        get(key) {
            const index = hash(key);
            checkOutOfBounds(index);

            const list = buckets[index];

            let currentNode = list.head;
            while (currentNode) {
                if (currentNode.value.key === key) {
                    return currentNode.value.value;
                }
                currentNode = currentNode.next;
            }

            return null;
        },
        has(key) {
            const index = hash(key);
            checkOutOfBounds(index);

            let currentNode = buckets[index].head;
            while(currentNode) {
                if (currentNode.value.key === key) {
                    return true;
                }
                currentNode = currentNode.next;
            }
            return false;
        },
        remove(key) {
            const index = hash(key);
            checkOutOfBounds(index);

            if (!buckets[index].size) {
                return false;
            }

            let currentNode = buckets[index].head;
        
            if (currentNode.value.key === key) {
                buckets[index].removeAt(0);
                length -= 1;
                return true;
            }
            
            while (currentNode.next) {
                if (currentNode.next.value.key === key) {
                    currentNode.next = currentNode.next.next;
                    length -= 1;
                    return true;
                }
                currentNode = currentNode.next;
            }
            return false;
        },
        length() {
            return length;
        },
        clear() {
            length = 0;
            buckets = [];
            for (let i = 0; i < capacity; i+=1) {
                buckets.push(LinkedList());
            }
        },
        keys() {
            const keys = [];

            buckets.forEach((bucket) => {
                let currentNode = bucket.head;
                while (currentNode) {
                    keys.push(currentNode.value.key);
                    currentNode = currentNode.next;
                }
            });

            return keys;
        },
        values() {
            const values = [];

            buckets.forEach((bucket) => {
                let currentNode = bucket.head;
                while (currentNode) {
                    values.push(currentNode.value.value);
                    currentNode = currentNode.next;
                }
            });

            return values;
        },
        entries() {
            const entries = [];

            buckets.forEach((bucket) => {
                let currentNode = bucket.head;
                while (currentNode) {
                    const pair = [];
                    pair.push(currentNode.value.key);
                    pair.push(currentNode.value.value);
                    entries.push(pair);
                    currentNode = currentNode.next;
                }
            });

            return entries;
        },
        get loadLevel() {
            return LOAD_FACTOR * capacity;
        }
    }

}
