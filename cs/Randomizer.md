---
layout: page 
title: "שליפת שמות" 
subtitle: ""
tags: שמות
mathjax: true
lang: he
---


## בחר כיתה

<div id="randomizer-classes" dir="rtl">
  <div class="randomizer-row">
    <label for="class-select">כיתה קיימת</label>
    <select id="class-select"></select>
    <button type="button" id="load-class">טען כיתה</button>
  </div>
  <div class="randomizer-row">
    <label for="class-name">שם כיתה חדשה/לעדכון</label>
    <input id="class-name" type="text" autocomplete="off" />
    <button type="button" id="save-class">שמור/בחר כיתה</button>
  </div>
</div>

## הזן קוד

<p dir="rtl">הכנס שמות תלמידים (שורה לכל תלמיד/ה או מופרד בפסיקים).</p>
<textarea id="students-input" rows="8" dir="rtl"></textarea>
<div class="randomizer-row" dir="rtl">
  <button type="button" id="save-students">שמור רשימת תלמידים</button>
  <button type="button" id="load-students">טען רשימת תלמידים</button>
  <button type="button" id="clear-students">נקה</button>
</div>
<p dir="rtl">
  אפשר גם מהקונסול:
  <code>Randomizer.saveClassStudents("ז2", ["נועה","דן","ליאור"])</code>
</p>

<p dir="rtl">חלוקה ל</p>
<ol id="randomizer-actions" dir="rtl">
  <li>
    קבוצות
    <div class="randomizer-row">
      <label for="group-count">מספר קבוצות</label>
      <input id="group-count" type="number" min="1" />
      <button type="button" id="make-groups">צור קבוצות</button>
    </div>
  </li>
  <li>
    תלמיד אחד
    <div class="randomizer-row">
      <button type="button" id="pick-one">בחר תלמיד/ה</button>
    </div>
  </li>
  <li>
    שליפת כמות תלמידים תלמידים?
    <div class="randomizer-row">
      <label for="subset-count">כמות</label>
      <input id="subset-count" type="number" min="1" />
      <button type="button" id="pick-subset">שלוף</button>
    </div>
  </li>
</ol>

<div id="randomizer-status" dir="rtl"></div>
<pre id="randomizer-result" dir="rtl"></pre>

<script>
  (function () {
    const STORAGE_KEY = "randomizer.classes.v1";
    const classSelect = document.getElementById("class-select");
    const classNameInput = document.getElementById("class-name");
    const studentsInput = document.getElementById("students-input");
    const groupCountInput = document.getElementById("group-count");
    const subsetCountInput = document.getElementById("subset-count");
    const statusEl = document.getElementById("randomizer-status");
    const resultEl = document.getElementById("randomizer-result");

    function readClasses() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return {};
      }
      try {
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === "object" ? parsed : {};
      } catch (error) {
        return {};
      }
    }

    function writeClasses(classesData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(classesData));
    }

    function normalizeNames(names) {
      return names.map((name) => name.trim()).filter(Boolean);
    }

    function parseNames(text) {
      return normalizeNames(text.split(/[\n,]+/));
    }

    function setStatus(message) {
      statusEl.textContent = message;
    }

    function setResult(message) {
      resultEl.textContent = message;
    }

    function refreshClassSelect(selectedName) {
      const classesData = readClasses();
      const classNames = Object.keys(classesData).sort();
      classSelect.innerHTML = "";

      if (classNames.length === 0) {
        const option = document.createElement("option");
        option.value = "";
        option.textContent = "אין כיתות שמורות";
        classSelect.appendChild(option);
        return;
      }

      classNames.forEach((name) => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        classSelect.appendChild(option);
      });

      if (selectedName && classNames.includes(selectedName)) {
        classSelect.value = selectedName;
      }
    }

    function getSelectedClass() {
      return classSelect.value || "";
    }

    function loadStudentsToTextarea(className) {
      if (!className) {
        setStatus("בחר/י כיתה.");
        return [];
      }
      const classesData = readClasses();
      const names = Array.isArray(classesData[className])
        ? classesData[className]
        : [];
      studentsInput.value = names.join("\n");
      setStatus(`נטענו ${names.length} תלמידים לכיתה ${className}.`);
      return names;
    }

    function saveStudentsFromTextarea() {
      const className = getSelectedClass();
      if (!className) {
        setStatus("בחר/י כיתה לפני שמירה.");
        return [];
      }
      const names = parseNames(studentsInput.value);
      const classesData = readClasses();
      classesData[className] = names;
      writeClasses(classesData);
      setStatus(`נשמרו ${names.length} תלמידים לכיתה ${className}.`);
      refreshClassSelect(className);
      return names;
    }

    function saveClass(className) {
      const trimmed = (className || "").trim();
      if (!trimmed) {
        setStatus("הכנס/י שם כיתה.");
        return;
      }
      const classesData = readClasses();
      if (!Array.isArray(classesData[trimmed])) {
        classesData[trimmed] = [];
        writeClasses(classesData);
      }
      refreshClassSelect(trimmed);
      classSelect.value = trimmed;
      setStatus(`הכיתה ${trimmed} נבחרה.`);
    }

    function shuffle(array) {
      const copy = array.slice();
      for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    }

    function getNamesForRandom() {
      const className = getSelectedClass();
      if (!className) {
        setStatus("בחר/י כיתה וטעינ/י רשימה.");
        return [];
      }
      const classesData = readClasses();
      const names = Array.isArray(classesData[className])
        ? classesData[className]
        : [];
      if (names.length === 0) {
        setStatus("אין שמות שמורים בכיתה הזו.");
      }
      return names;
    }

    function renderGroups(groups) {
      return groups
        .map((group, index) => `קבוצה ${index + 1}:\n${group.join(", ")}`)
        .join("\n\n");
    }

    document
      .getElementById("save-class")
      .addEventListener("click", () => saveClass(classNameInput.value));
    document
      .getElementById("load-class")
      .addEventListener("click", () => loadStudentsToTextarea(getSelectedClass()));
    document
      .getElementById("save-students")
      .addEventListener("click", saveStudentsFromTextarea);
    document
      .getElementById("load-students")
      .addEventListener("click", () => loadStudentsToTextarea(getSelectedClass()));
    document.getElementById("clear-students").addEventListener("click", () => {
      studentsInput.value = "";
      setStatus("הרשימה נוקתה (לא נשמר).");
    });

    document.getElementById("pick-one").addEventListener("click", () => {
      const names = getNamesForRandom();
      if (names.length === 0) {
        setResult("");
        return;
      }
      const picked = names[Math.floor(Math.random() * names.length)];
      setResult(`נבחר/ה: ${picked}`);
    });

    document.getElementById("pick-subset").addEventListener("click", () => {
      const names = getNamesForRandom();
      if (names.length === 0) {
        setResult("");
        return;
      }
      const count = Number(subsetCountInput.value);
      if (!Number.isInteger(count) || count < 1) {
        setStatus("הזן/י כמות תקינה.");
        setResult("");
        return;
      }
      if (count > names.length) {
        setStatus("הכמות גדולה ממספר התלמידים.");
        setResult("");
        return;
      }
      const picked = shuffle(names).slice(0, count);
      setResult(`נבחרו ${count} תלמידים:\n${picked.join(", ")}`);
    });

    document.getElementById("make-groups").addEventListener("click", () => {
      const names = getNamesForRandom();
      if (names.length === 0) {
        setResult("");
        return;
      }
      const count = Number(groupCountInput.value);
      if (!Number.isInteger(count) || count < 1) {
        setStatus("הזן/י מספר קבוצות תקין.");
        setResult("");
        return;
      }
      const groupCount = Math.min(count, names.length);
      const shuffled = shuffle(names);
      const groups = Array.from({ length: groupCount }, () => []);
      shuffled.forEach((name, index) => {
        groups[index % groupCount].push(name);
      });
      setResult(renderGroups(groups));
    });

    window.Randomizer = {
      saveClassStudents(className, namesArray) {
        const classesData = readClasses();
        const cleaned = normalizeNames(Array.isArray(namesArray) ? namesArray : []);
        classesData[className] = cleaned;
        writeClasses(classesData);
        refreshClassSelect(className);
        setStatus(`נשמרו ${cleaned.length} תלמידים לכיתה ${className}.`);
        return cleaned;
      },
      loadClassStudents(className) {
        const classesData = readClasses();
        return Array.isArray(classesData[className]) ? classesData[className] : [];
      },
      listClasses() {
        return Object.keys(readClasses()).sort();
      },
      refreshUI() {
        refreshClassSelect(getSelectedClass());
      },
    };

    refreshClassSelect();
  })();
</script>



