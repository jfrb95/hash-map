import { LinkedList } from "./linked-list.js";

export function HashMap() {
    let capacity = 16;
    const LOAD_FACTOR = 0.75

    function checkOutOfBounds(index) {
        if (index < 0 || index >= capacity/*buckets.length*/) {
            throw new Error("Trying to access index out of bounds");
        }
    }

    function hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % capacity;
        }
     
        return hashCode;
    } 
}