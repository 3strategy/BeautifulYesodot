/// <summary>
/// Provides console drawing helpers for a 2D coordinate system.
/// </summary>
/// <remarks>
/// Note: copy this class into the appropriate project location after using Ctrl+Shift+A.
/// </remarks>
public static class Drawing
{
    /// <summary>
    /// The minimum y-coordinate supported by the console drawing area.
    /// </summary>
    public static int MIN_Y = -(Console.WindowHeight - 1) / 2;

    /// <summary>
    /// The maximum y-coordinate supported by the console drawing area.
    /// </summary>
    public static int MAX_Y = (Console.WindowHeight - 1) / 2;

    /// <summary>
    /// The minimum x-coordinate supported by the console drawing area.
    /// </summary>
    public static int MIN_X = -(Console.WindowWidth - 1) / 2;

    /// <summary>
    /// The maximum x-coordinate supported by the console drawing area.
    /// </summary>
    public static int MAX_X = (Console.WindowWidth - 1) / 2;

    private static bool bAxesExists = false;

    /// <summary>
    /// Draws the x and y axes once in the console.
    /// </summary>
    public static void DrawAxes()
    {
        if (bAxesExists)
            return;

        for (int x = 0; x < MAX_X * 2 + 1; x++)
        {
            Console.SetCursorPosition((int)x, MAX_Y);
            Console.Write("-");
        }
        for (int y = 0; y < MAX_Y * 2 + 1; y++)
        {
            Console.SetCursorPosition(MAX_X, (int)y);
            Console.Write("|");
        }
        Console.SetCursorPosition(MAX_X, MAX_Y);
        Console.Write("+");
        Console.SetCursorPosition(0, 0);
        Console.Write($"({MIN_X},{MIN_Y})");
        string s = $"({MAX_X},{MAX_Y})";
        Console.SetCursorPosition(MAX_X * 2 - s.Length + 1, MAX_Y * 2 + 1);
        Console.Write(s);

        bAxesExists = true;
    }

    /// <summary>
    /// Sets the cursor position using the drawing coordinate system.
    /// </summary>
    /// <param name="x">The x-coordinate to position the cursor at.</param>
    /// <param name="y">The y-coordinate to position the cursor at.</param>
    public static void SetPosition(int x, int y)
    {
        if (x < MIN_X || x > MAX_X)
        {
            Console.WriteLine($"x={x} is out of bounds [{MIN_X},{MAX_X}]");
            return;
        }

        if (y < MIN_Y || y > MAX_Y)
        {
            Console.WriteLine($"y={y} is out of bounds [{MIN_Y},{MAX_Y}]");
            return;
        }

        Console.SetCursorPosition(MAX_X + x, MAX_Y - y);
    }

}
