---
layout: page
title: "05 — Красивый сайт с Bootstrap"
subtitle: Карточки, сетка и адаптация к телефону; рабочая основа, даже если своё оформление ещё не закончено
lang: ru
language: ru
translation_of: /taba/05-bootstrap/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 6
track: core
published: true
companion_commit: e0870b94577d330d3609d697d4a16c8c19c754ab
companion_previous: c80e5ea647000b07646c97f41b4ab091327319f8
---

{: .box-note}
Создадим вступительный блок и карточки с Bootstrap. Расположим содержимое в колонках и проверим, что сайт удобно читать и на телефоне.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Предыдущий урок: 04 — Оформляем сайт с помощью CSS]({{ '/taba/ru/04-css-classes/' | relative_url }}){: data-sequence-nav="prev"} · [Следующий урок: 06 — Сохраняем версии с Git и публикуем на GitHub]({{ '/taba/ru/06-git-github/' | relative_url }}){: data-sequence-nav="next"}

На сенсорном экране проведите вправо для перехода к следующему уроку, влево — к предыдущему.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/e0870b94577d330d3609d697d4a16c8c19c754ab) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/c80e5ea647000b07646c97f41b4ab091327319f8...e0870b94577d330d3609d697d4a16c8c19c754ab)
-->

## Чему научимся

- Использовать `container`, `row` и `col`.
- Создавать карточку `card` и кнопку.
- Сочетать классы Bootstrap со своими CSS-правилами.

{: .box-note}
Мы пока пробуем разные варианты до регистрации годового проекта. Можно продолжить выбранный пробный проект или создать новый в отдельной папке по [инструкциям урока 02]({{ '/taba/ru/02-development-environment/' | relative_url }}). Если начинаете заново, внесите изменения из предыдущих уроков, необходимые для следующих примеров. Сохраните прежние проекты; публиковать их на GitHub пока не нужно.

## Открываем и запускаем

Откройте папку проекта, с которым работали, сохраните файлы и запустите сайт. Прежде чем вносить новое изменение, убедитесь, что изменение с прошлого занятия отображается.

## Строим три области

На широком экране вступительный блок занимает две колонки. Область карточек использует три колонки начиная с размера `md`; на узком экране карточки располагаются друг под другом. `g-4` задаёт промежутки, а `h-100` выравнивает высоту. Меняйте по одному классу Bootstrap, чтобы увидеть его действие. Файлы Bootstrap уже входят в шаблон Razor Pages и находятся в `wwwroot/lib/bootstrap`; добавлять новую библиотеку или редактировать существующую не нужно. Шаблон подключает их перед `wwwroot/css/site.css`, поэтому свои изменения добавим в конец `site.css`. Верхнее меню также остаётся из шаблона.

## Изменения в коде

### `RazorTaba/Pages/Index.cshtml`

Внесите следующее изменение в существующий файл. Знаки `+` и `-` обозначают изменения и не являются частью кода:

````diff
 @model IndexModel
 @{
     ViewData["Title"] = "בית";
 }
-<section class="intro">
-<h1>החיות שלי</h1>
-<p>ברוכים הבאים לפינה שלי בטבע. נכיר חיות, נקרא עליהן ונלמד איך מטפלים בהן.</p>
-<h2>מה תמצאו כאן?</h2>
-<ul>
-    <li>חיות שיש להן סיפור</li>
-    <li>מדריכי טיפול קצרים</li>
-    <li>המלצות שלי להיכרות מקרוב</li>
-</ul>
-<a href="https://he.wikipedia.org/wiki/שועל">לקריאה על שועלים</a>
-<img src="~/images/fox.svg" alt="איור של שועל" width="180" />
+<section class="intro row g-4 align-items-center mx-0">
+    <div class="col-lg-8">
+        <p class="eyebrow">הפינה שלי בטבע</p>
+        <h1>לכל חיה יש סיפור.<br />בואו להכיר.</h1>
+        <p class="lead">מגלים, מתעדים ולומדים לטפל. אתר קטן עם מקום גדול לסקרנות.</p>
+        <a class="btn btn-light btn-lg" href="#meet">מכירים את החיות ↓</a>
+    </div>
+    <div class="col-lg-4 text-center">
+        <img class="hero-image" src="~/images/fox.svg" alt="איור שועל כתום" />
+    </div>
+</section>
+<section id="meet" class="py-5">
+    <p class="eyebrow">נפגשים מקרוב</p>
+    <h2 class="mb-4">שלוש חיות, שלושה סיפורים</h2>
+    <div class="row g-4">
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art" aria-hidden="true">🦊</div><div class="card-body"><h3>נורי השועל</h3><p>סקרן, זריז ותמיד מוכן לגלות משהו חדש.</p></div></article></div>
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art mint" aria-hidden="true">🐢</div><div class="card-body"><h3>תום הצב</h3><p>לא ממהר לשום מקום. יש הרבה מה ללמוד ממנו.</p></div></article></div>
+        <div class="col-md-4"><article class="card h-100"><div class="animal-art lilac" aria-hidden="true">🦉</div><div class="card-body"><h3>לונה הינשופה</h3><p>כשהשמש יורדת, הסיפור שלה רק מתחיל.</p></div></article></div>
+    </div>
 </section>
````

### `RazorTaba/wwwroot/css/site.css`

Внесите следующее изменение в существующий файл. Знаки `+` и `-` обозначают изменения и не являются частью кода:

````diff
 .intro { background: var(--forest); color: #fff; border-radius: 1.5rem; padding: 3rem; }
 .intro h1 { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; }
 .intro a { color: var(--accent); }
 footer { border-top: 1px solid #d8dfd3; margin-top: 3rem; color: var(--leaf); }
+
+.eyebrow { letter-spacing: .08em; font-weight: 700; font-size: .9rem; }
+.hero-image { width: min(100%, 17rem); transform: rotate(-5deg); border-radius: 2rem; }
+.card { border: 1px solid #d8dfd3; border-radius: 1.25rem; overflow: hidden; box-shadow: 0 .4rem 1.5rem #173f3508; }
+.animal-art { background: #fae5d3; font-size: 5rem; text-align: center; padding: 1.5rem; }
+.mint { background: #e1e9d9; }
+.lilac { background: #ebe3ee; }
+.btn { border-radius: .75rem; }
+.btn-primary { background: var(--forest); border-color: var(--forest); }
+.btn-primary:hover { background: var(--leaf); border-color: var(--leaf); }
````

## Запускаем и проверяем

1. На широком экране видны три карточки в ряд.
2. При ширине телефона карточки располагаются друг под другом без горизонтальной прокрутки.
3. Кнопка прокручивает страницу к области животных.

## Самостоятельное задание и проверка понимания

Адаптируйте три карточки к своей теме. Сначала замените содержимое, затем цвета. Проверьте, что карточки остаются читаемыми при разной длине текста.

{: .box-success}
После изменения сохраните файлы, проверьте сайт в браузере и объясните, что изменили. Можно продолжить этот пробный проект или потренироваться в отдельном; запишите, где сохранён каждый из них.

{: .box-note}
ИИ может помочь разобраться в сообщении об ошибке и найти неисправность. Вы отвечаете за написание, проверку и объяснение кода; не поручайте агенту писать проект.

## Проверяем контраст кнопки

Проверьте цвет текста светлой кнопки «מכירים את החיות» («Знакомимся с животными»). Правило `.intro a` действует и на неё, задавая тексту цвет акцента. Чтобы текст на светлом фоне стал тёмным, откройте `wwwroot/css/site.css` и добавьте в конец файла, после правила `.btn-primary:hover`, комментарий и точное правило, приведённые ниже. Оставьте существующие правила на месте.

<!--
[השינוי בקוד](https://github.com/3strategy/razortaba/commit/e0870b94577d330d3609d697d4a16c8c19c754ab)
-->

````diff
 .btn { border-radius: .75rem; }
 .btn-primary { background: var(--forest); border-color: var(--forest); }
 .btn-primary:hover { background: var(--leaf); border-color: var(--leaf); }
+
+/* הכפתור הבהיר זקוק לטקסט כהה, גם כשהוא נמצא בתוך אזור הפתיחה. */
+.intro .btn-light { color: var(--forest); }
````

{: .box-success}
Сохраните файл и обновите страницу. Убедитесь, что текст светлой кнопки тёмный и читаемый, а нажатие по-прежнему прокручивает страницу к карточкам. Новое правило действует только на кнопку с классом `btn-light` внутри области с классом `intro`.

<!-- teacher-notes:start
class_periods: 3
teacher-notes:end -->

{: .box-note}
На следующем уроке выберем из пробных проектов работающий сайт для дальнейшего развития и зарегистрируем его как годовой проект. Подготовьте папку выбранного сайта, проверьте, что он работает и вы знаете, где его файлы содержимого и оформления. До регистрации ещё можно пробовать и начинать заново; после неё будем открывать тот же проект и сохранять историю его развития.

<!-- lesson-next:start -->
---

## Дальше

- [Дальше: 06 — Сохраняем версии с Git и публикуем на GitHub]({{ '/taba/ru/06-git-github/' | relative_url }})
<!-- lesson-next:end -->
