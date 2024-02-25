// if (index < 0 || index >= buckets.length) {
//   throw new Error("Trying to access index out of bound");
// }

import { LinkedList } from "./linkedList.js";

export class HashMap {
  constructor() {
    this.arr = new Array(16);
  }

  hash = (key) => {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.arr.length;
    }
    return hashCode;
  };

  isLoaded = () => {
    const capacity = this.arr.length;
    const loadFactor = 0.75;
    let filledBuckets = 0;

    for (const bucket of this.arr) {
      if (bucket !== undefined) {
        filledBuckets++;
      }
    }

    const load = filledBuckets / capacity;

    console.log("Load is " + load);

    return load >= loadFactor ? true : false;
  };

  grow = () => {
    const newArr = new Array(this.arr.length * 2);
    // Copying existing elements to the new array
    this.arr.forEach((bucket, index) => {
      if (bucket !== undefined) {
        newArr[index] = bucket;
      }
    });
    this.arr = newArr;
  };

  set = (key, value) => {
    const bucket = this.hash(key);

    if (this.isLoaded()) {
      this.grow();
      console.log(`Array grew to ${this.arr.length}`);
    }

    // If bucket is empty, create a new linked list and append the key-value pair
    if (this.arr[bucket] === undefined) {
      this.arr[bucket] = new LinkedList();
      this.arr[bucket].append([key, value]);
    } else {
      // Otherwise, append the key-value pair to the existing linked list
      this.arr[bucket].append([key, value]);
    }
  };

  get = (key) => {
    const bucket = this.hash(key);
    return this.arr[bucket]?.find(key) ?? null;
  };

  has = (key) => {
    const bucket = this.hash(key);
    return this.arr[bucket]?.find(key) ? true : false;
  };

  remove = (key) => {
    const bucket = this.hash(key);
    return this.arr[bucket].remove(key);
  };

  length = () => {
    let count = 0;
    for (const bucket of this.arr) {
      if (bucket !== undefined) {
        count += bucket.size();
      }
    }
    return count;
  };

  clear = () => {
    this.arr.fill(undefined);
  };

  keys = () => {
    let keys = [];
    for (const bucket of this.arr) {
      if (bucket !== undefined) {
        keys = keys.concat(bucket?.keysArray());
      }
    }
    return keys;
  };

  values = () => {
    let values = [];
    for (const bucket of this.arr) {
      if (bucket !== undefined) {
        values = values.concat(bucket?.valuesArray());
      }
    }
    return values;
  };

  entries = () => {
    let entries = [];
    for (const bucket of this.arr) {
      if (bucket !== undefined) {
        entries = entries.concat(bucket?.toArray());
      }
    }
    return entries;
  };
}
