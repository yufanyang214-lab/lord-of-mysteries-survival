// === 状态管理 ===
const state = {
    screen: 'home', // home, playing, death, victory
    currentQIndex: 0,
    deathOption: null,
    isTransitioning: false
};

const appContainer = document.getElementById('app-container');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Fisher–Yates：保留题库顺序，只洗牌本次展示的选项。
function shuffleOptions(options) {
    const shuffled = options.map((option, originalIndex) => ({ ...option, originalIndex }));
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// === 渲染工具 ===
function renderTimeline(currentIdx, isDead = false) {
    let html = `<div class="w-full mt-8 overflow-hidden"><div class="timeline-scroll overflow-x-auto pb-4 pt-2 whitespace-nowrap"><div class="inline-flex flex-col gap-6 px-4">`;

    // 按阶段渲染
    html += `<div class="flex">`;
    timelineStages.forEach(stage => {
        const isReached = currentIdx >= stage.range[0];
        html += `
            <div class="flex-shrink-0 border-t border-dashed ${isReached ? 'border-gold' : 'border-gray-800'} pt-2" style="width: ${((stage.range[1] - stage.range[0] + 1) * 80)}px">
                <span class="text-xs ${isReached ? 'text-gold' : 'text-gray-600'} block mb-2 font-bold">${stage.name}</span>
                <div class="flex items-center relative h-8">
                    <div class="absolute h-0.5 bg-gray-800 w-full top-1/2 -translate-y-1/2 -z-10"></div>
                    ${isReached ? `<div class="absolute h-0.5 bg-gold top-1/2 -translate-y-1/2 -z-10 transition-all duration-1000" style="width: ${Math.min(100, (currentIdx - stage.range[0] + (isDead && currentIdx <= stage.range[1] ? 0 : 1)) / (stage.range[1] - stage.range[0] + 1) * 100)}%"></div>` : ''}
        `;

        for(let i = stage.range[0]; i <= stage.range[1]; i++) {
            const q = questionsData[i];
            const isCurrent = i === currentIdx;
            const isPassed = i < currentIdx;

            let nodeClass = "w-3 h-3 rounded-full border-2 border-darker bg-gray-800 z-10";
            let labelClass = "text-[10px] text-gray-600 absolute -bottom-5 left-1/2 -translate-x-1/2 w-max";

            if (isPassed) {
                nodeClass = "w-3 h-3 rounded-full border-2 border-darker bg-gold z-10 shadow-[0_0_8px_rgba(197,160,89,0.8)]";
                labelClass = "text-[10px] text-gold absolute -bottom-5 left-1/2 -translate-x-1/2 w-max";
            } else if (isCurrent) {
                if (isDead) {
                    nodeClass = "w-4 h-4 rounded-full border-2 border-blood bg-blood z-10 animate-pulse-slow shadow-[0_0_12px_rgba(138,3,3,0.9)] flex items-center justify-center text-[8px]";
                    labelClass = "text-[10px] text-blood font-bold absolute -bottom-5 left-1/2 -translate-x-1/2 w-max";
                } else if (state.screen === 'victory') {
                    nodeClass = "w-5 h-5 rounded-full border-2 border-darker bg-gold z-10 animate-pulse-slow shadow-[0_0_20px_rgba(197,160,89,1)] flex items-center justify-center text-[10px]";
                    labelClass = "text-[10px] text-gold font-bold absolute -bottom-5 left-1/2 -translate-x-1/2 w-max";
                } else {
                    nodeClass = "w-4 h-4 rounded-full border-2 border-darker bg-text_main z-10 animate-pulse-slow shadow-[0_0_10px_rgba(226,217,200,0.8)]";
                    labelClass = "text-[10px] text-text_main font-bold absolute -bottom-5 left-1/2 -translate-x-1/2 w-max";
                }
            }

            html += `
                <div class="relative w-[80px] flex justify-center">
                    <div class="${nodeClass}">${isCurrent ? (isDead ? '✕' : state.screen === 'victory' ? '⭐' : '') : ''}</div>
                    <span class="${labelClass}">${q.time}</span>
                </div>
            `;
        }
        html += `</div></div>`;
    });
    html += `</div></div></div></div>`;
    return html;
}

// === 页面渲染函数 ===

// 1. 首页
function renderHome() {
    appContainer.innerHTML = `
        <div class="animate-fade-in flex flex-col items-center justify-center text-center max-w-2xl w-full">
            <div class="mb-4 text-gold text-sm tracking-[0.3em]">LORD OF THE MYSTERIES</div>
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-b from-text_main to-gold_dim tracking-wider drop-shadow-lg font-serif">
                诡秘之主
            </h1>

            <div class="border border-blood/40 bg-blood/5 px-8 py-6 rounded-sm mb-12 shadow-[0_0_30px_rgba(138,3,3,0.15)] relative overflow-hidden">
                <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blood to-transparent"></div>
                <div class="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blood to-transparent"></div>
                <h2 class="text-xl md:text-2xl text-blood font-bold tracking-widest mb-2 flex items-center justify-center gap-2 sm:gap-4">
                    <span aria-hidden="true">☠</span> <span>答错一题，当场死亡</span> <span aria-hidden="true">☠</span>
                </h2>
                <p class="text-text_muted mt-4">你能在诡秘世界活到第几天？</p>
            </div>

            <div class="text-left bg-dark/80 p-6 border border-gray-800 rounded-sm mb-12 w-full text-sm md:text-base leading-relaxed text-gray-400">
                <p class="mb-2">🎭 二十次命运的岔路，每一次抉择都伴随疯狂与失控</p>
                <p class="mb-2">⏳ 从廷根市的无名之辈，到星空之上的真神</p>
                <p>💀 在不可名状的注视下，寻找唯一的生路</p>
            </div>

            <button onclick="startGame()" class="group relative px-12 py-4 bg-dark border border-gold text-gold font-bold tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-300 overflow-hidden">
                <span class="relative z-10">开始挑战</span>
                <div class="absolute inset-0 h-full w-full bg-gold transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></div>
            </button>

            <div class="mt-16 text-gray-600 text-xs italic tracking-widest">
                "愿我们在末日后的世界再次相遇" —— 克莱恩·莫雷蒂
            </div>
            <p class="mt-4 text-text_muted text-xs leading-relaxed">非官方同人小游戏 · 含世界观剧透 · 刷新页面会重新开始</p>
        </div>
    `;
}

// 2. 答题页
function renderPlaying() {
    const q = questionsData[state.currentQIndex];
    // 打乱选项，但保留正确性标识
    const shuffledOptions = shuffleOptions(q.options);
    const letters = ['A', 'B', 'C', 'D'];

    let optionsHtml = shuffledOptions.map((opt, index) => `
        <button type="button" onclick="handleAnswer(${opt.originalIndex}, ${state.currentQIndex})" class="option-btn w-full text-left p-4 md:p-5 border border-gray-800 bg-dark/60 rounded-sm flex gap-4 items-start group hover:bg-dark">
            <span class="text-gold font-bold mt-0.5">${letters[index]}.</span>
            <span class="text-gray-300 group-hover:text-text_main transition-colors leading-relaxed">${opt.text}</span>
        </button>
    `).join('');

    // 第一题不显示存活时间提示，从第二题开始显示
    const survivalTimeHtml = state.currentQIndex > 0
        ? `<div class="mb-4 inline-flex px-3 py-1 bg-dark border border-gold/30 text-gold text-xs rounded-sm self-start shadow-[0_0_10px_rgba(197,160,89,0.1)]">
            存活时间：坚持了【${q.time}】
           </div>`
        : '';

    appContainer.innerHTML = `
        <div class="animate-slide-up w-full max-w-3xl flex flex-col">
            <div class="flex justify-between items-center mb-6 text-sm text-gray-500 font-serif border-b border-gray-800 pb-4">
                <span class="tracking-widest">诡秘生存挑战</span>
                <span class="text-gold">第 ${state.currentQIndex + 1}/${questionsData.length} 题</span>
            </div>

            ${survivalTimeHtml}

            <div class="bg-gradient-to-b from-darker to-dark border border-gray-800 p-6 md:p-8 rounded-sm mb-8 relative">
                <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
                <p class="text-lg md:text-xl text-text_main leading-loose font-serif">
                    ${q.desc}
                </p>
            </div>

            <div class="flex flex-col gap-4">
                ${optionsHtml}
            </div>

            ${renderTimeline(state.currentQIndex)}
        </div>
    `;
}

// 3. 死亡结算页
function renderDeath() {
    const q = questionsData[state.currentQIndex];
    const opt = q.options[state.deathOption];
    const hasAchievement = opt.achievement;

    let achievementHtml = '';
    if (hasAchievement) {
        achievementHtml = `
            <div class="mt-6 border border-gold bg-gold/5 p-5 rounded-sm relative overflow-hidden animate-fade-in" style="animation-delay: 0.3s">
                <div class="absolute -right-4 -top-4 text-gold/10 text-6xl rotate-12">🏆</div>
                <h3 class="text-gold font-bold mb-2 flex items-center gap-2">
                    <span class="text-xl">🏆</span> 解锁成就：【${hasAchievement.name}】
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed">${hasAchievement.desc}</p>
            </div>
        `;
    }

    appContainer.innerHTML = `
        <div class="animate-fade-in w-full max-w-2xl flex flex-col items-center">
            <h1 class="text-5xl md:text-6xl text-blood font-black mb-6 tracking-widest drop-shadow-[0_0_15px_rgba(138,3,3,0.8)] font-serif">你死了</h1>

            <div class="text-center mb-10">
                <div class="text-gray-500 text-sm mb-2">存活时间</div>
                <div class="text-4xl text-text_main font-bold mb-1">${q.time}</div>
                <div class="text-gold_dim tracking-widest text-sm">「${q.label}」</div>
            </div>

            <div class="w-full bg-dark border border-gray-800 p-6 rounded-sm mb-8 text-left relative">
                <div class="absolute top-0 left-0 w-[4px] h-full bg-blood"></div>
                <h3 class="text-blood font-bold mb-4 tracking-widest text-lg">💀 死亡回放</h3>
                <p class="text-gray-500 text-sm mb-2">你选择了：</p>
                <p class="text-text_main mb-4 p-3 bg-black/50 border border-gray-800 rounded-sm">"${opt.text}"</p>
                <p class="text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
                    ${opt.reason}
                </p>
                ${achievementHtml}
            </div>

            <div class="w-full mb-10 border border-gray-800 bg-dark/50 p-4 rounded-sm">
                <h3 class="text-gray-400 text-xs font-bold tracking-widest mb-4">📍 你的时间轴</h3>
                ${renderTimeline(state.currentQIndex, true)}
            </div>

            <div class="flex gap-4 w-full justify-center flex-wrap">
                <button onclick="retryCurrent()" class="px-8 py-3 bg-gold/10 border border-gold text-gold hover:bg-gold hover:text-black transition-colors tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(197,160,89,0.2)]">
                    向愚者祈祷奇迹
                </button>
                <button onclick="goHome()" class="px-8 py-3 bg-blood/10 border border-blood text-blood hover:bg-blood hover:text-white transition-colors tracking-widest text-sm font-bold shadow-[0_0_15px_rgba(138,3,3,0.2)]">
                    结束
                </button>
            </div>
        </div>
    `;
}

// 4. 通关页
function renderVictory() {
    // 获取最后一题的正确选项及其成就
    const lastQ = questionsData[questionsData.length - 1];
    const correctOpt = lastQ.options.find(o => o.isCorrect);
    const hasAchievement = correctOpt.achievement;

    let achievementHtml = '';
    if (hasAchievement) {
        achievementHtml = `
            <div class="w-full mb-10 border border-gold bg-gold/5 p-5 rounded-sm relative overflow-hidden animate-fade-in text-left shadow-[0_0_15px_rgba(197,160,89,0.15)]" style="animation-delay: 0.3s">
                <div class="absolute -right-4 -top-4 text-gold/10 text-6xl rotate-12">🏆</div>
                <h3 class="text-gold font-bold mb-2 flex items-center gap-2">
                    <span class="text-xl">🏆</span> 解锁真神成就：【${hasAchievement.name}】
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed">${hasAchievement.desc}</p>
            </div>
        `;
    }

    appContainer.innerHTML = `
        <div class="animate-slide-up w-full max-w-3xl flex flex-col items-center">
            <div class="text-gold text-6xl mb-4 animate-pulse-slow">👑</div>

            <div class="flex flex-col items-center text-center w-full mb-8">
                <h1 class="text-4xl md:text-5xl text-gold font-black mb-3 tracking-widest drop-shadow-[0_0_15px_rgba(197,160,89,0.5)] font-serif">恭喜存活</h1>
                <p class="text-text_main text-lg tracking-widest">你成为了传说中的真神</p>
            </div>

            ${achievementHtml}

            <div class="w-full bg-dark border border-gold p-6 rounded-sm mb-10 text-left relative shadow-[0_0_30px_rgba(197,160,89,0.1)]">
                <h3 class="text-gold font-bold mb-6 tracking-widest text-lg text-center">✨ 完整生存时间轴 ✨</h3>
                <p class="text-gray-400 text-center text-sm mb-6">你跨过了${questionsData.length}次命运的岔路，走出了疯狂与死亡的深渊。</p>
                ${renderTimeline(questionsData.length - 1)}
            </div>

            <div class="flex gap-4 w-full justify-center">
                <button onclick="goHome()" class="px-8 py-3 bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white transition-colors tracking-widest text-sm">
                    重新体验
                </button>
            </div>
        </div>
    `;

}

// === 交互逻辑 ===

function goHome() {
    if (state.isTransitioning) return;
    state.screen = 'home';
    state.currentQIndex = 0;
    state.deathOption = null;
    updateView();
}

function startGame() {
    if (state.isTransitioning || state.screen !== 'home') return;
    state.screen = 'playing';
    state.currentQIndex = 0;
    state.deathOption = null;
    updateView();
}

function retryCurrent() {
    if (state.isTransitioning || state.screen !== 'death') return;
    state.screen = 'playing';
    state.deathOption = null;
    updateView();
}

function handleAnswer(optIndex, questionIndex) {
    // 一次只接收当前题的一次回答，防止转场期间连点或旧按钮跳题。
    if (state.isTransitioning || state.screen !== 'playing' || questionIndex !== state.currentQIndex) return;
    const q = questionsData[state.currentQIndex];
    if (!Number.isInteger(optIndex) || !q.options[optIndex]) return;
    const opt = q.options[optIndex];

    if (opt.isCorrect) {
        if (state.currentQIndex === questionsData.length - 1) {
            // 通关
            state.screen = 'victory';
        } else {
            // 下一题
            state.currentQIndex++;
        }
    } else {
        // 死亡
        state.deathOption = optIndex;
        state.screen = 'death';
    }
    updateView();
}

function updateView(animate = true) {
    state.isTransitioning = true;
    appContainer.setAttribute('aria-busy', 'true');
    appContainer.querySelectorAll('button').forEach(button => { button.disabled = true; });
    appContainer.style.opacity = '0';
    setTimeout(() => {
        switch (state.screen) {
            case 'home': renderHome(); break;
            case 'playing': renderPlaying(); break;
            case 'death': renderDeath(); break;
            case 'victory': renderVictory(); break;
        }
        appContainer.style.opacity = '1';
        state.isTransitioning = false;
        appContainer.setAttribute('aria-busy', 'false');
        if (animate) {
            appContainer.focus({ preventScroll: true });
            window.scrollTo({ top: 0, behavior: 'instant' });
        }

        // 自动滚动时间轴到当前视口位置
        const scrollContainer = document.querySelector('.timeline-scroll');
        if (scrollContainer && state.currentQIndex > 2) {
            // 粗略计算滚动位置
            scrollContainer.scrollLeft = (state.currentQIndex - 2) * 80;
        }
    }, animate && !reducedMotion.matches ? 300 : 0);
}

// === 初始化 ===
updateView(false);
