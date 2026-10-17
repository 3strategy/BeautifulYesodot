---
layout: page
title: "12 — Первая динамическая страница"
subtitle: Отображаем данные с условиями и циклами в Razor
lang: ru
language: ru
translation_of: /taba/12-first-dynamic-page/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 13
track: core
published: true
companion_commit: 98ed9acb039c2d584629f2f45eeb1b0660e931f2
companion_previous: 2307d2e1aa18db15dd9675c618ace510fe87528c
---

{: .box-note}
Покажем на странице текст и список имён из C#. Используем условие для обработки пустого списка и цикл для создания строки для каждого имени.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Предыдущий урок: 11 — Разбираемся с Razor Pages и общим макетом]({{ '/taba/ru/11-razor-layout/' | relative_url }}){: data-sequence-nav="prev"} · [Следующий урок: 13 — От HTML-карточки к объекту Animal (на иврите)]({{ '/taba/13-animal-model/' | relative_url }}){: data-sequence-nav="next"}

На сенсорном экране проведите вправо для перехода к следующему уроку, влево — к предыдущему.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/98ed9acb039c2d584629f2f45eeb1b0660e931f2) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/2307d2e1aa18db15dd9675c618ace510fe87528c...98ed9acb039c2d584629f2f45eeb1b0660e931f2)
-->

## Чему научимся

- Отображать значение через `Model`.
- Использовать `if` и `foreach` в Razor.
- Различать данные в памяти и сохранённые данные.

## Начинаем с синхронизации

Откройте правильную папку проекта. Сохраните предыдущую работу в файлах и в Commit, затем убедитесь, что в Source Control или Git Changes нет ожидающих изменений. Только после этого выполните **Pull**. Если Git сообщает о конфликте, обратитесь к учителю; не удаляйте работу и не выполняйте Force Push.

{: .box-note}
В этом уроке `RazorTaba` тоже является именем-примером. Используйте свою папку проекта, а в `namespace` и имени после `@model` заменяйте этот префикс частью перед `.Pages` из существующего файла `Pages/Index.cshtml.cs`. Не создавайте новый проект или дополнительную папку `RazorTaba`.

## Соединяем уже знакомые знания

`OnGet` выполняется, когда браузер запрашивает страницу. Он подготавливает `Greeting` и список имён. `List<string>` — коллекция строк, а `foreach` проходит по строкам по очереди. Проследите путь одного имени: найдите его в списке C# и в строке, созданной на странице. Здесь нет базы данных: `OnGet` заново создаёт список в памяти при каждом запросе GET. Изменения не сохраняются между запросами как пользовательские данные.

## Изменения в коде

### `RazorTaba/Pages/Discover.cshtml`

Новый файл. Создайте `RazorTaba/Pages/Discover.cshtml` и вставьте следующий текст:

````cshtml
@page
@model RazorTaba.Pages.DiscoverModel
@{
    ViewData["Title"] = "מגלים";
}
<h1>@Model.Greeting</h1>
@if (Model.Names.Count == 0)
{
    <p>עדיין אין חיות ברשימה.</p>
}
else
{
    <ul class="list-group">
    @foreach (string name in Model.Names)
    {
        <li class="list-group-item">@name</li>
    }
    </ul>
}
````

### `RazorTaba/Pages/Discover.cshtml.cs`

Новый файл. Создайте `RazorTaba/Pages/Discover.cshtml.cs` и вставьте следующий текст:

````csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace RazorTaba.Pages;

/// <summary>דוגמה ראשונה להעברת נתונים מ־C# לדף; אין כאן מסד נתונים.</summary>
public class DiscoverModel : PageModel
{
    public string Greeting { get; private set; } = "";
    public List<string> Names { get; private set; } = new();

    /// <summary>מכין נתונים לכל בקשת GET.</summary>
    public void OnGet()
    {
        Greeting = "יש לנו חברים חדשים להכיר";
        Names = new List<string> { "נורי", "תום", "לונה" };
    }
}
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

Внесите следующее изменение в существующий файл. Знаки `+` и `-` обозначают изменения и не являются частью кода:

````diff
                         <li class="nav-item">
                             <a class="nav-link text-dark" asp-area="" asp-page="/Guide">מדריך</a>
                         </li>
+                        <li class="nav-item">
+                            <a class="nav-link text-dark" asp-area="" asp-page="/Discover">מגלים</a>
+                        </li>
                     </ul>
                 </div>
             </div>
````

## Запускаем и проверяем

1. По адресу `/Discover` отображаются три имени.
2. Добавьте имя в список: появляется ещё одна строка без копирования `li`.
3. Временно очистите список и посмотрите сообщение о пустом состоянии. Верните данные.

## Самостоятельное задание и проверка понимания

Добавьте имя и объясните, сколько раз выполняется тело цикла. Объясните, почему изменение этого списка не является формой для сохранения информации.

{: .box-success}
После существенного изменения проверьте Diff, выполните Stage, напишите сообщение Commit о сделанных изменениях и выполните Push. Убедитесь на GitHub, что изменение появилось. За год требуется не менее 50 содержательных коммитов, в том числе если всегда работаете на одном ноутбуке.

{: .box-note}
ИИ может помочь разобраться в сообщении об ошибке и найти неисправность. Вы отвечаете за написание, проверку и объяснение кода; не поручайте агенту писать проект.

<!-- teacher-notes:start
class_periods: 3

לתזמן לאחר תנאים ולולאות ב־C#. PageModel ותשתית האתחול מסופקים בדוגמה.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Дальше

- [Дальше: 13 — От HTML-карточки к объекту Animal (на иврите)]({{ '/taba/13-animal-model/' | relative_url }})
<!-- lesson-next:end -->
