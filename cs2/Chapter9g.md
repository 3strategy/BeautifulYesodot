---
layout: page
title: "פרק 9 מערך חד ממדי"
subtitle: "משתנים הבנויים כאוסף"
author: גיא סידס
tags: [מערך, מערכים, חד ממדי]
mathjax: true
lang: he
---




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
