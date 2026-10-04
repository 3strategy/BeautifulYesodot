/**
 * Console drawing helpers for a 2D coordinate system.
 *
 * Copy this file into your Java project's source folder (no package is needed).
 * This class uses ANSI cursor-position sequences. Run your program in a terminal
 * that supports them, such as IntelliJ's Terminal tool window, rather than a Run
 * console that prints escape sequences literally. For example, from the folder
 * containing the files: javac Main.java Drawing.java, then java Main.
 *
 * Java does not provide Console.WindowWidth/WindowHeight. The drawing area
 * defaults to 80 columns and 25 rows; use java -Ddrawing.width=100
 * -Ddrawing.height=30 Main to match a different terminal size.
 * After setPosition(x, y), use System.out.print(...) to draw at that point.
 */
public final class Drawing
{
    private static final int WINDOW_WIDTH = Math.max(20, Integer.getInteger("drawing.width", 80));
    private static final int WINDOW_HEIGHT = Math.max(5, Integer.getInteger("drawing.height", 25));

    /** The minimum y-coordinate supported by the drawing area. */
    public static int MIN_Y = -(WINDOW_HEIGHT - 1) / 2;

    /** The maximum y-coordinate supported by the drawing area. */
    public static int MAX_Y = (WINDOW_HEIGHT - 1) / 2;

    /** The minimum x-coordinate supported by the drawing area. */
    public static int MIN_X = -(WINDOW_WIDTH - 1) / 2;

    /** The maximum x-coordinate supported by the drawing area. */
    public static int MAX_X = (WINDOW_WIDTH - 1) / 2;

    private static boolean axesExist = false;

    private Drawing()
    {
    }

    /** Draws the x and y axes once in the console. */
    public static void drawAxes()
    {
        if (axesExist)
            return;

        for (int x = 0; x < MAX_X * 2 + 1; x++)
        {
            setCursorPosition(x, MAX_Y);
            System.out.print("-");
        }
        for (int y = 0; y < MAX_Y * 2 + 1; y++)
        {
            setCursorPosition(MAX_X, y);
            System.out.print("|");
        }
        setCursorPosition(MAX_X, MAX_Y);
        System.out.print("+");
        setCursorPosition(0, 0);
        System.out.print("(" + MIN_X + "," + MIN_Y + ")");
        String label = "(" + MAX_X + "," + MAX_Y + ")";
        // Keep the label inside the terminal to avoid scrolling the axes.
        setCursorPosition(MAX_X * 2 - label.length() + 1, MAX_Y * 2);
        System.out.print(label);
        System.out.flush();

        axesExist = true;
    }

    /**
     * Positions the cursor at (x,y), with the origin in the center of the area.
     * Positive x points right and positive y points up.
     * An out-of-bounds coordinate prints an error and leaves the cursor unset.
     */
    public static void setPosition(int x, int y)
    {
        if (x < MIN_X || x > MAX_X)
        {
            System.out.println("x=" + x + " is out of bounds [" + MIN_X + "," + MAX_X + "]");
            return;
        }

        if (y < MIN_Y || y > MAX_Y)
        {
            System.out.println("y=" + y + " is out of bounds [" + MIN_Y + "," + MAX_Y + "]");
            return;
        }

        setCursorPosition(MAX_X + x, MAX_Y - y);
        System.out.flush();
    }

    // ANSI terminal coordinates start at 1, whereas C# console coordinates start at 0.
    private static void setCursorPosition(int column, int row)
    {
        System.out.print("\u001B[" + (row + 1) + ";" + (column + 1) + "H");
    }
}
