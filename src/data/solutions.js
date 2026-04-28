// Reference implementations for the most-asked challenges.
// Keyed by `${lang}-${id}` to map onto the existing challenge schema in data.js.
// JavaScript chosen as the lingua franca; rewriting in your target language is good practice.
//
// Adding a new solution: write idiomatic, commented code. Don't golf — interview judges read for clarity.
// One reference per challenge is enough; alternative approaches go in `explanation` field on the challenge.

export const SOLUTIONS = {
  // === codingChallenges (lang: "Code") ===

  'Code-1': `// Two Sum — O(n) time, O(n) space
function twoSum(nums, target) {
  const seen = new Map();           // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];                        // by problem statement, never reached
}`,

  'Code-2': `// Valid Parentheses — O(n) time, O(n) space
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if (ch === '(' || ch === '[' || ch === '{') {
      stack.push(ch);
    } else {
      if (stack.pop() !== pairs[ch]) return false;
    }
  }
  return stack.length === 0;
}`,

  'Code-3': `// Best Time to Buy and Sell Stock — O(n) time, O(1) space
function maxProfit(prices) {
  let minPrice = Infinity;
  let bestProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else bestProfit = Math.max(bestProfit, price - minPrice);
  }
  return bestProfit;
}`,

  'Code-7': `// Reverse Linked List — iterative, O(n) time, O(1) space
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;         // save before we overwrite
    curr.next = prev;               // flip the pointer
    prev = curr;                    // advance prev
    curr = next;                    // advance curr
  }
  return prev;
}

// Recursive variant — same complexity, O(n) call stack
function reverseListRec(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRec(head.next);
  head.next.next = head;            // make next point back to us
  head.next = null;                 // sever forward pointer
  return newHead;
}`,

  'Code-10': `// Maximum Subarray — Kadane's algorithm, O(n) time, O(1) space
function maxSubArray(nums) {
  let cur = nums[0];
  let best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);   // restart vs extend
    best = Math.max(best, cur);
  }
  return best;
}`,

  'Code-21': `// LRU Cache — O(1) get/put using HashMap + Doubly Linked List
class LRUCache {
  constructor(capacity) {
    this.cap = capacity;
    this.map = new Map();             // Map preserves insertion order — key insight!
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);             // re-insert to mark as most-recent
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size >= this.cap) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);     // evict least-recent (first inserted)
    }
    this.map.set(key, value);
  }
}
// Note: in interviews, you may be asked to implement WITHOUT using Map's
// ordering guarantee — i.e., write the doubly linked list explicitly.`,

  'Code-22': `// Number of Islands — BFS on grid, O(m*n) time, O(m*n) space worst case
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  const bfs = (r, c) => {
    const queue = [[r, c]];
    grid[r][c] = '0';                 // mark visited in-place
    while (queue.length) {
      const [r, c] = queue.shift();
      for (const [dr, dc] of [[-1,0],[1,0],[0,-1],[0,1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === '1') {
          grid[nr][nc] = '0';
          queue.push([nr, nc]);
        }
      }
    }
  };

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') { count++; bfs(r, c); }
    }
  }
  return count;
}`,

  'Code-23': `// Merge Intervals — sort + sweep, O(n log n) time
function merge(intervals) {
  if (intervals.length <= 1) return intervals;
  intervals.sort((a, b) => a[0] - b[0]);

  const result = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const last = result[result.length - 1];
    const cur = intervals[i];
    if (cur[0] <= last[1]) {
      last[1] = Math.max(last[1], cur[1]);  // overlap → merge
    } else {
      result.push(cur);                     // gap → start new
    }
  }
  return result;
}`,

  'Code-24': `// 3Sum — sort + two pointers, O(n^2) time
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;       // skip dup of fixed element

    let lo = i + 1, hi = nums.length - 1;
    while (lo < hi) {
      const sum = nums[i] + nums[lo] + nums[hi];
      if (sum === 0) {
        result.push([nums[i], nums[lo], nums[hi]]);
        while (lo < hi && nums[lo] === nums[lo + 1]) lo++; // skip dup lo
        while (lo < hi && nums[hi] === nums[hi - 1]) hi--; // skip dup hi
        lo++; hi--;
      } else if (sum < 0) lo++;
      else hi--;
    }
  }
  return result;
}`,

  'Code-25': `// Group Anagrams — hash by sorted-string key, O(n * k log k) time
function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = [...s].sort().join('');
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}

// Faster alternative: hash by char-frequency tuple.
// Avoid sort, drop to O(n * k).`,

  'Code-26': `// Top K Frequent Elements — bucket sort, O(n) time
function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);

  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, count] of freq) buckets[count].push(num);

  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }
  return result.slice(0, k);
}

// Heap alternative: O(n log k). Use min-heap of size k.
// For interviews, mention BOTH approaches; bucket sort gets the optimal-time signal.`,

  'Code-28': `// Coin Change — bottom-up DP, O(amount * coins) time
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,

  'Code-29': `// Word Break — DP, O(n^2 * L) where L = max word length
function wordBreak(s, wordDict) {
  const set = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && set.has(s.slice(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,

  'Code-31': `// Course Schedule — topological sort via Kahn's BFS, O(V + E)
function canFinish(numCourses, prerequisites) {
  const indeg = new Array(numCourses).fill(0);
  const graph = Array.from({ length: numCourses }, () => []);

  for (const [a, b] of prerequisites) {
    graph[b].push(a);                 // b must come before a
    indeg[a]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (indeg[i] === 0) queue.push(i);
  }

  let finished = 0;
  while (queue.length) {
    const node = queue.shift();
    finished++;
    for (const next of graph[node]) {
      if (--indeg[next] === 0) queue.push(next);
    }
  }

  return finished === numCourses;     // if cycle, some indegrees never reach 0
}`,

  'Code-33': `// Longest Substring Without Repeating Characters — sliding window, O(n)
function lengthOfLongestSubstring(s) {
  const lastIdx = new Map();
  let left = 0, best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    if (lastIdx.has(ch) && lastIdx.get(ch) >= left) {
      left = lastIdx.get(ch) + 1;     // jump past previous occurrence
    }
    lastIdx.set(ch, right);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,

  'Code-51': `// Trapping Rain Water — two pointers, O(n) time, O(1) space
function trap(height) {
  let l = 0, r = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let total = 0;

  while (l < r) {
    if (height[l] < height[r]) {
      // left side is the bottleneck — water level capped by leftMax
      if (height[l] >= leftMax) leftMax = height[l];
      else total += leftMax - height[l];
      l++;
    } else {
      if (height[r] >= rightMax) rightMax = height[r];
      else total += rightMax - height[r];
      r--;
    }
  }
  return total;
}`,

  'Code-53': `// Merge K Sorted Lists — min-heap, O(N log k) where N = total nodes
class MinHeap {
  constructor() { this.h = []; }
  push(v) {
    this.h.push(v);
    let i = this.h.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.h[p].val <= this.h[i].val) break;
      [this.h[p], this.h[i]] = [this.h[i], this.h[p]];
      i = p;
    }
  }
  pop() {
    if (this.h.length === 0) return null;
    const top = this.h[0];
    const last = this.h.pop();
    if (this.h.length) {
      this.h[0] = last;
      let i = 0;
      while (true) {
        const l = 2*i + 1, r = 2*i + 2;
        let smallest = i;
        if (l < this.h.length && this.h[l].val < this.h[smallest].val) smallest = l;
        if (r < this.h.length && this.h[r].val < this.h[smallest].val) smallest = r;
        if (smallest === i) break;
        [this.h[i], this.h[smallest]] = [this.h[smallest], this.h[i]];
        i = smallest;
      }
    }
    return top;
  }
  size() { return this.h.length; }
}

function mergeKLists(lists) {
  const heap = new MinHeap();
  for (const head of lists) if (head) heap.push(head);

  const dummy = { val: 0, next: null };
  let tail = dummy;

  while (heap.size()) {
    const node = heap.pop();
    tail.next = node;
    tail = node;
    if (node.next) heap.push(node.next);
  }
  return dummy.next;
}`,

  'Code-57': `// Serialize/Deserialize Binary Tree — preorder + null markers
function serialize(root) {
  const out = [];
  const dfs = (node) => {
    if (!node) { out.push('null'); return; }
    out.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  };
  dfs(root);
  return out.join(',');
}

function deserialize(data) {
  if (!data) return null;
  const tokens = data.split(',');
  let i = 0;
  const dfs = () => {
    const tok = tokens[i++];
    if (tok === 'null') return null;
    const node = { val: parseInt(tok, 10), left: null, right: null };
    node.left = dfs();
    node.right = dfs();
    return node;
  };
  return dfs();
}`,

  // === codingQuestions (lang: "DSA") — same problems, listed under DSA category ===

  'DSA-6001': `// Two Sum — same as Code-1
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
}`,

  'DSA-6002': `// Valid Parentheses
function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', ']': '[', '}': '{' };
  for (const ch of s) {
    if ('([{'.includes(ch)) stack.push(ch);
    else if (stack.pop() !== pairs[ch]) return false;
  }
  return stack.length === 0;
}`,

  'DSA-6003': `// Reverse Linked List
function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    [curr.next, prev, curr] = [prev, curr, curr.next];
  }
  return prev;
}`,

  'DSA-6004': `// Maximum Subarray (Kadane's)
function maxSubArray(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,

  // === Algo / DP — common interview classics ===

  'Algo-3135': `// Median of Two Sorted Arrays — binary search on smaller array, O(log min(m,n))
function findMedianSortedArrays(a, b) {
  if (a.length > b.length) [a, b] = [b, a];      // ensure a is smaller
  const m = a.length, n = b.length;
  const total = m + n, half = (total + 1) >> 1;

  let lo = 0, hi = m;
  while (lo <= hi) {
    const i = (lo + hi) >> 1;
    const j = half - i;

    const aLeft  = i === 0 ? -Infinity : a[i - 1];
    const aRight = i === m ?  Infinity : a[i];
    const bLeft  = j === 0 ? -Infinity : b[j - 1];
    const bRight = j === n ?  Infinity : b[j];

    if (aLeft <= bRight && bLeft <= aRight) {
      // correct partition
      if (total % 2) return Math.max(aLeft, bLeft);
      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    } else if (aLeft > bRight) {
      hi = i - 1;
    } else {
      lo = i + 1;
    }
  }
}`,

  'DP-1': `// Climbing Stairs — fibonacci, O(n) time, O(1) space
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;
  for (let i = 3; i <= n; i++) {
    const cur = prev1 + prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,

  'DP-3': `// Coin Change — bottom-up DP
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const c of coins) {
      if (c <= i) dp[i] = Math.min(dp[i], dp[i - c] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,

  'DP-4': `// Longest Increasing Subsequence — O(n log n) with patience sorting
function lengthOfLIS(nums) {
  const tails = [];                   // tails[i] = smallest tail of any LIS of length i+1
  for (const num of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = num;                  // either extend or replace
  }
  return tails.length;
}

// O(n^2) DP variant for clarity:
//   dp[i] = max(dp[j] + 1 for j < i where nums[j] < nums[i])`,

  'DP-15': `// Maximum Subarray — same as Code-10
function maxSubArray(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`,
}

export function getSolution(ch) {
  if (!ch) return null
  return SOLUTIONS[`${ch.lang}-${ch.id}`] ?? null
}
