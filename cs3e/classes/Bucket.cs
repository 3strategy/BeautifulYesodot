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
    public int GetCapacity()
    {
        return this.capacity;
    }

    /// <summary>
    /// פעולה מאחזרת: Returns the current amount of liquid in the bucket.
    /// </summary>
    public int GetCurrentAmount()
    {
        return this.currentAmount;
    }

    /// <summary>
    /// Removes a specified amount from the bucket.
    /// </summary>
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
    public bool IsEmpty()
    {
        return this.currentAmount == 0;
    }

    /// <summary>
    /// Adds a specified amount to the bucket without exceeding its capacity.
    /// </summary>
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
    public override String ToString()
    {
        return $"Bucket {this.name} with capacity={this.capacity} and " +
               $"amount={this.currentAmount}";
    }
}
