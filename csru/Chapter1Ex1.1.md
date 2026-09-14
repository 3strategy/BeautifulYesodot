---
layout: page
title: "Практика 1.1 — простые алгоритмы"
subtitle: "Ввод, вычисления и вывод с решениями на C#"
lang: ru
---

{: .box-note}
В каждой задаче определите входные данные, запишите формулу и выведите результат. Сначала решите задачу самостоятельно, затем раскройте решение и сравните его со своим.


<div class="lesson-back" markdown="1">

[← Предыдущая страница: Сочетания клавиш в Visual Studio]({{ '/csru/Chapter1Shortcuts/' | relative_url }}){: data-sequence-nav="prev"}

[Содержание курса]({{ '/csru/' | relative_url }})

</div>

## Задача 1.1.3 — счёт за телефон {#id1.1.3}

Разработайте алгоритм, который получает количество минут разговора и фиксированную ежемесячную плату, а затем выводит общую сумму к оплате. По условию одна минута стоит **1,20 шекеля**.

<details markdown="1"><summary>Решение</summary>

1. Считайте количество минут в `minutes`.
2. Считайте фиксированную плату в `payment`.
3. Вычислите `minutes * 1.20 + payment` и сохраните в `total`.
4. Выведите `total`.

```csharp
Console.Write("Введите количество минут: ");
double minutes = double.Parse(Console.ReadLine());

Console.Write("Введите фиксированную плату: ");
double payment = double.Parse(Console.ReadLine());

double total = minutes * 1.20 + payment;
Console.WriteLine("К оплате: " + total + " шекелей");
```

Проверка: для `minutes = 10` и `payment = 30` результат равен `42`.

</details>

## Площадь квадрата

Разработайте алгоритм, который получает длину стороны квадрата и выводит его площадь.

<details markdown="1"><summary>Решение</summary>

Считайте длину стороны в `num`, вычислите `num * num` и выведите результат.

```csharp
Console.Write("Введите длину стороны квадрата: ");
double num = double.Parse(Console.ReadLine());

double square = num * num;
Console.WriteLine("Площадь квадрата: " + square);
```

Проверка: сторона `4` даёт площадь `16`.

</details>

## Задача 1.1.4 — объём коробки {#id1.1.4}

Разработайте алгоритм, который получает три целых числа: длину, ширину и высоту прямоугольной коробки. Вычислите и выведите её объём.

<details markdown="1"><summary>Решение на C#</summary>

```csharp
Console.Write("Введите длину: ");
int length = int.Parse(Console.ReadLine());

Console.Write("Введите ширину: ");
int width = int.Parse(Console.ReadLine());

Console.Write("Введите высоту: ");
int height = int.Parse(Console.ReadLine());

int volume = length * width * height;
Console.WriteLine("Объём коробки: " + volume);
```

Проверка: размеры `2`, `3`, `4` дают объём `24`.

</details>

## Задача 1.1.5 — цена компьютера с налогом {#id1.1.5}

Разработайте алгоритм, который получает цену компьютера без налога и вычисляет итоговую цену. **В этой задаче** налог составляет 18% от исходной цены.

<details markdown="1"><summary>Решение на C#</summary>

Считайте цену в `price`, вычислите `price + price * 0.18` и выведите итог.

```csharp
Console.Write("Введите цену компьютера без налога: ");
double price = double.Parse(Console.ReadLine());

double finalPrice = price + price * 0.18; // Можно также: price * 1.18
Console.WriteLine("Цена с налогом: " + finalPrice + " шекелей");
```

`Console.Write` выводит приглашение без перехода на новую строку. Для цены `1000` итог равен `1180`.

</details>

## Дальше

[Практика 1.2: переменные и вычисления →]({{ '/csru/Chapter1Ex1.2/' | relative_url }}) · [Присваивание и преобразования →]({{ '/csru/Chapter1b/' | relative_url }}) · [Полезные сочетания клавиш]({{ '/csru/Chapter1Shortcuts/' | relative_url }})

<div class="lesson-next" markdown="1">

[Следующая страница: Дополнение к главе 1. Переменные и поиск ошибок →]({{ '/csru/Chapter1b/' | relative_url }}){: data-sequence-nav="next"}

</div>
