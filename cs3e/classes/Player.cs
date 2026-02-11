/// <summary>
/// Soccer player with number, name, and fouls count.
/// </summary>
public class Player
{
    private int num;
    private string name;
    private int fouls;

    /// <summary>
    /// Default constructor: num=0, name="", fouls=0.
    /// </summary>
    public Player()
    {
        this.num = 0;
        this.name = "";
        this.fouls = 0;
    }

    /// <summary>
    /// Constructor with number and name (fouls initialized to 0).
    /// </summary>
    public Player(int num, string name)
    {
        this.num = num;
        this.name = name;
        this.fouls = 0;
    }

    /// <summary>
    /// Copy constructor.
    /// </summary>
    public Player(Player p)
    {
        this.num = p.num;
        this.name = p.name;
        this.fouls = p.fouls;
    }

    /// <summary>
    /// Sets the player number.
    /// </summary>
    public void SetNum(int num)
    {
        this.num = num;
    }

    /// <summary>
    /// Sets the player name.
    /// </summary>
    public void SetName(string name)
    {
        this.name = name;
    }

    /// <summary>
    /// Sets the fouls count for the season.
    /// </summary>
    public void SetFouls(int fouls)
    {
        this.fouls = fouls;
    }

    /// <summary>
    /// Gets the player number.
    /// </summary>
    public int GetNum()
    {
        return this.num;
    }

    /// <summary>
    /// Gets the player name.
    /// </summary>
    public string GetName()
    {
        return this.name;
    }

    /// <summary>
    /// Gets the fouls count for the season.
    /// </summary>
    public int GetFouls()
    {
        return this.fouls;
    }

    /// <summary>
    /// Adds fouls to the total fouls count.
    /// </summary>
    public void AddFouls(int fouls)
    {
        this.fouls += fouls;
    }

    /// <summary>
    /// Checks full equality across all player fields.
    /// </summary>
    public bool Equals(Player other)
    {
        return this.num == other.num && this.name.Equals(other.name) && this.fouls == other.fouls;
    }
}
