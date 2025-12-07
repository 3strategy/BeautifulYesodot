---
layout: page
title: "משוב באמצעות AI"
subtitle: "אוטומציה של Google Sheets, LLM , Classroom"
author: גיא סידס
tags: [משוב, ניקוד, LLM]
mathjax: true
lang: en
---


<style>
html {
  direction: ltr !important;
}
body {
  text-align: left !important;
}
</style>

{: .box-note}
Automated AI-powered feedback system for student code submissions in Google Classroom. This system processes student form responses, generates personalized feedback using LLMs (GPT, Claude, or Groq), and delivers it directly to student documents with proper Hebrew RTL formatting.

## Features

- ✅ **Multiple LLM Support**: Works with OpenAI GPT, Not tested on Claude, Groq (easy adaptation)
- ✅ **Automatic Processing**: Interrogate LLMs and deliver feedback in two separate phases
- ✅ **Hebrew Support**: Native RTL text formatting with proper bullet points
- ✅ **Markdown Parsing**: Converts markdown formatting to Google Docs native formatting
- ✅ **Student Mapping**: Automatic roster sync from Google Classroom
- ✅ **Error Handling**: Comprehensive logging and status tracking

## Architecture

The system works in two phases:
1. **LLM Interrogation**: Fetches feedback from LLM and stores it in spreadsheet columns
2. **Delivery**: Reads stored feedback and writes it to student Google Docs in Classroom

This separation allows better debugging, processing control, and the ability to review feedback before delivery.

---

## Setup Guide

### Step 1: Create Google Forms Quiz Assignment

1. In **Google Classroom**, create a new **Assignment**
2. Click **Create** → **Quiz assignment**
3. This will create a linked Google Form
4. Configure your form:
   - ⚠️ **CRITICAL**: In form Settings → Responses, enable **"Collect email addresses"**
   - Add your quiz questions (e.g., coding questions)
5. In Classroom assignment settings:
   - Set due date and points as desired
   - **Assign** to your students

### Step 2: Set Up Responses Sheet

After students submit responses (or create a test submission yourself):

1. Open the Google Form
2. Click **Responses** tab → Click the **Sheets icon** to create a responses spreadsheet
3. This creates a new Google Sheets with "Form Responses 1" sheet
4. Verify Column A1 contains "Timestamp" and Column B contains "Email Address"

**Alternative**: If you already have a responses sheet, you can add the Apps Script to it directly.

### Step 3: Add Apps Script Files

1. In your responses spreadsheet, go to **Extensions** → **Apps Script**
2. Delete the default `Code.gs` file content
3. Create the following files with their content:

   - `Code.js` - Copy from project
   - `FormHandler.js` - Copy from project  
   - `LLMConfig.js` - Copy from project
   - `ClassroomIntegration.js` - Copy from project
   - `Utilities.js` - Copy from project
   - `appsscript.json` - Copy from project (⚠️ Replace entire content)

4. Click **💾 Save project** (Ctrl+S)

### Step 4: Configure Constants

Open `Code.js` and configure these constants at the top:

```javascript
// Form response columns
const COL_TIMESTAMP = 1;           // Form submission timestamp
const COL_EMAIL = 2;               // Student email (auto-collected by Form)
const COL_SCORE = 3;               // Score column
const COL_FIRST_ANSWER = 5;        // First answer column (adjust if needed)
const NUM_QUESTIONS = 1;           // Number of questions in the quiz
```

**Important adjustments**:
- `COL_FIRST_ANSWER`: Set to the column number where student answers begin (default: 5 = Column E)
- `NUM_QUESTIONS`: Set to the number of questions in your quiz
- If you have extra columns between Email and the first answer (like student name), adjust `COL_FIRST_ANSWER` accordingly

The system automatically calculates these columns:
```javascript
// System columns (placed after all answer columns)
const COL_DEBUG_LOG = COL_FIRST_ANSWER + NUM_QUESTIONS;
const COL_FEEDBACK_STATUS = COL_FIRST_ANSWER + NUM_QUESTIONS + 1;
const COL_RAW_LLM_RESPONSE = COL_FIRST_ANSWER + NUM_QUESTIONS + 2;
```

<details markdown="1">
<summary><b>📦 Advanced: Using clasp (Command Line Deployment)</b></summary>

For advanced users who prefer command-line deployment:

1. Install clasp globally:
   ```bash
   npm install -g @google/clasp
   ```

2. Login to Google:
   ```bash
   clasp login
   ```

3. Create a new Apps Script project or clone existing:
   ```bash
   # Create new
   clasp create --type sheets --title "Classroom Feedback System"
   
   # Or clone existing (use Script ID from project URL)
   clasp clone YOUR_SCRIPT_ID
   ```

4. Update `.clasp.json` with your script ID:
   ```json
   {
     "scriptId": "YOUR_SCRIPT_ID_HERE",
     "rootDir": ""
   }
   ```

5. Push files to Apps Script:
   ```bash
   clasp push
   ```

6. Open in browser:
   ```bash
   clasp open
   ```

**Note**: The `_clasp.json` file in the project is a reference. Rename it to `.clasp.json` and update with your own Script ID.

</details>

### Step 5: Initialize Support Sheets

Back in your **spreadsheet**:

1. Refresh the page to load the new script
2. A new menu **🎓 Classroom Feedback** should appear (may take 10-30 seconds)
3. Go to **🎓 Classroom Feedback** → **⚙️ Sheet Setup** → **Initialize Required Sheets**

This creates two essential sheets:

**Settings Sheet**:
- **A1**: Course ID (you'll fill this next)
- **A2**: Course Name (auto-filled by system)
- **A3**: Feedback Assignment ID (you'll fill this later)

**AssignmentConfig Sheet**:
- Define your questions, expected solutions, and grading notes
- Must have exactly `NUM_QUESTIONS` rows of configuration

4. Also run **⚙️ Sheet Setup** → **Add System Columns** to add Debug Log, Status, and Response columns to your form responses sheet

### Step 6: Configure Classroom Connection

#### Get Your Course ID

1. Open your Google Classroom course
2. Look at the URL: `https://classroom.google.com/c/COURSE_ID_HERE`
3. Copy the Course ID from the URL
4. Paste it into **Settings sheet, cell A1**

#### Test Classroom Connection

1. Go to **🎓 Classroom Feedback** → **📚 Classroom Setup** → **Test Course ID Decoding**
   - Verifies your Course ID is valid
   - Shows decoded ID that will be used for API calls

2. Go to **📚 Classroom Setup** → **Test Classroom Connection**
   - Connects to Google Classroom API
   - Retrieves course name
   - Auto-fills Settings sheet A2 with course name

#### Sync Student Roster

1. Go to **📚 Classroom Setup** → **Sync Student Mapping**
   - Fetches all students from Classroom roster
   - Creates **StudentMapping** sheet
   - Shows student names, IDs, and emails

2. If some students don't have emails visible (privacy settings), manually fill in the **"Email (Manual)"** column in the StudentMapping sheet

3. Go to **📚 Classroom Setup** → **Build Email Mapping**
   - Creates internal mapping of email → student ID
   - Required for delivering feedback to correct students

### Step 7: Configure LLM

⚠️ **Security Note**: We'll add API keys to code temporarily, save them to secure Script Properties, then remove them from code.

#### Add Your API Key (Temporarily)

1. Open `LLMConfig.js`
2. Find the `LLM_CONFIG_EXAMPLE` object (around line 19)
3. Add your API key to the active LLM:

```javascript
const LLM_CONFIG_EXAMPLE = {
  "gpt5mini": {
    "Name": "GPT-5-mini (Active)",
    "ApiEndpoint": "https://api.openai.com/v1/chat/completions",
    "Key": "sk-proj-YOUR-ACTUAL-API-KEY-HERE",  // ← Add your key here
    "Active": true,
    "AdditionalConfig": {
      "model": "gpt-5-mini",
      "max_completion_tokens": 14000,
      "reasoning_effort": "low"
    }
  },
  // ... other LLM configs
};
```

4. Set `"Active": true` for the LLM you want to use (only one should be active)
5. **💾 Save** the file (Ctrl+S)

#### Save Configuration to Script Properties

1. In your spreadsheet, go to **🎓 Classroom Feedback** → **🔧 LLM Configuration** → **1. Save Hardcoded Config to Properties**
   - This saves your API key to **secure Script Properties**
   - API key is now stored server-side and encrypted

#### Remove API Key from Code (Security Best Practice)

1. Open `LLMConfig.js` again
2. **Delete or replace** your API key with placeholder text:
   ```javascript
   "Key": "sk-proj-KEY-REMOVED-FOR-SECURITY",
   ```
3. **💾 Save** the file
4. Your API key is now **only** in Script Properties (secure), not in your source code

#### Verify Configuration

1. Go to **🔧 LLM Configuration** → **2. Load & Verify Active Config**
   - Shows which LLM is active
   - Displays endpoint (but not the full API key)

2. Go to **🔧 LLM Configuration** → **3. Test LLM Connection**
   - Sends test prompt to LLM
   - Verifies API connection works
   - Should return "SUCCESS"

### Step 8: Configure Assignment Questions

Open the **AssignmentConfig** sheet and fill in:

| Column | Content |
|--------|---------|
| **Question #** | 1, 2, 3... (sequential) |
| **Question Text** | Full text of the question you asked students |
| **Teacher Solution** | Your expected/reference solution |
| **Notes/Rubric** | Grading criteria, common mistakes, hints for LLM |

**Example**:
| Question # | Question Text | Teacher Solution | Notes/Rubric |
|------------|---------------|------------------|--------------|
| 1 | Write a program to calculate factorial | `int factorial(int n) { if (n <= 1) return 1; return n * factorial(n-1); }` | Must use recursion. Check base case. Award partial credit for iterative solution. |

### Step 9: Test LLM Interrogation

Now test the LLM feedback generation on a single row:

1. In your **Form Responses sheet**, click on any row with student data (row 2 or later)
2. Go to **🎓 Classroom Feedback** → **🔄 LLM Interrogation** → **✅ Do Active Row**
3. Watch the Status column update:
   - "LLM Processing" → "LLM Complete"
4. Check the **Raw LLM Response** column - you should see generated feedback
5. Check the **Score** column - extracted numeric score (if found)
6. Check the **Debug Log** column for execution details

**What happens**:
- System reads student answers from the row
- Sends them to LLM with your assignment config as context
- LLM generates Hebrew feedback with grading
- Feedback is stored in spreadsheet columns

### Step 10: Create Feedback Assignment in Classroom

Now create a second assignment for delivering feedback:

1. In **Google Classroom**, create a new **Assignment**
2. Title it (e.g., "Quiz 1 Feedback")
3. Click **Add** → **Google Drive** → **📄 Docs**
4. Create a new Google Doc (or select a template)
5. ⚠️ **CRITICAL**: In the attachment options, select **"Make a copy for each student"**
   - This creates individual feedback documents for each student
   - Each student gets their own editable copy
6. **Assign** to all students who submitted the quiz
7. Note the **Assignment ID** from the URL:
   - URL format: `https://classroom.google.com/c/COURSE_ID/a/ASSIGNMENT_ID`
   - Copy just the `ASSIGNMENT_ID` portion
8. Paste this ID into **Settings sheet, cell A3**

### Step 11: Test Feedback Delivery

Test delivering LLM-generated feedback to a student's document:

1. Make sure you have at least one row with **"LLM Complete"** status
2. Click on that row in your spreadsheet
3. Go to **🎓 Classroom Feedback** → **📤 Deliver to Classroom** → **Deliver Active Row to Classroom**
4. Confirm the delivery prompt
5. System will:
   - Look up the student's ID from their email
   - Find their feedback document in Classroom
   - Write the formatted feedback with proper RTL Hebrew formatting
   - Update status to **"Complete"**

6. Verify in Classroom:
   - Open the feedback assignment
   - Check the student's document
   - Feedback should appear with proper formatting, headers, and RTL direction

---

## Production Workflow

Once everything is tested and working:

### Processing New Submissions

**Option A: Batch Process All**

1. **🔄 LLM Interrogation** → **✅✅ Do All Unprocessed**
   - Processes all rows without "LLM Complete" status
   - Adds 0.5s delay between requests to respect rate limits
   - Shows progress: processed count and errors

2. **📤 Deliver to Classroom** → **Deliver All to Classroom**
   - Delivers all rows with "LLM Complete" status
   - Each student receives feedback in their document
   - Shows completion statistics

**Option B: Process One at a Time**

1. Select a row with student data
2. **🔄 LLM Interrogation** → **✅ Do Active Row**
3. **📤 Deliver to Classroom** → **Deliver Active Row to Classroom**

### Monitoring

- **Debug Log** column: Shows execution details and errors for each row
- **Feedback Status** column: Tracks progress
  - Empty/Error → Ready for interrogation
  - "LLM Processing" → Currently querying LLM
  - "LLM Complete" → Ready for delivery
  - "Delivering" → Currently writing to doc
  - "Complete" → Fully processed and delivered
  - "LLM Error" / "Delivery Error" → Failed (check Debug Log)

---

## Column Structure Reference

### Form Response Columns (Configured)
- **Column A (1)**: Timestamp
- **Column B (2)**: Email Address
- **Column C (3)**: Score (extracted from LLM response)
- **Column D (4)**: (Usually empty or form metadata)
- **Column E+ (5+)**: Student answers (starting at `COL_FIRST_ANSWER`)

### System Columns (Auto-calculated)
- **Debug Log**: Execution logs and error messages
- **Feedback Status**: Current processing status
- **Raw LLM Response**: Full LLM-generated feedback text

---

## Troubleshooting

### "Student email not found in mapping"
→ Run **📚 Classroom Setup** → **Sync Student Mapping** → **Build Email Mapping**

### "No Google Doc found in submission"
→ Verify feedback assignment has **"Make a copy for each student"** enabled

### "Course not found" / "404 error"
→ Check Course ID in Settings sheet, verify you have teacher access

### "API returned status 401" / "403"
→ Check API key in LLM Configuration, verify key has credits/permissions

### "Wrong file type for student"
→ Student attached wrong file type. Feedback assignment must use Google Docs, not PDFs or other files

### Hebrew text displays incorrectly
→ The system uses Advanced Docs API for RTL. Ensure `appsscript.json` includes Docs API v1 in enabled services.

---

## LLM Configuration Details

The system supports multiple LLM providers. Configure them in `LLMConfig.js`:

### OpenAI GPT
```javascript
"gpt5mini": {
  "Name": "GPT-5-mini (Active)",
  "ApiEndpoint": "https://api.openai.com/v1/chat/completions",
  "Key": "sk-proj-...",
  "Active": true,
  "AdditionalConfig": {
    "model": "gpt-5-mini",
    "max_completion_tokens": 14000,
    "reasoning_effort": "low"
  }
}
```

### Anthropic Claude
```javascript
"claude": {
  "Name": "Claude Sonnet",
  "ApiEndpoint": "https://api.anthropic.com/v1/messages",
  "Key": "sk-ant-...",
  "Active": false,
  "AdditionalConfig": {
    "model": "claude-sonnet-4-5-20250929",
    "max_tokens": 2400,
    "anthropic-version": "2023-06-01"
  }
}
```

### Groq
```javascript
"groq": {
  "Name": "Groq-llama3-70b",
  "ApiEndpoint": "https://api.groq.com/openai/v1/chat/completions",
  "Key": "gsk-...",
  "Active": false,
  "AdditionalConfig": {
    "model": "llama3-70b-8192",
    "max_tokens": 1800,
    "temperature": 0.3
  }
}
```

**Only one LLM should have `"Active": true` at a time.**

---

## Prompt Customization

The feedback prompt is built in `LLMConfig.js` → `buildFeedbackPrompt()`. 

Default prompt structure:
1. Role definition (coding instructor)
2. Assignment questions and expected solutions
3. Grading notes
4. Student submissions
5. Output format instructions (Hebrew, Markdown, RTL)
6. Grading rubric template

Customize the Hebrew instructions or rubric structure by editing this function.

---

## Security Best Practices

✅ **DO**:
- Store API keys in Script Properties (server-side)
- Remove keys from source code after saving to properties
- Use `.clasp.json` in `.gitignore` (contains script ID)
- Review generated feedback before batch delivery

❌ **DON'T**:
- Commit API keys to Git repositories
- Share Script Properties access with untrusted users
- Leave API keys in source code

---

## Credits

Created for educators using Google Classroom for automated feedback delivery.

Supports Hebrew RTL formatting with native Google Docs API integration.

Actual Google Sheets doc containing the scripts - distributed to teachers per request (drop me a whatsapp at [+972586444461](https://wa.me/972586444461)).



