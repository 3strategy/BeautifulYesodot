# Question 1:

# How to apply this rubric

- **Apply C10 first**: If the whole answer is empty, unrelated, or so incoherent that you cannot infer the intended algorithm → assign **ONLY C10** and stop.
- **Do NOT use “doesn’t compile” as a gate**. If the intended logic is understandable, grade the algorithmic idea.
- **Syntax/typos are a SMALL penalty**. Total deduction for purely syntactic issues should generally be capped at **0.1–0.2** of the question.
- Treat syntax as **major only if it prevents understanding the intended algorithm** (in that case, consider C10).
- **Avoid double penalties**: each root mistake should map primarily to **ONE** category (see “Do NOT include” in each section).

---

## **C10 - תשובה לא ניתנת להערכה / ללא ניסיון אמיתי**
**English description:** Lump-sum category for answers that are empty, completely unrelated, or so incoherent that no meaningful algorithm can be inferred. This category replaces all others.

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): —
- Medium (0.4-0.7): —
- Major (0.8-1.0): Entire answer is non-attempt or not assessable.

**Includes (examples):**
- Empty submission.
- Completely unrelated code (e.g., no attempt to solve the described problem).
- Code so broken that no intended logic can be reconstructed.

**Do NOT include (to avoid overlap):**
- Minor syntax mistakes where the intended algorithm is still clear.
- Logical mistakes in an otherwise understandable solution.

---

## **C1 - זיהוי שגוי של האיבר החריג (אלגוריתם לא נכון)**
**English description:** The core algorithm does not correctly identify the single different element. The student’s logic fails in typical valid inputs (e.g., always returning last seen value, or relying on incorrect assumptions).

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Mostly correct idea but fails in a narrow edge scenario.
- Medium (0.4-0.7): Partially correct logic but fails in common valid cases.
- Major (0.8-1.0): Fundamental misunderstanding of how to isolate the unique element.

**Includes (examples):**
- Simply storing the last different value and returning it without verifying uniqueness.
- Comparing only adjacent elements without ensuring correctness for all positions.
- Logic that returns the common value instead of the unique one.

**Do NOT include (to avoid overlap):**
- Pure boundary/index errors (see C3).
- Counting-based logic with only a small condition mistake (see C4).

---

## **C2 - קביעה שגויה של הערך המשותף בתחילת הפתרון**
**English description:** The student attempts to determine the common value using the first elements but does so incorrectly (wrong comparisons or wrong assignment logic), leading to incorrect baseline for later checks.

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Small mistake in condition but overall idea solid.
- Medium (0.4-0.7): Incorrect branching that fails for some valid inputs.
- Major (0.8-1.0): Completely wrong determination of the common element.

**Includes (examples):**
- Incorrect logic when comparing `arr[0], arr[1], arr[2]`.
- Assigning the wrong element as the “common” one due to faulty conditions.

**Do NOT include (to avoid overlap):**
- General failure to detect the unique element (C1).
- Pure syntax errors in assignment (`==` vs `=`) when intent is clear (C9).

---

## **C3 - שגיאות גבולות ואינדקסים (Boundary errors)**
**English description:** Logical mistakes related to array indexing that would cause out-of-range access or incorrect comparisons at the edges (start/end of array).

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Small boundary issue in rare edge case.
- Medium (0.4-0.7): Loop bounds or index usage incorrect in common scenarios.
- Major (0.8-1.0): Systematic misuse of indices (e.g., accessing `i+1`/`i-1` without safeguards).

**Includes (examples):**
- Using `arr[i+1]` when `i` can reach `Length-1`.
- Using `arr[i-1]` when `i=0`.
- Incorrect loop limits that skip necessary checks.

**Do NOT include (to avoid overlap):**
- Wrong overall algorithm (C1).
- Typos in loop header where intent is obvious (C9).

---

## **C4 - לוגיקת ספירה שגויה**
**English description:** The student uses a counting approach (e.g., counting occurrences of two values) but makes logical mistakes in updating counters or in the final decision.

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Small condition error (e.g., wrong comparison operator).
- Medium (0.4-0.7): Counting works partially but decision logic flawed.
- Major (0.8-1.0): Counting logic fundamentally incorrect.

**Includes (examples):**
- Using assignment instead of comparison in final condition (`=` instead of `==`) when it changes logic.
- Incorrectly updating second value/count.
- Comparing wrong counters to decide which value is unique.

**Do NOT include (to avoid overlap):**
- Wrong baseline value selection (C2).
- Pure syntax issues where logic is clearly correct (C9).

---

## **C5 - החזרת ערך שגוי או ברירת מחדל לא תקינה**
**English description:** The algorithm is mostly correct but returns an incorrect default value, returns the common value, or fails to return the found unique element properly.

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Incorrect fallback return that should never be reached.
- Medium (0.4-0.7): Returns wrong variable in some branch.
- Major (0.8-1.0): Always returns wrong value despite correct detection logic.

**Includes (examples):**
- Returning the common element instead of the different one.
- Returning an accumulator that was not properly updated.
- Missing return after finding the unique element.

**Do NOT include (to avoid overlap):**
- Incorrect detection logic itself (C1).
- Method signature mismatch (C6).

---

## **C6 - חתימת פעולה / טיפוס החזרה שגוי**
**English description:** The method signature does not match the requirement (e.g., `void` instead of `int`, constructor instead of method), even if internal logic attempts to solve the problem.

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Small deviation (e.g., casing difference in name).
- Medium (0.4-0.7): Wrong return type but correct internal idea.
- Major (0.8-1.0): Completely wrong structure (e.g., constructor instead of method).

**Includes (examples):**
- Declaring `void Special` but trying to return a value.
- Writing a constructor instead of a static method.
- Invalid parameter declaration that changes meaning.

**Do NOT include (to avoid overlap):**
- Minor syntax typos (C9).
- Logical errors inside a correctly declared method (C1–C5).

---

## **C7 - זרימת בקרה לא תקינה (break/return/loop structure)**
**English description:** Errors in control flow that prevent correct traversal or early termination (e.g., misplaced `break`, missing `return`, unreachable code).

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Slightly misplaced return but idea clear.
- Medium (0.4-0.7): Loop may terminate too early or too late.
- Major (0.8-1.0): Control flow makes correct result impossible.

**Includes (examples):**
- Breaking before confirming uniqueness.
- Placing `return` inside wrong block.
- Loop structure that skips necessary comparisons.

**Do NOT include (to avoid overlap):**
- Wrong algorithm choice (C1).
- Pure index boundary mistakes (C3).

---

## **C8 - אתחול/שימוש שגוי במשתנים**
**English description:** Variables are incorrectly initialized or misused in a way that affects correctness (e.g., starting with 0 as sentinel when 0 may be valid input).

**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Slightly unsafe initialization but unlikely to fail under constraints.
- Medium (0.4-0.7): Initialization affects correctness in valid inputs.
- Major (0.8-1.0): Variable misuse breaks core logic.

**Includes (examples):**
- Using an accumulator unrelated to array values.
- Initializing comparison variable to 0 and relying on it incorrectly.
- Overwriting key variable without preserving needed information.

**Do NOT include (to avoid overlap):**
- Wrong high-level detection logic (C1).
- Counting logic structural errors (C4).

---

## **C9 - שגיאות תחביריות וטכניות קלות**
**English description:** Minor syntax or technical mistakes that do not obscure the intended algorithm. These should receive only a small deduction.

**Severity bands (deduction suggestion):**
- Minor (0.1-0.2 typical cap): Missing semicolons, small typos.
- Medium (0.3-0.4): Multiple syntax issues but intent fully clear.
- Major (0.5+): Only if syntax severely obscures intent (otherwise consider C10).

**Includes (examples):**
- Missing semicolons.
- `==` instead of `=` (or vice versa) when intent is obvious.
- Small loop header typos where meaning is clear.
- Casing differences in method name.

**Do NOT include (to avoid overlap):**
- Signature fundamentally wrong (C6).
- Syntax errors that make the algorithm impossible to interpret at all (C10).

---

# Question 2

# How to apply this rubric

- **Apply C10 first:** If the whole answer is empty, unrelated, or so incoherent that the intended algorithm cannot be inferred → assign **ONLY C10** and stop.
- **Do NOT use “doesn’t compile” as a gate.** If the intended idea is understandable, grade the algorithmic logic even if there are syntax errors.
- **Syntax/typos are a SMALL penalty.** Total deduction for purely syntactic issues should be capped at ~0.1–0.2 of the question.
- Treat syntax as **major only if it prevents understanding the intended algorithm** (then consider C10).
- **Avoid double penalties:** Each root mistake should map primarily to **one category**. Use “Do NOT include” to keep categories distinct.

---

## **C10 - לא ניסיון / לא ניתן להערכה**
**English description:** The answer is empty, completely unrelated to the question, or so incoherent that the intended algorithm for removing consecutive duplicates cannot be inferred at all. This is a lump-sum category that replaces all others.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Not applicable.
- Medium (0.4-0.7): Not applicable.
- Major (0.8-1.0): Entire answer is non-attempt or not assessable → typically 1.0.
**Includes (examples):**
- No code or only unrelated boilerplate.
- Code unrelated to arrays or duplicates.
- Completely broken structure where no meaningful logic can be inferred.
**Do NOT include (to avoid overlap):**
- Minor syntax errors where intent is still clear.
- Logical mistakes in an otherwise understandable attempt.

---

## **C1 - לוגיקה שגויה: טיפול בכפילויות לא עוקבות**
**English description:** The algorithm removes all duplicates globally (e.g., using `Contains`) instead of removing only **consecutive** duplicates. Violates the requirement to keep later reappearances if they are not adjacent.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Mostly correct but slight confusion between consecutive and general duplicates.
- Medium (0.4-0.7): Core logic partially treats all duplicates instead of only consecutive.
- Major (0.8-1.0): Entire solution removes all duplicates regardless of position.
**Includes (examples):**
- Using `List.Contains` to prevent any repeated value.
- Logic that ensures each number appears only once in the result.
**Do NOT include (to avoid overlap):**
- Mistakes in array sizing.
- Off-by-one comparison errors.

---

## **C2 - לוגיקת השוואה שגויה בין איברים**
**English description:** Incorrect comparison logic between elements (e.g., comparing wrong indices, using assignment instead of comparison, or faulty conditions), leading to wrong detection of consecutive duplicates.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Small comparison typo but clear intent.
- Medium (0.4-0.7): Comparison sometimes wrong (e.g., inconsistent indices).
- Major (0.8-1.0): Core duplicate detection condition is logically incorrect.
**Includes (examples):**
- Using `=` instead of `!=` / `==`.
- Comparing `arr[i]` with `arr[i++]`.
- Wrong logical condition that inverts behavior.
**Do NOT include (to avoid overlap):**
- Accessing `arr[i+1]` out of bounds (see C4).
- Counting/allocation mistakes (see C3).

---

## **C3 - הקצאת גודל מערך תוצאה שגויה**
**English description:** Incorrect calculation of the size of the result array (e.g., forgetting to include the first element, miscounting unique transitions), causing too small/too large allocation.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Off by one but logic otherwise correct.
- Medium (0.4-0.7): Count logic partially incorrect.
- Major (0.8-1.0): Result size clearly inconsistent with intended logic.
**Includes (examples):**
- Counting transitions but not adding 1 for the first element.
- Allocating full length without trimming when clearly intending exact size.
**Do NOT include (to avoid overlap):**
- Failure to return the array (see C7).
- Wrong duplicate detection condition (see C2).

---

## **C4 - חריגות גבולות (Out-of-Bounds)**
**English description:** Accessing `arr[i+1]` or similar without guarding against the last index, or incorrect loop bounds that cause out-of-range access.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Loop bound slightly off but intent clear.
- Medium (0.4-0.7): Out-of-bounds likely in edge cases.
- Major (0.8-1.0): Central logic depends on invalid indexing.
**Includes (examples):**
- Loop from `0` to `arr.Length` while accessing `arr[i+1]`.
- No handling of last element.
**Do NOT include (to avoid overlap):**
- Wrong comparison operator (see C2).
- Incorrect result size (see C3).

---

## **C5 - אלגוריתם לא מתאים / סיבוכיות מיותרת**
**English description:** Using an inappropriate structure (e.g., nested loops over entire array) or unrelated accumulation logic that does not match the simple linear pass required.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Slight inefficiency but still essentially linear.
- Medium (0.4-0.7): Overly complex but somewhat related.
- Major (0.8-1.0): Algorithm fundamentally unrelated to consecutive duplicate removal.
**Includes (examples):**
- Double nested loops comparing many pairs.
- Summing values instead of filtering duplicates.
**Do NOT include (to avoid overlap):**
- Global duplicate removal (see C1).
- Pure syntax errors (see C9).

---

## **C6 - אי שמירה על הסדר המקורי**
**English description:** The solution changes the order of elements or does not explicitly preserve original order while filtering consecutive duplicates.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Minor ordering side-effect but mostly preserved.
- Medium (0.4-0.7): Order preservation unclear.
- Major (0.8-1.0): Algorithm inherently reorders elements.
**Includes (examples):**
- Sorting before removing duplicates.
- Reconstructing array in a different order.
**Do NOT include (to avoid overlap):**
- Removing all duplicates (see C1).
- Wrong sizing (see C3).

---

## **C7 - החזרת ערך שגויה / חסרה**
**English description:** The method does not return the constructed array correctly (missing return, wrong return type, returning wrong variable), while the core logic may be present.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Small return typo (e.g., `return arr2[]`).
- Medium (0.4-0.7): Return type mismatch but correct array built.
- Major (0.8-1.0): No meaningful return of the result.
**Includes (examples):**
- Declared `int` instead of `int[]`.
- Missing `return` statement.
**Do NOT include (to avoid overlap):**
- Wrong array size (see C3).
- Pure syntax punctuation issues (see C9).

---

## **C8 - חוסר טיפול במקרי קצה בסיסיים**
**English description:** No consideration of minimal valid cases (e.g., array of length 1), when the logic assumes existence of neighbors without safe structure.  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.3): Implicitly works but not clearly safe.
- Medium (0.4-0.7): Likely failure on length 1.
- Major (0.8-1.0): Fails even on simple valid inputs.
**Includes (examples):**
- Assuming `arr[0]` and `arr[1]` always exist.
- Starting loop at wrong index without handling first element.
**Do NOT include (to avoid overlap):**
- Explicit out-of-bounds indexing (see C4).
- Incorrect duplicate logic (see C2).

---

## **C9 - שגיאות תחביריות / טכניות קלות**
**English description:** Minor syntax or technical issues that do not significantly affect understanding of the intended algorithm. Deduction should be capped (≈0.1–0.2 total).  
**Severity bands (deduction suggestion):**
- Minor (0.1-0.2): Typical case.
- Medium (0.3-0.4): Multiple small syntax issues but intent clear.
- Major (0.5+): Only if syntax severely obscures intent (otherwise consider C10).
**Includes (examples):**
- Missing semicolons.
- Incorrect casing (`list` vs `List`).
- Minor array declaration typos.
**Do NOT include (to avoid overlap):**
- Logical comparison errors (see C2).
- Missing return logic (see C7).

---

# Question 3

# How to apply this rubric

- **Apply C10 first**: If the whole answer is empty, unrelated to the question, or so incoprehensible that you cannot infer the intended algorithm → assign **ONLY C10** and stop.
- **Do NOT use “doesn’t compile” as a gate**. If the student’s intent is understandable, grade the algorithmic idea.
- **Syntax/typos are a small penalty**: purely syntactic issues (missing `;`, wrong casing, small header mistakes) should be capped at **0.1–0.2 total**.
- Treat syntax as **major only** if it prevents understanding the intended algorithm (then consider C10).
- **Avoid double penalties**: each root mistake should be mapped primarily to ONE category (see “Do NOT include” in each section).

---

## **C10 - אי־מענה / תשובה לא ניתנת להערכה**
**English description:** The answer is empty, completely unrelated to the task, or so incoherent that the intended algorithm cannot be inferred. This is a lump-sum category and replaces all others.

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Not applicable.
- Medium (0.4–0.7): Not applicable.
- Major (0.8–1.0): Entire answer is blank, unrelated, or not assessable.

**Includes (examples):**
- No code at all.
- Code unrelated to `Product` or to finding a minimum.
- Fragments that do not form a meaningful algorithm.

**Do NOT include (to avoid overlap):**
- Code with syntax errors but clear algorithmic intent.
- Wrong logic that is still understandable.

---

## **C1 - אי־סינון לפי התנאי (מחיר ≥ 10)**
**English description:** The solution does not properly restrict the search to products whose price is at least 10, or applies the condition incorrectly.

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Condition written but slightly misplaced while still effectively filtering.
- Medium (0.4–0.7): Filtering exists but is logically incorrect (e.g., wrong comparison operator).
- Major (0.8–1.0): No filtering at all; finds minimum over all products regardless of price.

**Includes (examples):**
- Ignoring the “≥ 10” requirement entirely.
- Using `< 10` instead of `>= 10`.
- Applying the condition outside the minimum-selection logic so it has no real effect.

**Do NOT include (to avoid overlap):**
- Errors in how the minimum is tracked (see C2).
- Starting from wrong index (see C4).

---

## **C2 - לוגיקה שגויה למציאת המינימום**
**English description:** The algorithm attempts to find a minimum but compares incorrectly (e.g., compares to previous element instead of current minimum, uses wrong variable in comparison).

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Small comparison mistake but overall structure nearly correct.
- Medium (0.4–0.7): Maintains a “minimum” variable but updates it using incorrect logic.
- Major (0.8–1.0): Comparison logic fundamentally wrong, so result is not the minimum.

**Includes (examples):**
- Comparing `arr[i]` only to `arr[i-1]`.
- Updating name but not the stored minimum price.
- Using reversed comparison operator.

**Do NOT include (to avoid overlap):**
- Missing ≥10 condition (C1).
- Loop boundary/index errors (C4).

---

## **C3 - השוואה לא חוקית בין אובייקטים**
**English description:** Attempts to compare `Product` objects directly (e.g., `arr[i] < minProduct`) instead of comparing their prices.

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Clear intent to compare prices but minor accessor misuse.
- Medium (0.4–0.7): Uses object comparison but rest of algorithm is correct in structure.
- Major (0.8–1.0): Entire minimum logic based on invalid object comparison.

**Includes (examples):**
- `if (arr[i] < minPrice)`
- Using `.Min()` on a `Product` list without defining comparison by price.

**Do NOT include (to avoid overlap):**
- Wrong minimum-tracking logic (C2).
- Getter/setter syntax mistakes only (C8).

---

## **C4 - שגיאות לולאה / אינדקסים מהותיות**
**English description:** Significant errors in loop structure or indexing that break the algorithmic correctness (wrong bounds, illegal access like `i+1`, skipping elements unintentionally).

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Slight inefficiency or redundant iteration but still correct coverage.
- Medium (0.4–0.7): Skips first valid candidate or risks out-of-bounds logically.
- Major (0.8–1.0): Loop condition invalid so algorithm cannot work as intended.

**Includes (examples):**
- Comparing `arr[i]` with `arr[i+1]` up to `Length`.
- Starting from index 1 without initializing minimum properly.
- Invalid `for` header that changes loop semantics.

**Do NOT include (to avoid overlap):**
- Comparison logic errors (C2).
- Filtering errors (C1).

---

## **C5 - החזרת ערך שגוי (לא שם המוצר הנדרש)**
**English description:** Returns the wrong type or wrong value (e.g., returns a `Product` instead of `string`, constructs a new product, or returns unrelated data).

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Correct logic but returns wrong field accidentally.
- Medium (0.4–0.7): Finds correct product but returns wrong type.
- Major (0.8–1.0): Return value unrelated to the required result.

**Includes (examples):**
- Returning a `Product` object.
- Creating a new `Product` with price 10 and returning it.
- Returning array or numeric value instead of product name.

**Do NOT include (to avoid overlap):**
- Syntax mistakes in return statement (C8).
- Wrong minimum selection (C2).

---

## **C6 - אתחול שגוי של מינימום**
**English description:** Incorrect initialization of the minimum tracking variable so that valid candidates may never be selected.

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Uses large sentinel value but logic still correct.
- Medium (0.4–0.7): Initializes with element that may not satisfy ≥10 without proper handling.
- Major (0.8–1.0): Initialization guarantees incorrect result in common cases.

**Includes (examples):**
- `min = 0` while searching for price ≥ 10.
- Initializing from `arr[0]` without checking if it meets ≥10.
- Not initializing name/min before loop in a coherent way.

**Do NOT include (to avoid overlap):**
- Missing ≥10 check altogether (C1).
- Wrong comparison logic (C2).

---

## **C7 - שימוש שגוי במבנה הנתונים / טיפוס הפרמטר**
**English description:** Changes the required method signature or ignores the given `Product[]` structure (e.g., uses `int[]`, unrelated arrays, or different parameters).

**Severity bands (deduction suggestion):**
- Minor (0.1–0.3): Small deviation in signature but still clearly about `Product[]`.
- Medium (0.4–0.7): Replaces `Product[]` with another structure but still tries to solve similar problem.
- Major (0.8–1.0): Completely ignores `Product` array requirement.

**Includes (examples):**
- Method takes `int[]` instead of `Product[]`.
- Works only with prices, ignoring names/products.
- Redefines unrelated arrays and operates on them.

**Do NOT include (to avoid overlap):**
- Returning wrong type (C5).
- Getter/setter misuse only (C8).

---

## **C8 - שימוש שגוי ב־Getters/Setters או בגישה לשדות**
**English description:** Incorrect use of property access (e.g., wrong getter names, mixing field access and methods) while the algorithmic idea is correct.

**Severity bands (deduction suggestion):**
- Minor (0.1–0.2 typical cap): Wrong casing, missing parentheses in `GetPrice()`, minor accessor typos.
- Medium (0.4–0.7): Systematic misuse that slightly obscures intent but algorithm still clear.
- Major (0.8–1.0): Access pattern so confused that intended comparison cannot be inferred (then consider C10).

**Includes (examples):**
- `getPrice` vs `GetPrice()`.
- Using `.price` instead of getter when Java-style getters were specified.
- Missing `()` in method calls.

**Do NOT include (to avoid overlap):**
- Comparing whole objects (C3).
- Core minimum logic errors (C2).

---

## **C9 - תחביר כללי / שגיאות טכניות קלות**
**English description:** Minor syntactic or structural issues that do not significantly affect understanding of the algorithm.

**Severity bands (deduction suggestion):**
- Minor (0.1–0.2 total cap for pure syntax): Missing semicolons, small header mistakes, casing.
- Medium (0.4–0.7): Multiple syntax errors but intent still understandable.
- Major (0.8–1.0): Syntax so broken that algorithm cannot be reconstructed (then consider C10 instead).

**Includes (examples):**
- Missing `;`
- Typos in method header (`Product()[]`)
- Small keyword mistakes (`public string` instead of `public static string`)

**Do NOT include (to avoid overlap):**
- Logical comparison mistakes (C2).
- Structural data-type changes (C7).