---
layout: page
title: Code Trooper
tags: [csharp, game, loop, control structure]
mathjax: true
lang: he
---

<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js"></script>

<style>
  :root {
    --neon-blue: #00f3ff;
    --neon-pink: #ff0099;
    --neon-green: #00ff9d;
    --dark-bg: #050510;
    --panel-bg: rgba(20, 20, 35, 0.9);
  }

  body {
    background-color: var(--dark-bg);
    color: #eee;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  #game-root {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    direction: rtl;
  }

  .game-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Status Bar */
  .status-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    background: var(--panel-bg);
    border: 1px solid #333;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.1);
  }

  .phase-indicator {
    font-size: 1.2rem;
    font-weight: bold;
    color: var(--neon-blue);
    text-shadow: 0 0 5px var(--neon-blue);
  }

  /* Code Editors */
  .editor-wrapper {
    position: relative;
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #444;
    transition: all 0.3s ease;
  }

  .editor-wrapper.focus {
    border-color: var(--neon-blue);
    box-shadow: 0 0 10px rgba(0, 243, 255, 0.2);
  }

  .code-textarea {
    width: 100%;
    height: 300px;
    background: transparent;
    color: #d4d4d4;
    font-family: 'Consolas', 'Monaco', monospace;
    font-size: 16px;
    padding: 15px;
    border: none;
    resize: none;
    line-height: 1.5;
    outline: none;
    direction: ltr;
  }

  .editor-label {
    position: absolute;
    top: 5px;
    right: 15px; /* RTL fix: actually right in container but 'right' css property */
    background: rgba(0,0,0,0.5);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    pointer-events: none;
    color: #aaa;
  }

  /* Buttons */
  .neon-btn {
    background: transparent;
    border: 2px solid var(--neon-blue);
    color: var(--neon-blue);
    padding: 10px 25px;
    font-size: 1rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;
    overflow: hidden;
  }

  .neon-btn:hover {
    background: var(--neon-blue);
    color: #000;
    box-shadow: 0 0 20px var(--neon-blue);
  }

  .neon-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #555;
    color: #555;
    box-shadow: none;
  }

  .neon-btn.secondary {
    border-color: var(--neon-pink);
    color: var(--neon-pink);
  }
  
  .neon-btn.secondary:hover {
    background: var(--neon-pink);
    color: #fff;
    box-shadow: 0 0 20px var(--neon-pink);
  }

  /* Simulation Canvas */
  .canvas-container {
    position: relative;
    width: 100%;
    height: 500px;
    background: radial-gradient(circle at bottom, #1a1a2e 0%, #000 100%);
    border: 2px solid #333;
    border-radius: 12px;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.8);
    overflow: hidden;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }

  .overlay-msg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.85);
    padding: 30px;
    border-radius: 15px;
    text-align: center;
    border: 1px solid var(--neon-blue);
  }

  /* Docs */
  .docs-panel {
    background: rgba(255,255,255,0.05);
    padding: 15px;
    border-radius: 8px;
    font-size: 0.9rem;
  }
  
  .docs-title {
    color: var(--neon-green);
    margin-bottom: 10px;
    font-weight: bold;
  }
  
  .code-snippet {
    background: #111;
    color: #fab;
    padding: 2px 5px;
    border-radius: 4px;
    font-family: monospace;
    direction: ltr;
    display: inline-block;
  }
  
  /* New Classes for Refactor */
  .error-toast {
    position: absolute; 
    bottom: 0; 
    left: 0; 
    right: 0; 
    background: #900; 
    color: #fff; 
    padding: 5px 10px; 
    font-size: 0.8rem;
  }
  
  .game-layout-grid {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 20px;
  }
  
  .empty-canvas-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    opacity: 0.5;
  }
  
  .sidebar-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .panel-active {
    opacity: 1;
    pointer-events: auto;
    transition: opacity 0.3s;
  }
  
  .panel-inactive {
    opacity: 0.5;
    pointer-events: none;
    transition: opacity 0.3s;
  }
  
  .full-width-btn {
    width: 100%;
    margin-top: 10px;
  }
  
  .doc-item {
     margin-bottom: 5px;
  }

  .restart-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center; 
      justify-content: center;
      background: rgba(0,0,0,0.6);
      pointer-events: none;
      z-index: 50;
  }
  
  .restart-btn {
      pointer-events: auto;
      background: #000;
      font-size: 1.2rem;
  }
  
  /* Unlock Modal */
  .unlock-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.85);
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.5s;
  }
  
  .unlock-box {
      background: #111;
      border: 2px solid var(--neon-green);
      padding: 40px;
      border-radius: 20px;
      text-align: center;
      max-width: 500px;
      box-shadow: 0 0 50px var(--neon-green);
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .unlock-title {
      color: var(--neon-green);
      font-size: 2.5rem;
      margin-bottom: 20px;
      text-transform: uppercase;
      text-shadow: 0 0 10px var(--neon-green);
  }
  
  .unlock-item {
      font-size: 1.5rem;
      color: #fff;
      margin: 20px 0;
      font-family: monospace;
      background: #222;
      padding: 10px;
      border-radius: 8px;
  }
  
  .unlock-desc {
      color: #ccc;
      margin-bottom: 30px;
  }
  
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes popIn { from { transform: scale(0.8); } to { transform: scale(1); } }
  
  .unlock-btn {
      font-size: 1.2rem;
      padding: 10px 40px;
  }
  
  .debug-section {
      margin-top: 20px;
  }
  
  .debug-btn {
      font-size: 0.8rem;
      padding: 5px 10px;
      border-color: #555;
      color: #888;
  }
  
  .game-over-overlay-root {
      position: absolute;
      z-index: 50;
  }
  
  .game-over-content {
      text-align: center;
  }
  
  .game-over-title {
      margin-bottom: 20px;
      font-size: 2rem;
      color: #fff;
      text-shadow: 0 0 10px #000;
  }
  
  .level-indicator {
      color: var(--neon-pink);
      font-weight: bold;
      font-size: 1.1rem;
  }
</style>

<div id="game-root"></div>

<script type="text/babel">
const { useState, useEffect, useRef, useMemo } = React;

// --- Constants & Config ---
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 500;
const FPS = 60;

// Game Phases
const PHASE_P1_PROGRAM = 'P1_PROGRAM'; // Attacker
const PHASE_P2_PROGRAM = 'P2_PROGRAM'; // Defender
const PHASE_SIMULATION = 'SIMULATION';
const PHASE_GAMEOVER = 'GAMEOVER';

// --- Helper Functions ---

const generateId = () => Math.random().toString(36).substr(2, 9);

// Simple "compiler" that converts Pseudo-C# to a list of actions
// Supported:
// P1: for(init; cond; inc) { Spawn(x, delay); Sleep(ms); }
// P2: while(true), if(IsPlaneVisible()), Rotate(deg), Fire(), Sleep(ms)

function compileAttacker(code) {
  const actions = [];
  // Very naive parser - purely for educational "feel"
  // We will actually execute this by wrapping it in a JS function with a sandbox
  // But since we want to enforce C# syntax learning, we do regex checks first.
  
  // Syntax Checks
  if (!code.includes("Spawn")) return { error: "הקוד חייב לכלול קריאה לפונקציה Spawn" };
  
  // Specific Regex for 'for' loop structure as requested
  // Matches: for (int i = 0; i < 5; i++)
  // Flexible with spaces
  const forRegex = /for\s*\(\s*int\s+[a-zA-Z0-9_]+\s*=\s*\d+\s*;\s*[a-zA-Z0-9_]+\s*<\s*\d+\s*;\s*[a-zA-Z0-9_]+\+\+\s*\)/;
  if (code.includes("for") && !forRegex.test(code)) {
    return { error: "שגיאת סינטקס: לולאת for חייבת להיות במבנה: for(int i=0; i<N; i++)" };
  }
  
  // Replace C# 'int i = 0' with 'let i = 0' for JS eval
  // Replace 'Sleep' with 'await sleep'
  let jsCode = code
    .replace(/int\s+/g, 'let ')
    .replace(/Spawn\(/g, 'await spawn(')
    .replace(/Sleep\(/g, 'await sleep(');
    
  // Wrap in async function
  const runnable = `
    return async function(api) {
      const { spawn, sleep } = api;
      try {
        ${jsCode}
      } catch (e) {
        throw e;
      }
    }
  `;
  
  try {
    const fn = new Function(runnable)();
    return { fn };
  } catch (e) {
    return { error: "שגיאת סינטקס: " + e.message };
  }
}

function compileDefender(code) {
  // Use 'let' instead of 'int'
  let jsCode = code
    .replace(/int\s+/g, 'let ')
    .replace(/Rotate\(/g, 'await rotate(')
    .replace(/Fire\(/g, 'await fire(')
    .replace(/Sleep\(/g, 'await sleep(')
    .replace(/IsPlaneAbove\(\)/g, 'api.isPlaneAbove()') 
    .replace(/Reload\(\)/g, 'await reload()')
    // Inject loop check to prevent infinite loop hang
    // Supports: 'while(true)' -> 'while(await api.loopCheck() && true)'
    .replace(/while\s*\(/g, 'while(await api.loopCheck() && ');

  // Wrap in async function
  const runnable = `
    return async function(api) {
      const { rotate, fire, sleep, isPlaneAbove, reload } = api;
      try {
        __CODE_PLACEHOLDER__
      } catch (e) {
        throw e;
      }
    }
  `;
    
  try {
    const fn = new Function(runnable.replace('__CODE_PLACEHOLDER__', jsCode))();
    return { fn };
  } catch (e) {
    return { error: "שגיאת סינטקס: " + e.message };
  }
}

// --- Components ---

function CodeEditor({ label, value, onChange, placeholder, disabled, error }) {
  return (
    <div className={`editor-wrapper ${!disabled ? 'focus' : ''}`}>
      <span className="editor-label">{label}</span>
      <textarea
        className="code-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        spellCheck="false"
      />
      {error && (
        <div className="error-toast">
          {error}
        </div>
      )}
    </div>
  );
}

function GameCanvas({ gameState, onInit, onRestart }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (canvasRef.current) {
      onInit(canvasRef.current);
    }
  }, []); // Run once
  
  // Render loop based on state
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameState) return;
    const ctx = canvas.getContext('2d');
    
    // Clear & Background
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Grid
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.1)';
    ctx.lineWidth = 1;
    for(let i=0; i<CANVAS_WIDTH; i+=40) {
       ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, CANVAS_HEIGHT); ctx.stroke();
    }
    for(let i=0; i<CANVAS_HEIGHT; i+=40) {
       ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(CANVAS_WIDTH, i); ctx.stroke();
    }
    
    // Draw Ground
    ctx.fillStyle = '#111';
    ctx.fillRect(0, CANVAS_HEIGHT - 50, CANVAS_WIDTH, 50);
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#0f0';
    ctx.strokeStyle = '#0f0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT - 50);
    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 50);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Entities
    // Cannon
    ctx.save();
    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 40);
    ctx.rotate((gameState.cannonAngle * Math.PI) / 180);
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#0ff';
    ctx.fillStyle = '#0ff';
    ctx.fillRect(-10, -30, 20, 30); // Base
    ctx.fillRect(-2, -50, 4, 20); // Barrel
    ctx.restore();
    
    // Troopers
    gameState.troopers.forEach(t => {
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#f0f';
      ctx.fillStyle = '#f0f';
      ctx.beginPath();
      // Parachute
      ctx.arc(t.x, t.y - 10, 15, Math.PI, 0);
      ctx.fill();
      // Body
      ctx.fillRect(t.x - 5, t.y, 10, 20);
    });
    
    // Projectiles
    gameState.projectiles.forEach(p => {
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ff0';
      ctx.fillStyle = '#ff0';
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });

    // Explosions
    (gameState.explosions || []).forEach(e => {
       ctx.fillStyle = `rgba(255, 100, 0, ${e.life / 20})`;
       ctx.beginPath();
       ctx.arc(e.x, e.y, 25 - e.life, 0, Math.PI * 2);
       ctx.fill();
    });
    
    if (gameState.gameOver) {
       ctx.fillStyle = 'rgba(0,0,0,0.7)';
       ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
       ctx.fillStyle = '#fff';
       ctx.font = '40px Arial';
       ctx.textAlign = 'center';
       ctx.fillText("המשחק נגמר!", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 20);
       ctx.fillStyle = '#0f0';
       ctx.font = '30px Arial';
       ctx.fillText("המנצח: " + gameState.winner, CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 30);
    }


  }, [gameState]); // Re-render on state change (This might be too slow for 60fps? 
  // Ideally we use requestAnimationFrame in the parent and just read a ref here, but proper React way is simpler for now)

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
}

function GameRoot() {
  const [phase, setPhase] = useState(PHASE_P1_PROGRAM);
  
  const [wins, setWins] = useState(() => parseInt(localStorage.getItem('codetrooper_wins') || '0'));
  const level = wins >= 1 ? 2 : 1;
  const isIfUnlocked = level >= 2;
  
  // Unlock Celebration State
  const [showLevelUp, setShowLevelUp] = useState(false);
  
  // Attacker State
  const [p1Code, setP1Code] = useState(
`// P1: תכנתו את הצנחנים
// Spawn(x, delay)
// x: 0 - 800
// delay: ms (latency)

for (int i = 0; i < 5; i++) {
   Spawn(100 + i * 100, 500);
   Sleep(200);
}
`
  );
  
  // Defender State
  const [p2Code, setP2Code] = useState(
`// P2: תכנתו את התותח
// Rotate(angle) - זווית במעלות
// Fire() - ירי
// loop runs forever

while (true) {
  Rotate(10);
  Fire();
  Rotate(-10);
  Fire();
  Sleep(500);
}
`
  );

  const [p1Error, setP1Error] = useState(null);
  const [p2Error, setP2Error] = useState(null);
  
  // Simulation State
  const [gameState, setGameState] = useState({
    cannonAngle: 0,
    troopers: [], // {x, y, active}
    projectiles: [],
    score: 0,
    time: 0,
    ammo: 10,
    maxAmmo: 10,
    totalSpawned: 0,
    finishedSpawning: false,
    gameOver: false,
    winner: null
  });

  const simulationRef = useRef(null);

  const stopSimulation = () => {
      if (simulationRef.current) {
          simulationRef.current.stop();
          simulationRef.current = null;
      }
  };

  // Cleanup on unmount
  useEffect(() => {
      return () => stopSimulation();
  }, []);

  // Actions
  const handleP1Submit = () => {
    const res = compileAttacker(p1Code);
    if (res.error) {
      setP1Error(res.error);
      return;
    }
    setP1Error(null);
    setPhase(PHASE_P2_PROGRAM);
  };

  const handleP2Submit = () => {
     const res = compileDefender(p2Code, isIfUnlocked);
    if (res.error) {
      setP2Error(res.error);
      return;
    }
    setP2Error(null);
    startSimulation();
  };
  
  const handleRestart = () => {
      stopSimulation();
      setPhase(PHASE_P1_PROGRAM);
  };
  
  const handleWin = (who) => {
      if (who === "המגן (תותח)") {
          const newWins = wins + 1;
          setWins(newWins);
          localStorage.setItem('codetrooper_wins', newWins);
          
          // Check for Level Up (0 -> 1)
          // Instant trigger
          if (newWins === 1) { 
              setShowLevelUp(true);
          }
      }
  };
  
  const resetProgress = () => {
      localStorage.removeItem('codetrooper_wins');
      setWins(0);
      window.location.reload();
  };
  
  const startSimulation = async () => {
    stopSimulation(); // Safety clear

    // Hack to access state in API (Defined early to avoid TDZ in closures)
    const gameStateRef = { current: null };

    // Reset Game State completely
    const initialState = {
      cannonAngle: 0,
      troopers: [],
      projectiles: [],
      score: 0,
      time: 0,
      ammo: 10,
      maxAmmo: 10,
      totalSpawned: 0,
      finishedSpawning: false,
      gameOver: false,
      winner: null
    };
    
    setGameState(initialState);
    gameStateRef.current = initialState; // Init ref immediately

    setPhase(PHASE_SIMULATION);
    
    // Initialize Simulation variables
    
    // Attacker Logic Runner
    const p1Res = compileAttacker(p1Code);
    const p2Res = compileDefender(p2Code, isIfUnlocked);
    
    if (!p1Res.fn || !p2Res.fn) return; // Should not happen
    
    // Control flag for THIS simulation run
    let isSimulationRunning = true;
    
    // --- Simulation Loop Drivers ---
    
    // P1 Driver
    p1Res.fn({
      spawn: async (x, delay) => {
         if (!isSimulationRunning) return;
         await new Promise(r => setTimeout(r, delay));
         if (!isSimulationRunning) return;
         setGameState(prev => ({
            ...prev,
            troopers: [...prev.troopers, { id: generateId(), x, y: 0, speed: 2 }],
            totalSpawned: (prev.totalSpawned || 0) + 1
         }));
      },
      sleep: (ms) => new Promise(r => setTimeout(r, ms))
    }).then(() => {
        if (isSimulationRunning) {
            setGameState(prev => ({ ...prev, finishedSpawning: true }));
        }
    });
    
    // P2 Driver
    p2Res.fn({
      rotate: async (deg) => {
        if (!isSimulationRunning) return;
        // Smooth rotation simulation? or instant? Instant logic for code, smooth visual
        setGameState(prev => ({ ...prev, cannonAngle: prev.cannonAngle + deg }));
        await new Promise(r => setTimeout(r, 50)); // Sim delay
      },
      fire: async () => {
         if (!isSimulationRunning) return;
         // Add projectile
         let fired = false;
         
         // Use Ref for Synchronous Check!
         if (gameStateRef.current.ammo > 0) {
             fired = true;
             setGameState(prev => ({
                 ...prev,
                 ammo: prev.ammo - 1,
                 projectiles: [...prev.projectiles, { 
                     id: generateId(), 
                     x: CANVAS_WIDTH/2, 
                     y: CANVAS_HEIGHT-40, 
                     angle: prev.cannonAngle,
                     speed: 5
                 }]
             }));
         }
         
         if (fired) await new Promise(r => setTimeout(r, 100)); // Reload time
         else await new Promise(r => setTimeout(r, 50)); // Click empty
      },
      reload: async () => {
          if (!isSimulationRunning) return;
          await new Promise(r => setTimeout(r, 2000)); // Long reload
          if (!isSimulationRunning) return;
          setGameState(prev => ({ ...prev, ammo: prev.maxAmmo }));
      },
      sleep: (ms) => new Promise(r => setTimeout(r, ms)),
      isPlaneAbove: () => {
          return gameStateRef.current.troopers.some(t => Math.abs(t.x - CANVAS_WIDTH/2) < 200 && t.y < CANVAS_HEIGHT/2);
      },
      paratroopersExist: () => {
          return gameStateRef.current.troopers.length > 0;
      },
      loopCheck: async () => {
        await new Promise(r => setTimeout(r, 16)); // Yield to event loop
        return isSimulationRunning;
      }
    });

    // Main Physics Loop
    const interval = setInterval(() => {
      setGameState(prev => {
        gameStateRef.current = prev; // Update Ref
        if (prev.gameOver) return prev;

        // 1. Move Troopers
        const newTroopers = prev.troopers.map(t => ({...t, y: t.y + t.speed}));
        
        // 2. Move Projectiles
        const newProj = prev.projectiles.map(p => ({
          ...p,
          x: p.x + Math.sin(p.angle * Math.PI / 180) * p.speed,
          y: p.y - Math.cos(p.angle * Math.PI / 180) * p.speed
        })).filter(p => p.y > 0 && p.x > 0 && p.x < CANVAS_WIDTH); // Remove out of bounds
        
        // 3. Collisions
        const troopersHitIds = new Set();
        const projHitIds = new Set();
        const newExplosions = [];

        newProj.forEach(p => {
          newTroopers.forEach(t => {
            const dx = p.x - t.x;
            const dy = p.y - (t.y - 10); // Center of parachute roughly
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 20) { // Hit radius
              troopersHitIds.add(t.id);
              projHitIds.add(p.id);
              newExplosions.push({ id: generateId(), x: t.x, y: t.y, life: 20 }); // 20 frames
            }
          });
        });

        // 4. Update Entities
        const survivingTroopers = newTroopers.filter(t => !troopersHitIds.has(t.id));
        const survivingProj = newProj.filter(p => !projHitIds.has(p.id));
        
        // 5. Check Ground Hits (Trooper Lands)
        let landedCount = prev.landedCount || 0;
        const airborneTroopers = [];
        survivingTroopers.forEach(t => {
           if (t.y >= CANVAS_HEIGHT - 50) {
             landedCount++;
             // Maybe damage cannon or just count?
           } else {
             airborneTroopers.push(t);
           }
        });

        // 6. Update Explosions
        const runningExplosions = (prev.explosions || []).map(e => ({...e, life: e.life - 1})).filter(e => e.life > 0);
        
        // 7. Win Condition
        let gameOver = false;
        let winner = null;
        
        // If too many landed -> Attacker Wins
        if (landedCount >= 3) {
           gameOver = true;
           winner = "התוקף (צנחנים)";
        } 
        // Defender Wins: All spawned, 0 active, < 3 landed
        else if (prev.finishedSpawning && survivingTroopers.length === 0) {
           gameOver = true;
           winner = "המגן (תותח)";
        }
        
        // If simulation time > 30s? Or all spawned and dead?
        // For now, let's just stick to "Simulator runs until user stops" or simple condition
        
        return {
          ...prev,
          troopers: airborneTroopers,
          projectiles: survivingProj,
          explosions: [...runningExplosions, ...newExplosions],
          landedCount,
          score: prev.score + (troopersHitIds.size * 100),
          gameOver,
          winner
        };
      });
    }, 1000/60);
    
    // Store cleanup
    simulationRef.current = {
        stop: () => {
            isSimulationRunning = false;
            clearInterval(interval);
        }
    };
  };

  useEffect(() => {
      if (gameState.gameOver && gameState.winner === "המגן (תותח)") {
          handleWin("המגן (תותח)");
      }
      // Auto-stop scripts on game over?
      if (gameState.gameOver && simulationRef.current) {
         // simulationRef.current.stop(); 
         // Don't stop immediately, let them see the result? 
         // Actually, if we stop updates, explosions freeze.
         // Let's keep interval running but scripts stopped? 
         // For now, let it run until user clicks "Play Again"
      }
  }, [gameState.gameOver]);

  return (
    <div className="game-container">
      <header className="status-bar">
        <div className="phase-indicator">
          {phase === PHASE_P1_PROGRAM && "שלב 1: התוקף (צנחנים)"}
          {phase === PHASE_P2_PROGRAM && "שלב 2: המגן (תותח)"}
          {phase === PHASE_SIMULATION && "סימולציה בזמן אמת"}
        </div>
        
        {/* Progress Indicator */}
        <div className="level-indicator">
            שלב {level} {isIfUnlocked ? "(מומחה)" : "(מתחיל)"}
        </div>

        <div className="score">
           ניקוד: {gameState.score} | תחמושת: {gameState.ammo}/{gameState.maxAmmo}
        </div>
      </header>

      <div className="game-layout-grid">
        
        {/* Main View Area */}
        <div className="main-view">
          {phase === PHASE_SIMULATION ? (
             <GameCanvas gameState={gameState} onInit={() => {}} onRestart={handleRestart} />
          ) : (
             <div className="canvas-container empty-canvas-placeholder">
                <div>
                   <h3>אזור המשחק</h3>
                   <p>הסימולציה תופיע כאן לאחר סיום התכנות</p>
                </div>
             </div>
          )}
        </div>

        {/* Sidebar / Controls */}
        <div className="side-panel sidebar-column">
           
           {/* P1 Editor */}
           <div className={phase === PHASE_P1_PROGRAM ? "panel-active" : "panel-inactive"}>
             <CodeEditor 
               label="קוד תוקף (C# Lite)" 
               value={p1Code} 
               onChange={setP1Code}
               error={p1Error}
             />
             {phase === PHASE_P1_PROGRAM && (
               <button className="neon-btn full-width-btn" onClick={handleP1Submit}>
                 סיים תור תוקף >>
               </button>
             )}
           </div>

           {/* P2 Editor */}
           <div className={phase === PHASE_P2_PROGRAM ? "panel-active" : "panel-inactive"}>
             <CodeEditor 
               label="קוד מגן (C# Lite)" 
               value={p2Code} 
               onChange={setP2Code}
               error={p2Error}
             />
             {phase === PHASE_P2_PROGRAM && (
               <button className="neon-btn secondary full-width-btn" onClick={handleP2Submit}>
                 הפעל סימולציה!
               </button>
             )}
           </div>

           {/* Docs */}
           <div className="docs-panel">
             <div className="docs-title">פקודות זמינות</div>
             <div className="doc-item"><span className="code-snippet">for(int i=0;i&lt;10;i++)</span></div>
             <div className="doc-item"><span className="code-snippet">Spawn(x, delay)</span></div>
             <div className="doc-item"><span className="code-snippet">Rotate(deg)</span></div>
             <div className="doc-item"><span className="code-snippet">Fire()</span></div>
             <div className="doc-item"><span className="code-snippet">Sleep(ms)</span></div>
             <div className="doc-item"><span className="code-snippet">Reload()</span></div>
             <hr className="doc-separator" />
             <div className="debug-section">
                 <button className="neon-btn debug-btn" onClick={resetProgress}>
                    אפס התקדמות (Debug)
                 </button>
             </div>
           </div>

        </div>
       </div>
       
       {/* Game Over Overlays handled here to avoid conflict */}
       
       {/* 1. Play Again (Standard) */}
       {gameState.gameOver && !showLevelUp && (
           <div className="restart-overlay game-over-overlay-root">
               <div className="game-over-content">
                 <div className="game-over-title">
                    {gameState.winner === "המגן (תותח)" ? "ניצחון!" : "המשחק נגמר"}
                 </div>
                 <button 
                     className="neon-btn restart-btn" 
                     onClick={handleRestart}
                 >
                     שחק שוב
                 </button>
               </div>
           </div>
       )}

       {/* 2. Level Up Modal (Special) */}
       {showLevelUp && (
           <div className="unlock-overlay">
               <div className="unlock-box">
                   <div className="unlock-title">Level Up!</div>
                   <div className="unlock-desc">כל הכבוד! נצחת את השלב הראשון.</div>
                   <div className="unlock-desc">פקודה חדשה נפתחה:</div>
                   <div className="unlock-item">(...) if</div>
                   <div className="unlock-desc">עכשיו תוכלו להשתמש בתנאים כדי ליצור הגנה חכמה יותר!</div>
                   <button 
                       className="neon-btn unlock-btn" 
                       onClick={() => {
                           setShowLevelUp(false);
                           handleRestart();
                       }}
                   >
                       מעולה! (המשך)
                   </button>
               </div>
           </div>
       )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('game-root'));
root.render(<GameRoot />);
</script>
