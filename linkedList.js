export class LinkedList {
  constructor() {
    // Initialize the head of the linked list to null
    this.head = null;
  }

  append(value) {
    let tmp = this.head;
    if (!tmp) {
      // If the list is empty, set the new node as the head
      this.head = new Node(value);
    } else {
      while (tmp.next !== null) {
        // Traverse the list to find the last node
        tmp = tmp.next;
      }
      // Append the new node to the end of the list
      tmp.next = new Node(value);
    }
  }

  prepend(value) {
    this.head = new Node(value, this.head);
  }

  size() {
    let tmp = this.head;
    let size = 0;
    while (tmp !== null) {
      size++;
      tmp = tmp.next;
    }
    return size;
  }

  getHead() {
    return this.head;
  }

  tail() {
    let tmp = this.head;
    while (tmp.next !== null) {
      tmp = tmp.next;
    }
    return tmp;
  }

  at(index) {
    let tmp = this.head;
    let count = 0;
    while (count < index) {
      tmp = tmp.next;
      count++;
    }
    return tmp;
  }

  pop() {
    let cur = this.head;
    let prev;

    while (cur.next !== null) {
      prev = cur;
      cur = cur.next;
    }
    prev.next = null;
  }

  contains(value) {
    let tmp = this.head;

    while (tmp !== null) {
      if (tmp.data === value) {
        return true;
      }
      tmp = tmp.next;
    }
    return false;
  }

  find(key) {
    let tmp = this.head;
    let index = 0;

    while (tmp !== null) {
      if (tmp.data[0] === key) {
        return tmp.data[1];
      }
      index++;
      tmp = tmp.next;
    }
    return null;
  }

  keysArray() {
    let tmp = this.head;
    let array = [];

    while (tmp !== null) {
      array.push(tmp.data[0]);
      tmp = tmp.next;
    }
    return array;
  }

  valuesArray() {
    let tmp = this.head;
    let array = [];

    while (tmp !== null) {
      array.push(tmp.data[1]);
      tmp = tmp.next;
    }
    return array;
  }

  toArray() {
    let tmp = this.head;
    let array = [];

    while (tmp !== null) {
      array.push([tmp.data[0], tmp.data[1]]);
      tmp = tmp.next;
    }
    return array;
  }

  toString() {
    let tmp = this.head;
    let str = "";

    while (tmp !== null) {
      str += `${tmp.data} -> `;
      tmp = tmp.next;
    }
    return (str += "null");
  }

  insertAt(value, index) {
    let cur = this.head;
    let count = 0;
    let prev;

    if (index === 0) {
      return list.prepend(value);
    }
    while (count < index) {
      prev = cur;
      cur = cur.next;
      count++;
    }
    prev.next = new Node(value, cur);
  }

  removeAt(index) {
    let cur = this.head;
    let prev;
    let count = 0;

    if (index === 0) {
      return (this.head = cur.next);
    }

    while (count < index) {
      prev = cur;
      cur = cur.next;
      count++;
    }
    prev.next = cur.next;
  }

  remove(key) {
    let cur = this.head;
    let prev;
    let index = 0;

    while (cur !== null) {
      if (cur.data[0] === key && index === 0) {
        // If the node is the head, set the head to the next node
        this.head = cur.next;
        return true;
      } else if (cur.data[0] === key) {
        prev.next = cur.next;
        return true;
      }
      index++;
      prev = cur;
      cur = cur.next;
    }
    return false;
  }
}

class Node {
  constructor(data = null, next = null) {
    this.data = data; // Value stored in the node
    this.next = next; // Reference to the next node in the linked list
  }
}
