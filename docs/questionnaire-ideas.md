# Categories and ideas for quiz questionnaires.

## 🧠 1. Weight & Balance Logic (important)

**Used in:** IQ tests, Olympiad prep, Bebras-style tasks

Focus: inference from partial info

### Sample

Given:

* 🐸 = ⚖️ heavier than 🐭
* 🐭 = ⚖️ heavier than 🐞

**Question:** Which is heaviest?
A. 🐭
B. 🐞
C. 🐸 ✅
D. Cannot determine

using emojis on balance in assets\img\balance.svg

---

### Slightly harder (multi-step)

From scales:

* 🐸 = 🐭 + 🐭
* 🐞 = 🐭 + 1

**Question:** Which is lightest?
A. 🐸
B. 🐞
C. 🐭 ✅
D. Cannot determine

👉 This type is **excellent predictor of CS thinking**.

---

## 🔍 2. Pattern Recognition (Visual / Numeric)

**Used in:** Raven’s matrices, IQ tests

### Sample 2

Sequence:
2, 4, 8, 16, ?

A. 18
B. 20
C. 32 ✅
D. 24

---

### Visual version

Shapes changing color/rotation → pick next

👉 Easy to generate programmatically later.

---

## 📖 3. Short Instruction → Apply Rule

**Critical for CS readiness**

Give a **tiny rule**, then test if they apply it.

### Sample 3

Rule:

> If a number is even → add 3
> If odd → multiply by 2

Start: 5

What is the result after **2 steps**?

Step 1: 5 → 10
Step 2: 10 → 13

A. 13 ✅
B. 20
C. 16
D. 23

👉 Tests **reading + execution**, very important.

---

## 🔄 4. Algorithmic Thinking (Step Simulation)

**Used in:** Bebras (very good source btw)

### Sample 4

Robot moves:

* Forward = +1
* Jump = +2

Commands:
Forward, Jump, Forward

Start at 0

Where does it end?

A. 2
B. 3
C. 4 ✅
D. 5

---

## 🧩 5. Constraints / Logic Puzzle

**Classic CS thinking**

### Sample 5

Three students: Dana, Amir, Lior

* Dana is not the tallest
* Amir is taller than Lior

Who is tallest?

A. Dana
B. Amir ✅
C. Lior
D. Cannot determine

---

## 📚 6. Reading Comprehension (Short + Trick)

**You explicitly want this**

### Sample 6

Text:

> Tom has 3 apples. He gives 1 to Sara. Then he buys 2 more.

Question:
How many apples does Tom have now?

A. 3
B. 4 ✅
C. 5
D. 2

👉 Keep texts short but require **attention**.

---

## 🔢 7. Binary / Encoding (light intro)

**CS-flavored but accessible**

### Sample 7

Rule:
A = 1, B = 2, C = 3

What is CAB?

A. 312
B. 123
C. 312 ✅
D. 231

---

## 🔗 8. Matching / Mapping

**Important for abstraction**

### Sample 8

If:

* Cat → 4 legs
* Spider → 8 legs

What about 2 cats + 1 spider?

A. 10
B. 12
C. 16 ✅
D. 14

---

## 🧠 9. Deduction with Missing Info

**Tests maturity, not just logic**

### Sample 9

You know:

* All frogs are green
* Some green animals are big

Question:
Are all frogs big?

A. Yes
B. No
C. Cannot determine ✅

---

## 🔁 10. Recursive Thinking (VERY light)

Just intuition level

### Sample 10

Function:
f(n) = n + f(n−1)
f(1) = 1

What is f(3)?

f(2)=2+1=3
f(3)=3+3=6

A. 5
B. 6 ✅
C. 7
D. 8

---

## 🌍 11. “Bebras-style” Mini CS Problems (Highly Recommended)

👉 This is probably your **best external inspiration**

Used worldwide for ages 10–18

### Examples include:

* shortest path
* sorting rules
* simple state machines
* decision trees

---

## 🎯 12. Learn-from-Example (Very important for your goal)

Give **1 example**, then test generalization.

### Sample 12

Example:
DOG → D-O-G
CAT → C-A-T

Question:
FISH →

A. F-I-S-H ✅
B. FISH
C. FI-SH
D. F-I SH

👉 Tests **self-learning ability quickly**

---

## ⚖️ About Your SVG Concern (Weight puzzles)

You’re right to think ahead, but:

👉 You don’t need full SVG at first.

Start with:

* emojis (🐸🐭🐞)
* simple text layout
* or PNG assets

Later:

* generate SVG programmatically (very doable)
* or reuse 3–4 templates and swap icons

---

## 💡 Suggested Structure for Test

Mix difficulty:

* 3 easy (confidence)
* 5 medium (filter)
* 2 hard (top 10%)
