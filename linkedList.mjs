/**
 * A Node element is the single unit stored inside the Linked List. It holds
 * some data and a reference to the next Node in the list.
 */
export class Node {
  constructor(value, nextNode = null) {
    this.data = value;
    this.next = nextNode;
  }
}

/**
 * A class-based implementation of a Linked List data structure. Every node is
 * linked to the next in the list. A Linked List instance has different methods
 * that mimic the functionality of an Array. Elements can be added, removed,
 * inserted. An element can be - albeit linearly - searched for by index or value.
 */
export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Adds a new value at the end of the list.
   * @param {*} value
   */
  append(value) {
    if (this.head === null) {
      this.head = new Node(value);
      this.size++;

      console.info(`Added value '${this.head.data}' as list head.`);
    } else {
      let cursor = this.head;
      while (cursor.next != null) cursor = cursor.next;
      cursor.next = new Node(value);
      this.size++;

      console.info(`Added value '${cursor.next.data}' to the end of list.`);
    }
  }

  /**
   * Adds a new value at the start of the list.
   * @param {*} value
   * @returns
   */
  prepend(value) {
    if (this.head === null && this.size === 0) {
      console.error("Cannot prepend elements to an empty list!");
      return;
    }

    const formerHead = this.head;
    this.head = new Node(value, formerHead);
    this.size++;

    console.log(`Added value '${this.head.data}' at start of the list.`);
  }

  // The size of the List: has a getter and a setter method.
  set size(value) {
    this._size = value;
  }

  get size() {
    return this._size;
  }

  // The Head is the first element inside the List: has a getter and a setter method.
  set head(node) {
    this._head = node;
  }

  get head() {
    if (this._head != null) {
      return this._head;
    } else {
      return null;
    }
  }

  /**
   * Returns the last element of the List.
   * @returns
   */
  tail() {
    let cursor = this.head;
    while (cursor.next != null) cursor = cursor.next;
    return cursor;
  }

  /**
   * Returs the Node at the given index.
   * @param {*} index
   * @returns
   */
  at(index) {
    if (index > this.size - 1) {
      console.log("List index out of range!");
      return;
    }

    let cursor = this.head;
    for (let i = 0; i < index; i++) {
      console.log(cursor);
      cursor = cursor.next;
    }

    return cursor;
  }

  /**
   * Removes the last element from the list.
   * @returns
   */
  pop() {
    let cursor = this.head;
    for (let j = 0; j < this.size; j++) {
      if (j === this.size - 2) {
        console.info(
          `Removed element '${cursor.next.data}' from the end of list.`
        );
        cursor.next = null;
        this.size--;
        return;
      }

      cursor = cursor.next;
    }
  }

  /**
   * Returns a Node containing the given value. If the given value is not
   * found returns null.
   * @param {*} value
   * @returns
   */
  find(value) {
    let cursor = this.head;
    let index = 0;

    while (cursor.next !== null) {
      cursor = cursor.next;
      index++;

      if (cursor.data == value) {
        return index;
      }
    }

    return null;
  }

  /**
   * Returns true if the List contains the given value, else returns false.
   * @param {*} value
   * @returns
   */
  contains(value) {
    return this.find(value) ? true : false;
  }

  /**
   * Prints a visual representation of the list following the pattern:
   * "( value ) -> ( value ) -> ( value ) -> null"
   * @returns
   */
  toString() {
    let result = `( ${this.head.data} ) ->`;
    let cursor = this.head;
    while (cursor.next !== null) {
      cursor = cursor.next;
      result += `( ${cursor.data} ) -> `;
    }

    return result + "null";
  }

  /**
   * Inserts a new Node with given value at the specified index.
   * @param {*} value
   * @param {*} searchedIdx
   * @returns
   */
  insertAt(value, searchedIdx) {
    let cursor = this.head;
    let currentIdx = 0;
    let prev;

    if (searchedIdx === 0) {
      this.prepend(value);
      return;
    }

    while (cursor.next !== null) {
      if (currentIdx === searchedIdx - 1) {
        prev = cursor;
      }

      if (currentIdx === searchedIdx) {
        prev.next = new Node(value, cursor);
        this.size++;
        console.info(
          `Inserted value '${prev.next.data} at index ${currentIdx}'`
        );
      }

      cursor = cursor.next;
      currentIdx++;
    }
  }

  /**
   * Removes the Node at the given index.
   * @param {*} searchedIdx
   * @returns
   */
  removeAt(searchedIdx) {
    let cursor = this.head;
    let currentIdx = 0;
    let prev;

    if (searchedIdx === 0 && this.size === 1) {
      this.head = null;
      this.size--;
      
      console.info(`Removed value '${cursor.data} at index ${currentIdx}'`);

      return;
    } else if (searchedIdx === 0 && this.size > 1) {
      this.head = cursor.next;
      this.size--;

      console.info(`Removed value '${cursor.data} at index ${currentIdx}'`);

      return;
    }

    while (cursor.next !== null) {
      if (currentIdx === searchedIdx - 1) {
        prev = cursor;
      }

      if (currentIdx === searchedIdx) {
        prev.next = cursor.next;
        this.size--;
        console.info(`Removed value '${cursor.data} at index ${currentIdx}'`);
      }

      cursor = cursor.next;
      currentIdx++;
    }
  }
}
