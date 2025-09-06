---
layout: page 
title: "סיכום תחביר (Java)" 
subtitle: "סיכום תחביר. כולל כל חלק א - Java" 
tags: [סיכום, תחביר, syntax, java] 
mathjax: true 
lang: he
---



```java
import java.util.Random;
import java.util.Scanner;

public class Main {
    // static היא מחוץ לפונקציות! חייבים להגדיר את rnd ביצירת מופע של
    public static Random rnd = new Random(); // ריק פרט לבדיקות seed משאירים

    /**
     * תיעוד מעל הפעולה. תשובה לשאלה 3.2.2 בעזרת הקיצור
     */
    public static void Q322() {
        System.out.print("Enter something: "); // פלט/הדפסה/בקשה/הודעה למשתמש
        Scanner input = new Scanner(System.in);
        int min = input.nextInt(); // קלט מספר שלם, המרה, והשמה.

        int max = 5; // בבחינה מספיק לרשום כך ========== קלוט מספר שלם =========

        int temp = rnd.nextInt(31 - 9) + 9; // מגריל בין 9 ל-30
        boolean isOk = rnd.nextInt(2) == 1; // הגרלת 0 או 1 + השמת תוצאת הביטוי הלוגי
        max = Math.max(temp, min); // מחזירה (כאן) שלם, הגדול מבינהם
        min = Math.min(temp, min); // שימוש במשתנה הקיים; אין הכרזה חדשה
        double avg = (double)(min + max) / 2; // התוצאה תהיה ממשי
        avg = Math.round(avg * 1000.0) / 1000.0; // avg מעגל ל-3 ספרות
        double sqr = Math.sqrt(avg); // שורש ריבועי
        int twoBehzkat3 = (int)Math.pow(2, 3); // חזקה 2³ ממשי ואז המרת int

        System.out.printf("min: %d and max is %d%n", min, max); // שרשור ישן
        System.out.println(STR."min: \{min} and max is \{max}"); // Java 21+ -שרשור ב
        System.out.printf("avg: %.3f ...%n", avg); // מבטיח פורמט 3 ספרות
        int mod3 = max % 3; // שארית חלוקה ב-3
        int rDigit = max % 10; // מחלץ ספרה ימנית
        int tensDig = (max / 10) % 10; // ספרת עשרות
        boolean minIsZugi = min % 2 == 0; // חישוב זוגיות והשמת התוצאה במשתנה
    }

    public static void Q333() {
        int num = 5, length = 10;
        if (num == 0) {
            System.out.println("First condition met");
        } else if (num == 1) {
            System.out.println("Second condition met");
            System.out.println("Only multiple statements require a block");
        } else {
            System.out.println("Will happen if nothing else happened");
        }

        // בסוף כל סיבוב ; בתחילת סיבוב ; במעבר ראשון
        for (int i = 0; i < length; i++) {
            if (num > 17) { // אם לא קורה משהו חריג
                break; // יציאה מוקדמת מלולאה
            }
        }
        for (int i = length - 1; i >= 0; i--) { } // reversed loop

        while (num > 0) { // שימושי כשלא ידוע מספר החזרות
            // יבוצע כל עוד התנאי מתקיים num > 0
            num--;
        }
    }

    public static void main(String[] args) {
        Q322(); // קריאה לפעולה
        Q333(); // הדרך לכתוב ולהפעיל כמה תכניות באותו פרוייקט
    }
}
```

