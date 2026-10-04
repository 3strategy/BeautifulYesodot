/**
 * Represents a bucket with a fixed capacity that can be filled and emptied.
 */
public class Bucket
{
    // תכונות הדלי
    private String name;
    private int capacity;
    private int currentAmount;

    private static int bucketsCount = 0;
    private int id;

    /**
     * בנאי הדלי. יוצר דלי חדש
     * Initializes a new empty bucket with a given capacity and name.
     */
    public Bucket(int capacity, String name)
    {
        this.name = name;
        this.capacity = capacity;
        this.currentAmount = 0;

        this.id = bucketsCount++;
    }

    /**
     * פעולה מאחזרת: Returns the capacity of the bucket.
     */
    public int getCapacity()
    {
        return this.capacity;
    }

    /**
     * פעולה מאחזרת: Returns the current amount of liquid in the bucket.
     */
    public int getCurrentAmount()
    {
        return this.currentAmount;
    }

    /**
     * Removes a specified amount from the bucket.
     */
    public void empty(int amountToRemove)
    {
        if (this.currentAmount < amountToRemove)
            this.currentAmount = 0;
        else
            this.currentAmount = this.currentAmount - amountToRemove;
    }

    /**
     * Empties the bucket completely.
     */
    public void emptyAll()
    {
        this.currentAmount = 0;
    }

    /**
     * Checks whether the bucket is empty.
     */
    public boolean isEmpty()
    {
        return this.currentAmount == 0;
    }

    /**
     * Adds a specified amount to the bucket without exceeding its capacity.
     */
    public void fill(int amountToAdd)
    {
        if (this.capacity < this.currentAmount + amountToAdd)
        {
            this.currentAmount = this.capacity;
        }
        else
            this.currentAmount += amountToAdd;
    }

    /**
     * Pours as much as possible from this bucket into another bucket.
     */
    public void pourInto(Bucket bucketInto)
    {
        int freespace = bucketInto.getCapacity() -
                        bucketInto.getCurrentAmount();
        if (this.currentAmount < freespace)
        {
            bucketInto.fill(this.currentAmount);
            this.currentAmount = 0;
        }
        else
        {
            bucketInto.fill(freespace);
            this.currentAmount -= freespace;
        }
    }

    /**
     * מחזיר מחרוזת המתארת את הדלי. Returns a String that describes the bucket and its current amount.
     */
    @Override
    public String toString()
    {
        return "Bucket " + this.name + " with capacity=" + this.capacity +
               " and amount=" + this.currentAmount;
    }
}
