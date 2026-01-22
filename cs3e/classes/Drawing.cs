// attention - copy this into the right place, after you Ctrl + Shift + A 
public static class Drawing
{
    static public int MIN_Y = -(Console.WindowHeight - 1) / 2;
    static public int MAX_Y = (Console.WindowHeight - 1) / 2;
    static public int MIN_X = -(Console.WindowWidth - 1) / 2;
    static public int MAX_X = (Console.WindowWidth - 1) / 2;

    static private bool bAxesExists = false;

    // Draw x/y axes 
    static public void DrawAxes()
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

    // Set cursor position
    static public void SetPosition(int x, int y)
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
