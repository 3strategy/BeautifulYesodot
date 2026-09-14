---
layout: page
title: "Мой прогресс: основы программирования на C#"
subtitle: "Проверяйте свои знания от первой программы до циклов for"
tags: [прогресс, самопроверка, переменные, условия, циклы]
lang: ru
---

Отмечайте темы, которые можете объяснить своими словами и применить в небольшой программе. Возвращайтесь к этому списку после каждой главы: он поможет выбрать, что ещё стоит потренировать.
{: .box-note}

<div class="lesson-back" markdown="1">

[← Предыдущая страница: Основы программирования A — на русском]({{ '/csru/' | relative_url }}){: data-sequence-nav="prev"}

[Содержание курса]({{ '/csru/' | relative_url }})

</div>

Отметки сохраняются в этом браузере на этом устройстве. Если очистить данные сайта, они исчезнут. В режиме, где сохранение данных запрещено, список всё равно можно отмечать, но после перезагрузки отметки могут пропасть.

<div markdown="1" class="ru-course-checklist" id="ru-course-checklist">

## Глава 1. Первая программа, ввод и вычисления

[Открыть главу 1]({{ '/csru/Chapter1/' | relative_url }})

- [ ] Я могу создать и запустить консольную программу в Visual Studio или онлайн.
- [ ] Я понимаю, чем отличаются `Console.WriteLine` и `Console.Write`.
- [ ] Я выбираю подходящий тип: `int`, `double` или `string`.
- [ ] Я различаю объявление, начальную инициализацию и присваивание.
- [ ] Я читаю строку с помощью `Console.ReadLine()`.
- [ ] Я преобразую введённую строку в число с помощью `int.Parse` или `double.Parse`.
- [ ] Я использую арифметические операторы `+`, `-`, `*`, `/` и `%`.
- [ ] Я могу объяснить, почему `10 / 4` даёт `2`, а `10.0 / 4` даёт `2.5`.
- [ ] Я отличаю автоматическое преобразование типа от явного, например `(double)x`.
- [ ] Я понимаю записи `+=`, `-=`, `*=`, `/=`, `++` и `--`.

## Дополнение к главе 1. Ошибки, обмен и таблица трассировки

[Открыть дополнение]({{ '/csru/Chapter1b/' | relative_url }})

- [ ] Я понимаю сообщение об использовании локальной переменной без начального значения.
- [ ] Я меняю значения двух переменных местами с помощью временной переменной.
- [ ] Я подставляю значения в строку с помощью `$"a = {a}"`.
- [ ] Я составляю таблицу трассировки и определяю назначение программы.

## Символы: тип char

[Открыть урок о символах]({{ '/csru/Chapter1Char/' | relative_url }})

- [ ] Я отличаю символ `'A'` от строки `"A"`.
- [ ] Я преобразую `char` в `int` и объясняю, что означает полученное число.
- [ ] Я использую `(char)` для явного преобразования подходящего целого числа в символ.
- [ ] Я понимаю, почему символ `'9'` и число `9` имеют разные значения.

## Глава 2. Math, случайные числа и отладка

[Открыть главу 2]({{ '/csru/Chapter2/' | relative_url }})

- [ ] Я применяю `Math.Pow`, `Math.Sqrt` и `Math.Abs`.
- [ ] Я создаю объект `Random` и получаю случайные числа.
- [ ] Я задаю диапазон для `Next` и помню, что верхняя граница не входит в него.
- [ ] Я понимаю, какие значения возвращает `NextDouble`.
- [ ] Я ставлю точку останова и наблюдаю за значениями переменных при отладке.

## Глава 3. Условия и логические выражения

[Открыть главу 3]({{ '/csru/Chapter3/' | relative_url }})

- [ ] Я использую операторы сравнения и отличаю `==` от `=`.
- [ ] Я составляю ветвления `if`, `else if` и `else`.
- [ ] Я определяю значение логического выражения: `true` или `false`.
- [ ] Я объединяю условия с помощью `&&`, `||` и `!`.
- [ ] Я понимаю, какие команды входят в блок `{ ... }`.
- [ ] Я прослеживаю выполнение вложенных условий.
- [ ] Я использую `%`, например для проверки чётности и делимости.
- [ ] Я сохраняю состояние в переменной типа `bool` — логическом флаге.
- [ ] Я составляю таблицу трассировки для программы с условиями.

## Глава 4. Цикл for

[Открыть главу 4]({{ '/csru/Chapter4/' | relative_url }})

- [ ] Я объясняю, когда полезно повторение команд.
- [ ] Я различаю инициализацию, условие и изменение переменной в заголовке `for`.
- [ ] Я описываю порядок выполнения цикла и определяю количество повторений.
- [ ] Я использую счётчик для подсчёта подходящих значений.
- [ ] Я использую накопитель для вычисления суммы.
- [ ] Я объясняю, как `break` завершает цикл раньше обычного.

## Глава 4b. Дополнительные возможности for

[Открыть главу 4b]({{ '/csru/Chapter4b/' | relative_url }})

- [ ] Я объясняю область видимости переменной и могу сохранить значение индекса после цикла.
- [ ] Я читаю заголовок цикла с несколькими инициализациями или изменениями переменных.
- [ ] Я понимаю, к чему приводит пропуск части заголовка `for`.
- [ ] Я замечаю риск бесконечного цикла при неверном изменении индекса.
- [ ] Я отличаю `continue` от `break`.
- [ ] Я составляю таблицу трассировки цикла и проверяю её с помощью отладчика.

</div>

Отметка означает, что вы умеете применять тему, а не только прочитали объяснение. Если сомневаетесь, напишите короткий пример, предскажите его вывод, а затем запустите.
{: .box-success}


[Содержание курса]({{ '/csru/' | relative_url }})

<script>
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('ru-course-checklist');
  if (!root) return;
  const boxes = Array.from(root.querySelectorAll('input[type="checkbox"]'));
  const keys = [
    'run-program', 'output', 'types', 'assignment', 'read-line', 'parse',
    'arithmetic', 'integer-division', 'casting', 'short-operators',
    'unassigned-variable', 'swap', 'interpolation', 'trace-table',
    'char-string', 'char-code', 'code-char', 'digit-character',
    'math', 'random', 'random-range', 'next-double', 'debugging',
    'comparison', 'branches', 'boolean', 'logical-operators', 'blocks',
    'nested-conditions', 'remainder', 'flags', 'condition-trace',
    'repetition', 'for-structure', 'for-order', 'counter', 'accumulator',
    'break', 'scope', 'multiple-for-parts', 'omitted-for-parts',
    'infinite-loop', 'continue', 'loop-trace'
  ];
  const storageKey = 'csru-initial-course-progress-v1';
  let saved = {};
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || '{}');
    if (value && typeof value === 'object' && !Array.isArray(value)) saved = value;
  } catch (_) {}
  boxes.forEach((box, index) => {
    const key = keys[index];
    box.id = `csru-progress-${key}`;
    box.disabled = false;
    box.checked = saved[key] === true;
    const item = box.closest('li');
    if (item) box.setAttribute('aria-label', item.textContent.trim());
    box.addEventListener('change', () => {
      const states = {};
      boxes.forEach((entry, position) => { states[keys[position]] = entry.checked; });
      try { localStorage.setItem(storageKey, JSON.stringify(states)); } catch (_) {}
    });
  });
});
</script>

<div class="lesson-next" markdown="1">

[Следующая страница: Глава 1. Первая программа на C# →]({{ '/csru/Chapter1/' | relative_url }}){: data-sequence-nav="next"}

</div>
