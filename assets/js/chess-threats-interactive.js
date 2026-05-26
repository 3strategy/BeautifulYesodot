(function () {
    const BOARD_SIZE = 8;
    const STORAGE_KEY = `chess-threats-interactive-v2:${window.location.pathname || 'default'}`;
    const SUCCESS_COL = '#98c379';
    const ERROR_COL = '#e06c75';
    const VARIABLE_ORDER = [
        'rookRow',
        'rookCol',
        'bishRow',
        'bishCol',
        'knightRow',
        'knightCol'
    ];

    const levels = [
        {
            id: 'bishop-dark-square',
            title: 'שלב 1: הרץ על משבצת שחורה',
            prompt: 'כתבו תנאי שמחזיר true כאשר הרץ נמצא על משבצת שחורה.',
            output: 'Bishop is on a black square',
            pieces: [{ key: 'bish', label: 'B', name: 'רץ', rowVar: 'bishRow', colVar: 'bishCol' }],
            expected: (env) => isDarkSquare(env.bishRow, env.bishCol),
            guideSquares: () => allBoardSquares().filter((square) => isDarkSquare(square.row, square.col)),
            threatSquares: () => [],
            tests: () => {
                const cases = [];
                for (let row = 0; row < BOARD_SIZE; row++) {
                    for (let col = 0; col < BOARD_SIZE; col++) {
                        cases.push({ bishRow: row, bishCol: col });
                    }
                }
                return cases;
            },
            initialEnv: { bishRow: 3, bishCol: 4 },
            randomEnv: () => ({ bishRow: rand(BOARD_SIZE), bishCol: rand(BOARD_SIZE) })
        },
        {
            id: 'rook-threatens-bishop',
            title: 'שלב 2: צריח מאיים על רץ',
            prompt: 'צריח מאיים אם שני הכלים באותה שורה או באותו טור.',
            output: 'rook threatens bishop',
            pieces: [
                { key: 'rook', label: 'R', name: 'צריח', rowVar: 'rookRow', colVar: 'rookCol' },
                { key: 'bish', label: 'B', name: 'רץ', rowVar: 'bishRow', colVar: 'bishCol' }
            ],
            targetPiece: 'bish',
            expected: (env) => env.rookRow === env.bishRow || env.rookCol === env.bishCol,
            guideSquares: () => [],
            threatSquares: (env) => rookThreatSquares(env.rookRow, env.rookCol),
            tests: () => pairCases('rook', 'bish'),
            initialEnv: { rookRow: 2, rookCol: 6, bishRow: 5, bishCol: 6 },
            randomEnv: () => randomPairScenario('rook', 'bish')
        },
        {
            id: 'bishop-threatens-rook',
            title: 'שלב 3: רץ מאיים על צריח',
            prompt: 'רץ מאיים אם שני הכלים נמצאים על אותו אלכסון.',
            output: 'bishop threatens rook',
            pieces: [
                { key: 'rook', label: 'R', name: 'צריח', rowVar: 'rookRow', colVar: 'rookCol' },
                { key: 'bish', label: 'B', name: 'רץ', rowVar: 'bishRow', colVar: 'bishCol' }
            ],
            targetPiece: 'rook',
            expected: (env) => Math.abs(env.rookRow - env.bishRow) === Math.abs(env.rookCol - env.bishCol),
            guideSquares: () => [],
            threatSquares: (env) => bishopThreatSquares(env.bishRow, env.bishCol),
            tests: () => pairCases('rook', 'bish'),
            initialEnv: { rookRow: 6, rookCol: 1, bishRow: 3, bishCol: 4 },
            randomEnv: () => randomPairScenario('rook', 'bish')
        },
        {
            id: 'knight-threatens-bishop',
            title: 'שלב 4: סוס מאיים על רץ',
            prompt: 'סוס מאיים בקפיצה של 2 משבצות בכיוון אחד ו־1 בכיוון השני.',
            output: 'knight threatens bishop',
            pieces: [
                { key: 'knight', label: 'N', name: 'סוס', rowVar: 'knightRow', colVar: 'knightCol' },
                { key: 'bish', label: 'B', name: 'רץ', rowVar: 'bishRow', colVar: 'bishCol' }
            ],
            targetPiece: 'bish',
            expected: (env) => {
                const rowDiff = Math.abs(env.knightRow - env.bishRow);
                const colDiff = Math.abs(env.knightCol - env.bishCol);
                return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
            },
            guideSquares: () => [],
            threatSquares: (env) => knightThreatSquares(env.knightRow, env.knightCol),
            tests: () => pairCases('knight', 'bish'),
            initialEnv: { knightRow: 4, knightCol: 4, bishRow: 2, bishCol: 5 },
            randomEnv: () => randomPairScenario('knight', 'bish')
        }
    ];

    let currentLevel = 0;
    let savedAnswers = {};
    let currentEnv = null;
    let cellGrid = [];
    let toastTimeout = null;
    let pollingInterval = null;

    function initGame() {
        const board = document.getElementById('chess-threats-board');
        const input = document.getElementById('chess-threats-input');
        const checkButton = document.getElementById('chess-threats-check');
        const newButton = document.getElementById('chess-threats-new');
        const prevButton = document.getElementById('chess-threats-prev');
        const nextButton = document.getElementById('chess-threats-next');
        const resetButton = document.getElementById('chess-threats-reset');

        if (!board || !input || !checkButton || !newButton || !prevButton || !nextButton || !resetButton) {
            return false;
        }

        if (board.innerHTML.trim() !== '') {
            return true;
        }

        const state = loadState();
        currentLevel = clampLevel(state.currentLevel);
        savedAnswers = state.answers;

        buildBoard(board);
        initLevel();

        checkButton.addEventListener('click', runCheck);
        newButton.addEventListener('click', () => {
            currentEnv = levels[currentLevel].randomEnv();
            renderLevel();
        });
        prevButton.addEventListener('click', () => setLevel(currentLevel - 1));
        nextButton.addEventListener('click', () => setLevel(currentLevel + 1));
        resetButton.addEventListener('click', resetLevel);
        input.addEventListener('input', () => {
            saveAnswer(currentLevel, input.value || '');
            renderCurrentResult();
        });

        return true;
    }

    function buildBoard(board) {
        board.innerHTML = '';
        cellGrid = [];

        for (let row = -1; row < BOARD_SIZE; row++) {
            if (row >= 0) {
                cellGrid[row] = [];
            }

            for (let col = -1; col < BOARD_SIZE; col++) {
                if (row === -1 && col === -1) {
                    const corner = document.createElement('div');
                    corner.className = 'board-corner';
                    board.appendChild(corner);
                    continue;
                }

                if (row === -1 || col === -1) {
                    const label = document.createElement('div');
                    label.className = 'board-label';
                    label.textContent = row === -1 ? String(col) : String(row);
                    board.appendChild(label);
                    continue;
                }

                const square = document.createElement('div');
                square.className = `board-square ${isDarkSquare(row, col) ? 'dark' : 'light'}`;
                square.dataset.row = String(row);
                square.dataset.col = String(col);

                const coords = document.createElement('span');
                coords.className = 'coords-hint';
                coords.textContent = `${row},${col}`;
                square.appendChild(coords);

                const piece = document.createElement('span');
                piece.className = 'chess-piece';
                square.appendChild(piece);

                board.appendChild(square);
                cellGrid[row][col] = square;
            }
        }
    }

    function initLevel() {
        const level = levels[currentLevel];
        const input = getInput();
        const saved = getSavedAnswer(currentLevel);
        currentEnv = Object.assign({}, level.initialEnv);
        input.value = saved !== undefined ? saved : buildStarterCode(level);
        renderLevel();
        persistState();
    }

    function renderLevel() {
        const level = levels[currentLevel];
        const title = document.getElementById('chess-threats-title');
        const prompt = document.getElementById('chess-threats-prompt');
        const code = document.getElementById('chess-threats-code');
        const message = document.getElementById('chess-threats-message');
        const prevButton = document.getElementById('chess-threats-prev');
        const nextButton = document.getElementById('chess-threats-next');

        title.textContent = level.title;
        prompt.textContent = level.prompt;
        code.innerHTML = `<pre><code>${escapeHtml(buildCodeSample(level, currentEnv))}</code></pre>`;
        message.textContent = '';
        message.style.color = '';

        renderBoardState(level, currentEnv);
        renderCurrentResult();

        prevButton.disabled = currentLevel === 0;
        nextButton.disabled = currentLevel === levels.length - 1;
    }

    function buildCodeSample(level, env) {
        const lines = ['// המיקום הנוכחי על הלוח'];
        const names = Object.keys(env).sort((left, right) => {
            const leftIndex = VARIABLE_ORDER.indexOf(left);
            const rightIndex = VARIABLE_ORDER.indexOf(right);
            if (leftIndex === -1 && rightIndex === -1) {
                return left.localeCompare(right);
            }
            if (leftIndex === -1) {
                return 1;
            }
            if (rightIndex === -1) {
                return -1;
            }
            return leftIndex - rightIndex;
        });

        for (const name of names) {
            lines.push(`int ${name} = ${env[name]};`);
        }
        return lines.join('\n');
    }

    function buildStarterCode(level) {
        return [
            'if (/* כתבו כאן את התנאי */)',
            '{',
            `  Console.WriteLine("${level.output}");`,
            '}'
        ].join('\n');
    }

    function renderBoardState(level, env) {
        clearBoardClasses();

        for (const square of level.guideSquares(env)) {
            cellGrid[square.row][square.col].classList.add('guide');
        }

        for (const square of level.threatSquares(env)) {
            cellGrid[square.row][square.col].classList.add('threat');
        }

        for (const piece of level.pieces) {
            const row = env[piece.rowVar];
            const col = env[piece.colVar];
            const cell = cellGrid[row][col];
            const pieceNode = cell.querySelector('.chess-piece');
            cell.classList.add('has-piece', `piece-${piece.key}`);
            cell.dataset.pieceName = piece.name;
            pieceNode.textContent = piece.label;
            pieceNode.title = `${piece.name}: (${row}, ${col})`;

            if (level.targetPiece === piece.key && level.expected(env)) {
                cell.classList.add('target-threat');
            }
        }
    }

    function clearBoardClasses() {
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                const cell = cellGrid[row][col];
                cell.classList.remove('guide', 'threat', 'target-threat', 'has-piece', 'piece-rook', 'piece-bish', 'piece-knight');
                cell.removeAttribute('data-piece-name');
                const piece = cell.querySelector('.chess-piece');
                piece.textContent = '';
                piece.removeAttribute('title');
            }
        }
    }

    function renderCurrentResult() {
        const status = document.getElementById('chess-threats-status');
        const level = levels[currentLevel];
        const pieceText = describePieces(level, currentEnv);
        let userText = '';

        try {
            const input = getInput().value || '';
            if (extractCondition(input).trim()) {
                const userValue = evaluateUserCondition(input, currentEnv);
                userText = `התנאי שלכם מחזיר ${formatBool(userValue)} במיקום הנוכחי`;
            }
        } catch (error) {
            userText = '';
        }

        status.textContent = userText ? `${pieceText} | ${userText}` : pieceText;
    }

    function describePieces(level, env) {
        return level.pieces
            .map((piece) => `${piece.name}: (${env[piece.rowVar]}, ${env[piece.colVar]})`)
            .join(' | ');
    }

    function runCheck() {
        const input = getInput();
        const message = document.getElementById('chess-threats-message');
        const code = input.value || '';

        saveAnswer(currentLevel, code);

        let firstMismatch = null;
        let parsedCondition = '';

        try {
            parsedCondition = extractCondition(code).trim();
            if (!parsedCondition) {
                throw new Error('כתבו תנאי בתוך התיבה.');
            }

            for (const testEnv of levels[currentLevel].tests()) {
                const expected = levels[currentLevel].expected(testEnv);
                const actual = evaluateConditionExpression(parsedCondition, testEnv);
                if (actual !== expected) {
                    firstMismatch = { env: testEnv, expected, actual };
                    break;
                }
            }
        } catch (error) {
            message.style.color = ERROR_COL;
            message.textContent = error.message;
            return;
        }

        if (firstMismatch) {
            currentEnv = Object.assign({}, firstMismatch.env);
            renderLevel();
            message.style.color = ERROR_COL;
            message.textContent = `כמעט. במיקום שמוצג עכשיו התנאי צריך להיות ${formatBool(firstMismatch.expected)}, אבל התנאי שלכם מחזיר ${formatBool(firstMismatch.actual)}.`;
            return;
        }

        message.style.color = SUCCESS_COL;
        message.textContent = 'מעולה. התנאי עובד גם על הדוגמאות הנסתרות.';
        showToast('כל הכבוד!', { duration: 800 }).then(() => {
            if (currentLevel < levels.length - 1) {
                return showToast('עוברים שלב', { duration: 900, variant: 'level-up' }).then(() => {
                    setLevel(currentLevel + 1);
                    scrollToTop();
                });
            }
            return Promise.resolve();
        });
    }

    function setLevel(nextLevel) {
        const input = getInput();
        saveAnswer(currentLevel, input.value || '');
        currentLevel = clampLevel(nextLevel);
        initLevel();
        scrollToTop();
    }

    function resetLevel() {
        const level = levels[currentLevel];
        const input = getInput();
        input.value = buildStarterCode(level);
        currentEnv = Object.assign({}, level.initialEnv);
        saveAnswer(currentLevel, input.value);
        renderLevel();
        showToast('איפסתי את השלב');
    }

    function evaluateUserCondition(code, env) {
        const condition = extractCondition(code);
        return evaluateConditionExpression(condition, env);
    }

    function evaluateConditionExpression(condition, env) {
        if (/(^|[^=!<>])=([^=]|$)/.test(condition)) {
            throw new Error('להשוואה משתמשים ב־==. הסימן = מיועד להשמה.');
        }

        let normalized = expandAbsCalls(condition);
        normalized = normalized
            .replace(/\btrue\b/gi, '1')
            .replace(/\bfalse\b/gi, '0');
        const substituted = substituteVariables(normalized, env);
        const safe = substituted.replace(/\s+/g, ' ').trim();

        if (!safe) {
            throw new Error('כתבו תנאי בתוך התיבה.');
        }

        if (/[A-Za-z_]/.test(safe)) {
            const name = safe.match(/[A-Za-z_]\w*/);
            throw new Error(`שם משתנה לא מוכר: ${name ? name[0] : ''}`);
        }

        if (/[^0-9+\-*/%()<>!=&|?:\s]/.test(safe)) {
            throw new Error('התנאי מכיל תו שאינו נתמך בתרגול הזה.');
        }

        try {
            return Boolean(Function(`"use strict"; return (${safe});`)());
        } catch (error) {
            throw new Error('לא הצלחתי לחשב את התנאי. בדקו סוגריים וסימני פעולה.');
        }
    }

    function extractCondition(code) {
        const cleaned = stripComments(code || '').trim().replace(/;\s*$/, '');
        const ifIndex = cleaned.search(/\bif\b/);

        if (ifIndex === -1) {
            throw new Error('כתבו את התנאי בתוך שורת if (...).');
        }

        let index = ifIndex + 2;
        while (index < cleaned.length && /\s/.test(cleaned[index])) {
            index++;
        }

        if (cleaned[index] !== '(') {
            throw new Error('אחרי if צריך לפתוח סוגריים.');
        }

        const end = findMatching(cleaned, index, '(', ')');
        return cleaned.slice(index + 1, end);
    }

    function stripComments(code) {
        return code
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '');
    }

    function expandAbsCalls(expr) {
        const absRegex = /Math\s*\.\s*Abs\s*\(/gi;
        let output = '';
        let cursor = 0;

        while (cursor < expr.length) {
            absRegex.lastIndex = cursor;
            const match = absRegex.exec(expr);
            if (!match) {
                output += expr.slice(cursor);
                break;
            }

            output += expr.slice(cursor, match.index);
            const openIndex = match.index + match[0].length - 1;
            const closeIndex = findMatching(expr, openIndex, '(', ')');
            const inner = expandAbsCalls(expr.slice(openIndex + 1, closeIndex));
            output += `(((${inner}) < 0 ? -(${inner}) : (${inner})))`;
            cursor = closeIndex + 1;
        }

        return output;
    }

    function substituteVariables(expr, env) {
        return expr.replace(/\b([A-Za-z_]\w*)\b/g, (match) => {
            if (Object.prototype.hasOwnProperty.call(env, match)) {
                return String(env[match]);
            }
            return match;
        });
    }

    function findMatching(src, startIndex, openChar, closeChar) {
        let depth = 0;
        for (let index = startIndex; index < src.length; index++) {
            if (src[index] === openChar) {
                depth++;
            } else if (src[index] === closeChar) {
                depth--;
                if (depth === 0) {
                    return index;
                }
            }
        }
        throw new Error(`חסר הסימן ${closeChar}.`);
    }

    function pairCases(first, second) {
        const cases = [];
        const firstRow = `${first}Row`;
        const firstCol = `${first}Col`;
        const secondRow = `${second}Row`;
        const secondCol = `${second}Col`;

        for (let rowA = 0; rowA < BOARD_SIZE; rowA++) {
            for (let colA = 0; colA < BOARD_SIZE; colA++) {
                for (let rowB = 0; rowB < BOARD_SIZE; rowB++) {
                    for (let colB = 0; colB < BOARD_SIZE; colB++) {
                        if (rowA === rowB && colA === colB) {
                            continue;
                        }

                        cases.push({
                            [firstRow]: rowA,
                            [firstCol]: colA,
                            [secondRow]: rowB,
                            [secondCol]: colB
                        });
                    }
                }
            }
        }

        return cases;
    }

    function randomPairScenario(first, second) {
        const firstRow = `${first}Row`;
        const firstCol = `${first}Col`;
        const secondRow = `${second}Row`;
        const secondCol = `${second}Col`;
        const env = {
            [firstRow]: rand(BOARD_SIZE),
            [firstCol]: rand(BOARD_SIZE),
            [secondRow]: rand(BOARD_SIZE),
            [secondCol]: rand(BOARD_SIZE)
        };

        if (env[firstRow] === env[secondRow] && env[firstCol] === env[secondCol]) {
            env[secondCol] = (env[secondCol] + 1) % BOARD_SIZE;
        }

        return env;
    }

    function rookThreatSquares(row, col) {
        const squares = [];
        for (let index = 0; index < BOARD_SIZE; index++) {
            if (index !== col) {
                squares.push({ row, col: index });
            }
            if (index !== row) {
                squares.push({ row: index, col });
            }
        }
        return squares;
    }

    function bishopThreatSquares(row, col) {
        const squares = [];
        const directions = [
            { row: 1, col: 1 },
            { row: 1, col: -1 },
            { row: -1, col: 1 },
            { row: -1, col: -1 }
        ];

        for (const dir of directions) {
            let nextRow = row + dir.row;
            let nextCol = col + dir.col;
            while (isInside(nextRow, nextCol)) {
                squares.push({ row: nextRow, col: nextCol });
                nextRow += dir.row;
                nextCol += dir.col;
            }
        }

        return squares;
    }

    function knightThreatSquares(row, col) {
        const deltas = [
            { row: 2, col: 1 },
            { row: 2, col: -1 },
            { row: -2, col: 1 },
            { row: -2, col: -1 },
            { row: 1, col: 2 },
            { row: 1, col: -2 },
            { row: -1, col: 2 },
            { row: -1, col: -2 }
        ];

        return deltas
            .map((delta) => ({ row: row + delta.row, col: col + delta.col }))
            .filter((square) => isInside(square.row, square.col));
    }

    function allBoardSquares() {
        const squares = [];
        for (let row = 0; row < BOARD_SIZE; row++) {
            for (let col = 0; col < BOARD_SIZE; col++) {
                squares.push({ row, col });
            }
        }
        return squares;
    }

    function isInside(row, col) {
        return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
    }

    function isDarkSquare(row, col) {
        return (row + col) % 2 === 1;
    }

    function rand(max) {
        return Math.floor(Math.random() * max);
    }

    function formatBool(value) {
        return value ? 'true' : 'false';
    }

    function getInput() {
        return document.getElementById('chess-threats-input');
    }

    function clampLevel(index) {
        const safe = Number.isInteger(index) ? index : 0;
        return Math.min(Math.max(safe, 0), levels.length - 1);
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) {
                return { currentLevel: 0, answers: {} };
            }

            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed !== 'object') {
                return { currentLevel: 0, answers: {} };
            }

            return {
                currentLevel: Number.isInteger(parsed.currentLevel) ? parsed.currentLevel : 0,
                answers: parsed.answers && typeof parsed.answers === 'object' ? parsed.answers : {}
            };
        } catch (error) {
            return { currentLevel: 0, answers: {} };
        }
    }

    function persistState() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                currentLevel,
                answers: savedAnswers
            }));
        } catch (error) {
            return;
        }
    }

    function saveAnswer(levelIndex, code) {
        savedAnswers[String(levelIndex)] = code;
        persistState();
    }

    function getSavedAnswer(levelIndex) {
        return savedAnswers[String(levelIndex)];
    }

    function showToast(messageText, options) {
        const toast = document.getElementById('chess-threats-toast');
        if (!toast) {
            return Promise.resolve();
        }

        const opts = options || {};
        const variant = typeof opts.variant === 'string' ? opts.variant : '';
        const duration = Number.isFinite(opts.duration) ? opts.duration : 1000;
        const transitionMs = 300;

        toast.textContent = messageText;
        toast.classList.remove('show', 'level-up');
        if (variant) {
            toast.classList.add(variant);
        }

        void toast.offsetWidth;
        toast.classList.add('show');

        if (toastTimeout) {
            clearTimeout(toastTimeout);
        }

        return new Promise((resolve) => {
            toastTimeout = setTimeout(() => {
                toast.classList.remove('show');
                if (variant) {
                    toast.classList.remove(variant);
                }
                setTimeout(resolve, transitionMs);
            }, duration);
        });
    }

    function scrollToTop() {
        const container = document.getElementById('chess-threats-container');
        if (!container) {
            return;
        }

        const rect = container.getBoundingClientRect();
        const top = window.pageYOffset + rect.top - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    }

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    pollingInterval = setInterval(function () {
        if (initGame()) {
            clearInterval(pollingInterval);
        }
    }, 100);

    setTimeout(function () {
        clearInterval(pollingInterval);
    }, 10000);
})();
