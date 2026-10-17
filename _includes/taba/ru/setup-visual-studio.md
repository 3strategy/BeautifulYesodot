## 1. Устанавливаем средства разработки

1. Установите [Visual Studio Community](https://visualstudio.microsoft.com/vs/community/) версии с поддержкой .NET 10. Если Visual Studio уже установлена, откройте **Visual Studio Installer** и проверьте, нужно ли обновление.
2. В окне установки отметьте **ASP.NET and web development** и нажмите **Install**. Для существующей установки нажмите **Modify**, отметьте компонент и завершите изменение.
3. Убедитесь, что установлен [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0). Если его нет, установите и перезапустите Visual Studio.

**Проект** содержит код сайта. **Solution / Решение** — контейнер, с помощью которого Visual Studio открывает проекты и управляет ими. У нас в нём будет один проект.

## 2. Выбираем место и имена

Visual Studio создаст папки проекта за вас. Начните со стартового экрана программы.

### Открываем окно создания проекта

<div class="two-columns">
<div markdown="1" class="column">

Откройте **Visual Studio 2026**. В правой части стартового экрана нажмите **Create a new project**, как отмечено на снимке.

Если рабочее окно уже открыто, выберите **File → New → Project**, чтобы попасть в то же окно.

</div>
<div markdown="1" class="column">

[![Стартовый экран Visual Studio 2026 с выделенной кнопкой Create a new project]({{ '/assets/img/taba/visual-studio-create-project.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-create-project.png' | relative_url }})

</div>
</div>

### Находим и выбираем шаблон сайта

<div class="two-columns">
<div markdown="1" class="column">

В поле поиска вверху введите `raz`. В результатах выберите **ASP.NET Core Web App (Razor Pages)**, как отмечено на снимке, затем нажмите **Next** внизу окна.

Убедитесь, что выбрали шаблон сайта на языке **C#**. Результат **Razor Class Library**, расположенный ниже, нам не подходит. Не выбирайте Blazor, Web API или шаблон со словом MVC в имени.

</div>
<div markdown="1" class="column">

[![Поиск raz и выбор ASP.NET Core Web App (Razor Pages) в окне создания проекта]({{ '/assets/img/taba/visual-studio-razor-template.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-razor-template.png' | relative_url }})

</div>
</div>

На любой снимок можно нажать, чтобы открыть его в полном размере.

### Задаём имена и выбираем папку

<div class="two-columns">
<div markdown="1" class="column">

На снимке показано имя `GuysRazor`; для пробного проекта можно выбрать другое.

В окне **Configure your new project** выберите имя на английском без пробелов, например `RazorPractice` или `AnimalsTry2`. Это пробный проект; обязательное личное имя зададим только на уроке Git после Bootstrap.

- **Project name**: введите выбранное имя.
- **Location**: оставьте место по умолчанию, предложенное Visual Studio, обычно `source\repos` внутри вашей пользовательской папки. Не копируйте имя пользователя `3stra` со снимка.
- **Solution name**: оставьте то же имя, что у проекта.
- **Place solution and project in the same directory**: оставьте без флажка.

Внизу окна видно, где будет создан проект. Нажмите **Next**. Предварительно создавать папку в Проводнике не нужно.

</div>
<div markdown="1" class="column">

[![Окно Configure your new project с примером имени и расположением по умолчанию source repos]({{ '/assets/img/taba/visual-studio-project-name.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-project-name.png' | relative_url }})

</div>
</div>

Visual Studio создаст внешнюю папку решения и внутреннюю папку проекта, обе с выбранным именем. В нашем примере обе называются `RazorPractice`.

{: .box-note}
Если проект уже создан, откройте его через **Open a project or solution** и выберите `RazorPractice.sln` или `RazorPractice.slnx` в существующей папке. Для продолжения работы создавать ещё один проект не нужно. Для тренировки создания выберите новое имя и новую папку. Папку `first-page` с прошлого урока оставляем как есть.

## 3. Создаём проект Razor Pages

<div class="two-columns">
<div markdown="1" class="column">

В окне **Additional information** выберите следующие настройки. Обратите внимание на указанное отличие от старого снимка в пункте top-level statements:

- **Framework: .NET 10.0 (Long Term Support)**.
- **Authentication type: None**.
- **Configure for HTTPS** — флажок установлен.
- **Enable container support** — без флажка.
- **Do not use top-level statements** — без флажка: оставляем обычный код запуска шаблона. На старом снимке флажок установлен; у себя снимите его.
- **Enlist in Aspire orchestration** — без флажка.

Серые поля не требуют действий. Нажмите **Create** внизу окна и дождитесь создания проекта.

</div>
<div markdown="1" class="column">

[![Настройки Additional information для Razor Pages с NET 10 и установленным флажком Do not use top-level statements]({{ '/assets/img/taba/visual-studio-additional-information.png' | relative_url }})]({{ '/assets/img/taba/visual-studio-additional-information.png' | relative_url }})

</div>
</div>

{: .box-warning}
Если в списке нет шаблона Razor Pages или .NET 10, вернитесь к установке и обновлению. Не выбирайте другой шаблон ради перехода к следующему экрану; покажите учителю, чего не хватает.

## 4. Первая проверка: нажимаем Play и видим сайт

После **Create** дождитесь открытия окна проекта и окончания загрузки. Прежде чем менять код, проверьте, что созданный проект работает:

1. Нажмите **зелёный треугольник ▶ (Play)** на верхней панели Visual Studio.
2. Дождитесь сборки и открытия браузера. При первом запуске это может занять некоторое время.
3. Проверьте, что в браузере открылась начальная страница с заголовком **Welcome**, а в адресной строке указан `localhost` с номером порта. Это ваш сайт, работающий сейчас на вашем компьютере.

{: .box-success}
**Проверка прошла:** вы нажали Play, и страница Welcome открылась в браузере. Проект успешно создан; можно продолжать работу и пробовать изменения.

{: .box-warning}
Если сайт не открылся или появилась ошибка сборки, остановитесь здесь и покажите сообщение учителю. Переходите к редактированию только после успешного запуска сайта.

<details markdown="1"><summary>При первом запуске предлагается подтвердить сертификат HTTPS?</summary>

Visual Studio может попросить подтвердить локальный сертификат разработки для HTTPS. Если не уверены, что подтверждать, попросите помощи учителя. Можно также остановить запуск, выбрать **http** в списке рядом с зелёным треугольником и снова нажать Play.

</details>

### Останавливаем, знакомимся с файлами и меняем заголовок

Вернитесь в Visual Studio и нажмите **красный квадрат Stop** на верхней панели, чтобы остановить сайт.

Откройте **View → Solution Explorer**. Раскройте проект `RazorPractice` и папку `Pages`. В файловом менеджере видна следующая структура:

```text
source/repos/
└── RazorPractice/
    ├── RazorPractice.slnx (או RazorPractice.sln)
    └── RazorPractice/
        ├── RazorPractice.csproj
        ├── Program.cs
        ├── Pages/
        │   └── Index.cshtml
        └── wwwroot/
```

`Pages` содержит страницы сайта, а `wwwroot` — оформление, изображения и JavaScript. В дальнейшем путь `RazorPractice/Pages/Index.cshtml` начинается от папки решения `RazorPractice`; в Solution Explorer раскрывают проект, затем `Pages`.

1. В Solution Explorer откройте проект с выбранным именем, затем `Pages → Index.cshtml`.
2. В строке заголовка замените только `Welcome` на `החיות שלי` («Мои животные») и сохраните с помощью **Ctrl+S**.
3. Снова нажмите **зелёный треугольник Play** и убедитесь, что новый заголовок появился в браузере.
4. Вернитесь в Visual Studio и остановите сайт кнопкой **Stop**, прежде чем продолжать редактирование.

{: .box-success}
Теперь ваше изменение тоже видно на сайте. Сохраните файлы и переходите к общему уроку.

## Как использовать свои имена в следующих уроках?

В примерах курса проект называется `RazorTaba`. У себя используйте выбранное имя: например, `RazorTaba/Pages/Index.cshtml` соответствует `RazorPractice/Pages/Index.cshtml` внутри папки решения. Не переименовывайте проект ради соответствия примеру. В Solution Explorer раскройте свой проект, затем `Pages`.

Оставьте `Program.cs` и `Properties/launchSettings.json` такими, какими они созданы. На этом этапе редактируем только содержимое и оформление. Создавать Git-репозиторий или публиковать на GitHub не нужно.


<!-- צילום להשלמה: Additional information עם Do not use top-level statements לא מסומן, ובדיקת Welcome בדפדפן. -->
