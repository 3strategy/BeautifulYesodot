---
layout: page
title: "Краткий справочник по синтаксису: главы 1–2"
subtitle: "Ввод, преобразования, Math, Random и форматирование"
tags: [C#, синтаксис, справочник]
lang: ru
---

{: .box-note}
Используйте пример как памятку по вводу, вычислениям и выводу. Запустите программу, затем изменяйте по одной строке и объясняйте, как меняется результат.


<div class="lesson-back" markdown="1">

[← Предыдущая страница: Практика 2.1. Классы Math и Random]({{ '/csru/Chapter2Ex2.1/' | relative_url }}){: data-sequence-nav="prev"}

[Содержание курса]({{ '/csru/' | relative_url }})

</div>

## Пример целой программы

`rnd` объявлен внутри класса `Program`, но вне методов. `Main` — точка входа: выполнение начинается с него, а вызов `Q322()` запускает код примера.

```csharp
using System;

public class Program
{
    // Один генератор для методов этого класса.
    public static Random rnd = new Random();

    /// <summary>
    /// Пример ввода, вычислений и форматированного вывода.
    /// </summary>
    public static void Q322()
    {
        Console.Write("Введите целое число от 0 до 100: ");
        int min = int.Parse(Console.ReadLine()); // Ввод, преобразование, присваивание.

        int temp = rnd.Next(5, 11); // Целое число от 5 до 10 включительно.
        int max = Math.Max(temp, min); // Большее из двух значений.
        min = Math.Min(temp, min); // Присваивание без повторного объявления.
        double avg = ((double)min + max) / 2; // Сохраняем дробную часть.
        avg = Math.Round(avg, 3); // Округляем до трёх знаков после запятой.
        double sqr = Math.Sqrt(avg); // Квадратный корень.
        int twoToTheThird = (int)Math.Pow(2, 3); // 2³ = 8; результат приводим к int.

        Console.WriteLine($"Минимум: {min}, максимум: {max}");
        Console.WriteLine($"Корень: {sqr:F4}"); // Четыре знака только при выводе.
        Console.WriteLine($"Среднее: {avg:0.000}"); // Всегда три знака при выводе.

        int mod3 = max % 3; // Остаток от деления на 3.
        int rightDigit = max % 10; // Последняя цифра неотрицательного числа.
        int tensDigit = max / 10 % 10; // Цифра десятков.
        bool minIsEven = min % 2 == 0; // Результат сравнения: true или false.

        Console.WriteLine($"2³ = {twoToTheThird}; остаток: {mod3}");
        Console.WriteLine($"Единицы: {rightDigit}; десятки: {tensDigit}");
        Console.WriteLine($"Минимум чётный: {minIsEven}");
    }

    static void Main2()
    {
        // Здесь можно разместить ещё один пример.
    }

    public static void Main()
    {
        Q322();
        Main2();
    }
}
```

## Что помнить

- Объявление `int min = ...;` создаёт переменную. Следующее присваивание пишется как `min = ...;`.
- `rnd.Next(a, b)` включает нижнюю границу `a` и исключает верхнюю `b`.
- При делении двух `int` дробная часть теряется. Преобразуйте один из операндов в `double` **до** деления.
- `Math.Round` возвращает округлённое число. Формат `F4` меняет только вид числа при печати.
- Ввод и вывод дробных чисел зависят от региональных настроек компьютера. В самом коде дробные константы записываются с точкой.
- `==` сравнивает значения, а `=` присваивает значение. Подробнее логические выражения разобраны в главе 3.

[Глава 3: условия →]({{ '/csru/Chapter3/' | relative_url }}) · [Справочник по всей части A →]({{ '/csru/ChapterSyntaxSummary2/' | relative_url }})

<div class="lesson-next" markdown="1">

[Следующая страница: Глава 3. Условия, логические выражения и остаток от деления →]({{ '/csru/Chapter3/' | relative_url }}){: data-sequence-nav="next"}

</div>
