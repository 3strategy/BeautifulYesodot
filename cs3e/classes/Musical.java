/**
 * Musical instrument with name, material, type, company, and price.
 */
public class Musical
{
    private String name; // instrument name
    private String material; // material
    private String type; // instrument type (wind/percussion/keys/strings)
    private String company; // company name
    private int price; // price in whole shekels

    /**
     * Constructor with values for all properties.
     */
    public Musical(String name, String material, String type, String company, int price)
    {
        this.name = name;
        this.material = material;
        this.type = type;
        this.company = company;
        this.price = price;
    }

    /**
     * Copy constructor.
     */
    public Musical(Musical other)
    {
        this.name = other.name;
        this.material = other.material;
        this.type = other.type;
        this.company = other.company;
        this.price = other.price;
    }

    /**
     * Sets the material.
     */
    public void setMaterial(String material)
    {
        this.material = material;
    }

    /**
     * Sets the instrument type.
     */
    public void setType(String type)
    {
        this.type = type;
    }

    /**
     * Sets the company name.
     */
    public void setCompany(String company)
    {
        this.company = company;
    }

    /**
     * Sets the price.
     */
    public void setPrice(int price)
    {
        this.price = price;
    }

    /**
     * Gets the instrument name.
     */
    public String getName()
    {
        return this.name;
    }

    /**
     * Gets the material.
     */
    public String getMaterial()
    {
        return this.material;
    }

    /**
     * Gets the instrument type.
     */
    public String getType()
    {
        return this.type;
    }

    /**
     * Gets the company name.
     */
    public String getCompany()
    {
        return this.company;
    }

    /**
     * Gets the price.
     */
    public int getPrice()
    {
        return this.price;
    }

    /**
     * String representation of the instrument.
     */
    @Override
    public String toString()
    {
        return "Musical name: " + this.name + " material: " + this.material + " type: " + this.type + " company: " + this.company + " price: " + this.price;
    }

    /**
     * Applies a discount percent and returns the updated price.
     */
    public int calculate(int discountPercent)
    {
        this.price = this.price * (100 - discountPercent) / 100;
        return this.price;
    }

    /**
     * Checks equality by properties (excluding price).
     */
    public boolean equals(Musical other)
    {
        return java.util.Objects.equals(this.name, other.name)
            && java.util.Objects.equals(this.material, other.material)
            && java.util.Objects.equals(this.type, other.type)
            && java.util.Objects.equals(this.company, other.company);
    }

    /**
     * Compares prices of two instruments.
     */
    public int compareTo(Musical other)
    {
        if (this.price > other.price)
            return 1;
        if (this.price < other.price)
            return -1;
        return 0;
    }
}
