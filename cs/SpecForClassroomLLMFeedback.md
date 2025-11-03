# Google Classroom LLM Feedback Automation - Implementation Spec

## Overview
Automated workflow that: 
1. Receives student code submissions via Google Form
2. Sends code to LLM for analysis
3. Injects LLM feedback into student's Google Classroom assignment document

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────────┐
│                         STUDENT ACTIONS                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. Submit Code via Form        2. View Feedback in Classroom   │
│     (Google Form)                   (Feedback Assignment)        │
│           │                                    ▲                 │
│           │                                    │                 │
└───────────┼────────────────────────────────────┼─────────────────┘
            │                                    │
            ▼                                    │
┌─────────────────────────────────────────────────────────────────┐
│                      AUTOMATED PROCESSING                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Google Sheet ──▶ Apps Script ──▶ LLM API                      │
│  (Form Response)   (onFormSubmit)  (Get Feedback)              │
│                         │                │                       │
│                         ▼                ▼                       │
│                    Get Student ID   Format Response             │
│                         │                │                       │
│                         ▼                │                       │
│                Query Classroom API       │                       │
│              (Find Feedback Doc ID)      │                       │
│                         │                │                       │
│                         └────────┬───────┘                       │
│                                  ▼                               │
│                         Edit Google Doc                         │
│                     (Inject LLM Feedback)                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    GOOGLE CLASSROOM SETUP                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Assignment 1: Quiz/Code Challenge (optional - can be external) │
│  Assignment 2: Feedback Docs ★ "Make a copy for each student"  │
│                                                                  │
│  Course Roster → Email-to-StudentID Mapping (generated once)   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

**Key Points:**
- **Two Assignments**: Code submission (Form) ≠ Feedback delivery (Classroom)
- **Mapping**: Email (from Form) → Student ID → Feedback Doc ID (from Classroom)
- **One-Time Setup**: Generate Email→StudentID mapping from course roster
- **Runtime**: For each submission, query Classroom API for student's doc

---

## Quick Start Guide

**For Teachers - First Time Setup:**

1. **Create Configuration Sheets** (in the same workbook as Form responses)
   
   **a. Settings Sheet:**
   - Create sheet named "Settings"
   - A1: Paste Course ID from Classroom URL
   - A3: Paste Feedback Assignment ID
   - (A2 will be auto-filled by test connection)
   
   **b. AssignmentConfig Sheet:**
   - Create sheet named "AssignmentConfig"
   - Headers: Question #, Question Text, Teacher Solution, Notes/Rubric
   - Fill in your questions and expected solutions
   - Number of rows must match NUM_QUESTIONS constant
   
   **c. StudentMapping Sheet:**
   - Will be auto-created by "Sync Student Mapping" function

2. **Create Google Classroom Feedback Assignment**
   - Create a NEW assignment (separate from any quiz/form)
   - Use a blank Google Doc template
   - Set to "Make a copy for each student" ✓
   - This creates the feedback docs for LLM output
   - Students don't submit to this - it's just for receiving feedback
   - Copy Assignment ID from URL and paste into Settings sheet (A3)

3. **Create Google Form** (for code submissions)
   - Enable "Collect email addresses"
   - Add long-answer fields for each question (match NUM_QUESTIONS)
   - Link to Google Sheet
   - This can be attached to a different assignment or external

4. **Open Apps Script** (from the linked Google Sheet)
   - Extensions → Apps Script
   - Enable: Classroom API, Drive API (under Services)
   - Add OAuth scopes to `appsscript.json`
   - Set NUM_QUESTIONS and COL_FIRST_ANSWER constants

5. **Configure LLM** (via script menu)
   - Classroom Feedback → Configure LLMs
   - Add your LLM (OpenAI, Anthropic, etc.)
   - Enter API key securely

6. **Test Classroom Connection**
   - Classroom Feedback → Classroom Setup → Test Connection
   - Verifies Course ID and shows course info
   - Populates Settings sheet A2

7. **Sync Student Mapping**
   - Classroom Feedback → Classroom Setup → Sync Student Mapping
   - Creates StudentMapping sheet automatically
   - Fetches all students from Classroom

8. **Test Configuration**
   - Classroom Feedback → Test Configuration
   - Verify all settings are correct

9. **Enable Form Trigger**
   - Set up `onFormSubmit` trigger
   - Now ready to process submissions!

**Key Architecture:**
- **Settings Sheet** → Course ID, Assignment ID (manually entered)
- **AssignmentConfig Sheet** → Teacher's questions and solutions
- **StudentMapping Sheet** → Auto-synced from Classroom roster
- **Form** → Students submit code → Triggers script
- **Feedback Assignment** → Script writes LLM feedback → Students view in Classroom

---

## Configuration Constants

### Sheet Column Indices (1-based)
```javascript
// Form response columns
const COL_TIMESTAMP = 1;           // Form submission timestamp
const COL_EMAIL = 2;               // Student email (auto-collected by Form)

// Answer columns (configurable based on number of questions)
const COL_FIRST_ANSWER = 3;        // First answer column (adjust if needed)
const NUM_QUESTIONS = 4;           // Number of questions in the quiz (2-4 typical)

// System columns (placed after all answer columns)
// Calculated: COL_FIRST_ANSWER + NUM_QUESTIONS = start of system columns
const COL_DEBUG_LOG = COL_FIRST_ANSWER + NUM_QUESTIONS;      // Script execution log/errors
const COL_FEEDBACK_STATUS = COL_FIRST_ANSWER + NUM_QUESTIONS + 1;  // Status: "Processing", "Complete", "Error"
const COL_RAW_LLM_RESPONSE = COL_FIRST_ANSWER + NUM_QUESTIONS + 2; // Raw LLM output (backup if doc editing fails)

// Helper function to get answer columns
function getAnswerColumns() {
  const cols = [];
  for (let i = 0; i < NUM_QUESTIONS; i++) {
    cols.push(COL_FIRST_ANSWER + i);
  }
  return cols;
}
```

**Example Layout with 4 Questions:**
```
| A: Timestamp | B: Email | C: Q1 | D: Q2 | E: Q3 | F: Q4 | G: Debug | H: Status | I: Raw LLM |
```

### Teacher Configuration Sheet
**Sheet Name:** `"AssignmentConfig"` (in the same workbook)

**Layout:**
```
| A: Question # | B: Question Text                  | C: Teacher Solution        | D: Notes/Rubric |
|--------------|-----------------------------------|----------------------------|-----------------|
| 1            | Write a function to sort...       | [Teacher's solution code]  | Focus on...     |
| 2            | Debug this code snippet...        | [Fixed version]            | Common error... |
| 3            | Explain why this outputs...       | [Expected explanation]     | Key concept...  |
| 4            | Optimize the following...         | [Optimized solution]       | Mention O(n)... |
```

### Configuration Sheet Constants
```javascript
const CONFIG_SHEET_NAME = 'AssignmentConfig';
const CONFIG_COL_QUESTION_NUM = 1;
const CONFIG_COL_QUESTION_TEXT = 2;
const CONFIG_COL_SOLUTION = 3;
const CONFIG_COL_NOTES = 4;
```

---

## Helper Functions

### Base64 Course ID Decoding
```javascript
/**
 * Decodes a base64-encoded Classroom course ID from URL
 * Classroom URLs may contain base64-encoded IDs like "course/abc123"
 * This function extracts and decodes them to the numeric course ID
 * 
 * @param {string} courseIdInput - Course ID from URL (may be base64 or numeric)
 * @returns {string} Decoded numeric course ID
 */
function decodeCourseId(courseIdInput) {
  // If already numeric, return as-is
  if (/^\d+$/.test(courseIdInput)) {
    return courseIdInput;
  }
  
  // USER WILL PROVIDE: Base64 decoding function
  // This is a placeholder - actual implementation will be provided
  try {
    // Example: If URL has format like "d:course_abc123"
    // Extract and decode the base64 portion
    const decoded = Utilities.base64Decode(courseIdInput);
    const decodedString = Utilities.newBlob(decoded).getDataAsString();
    
    // Extract numeric ID from decoded string
    const match = decodedString.match(/\d+/);
    return match ? match[0] : courseIdInput;
  } catch (e) {
    // If decoding fails, return original (might already be numeric)
    return courseIdInput;
  }
}
```

### Settings Sheet Functions
```javascript
/**
 * Gets the course ID from Settings sheet
 * @returns {string} Course ID
 */
function getCourseId() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
  
  if (!settingsSheet) {
    throw new Error(`"${SETTINGS_SHEET_NAME}" sheet not found`);
  }
  
  const courseIdRaw = settingsSheet.getRange(SETTINGS_COURSE_ID_CELL).getValue();
  if (!courseIdRaw) {
    throw new Error('Course ID not set in Settings sheet (A1)');
  }
  
  return decodeCourseId(courseIdRaw.toString().trim());
}

/**
 * Gets the feedback assignment ID from Settings sheet
 * @returns {string} Assignment ID
 */
function getFeedbackAssignmentId() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
  
  if (!settingsSheet) {
    throw new Error(`"${SETTINGS_SHEET_NAME}" sheet not found`);
  }
  
  const assignmentId = settingsSheet.getRange(SETTINGS_FEEDBACK_ASSIGNMENT_ID_CELL).getValue();
  if (!assignmentId) {
    throw new Error('Feedback Assignment ID not set in Settings sheet (A3)');
  }
  
  return assignmentId.toString().trim();
}

/**
 * Sets course info in Settings sheet (called by test connection)
 * @param {string} courseInfo - Course information to display
 */
function setCourseInfo(courseInfo) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
  
  if (settingsSheet) {
    settingsSheet.getRange(SETTINGS_COURSE_INFO_CELL).setValue(courseInfo);
  }
}

/**
 * Test connection to Classroom and populate course info
 * This is the "sanity check" function
 */
function testClassroomConnection() {
  const ui = SpreadsheetApp.getUi();
  
  try {
    const courseId = getCourseId();
    
    // Try to fetch course info
    const course = Classroom.Courses.get(courseId);
    
    // Get student count
    const students = Classroom.Courses.Students.list(courseId).students || [];
    
    // Format course info
    const courseInfo = `${course.name} (${students.length} students)`;
    
    // Write to Settings sheet
    setCourseInfo(courseInfo);
    
    ui.alert(
      'Connection Successful',
      `Connected to course:\n\n${courseInfo}\n\nCourse ID: ${courseId}`,
      ui.ButtonSet.OK
    );
    
    return true;
    
  } catch (error) {
    setCourseInfo('ERROR: ' + error.toString());
    ui.alert(
      'Connection Failed',
      `Could not connect to Classroom:\n\n${error.toString()}\n\nPlease check:\n- Course ID in A1\n- Classroom API is enabled\n- You have teacher access`,
      ui.ButtonSet.OK
    );
    return false;
  }
}
```

### Student Mapping Sheet Functions
```javascript
/**
 * Gets student ID from email using StudentMapping sheet
 * @param {string} email - Student email address
 * @returns {string|null} Student ID or null if not found
 */
function getStudentIdFromEmail(email) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mappingSheet = ss.getSheetByName(STUDENT_MAPPING_SHEET_NAME);
  
  if (!mappingSheet) {
    throw new Error(`"${STUDENT_MAPPING_SHEET_NAME}" sheet not found`);
  }
  
  const lastRow = mappingSheet.getLastRow();
  if (lastRow < 2) {
    throw new Error('No student mappings found. Please run "Sync Student Mapping"');
  }
  
  // Get all data (assuming headers in row 1)
  const data = mappingSheet.getRange(2, 1, lastRow - 1, 2).getValues();
  
  // Find matching email
  for (let i = 0; i < data.length; i++) {
    const [rowEmail, studentId] = data[i];
    if (rowEmail && rowEmail.toString().toLowerCase() === email.toLowerCase()) {
      return studentId.toString();
    }
  }
  
  return null;
}

/**
 * Syncs student mapping from Classroom to StudentMapping sheet
 * Reads all enrolled students and populates Email → Student ID mapping
 */
function syncStudentMappingFromClassroom() {
  const ui = SpreadsheetApp.getUi();
  
  try {
    const courseId = getCourseId();
    
    // Get all students enrolled in the course
    const students = Classroom.Courses.Students.list(courseId).students || [];
    
    if (students.length === 0) {
      ui.alert('No Students', 'No students found in this course.', ui.ButtonSet.OK);
      return;
    }
    
    // Get or create StudentMapping sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let mappingSheet = ss.getSheetByName(STUDENT_MAPPING_SHEET_NAME);
    
    if (!mappingSheet) {
      mappingSheet = ss.insertSheet(STUDENT_MAPPING_SHEET_NAME);
    }
    
    // Clear existing data
    mappingSheet.clear();
    
    // Set headers
    mappingSheet.getRange(1, MAPPING_COL_EMAIL).setValue('Email');
    mappingSheet.getRange(1, MAPPING_COL_STUDENT_ID).setValue('Student ID');
    
    // Format headers
    mappingSheet.getRange(1, 1, 1, 2)
      .setFontWeight('bold')
      .setBackground('#4285f4')
      .setFontColor('#ffffff');
    
    // Populate data
    const mappingData = [];
    let errorCount = 0;
    
    students.forEach(student => {
      try {
        const profile = student.profile;
        const email = profile.emailAddress;
        const studentId = student.userId;
        
        if (email && studentId) {
          mappingData.push([email, studentId]);
        } else {
          errorCount++;
        }
      } catch (error) {
        errorCount++;
      }
    });
    
    // Write all data at once (faster than row-by-row)
    if (mappingData.length > 0) {
      mappingSheet.getRange(2, 1, mappingData.length, 2).setValues(mappingData);
    }
    
    // Auto-resize columns
    mappingSheet.autoResizeColumns(1, 2);
    
    // Show results
    let message = `Successfully synced ${mappingData.length} students from Classroom.`;
    if (errorCount > 0) {
      message += `\n\n${errorCount} students had missing data and were skipped.`;
    }
    
    Logger.log(`Student mapping synced: ${mappingData.length} students`);
    ui.alert('Sync Complete', message, ui.ButtonSet.OK);
    
  } catch (error) {
    ui.alert('Sync Failed', 'Failed to sync student mapping:\n\n' + error.toString(), ui.ButtonSet.OK);
  }
}

/**
 * Views current student mapping in a dialog
 */
function viewStudentMapping() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mappingSheet = ss.getSheetByName(STUDENT_MAPPING_SHEET_NAME);
  
  if (!mappingSheet) {
    ui.alert('Student Mapping', 'No mapping sheet found. Please run "Sync Student Mapping" first.', ui.ButtonSet.OK);
    return;
  }
  
  const lastRow = mappingSheet.getLastRow();
  if (lastRow < 2) {
    ui.alert('Student Mapping', 'No students in mapping. Please run "Sync Student Mapping".', ui.ButtonSet.OK);
    return;
  }
  
  const data = mappingSheet.getRange(2, 1, lastRow - 1, 2).getValues();
  
  let message = 'Current Student Mapping (Email → Student ID):\n\n';
  data.forEach(([email, studentId]) => {
    if (email) {
      message += `${email}\n  → ${studentId}\n\n`;
    }
  });
  
  ui.alert('Student Mapping', message, ui.ButtonSet.OK);
}
```

---

### Reading Teacher Questions and Solutions
```javascript
/**
 * Reads teacher's questions and solutions from the AssignmentConfig sheet
 * @returns {Array<Object>} Array of question objects
 * Example: [
 *   { num: 1, question: "Write a function...", solution: "def sort()...", notes: "Focus on..." },
 *   { num: 2, question: "Debug this...", solution: "fixed code", notes: "Common error..." }
 * ]
 */
function getTeacherQuestions() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
    
    if (!configSheet) {
      throw new Error(`Sheet "${CONFIG_SHEET_NAME}" not found. Please create it with question configurations.`);
    }
    
    // Get all data from config sheet (assuming headers in row 1)
    const lastRow = configSheet.getLastRow();
    if (lastRow < 2) {
      throw new Error(`No questions found in "${CONFIG_SHEET_NAME}" sheet`);
    }
    
    const data = configSheet.getRange(2, 1, lastRow - 1, 4).getValues();
    
    const questions = [];
    data.forEach(row => {
      const [num, question, solution, notes] = row;
      
      // Skip empty rows
      if (!question) return;
      
      questions.push({
        num: num || questions.length + 1,
        question: question.toString().trim(),
        solution: solution ? solution.toString().trim() : '',
        notes: notes ? notes.toString().trim() : ''
      });
    });
    
    if (questions.length === 0) {
      throw new Error('No valid questions found in config sheet');
    }
    
    return questions;
    
  } catch (error) {
    Logger.log('Error reading teacher questions: ' + error.toString());
    throw error;
  }
}

/**
 * Gets a specific question's configuration
 * @param {number} questionNum - The question number (1-based)
 * @returns {Object} Question object or null if not found
 */
function getQuestionConfig(questionNum) {
  const questions = getTeacherQuestions();
  return questions.find(q => q.num === questionNum) || null;
}

/**
 * Validates that the number of questions in config matches NUM_QUESTIONS constant
 * @returns {boolean} True if valid, throws error if not
 */
function validateQuestionConfig() {
  const questions = getTeacherQuestions();
  
  if (questions.length !== NUM_QUESTIONS) {
    throw new Error(
      `Configuration mismatch: NUM_QUESTIONS is ${NUM_QUESTIONS} but ` +
      `found ${questions.length} questions in ${CONFIG_SHEET_NAME} sheet`
    );
  }
  
  return true;
}
```

### Extracting Student Answers
```javascript
/**
 * Extracts all student answers from the form submission row
 * @param {Sheet} sheet - The active sheet
 * @param {number} row - The row number
 * @returns {Array<string>} Array of student answers
 */
function getStudentAnswers(sheet, row) {
  const answers = [];
  
  for (let i = 0; i < NUM_QUESTIONS; i++) {
    const col = COL_FIRST_ANSWER + i;
    const answer = sheet.getRange(row, col).getValue();
    answers.push(answer ? answer.toString().trim() : '');
  }
  
  return answers;
}

/**
 * Formats questions and answers for LLM prompt
 * @param {Array<Object>} questions - Teacher questions from config
 * @param {Array<string>} studentAnswers - Student's submitted answers
 * @returns {string} Formatted text for LLM
 */
function formatQuestionsForLLM(questions, studentAnswers) {
  let formatted = 'ASSIGNMENT QUESTIONS AND STUDENT ANSWERS:\n\n';
  
  questions.forEach((q, index) => {
    formatted += `=== QUESTION ${q.num} ===\n`;
    formatted += `${q.question}\n\n`;
    
    if (q.solution) {
      formatted += `EXPECTED SOLUTION:\n${q.solution}\n\n`;
    }
    
    if (q.notes) {
      formatted += `GRADING NOTES: ${q.notes}\n\n`;
    }
    
    formatted += `STUDENT'S ANSWER:\n${studentAnswers[index] || '[No answer provided]'}\n\n`;
    formatted += '---\n\n';
  });
  
  return formatted;
}
```

---

### Configuration Storage

**Configuration is split between Script Properties (API keys) and Sheets (mappings & settings):**

#### Script Properties (Secure - API Keys Only)

1. **`LLM_CONFIG`**: JSON string with LLM configurations
   ```json
   {
     "openai": {
       "name": "OpenAI GPT-4",
       "endpoint": "https://api.openai.com/v1/chat/completions",
       "model": "gpt-4",
       "active": true
     },
     "anthropic": {
       "name": "Anthropic Claude",
       "endpoint": "https://api.anthropic.com/v1/messages",
       "model": "claude-3-sonnet-20240229",
       "active": false
     }
   }
   ```

2. **`LLM_KEY_<keyName>`**: Separate properties for each LLM's API key
   - `LLM_KEY_openai` = "sk-..."
   - `LLM_KEY_anthropic` = "sk-ant-..."

#### Sheet: "Settings"

| Cell | Content | Example | Notes |
|------|---------|---------|-------|
| **A1** | Course ID | `123456789` | Paste from Classroom URL (base64 encoded ID will be decoded) |
| **A2** | Course Info | "CS101: Intro to Programming (25 students)" | Auto-filled by test connection function |
| **A3** | Feedback Assignment ID | `987654321` | The assignment with "Make a copy for each student" |

#### Sheet: "StudentMapping"

| Column A | Column B |
|----------|----------|
| **Email** | **Student ID** |
| student1@school.edu | 101303941676390353935 |
| student2@school.edu | 102445678901234567890 |
| student3@school.edu | 103556789012345678901 |

This sheet is auto-populated by `syncStudentMappingFromClassroom()` function.

### Property Name Constants
```javascript
// Script Properties (API keys only)
const PROP_LLM_CONFIG = 'LLM_CONFIG';
const PROP_LLM_KEY_PREFIX = 'LLM_KEY_';

// Sheet Names
const SETTINGS_SHEET_NAME = 'Settings';
const STUDENT_MAPPING_SHEET_NAME = 'StudentMapping';
const CONFIG_SHEET_NAME = 'AssignmentConfig';

// Settings Sheet Cell References
const SETTINGS_COURSE_ID_CELL = 'A1';
const SETTINGS_COURSE_INFO_CELL = 'A2';
const SETTINGS_FEEDBACK_ASSIGNMENT_ID_CELL = 'A3';

// StudentMapping Sheet Columns
const MAPPING_COL_EMAIL = 1;
const MAPPING_COL_STUDENT_ID = 2;

// AssignmentConfig Sheet Columns
const CONFIG_COL_QUESTION_NUM = 1;
const CONFIG_COL_QUESTION_TEXT = 2;
const CONFIG_COL_SOLUTION = 3;
const CONFIG_COL_NOTES = 4;
```

---

## Prerequisites & Setup

### 1. Google Classroom Feedback Assignment (CRITICAL)
**This is a SEPARATE assignment from the form/quiz:**
- Create a new assignment with a blank Google Doc as material
- Set to **"Make a copy for each student"** (this is the key setting!)
- This auto-generates a unique Google Doc for each enrolled student
- These docs are where LLM feedback will be written
- Students don't need to submit anything to this assignment - it's just for feedback delivery

### 2. Google Form (for Code Submission)
- Enable **"Collect email addresses"** setting (critical for student identification)
- Include long-answer question for code submission
- Link to Google Sheet for responses
- This can be linked to a different Classroom assignment, or external

### 3. Google Sheet
- Linked to Form as response destination
- Contains columns as defined in constants above
- Apps Script project attached to this sheet
- This is where the script runs from

### 4. Apps Script Services
Enable in Apps Script project:
- Google Classroom API
- Google Drive API (for document editing)

### 5. OAuth Scopes
Add to `appsscript.json`:
```json
{
  "oauthScopes": [
    "https://www.googleapis.com/auth/classroom.courses.readonly",
    "https://www.googleapis.com/auth/classroom.coursework.students",
    "https://www.googleapis.com/auth/classroom.rosters.readonly",
    "https://www.googleapis.com/auth/documents",
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets.currentonly",
    "https://www.googleapis.com/auth/script.storage"
  ]
}
```

**Scope Descriptions:**
- `classroom.courses.readonly`: Read course information
- `classroom.coursework.students`: Access student submissions and coursework
- `classroom.rosters.readonly`: Access student roster (for email → Student ID mapping)
- `documents`: Edit Google Docs (inject feedback)
- `drive`: Access Drive files
- `spreadsheets.currentonly`: Read form responses from the sheet
- `script.storage`: Store configuration in Script Properties

---

## Core Workflow - `onFormSubmit(e)` Trigger

### Step 1: Extract Form Data
```javascript
// Triggered when new form submission arrives
function onFormSubmit(e) {
  const row = e.range.getRow();
  const sheet = e.range.getSheet();
  
  // Update status
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Processing");
  sheet.getRange(row, COL_DEBUG_LOG).setValue("Started: " + new Date());
  
  try {
    // Validate configuration first
    validateQuestionConfig();
    
    // Get student email
    const studentEmail = sheet.getRange(row, COL_EMAIL).getValue();
    if (!studentEmail) {
      throw new Error("No email address in submission");
    }
    
    // Get all student answers
    const studentAnswers = getStudentAnswers(sheet, row);
    
    // Get teacher's questions and solutions
    const teacherQuestions = getTeacherQuestions();
    
    // Log what we're processing
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      `Processing ${NUM_QUESTIONS} questions for ${studentEmail}`
    );
    
  } catch (error) {
    sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      `Setup error: ${error.toString()}`
    );
    return;
  }
  
  // Continue to Step 2...
}
```

### Step 2: Look Up Student ID and Get Feedback Doc ID
```javascript
// Get Student ID from email using StudentMapping sheet
const studentId = getStudentIdFromEmail(studentEmail);

if (!studentId) {
  // Log error and exit
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
  sheet.getRange(row, COL_DEBUG_LOG).setValue(
    `Student email "${studentEmail}" not found in mapping. ` +
    `Please run "Sync Student Mapping" from menu.`
  );
  return;
}

// Get configuration from Settings sheet
const courseId = getCourseId();
const feedbackAssignmentId = getFeedbackAssignmentId();

// Query Classroom API for this student's submission on the feedback assignment
try {
  const submissions = Classroom.Courses.CourseWork.StudentSubmissions.list(
    courseId,
    feedbackAssignmentId,
    { userId: studentId }  // Filter by specific student
  ).studentSubmissions || [];
  
  if (submissions.length === 0) {
    sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      `No submission found for student ID: ${studentId}. ` +
      `Verify feedback assignment is distributed to all students.`
    );
    return;
  }
  
  // Get the Google Doc attachment from the submission
  const submission = submissions[0];
  const attachments = submission.assignmentSubmission?.attachments || [];
  const docAttachment = attachments.find(
    att => att.driveFile?.mimeType === 'application/vnd.google-apps.document'
  );
  
  if (!docAttachment) {
    sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      `No Google Doc found for ${studentEmail}. ` +
      `Verify feedback assignment has "Make a copy for each student" enabled.`
    );
    return;
  }
  
  const feedbackDocId = docAttachment.driveFile.id;
  
} catch (error) {
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
  sheet.getRange(row, COL_DEBUG_LOG).setValue("Classroom API error: " + error.toString());
  return;
}
```

### Step 3: Call LLM API
```javascript
// Load LLM configuration
const props = PropertiesService.getScriptProperties();
const llmConfig = JSON.parse(props.getProperty(PROP_LLM_CONFIG) || '{}');

// Find first active LLM
let activeLlm = null;
let activeLlmKey = null;

for (const keyName in llmConfig) {
  if (llmConfig[keyName].active === true) {
    activeLlm = llmConfig[keyName];
    activeLlmKey = keyName;
    break;
  }
}

if (!activeLlm) {
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
  sheet.getRange(row, COL_DEBUG_LOG).setValue("No active LLM configured");
  return;
}

// Get API key for the active LLM
const apiKey = props.getProperty(PROP_LLM_KEY_PREFIX + activeLlmKey);

if (!apiKey) {
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
  sheet.getRange(row, COL_DEBUG_LOG).setValue("API key not found for: " + activeLlmKey);
  return;
}

// Format questions and answers for LLM
const formattedContent = formatQuestionsForLLM(teacherQuestions, studentAnswers);

// Construct API request (format varies by LLM provider)
const systemPrompt = `You are a programming instructor providing detailed feedback on student code submissions. 
For each question, analyze the student's answer against the expected solution, identify strengths and weaknesses, 
and provide constructive feedback in well-formatted markdown. Be specific and educational.`;

const payload = {
  model: activeLlm.model,
  messages: [
    {
      role: "system",
      content: systemPrompt
    },
    {
      role: "user",
      content: formattedContent
    }
  ]
  // Add other parameters as needed for specific LLM
};

try {
  const response = UrlFetchApp.fetch(activeLlm.endpoint, {
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  });

  if (response.getResponseCode() !== 200) {
    sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      "LLM API error: " + response.getResponseCode() + " - " + response.getContentText()
    );
    return;
  }

  const llmResponse = JSON.parse(response.getContentText());
  
  // Extract feedback (adjust based on LLM response format)
  // For OpenAI: llmResponse.choices[0].message.content
  // For Anthropic: llmResponse.content[0].text
  const feedbackMarkdown = llmResponse.choices?.[0]?.message?.content 
                        || llmResponse.content?.[0]?.text
                        || "Error: Unable to parse LLM response";
  
  // IMPORTANT: Store raw LLM response as backup
  sheet.getRange(row, COL_RAW_LLM_RESPONSE).setValue(feedbackMarkdown);
  
  sheet.getRange(row, COL_DEBUG_LOG).setValue(
    sheet.getRange(row, COL_DEBUG_LOG).getValue() + 
    `\nLLM response received (${feedbackMarkdown.length} chars)`
  );
  
} catch (error) {
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
  sheet.getRange(row, COL_DEBUG_LOG).setValue(
    "LLM API exception: " + error.toString()
  );
  return;
}
```

### Step 4: Update Google Doc with Feedback
```javascript
// Open student's feedback document
try {
  const doc = DocumentApp.openById(feedbackDocId);
  const body = doc.getBody();

  // Clear existing content
  body.clear();

  // Insert LLM feedback (assumed to be well-formatted markdown)
  // Note: Google Docs doesn't render markdown directly, 
  // but we can insert it as plain text
  body.appendParagraph(feedbackMarkdown);

  doc.saveAndClose();
  
  sheet.getRange(row, COL_DEBUG_LOG).setValue(
    sheet.getRange(row, COL_DEBUG_LOG).getValue() + 
    `\nFeedback written to doc: ${feedbackDocId}`
  );
  
} catch (docError) {
  // Document editing failed, but we already have raw response saved in COL_RAW_LLM_RESPONSE!
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Partial");
  sheet.getRange(row, COL_DEBUG_LOG).setValue(
    sheet.getRange(row, COL_DEBUG_LOG).getValue() + 
    `\nDoc editing failed: ${docError.toString()}` +
    `\nRaw LLM response saved in column ${COL_RAW_LLM_RESPONSE}`
  );
  Logger.log(`Doc edit failed for ${studentEmail}, but raw response saved in sheet`);
  return; // Exit here with "Partial" status
}
```

### Step 5: Update Sheet Status (Success)
```javascript
// Only reached if doc editing succeeded
sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Complete");
sheet.getRange(row, COL_DEBUG_LOG).setValue(
  sheet.getRange(row, COL_DEBUG_LOG).getValue() + 
  `\nCompleted: ${new Date()}`
);
```

### Complete Integrated Workflow
```javascript
/**
 * Main trigger function - called when form is submitted
 */
function onFormSubmit(e) {
  const row = e.range.getRow();
  const sheet = e.range.getSheet();
  
  // Initialize status
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Processing");
  sheet.getRange(row, COL_DEBUG_LOG).setValue("Started: " + new Date());
  
  try {
    // Step 1: Extract and validate form data
    validateQuestionConfig();
    
    const studentEmail = sheet.getRange(row, COL_EMAIL).getValue();
    if (!studentEmail) {
      throw new Error("No email address in submission");
    }
    
    const studentAnswers = getStudentAnswers(sheet, row);
    const teacherQuestions = getTeacherQuestions();
    
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      `Processing ${NUM_QUESTIONS} questions for ${studentEmail}`
    );
    
    // Step 2: Get Student ID and Feedback Doc ID
    const studentId = getStudentIdFromEmail(studentEmail);
    
    if (!studentId) {
      throw new Error(`Student email "${studentEmail}" not found in StudentMapping sheet`);
    }
    
    const courseId = getCourseId();
    const feedbackAssignmentId = getFeedbackAssignmentId();
    
    const submissions = Classroom.Courses.CourseWork.StudentSubmissions.list(
      courseId,
      feedbackAssignmentId,
      { userId: studentId }
    ).studentSubmissions || [];
    
    if (submissions.length === 0) {
      throw new Error(`No submission found for student ID: ${studentId}`);
    }
    
    const submission = submissions[0];
    const attachments = submission.assignmentSubmission?.attachments || [];
    const docAttachment = attachments.find(
      att => att.driveFile?.mimeType === 'application/vnd.google-apps.document'
    );
    
    if (!docAttachment) {
      throw new Error(`No Google Doc found in submission for: ${studentEmail}`);
    }
    
    const feedbackDocId = docAttachment.driveFile.id;
    
    // Step 3: Call LLM API
    const props = PropertiesService.getScriptProperties();
    const llmConfig = JSON.parse(props.getProperty(PROP_LLM_CONFIG) || '{}');
    let activeLlm = null;
    let activeLlmKey = null;
    
    for (const keyName in llmConfig) {
      if (llmConfig[keyName].active === true) {
        activeLlm = llmConfig[keyName];
        activeLlmKey = keyName;
        break;
      }
    }
    
    if (!activeLlm) {
      throw new Error("No active LLM configured");
    }
    
    const apiKey = props.getProperty(PROP_LLM_KEY_PREFIX + activeLlmKey);
    if (!apiKey) {
      throw new Error(`API key not found for: ${activeLlmKey}`);
    }
    
    const formattedContent = formatQuestionsForLLM(teacherQuestions, studentAnswers);
    const systemPrompt = `You are a programming instructor providing detailed feedback on student code submissions. 
For each question, analyze the student's answer against the expected solution, identify strengths and weaknesses, 
and provide constructive feedback in well-formatted markdown. Be specific and educational.`;
    
    const payload = {
      model: activeLlm.model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: formattedContent }
      ]
    };
    
    const response = UrlFetchApp.fetch(activeLlm.endpoint, {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    
    if (response.getResponseCode() !== 200) {
      throw new Error(`LLM API error: ${response.getResponseCode()} - ${response.getContentText()}`);
    }
    
    const llmResponse = JSON.parse(response.getContentText());
    const feedbackMarkdown = llmResponse.choices?.[0]?.message?.content 
                          || llmResponse.content?.[0]?.text
                          || "Error: Unable to parse LLM response";
    
    // CRITICAL: Save raw response FIRST (before doc editing that might fail)
    sheet.getRange(row, COL_RAW_LLM_RESPONSE).setValue(feedbackMarkdown);
    
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      `LLM response received (${feedbackMarkdown.length} chars)\n` +
      `Using: ${activeLlm.name}`
    );
    
    // Step 4: Update Google Doc (might fail, but we have backup)
    try {
      const doc = DocumentApp.openById(feedbackDocId);
      const body = doc.getBody();
      body.clear();
      body.appendParagraph(feedbackMarkdown);
      doc.saveAndClose();
      
      // Step 5: Complete Success
      sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Complete");
      sheet.getRange(row, COL_DEBUG_LOG).setValue(
        sheet.getRange(row, COL_DEBUG_LOG).getValue() + 
        `\nFeedback written to doc: ${feedbackDocId}` +
        `\nCompleted: ${new Date()}`
      );
      
    } catch (docError) {
      // Partial success: LLM worked, doc editing failed
      sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Partial");
      sheet.getRange(row, COL_DEBUG_LOG).setValue(
        sheet.getRange(row, COL_DEBUG_LOG).getValue() + 
        `\n⚠️ Doc editing failed: ${docError.toString()}` +
        `\n✓ Raw LLM response saved in column ${COL_RAW_LLM_RESPONSE}`
      );
      Logger.log(`Partial success for row ${row}: LLM response saved but doc editing failed`);
    }
    
  } catch (error) {
    // Complete failure
    sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
    sheet.getRange(row, COL_DEBUG_LOG).setValue(
      `ERROR at ${new Date()}: ${error.toString()}\n` +
      `Stack: ${error.stack || 'N/A'}`
    );
    Logger.log(`Error processing submission row ${row}: ${error.toString()}`);
  }
}
```

---

## Configuration UI

### Main Menu
```javascript
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Classroom Feedback')
    .addItem('⚙️ Configure LLMs', 'showLLMConfigMenu')
    .addSeparator()
    .addSubMenu(ui.createMenu('📚 Classroom Setup')
      .addItem('Test Connection', 'testClassroomConnection')
      .addItem('Sync Student Mapping', 'syncStudentMappingFromClassroom')
      .addItem('View Student Mapping', 'viewStudentMapping'))
    .addSeparator()
    .addItem('🧪 Test Configuration', 'testConfiguration')
    .addToUi();
}

/**
 * Test all configuration settings
 */
function testConfiguration() {
  const ui = SpreadsheetApp.getUi();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  let results = '=== Configuration Test ===\n\n';
  let allGood = true;
  
  // Test Settings Sheet
  const settingsSheet = ss.getSheetByName(SETTINGS_SHEET_NAME);
  if (settingsSheet) {
    try {
      const courseId = getCourseId();
      const feedbackAssignmentId = getFeedbackAssignmentId();
      results += `✓ Settings sheet found\n`;
      results += `  Course ID: ${courseId}\n`;
      results += `  Feedback Assignment ID: ${feedbackAssignmentId}\n`;
    } catch (error) {
      results += `❌ Settings sheet error: ${error.toString()}\n`;
      allGood = false;
    }
  } else {
    results += `❌ "${SETTINGS_SHEET_NAME}" sheet not found\n`;
    allGood = false;
  }
  results += '\n';
  
  // Test StudentMapping Sheet
  const mappingSheet = ss.getSheetByName(STUDENT_MAPPING_SHEET_NAME);
  if (mappingSheet) {
    const lastRow = mappingSheet.getLastRow();
    const studentCount = lastRow > 1 ? lastRow - 1 : 0;
    if (studentCount > 0) {
      results += `✓ ${STUDENT_MAPPING_SHEET_NAME} sheet: ${studentCount} students\n`;
    } else {
      results += `❌ ${STUDENT_MAPPING_SHEET_NAME} sheet is empty\n`;
      allGood = false;
    }
  } else {
    results += `❌ "${STUDENT_MAPPING_SHEET_NAME}" sheet not found\n`;
    allGood = false;
  }
  results += '\n';
  
  // Test Assignment Config Sheet
  const configSheet = ss.getSheetByName(CONFIG_SHEET_NAME);
  if (configSheet) {
    try {
      const questions = getTeacherQuestions();
      results += `✓ ${CONFIG_SHEET_NAME} sheet found: ${questions.length} questions\n`;
      
      if (questions.length === NUM_QUESTIONS) {
        results += `✓ Question count matches NUM_QUESTIONS (${NUM_QUESTIONS})\n`;
      } else {
        results += `❌ Question count mismatch: Expected ${NUM_QUESTIONS}, found ${questions.length}\n`;
        allGood = false;
      }
    } catch (error) {
      results += `❌ Error reading ${CONFIG_SHEET_NAME}: ${error.toString()}\n`;
      allGood = false;
    }
  } else {
    results += `❌ ${CONFIG_SHEET_NAME} sheet not found\n`;
    allGood = false;
  }
  results += '\n';
  
  // Test LLM Config
  const props = PropertiesService.getScriptProperties();
  const llmConfig = JSON.parse(props.getProperty(PROP_LLM_CONFIG) || '{}');
  if (Object.keys(llmConfig).length === 0) {
    results += '❌ No LLMs configured\n';
    allGood = false;
  } else {
    let hasActive = false;
    Object.keys(llmConfig).forEach(key => {
      if (llmConfig[key].active) {
        hasActive = true;
        const hasKey = !!props.getProperty(PROP_LLM_KEY_PREFIX + key);
        results += `✓ Active LLM: ${llmConfig[key].name}\n`;
        results += `  ${hasKey ? '✓' : '❌'} API Key: ${hasKey ? 'Set' : 'Missing'}\n`;
        if (!hasKey) allGood = false;
      }
    });
    if (!hasActive) {
      results += '❌ No active LLM\n';
      allGood = false;
    }
  }
  results += '\n';
  
  // Test Sheet Structure
  const sheet = SpreadsheetApp.getActiveSheet();
  const numCols = COL_FIRST_ANSWER + NUM_QUESTIONS + 2;
  const headers = sheet.getRange(1, 1, 1, numCols).getValues()[0];
  
  results += 'Form Response Sheet Column Check:\n';
  results += `  ${headers[0] ? '✓' : '❌'} Col ${COL_TIMESTAMP}: ${headers[0] || 'Missing'}\n`;
  results += `  ${headers[1] ? '✓' : '❌'} Col ${COL_EMAIL}: ${headers[1] || 'Missing'}\n`;
  
  for (let i = 0; i < NUM_QUESTIONS; i++) {
    const col = COL_FIRST_ANSWER + i;
    results += `  ${headers[col - 1] ? '✓' : '❌'} Col ${col}: ${headers[col - 1] || 'Missing'}\n`;
  }
  
  results += `  Expected Debug Log Col: ${COL_DEBUG_LOG}\n`;
  results += `  Expected Status Col: ${COL_FEEDBACK_STATUS}\n`;
  results += `  Expected Raw LLM Col: ${COL_RAW_LLM_RESPONSE}\n`;
  results += '\n';
  
  if (allGood) {
    results += '🎉 All configurations valid! Ready to process submissions.\n';
  } else {
    results += '⚠️ Please fix the issues above before processing submissions.\n';
  }
  
  ui.alert('Configuration Test', results, ui.ButtonSet.OK);
}
```

### LLM Configuration UI
```javascript
function showLLMConfigMenu() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('LLM Configuration')
    .addItem('Add/Edit LLM', 'configureLLM')
    .addItem('Set Active LLM', 'setActiveLLM')
    .addItem('View Current Config', 'viewLLMConfig')
    .addToUi();
}

/**
 * Add or edit an LLM configuration
 */
function configureLLM() {
  const ui = SpreadsheetApp.getUi();
  
  // Get key name (identifier for this LLM)
  const keyNameResponse = ui.prompt(
    'LLM Configuration',
    'Enter a unique key name (e.g., "openai", "anthropic", "custom"):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (keyNameResponse.getSelectedButton() !== ui.Button.OK) return;
  const keyName = keyNameResponse.getResponseText().trim().toLowerCase();
  
  if (!keyName) {
    ui.alert('Error', 'Key name cannot be empty', ui.ButtonSet.OK);
    return;
  }
  
  // Get display name
  const nameResponse = ui.prompt(
    'LLM Configuration',
    'Enter display name (e.g., "OpenAI GPT-4"):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (nameResponse.getSelectedButton() !== ui.Button.OK) return;
  
  // Get endpoint URL
  const endpointResponse = ui.prompt(
    'LLM Configuration',
    'Enter API endpoint URL:',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (endpointResponse.getSelectedButton() !== ui.Button.OK) return;
  
  // Get model name
  const modelResponse = ui.prompt(
    'LLM Configuration',
    'Enter model name (e.g., "gpt-4", "claude-3-sonnet-20240229"):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (modelResponse.getSelectedButton() !== ui.Button.OK) return;
  
  // Get API key
  const apiKeyResponse = ui.prompt(
    'LLM Configuration',
    'Enter API key (will be stored securely):',
    ui.ButtonSet.OK_CANCEL
  );
  
  if (apiKeyResponse.getSelectedButton() !== ui.Button.OK) return;
  
  // Save configuration
  const props = PropertiesService.getScriptProperties();
  const llmConfig = JSON.parse(props.getProperty(PROP_LLM_CONFIG) || '{}');
  
  llmConfig[keyName] = {
    name: nameResponse.getResponseText(),
    endpoint: endpointResponse.getResponseText(),
    model: modelResponse.getResponseText(),
    active: Object.keys(llmConfig).length === 0 // First LLM is active by default
  };
  
  props.setProperty(PROP_LLM_CONFIG, JSON.stringify(llmConfig));
  props.setProperty(PROP_LLM_KEY_PREFIX + keyName, apiKeyResponse.getResponseText());
  
  ui.alert('Success', `LLM "${keyName}" configured successfully!`, ui.ButtonSet.OK);
}

/**
 * Set which LLM is active
 */
function setActiveLLM() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  const llmConfig = JSON.parse(props.getProperty(PROP_LLM_CONFIG) || '{}');
  
  if (Object.keys(llmConfig).length === 0) {
    ui.alert('Error', 'No LLMs configured. Please add an LLM first.', ui.ButtonSet.OK);
    return;
  }
  
  // Build list of LLMs
  const llmList = Object.keys(llmConfig)
    .map(key => `${key}: ${llmConfig[key].name} ${llmConfig[key].active ? '(ACTIVE)' : ''}`)
    .join('\n');
  
  const response = ui.prompt(
    'Set Active LLM',
    `Current LLMs:\n${llmList}\n\nEnter the key name to activate:`,
    ui.ButtonSet.OK_CANCEL
  );
  
  if (response.getSelectedButton() !== ui.Button.OK) return;
  
  const selectedKey = response.getResponseText().trim().toLowerCase();
  
  if (!llmConfig[selectedKey]) {
    ui.alert('Error', `LLM "${selectedKey}" not found`, ui.ButtonSet.OK);
    return;
  }
  
  // Deactivate all, activate selected
  Object.keys(llmConfig).forEach(key => {
    llmConfig[key].active = (key === selectedKey);
  });
  
  props.setProperty(PROP_LLM_CONFIG, JSON.stringify(llmConfig));
  ui.alert('Success', `"${selectedKey}" is now active`, ui.ButtonSet.OK);
}

/**
 * View current LLM configuration (without showing API keys)
 */
function viewLLMConfig() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  const llmConfig = JSON.parse(props.getProperty(PROP_LLM_CONFIG) || '{}');
  
  if (Object.keys(llmConfig).length === 0) {
    ui.alert('Configuration', 'No LLMs configured', ui.ButtonSet.OK);
    return;
  }
  
  let configText = 'Current LLM Configuration:\n\n';
  Object.keys(llmConfig).forEach(key => {
    const llm = llmConfig[key];
    configText += `${llm.active ? '✓ ' : '  '}${key}:\n`;
    configText += `  Name: ${llm.name}\n`;
    configText += `  Model: ${llm.model}\n`;
    configText += `  Endpoint: ${llm.endpoint}\n`;
    configText += `  API Key: ${props.getProperty(PROP_LLM_KEY_PREFIX + key) ? 'Set ✓' : 'Not set ✗'}\n\n`;
  });
  
  ui.alert('LLM Configuration', configText, ui.ButtonSet.OK);
}
```

### Course & Assignment Selection UI
```javascript
function showAssignmentPicker() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  
  // First, get/set course ID
  let courseId = props.getProperty(PROP_COURSE_ID);
  
  if (!courseId) {
    const courseResponse = ui.prompt(
      'Course Selection',
      'Enter your Google Classroom Course ID:',
      ui.ButtonSet.OK_CANCEL
    );
    
    if (courseResponse.getSelectedButton() !== ui.Button.OK) return;
    courseId = courseResponse.getResponseText().trim();
    props.setProperty(PROP_COURSE_ID, courseId);
  }
  
  try {
    // Fetch all assignments for the course
    const assignments = Classroom.Courses.CourseWork.list(courseId).courseWork || [];
    
    if (assignments.length === 0) {
      ui.alert('No Assignments', 'No assignments found in this course.', ui.ButtonSet.OK);
      return;
    }
    
    // Create HTML dropdown
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <base target="_top">
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .warning { background: #fff3cd; padding: 10px; margin: 10px 0; border-left: 4px solid #ffc107; }
            select { width: 100%; padding: 8px; margin: 10px 0; }
            button { background: #4285f4; color: white; padding: 10px 20px; border: none; cursor: pointer; }
            button:hover { background: #357ae8; }
          </style>
        </head>
        <body>
          <h3>Select Feedback Assignment</h3>
          <div class="warning">
            <strong>⚠️ Important:</strong> Select the assignment that has "Make a copy for each student" enabled.
            This is where LLM feedback will be written, NOT the quiz/form assignment.
          </div>
          <select id="assignmentSelect">
            ${assignments.map(a => `<option value="${a.id}">${a.title}</option>`).join('')}
          </select>
          <br><br>
          <button onclick="saveAssignment()">Set Feedback Assignment</button>
          <script>
            function saveAssignment() {
              const assignmentId = document.getElementById('assignmentSelect').value;
              google.script.run
                .withSuccessHandler(() => {
                  alert('Feedback assignment set successfully!');
                  google.script.host.close();
                })
                .setFeedbackAssignment(assignmentId);
            }
          </script>
        </body>
      </html>
    `;
    
    const htmlOutput = HtmlService.createHtmlOutput(html)
      .setWidth(550)
      .setHeight(350);
    
    ui.showModalDialog(htmlOutput, 'Select Feedback Assignment');
    
  } catch (error) {
    ui.alert('Error', 'Failed to fetch assignments: ' + error.toString(), ui.ButtonSet.OK);
  }
}

function setFeedbackAssignment(assignmentId) {
  PropertiesService.getScriptProperties().setProperty(PROP_FEEDBACK_ASSIGNMENT_ID, assignmentId);
}
```

---

## API Verification & Limitations

### ✅ Verified Capabilities

1. **Classroom API - List Course Students**:
   ```javascript
   Classroom.Courses.Students.list(courseId)
   ```
   Returns enrolled students with email addresses and Student IDs (userId)

2. **Classroom API - Get Student's Submission**:
   ```javascript
   Classroom.Courses.CourseWork.StudentSubmissions.list(
     courseId, 
     feedbackAssignmentId,
     { userId: studentId }
   )
   ```
   Returns specific student's submission with attached documents

3. **Document Editing**:
   ```javascript
   DocumentApp.openById(fileId)  // Open doc
   body.clear()                   // Clear content
   body.appendParagraph(text)    // Add new content
   ```

4. **Assignment Listing**:
   ```javascript
   Classroom.Courses.CourseWork.list(courseId)
   ```
   Returns all assignments in course for dropdown selection

### ⚠️ Known Limitations

1. **Markdown Rendering**: Google Docs doesn't natively render markdown. Feedback will appear as plain text unless you parse and format it programmatically.

2. **User Permissions**: Script must run as a user with:
   - Teacher access to the Classroom course
   - Edit permissions on student feedback documents

3. **Form Email Collection**: Requires users to be signed in to their Google account and "Collect email addresses" enabled

4. **"Make a copy for each student"**: 
   - The attachment appears in the submission with type `application/vnd.google-apps.document`
   - Includes the Drive file ID that can be accessed for editing
   - Documents are owned by students but teacher has edit access

5. **Two Assignment Pattern**: 
   - Form submission is separate from feedback delivery
   - Mapping connects form email → Student ID → Feedback doc
   - Requires careful setup to connect the two workflows

---

## Generating Student Mapping

### One-Time Setup Function
```javascript
function generateStudentMapping() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  
  const courseId = props.getProperty(PROP_COURSE_ID);
  
  if (!courseId) {
    ui.alert('Error', 'Please configure Course first', ui.ButtonSet.OK);
    return;
  }
  
  try {
    // Get all students enrolled in the course
    const students = Classroom.Courses.Students.list(courseId).students || [];
    
    if (students.length === 0) {
      ui.alert('No Students', 'No students found in this course.', ui.ButtonSet.OK);
      return;
    }
    
    const mapping = {};
    let successCount = 0;
    let errors = [];
    
    students.forEach(student => {
      try {
        // Get student profile to get email
        const profile = student.profile;
        const studentEmail = profile.emailAddress;
        const studentId = student.userId;  // This is the Classroom user ID we need
        
        if (studentEmail && studentId) {
          mapping[studentEmail] = studentId;
          successCount++;
        } else {
          errors.push(`Student missing email or ID: ${profile.name?.fullName}`);
        }
      } catch (error) {
        errors.push(`Error processing student: ${error.toString()}`);
      }
    });
    
    // Save to Script Properties
    props.setProperty(PROP_STUDENT_MAPPING, JSON.stringify(mapping));
    
    // Show results
    let message = `Successfully mapped ${successCount} students.\n\n`;
    if (errors.length > 0) {
      message += `Errors:\n${errors.join('\n')}`;
    }
    
    Logger.log('Student Mapping (Email → Student ID):', JSON.stringify(mapping, null, 2));
    ui.alert('Mapping Complete', message, ui.ButtonSet.OK);
    
  } catch (error) {
    ui.alert('Error', 'Failed to generate mapping: ' + error.toString(), ui.ButtonSet.OK);
  }
}

/**
 * View current student mapping
 */
function viewStudentMapping() {
  const ui = SpreadsheetApp.getUi();
  const props = PropertiesService.getScriptProperties();
  const mapping = JSON.parse(props.getProperty(PROP_STUDENT_MAPPING) || '{}');
  
  if (Object.keys(mapping).length === 0) {
    ui.alert('Student Mapping', 'No student mapping found. Please generate it first.', ui.ButtonSet.OK);
    return;
  }
  
  let message = 'Current Student Mapping (Email → Student ID):\n\n';
  Object.keys(mapping).forEach(email => {
    message += `${email}\n  → ${mapping[email]}\n\n`;
  });
  
  ui.alert('Student Mapping', message, ui.ButtonSet.OK);
}
```

### API Notes

**This approach uses `Classroom.Courses.Students.list()`** which:
- Returns all enrolled students in the course
- Includes student profile with email address
- Includes `userId` (the Classroom Student ID)
- Requires `classroom.rosters.readonly` scope

**Alternative if scope unavailable:**
Manually create mapping from course roster:
```javascript
const mapping = {
  "student1@school.edu": "101303941676390353935",
  "student2@school.edu": "102445678901234567890"
};
PropertiesService.getScriptProperties()
  .setProperty(PROP_STUDENT_MAPPING, JSON.stringify(mapping));
```

To get Student IDs manually:
1. Go to Google Classroom course
2. Click on "People" tab
3. Use browser dev tools to inspect student elements - Student IDs are in the HTML attributes

---

## Error Handling

### Common Issues & Solutions

| Issue | Detection | Solution |
|-------|-----------|----------|
| Student email not in mapping | `studentId === undefined` | Log error in DEBUG_LOG, verify student is enrolled in course, regenerate mapping |
| No submission found for student | Empty submissions array | Student may not have the feedback assignment yet, check assignment is distributed to all |
| No Google Doc in submission | `docAttachment === undefined` | Verify feedback assignment has "Make a copy for each student" enabled |
| LLM API failure | HTTP error from `UrlFetchApp.fetch()` | Retry once, log error, check API key and endpoint, mark status as "Error" |
| Document permission denied | Exception from `DocumentApp.openById()` | Log error, verify script runs as teacher with edit access to student docs |
| Invalid API response | JSON parse error | Log raw response, set status to "Error" |
| Course/Assignment not configured | Property is null/empty | Direct user to run configuration via menu |

### Logging Template
```javascript
try {
  // Main workflow
} catch (error) {
  sheet.getRange(row, COL_FEEDBACK_STATUS).setValue("Error");
  sheet.getRange(row, COL_DEBUG_LOG).setValue(
    `ERROR at ${new Date()}: ${error.toString()}\nStack: ${error.stack}`
  );
  
  // Log to Apps Script execution log as well
  Logger.log(`Form submission error for row ${row}: ${error.toString()}`);
}
```

### Detailed Error Messages
```javascript
// Student not found in mapping
if (!studentId) {
  const errorMsg = `Student email "${studentEmail}" not found in mapping. ` +
                   `Please verify student is enrolled and regenerate mapping.`;
  sheet.getRange(row, COL_DEBUG_LOG).setValue(errorMsg);
  return;
}

// No submission found
if (submissions.length === 0) {
  const errorMsg = `No submission found for student ID ${studentId}. ` +
                   `Verify feedback assignment is distributed to this student.`;
  sheet.getRange(row, COL_DEBUG_LOG).setValue(errorMsg);
  return;
}

// No document attached
if (!docAttachment) {
  const errorMsg = `No Google Doc found in submission for ${studentEmail}. ` +
                   `Verify feedback assignment has "Make a copy for each student" enabled.`;
  sheet.getRange(row, COL_DEBUG_LOG).setValue(errorMsg);
  return;
}
```

---

## Testing Checklist

- [ ] Form collects email addresses correctly
- [ ] StudentMapping.json has all enrolled students
- [ ] LLMSettings.json is valid and endpoint is accessible
- [ ] Script has Classroom API and Drive API enabled
- [ ] Test with one submission before enabling for class
- [ ] Verify feedback appears in student's Google Doc
- [ ] Check error logging in DEBUG_LOG column
- [ ] Confirm script runs under teacher's credentials

---

## Security & Best Practices

### Why Script Properties for API Keys?
1. **Never in Code**: API keys never appear in the script source code
2. **Not in Version Control**: Properties don't get committed to repositories
3. **Encrypted at Rest**: Google encrypts Script Properties
4. **User-Specific**: Each teacher sets their own keys
5. **Easy Rotation**: Update keys via UI without code changes

### Configuration Backup
Teachers should document their configuration (without API keys):
```javascript
function exportConfigurationTemplate() {
  const props = PropertiesService.getScriptProperties();
  const llmConfig = JSON.parse(props.getProperty(PROP_LLM_CONFIG) || '{}');
  
  // Remove sensitive data
  const template = {};
  Object.keys(llmConfig).forEach(key => {
    template[key] = {
      name: llmConfig[key].name,
      endpoint: llmConfig[key].endpoint,
      model: llmConfig[key].model,
      active: llmConfig[key].active,
      apiKey: '[SET VIA UI]'
    };
  });
  
  Logger.log(JSON.stringify(template, null, 2));
  return template;
}
```

### Multi-LLM Strategy
The system supports multiple LLMs for resilience:
- **Primary**: Main LLM for everyday use
- **Backup**: Fallback if primary has issues or rate limits
- **Testing**: Development/testing without using production quota

To switch LLMs: Use "Set Active LLM" menu item (no code changes needed)

---

## Future Enhancements (Out of Scope)

- Markdown-to-Google-Docs formatting conversion
- Batch processing of multiple submissions
- Grade passback to Classroom gradebook
- Custom rubric integration
- Multi-LLM fallback logic (automatic retry with backup LLM)
- Feedback templates per assignment type
- Student notification via Classroom API