---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "משתנים הבנויים כאוסף"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי]
mathjax: true
lang: he
---





```csharp
static void Main(string[] args)
{
    string car = "BMW";

    Console.WriteLine(car);
}
```

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars);
}
```

```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars[0]);
}
```


```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    Console.WriteLine(cars[0]);
    Console.WriteLine(cars[1]);
    Console.WriteLine(cars[2]);
    Console.WriteLine(cars[3]); //index out of range exception

    
}
```



```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };
    try
    {
        Console.WriteLine(cars[0]);
        Console.WriteLine(cars[1]);
        Console.WriteLine(cars[2]);
        Console.WriteLine(cars[3]); //index out of range exception
        Console.ReadLine();
    }
    catch (Exception e)
    {
        Console.WriteLine($"we had aproblem: {e.Message}");
    }
}
```


```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };
    
    for (int i = 0; i < cars.Length; i++)
        Console.WriteLine(cars[i]);
}
```



```csharp
static void Main(string[] args)
{
    string[] cars = { "BMW", "Ford", "Kia" };

    foreach (string car in cars)
        Console.WriteLine(car); // הרבה יותר פשוט
}
```



```csharp
static void Main(string[] args)
{
    string[] cars = new string[5]; // איתחול לגודל 5
    
    for (int i = 0; i < cars.Length; i++)
    {
        cars[i] = "BMW" + i + 100;
        Console.WriteLine(cars[i]);
    }
}
```



```csharp
static void Main(string[] args)
{
    string[] cars = new string[5];

    foreach (string car in cars) 
        car = "BMW"; // ===== לא אפשרי  ======
}
```
