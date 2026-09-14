---
layout: page
title: "Практика 1.2 — переменные и вычисления"
subtitle: "Ввод, вывод, арифметика и обмен значениями"
lang: ru
---

{: .box-note}
Потренируйтесь читать данные, сохранять их в переменных и вычислять результат. Решения скрыты: сначала напишите свою программу и проверьте её на примере.


<div class="lesson-back" markdown="1">

[← Предыдущая страница: Дополнение к главе 1. Переменные и поиск ошибок]({{ '/csru/Chapter1b/' | relative_url }}){: data-sequence-nav="prev"}

[Содержание курса]({{ '/csru/' | relative_url }})

</div>

### Задача 1.2.1 — сумма двух чисел {#id1.2.1}

Напишите программу, которая считывает два целых числа и выводит их сумму.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите первое число: ");
int a = int.Parse(Console.ReadLine());
Console.Write("Введите второе число: ");
int b = int.Parse(Console.ReadLine());

int sum = a + b;
Console.WriteLine("Сумма: " + sum);
```

</details>

### Задача 1.2.2 — среднее трёх оценок {#id1.2.2}

Напишите программу, которая считывает три оценки и вычисляет среднее, сохраняя дробную часть.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите первую оценку: ");
double g1 = double.Parse(Console.ReadLine());
Console.Write("Введите вторую оценку: ");
double g2 = double.Parse(Console.ReadLine());
Console.Write("Введите третью оценку: ");
double g3 = double.Parse(Console.ReadLine());

double average = (g1 + g2 + g3) / 3;
Console.WriteLine("Среднее: " + average);
```

Переменные имеют тип `double`, поэтому деление сохраняет дробную часть. Например, для `80`, `81`, `90` среднее приблизительно равно `83,67`.

</details>

### Задача 1.2.3 — остаток от деления {#id1.2.3}

Напишите программу, которая считывает целое число и выводит остаток от его деления на 3.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите целое число: ");
int num = int.Parse(Console.ReadLine());
int remainder = num % 3;
Console.WriteLine("Остаток от деления на 3: " + remainder);
```

</details>

### Задача 1.2.4 — процент от числа {#id1.2.4}

Напишите программу, которая считывает число и процент, например `20`, и вычисляет указанный процент от этого числа.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите число: ");
double num = double.Parse(Console.ReadLine());
Console.Write("Введите процент: ");
double percent = double.Parse(Console.ReadLine());

double result = num * percent / 100;
Console.WriteLine("Результат: " + result);
```

</details>

### Задача 1.2.5 — площадь прямоугольника {#id1.2.5}

Напишите программу, которая считывает длину и ширину прямоугольника и выводит его площадь.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите длину: ");
double length = double.Parse(Console.ReadLine());
Console.Write("Введите ширину: ");
double width = double.Parse(Console.ReadLine());

double area = length * width;
Console.WriteLine("Площадь прямоугольника: " + area);
```

</details>

### Задача 1.2.6 — произведение и сумма {#id1.2.6}

Напишите программу, которая считывает два целых числа и выводит их сумму и произведение.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите первое число: ");
int x = int.Parse(Console.ReadLine());
Console.Write("Введите второе число: ");
int y = int.Parse(Console.ReadLine());

Console.WriteLine("Сумма: " + (x + y));
Console.WriteLine("Произведение: " + (x * y));
```

Скобки в выражении суммы нужны, чтобы сначала сложить числа, а затем присоединить результат к строке.

</details>

### Задача 1.2.7 — сумма цифр двузначного числа {#id1.2.7}

Напишите программу, которая считывает **положительное двузначное целое число** и выводит сумму его цифр.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите число от 10 до 99: ");
int num = int.Parse(Console.ReadLine());

int tens = num / 10;
int ones = num % 10;
int sum = tens + ones;
Console.WriteLine("Сумма цифр: " + sum);
```

Для `47` целочисленное деление `47 / 10` даёт `4`, а остаток `47 % 10` равен `7`. Сумма цифр — `11`.

</details>

### Задача 1.2.8 — перевод шекелей в доллары {#id1.2.8}

Напишите программу, которая считывает сумму в шекелях и обменный курс — **сколько шекелей стоит один доллар**. Выведите сумму в долларах. Предположите, что введённый курс положительный.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите сумму в шекелях: ");
double ils = double.Parse(Console.ReadLine());
Console.Write("Введите число шекелей за один доллар: ");
double rate = double.Parse(Console.ReadLine());

double usd = ils / rate;
Console.WriteLine("Сумма в долларах: " + usd);
```

</details>

### Задача 1.2.9 — имя и возраст {#id1.2.9}

Напишите программу, которая считывает имя и возраст и выводит сообщение, например: `Имя: Сара, возраст: 17`.

<details markdown="1"><summary>Решение</summary>

```csharp
Console.Write("Введите имя: ");
string name = Console.ReadLine();
Console.Write("Введите возраст: ");
int age = int.Parse(Console.ReadLine());

Console.WriteLine("Имя: " + name + ", возраст: " + age);
```

</details>

### Задача 1.2.10 — обмен содержимым чашек {#id1.2.10}

<a id="swapValuesMeaningful"></a>

В одной чашке должен быть чай, а в другой — кофе. По ошибке чай налили в чашку для кофе, а кофе — в чашку для чая. Придумайте, как поменять напитки местами, не смешивая их. Затем запишите аналогичный обмен значениями переменных на C#.

[Обмен значениями в главе 1b]({{ '/csru/Chapter1b/' | relative_url }}#swapValues) поможет разобраться в этой задаче.

<details markdown="1"><summary>Алгоритм словами</summary>

1. Возьмите третью, пустую чашку.
2. Перелейте в неё чай из чашки для кофе.
3. Перелейте кофе из чашки для чая в чашку для кофе.
4. Перелейте чай из третьей чашки в чашку для чая.

</details>

<details markdown="1"><summary>Решение на C#</summary>

```csharp
string cupTea = "кофе";
string cupCoffee = "чай";
string emptyCup;

// Сохраняем чай во временной переменной.
emptyCup = cupCoffee;
// Переносим кофе в нужную чашку.
cupCoffee = cupTea;
// Возвращаем сохранённый чай в чашку для чая.
cupTea = emptyCup;

Console.WriteLine("В чашке для чая: " + cupTea);
Console.WriteLine("В чашке для кофе: " + cupCoffee);
```

Присваивание копирует значение: исходная переменная сама по себе не становится пустой. Аналогия с чашками помогает выбрать порядок действий, а временная переменная сохраняет значение, которое иначе было бы потеряно.

</details>

<div class="lesson-next" markdown="1">

[Следующая страница: Тип char: символы и их коды →]({{ '/csru/Chapter1Char/' | relative_url }}){: data-sequence-nav="next"}

</div>
