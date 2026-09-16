---
layout: page
title: השוואת קוד
lang: he
full-width: true
published: false
sitemap: false
permalink: /test-fixtures/code-diff/
---

<!-- Unpublished integration fixture: build with --unpublished for browser tests. -->

{% code_diff %}
 public static void PrintSummary(int count, int total)
 {
-    WriteLine(count);
-    WriteLine(total);
+    Console.WriteLine(count);
+    Console.WriteLine(total);
 }
{% endcode_diff %}

{% code_diff %}
 public static void ReadNames()
 {
-    string first = ReadLine();
-    string last = ReadLine();
+    string first = Console.ReadLine();
+    string last = Console.ReadLine();
     if (first == "" || last == "") return;
 }
{% endcode_diff %}
