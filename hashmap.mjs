import { LinkedList, Node } from "./linkedList.mjs";

export class HashMap {
  constructor(size = 16, loadFactor = 0.75) {
    this.size = size;
    this.loadFactor = loadFactor;
  }

  #buckets = [];

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  /**
   * Takes a key-value pair and stores them inside a Bucket at the index
   * obatined by hashing the key. Checks if a key already exists and in
   * that case updates it.
   * @param {*} key
   * @param {*} value
   * @returns
   */
  set(key, value) {
    const index = this.hash(key) % this.size;

    if (index < 0 || index >= this.size) {
      throw new Error("Trying to access index out of bound");
    }

    // If the bucket is empty, create a new Linked List.
    if (!this.#buckets[index]) {
      this.#buckets[index] = new LinkedList();
      this.#buckets[index].append([key, value]);
      this.grow();
      return;
    }

    // If the bucket has already any element...
    if (this.#buckets[index].head) {
      let cursor = this.#buckets[index].head;

      // ...check if the key exists and in that case update it!
      while (cursor) {
        if (cursor.data[0] === key) {
          cursor.data[1] = value;
          console.log(
            `Updated key '${key}' with value '${value}' at index ${index}.`
          );
          return;
        }
        cursor = cursor.next;
      }

      // Once the traversing is ended we can assume no keys are ovelapping.
      this.#buckets[index].append([key, value]);
      this.grow();
    }
  }

  /**
   * Returns the value for the given key. Returns null if the key is not found.
   */
  get(key) {
    const index = this.hash(key) % this.size;

    if (index < 0 || index > this.size) {
      throw new Error("Trying to access index out of bound");
    }

    // Return null immediately if the bucket is empty!
    if (!this.#buckets[index]) return null;

    // If the bucket has already any element...
    if (this.#buckets[index].head) {
      let cursor = this.#buckets[index].head;

      // ...check if the key exists and in that case return its value!
      while (cursor) {
        if (cursor.data[0] === key) {
          return cursor.data[1];
        }
        cursor = cursor.next;
      }

      // Once we traversed the list we can assume that the key has not been found.
      return null;
    }
  }

  /**
   * Cheks if the given key is inside the hashmap. Returns true in case the check
   * is successfull. Returns false otherwise.
   * @param {*} key
   * @returns
   */
  has(key) {
    const index = this.hash(key) % this.size;

    if (index < 0 || index >= this.size - 1) {
      throw new Error("Trying to access index out of bound");
    }

    // Return false immediately if the bucket is empty!
    if (!this.#buckets[index].head) return false;

    // If the bucket has already any element...
    if (this.#buckets[index].head) {
      let cursor = this.#buckets[index].head;

      // ...check if the key exists and in that case return true!
      while (cursor) {
        if (cursor.data[0] === key) {
          return true;
        }
        cursor = cursor.next;
      }

      // Once we traversed the list we can assume that the key has not been found.
      return false;
    }
  }

  remove(key) {
    const index = this.hash(key) % this.size;

    if (index < 0 || index >= this.size - 1) {
      throw new Error("Trying to access index out of bound");
    }

    // Return false immediately if the bucket is empty!
    if (!this.#buckets[index]) return false;

    // If the bucket has already any element...
    if (this.#buckets[index].head) {
      let cursor = this.#buckets[index].head;
      let insideBucketIndex = 0;

      // ...check if the key exists and in that case remove it from the bucket!
      while (cursor) {
        if (cursor.data[0] === key) {
          this.#buckets[index].removeAt(insideBucketIndex);

          return true;
        }
        cursor = cursor.next;
        insideBucketIndex++;
      }

      // Once we traversed the list we can assume that the key has not been found.
      return false;
    }
  }

  /**
   * Returns the number of keys inside the hashmap.
   * @returns
   */
  length() {
    let keys = 0;
    this.#buckets.forEach((bucket) => (keys += bucket.size));
    return keys;
  }

  /**
   * Clears the hashmap by popping every and each bucket.
   */
  clear() {
    while (this.#buckets.length > 0) this.#buckets.pop();
    console.info("Cleared the buckets.");
  }

  /**
   * Returns an array containing all the keys inside the Map.
   */
  keys() {
    let keysArray = [];

    this.#buckets.forEach((bucket) => {
      if (bucket.head) {
        let cursor = bucket.head;

        while (cursor) {
          keysArray.push(cursor.data[0]);
          cursor = cursor.next;
        }
      }
    });
    return keysArray;
  }

  /**
   * Returns an array containing all the values inside the Map.
   */
  values() {
    let valuesArray = [];

    this.#buckets.forEach((bucket) => {
      if (bucket.head) {
        let cursor = bucket.head;

        while (cursor) {
          valuesArray.push(cursor.data[1]);
          cursor = cursor.next;
        }
      }
    });
    return valuesArray;
  }
  /**
   * Returns an array containing all the key-value pairs inside the Map.
   */
  entries() {
    let pairArray = [];

    this.#buckets.forEach((bucket) => {
      if (bucket.head) {
        let cursor = bucket.head;

        while (cursor) {
          pairArray.push([cursor.data[0], cursor.data[1]]);
          cursor = cursor.next;
        }
      }
    });
    return pairArray;
  }

  grow() {
    const capacity = this.length();

    // Check if the current number of buckets has surpassed the load factor.
    if (capacity > this.loadFactor * this.size) {
      console.info("Map at", capacity, "capacity. Doubled the buckets.");
      this.size *= 2; // Grow the buckets!

      const clone = this.entries();
      this.#buckets = [];

      clone.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }
}
