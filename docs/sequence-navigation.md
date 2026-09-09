# Touch navigation for lesson sequences

The shared script is byte-identical to BeautifulMivney at the time of this port.
It is loaded once by the footer and activates only on explicitly tagged pages.

## Enabled route

Taba: student roadmap → 01 → 01a-development-git → 02 → 03 → 04 →
04a → 05 → 05a → 05b → 06 → 07 → 08 → 09 → 10 → 11 → 12 → 13 →
13a → 14 → 15 → 16 → 17 → 18. There are 24 enabled pages.

The route includes the extension after 12 and keeper CRUD at 13a. Alternative
links remain ordinary links. The teacher plan and separate IDE setup guides
are not swipe steps. The student roadmap has no previous swipe, and lesson 18
has no next swipe; the manual return-to-roadmap link stays usable.

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
document direction. This is the Hebrew course convention; a future LTR course
may need an explicit direction option before adopting it.

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
```

The suite serves `_site` itself and uses Chromium's native touch injection in a
390×844 mobile viewport. It checks all 24 pages' rendered link destinations and reciprocal neighbors,
navigation, browser history return, ordinary link clicks, boundaries, untagged
pages, scrolling, controls, text selection, cancelled gestures, and zoom. It
requires Playwright's Chromium browser. External resources are blocked so the
gesture checks do not depend on third-party CDNs.

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
