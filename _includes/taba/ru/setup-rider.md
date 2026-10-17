## 1. Подготавливаем инструменты

Установите [JetBrains Rider](https://www.jetbrains.com/rider/download/) и [.NET 10 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/10.0) для своей операционной системы. На Mac выберите Arm64 для Apple Silicon или x64 для Intel. Если Rider был открыт при установке, перезапустите его.

## 2. Создаём решение и проект через интерфейс

<div class="two-columns">
<div markdown="1" class="column">

На стартовом экране Rider нажмите **New Solution**, как показано на снимке. Если решение уже открыто, выберите **File → New Solution**.

</div>
<div markdown="1" class="column">

[![Стартовый экран Rider с кнопкой New Solution]({{ '/assets/img/taba/rider-welcome.png' | relative_url }})]({{ '/assets/img/taba/rider-welcome.png' | relative_url }})

</div>
</div>

### Выбираем Web, затем Razor Pages

<div class="two-columns">
<div markdown="1" class="column">

Выберите **Web** слева. В списке **Template** обязательно выберите **Web App (Razor Pages)**: при открытии категории Web сначала может быть выбран Blazor, поэтому проверьте выделенную строку.

Задайте пробному проекту любое имя, например `RazorPractice`, и выберите свою родительскую папку. На снимке использована папка-пример в Windows; на Mac можно выбрать `WebProjects` в домашней папке. Не копируйте пример пути, если это не ваша папка.

</div>
<div markdown="1" class="column">

[![Окно New Solution в Rider с именем RazorPractice и выбранным шаблоном Web App Razor Pages]({{ '/assets/img/taba/rider-new-solution.png' | relative_url }})]({{ '/assets/img/taba/rider-new-solution.png' | relative_url }})

</div>
</div>

### Проверяем настройки создания

1. В **Solution name** введите любое имя на английском без пробелов, например `RazorPractice`. Оставьте такое же **Project name**.
2. В **Solution directory** выберите свою родительскую папку, например `WebProjects` в домашней папке. Перед подтверждением проверьте полный путь. Не выбирайте папку другого проекта.
3. Оставьте **Put solution and project in the same directory** без флажка. Получатся внешняя папка решения и внутренняя папка проекта.
4. Выберите **C#** и платформу **net10.0**. Прокрутите окно вниз с помощью внешней правой полосы прокрутки, за список шаблонов, чтобы увидеть дополнительные параметры.
5. Оставьте **Do not use top-level statements** без флажка. В поле **Auth** выберите **No authentication**. Оставьте **Add Dockerfile** без флажка. В Advanced Settings ничего менять не нужно.
6. Снимите флажок **Create Git repository**. На этом этапе тренируемся создавать и запускать; доступ через GitHub настроим после Bootstrap.
7. Нажмите **Create** и дождитесь создания файлов и восстановления пакетов.

[![Параметры Razor Pages в Rider: net10.0, No authentication и снятый флажок Do not use top-level statements]({{ '/assets/img/taba/rider-template-options.png' | relative_url }})]({{ '/assets/img/taba/rider-template-options.png' | relative_url }})

На любой снимок можно нажать для просмотра в полном размере.

Если .NET 10 или нужного шаблона нет, проверьте установку SDK и обратитесь к учителю. Не выбирайте другой шаблон, чтобы продолжить.

## 3. Запускаем и проверяем

1. В окне **Solution** слева (дерево файлов) раскройте проект и `Pages`. Убедитесь, что есть `Index.cshtml`, файл `.csproj` и папка `wwwroot`.
2. В списке конфигураций запуска на верхней панели выберите **RazorPractice: http** или имя своего проекта с `http`. Если этот профиль уже выбран, оставьте его. Нажмите **Run ▶**.
3. Дождитесь завершения сборки. Если браузер не открылся автоматически, откройте адрес `http://localhost:…` из окна Run. Используйте номер порта, показанный вашим проектом.
4. Проверьте наличие **Welcome** и меню Home и Privacy. Остановите сайт кнопкой **Stop ■**.
5. Откройте `Pages/Index.cshtml`, замените `Welcome` на `החיות שלי` («Мои животные»), сохраните и снова запустите. Убедитесь, что заголовок изменился.

<div class="two-columns">
<div markdown="1" class="column">

На снимке Rider слева видны проект и `Pages`, на верхней панели — профиль `http`, внизу — окно **Run**. Строка **Now listening on** показывает адрес вашего сайта. Номер порта может отличаться от снимка. Жёлтое предупреждение на снимке означает, что при запуске профиля `http` не выбран порт HTTPS; если появилась строка Now listening on и открылась страница Welcome, запуск HTTP удался.

[![Проект RazorPractice в Rider после запуска с http; окно Run показывает Now listening on]({{ '/assets/img/taba/rider-first-run.png' | relative_url }})]({{ '/assets/img/taba/rider-first-run.png' | relative_url }})

</div>
<div markdown="1" class="column">

В браузере должна появиться страница шаблона с **Welcome**, меню **Home / Privacy** и именем вашего проекта.

[![Страница Welcome проекта RazorPractice, созданного и запущенного в Rider]({{ '/assets/img/taba/rider-browser-welcome.png' | relative_url }})]({{ '/assets/img/taba/rider-browser-welcome.png' | relative_url }})

</div>
</div>

{: .box-success}
У вас есть сайт Razor Pages, созданный из шаблона и работающий из Rider. Bootstrap уже находится в `wwwroot/lib/bootstrap`, а собственные стили — в `wwwroot/css/site.css`.

## 4. Продолжаем или пробуем ещё раз

Для существующей работы выберите **Open** и откройте файл решения `.sln` или `.slnx`. Для повторной тренировки остановите сайт, вернитесь в **New Solution** и выберите новое имя, например `RazorPractice2`, и новую папку рядом с первой. Сохраните прежний пробный проект; удалять его не нужно.

Оставьте `Program.cs`, настройки запуска и файлы шаблона на месте. Публиковать что-либо в сети не требуется.

[Справка: создание сайта в Rider](https://www.jetbrains.com/help/rider/Get_started_with_asp_net.html)

<!-- Verified through Rider 2026.2.2 GUI on Windows, 2026-10-16: created C:/Temp/TabaRiderGui/RazorPractice with Web App (Razor Pages), net10.0, No authentication, no Git, and top-level statements. Run profile http built successfully and opened Welcome at localhost:5282. Captures are real application screenshots. macOS GUI remains unverified. -->
