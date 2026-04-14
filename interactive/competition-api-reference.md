---
layout: page
title: "ICode Competition – Python Quick Reference"
date: 2025-01-01
categories: [python, competition, reference]
tags: [dev, spaceship, flyer, item, api, cheatsheet]
subtitle: "Compact function reference for the Israeli programming competition platform. For coders who already know Python."
---

<style>
html {
  direction: ltr !important;
}
body {
  text-align: left !important;
}
</style>

{: .box-note}

**Legend:** 🔵 action / `None` return · 🟢 property `int` · 🔴 predicate `bool`

{: .box-success}

[Connect to ICode]("https://c.icode4good.com/israel2026?lang=")

---

## `Dev` – The walking character

| Call | Type | Notes |
| ------ | ------ | ------- |
| `Dev.step(N)` | 🔵 action | `N > 0` forward, `N < 0` backward |
| `Dev.turnRight()` | 🔵 action | 90° clockwise |
| `Dev.turnLeft()` | 🔵 action | 90° counter-clockwise |
| `Dev.x` | 🟢 int | Current column coordinate |
| `Dev.y` | 🟢 int | Current row coordinate |

Dev is the only object that can move backwards (`step(-N)`).

---

## `Spaceship` – The delivery vehicle

| Call | Type | Notes |
| ------ | ------ | ------- |
| `Spaceship.step(N)` | 🔵 action | `N >= 0` only – **no backward** |
| `Spaceship.turnRight()` | 🔵 action | 90° clockwise |
| `Spaceship.turnLeft()` | 🔵 action | 90° counter-clockwise |
| `Spaceship.x` | 🟢 int | Current column coordinate |
| `Spaceship.y` | 🟢 int | Current row coordinate |

To reverse: call `turnRight()` (or `turnLeft()`) **twice**, then `step(N)`.

---

## `Item` / `Item[i]` – Collectible tiles

| Call | Type | Notes |
| ------ | ------ | ------- |
| `Item.x` | 🟢 int | Column coordinate |
| `Item.y` | 🟢 int | Row coordinate |
| `Item[i].broken()` | 🔴 bool | `True` = red/dangerous, **do not collect** |

Distance formula (when Dev faces increasing axis direction):

```python
d = Item.x - Dev.x   # or Item.y - Dev.y
Dev.step(d)          # works for both positive and negative d
```

Safe-collect pattern:

```python
for i in range(len_items):
    if not Item[i].broken():
        Dev.step(Item[i].y - Dev.y)
        # collect logic here
```

---

## `Flyer` / `Flyer[i]` – Flying board list (platforms)

| Call | Type | Notes |
| ------ | ------ | ------- |
| `Flyer[i].step(N)` | 🔵 action | `N >= 0` only – direction fixed by arrow |
| `Flyer[i].x` | 🟢 int | Column coordinate |
| `Flyer[i].y` | 🟢 int | Row coordinate |
| `Flyer.disappear()` | 🔴 bool | `True` while board is invisible/green |

### What are Flyers for?

Flyers are **moving platforms**, not gap-fillers you place statically. Think of them as conveyor tiles that travel in a fixed direction. Their arrow tells you the axis and direction; you code how far each one slides.

They are _indexed from 0_ like a list. Use the loop variable `i` to address them:

```python
for i in range(3):
    Flyer[i].step(i * 2)   # each board moves a different distance
```

**Disappear mechanic** – boards randomly vanish (turn green). Use `wait()` inside a `while` loop to pause until the board is back:

```python
while Flyer[0].disappear():
    wait()
# board is visible again – safe to proceed
```

**Gap bridging?** Indirectly yes – by positioning Flyers with `step()` you can line them up to create a traversable path across a gap, but it is a _scripted_ bridge, not a passive tile you drop in place.

---

## Control-flow cheatsheet (Python subset used)

```python
# Loop N times
for i in range(N):
    ...

# Conditional
if condition:
    ...
elif other_condition:
    ...
else:
    ...

# Boolean helpers on conditions
if not Item[i].broken(): ...
if Item[i].broken() or Flyer[0].disappear(): ...
if Item[i].x > Dev.x and not Item[i].broken(): ...

# Wait loop
while Flyer[0].disappear():
    wait()

# Function with parameters
def collect(a, b):
    Dev.step(a)
    Dev.turnRight()
    Dev.step(b)

collect(3, 2)
```

---

## Quick "is it a bool or an action?" rule of thumb

| Signature pattern | Category | Why |
| ------ | ------ | ------- |
| `.step(N)` | 🔵 action | mutates position |
| `.turnRight()` / `.turnLeft()` | 🔵 action | mutates heading |
| `.broken()` | 🔴 predicate | described as a "condition", used in `if` |
| `.disappear()` | 🔴 predicate | explicitly: _"can only be used as a condition, not as a command"_ |
| `.x` / `.y` | 🟢 property | bare attribute access, no `()` |

---
