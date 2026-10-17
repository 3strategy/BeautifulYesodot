---
layout: page
title: "02 — Среда разработки: запускаем и изменяем сайт"
subtitle: Создаём проект Razor Pages, знакомимся с файлами, редактируем HTML и проверяем в браузере
lang: ru
language: ru
translation_of: /taba/02-development-environment/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 3
track: core
published: true
companion_commit: 979d543d83d7d7c9e4f722b5400c60c4253b78a2
companion_previous: 3e83e27c126c0aa3f02f2977e8923702213ecd43
---

{: .box-note}
Создадим и запустим сайт в Visual Studio, VS Code или Rider, познакомимся с файлами и изменим содержимое. Сохраним, запустим и увидим результат в браузере.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Предыдущий урок: 01 — Моя первая страница]({{ '/taba/ru/01-first-page/' | relative_url }}){: data-sequence-nav="prev"} · [Следующий урок: 03 — Сайт становится моим]({{ '/taba/ru/03-my-theme/' | relative_url }}){: data-sequence-nav="next"}

На сенсорном экране проведите вправо для перехода к следующему уроку, влево — к предыдущему.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/979d543d83d7d7c9e4f722b5400c60c4253b78a2) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/3e83e27c126c0aa3f02f2977e8923702213ecd43...979d543d83d7d7c9e4f722b5400c60c4253b78a2)
-->

## Чему научимся

- Запускать локальный сайт в Windows или macOS.
- Находить `Pages` и `wwwroot`.
- Редактировать HTML, сохранять файлы и проверять результат в браузере.

## Пробуем создать проект Razor Pages

До сих пор вы экспериментировали с HTML в обычных файлах, без проекта. Теперь создадим сайт из готового шаблона. **Это пока пробный этап:** выберите любое имя на английском без пробелов, например `RazorPractice`. Можно создать несколько проектов, каждый со своим именем и в своей папке. Учётная запись GitHub и доступ для учителя на этом этапе не нужны.

Откройте инструкцию для своей среды разработки. Каждая инструкция проведёт вас от создания проекта до надписи Welcome в браузере; к ней можно возвращаться для повторной тренировки.

<details markdown="1"><summary>Visual Studio в Windows — создаём Razor Pages через интерфейс</summary>

{% include taba/ru/setup-visual-studio.md %}

</details>

<details markdown="1"><summary>VS Code в macOS — создаём Razor Pages в терминале</summary>

{% include taba/ru/setup-vscode.md %}

</details>

<details markdown="1"><summary>Rider в Windows или macOS — создаём Razor Pages через интерфейс</summary>

{% include taba/ru/setup-rider.md %}

</details>

### Тренируемся создавать ещё один проект

1. Остановите первый сайт кнопкой Stop или сочетанием Ctrl+C в терминале.
2. Вернитесь к своей инструкции и создайте второй проект с другим именем, например `RazorPractice2`, в отдельной папке рядом с первой.
3. Запустите его и проверьте, что появляется Welcome. Измените заголовок, чтобы различать открытые проекты.
4. Остановите сайт и снова откройте первый проект. Убедитесь, что его файлы и ваше изменение сохранились.

{: .box-success}
Теперь вы умеете создавать сайт, останавливать его и открывать существующую работу. Выберите один из пробных проектов для дальнейшей работы с содержимым и CSS. До урока Bootstrap можно пробовать снова; на следующем за ним уроке Git зарегистрируем годовой проект под именем `FirstNameLastNameRazor` и предоставим учителю доступ.

## Продолжаем работу с созданным проектом
{: #after-setup}

### 1. Открываем существующую работу

В VS Code откройте папку проекта с выбранным именем через **File → Open Folder**. В Visual Studio откройте файл решения с вашим именем, например `GuysRazor.slnx` или `GuysRazor.sln`, из папки решения. Для повторного открытия существующей работы создавать проект заново не нужно. В Rider откройте файл решения через **Open**.

Если продолжаете существующий пробный проект, открывайте его папку, сохраняйте файлы и запускайте сайт. Для нового проекта вернитесь к инструкции и выберите новые имя и папку.

### 2. Редактируем свой сайт

Расположите браузер рядом с редактором. В Visual Studio или Rider запустите профиль **http**. В VS Code откройте терминал в папке с файлом `.csproj` и выполните:

```shell
dotnet watch --launch-profile http
```

Далее настроим главную страницу и общий макет для иврита. Общий пример сайта во всём курсе остаётся на иврите с направлением справа налево (RTL); код, строки на иврите и `lang="he" dir="rtl"` сохраняйте как в примере. Здесь `RazorTaba` — имя внутренней папки проекта. Если в Visual Studio выбрали своё имя, замените эту часть своим именем: например, `GuysRazor/Pages/Index.cshtml`. Если есть внешняя папка решения, путь начинается от неё; если в VS Code открыли непосредственно папку с `.csproj`, начинайте с `Pages/Index.cshtml`, без дополнительной папки. Файлы уже созданы при настройке; теперь их редактируем.

Создайте внутри `RazorTaba/wwwroot` папку `images` и скопируйте в неё `fox.svg`, сохранённый в папке `first-page` на прошлом уроке. Изображение для главной страницы будет находиться по пути `RazorTaba/wwwroot/images/fox.svg`.

### 3. Сохраняем и проверяем

Внесите изменения кода, приведённые ниже, сохраните файлы и проверьте сайт. Попробуйте изменить заголовок или абзац, снова сохраните и посмотрите результат. Если попытка не удалась, прочитайте ошибку и сравните изменённый фрагмент с примером.

## Изменения в коде

### `RazorTaba/Pages/Index.cshtml`

Начинаем со страницы, созданной шаблоном. Если вы уже изменили Welcome, вместо него будет ваш заголовок. Меняем содержимое страницы; меню и обрамление остаются в общем макете.

````diff
 @page
 @model IndexModel
 @{
-    ViewData["Title"] = "Home page";
+    ViewData["Title"] = "בית";
 }
-
-<div class="text-center">
-    <h1 class="display-4">Welcome</h1>
-    <p>Learn about <a href="https://learn.microsoft.com/aspnet/core">building Web apps with ASP.NET Core</a>.</p>
-</div>
+<h1>החיות שלי</h1>
+<p>זה האתר הראשון שלי. כאן אכיר לכם חיות שמסקרנות אותי.</p>
+<img src="~/images/fox.svg" alt="איור של שועל" width="180" />
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

Этот файл уже существует в шаблоне и подключает ко всем страницам Bootstrap и `site.css`. Не заменяйте его целиком. Внесите только следующие два изменения, чтобы настроить направление страницы и Bootstrap для иврита:

{% code_diff %}
 <!DOCTYPE html>
-<html lang="en">
+<html lang="he" dir="rtl">
 ⁞
-    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
+    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.rtl.min.css" />
     <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
{% endcode_diff %}

Оставьте остальные строки, включая ссылку на файл с окончанием `.styles.css`, меню Home и Privacy, кнопку раскрытия меню на телефоне и скрипты внизу файла. Попробуйте уменьшить ширину окна и открыть меню его кнопкой.

### Знакомимся с созданными файлами оформления

- `wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css` содержит готовые классы оформления. Их имена используются в HTML; файл библиотеки не редактируем.
- `wwwroot/css/site.css` — файл собственных стилей сайта в этом шаблоне. На уроке CSS добавим сюда свои правила **после уже созданных правил**.
- `Pages/Shared/_Layout.cshtml.css` содержит оформление общего макета. Ссылка на файл вида `ИмяПроекта.styles.css` загружает это оформление после сборки; вручную такой файл создавать не нужно.

{: .box-note}
Оставьте `Program.cs`, `Properties/launchSettings.json` и исходные правила CSS такими, какими их создал шаблон. Сайт уже работает. Используйте адрес, который показывает ваша среда или терминал; задавать общий номер порта для всех пробных проектов не требуется.

<!--
<details open markdown="1"><summary>קבצים חדשים שנוספו או נוצרו בשלב</summary>

אלה הקבצים החדשים שנוספו או נוצרו בשלב הזה. קובצי מיגרציה או תשתית שנוצרים בפקודה אין להעתיק ידנית.

- [RazorTaba/Pages/Error.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml)
- [RazorTaba/Pages/Error.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Error.cshtml.cs)
- [RazorTaba/Pages/Index.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Index.cshtml.cs)
- [RazorTaba/Pages/Privacy.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml)
- [RazorTaba/Pages/Privacy.cshtml.cs](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Privacy.cshtml.cs)
- [RazorTaba/Pages/Shared/_Layout.cshtml.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_Layout.cshtml.css)
- [RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/Shared/_ValidationScriptsPartial.cshtml)
- [RazorTaba/Pages/_ViewImports.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewImports.cshtml)
- [RazorTaba/Pages/_ViewStart.cshtml](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/Pages/_ViewStart.cshtml)
- [RazorTaba/RazorTaba.csproj](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/RazorTaba.csproj)
- [RazorTaba/appsettings.Development.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.Development.json)
- [RazorTaba/appsettings.json](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/appsettings.json)
- [RazorTaba/wwwroot/favicon.ico](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/favicon.ico)
- [RazorTaba/wwwroot/images/fox.svg](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/images/fox.svg)
- [RazorTaba/wwwroot/js/site.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/js/site.js)
- [RazorTaba/wwwroot/lib/bootstrap/LICENSE](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/LICENSE)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-grid.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-reboot.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css)
- [RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/css/bootstrap.rtl.min.css.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.esm.min.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.js.map)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js)
- [RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/bootstrap/dist/js/bootstrap.min.js.map)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js)
- [RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/LICENSE.md)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/additional-methods.min.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.js)
- [RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery-validation/dist/jquery.validate.min.js)
- [RazorTaba/wwwroot/lib/jquery/LICENSE.txt](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/LICENSE.txt)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.min.map)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.js)
- [RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map](https://github.com/3strategy/razortaba/blob/979d543d83d7d7c9e4f722b5400c60c4253b78a2/RazorTaba/wwwroot/lib/jquery/dist/jquery.slim.min.map)

</details>
-->

## Запускаем и проверяем

1. Сайт открывается по адресу `localhost`, указанному при вашем запуске.
2. Заголовок и абзац отображаются на иврите, изображение загружается.
3. Сохраните ещё одно изменение, запустите сайт и убедитесь, что оно отображается.
4. Остановите сайт, снова откройте тот же проект и запустите его.

## Самостоятельное задание и проверка понимания

Измените одно предложение и объясните, в каком файле вы его редактировали и как проверили результат.

{: .box-success}
Сохраните файлы и покажите работающий сайт. Запишите, где находится папка проекта, чтобы открыть её на следующем занятии.

{: .box-note}
ИИ может помочь разобраться в сообщении об ошибке и найти неисправность. Вы отвечаете за написание, проверку и объяснение кода; не поручайте агенту писать проект.

<!-- teacher-notes:start
class_periods: 1

Template baseline revised 2026-10-16: stock .NET 10 webapp (SDK 10.0.400), top-level statements, original startup/static assets and Bootstrap navbar retained. Early route 01a–04 was applied to a fresh template, built with zero warnings/errors and inspected in a browser. Changed layout/Program excerpts through 15 were checked for contextual applicability only; macOS runs remain pending; Rider 2026.2.2 Windows GUI creation and first run were verified on 2026-10-16. Historical companion pins describe the previous custom layout; they are not qualified source checkpoints for this revised route.

להכין התקנות לפני המפגש. אין יעד לימודי של PR, branches או merge.
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Дальше

- [Дальше: 03 — Сайт становится моим]({{ '/taba/ru/03-my-theme/' | relative_url }})
<!-- lesson-next:end -->
