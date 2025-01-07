import { HashMap } from "./modules/hash-map.js";

//EXTRA CREDIT NOT DONE YET
//  implement hashset - same as hashmap but only keys no values;

const log = console.log;

const test = HashMap();

//test.set(1, 2);

//test.set(2, 5);

//test.set(17, 3);

//log(test.length());

//log(test.remove(17));

//test.clear();

//log(test.length());

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')


for (const pair of test.entries()) {
    log(pair);
}

log(test.length());
log(test.loadLevel);

test.set('moon', 'silver');

log(test.get('kite'));
log(test.has('ice cream'));
log(test.has('moon'));
log(test.length());
log(test.keys());
log(test.values());

test.clear();

for (const pair of test.entries()) {
    log(pair);
}

log(test.length());

