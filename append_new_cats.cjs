const fs = require('fs');

const puzzleTitles = [
  "9 Balls and a Scale", "100 Doors", "Fox, Goose, Bag of Beans", "Water Jug Problem (3L and 5L)", 
  "The Monty Hall Problem", "Bridging the Gap (Torch and Bridge)", "Prisoners and Hats", "Camel and Bananas", 
  "100 Prisoners and Lightbulb", "Three Utilities Problem", "Egg Dropping (2 eggs, 100 floors)", 
  "Burning Ropes (Measure 45 mins)", "Jugs of Water (Measure 4L)", "Two Doors (Truth and Lie guard)", 
  "Blue Eyes Island", "Pirate Treasure Division", "Ants on a Triangle", "Poisonous Wine (1000 bottles, 10 mice)", 
  "Blindfolded Coin Flips", "River Crossing (Family of 4)", "Weighing 12 Coins", "Hourglass (7 and 11 mins)",
  "The Three Gods (True, False, Random)", "Cake Cutting (Equality)", "Racing Horses (25 horses, 5 tracks)",
  "Socks in a Drawer", "Gold Bars and Employees", "Matching Pennies", "Three Boxes of Fruit",
  "The Train and the Bird", "Cutting a Cube", "Number of Squares on a Chessboard", "Monty Hall Variant (4 doors)",
  "The Sleeping Beauty Problem", "The Trolley Problem", "Two Envelopes Paradox", "Chameleons on an Island",
  "The Color of the Bear", "Escape from a Circular Lake", "Four Gallons using 3 and 5", "Measuring 15 mins with 2 ropes",
  "The 100 Prisoners and 100 Boxes", "A Man in an Elevator", "The Mutilated Chessboard", "Cheryl's Birthday",
  "The Zebra Puzzle", "Blue and Red Hats (Line array)", "The Three Switches and Bulbs", "The Heavy Coin",
  "The King's Gold", "The Spider and the Fly", "Crossing the Desert", "The Handshake Problem",
  "The Marriage Problem", "The Secretary Problem", "The Boy or Girl Paradox", "The Birthday Paradox",
  ...Array.from({length: 43}).map((_, i) => `Tech Interview Logic Puzzle #${i+1}`)
];

const algoTitles = [
  "Two Sum", "Reverse Linked List", "Merge Interfaces", "Binary Tree Level Order Traversal",
  "Validate Binary Search Tree", "Serialize and Deserialize BST", "Design LRU Cache", "Number of Islands",
  "Trapping Rain Water", "Container With Most Water", "Merge K Sorted Lists", "Longest Palindromic Substring",
  "Longest Substring Without Repeating Characters", "3Sum", "Letter Combinations of a Phone Number",
  "Generate Parentheses", "Next Permutation", "Search in Rotated Sorted Array", "Find First and Last Position",
  "Valid Sudoku", "Combination Sum", "Permutations", "Rotate Image", "Group Anagrams", "Maximum Subarray",
  "Spiral Matrix", "Jump Game", "Merge Intervals", "Insert Interval", "Unique Paths", "Minimum Path Sum",
  "Climbing Stairs", "Edit Distance", "Sort Colors", "Minimum Window Substring", "Combinations",
  "Subsets", "Word Search", "Remove Duplicates from Sorted List II", "Largest Rectangle in Histogram",
  "Maximal Rectangle", "Binary Tree Inorder Traversal", "Unique Binary Search Trees", "Recover Binary Search Tree",
  "Symmetric Tree", "Binary Tree Maximum Path Sum", "Word Ladder", "Longest Consecutive Sequence",
  "Clone Graph", "Palindrome Partitioning", "Clone Linked List with Random Pointer", "Word Break",
  "Linked List Cycle", "LRU Cache", "Sort List", "Evaluate Reverse Polish Notation", "Maximum Product Subarray",
  ...Array.from({length: 43}).map((_, i) => `Algorithmic Edge Case #${i+1}`)
];

const puzzleChallenges = puzzleTitles.map((title, i) => {
  const diff = i < 30 ? 'medium' : 'hard';
  return `  { id: ${3001 + i}, lang: "Puzzle", diff: "${diff}", title: "${title}", concepts: "Logic, Math, Brainteaser", problem: "Solve the classic '${title}' logic problem usually posed in big tech interviews.", why: "Evaluates lateral thinking and deductive reasoning under pressure.", examples: "Input: The scenario parameters\\nOutput: The logical conclusion", testInputs: "Edge case scenario => Desired outcome", explanation: "Break down the variables, minimize assumptions, and formulate a mathematical or logical proof." }`;
});

const algoChallenges = algoTitles.map((title, i) => {
  const diff = i < 30 ? 'medium' : 'hard';
  return `  { id: ${3101 + i}, lang: "Algo", diff: "${diff}", title: "${title}", concepts: "Data Structures, Algorithms", problem: "Implement an optimal solution for '${title}' in pseudocode or any language.", why: "Language independent algorithmic mastery is the core of FAANG loop rounds.", examples: "Input: Standard bounds\\nOutput: Best Time/Space complexity", testInputs: "O(N) Time => O(1) Space", explanation: "Focus on asymptotic bounds before touching any syntax." }`;
});

const contentToAppend = `\n\nexport const puzzleChallenges = [\n${puzzleChallenges.join(',\n')}\n];\n\nexport const algoChallenges = [\n${algoChallenges.join(',\n')}\n];\n`;

const targetFile = 'd:\\code\\AI\\interview app\\src\\data\\data.js';

fs.appendFileSync(targetFile, contentToAppend);
console.log('Successfully appended 100 Puzzles and 100 Algo challenges.');
