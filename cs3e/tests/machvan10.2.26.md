
# Question 1 – `Special` (find the unique different element)

### Problem guarantees
- Array length is **odd and ≥ 3**
- All values equal **except one**
- Input always valid

➡ Therefore **no penalties for null, length checks, or empty handling**.

---

## C10 – Answer not assessable / no real attempt
(unchanged in spirit)

Use only when:
- Empty or unrelated code
- Logic impossible to infer

---

## C1 – Core algorithm fails to isolate the unique element
**Clearer name:** *Incorrect unique-element detection logic*

Includes:
- Returning last seen value without proof
- Returning the common value
- Logic that fails on normal valid inputs

Avoid overlap with C2, C3, C4

---

## C2 – Incorrect identification of the common value baseline
**Clearer name:** *Wrong baseline (common value) selection*

Includes:
- Wrong logic when using first 3 elements
- Assigning wrong value as the majority element

---

## C3 – Index and boundary logic errors
**Clearer name:** *Invalid index usage within valid input size*

Includes:
- Accessing i+1 / i-1 incorrectly
- Loop bounds that skip needed comparisons

---

## C4 – Faulty counting approach
**Clearer name:** *Incorrect frequency-based logic*

Includes:
- Miscounting
- Wrong final comparison of counters

---

## C5 – Correct detection but wrong returned value
**Clearer name:** *Wrong return after correct detection*

Includes:
- Returning common value
- Returning wrong variable

---

## C6 – Method signature mismatch
(unchanged)

---

## C7 – Broken control flow
**Clearer name:** *Loop/return structure prevents correct traversal*

Includes:
- Premature break
- Missing return

---

## C8 – Variable misuse affecting correctness
(unchanged but tightened to core misuse only)

---

## C9 – Minor syntax issues only
**Explicitly small cap only**

---


# Question 2 – `Uniques` (remove consecutive duplicates)

### Problem guarantees
- Input array exists and is valid

➡ Do NOT penalize for null or empty handling

---

## C10 – Not assessable
(unchanged)

---

## C1 – Removing all duplicates instead of consecutive ones
**Clearer name:** *Treating duplicates globally instead of consecutively*

---

## C2 – Wrong comparison logic between neighbors
(unchanged, but strictly about comparison correctness)

---

## C3 – Incorrect result array sizing
**Clearer name:** *Wrong output length calculation*

---

## C4 – Out-of-bounds index logic
(unchanged)

---

## C5 – Unrelated or inefficient algorithm
**Clearer name:** *Algorithm not matching required linear pass*

---

## C6 – Order not preserved
(unchanged)

---

## C7 – Wrong or missing return
(unchanged)

---

## C8 – Assumption of impossible edge cases

⚠ **Only apply if violating valid inputs**, not for missing null checks.

Example allowed failure:
- Logic that breaks on array of length 1 (even though not required here)

---

## C9 – Minor syntax only
(unchanged)

---


# Question 3 – `Interesting` (min price ≥ 10)

### Problem guarantees
- No nulls in array
- At least one product with price ≥ 10

➡ Do NOT penalize for null checks or for not handling "no valid product" cases

---

## C10 – Not assessable
(unchanged)

---

## C1 – Missing or wrong ≥10 filtering
(unchanged)

---

## C2 – Wrong minimum selection logic
(unchanged)

---

## C3 – Comparing objects instead of prices
(unchanged)

---

## C4 – Loop/index structure breaks correctness
(unchanged)

---

## C5 – Wrong return type or value
(unchanged)

---

## C6 – Wrong minimum initialization
**Clarified:** only when it breaks valid guaranteed input

---

## C7 – Wrong parameter/data structure
(unchanged)

---

## C8 – Getter/setter misuse only
(unchanged)

---

## C9 – Minor syntax only
(unchanged)

---