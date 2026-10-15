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

## Verification

```powershell
node --test tests/language-preference.test.js
wsl.exe -d Ubuntu bash -lic "cd /home/stra/repos/BeautifulYesodot && bundle exec jekyll build"
```

After adding an edition, inspect its generated version map, translation links,
reading direction, and fallback in a browser. The current Russian course CSS
continues to be loaded by its existing `csru` front matter defaults.
