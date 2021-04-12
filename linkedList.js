class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value) {
    let node = new Node(value);
    let current = this.head;
    if (!current) {
      this.head = node;
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;

    return node;
  }

  get(index) {
    let current = this.head;
    let count = 0;
    while (count < index) {
      current = current.next;
      count++;
    }

    return current.value;
  }

  delete(index) {
    let current = this.head;
    let remove;
    let before;
    let count = 0;

    if (index === 0) {
      remove = this.head;
      this.head = this.head.next;
      this.size--;
      return remove;
    }

    while (count < index) {
      before = current;
      current = current.next;
      count++;
    }
    remove = current;
    before.next = remove.next;
    this.size--;
    return remove;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

LinkedList.prototype.toString = function () {
  let string = '[';

  for (let i = 0; i < linkedList.size; i++) {
    string += linkedList.get(i);
    if (i !== linkedList.size - 1) string += ', ';
  }

  string += ']';

  return string;
};

let linkedList = new LinkedList();

for (let i = 0; i < 100; i++) linkedList.add(i);

for (let j = 0; j < 50; j++) linkedList.delete(j);

console.log(linkedList.toString());
console.log(linkedList.size);
