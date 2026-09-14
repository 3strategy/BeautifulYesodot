# Touch navigation for lesson sequences

The shared script is byte-identical to BeautifulMivney at the time of this port.
It is loaded once by the footer and activates only on explicitly tagged pages.

## Enabled routes

Taba: student roadmap → 01 → 01a-development-git → 02 → 03 → 04 →
04a → 05 → 05a → 05b → 06 → 07 → 08 → 09 → 10 → 11 → 12 → 13 →
13a → 14 → 15 → 16 → 17 → 18. There are 24 enabled pages.

The route includes the extension after 12 and keeper CRUD at 13a. Alternative
links remain ordinary links. The teacher plan and separate IDE setup guides
are not swipe steps. The student roadmap has no previous swipe, and lesson 18
has no next swipe; the manual return-to-roadmap link stays usable.

Yesodot Alef now has matching explicit routes for the Hebrew originals in `cs/`
and their Russian translations in `csru/`. Both follow this order:

```text
Chapter0 → Chapter1 → Chapter1Hagashot → Chapter1Shortcuts → Chapter1Ex1.1 →
Chapter1b → Chapter1Ex1.2 → Chapter1Char → Chapter2 → Chapter2Ex2.1 →
ChapterSyntaxSummary → Chapter3 → Chapter3Ex3.1 → Chapter3Ex3.2 → Chapter4 →
Chapter4b → Chapter4ForPatternsLesson → Chapter4Ex4.2 → Chapter4Ex4.5 →
ChapterSyntaxSummary2
```

The Hebrew route contains 20 pages and starts at `/cs/Chapter0/`, with no previous
swipe. The Russian route adds the course index `/csru/` before
`/csru/Chapter0/`, so it contains 21 pages. Its index has no previous swipe.
`ChapterSyntaxSummary2` is the last swipe step in both languages, with no next
swipe; ordinary course-index links remain usable. Every other step has reciprocal
previous and next destinations in its own language. The corresponding source
filenames are preserved: Chapter2 covers Math and Random, and Chapter3 covers
conditions.

The route includes selected exercises and reference pages. Other links in the
lessons remain ordinary alternatives and do not change the swipe order. Each
page has its previous link near the beginning in a `lesson-back` region
and its next link at the end in a `lesson-next` region, except for unavailable
directions at the boundaries. On pages with an opening synopsis, the previous
link follows that synopsis. Keep these tagged navigation regions outside hidden
details, code blocks and interactive widgets.

## Tagging links

Tag existing Markdown links using Kramdown attributes:

```liquid
[הקודם]({{ '/course/previous-lesson' | relative_url }}){: data-sequence-nav="prev"}
[הבא]({{ '/course/next-lesson' | relative_url }}){: data-sequence-nav="next"}
```

Plain HTML works too: `<a href="/course/next-lesson" data-sequence-nav="next">הבא</a>`.
The first link of each kind within `main` supplies the destination. Top and bottom
navigation may repeat those tags, but must agree. Omit the unavailable link at a
sequence boundary; there is no wraparound or inferred destination. Ordinary links
remain usable without JavaScript and with a keyboard or screen reader.

Moving a finger **right goes next**, **left goes previous**, independent of the
document direction. The Hebrew and Russian Yesodot Alef routes deliberately use
the same gestures, including the Russian course's left-to-right layout. Do not
reverse swipe direction based on page language.

A swipe starts within lesson content, at least 28 CSS pixels from either screen
edge. It must be predominantly horizontal (1.8 times its vertical travel), cover
70–120 CSS pixels depending on viewport width, and finish within 900 ms. Navigation
happens on release. Early vertical/diagonal movement, cancellation, multiple
fingers, selected text, and pinch-zoomed viewports cancel recognition. Browser/OS
edge gestures are left alone.

Links, controls, editable content, media, canvases, embedded documents, and
horizontally scrollable elements retain their gestures. Add `data-swipe-ignore`
to any other widget or container that should own its touch interaction. Only
same-origin HTTP(S) destinations in the same tab are supported.

The touchmove listener is explicitly non-passive and prevents the default action
only after recognizing a horizontal gesture toward an available destination;
vertical scrolling remains native. See the
[MDN touch events guidance](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events).

## Verification

Install the package.json dev dependencies and Playwright Chromium if they are not already available. Build Jekyll first, then run from the repository root:

```sh
node node_modules/@playwright/test/cli.js test tests/sequence-navigation.spec.js --fully-parallel --workers=4
node node_modules/@playwright/test/cli.js test tests/cs-course-navigation.spec.js --fully-parallel --workers=4
```

Both suites serve `_site` themselves and use Chromium's native touch injection in a
390×844 mobile viewport. The Taba coverage checks all 24 pages' rendered link destinations and reciprocal neighbors,
navigation, browser history return, ordinary link clicks, boundaries, untagged
pages, scrolling, controls, text selection, cancelled gestures, and zoom. It
requires Playwright's Chromium browser. The CS suite checks all 41 Hebrew/Russian
route pages, real swipes in both languages, Russian menu persistence, LTR layout,
and saved progress checkboxes. External resources are blocked so the
gesture checks do not depend on third-party CDNs.

For the Yesodot Alef routes, also verify all 20 Hebrew and 21 Russian pages'
rendered destinations against the order above, including the index and final-page
boundaries. Check that each page has only one tagged link per available direction,
that a destination's opposite link returns to its neighbor, and that the final
reference pages load the shared footer script. Exercise right-next and left-prev
gestures in both languages; the Russian checklist, code blocks, wide tables and
embedded media must retain their own interactions.

For deployment acceptance, open lesson 02 on Android Chrome and iPhone Safari.
Swipe right over a paragraph to reach 03, then left to return to 02. Also check
normal vertical reading, wide tables, diagram interactions, pinch zoom, browser
Back, and the first/last lessons. Start within the page, away from screen edges.
Desktop emulation cannot fully reproduce phone OS gestures or Safari behavior.

To enable another course, tag that course's own existing next/previous links.
Do not copy BeautifulMivney's content paths. Keep the shared gesture script aligned
across the siblings when either site fixes a bug, and run both sites' browser tests.

The initial verification reused BeautifulMivney's installed Playwright through
NODE_PATH, without changing Yesodot's dependency files.
