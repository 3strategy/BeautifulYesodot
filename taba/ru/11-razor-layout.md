---
layout: page
title: "11 — Разбираемся с Razor Pages и общим макетом"
subtitle: Разбираем структуру проекта, с которым уже работаем; Layout и отображение Markdown и Mermaid с помощью готового компонента; без EF и Identity
lang: ru
language: ru
translation_of: /taba/11-razor-layout/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 12
track: core
published: true
companion_commit: 2307d2e1aa18db15dd9675c618ace510fe87528c
companion_previous: cb12bd589208363af709028b0a00a26769ff7a7d
---

{: .box-note}
Познакомимся с общим макетом сайта и покажем внутри него свою статью Markdown и схему Mermaid. Изменение файла содержимого появится на странице руководства.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Предыдущий урок: 10 — Рисуем с помощью текста: Mermaid]({{ '/taba/ru/10-mermaid/' | relative_url }}){: data-sequence-nav="prev"} · [Следующий урок: 12 — Первая динамическая страница]({{ '/taba/ru/12-first-dynamic-page/' | relative_url }}){: data-sequence-nav="next"}

На сенсорном экране проведите вправо для перехода к следующему уроку, влево — к предыдущему.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/2307d2e1aa18db15dd9675c618ace510fe87528c) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/cb12bd589208363af709028b0a00a26769ff7a7d...2307d2e1aa18db15dd9675c618ace510fe87528c)
-->

## Чему научимся

- Различать Layout, содержимое страницы и файл контента.
- Отображать Markdown внутри существующего оформления.
- Понимать, что специальный компонент преобразует содержимое в HTML, а не просто вставляет непроверенный текст.

## Начинаем с синхронизации

Откройте правильную папку проекта. Сохраните предыдущую работу в файлах и в Commit, затем убедитесь, что в Source Control или Git Changes нет ожидающих изменений. Только после этого выполните **Pull**. Если Git сообщает о конфликте, обратитесь к учителю; не удаляйте работу и не выполняйте Force Push.

## Адаптируем примеры к имени своего проекта

`RazorTaba` — имя проекта в примерах. Продолжайте личный проект, не переименовывая его и не создавая внутри дополнительную папку `RazorTaba`. Чтобы найти имя, используемое вашим кодом, откройте `Pages/Index.cshtml.cs` и посмотрите часть строки `namespace` перед `.Pages`. Например, для `namespace NoaCohenRazor.Pages;` ваш префикс — `NoaCohenRazor`.

В фрагментах кода урока заменяйте `RazorTaba` своим префиксом в каждом `namespace`, каждом `using`, имени после `@model` и регистрации сервиса в `Program.cs`. В путях тоже используйте свою папку проекта: если редактор открыт непосредственно в папке с `.csproj`, начинайте с `Pages`, `Services` или `wwwroot`, без дополнительной папки проекта. Создайте в папке проекта `Services`, если её нет; папка `Content` из предыдущих уроков находится рядом с `Pages`.

## 1. Разбираемся с макетом

`_Layout.cshtml` содержит секцию `head`, меню и нижнюю часть страницы. `RenderBody` — место, куда вставляется содержимое страницы. `@page` превращает файл в страницу, которую можно запросить у сервера. Теперь не нужно копировать меню в каждую статью.

## 2. Устанавливаем готовую основу

Mermaid — готовая библиотека, рисующая схемы в браузере. Добавим её в проект в виде локальных файлов:

1. Скачайте <a href="{{ '/assets/downloads/taba/mermaid-11.17.2.zip' | relative_url }}" download>файлы Mermaid для урока — версия 11.17.2 (ZIP)</a>.
2. Распакуйте ZIP: в Windows нажмите на него правой кнопкой и выберите **Extract All / Извлечь всё**; в macOS дважды щёлкните файл. В распакованной папке найдите папку `mermaid`.
3. Скопируйте папку `mermaid` в `wwwroot/lib` своего проекта. Копируйте распакованную папку, а не ZIP-файл. Оставьте внутри файл лицензии и файл версии.
4. Откройте папку в редакторе и проверьте следующую структуру:

```text
wwwroot/
└── lib/
    └── mermaid/
        ├── LICENSE
        ├── VERSION.txt
        └── mermaid.min.js
```

{: .box-note}
Убедитесь, что файл находится точно по пути `wwwroot/lib/mermaid/mermaid.min.js`, без дополнительной вложенной папки `mermaid`. Копировать содержимое файла в редактор или редактировать его не нужно. В `VERSION.txt` указана версия `11.17.2`.

Теперь установите два пакета NuGet командами ниже и добавьте сервис, страницу `Guide` и файл JavaScript по фрагментам кода. Файлы Mermaid уже готовы; далее подключим их к общему макету.

Markdig преобразует Markdown в HTML, компонент очищает его, а браузер рисует Mermaid. `Html.Raw` получает только очищенный результат; не применяйте его к тексту, полученному напрямую из формы. Схемы получают собственное направление LTR внутри страницы на иврите. При ошибке в схеме остаются исходный текст и сообщение о необходимости исправления рядом с ним.

## 3. Продолжаем писать содержимое

Выполнив изменения кода ниже, запустите сайт и откройте `/Guide`. Измените `Content/care.md`, сохраните и обновите страницу. Теперь статья и изображение показываются на самом сайте.

### Команды этого этапа

Откройте терминал в Visual Studio или VS Code и перейдите в папку проекта с вашим файлом `.csproj`. В VS Code это обычно уже открытая папка; если в Visual Studio или Rider открыта внешняя папка решения, перейдите в терминале во внутреннюю папку проекта. Выполните следующие команды оттуда. Они находят файл проекта в текущей папке, поэтому не содержат фиксированного имени проекта.

```shell
dotnet add package Markdig --version 1.3.2
dotnet add package HtmlSanitizer --version 9.2.1039
```

## Изменения в коде

### `RazorTaba/Pages/Shared/_Layout.cshtml`

Внесите следующее изменение в существующий файл. Знаки `+` и `-` обозначают изменения и не являются частью кода:

````diff
                         <li class="nav-item">
                             <a class="nav-link text-dark" asp-area="" asp-page="/Contact">קשר</a>
                         </li>
+                        <li class="nav-item">
+                            <a class="nav-link text-dark" asp-area="" asp-page="/Guide">מדריך</a>
+                        </li>
                     </ul>
                 </div>
             </div>
 ⁞

     <script src="~/lib/jquery/dist/jquery.min.js"></script>
     <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
+    <script src="~/lib/mermaid/mermaid.min.js"></script>
+    <script src="~/js/markdown.js" defer></script>
     <script src="~/js/site.js" asp-append-version="true"></script>

     @await RenderSectionAsync("Scripts", required: false)
````

### `RazorTaba/Pages/Guide.cshtml`

Новый файл. Создайте `RazorTaba/Pages/Guide.cshtml` и вставьте следующий текст:

````cshtml
@page
@model RazorTaba.Pages.GuideModel
@{
    ViewData["Title"] = "מדריך הטיפול";
}
<article class="markdown-content card p-4 p-md-5">
    @* מציגים רק את התוצאה שעברה ניקוי ב־MarkdownRenderer. *@
    @Html.Raw(Model.ArticleHtml)
</article>
````

### `RazorTaba/Pages/Guide.cshtml.cs`

Модель загружает статью из известного файла `Content/care.md`; адрес запроса не выбирает путь к файлу на компьютере.

Новый файл. Создайте `RazorTaba/Pages/Guide.cshtml.cs` и вставьте следующий текст:

````csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using RazorTaba.Services;

namespace RazorTaba.Pages;

/// <summary>טוען מאמר מקובץ ידוע. כתובת הבקשה אינה בוחרת נתיב במחשב.</summary>
public class GuideModel(IWebHostEnvironment environment, MarkdownRenderer renderer) : PageModel
{
    public string ArticleHtml { get; private set; } = "";

    /// <summary>מכין את התוכן כאשר הדפדפן מבקש את הדף.</summary>
    public void OnGet()
    {
        string path = Path.Combine(environment.ContentRootPath, "Content", "care.md");
        ArticleHtml = renderer.Render(System.IO.File.ReadAllText(path));
    }
}
````

### `RazorTaba/Services/MarkdownRenderer.cs`

Новый файл. Создайте `RazorTaba/Services/MarkdownRenderer.cs` и вставьте следующий текст:

````csharp
using Ganss.Xss;
using Markdig;

namespace RazorTaba.Services;

/// <summary>ממיר תוכן Markdown ל־HTML בטוח להצגה. זוהי תשתית מוכנה לתלמידים.</summary>
public class MarkdownRenderer
{
    private readonly MarkdownPipeline pipeline = new MarkdownPipelineBuilder()
        .UsePipeTables().DisableHtml().Build();

    /// <summary>מרנדר טקסט בלבד; HTML גולמי וקישורים מסוכנים אינם מורשים.</summary>
    public string Render(string source)
    {
        var sanitizer = new HtmlSanitizer();
        sanitizer.AllowedTags.Clear();
        foreach (string tag in new[] { "p", "h1", "h2", "h3", "h4", "ul", "ol", "li",
            "strong", "em", "a", "img", "pre", "code", "blockquote", "hr", "br",
            "table", "thead", "tbody", "tr", "th", "td" })
            sanitizer.AllowedTags.Add(tag);
        sanitizer.AllowedAttributes.Clear();
        foreach (string attribute in new[] { "href", "src", "alt", "title", "class" })
            sanitizer.AllowedAttributes.Add(attribute);
        sanitizer.AllowedSchemes.Clear();
        sanitizer.AllowedSchemes.Add("https");
        sanitizer.AllowedSchemes.Add("http");
        return sanitizer.Sanitize(Markdown.ToHtml(source, pipeline));
    }
}
````

### `RazorTaba/Program.cs`

Внесите следующее изменение в существующий файл. Знаки `+` и `-` обозначают изменения и не являются частью кода:

````diff

 // Add services to the container.
 builder.Services.AddRazorPages();
+builder.Services.AddSingleton<RazorTaba.Services.MarkdownRenderer>();

 var app = builder.Build();

````

### `RazorTaba/wwwroot/js/markdown.js`

Новый файл. Создайте `RazorTaba/wwwroot/js/markdown.js` и вставьте следующий текст:

````javascript
// תשתית מוכנה: שומרים את מקור התרשים כטקסט ומציגים שגיאה מקומית במקרה הצורך.
document.addEventListener("DOMContentLoaded", async () => {
    if (!window.mermaid) return;
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict", suppressErrorRendering: true });
    let diagramId = 0;
    for (const code of document.querySelectorAll("pre > code.language-mermaid")) {
        const pre = code.parentElement;
        const source = code.textContent;
        const diagram = document.createElement("div");
        diagram.className = "mermaid-diagram";
        diagram.dir = "ltr";
        try {
            // מונעים מתוכן מאמר לשנות את הגדרות הרכיב שסיפק המורה.
            if (/%%\s*\{|^\s*---/m.test(source)) throw new Error("Configuration is not allowed");
            const result = await mermaid.render(`article-diagram-${diagramId++}`, source);
            diagram.innerHTML = result.svg;
            pre.replaceWith(diagram);
        } catch {
            const note = document.createElement("p");
            note.className = "alert alert-warning diagram-error";
            note.textContent = "התרשים לא הוצג. בדקו סוגריים, חצים ותוויות במקור שלמטה.";
            pre.before(note);
        }
    }
});
````

### `RazorTaba/wwwroot/css/site.css`

Внесите следующее изменение в существующий файл. Знаки `+` и `-` обозначают изменения и не являются частью кода:

````diff
 /* הכפתור הבהיר זקוק לטקסט כהה, גם כשהוא נמצא בתוך אזור הפתיחה. */
 .intro .btn-light { color: var(--forest); }
+
+.markdown-content { max-width: 58rem; margin-inline: auto; }
+.markdown-content img { max-width: min(100%, 20rem); height: auto; border-radius: 1rem; }
+.markdown-content table { width: 100%; margin-block: 1rem; }
+.markdown-content th, .markdown-content td { padding: .6rem; border-bottom: 1px solid #d8dfd3; text-align: right; }
+pre { direction: ltr; text-align: left; background: #eef1e9; padding: 1rem; overflow: auto; }
+.mermaid-diagram { overflow-x: auto; text-align: center; margin-block: 1.5rem; }
+.mermaid-diagram svg { max-width: 100%; height: auto; }
````

### `RazorTaba/RazorTaba.csproj`

Команды NuGet уже добавили две строки `PackageReference`. Теперь добавим настройку копирования Markdown-файлов вместе с сайтом. Чтобы получить следующий результат после команд, откройте файл `.csproj` своего проекта и **замените всё его содержимое** следующим полным кодом. Не вставляйте его в дополнение к существующему содержимому.

````xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="HtmlSanitizer" Version="9.2.1039" />
    <PackageReference Include="Markdig" Version="1.3.2" />
  </ItemGroup>

  <ItemGroup>
    <Content Include="Content/**/*.md" CopyToOutputDirectory="PreserveNewest" CopyToPublishDirectory="PreserveNewest" />
  </ItemGroup>
</Project>
````

{: .box-success}
Проверьте, что в файле два раздела `ItemGroup`: первый содержит два пакета, второй — строку `Content`. Убедитесь, что оба раздела находятся внутри `Project`, каждый закрыт тегом `</ItemGroup>`, а в конце стоит `</Project>`. Сохраните файл и запустите проект.

<!--
<details open markdown="1"><summary>קבצים חדשים שנוספו או נוצרו בשלב</summary>

אלה הקבצים החדשים שנוספו או נוצרו בשלב הזה. קובצי מיגרציה או תשתית שנוצרים בפקודה אין להעתיק ידנית.

- [RazorTaba/wwwroot/lib/mermaid/LICENSE](https://github.com/3strategy/razortaba/blob/2307d2e1aa18db15dd9675c618ace510fe87528c/RazorTaba/wwwroot/lib/mermaid/LICENSE)
- [RazorTaba/wwwroot/lib/mermaid/VERSION.txt](https://github.com/3strategy/razortaba/blob/2307d2e1aa18db15dd9675c618ace510fe87528c/RazorTaba/wwwroot/lib/mermaid/VERSION.txt)
- [RazorTaba/wwwroot/lib/mermaid/mermaid.min.js](https://github.com/3strategy/razortaba/blob/2307d2e1aa18db15dd9675c618ace510fe87528c/RazorTaba/wwwroot/lib/mermaid/mermaid.min.js)

</details>
-->

## Запускаем и проверяем

1. Статья отображается по адресу `/Guide` с общим меню.
2. Схема отображается как SVG, а не блок кода.
3. Нарушьте запись стрелки в схеме: статья остаётся видимой, появляется сообщение об исправлении. Верните правильный исходный текст.
4. Проверьте при ширине телефона, что таблица и схема не нарушают расположение страницы.

## Самостоятельное задание и проверка понимания

Покажите на сайте свою статью. Объясните учителю, где редактируется содержимое, где оформление и где находится связывающая их основа.

{: .box-success}
После существенного изменения проверьте Diff, выполните Stage, напишите сообщение Commit о сделанных изменениях и выполните Push. Убедитесь на GitHub, что изменение появилось. За год требуется не менее 50 содержательных коммитов, в том числе если всегда работаете на одном ноутбуке.

{: .box-note}
ИИ может помочь разобраться в сообщении об ошибке и найти неисправность. Вы отвечаете за написание, проверку и объяснение кода; не поручайте агенту писать проект.

<!-- teacher-notes:start
class_periods: 3

רכיבי Markdown/Mermaid מסופקים כתשתית. אין צורך ללמד כתיבת parser או JavaScript אסינכרוני בשלב זה.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Дальше

- [Дальше: 12 — Первая динамическая страница]({{ '/taba/ru/12-first-dynamic-page/' | relative_url }})
<!-- lesson-next:end -->
