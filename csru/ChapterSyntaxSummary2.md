---
layout: page
title: "Справочник по синтаксису части A"
subtitle: "Вычисления, условия и циклы в одном примере"
tags: [C#, синтаксис, условия, циклы, справочник]
lang: ru
---

{: .box-note}
Повторите ввод, математические операции, условия и циклы. Найдите в программе знакомые конструкции, предскажите вывод и проверьте себя запуском.


<div class="lesson-back" markdown="1">

[← Предыдущая страница: Практика 4.5 — Сравнение соседних значений]({{ '/csru/Chapter4Ex4.5/' | relative_url }}){: data-sequence-nav="prev"}

[Содержание курса]({{ '/csru/' | relative_url }})

</div>

## Вычисления, условия и for

В примере `Q322` выполняет вычисления, а `Q333` показывает условия и циклы. Оба метода запускаются из `Main`. Вставьте программу в `Program.cs`, заменив предыдущий код.

```csharp
using System;

public class Program
{
    // Поле класса: один генератор доступен обоим статическим методам.
    public static Random rnd = new Random();

    /// <summary>
    /// Ввод, случайные числа и математические операции.
    /// </summary>
    public static void Q322()
    {
        Console.Write("Введите целое число от 0 до 100: ");
        int min = int.Parse(Console.ReadLine());

        int temp = rnd.Next(9, 31); // От 9 до 30 включительно.
        bool isOk = rnd.Next(0, 2) == 1; // Случайное логическое значение.
        int max = Math.Max(temp, min);
        min = Math.Min(temp, min); // Не объявляем min повторно.
        double avg = ((double)min + max) / 2;
        avg = Math.Round(avg, 3);
        double sqr = Math.Sqrt(avg);
        int twoToTheThird = (int)Math.Pow(2, 3);

        Console.WriteLine($"Минимум: {min}, максимум: {max}");
        Console.WriteLine($"Корень: {sqr:F4}");
        Console.WriteLine($"Среднее: {avg:0.000}");

        int mod3 = max % 3;
        int rightDigit = max % 10;
        int tensDigit = max / 10 % 10;
        bool minIsEven = min % 2 == 0;

        Console.WriteLine($"Остаток: {mod3}; единицы: {rightDigit}; десятки: {tensDigit}");
        Console.WriteLine($"Минимум чётный: {minIsEven}; случайный bool: {isOk}");
        Console.WriteLine($"2³ = {twoToTheThird}");
    }

    static void Q333()
    {
        int num = 5, length = 10;

        if (num == 0)
        {
            Console.WriteLine("Выполнено первое условие");
        }
        else if (num == 1)
        {
            Console.WriteLine("Выполнено второе условие");
            Console.WriteLine("Обе команды входят в один блок");
        }
        else
        {
            Console.WriteLine("Ни одно из предыдущих условий не выполнено");
        }

        // Инициализация; проверка перед итерацией; изменение после итерации.
        for (int i = 0; i < length; i++)
        {
            if (num > 17)
            {
                break; // Досрочный выход из цикла.
            }
            Console.WriteLine($"Итерация {i}: число {num}");
            num += 3;
        }

        // Обратный цикл: от length - 1 до 0 включительно.
        for (int i = length - 1; i >= 0; i--)
        {
            Console.WriteLine(i);
        }
    }

    public static void Main()
    {
        Q322();
        Q333();
    }
}
```

{: .box-warning}
В одной области видимости нельзя повторно объявить переменную с тем же именем. Если `min` уже объявлена, пишите `min = Math.Min(temp, min);`, без `int`.

## Проверьте себя

1. Почему `rnd.Next(9, 31)` никогда не возвращает `31`?
2. Что изменится, если убрать преобразование в `double` при вычислении среднего?
3. Какая ветвь условия выполнится при `num = 5`?
4. Сколько строк напечатает первый цикл и при каком значении `num` произойдёт выход?

<details markdown="1"><summary>Ответы</summary>

1. Верхняя граница `Next` не включается.
2. Целочисленное деление отбросит дробную часть ещё до присваивания в `double`.
3. Ветвь `else`.
4. Пять строк со значениями `num`: `5`, `8`, `11`, `14`, `17`. Затем `num` станет `20`, и следующая проверка приведёт к `break`.

</details>

<details markdown="1"><summary>Следующая тема: цикл while</summary>

Цикл `while` повторяет блок, пока условие истинно. Он удобен, когда количество повторений заранее неизвестно. Условие проверяется **до** выполнения тела.

```csharp
int num = 5;
while (num > 0)
{
    Console.WriteLine(num);
    num--; // Меняем num, чтобы условие со временем стало ложным.
}
```

Программа выведет `5`, `4`, `3`, `2`, `1`. Если убрать `num--`, условие останется истинным и этот цикл не завершится сам.

</details>

[Типовые задачи с for →]({{ '/csru/Chapter4ForPatternsLesson/' | relative_url }}) · [Практика с соседними значениями →]({{ '/csru/Chapter4Ex4.5/' | relative_url }}) · [Вернуться к карте прогресса →]({{ '/csru/Chapter0/' | relative_url }})
