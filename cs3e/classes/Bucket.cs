/// <summary>
/// Represents a bucket with a fixed capacity that can be filled and emptied.
/// </summary>
public class Bucket
{
    // תכונות הדלי
    private string name;
    private int capacity;
    private int currentAmount;

    private static int bucketsCount = 0;
    private int id;

    /// <summary>
    /// בנאי הדלי. יוצר דלי חדש
    /// Initializes a new empty bucket with a given capacity and name.
    /// </summary>
    /// <param name="capacity">The maximum amount the bucket can hold.</param>
    /// <param name="name">The display name of the bucket.</param>
    public Bucket(int capacity, string name)
    {
        this.name = name;
        this.capacity = capacity;
        this.currentAmount = 0;

        this.id = bucketsCount++;
    }

    /// <summary>
    /// פעולה מאחזרת: Returns the capacity of the bucket.
    /// </summary>
    /// <returns>The bucket capacity.</returns>
    public int GetCapacity()
    {
        return this.capacity;
    }

    /// <summary>
    /// פעולה מאחזרת: Returns the current amount of liquid in the bucket.
    /// </summary>
    /// <returns>The current amount in the bucket.</returns>
    public int GetCurrentAmount()
    {
        return this.currentAmount;
    }

    /// <summary>
    /// Removes a specified amount from the bucket.
    /// </summary>
    /// <param name="amountToRemove">The amount to remove.</param>
    public void Empty(int amountToRemove)
    {
        if (this.currentAmount < amountToRemove)
            this.currentAmount = 0;
        else
            this.currentAmount = this.currentAmount - amountToRemove;
    }

    /// <summary>
    /// Empties the bucket completely.
    /// </summary>
    public void EmptyAll()
    {
        this.currentAmount = 0;
    }

    /// <summary>
    /// Checks whether the bucket is empty.
    /// </summary>
    /// <returns>True if the bucket contains no liquid; otherwise, false.</returns>
    public bool IsEmpty()
    {
        return this.currentAmount == 0;
    }

    /// <summary>
    /// Adds a specified amount to the bucket without exceeding its capacity.
    /// </summary>
    /// <param name="amountToAdd">The amount to add.</param>
    public void Fill(int amountToAdd)
    {
        if (this.capacity < this.currentAmount + amountToAdd)
        {
            this.currentAmount = this.capacity;
        }
        else
            this.currentAmount += amountToAdd;
    }

    /// <summary>
    /// Pours as much as possible from this bucket into another bucket.
    /// </summary>
    /// <param name="bucketInto">The bucket to pour into.</param>
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

    /// <summary>
    /// מחזיר מחרוזת המתארת את הדלי. Returns a string that describes the bucket and its current amount.
    /// </summary>
    /// <returns>A string describing the bucket.</returns>
    public override String ToString()
    {
        return $"Bucket {this.name} with capacity={this.capacity} and " +
               $"amount={this.currentAmount}";
    }

    /// <summary>
    /// מצייר את הדלי. Draws a visual representation of the bucket in the console.
    /// </summary>
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
}
