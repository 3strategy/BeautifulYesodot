/// <summary>
/// Musical instrument with name, material, type, company, and price.
/// </summary>
public class Musical
{
    private string name; // instrument name
    private string material; // material
    private string type; // instrument type (wind/percussion/keys/strings)
    private string company; // company name
    private int price; // price in whole shekels

    /// <summary>
    /// Constructor with values for all properties.
    /// </summary>
    public Musical(string name, string material, string type, string company, int price)
    {
        this.name = name;
        this.material = material;
        this.type = type;
        this.company = company;
        this.price = price;
    }

    /// <summary>
    /// Copy constructor.
    /// </summary>
    public Musical(Musical other)
    {
        this.name = other.name;
        this.material = other.material;
        this.type = other.type;
        this.company = other.company;
        this.price = other.price;
    }

    /// <summary>
    /// Sets the material.
    /// </summary>
    public void SetMaterial(string material)
    {
        this.material = material;
    }

    /// <summary>
    /// Sets the instrument type.
    /// </summary>
    public void SetType(string type)
    {
        this.type = type;
    }

    /// <summary>
    /// Sets the company name.
    /// </summary>
    public void SetCompany(string company)
    {
        this.company = company;
    }

    /// <summary>
    /// Sets the price.
    /// </summary>
    public void SetPrice(int price)
    {
        this.price = price;
    }

    /// <summary>
    /// Gets the instrument name.
    /// </summary>
    public string GetName()
    {
        return this.name;
    }

    /// <summary>
    /// Gets the material.
    /// </summary>
    public string GetMaterial()
    {
        return this.material;
    }

    /// <summary>
    /// Gets the instrument type.
    /// </summary>
    public string GetType()
    {
        return this.type;
    }

    /// <summary>
    /// Gets the company name.
    /// </summary>
    public string GetCompany()
    {
        return this.company;
    }

    /// <summary>
    /// Gets the price.
    /// </summary>
    public int GetPrice()
    {
        return this.price;
    }

    /// <summary>
    /// String representation of the instrument.
    /// </summary>
    public override string ToString()
    {
        return "Musical name: " + this.name + " material: " + this.material + " type: " + this.type + " company: " + this.company + " price: " + this.price;
    }

    /// <summary>
    /// Applies a discount percent and returns the updated price.
    /// </summary>
    public int Calculate(int discountPercent)
    {
        this.price = this.price * (100 - discountPercent) / 100;
        return this.price;
    }

    /// <summary>
    /// Checks equality by properties (excluding price).
    /// </summary>
    public bool Equals(Musical other)
    {
        return this.name == other.name && this.material == other.material && this.type == other.type && this.company == other.company;
    }

    /// <summary>
    /// Compares prices of two instruments.
    /// </summary>
    public int CompareTo(Musical other)
    {
        if (this.price > other.price)
            return 1;
        if (this.price < other.price)
            return -1;
        return 0;
    }
}
