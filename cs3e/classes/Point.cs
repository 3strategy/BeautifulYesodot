public class Point
{
    private double x;
    private double y;

    // Create point with (0,0) coordinates
    public Point()
    {
        x = 0.0;
        y = 0.0;
    }

    // Create point with (x,y) coordinates
    public Point(double x, double y)
    {
        this.x = x;
        this.y = y;
    }

    // Create point with same coordinates as point 'other'
    public Point(Point other)
    {
        x = other.x;
        y = other.y;
    }

    public double GetX()
    {
        return x;
    }

    public void SetX(double newX)
    {
        x = newX;
    }

    public double GetY()
    {
        return this.y;
    }

    public void SetY(double newY)
    {
        this.y = newY;
    }

    // Return the quadrants the point lies in, if the point lies on axes
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

    // Return the distance between current point and and the one recieved
    public double Distance(Point other)
    {
        return Math.Sqrt(Math.Pow(other.x - this.x, 2) + Math.Pow(other.y - this.y, 2));
    }

    // Return a mid point between current point and and the one recieved
    public Point Middle(Point p)
    {
        double middleX = (this.x + p.x) / 2;
        double middleY = (this.y + p.y) / 2;
        return new Point(middleX, middleY);
    }

    public override string ToString()
    {
        return "(" + this.x + "," + this.y + ")";
    }

    // Draw character in point coordinates
    public void Draw(char c = '*')
    {
        Drawing.DrawAxes();
        Drawing.SetPosition((int)this.x, (int)this.y);
        Console.Write(c);
    }
}