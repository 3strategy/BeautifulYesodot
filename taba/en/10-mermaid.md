---
layout: page
title: "10 — Draw with text: Mermaid"
subtitle: A flowchart inside Markdown; nodes, connections and Hebrew labels; read, correct and explain the diagram source
lang: en
language: en
translation_of: /taba/10-mermaid/
tags:
- CSharp
- HTML
- Web
- Taba
sequence: 11
track: core
published: true
companion_commit: cb12bd589208363af709028b0a00a26769ff7a7d
companion_previous: ac696838547401ac23a50a09097079f44d97d6a6
---

{: .box-note}
We will create a flowchart using Mermaid. We will write nodes and arrows, add Hebrew labels and change the diagram through its text file.

<style>
main {
  direction: ltr !important;
  text-align: left !important;
}
</style>

<!-- lesson-back:start -->
[Previous lesson: 09 — Write content in Markdown]({{ '/taba/en/09-markdown/' | relative_url }}){: data-sequence-nav="prev"} · [Next lesson: 11 — Understand Razor Pages and the shared layout]({{ '/taba/en/11-razor-layout/' | relative_url }}){: data-sequence-nav="next"}

On a touchscreen, swipe right for the next lesson and left for the previous lesson.
<!-- lesson-back:end -->

<!--
[קוד השלב](https://github.com/3strategy/razortaba/tree/cb12bd589208363af709028b0a00a26769ff7a7d) · [השינוי מהשלב הקודם](https://github.com/3strategy/razortaba/compare/ac696838547401ac23a50a09097079f44d97d6a6...cb12bd589208363af709028b0a00a26769ff7a7d)
-->

## What we will learn

- Distinguish between a node's identifier and its label.
- Connect nodes with arrows.
- Read and explain the diagram instead of treating it as an uneditable image.

## Start in sync

Open the correct project folder. Make sure your work from the previous session is saved both in the files and in a Commit, and that there are no pending changes in Source Control or Git Changes. Now **Pull**. If Git reports a conflict, ask the teacher; do not delete work or Force Push.

## A little syntax, a clear result

Inside a code fence with the language `mermaid`, write `flowchart LR`. The letters `A` and `B` are identifiers; the Hebrew labels are in quotation marks. If your editor's Markdown preview does not display Mermaid, read the source or use the preview demonstrated by the teacher; in the next lesson, the website itself will render the diagram. A diagram produced with a tool must still fit the content and be understandable to you.

In the shared example, the Hebrew labels mean: A — choose an animal; B — learn about its needs; C — choose a responsible keeper; D — prepare a suitable environment. The arrows show this order.

## Code changes

### `RazorTaba/Content/care.md`

Make the following change in the existing file. The `+` and `-` signs show changes and are not part of the code:

````diff
--- a/RazorTaba/Content/care.md
+++ b/RazorTaba/Content/care.md
@@ -15,4 +15,13 @@

 ![איור של שועל](/images/fox.svg)

 [חזרה לדף הבית](/)
+
+## מתכננים טיפול
+
+```mermaid
+flowchart LR
+    A["בוחרים חיה"] --> B["לומדים על הצרכים שלה"]
+    B --> C["קובעים מטפל אחראי"]
+    C --> D["מכינים סביבה מתאימה"]
+```
````

## Run and check

1. There are four nodes connected in a logical order.
2. Changing a label does not change the node identifier.
3. Add a node, check the source and restore a valid version if you forgot a bracket.

## Personal task and understanding check

Build a four-step process about your website's topic. Explain each arrow aloud.

{: .box-success}
After a meaningful change: inspect the diff, Stage, write a commit message describing your change, Commit and Push. Check in GitHub that the change arrived. At least 50 meaningful commits are required throughout the year, even if you always work on the same laptop.

{: .box-note}
AI can help you understand an error message and troubleshoot a problem. You are responsible for writing, testing and explaining the code; do not run an agent to write the project for you.

<!-- teacher-notes:start
class_periods: 1
teacher-notes:end -->

<!-- lesson-next:start -->
---

## Next steps

- [Continue: 11 — Understand Razor Pages and the shared layout]({{ '/taba/en/11-razor-layout/' | relative_url }})
<!-- lesson-next:end -->
