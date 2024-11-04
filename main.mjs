import { HashMap } from "./hashmap.mjs";

const test = new HashMap();

// Populating the Map
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

// Testing overwriting values
test.set("dog", "black"); // Updated key "dog" with value "black" at index 12.

// Expanding the Map;
test.set("moon", "silver"); // This triggers the grow() function.
console.log("Same length:", test.length());
console.log("Doubled capacity: ", test.size);

// Test overwriting after growth
test.set("ice cream", "pink"); // Updated key 'ice cream' with value 'pink' at index 13.
test.set("lion", "ecru"); // Updated key 'lion' with value 'ecru' at index 28.

// Getting infos about the Map
console.log(
  "Size:",
  test.size + "\n",
  "Length:",
  test.length() + "\n",
  "Entries:",
  test.entries() + "\n",
  "Keys:",
  test.keys() + "\n",
  "Values:",
  test.values() + "\n"
);

// Checks
console.log("What color is the moon?", test.get("moon"));
console.log("Is 'elephant' in the map?", test.has("elephant"));
console.log("Removed 'lion':", test.remove("lion"));
test.clear()
console.log("List of entries after clearing:", test.entries())
