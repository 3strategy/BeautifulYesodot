---
layout: page
title: "Objects 03b Sprite Demo"
subtitle: "Dont Ask Tell with a tiny console Sprite class"
chapter: 11.3b
tags: [OOP, C#, Sprite, Console,Game, DontAskTell]
lang: en
---

<style>
html {
  direction: ltr !important;
}
body {
  text-align: left !important;
}
</style>

## Core message

- `Program` should not ask for internals and draw by itself.
- `Program` should tell the object: `sprite.MoveNDraw();`

## Stage 1 - First Pass (GS Snippet Style)

First pass is intentionally plain:

- all `private` fields first
- constructor second
- vanilla Java-style getters/setters third

```csharp
public class Sprite
{
    private double x, y; // later make gs private setters with if
    // just fields:
    private double dX,dY; // just fields
    private string shape; // just field
    private ConsoleColor color; // just field
    private int maxX, maxY; // just field

    public Sprite(double x, double y, string shape, ConsoleColor color, double dx = 0.2, double dy = 0.2)
    {
        this.shape = shape;
        this.color = color;
        this.maxX = Console.WindowWidth - 1;
        this.maxY = Console.WindowHeight - 1;
        dX = dx;
        dY = dy;
        SetX(x);
        SetY(y);
    }

    public double GetY() => y;
    public void SetY(double value) => y = value;
    public double GetX() => x;
    public void SetX(double value) => x = value;
}
```

Bad Usage Example (Program asks for internals and draws by itself):

```csharp
Sprite s = new Sprite(10, 5, "O", ConsoleColor.Green, 0.2, 0.2);
Console.ForegroundColor = ConsoleColor.Green;
Console.SetCursorPosition((int)Math.Round(s.GetX()), (int)Math.Round(s.GetY()));
Console.Write("O");
```

Teacher line:

- This works, but `Program` is doing the sprite's drawing job.

## Stage 2 - Add Draw/Erase as One Method

Now give the object its own console behavior.

```diff
+private int GetXInt() => (int)Math.Round(x);
+private int GetYInt() => (int)Math.Round(y);
+
+/// <summary>
+/// Draws in the given color.
+/// Call without color to erase (default black).
+/// </summary>
+public void DrawErase(ConsoleColor drawColor = ConsoleColor.Black)
+{
+    Console.ForegroundColor = drawColor;
+    Console.SetCursorPosition(GetXInt(), GetYInt());
+    Console.Write(shape);
+}
```

How to use right now:

```diff
+Sprite s = new Sprite(10, 5, "O", ConsoleColor.Green,0.2,0.2);
+s.DrawErase(ConsoleColor.Green);
```

Teacher line:

- Default argument is black, so same method can erase.

## Stage 3 - Add MoveNDraw (Dont Ask Tell)

Main behavior: erase old, move by `dX`/`dY`, draw new.

```diff
-    public double GetY() => y;  // ==BREAKING Change==
-    public double GetX() => x;  // ==BREAKING Change==
+
+public void MoveNDraw()
+{
+    DrawErase();
+    SetX(x + dX);
+    SetY(y + dY);
+    DrawErase(color);
+}
```

Teacher line:

- Program no longer calculates cursor location or paint details.
- Program tells sprite to perform its own job.
- Old `Program` code that relied on `GetX/GetY` should now break, on purpose.


## Stage 4 - Modify the Vanilla Code for Game Rules (Bounds Protection)

Edit the generated constructor/getters/setters (do not rewrite from scratch).
At this stage, keep movement updates internal and add bounds protection in `SetX/SetY`.

```diff


-public void SetX(double value) => x = value;
+private void SetX(double value)
+ {
+    if (value < 0) x = 0;
+    else if (value > maxX) x = maxX;
+    else x = value;
+ }
 
-public void SetY(double value) => y = value;
+private void SetY(double value)
+{
+    if (value < 0) y = 0;
+    else if (value > maxY) y = maxY;
+    else y = value;
+}
```

Teacher line:

- We use `double` for movement accuracy, but console draw needs rounded ints.
- `Program` cannot directly set `x/y` anymore; it must tell the sprite what to do.


## Stage 5 - Program Loop

Very small demo loop for class.

```diff
+Sprite s1 = new Sprite(10, 5, "O", ConsoleColor.Yellow, 0.35, 0.18);
+Sprite s2 = new Sprite(10, 5, "O", ConsoleColor.Yellow, 0.35, -0.18);
+
+while (!Console.KeyAvailable)
+{
+    s1.MoveNDraw();
+    s2.MoveNDraw();
+    Thread.Sleep(30);
+}
```

Optional quick key to stop:

```csharp
Console.ReadKey(true);
```

<details markdown="1"><summary>Later Stage (Optional): key constructor + while-only game loop</summary>

Use this in a later lesson so each sprite can own its control mapping and keyboard behavior.
Default mapping is arrows from the base constructor; overload only when you want custom keys.

```diff
+private ConsoleKey leftKey;
+private ConsoleKey rightKey;
+private ConsoleKey upKey;
+private ConsoleKey downKey;
+
+public Sprite(double x, double y, string shape, ConsoleColor color)
+{
+    this.shape = shape;
+    this.color = color;
+    this.maxX = Console.WindowWidth - 1;
+    this.maxY = Console.WindowHeight - 1;
+    this.leftKey = ConsoleKey.LeftArrow;
+    this.rightKey = ConsoleKey.RightArrow;
+    this.upKey = ConsoleKey.UpArrow;
+    this.downKey = ConsoleKey.DownArrow;
+    SetX(x);
+    SetY(y);
+}
+
+public Sprite(double x, double y, string shape, ConsoleColor color, ConsoleKey leftKey, ConsoleKey rightKey, ConsoleKey upKey, ConsoleKey downKey)
+    : this(x, y, shape, color)
+{
+    this.leftKey = leftKey;
+    this.rightKey = rightKey;
+    this.upKey = upKey;
+    this.downKey = downKey;
+}
+
+public void HandleKey(ConsoleKey key)
+{
+    if (key == leftKey) SetDX(-Math.Abs(dX) - 0.1);
+    else if (key == rightKey) SetDX(Math.Abs(dX) + 0.1);
+    else if (key == upKey) SetDY(-Math.Abs(dY) - 0.1);
+    else if (key == downKey) SetDY(Math.Abs(dY) + 0.1);
+}
```

Note: This optional `HandleKey` snippet assumes `SetDX/SetDY` methods exist (shown in the final state below).

Teacher line:

- This still follows Dont Ask Tell: `sprite.HandleKey(key)` instead of key logic spread in `Program`.

While-only game loop template (no `do-while`):

```csharp
bool running = true;
while (running)
{
    while (!Console.KeyAvailable)
    {
        s.MoveNDraw();
        Thread.Sleep(30);
    }

    ConsoleKey key = Console.ReadKey(true).Key;
    if (key == ConsoleKey.Escape)
        running = false;
    else
        s.HandleKey(key);
}
```

</details>

## Final Sprite.cs (Simple Version)

{% highlight csharp linenos %}
public class Sprite
{
    private double x, y; // gs private setters
    //just fields
    private double dX, dY; // just fields
    private string shape; // just field
    private ConsoleColor color; // just field
    private int maxX, maxY; // just field
    public Sprite(double x, double y, string shape, ConsoleColor color, double dx = 0.2, double dy = 0.2)
    {
        this.shape = shape;
        this.color = color;
        this.maxX = Console.WindowWidth - 1;
        this.maxY = Console.WindowHeight - 1;
        dX = dx;
        dY = dy;
        SetX(x);
        SetY(y);
    }
    private void SetX(double value)
    {
        if (value < 0) x = 0;
        else if (value > maxX) x = maxX;
        else x = value;
    }
    private void SetY(double value)
    {
        if (value < 0)
            y = 0;
        else if (value > maxY) y = maxY;
        else y = value;
    }
    private int GetXInt() => (int)Math.Round(x);
    private int GetYInt() => (int)Math.Round(y);

    /// <summary>
    /// Draws in the given color.
    /// Call without color to erase (default black).
    /// </summary>
    public void DrawErase(ConsoleColor drawColor = ConsoleColor.Black)
    {
        Console.ForegroundColor = drawColor;
        Console.SetCursorPosition(GetXInt(), GetYInt());
        Console.Write(shape);
    }
    public void MoveNDraw()
    {
        DrawErase();
        SetX(x + dX);
        SetY(y + dY);
        DrawErase(color);
    }
}
{% endhighlight %}

## Final Program.cs (Simple Demo)

{% highlight csharp linenos %}
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.CursorVisible = false;

Sprite s = new Sprite(10, 5, "O", ConsoleColor.Yellow, 0.35, 0.18);

while (!Console.KeyAvailable)
{
    s.MoveNDraw();
    Thread.Sleep(30);
}

Console.ReadKey(true);
{% endhighlight %}

## In-Class Talking Points

- Dont Ask Tell: `Program` tells sprite what to do.
- Encapsulation: draw/move logic stays inside sprite.
- By Stage 4, `x/y` are no longer exposed (`GetX/GetY` removed in Stage 3, `SetX/SetY` become private in Stage 4).
- Accuracy: physics values are `double`, rendering uses rounded int.
- In the later optional version below, bounds default to current console size, but can be overridden in constructor.
- KIS: no inheritance, one class, one object, one behavior loop.

<details markdown="1"><summary>Final State (Copy/Paste): Arrow Keys Default + ESC loop</summary>

`Sprite.cs`

{% highlight csharp linenos %}
public class Sprite
{
    private double x;
    private double y;
    private double dX;
    private double dY;
    private string shape;
    private ConsoleColor color;
    private int maxX;
    private int maxY;
    private ConsoleKey leftKey;
    private ConsoleKey rightKey;
    private ConsoleKey upKey;
    private ConsoleKey downKey;

    // Default controls: arrow keys
    public Sprite(double x, double y, string shape, ConsoleColor color, int maxX = -1, int maxY = -1)
    {
        this.shape = shape;
        this.color = color;
        this.maxX = maxX >= 0 ? maxX : Console.WindowWidth - 1;
        this.maxY = maxY >= 0 ? maxY : Console.WindowHeight - 1;
        this.leftKey = ConsoleKey.LeftArrow;
        this.rightKey = ConsoleKey.RightArrow;
        this.upKey = ConsoleKey.UpArrow;
        this.downKey = ConsoleKey.DownArrow;
        SetX(x);
        SetY(y);
    }

    // Optional custom controls
    public Sprite(
        double x, double y, string shape, ConsoleColor color,
        ConsoleKey leftKey, ConsoleKey rightKey, ConsoleKey upKey, ConsoleKey downKey,
        int maxX = -1, int maxY = -1)
        : this(x, y, shape, color, maxX, maxY)
    {
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.upKey = upKey;
        this.downKey = downKey;
    }

    private void SetX(double value)
    {
        if (value < 0) x = 0;
        else if (value > maxX) x = maxX;
        else x = value;
    }

    private void SetY(double value)
    {
        if (value < 0) y = 0;
        else if (value > maxY) y = maxY;
        else y = value;
    }

    private int GetXInt() => (int)Math.Round(x);
    private int GetYInt() => (int)Math.Round(y);

    public void SetDX(double value) => dX = value;
    public void SetDY(double value) => dY = value;

    public void DrawErase(ConsoleColor drawColor = ConsoleColor.Black)
    {
        Console.ForegroundColor = drawColor;
        Console.SetCursorPosition(GetXInt(), GetYInt());
        Console.Write(shape);
    }

    public void MoveNDraw()
    {
        DrawErase();
        SetX(x + dX);
        SetY(y + dY);
        DrawErase(color);
    }

    public void HandleKey(ConsoleKey key)
    {
        if (key == leftKey) SetDX(-Math.Abs(dX) - 0.1);
        else if (key == rightKey) SetDX(Math.Abs(dX) + 0.1);
        else if (key == upKey) SetDY(-Math.Abs(dY) - 0.1);
        else if (key == downKey) SetDY(Math.Abs(dY) + 0.1);
    }
}
{% endhighlight %}

`Program.cs`

{% highlight csharp linenos %}
Console.OutputEncoding = System.Text.Encoding.UTF8;
Console.CursorVisible = false;
Console.Clear();

Sprite s = new Sprite(10, 5, "O", ConsoleColor.Yellow); // Arrow keys by default
s.SetDX(0.20);
s.SetDY(0.08);

bool running = true;
while (running)
{
    while (!Console.KeyAvailable)
    {
        s.MoveNDraw();
        Thread.Sleep(30);
    }

    ConsoleKey key = Console.ReadKey(true).Key;
    if (key == ConsoleKey.Escape)
        running = false;
    else
        s.HandleKey(key);
}

Console.ResetColor();
Console.SetCursorPosition(0, Console.WindowHeight - 1);
{% endhighlight %}

</details>
