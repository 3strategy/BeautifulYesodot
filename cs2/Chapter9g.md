---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "משתנים הבנויים כאוסף"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי]
mathjax: true
lang: he
---


<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rouge-Compatible Code Morpher</title>
    <style>
        /* Basic Rouge-like styling for demo - your site will use its own Rouge CSS */
        .language-csharp.highlighter-rouge {
            margin: 20px 0;
            position: relative;
        }
        
        .language-csharp .highlight {
            background: #f8f8f2;
            border-radius: 4px;
        }
        
        .language-csharp pre.highlight {
            padding: 1rem;
            overflow-x: auto;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
        }
        
        /* Rouge syntax highlighting classes */
        .k { color: #66d9ef; } /* keyword */
        .kt { color: #66d9ef; } /* keyword.type */
        .nf { color: #a6e22e; } /* name.function */
        .n { color: #f8f8f2; } /* name */
        .p { color: #f8f8f2; } /* punctuation */
        .s { color: #e6db74; } /* string */
        .m { color: #ae81ff; } /* number */
        .c1 { color: #75715e; font-style: italic; } /* comment */
        
        /* Demo container styling */
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 900px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        
        .demo-container {
            background: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 30px;
        }
        
        /* Code morpher specific styles */
        .code-morpher-container {
            position: relative;
        }
        
        .code-state {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .code-state.active {
            position: relative;
            opacity: 1;
            transform: translateY(0);
        }
        
        .code-state.exiting {
            opacity: 0;
            transform: translateY(-20px);
        }
        
        .controls {
            display: flex;
            gap: 15px;
            align-items: center;
            margin: 20px 0;
            flex-wrap: wrap;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 8px;
        }
        
        button {
            background: #007acc;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.3s ease;
            font-weight: 500;
        }
        
        button:hover:not(:disabled) {
            background: #005a9e;
            transform: translateY(-2px);
        }
        
        button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        
        .progress-bar {
            flex: 1;
            min-width: 200px;
            height: 6px;
            background: #e0e0e0;
            border-radius: 3px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(45deg, #007acc, #00a0ff);
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        
        .step-info {
            background: #e8f4fd;
            border-left: 4px solid #007acc;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        .integration-guide {
            background: #fff9e6;
            border: 1px solid #ffd700;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .integration-guide h3 {
            color: #cc8800;
            margin-top: 0;
        }
        
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Consolas', monospace;
            font-size: 13px;
        }
        
        .auto-play-controls {
            display: flex;
            gap: 15px;
            align-items: center;
            margin: 10px 0;
        }
        
        .speed-control {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        input[type="range"] {
            width: 120px;
        }
        
        .step-counter {
            background: #007acc;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="demo-container">
        <h1>🎯 Rouge-Compatible Code Morpher</h1>
        <p>This system works with your existing kramdown/Rouge syntax highlighting and CSS.</p>
        
        <div class="code-morpher-container" id="demoMorpher">
            <!-- Code states will be inserted here -->
        </div>
        
        <div class="controls">
            <button id="prevBtn">← Previous</button>
            <button id="nextBtn">Next →</button>
            <div class="progress-bar">
                <div class="progress-fill" id="progressFill"></div>
            </div>
            <span class="step-counter" id="stepCounter">1 / 10</span>
        </div>
        
        <div class="auto-play-controls">
            <button id="autoPlayBtn">▶ Auto Play</button>
            <div class="speed-control">
                <label>Speed:</label>
                <input type="range" id="speedSlider" min="500" max="3000" value="2000" step="100">
                <span id="speedValue">2.0s</span>
            </div>
        </div>
        
        <div class="step-info" id="stepInfo">
            <strong>Step 1:</strong> Starting with a simple string variable declaration.
        </div>
    </div>

    <div class="integration-guide">
        <h3>🔧 Integration Guide for Jekyll with Rouge</h3>
        <p>To use this in your Jekyll site with existing Rouge formatting:</p>
        <ol>
            <li>Add the JavaScript to your page (CSS optional - uses your existing Rouge styles)</li>
            <li>Create a container: <code>&lt;div id="my-code-morpher"&gt;&lt;/div&gt;</code></li>
            <li>Initialize with your Rouge HTML strings:</li>
        </ol>
        <pre style="background: #f8f8f8; padding: 15px; border-radius: 5px; overflow-x: auto;"><code>const morpher = new RougeCodeMorpher('my-code-morpher', [
    {
        html: `&lt;div class="language-csharp highlighter-rouge"&gt;
            &lt;div class="highlight"&gt;
                &lt;pre class="highlight"&gt;&lt;code&gt;...your Rouge HTML...&lt;/code&gt;&lt;/pre&gt;
            &lt;/div&gt;
        &lt;/div&gt;`,
        description: "Step description"
    }
    // ... more states
]);
morpher.init();</code></pre>
        
        <h4>💡 Pro Tip: Extract HTML from Jekyll</h4>
        <p>You can extract the Rouge HTML by:</p>
        <ul>
            <li>Build your Jekyll site</li>
            <li>Copy the generated HTML for each code block</li>
            <li>Or use Jekyll's <code>{% capture %}</code> to store HTML in JavaScript variables</li>
        </ul>
    </div>

    <script>
        class RougeCodeMorpher {
            constructor(containerId, codeStates) {
                this.container = document.getElementById(containerId);
                if (!this.container) {
                    console.error(`Container with id '${containerId}' not found`);
                    return;
                }
                
                this.codeStates = codeStates;
                this.currentStep = 0;
                this.isAutoPlaying = false;
                this.autoPlayInterval = null;
                this.autoPlaySpeed = 2000;
                this.isTransitioning = false;
                
                this.setupHTML();
                this.bindEvents();
            }
            
            setupHTML() {
                // Create the morpher structure
                this.container.innerHTML = `
                    <div class="code-morpher-container">
                        ${this.codeStates.map((state, index) => 
                            `<div class="code-state ${index === 0 ? 'active' : ''}" data-step="${index}">
                                ${state.html}
                            </div>`
                        ).join('')}
                    </div>
                    
                    <div class="controls">
                        <button class="prev-btn">← Previous</button>
                        <button class="next-btn">Next →</button>
                        <div class="progress-bar">
                            <div class="progress-fill"></div>
                        </div>
                        <span class="step-counter">1 / ${this.codeStates.length}</span>
                    </div>
                    
                    <div class="auto-play-controls">
                        <button class="auto-play-btn">▶ Auto Play</button>
                        <div class="speed-control">
                            <label>Speed:</label>
                            <input type="range" class="speed-slider" min="500" max="3000" value="${this.autoPlaySpeed}" step="100">
                            <span class="speed-value">${this.autoPlaySpeed/1000}s</span>
                        </div>
                    </div>
                    
                    <div class="step-info">
                        <strong>Step 1:</strong> ${this.codeStates[0].description}
                    </div>
                `;
                
                this.updateUI();
            }
            
            bindEvents() {
                const prevBtn = this.container.querySelector('.prev-btn');
                const nextBtn = this.container.querySelector('.next-btn');
                const autoPlayBtn = this.container.querySelector('.auto-play-btn');
                const speedSlider = this.container.querySelector('.speed-slider');
                
                prevBtn.addEventListener('click', () => this.previousStep());
                nextBtn.addEventListener('click', () => this.nextStep());
                autoPlayBtn.addEventListener('click', () => this.toggleAutoPlay());
                speedSlider.addEventListener('input', (e) => this.updateSpeed(e.target.value));
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (this.container.matches(':hover') || this.container.contains(document.activeElement)) {
                        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                            e.preventDefault();
                            this.previousStep();
                        }
                        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                            e.preventDefault();
                            this.nextStep();
                        }
                        if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            this.toggleAutoPlay();
                        }
                    }
                });
            }
            
            nextStep() {
                if (this.isTransitioning || this.currentStep >= this.codeStates.length - 1) return;
                this.currentStep++;
                this.transitionToStep(this.currentStep);
            }
            
            previousStep() {
                if (this.isTransitioning || this.currentStep <= 0) return;
                this.currentStep--;
                this.transitionToStep(this.currentStep);
            }
            
            transitionToStep(step) {
                if (this.isTransitioning) return;
                this.isTransitioning = true;
                
                const codeStates = this.container.querySelectorAll('.code-state');
                const currentState = codeStates[this.currentStep];
                
                // Start exit transition for current state
                codeStates.forEach((state, index) => {
                    if (index !== step) {
                        state.classList.remove('active');
                        state.classList.add('exiting');
                    }
                });
                
                // After a brief delay, show the new state
                setTimeout(() => {
                    codeStates.forEach(state => {
                        state.classList.remove('exiting');
                    });
                    currentState.classList.add('active');
                    
                    this.updateUI();
                    this.isTransitioning = false;
                }, 300);
            }
            
            updateUI() {
                const prevBtn = this.container.querySelector('.prev-btn');
                const nextBtn = this.container.querySelector('.next-btn');
                const progressFill = this.container.querySelector('.progress-fill');
                const stepCounter = this.container.querySelector('.step-counter');
                const stepInfo = this.container.querySelector('.step-info');
                
                prevBtn.disabled = this.currentStep === 0;
                nextBtn.disabled = this.currentStep === this.codeStates.length - 1;
                
                const progress = this.codeStates.length > 1 ? 
                    (this.currentStep / (this.codeStates.length - 1)) * 100 : 0;
                progressFill.style.width = `${progress}%`;
                
                stepCounter.textContent = `${this.currentStep + 1} / ${this.codeStates.length}`;
                stepInfo.innerHTML = `<strong>Step ${this.currentStep + 1}:</strong> ${this.codeStates[this.currentStep].description}`;
            }
            
            toggleAutoPlay() {
                const autoPlayBtn = this.container.querySelector('.auto-play-btn');
                
                if (this.isAutoPlaying) {
                    this.stopAutoPlay();
                    autoPlayBtn.textContent = '▶ Auto Play';
                } else {
                    this.startAutoPlay();
                    autoPlayBtn.textContent = '⏸ Pause';
                }
            }
            
            startAutoPlay() {
                this.isAutoPlaying = true;
                this.autoPlayInterval = setInterval(() => {
                    if (this.currentStep < this.codeStates.length - 1) {
                        this.nextStep();
                    } else {
                        // Loop back to beginning
                        this.currentStep = -1;
                        this.nextStep();
                    }
                }, this.autoPlaySpeed);
            }
            
            stopAutoPlay() {
                this.isAutoPlaying = false;
                if (this.autoPlayInterval) {
                    clearInterval(this.autoPlayInterval);
                    this.autoPlayInterval = null;
                }
            }
            
            updateSpeed(speed) {
                this.autoPlaySpeed = parseInt(speed);
                const speedValue = this.container.querySelector('.speed-value');
                speedValue.textContent = `${this.autoPlaySpeed/1000}s`;
                
                if (this.isAutoPlaying) {
                    this.stopAutoPlay();
                    this.startAutoPlay();
                }
            }
            
            // Public method to jump to specific step
            goToStep(step) {
                if (step >= 0 && step < this.codeStates.length && step !== this.currentStep) {
                    this.currentStep = step;
                    this.transitionToStep(step);
                }
            }
            
            init() {
                return this;
            }
        }

        // Demo with your exact Rouge HTML structure
        const demoStates = [
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span> <span class="n">car</span> <span class="p">=</span> <span class="s">"BMW"</span><span class="p">;</span>

    <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">car</span><span class="p">);</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Starting with a simple string variable declaration."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="p">{</span> <span class="s">"BMW"</span><span class="p">,</span> <span class="s">"Ford"</span><span class="p">,</span> <span class="s">"Kia"</span> <span class="p">};</span>

    <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">);</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Converting to an array with multiple elements."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="p">{</span> <span class="s">"BMW"</span><span class="p">,</span> <span class="s">"Ford"</span><span class="p">,</span> <span class="s">"Kia"</span> <span class="p">};</span>

    <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">0</span><span class="p">]);</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Accessing array elements by index."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="p">{</span> <span class="s">"BMW"</span><span class="p">,</span> <span class="s">"Ford"</span><span class="p">,</span> <span class="s">"Kia"</span> <span class="p">};</span>

    <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">0</span><span class="p">]);</span>
    <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">1</span><span class="p">]);</span>
    <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">2</span><span class="p">]);</span>
    <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">3</span><span class="p">]);</span> <span class="c1">//index out of range exception</span>

    
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Attempting to access an index that doesn't exist - causes exception."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="p">{</span> <span class="s">"BMW"</span><span class="p">,</span> <span class="s">"Ford"</span><span class="p">,</span> <span class="s">"Kia"</span> <span class="p">};</span>
    <span class="k">try</span>
    <span class="p">{</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">0</span><span class="p">]);</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">1</span><span class="p">]);</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">2</span><span class="p">]);</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="m">3</span><span class="p">]);</span> <span class="c1">//index out of range exception</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">ReadLine</span><span class="p">();</span>
    <span class="p">}</span>
    <span class="k">catch</span> <span class="p">(</span><span class="n">Exception</span> <span class="n">e</span><span class="p">)</span>
    <span class="p">{</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="s">$"we had aproblem: </span><span class="p">{</span><span class="n">e</span><span class="p">.</span><span class="n">Message</span><span class="p">}</span><span class="s">"</span><span class="p">);</span>
    <span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Using try-catch to handle the index out of range exception."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="p">{</span> <span class="s">"BMW"</span><span class="p">,</span> <span class="s">"Ford"</span><span class="p">,</span> <span class="s">"Kia"</span> <span class="p">};</span>
    
    <span class="k">for</span> <span class="p">(</span><span class="kt">int</span> <span class="n">i</span> <span class="p">=</span> <span class="m">0</span><span class="p">;</span> <span class="n">i</span> <span class="p">&lt;</span> <span class="n">cars</span><span class="p">.</span><span class="n">Length</span><span class="p">;</span> <span class="n">i</span><span class="p">++)</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="n">i</span><span class="p">]);</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Using a for loop to safely iterate through all array elements."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="p">{</span> <span class="s">"BMW"</span><span class="p">,</span> <span class="s">"Ford"</span><span class="p">,</span> <span class="s">"Kia"</span> <span class="p">};</span>

    <span class="k">foreach</span> <span class="p">(</span><span class="kt">string</span> <span class="n">car</span> <span class="k">in</span> <span class="n">cars</span><span class="p">)</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">car</span><span class="p">);</span> <span class="c1">// הרבה יותר פשוט</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Using foreach loop - much simpler and safer approach."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="k">new</span> <span class="kt">string</span><span class="p">[</span><span class="m">5</span><span class="p">];</span> <span class="c1">// איתחול לגודל 5</span>
    
    <span class="k">for</span> <span class="p">(</span><span class="kt">int</span> <span class="n">i</span> <span class="p">=</span> <span class="m">0</span><span class="p">;</span> <span class="n">i</span> <span class="p">&lt;</span> <span class="n">cars</span><span class="p">.</span><span class="n">Length</span><span class="p">;</span> <span class="n">i</span><span class="p">++)</span>
    <span class="p">{</span>
        <span class="n">cars</span><span class="p">[</span><span class="n">i</span><span class="p">]</span> <span class="p">=</span> <span class="s">"BMW"</span> <span class="p">+</span> <span class="n">i</span> <span class="p">+</span> <span class="m">100</span><span class="p">;</span>
        <span class="n">Console</span><span class="p">.</span><span class="nf">WriteLine</span><span class="p">(</span><span class="n">cars</span><span class="p">[</span><span class="n">i</span><span class="p">]);</span>
    <span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Initializing an array with a fixed size and populating it dynamically."
            },
            {
                html: `<div class="language-csharp highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">static</span> <span class="k">void</span> <span class="nf">Main</span><span class="p">(</span><span class="kt">string</span><span class="p">[]</span> <span class="n">args</span><span class="p">)</span>
<span class="p">{</span>
    <span class="kt">string</span><span class="p">[]</span> <span class="n">cars</span> <span class="p">=</span> <span class="k">new</span> <span class="kt">string</span><span class="p">[</span><span class="m">5</span><span class="p">];</span>

    <span class="k">foreach</span> <span class="p">(</span><span class="kt">string</span> <span class="n">car</span> <span class="k">in</span> <span class="n">cars</span><span class="p">)</span> 
        <span class="n">car</span> <span class="p">=</span> <span class="s">"BMW"</span><span class="p">;</span> <span class="c1">// ===== לא אפשרי  ======</span>
<span class="p">}</span>
</code></pre></div></div>`,
                description: "Demonstrating why you can't modify array elements in foreach - compilation error."
            }
        ];

        // Initialize demo
        const demoMorpher = new RougeCodeMorpher('demoMorpher', demoStates);
        
        // Make it globally accessible for demo purposes
        window.demoMorpher = demoMorpher;
    </script>
</body>
</html>