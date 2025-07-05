

### תרגיל 1.2.6: הצגת שם ותו מהשם

כתבו תכנית שקוראת שם פרטי ומדפיסה את התו הראשון בשם.

<details><summary>פתרון</summary>

{% highlight csharp linenos %}
Console.Write("Enter your name: ");
string name = Console.ReadLine();

char firstChar = name[0]; // name פניה לתו הראשון במחרוזת

Console.WriteLine("First letter: " + firstChar);
{% endhighlight %}

</details>

---