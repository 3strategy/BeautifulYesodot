/**
 * Represents a point in a 2D Cartesian coordinate system.
 */
public class Point
{
    private double x;
    private double y;

    /**
     * Creates a point at the origin (0,0).
     */
    public Point()
    {
        x = 0.0;
        y = 0.0;
    }

    /**
     * Creates a point with the specified x and y coordinates.
     */
    public Point(double x, double y)
    {
        this.x = x;
        this.y = y;
    }

    /**
     * Creates a point with the same coordinates as another point.
     */
    public Point(Point other)
    {
        x = other.x;
        y = other.y;
    }

    /**
     * Gets the x-coordinate of the point.
     */
    public double getX()
    {
        return x;
    }

    /**
     * Sets the x-coordinate of the point.
     */
    public void setX(double newX)
    {
        x = newX;
    }

    /**
     * Gets the y-coordinate of the point.
     */
    public double getY()
    {
        return this.y;
    }

    /**
     * Sets the y-coordinate of the point.
     */
    public void setY(double newY)
    {
        this.y = newY;
    }

    /**
     * Returns the quadrant the point lies in. If the point is on an axis, returns 0.
     */
    public int quadrant()
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

    /**
     * Returns the distance between this point and another point.
     */
    public double distance(Point other)
    {
        return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
    }

    /**
     * Returns the midpoint between this point and another point.
     */
    public Point middle(Point p)
    {
        double middleX = (this.x + p.x) / 2;
        double middleY = (this.y + p.y) / 2;
        return new Point(middleX, middleY);
    }

    /**
     * Returns a String representation of the point.
     */
    @Override
    public String toString()
    {
        return "(" + formatCoordinate(this.x) + "," + formatCoordinate(this.y) + ")";
    }

    // Keep whole coordinates compact, matching the C# file's output: (0,0).
    private static String formatCoordinate(double value)
    {
        if (Double.isFinite(value))
            return java.math.BigDecimal.valueOf(value).stripTrailingZeros().toPlainString();
        return Double.toString(value);
    }
}
