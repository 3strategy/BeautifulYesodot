/**
 * Soccer player with number, name, and fouls count.
 */
public class Player
{
    private int num;
    private String name;
    private int fouls;

    /**
     * Default constructor: num=0, name="", fouls=0.
     */
    public Player()
    {
        this.num = 0;
        this.name = "";
        this.fouls = 0;
    }

    /**
     * Constructor with number and name (fouls initialized to 0).
     */
    public Player(int num, String name)
    {
        this.num = num;
        this.name = name;
        this.fouls = 0;
    }

    /**
     * Copy constructor.
     */
    public Player(Player p)
    {
        this.num = p.num;
        this.name = p.name;
        this.fouls = p.fouls;
    }

    /**
     * Sets the player number.
     */
    public void setNum(int num)
    {
        this.num = num;
    }

    /**
     * Sets the player name.
     */
    public void setName(String name)
    {
        this.name = name;
    }

    /**
     * Sets the fouls count for the season.
     */
    public void setFouls(int fouls)
    {
        this.fouls = fouls;
    }

    /**
     * Gets the player number.
     */
    public int getNum()
    {
        return this.num;
    }

    /**
     * Gets the player name.
     */
    public String getName()
    {
        return this.name;
    }

    /**
     * Gets the fouls count for the season.
     */
    public int getFouls()
    {
        return this.fouls;
    }

    /**
     * Adds fouls to the total fouls count.
     */
    public void addFouls(int fouls)
    {
        this.fouls += fouls;
    }

    /**
     * Checks full equality across all player fields.
     */
    public boolean equals(Player other)
    {
        return this.num == other.num && this.name.equals(other.name) && this.fouls == other.fouls;
    }
}
