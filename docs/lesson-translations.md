# Lesson translations and preferred language

The shared navbar language selector saves a student's preferred language in
`localStorage` (`lesson-language-preference`) for this site and browser.
Russian resolves to Russian, then English, then Hebrew; English resolves to
English, then Hebrew. Only existing versions are selected. Without a saved
preference the requested page is displayed. Pages without translations remain
at their original address, while retaining the preference for later lessons.

The implementation is ported from BeautifulMivney. Keep the language includes,
`assets/js/language-preference.js`, `assets/css/language-preference.css`,
`_plugins/lesson_translations.rb`, and the preference tests aligned between the
repositories. Preserve each site's navbar, menu configuration, layout details,
and existing Russian course styles when updating the integration.

## Existing Russian course

The 20 translated lessons, exercises, and reference pages in `csru/` declare
their corresponding `/cs/...` source using `translation_of`. Their URLs and
lesson navigation are unchanged. `csru/index.md` is a standalone Russian course
hub, without a corresponding Hebrew index; it is not a translation of Chapter 0.

Students can choose Russian and navigate through the regular Hebrew lesson
menus: translated lessons open automatically. The existing `part-a-ru` menu is
still available. Menu choice and language preference are independent; changing
language does not switch the student's selected course menu or affect other
course views. No translated lesson text was rewritten for the port.

The mixed Hebrew/English Chapter 0 progress checklist is registered as the
Hebrew source (`lang: he`); its existing custom presentation is retained. Its
post layout includes the same translation bar as the standard page layout.
The printable syntax summaries also show edition links on screen, hidden when
printing.

## Adding a translation

Put the translated Markdown at its own URL, and add:

```yaml
lang: ru
language: ru
translation_of: /cs/Chapter1
```

`translation_of` is the canonical source URL without the domain or `baseurl`.
Trailing slashes are optional. Original pages require no extra metadata.
Use `en` for English editions. The generator builds a small version map for
each translated lesson and fails the build for missing source pages or duplicate
editions. No manual translation registry or network probing is needed.

The page layout displays links to available editions. An explicit
`?lang=he`, `?lang=en`, or `?lang=ru` overrides the saved choice for that visit,
so students can inspect the source without losing their preference. Changing
the selector clears this override. Redirects retain other query parameters and
anchors. Shared HTML language metadata and CSS give Russian and English lesson
content left-to-right reading order; Hebrew pages retain their existing layout.

With blocked storage, selector choices use the URL for the current navigation.
Without JavaScript, direct lesson URLs and translation links remain usable.
Preferences are stored separately for each site's origin, not synchronized
between BeautifulYesodot and BeautifulMivney.

## Taba: deliberately limited translation scope

The English and Russian editions live under `taba/en/` and `taba/ru/`, using
the Hebrew source filenames. They cover numbered lessons 01–12 (including the
reserved lesson 07) and the three alternative setup pages for lesson 02.
Their translated setup instructions are in `_includes/taba/en/` and
`_includes/taba/ru/`. The roadmap, teacher plan and lessons 13–27 remain Hebrew.
Links within the translated section stay in the same language; links at its
boundaries identify the Hebrew destination. The existing language selector also
opens these editions from the ordinary course menu.

Copyable code, commands and diff examples retain the Hebrew source exactly,
including visible example strings and the example site's RTL settings. This
keeps a single project progression when students continue beyond lesson 12.
The translated explanations introduce this choice and explain the example
content; they do not ask students to localize the project. Hidden source and
teacher notes retain their original content and historical checkpoint caveats.

Comparative review and follow-up recommendations are recorded separately in
`docs/taba-translation-control-en.md`, `docs/taba-translation-control-ru.md`
and `docs/taba-translation-control-he.md`. These documents are excluded from
the published site along with the rest of `docs/`.

## Verification

```powershell
node --test tests/language-preference.test.js
wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulYesodot && bundle exec jekyll build"
node --test tests/taba-translations.test.js
```

The Taba checks require a current normal build. They verify the bounded set of
15 pages per language, metadata, unchanged copyable examples (including setup
includes), generated version maps, local assets, lesson links and swipe route.
Browser coverage is available with the repository's Playwright dependency:

```sh
node node_modules/@playwright/test/cli.js test tests/taba-translations.spec.js --workers=4
```

It checks actual preference redirects, direct Hebrew inspection, LTR reading,
localized comparison labels and aligned panels on desktop/mobile, translated
setup sections, and continuation into the untranslated Hebrew lesson 13.
These checks validate the teaching pages and navigation; they do not certify
fresh IDE installation, external account operations or student-project builds.

After adding an edition, inspect its generated version map, translation links,
reading direction, and fallback in a browser. The current Russian course CSS
continues to be loaded by its existing `csru` front matter defaults.
