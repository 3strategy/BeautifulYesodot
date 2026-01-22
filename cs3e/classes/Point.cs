/// <summary>
/// Represents a point in a 2D Cartesian coordinate system.
/// </summary>
public class Point
{
    private double x;
    private double y;

    /// <summary>
    /// Creates a point at the origin (0,0).
    /// </summary>
    public Point()
    {
        x = 0.0;
        y = 0.0;
    }

    /// <summary>
    /// Creates a point with the specified x and y coordinates.
    /// </summary>
    public Point(double x, double y)
    {
        this.x = x;
        this.y = y;
    }

    /// <summary>
    /// Creates a point with the same coordinates as another point.
    /// </summary>
    public Point(Point other)
    {
        x = other.x;
        y = other.y;
    }

    /// <summary>
    /// Gets the x-coordinate of the point.
    /// </summary>
    public double GetX()
    {
        return x;
    }

    /// <summary>
    /// Sets the x-coordinate of the point.
    /// </summary>
    public void SetX(double newX)
    {
        x = newX;
    }

    /// <summary>
    /// Gets the y-coordinate of the point.
    /// </summary>
    public double GetY()
    {
        return this.y;
    }

    /// <summary>
    /// Sets the y-coordinate of the point.
    /// </summary>
    public void SetY(double newY)
    {
        this.y = newY;
    }

    /// <summary>
    /// Returns the quadrant the point lies in. If the point is on an axis, returns 0.
    /// </summary>
    public int Quadrant()
    {
        if (x > 0 && y > 0)
            return 1;
        else if (x < 0 && y > 0)
            return 2;
        else if (x < 0 && y < 0)
            return 3;
        else if (x > 0 && y < 0)
            return 4;
        else
            return 0;
    }

    /// <summary>
    /// Returns the distance between this point and another point.
    /// </summary>
    public double Distance(Point other)
    {
        return Math.Sqrt(Math.Pow(other.x - this.x, 2) + Math.Pow(other.y - this.y, 2));
    }

    /// <summary>
    /// Returns the midpoint between this point and another point.
    /// </summary>
    public Point Middle(Point p)
    {
        double middleX = (this.x + p.x) / 2;
        double middleY = (this.y + p.y) / 2;
        return new Point(middleX, middleY);
    }

    /// <summary>
    /// Returns a string representation of the point.
    /// </summary>
    public override string ToString()
    {
        return "(" + this.x + "," + this.y + ")";
    }

    /// <summary>
    /// Draws the point using the console drawing system.
    /// </summary>
    public void Draw(char c = '*')
    {
        Drawing.DrawAxes();
        Drawing.SetPosition((int)this.x, (int)this.y);
        Console.Write(c);
    }
}
