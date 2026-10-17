---
layout: page
title: "08 — Соединяем страницы и создаём форму"
subtitle: Навигация и HTML-поля в работающем проекте Razor; подписи и форма, которая пока не сохраняет данные; без забегания вперёд к логике C#
lang: ru
language: ru
translation_of: /taba/08-pages-and-forms/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 9
track: core
published: true
companion_commit: 9e759fba10f1ec17fe4b851ed53e8703d06b644b
companion_previous: fd6683d2c183607a7a808b053c0887256179d66e
---

{: .box-note}
Добавим страницу на сайт и ссылку на неё в меню. Создадим на ней форму с полями и подписями и проверим, как ею пользоваться.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Предыдущий урок: 07 — Место для дополнительного урока]({{ '/taba/ru/07-reserved/' | relative_url }}){: data-sequence-nav="prev"} · [Следующий урок: 09 — Пишем содержимое в Markdown]({{ '/taba/ru/09-markdown/' | relative_url }}){: data-sequence-nav="next"}

На сенсорном экране проведите вправо для перехода к следующему уроку, влево — к предыдущему.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/9e759fba10f1ec17fe4b851ed53e8703d06b644b) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/fd6683d2c183607a7a808b053c0887256179d66e...9e759fba10f1ec17fe4b851ed53e8703d06b644b)
-->

## Чему научимся

- Связывать страницы сайта ссылками.
- Связывать `label` с полем через `for` и `id`.
- Различать оформленную форму и сохранение данных.

{: .box-note}
С этого урока постепенно развиваем годовой проект, зарегистрированный на уроке Git. Откройте личный репозиторий с вашими данными в имени `FirstNameLastNameRazor` и убедитесь, что учитель подтвердил доступ. Добавьте новую страницу в этот сайт; создавать проект для каждого урока не нужно. Если регистрация или доступ ещё не завершены, вернитесь к [уроку 06 — регистрации проекта]({{ '/taba/ru/06-git-github/' | relative_url }}) и завершите её вместе с учителем.

## Начинаем с синхронизации

Откройте правильную папку проекта. Сохраните предыдущую работу в файлах и в Commit, затем убедитесь, что в Source Control или Git Changes нет ожидающих изменений. Только после этого выполните **Pull**. Если Git сообщает о конфликте, обратитесь к учителю; не удаляйте работу и не выполняйте Force Push.

## Ещё одна страница, тот же сайт

Создайте `Pages/Contact.cshtml`. Строка `@page` делает страницу доступной по адресу `/Contact`. Меню редактируем один раз в Layout. Пока воспринимаем `asp-page` как адрес страницы проекта; позже объясним, как Razor создаёт `href`. Кнопка `type="button"` не отправляет форму. Нажмите на неё и убедитесь, что страница остаётся на месте.

## Изменения в коде

### `RazorTaba/Pages/Contact.cshtml`

Новый файл. Создайте `RazorTaba/Pages/Contact.cshtml` и вставьте следующий текст:

````cshtml
@page
@{
    ViewData["Title"] = "נשארים בקשר";
}
<h1>נשארים בקשר</h1>
<p class="alert alert-info">זהו תרגול של טופס HTML. הפרטים עדיין אינם נשלחים או נשמרים.</p>
<form class="card p-4 col-lg-7">
    <label for="visitor" class="form-label">השם שלכם</label>
    <input id="visitor" class="form-control mb-3" required maxlength="50" />
    <label for="topic" class="form-label">על מה תרצו לקרוא?</label>
    <textarea id="topic" class="form-control mb-3" rows="4"></textarea>
    <button type="button" class="btn btn-primary">כפתור לדוגמה — עדיין לא שולח</button>
</form>
````

### `RazorTaba/Pages/Shared/_Layout.cshtml`

Внесите следующее изменение в существующий файл. Знаки `+` и `-` обозначают изменения и не являются частью кода:

````diff
                         <li class="nav-item">
                             <a class="nav-link text-dark" asp-area="" asp-page="/Privacy">Privacy</a>
                         </li>
+                        <li class="nav-item">
+                            <a class="nav-link text-dark" asp-area="" asp-page="/Contact">קשר</a>
+                        </li>
                     </ul>
                 </div>
             </div>
````

## Запускаем и проверяем

1. Ссылка «קשר» («Связь») ведёт на новую страницу.
2. Нажатие на подпись имени переводит фокус в поле.
3. При нажатии кнопки информация не отправляется.

## Самостоятельное задание и проверка понимания

Добавьте поле по своей теме с подходящей подписью. Объясните, почему красивая форма ещё не доказывает, что данные сохраняются.

{: .box-success}
После существенного изменения проверьте Diff, выполните Stage, напишите сообщение Commit о сделанных изменениях и выполните Push. Убедитесь на GitHub, что изменение появилось. За год требуется не менее 50 содержательных коммитов, в том числе если всегда работаете на одном ноутбуке.

{: .box-note}
ИИ может помочь разобраться в сообщении об ошибке и найти неисправность. Вы отвечаете за написание, проверку и объяснение кода; не поручайте агенту писать проект.

<!-- teacher-notes:start
class_periods: 2
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Дальше

- [Дальше: 09 — Пишем содержимое в Markdown]({{ '/taba/ru/09-markdown/' | relative_url }})
<!-- lesson-next:end -->
