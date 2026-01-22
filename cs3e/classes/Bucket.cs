
// This class represents a Bucket
public class Bucket
{
    // The attributes of the class
    private string name;
    private int capacity;
    private int currentAmount;

    // Internal attributes used for drawing
    static private int bucketsCount = 0;
    private int id;

    // A constructor for the class.
    // Receives one parameter for capacity and one for bucket's name
    // Builds a new empty Bucket according to capacity parameter
    public Bucket(int capacity, string name)
    {
        this.name = name;
        this.capacity = capacity;
        this.currentAmount = 0;

        this.id = bucketsCount++;
    }

    // Methods:

    // Returns the capacity of the bucket
    public int GetCapacity()
    {
        return this.capacity;
    }

    // Returns the current amount in the bucket
    public int GetCurrentAmount()
    {
        return this.currentAmount;
    }

    // Receives amount and remove it from the bucket
    public void Empty(int amountToRemove)
    {
        if (this.currentAmount < amountToRemove)
            this.currentAmount = 0;
        else
            this.currentAmount = this.currentAmount - amountToRemove;
    }

    // Empties the bucket completely
    public void EmptyAll()
    {
        this.currentAmount = 0;
    }

    // Checks if the bucket is empty
    public bool IsEmpty()
    {
        return this.currentAmount == 0;
    }

    // Receives amount and add it to the amount it the bucket
    public void Fill(int amountToAdd)
    {
        // if the capacity is too small
        if (this.capacity < this.currentAmount + amountToAdd)
        {
            this.currentAmount = this.capacity;
        }
        else
            this.currentAmount += amountToAdd;
    }

    // Receives a bucket and fill it as much as possible from the
    // current bucket
    public void PourInto(Bucket bucketInto)
    {
        int freespace = bucketInto.GetCapacity() -
                        bucketInto.GetCurrentAmount();
        if (this.currentAmount < freespace)
        {
            bucketInto.Fill(this.currentAmount);
            this.currentAmount = 0;
        }
        else
        {
            bucketInto.Fill(freespace);
            this.currentAmount -= freespace;
        }
    }

    // Builds and returns a String from the bucket's attributes and their value
    public override String ToString()
    {
        return $"Bucket {this.name} with capacity={this.capacity} and " +
               $"amount={this.currentAmount}";
    }

    // Draw the bucket
    public void Draw()
    {
        int maxCapacity = Drawing.MAX_Y * 2 - 1;
        if (this.capacity > maxCapacity)
        {
            Console.WriteLine($"Draw() supports buckets with max capacity of {maxCapacity + 1}");
            return;
        }

        int maxID = (Drawing.MAX_X - Drawing.MIN_X) / 10 - 1;
        if (this.id > maxID)
        {
            Console.WriteLine($"Can't draw more than {maxID} buckets");
            return;
        }

        for (int i = -1; i <= this.capacity +1; i++)
        {
            Drawing.SetPosition(Drawing.MIN_X + 10 * id, Drawing.MIN_Y + i + 1);
            if (i == -1)
                Console.Write($"({this.currentAmount}/{this.capacity})  ");
            else if (i == 0)
                Console.Write(this.name);
            else if (i == 1)
                Console.Write("--------");
            else if (i <= this.currentAmount +1)
                Console.Write("|******|");
            else
                Console.Write("|      |");
        }

        Thread.Sleep(500);
    }

} // end of class