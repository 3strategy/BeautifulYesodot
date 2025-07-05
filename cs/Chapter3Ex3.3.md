---
layout: page
title: "תרגול אתגר בתנאים ושארית חלוקה"
subtitle: "תרגול 3.3 מידול המציאות תנאים מורכבים ושארית חלוקה"
author: גיא סידס
mathjax: true
lang: he
---

התרגילים שכאן מאתגרים ומתאימים לסוף שנת הלימוד. למרות שהידע התחבירי דורש רק תנאים ושארית חלוקה, החשיבה שנדרשת לתרגום בעיה מציאותית לתבנית אלגברית אינה פשוטה.
{: .box-note}



<style>
.chess-board {
  border-collapse: collapse;
  border: 2px solid #333;
}

.chess-board td, .chess-board th {
  width: 40px;
  height: 40px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid #333;
  font-weight: bold;
}

.chess-board th {
  background-color: #ddd;
  color: #000090;

}

.white {
  background-color: #f0d9b5;
}

.black {
  background-color: #b58863;
}
</style>


<table class="chess-board, table-en">
  <tr>
    <th></th>
    <th>0</th>
    <th>1</th>
    <th>2</th>
    <th>3</th>
    <th>4</th>
    <th>5</th>
    <th>6</th>
    <th>7</th>
  </tr>
  <tr>
    <th>0</th>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
  </tr>
  <tr>
    <th>1</th>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
  </tr>
  <tr>
    <th>2</th>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
  </tr>
  <tr>
    <th>3</th>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
  </tr>
  <tr>
    <th>4</th>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
  </tr>
  <tr>
    <th>5</th>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
  </tr>
  <tr>
    <th>6</th>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
  </tr>
  <tr>
    <th>7</th>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
    <td class="black"></td>
    <td class="white"></td>
  </tr>
</table>


<details><summary>לנוחותכם מצורף קוד להעתקה המצייר את הלוח ועליו הצריח והפרש במיקום שנקלט מהמשתמש.</summary>

{% highlight csharp linenos %}class Program
{
  static void Main()
  {
    // need strings since perfect square
    // requires 2 characters 
    string[,] board = new string[8, 8];

    // Fill board
    for (int row = 0; row < 8; row++)
    {
      for (int col = 0; col < 8; col++)
      {
        if ((row + col) % 2 == 0)
          board[row, col] = "██"; // Light squares
        else
          board[row, col] = "  "; // Dark squares
      }
    }

    DrawBoard(board); // Display initial board
    // Get positions
    Console.Write("Enter a rook Row: ");
    int rookRow = int.Parse(Console.ReadLine());
    Console.Write("Enter a rook Column: ");
    int rookCol = int.Parse(Console.ReadLine());
    Console.Write("Enter a bishop Row: ");
    int bishRow = int.Parse(Console.ReadLine());
    Console.Write("Enter a bishop Column: ");
    int bishCol = int.Parse(Console.ReadLine());

    board[rookRow, rookCol] = "R ";
    board[bishRow, bishCol] = "B ";

    DrawBoard(board); // Display final board

    //TODO: בידקו אם הרץ נמצא על המשבצות השחורות
    if (true)
      Console.WriteLine("\nBishop is on the blacks");

    // TODO: עדכנו את התנאי כדי לזהות איום של צריח
    if (true)
      Console.WriteLine("\nrook threathens bishop");

    // TODO: עדכנו את התנאי כדי לזהות איום של רץ
    if (true)
      Console.WriteLine("\nbishop threatens rook");

  }

  static void DrawBoard(string[,] board)
  {
    Console.Clear();
    Console.WriteLine();
    // Print column numbers header
    Console.Write("  ");
    for (int col = 0; col < 8; col++)
      Console.Write($"{col} ");

    Console.WriteLine();

    // Print board with row numbers
    for (int row = 0; row < 8; row++)
    {
      Console.Write($"{row} ");
      for (int col = 0; col < 8; col++)
        Console.Write($"{board[row, col]}");

      Console.WriteLine();
    }
  }
}
{% endhighlight %}

</details>

## עליכם להשלים את הקוד כדי לזהות מצבים על הלוח

## 3.3.1 רץ נמצא על משבצות שחורות
עדכנו את התנאי בשורה מממ בקוד כדי לזהות אם הרץ נמצא על המשבצות השחורות.

מינוחים: 
- צריח: Rook, 
- רץ: Bishop
- טור: Column
- שורה: Row
- שמות משתנים למיקום צריח: **rookRow, rookCol**
- שמות משתנים למיקום רץ: **bishRow, bishCol**

---

## 3.3.2 צריח מאיים על רץ
צריח מאיים על רץ אם שניהם נמצאים באותה עמודה או באותה שורה. כתבו תנאי שמתקיים כאשר צריח מאיים על הרץ

---

## 3.3.3 רץ מאיים על צריח
רץ מאיים על צריח כאשר הם נמצאים על אותו אלכסון. כתבו תנאי שמתקיים כאשר רץ מאיים על צריח. 

---

## 3.3.4 סוס מאיים על רץ
עדכנו את הקוד: הוסיפו סוס למערכה וכתבו תנאי המזהה אם הסוס מאיים על הרץ. מומלץ בשלב הפיתוח להגדיר מיקומים באופן ידני ללא קלט. לבסוף כשהכל עובד ניתן להוסיף קלט מהמשתמש.



