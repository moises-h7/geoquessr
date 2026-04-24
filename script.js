/* ============================================
   GeoQuessr — Game Logic (RestCountries API)
   Arquivo: script.js  →  usado por quiz.html
   Sistema de vidas · Modal de saída · Botão Home
   ============================================ */

const API_URL       = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion';
const TOTAL_QUESTIONS = 10;
const OPTIONS_COUNT   = 4;
const MAX_LIVES       = 3;

// ---- Estado ----
let countries       = [];
let currentQuestion = 0;
let score           = 0;
let lives           = MAX_LIVES;
let questions       = [];
let gameStartTime   = 0;
let hintUsed        = false;

// ---- DOM Refs ----
const $ = (sel) => document.querySelector(sel);

const quizScreen      = $('#quiz-screen');
const resultScreen    = $('#result-screen');
const modalQuit       = $('#modal-quit');

const btnQuit         = $('#btn-quit');
const btnConfirmQuit  = $('#btn-confirm-quit');
const btnCancelQuit   = $('#btn-cancel-quit');
const btnRestart      = $('#btn-restart');
const btnHint         = $('#btn-hint');

const flagImage       = $('#flag-image');
const flagSkeleton    = $('#flag-skeleton');
const optionsGrid     = $('#options-grid');
const questionCounter = $('#question-counter');
const scoreDisplay    = $('#score-display');
const livesDisplay    = $('#lives-display');
const progressBar     = $('#progress-bar');
const hintText        = $('#hint-text');

// ---- Telas ----
function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    requestAnimationFrame(() => screen.classList.add('active'));
}

// ---- Modal de saída ----
function openQuitModal() {
    modalQuit.classList.remove('hidden');
    modalQuit.classList.add('visible');
    btnCancelQuit.focus();
}

function closeQuitModal() {
    modalQuit.classList.remove('visible');
    modalQuit.classList.add('hidden');
}

btnQuit.addEventListener('click', openQuitModal);

btnCancelQuit.addEventListener('click', closeQuitModal);

btnConfirmQuit.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Fechar modal com Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalQuit.classList.contains('hidden')) {
        closeQuitModal();
    }
});

// Fechar modal clicando no overlay
modalQuit.addEventListener('click', (e) => {
    if (e.target === modalQuit) closeQuitModal();
});

// ---- Fetch de países ----
async function fetchCountries() {
    try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        const data = await res.json();

        countries = data.filter(c =>
            c.flags && c.flags.svg &&
            c.name  && c.name.common &&
            c.name.common.length > 0
        );

        startGame();
    } catch (err) {
        console.error('Erro ao carregar dados:', err);
        document.body.innerHTML = `
            <main style="display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;gap:16px;font-family:Inter,sans-serif;">
                <p style="font-size:1.1rem;color:#9b3a2a;">Erro ao carregar os dados da API.</p>
                <a href="index.html" style="color:#4a2c1a;text-decoration:underline;">← Voltar ao início</a>
            </main>`;
    }
}

// ---- Shuffle ----
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// ---- Geração de perguntas ----
function generateQuestions() {
    const pool = shuffle(countries);
    questions  = [];

    for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        const correct      = pool[i];
        const wrongPool    = pool.filter((_, idx) => idx !== i);
        const wrongOptions = shuffle(wrongPool).slice(0, OPTIONS_COUNT - 1);
        const options      = shuffle([correct, ...wrongOptions]);

        questions.push({
            country:      correct,
            options,
            correctIndex: options.indexOf(correct)
        });
    }
}

// ---- Vidas ----
function renderLives() {
    const hearts = [];
    for (let i = 0; i < MAX_LIVES; i++) {
        hearts.push(i < lives ? '❤️' : '🖤');
    }
    livesDisplay.textContent = hearts.join(' ');
}

function loseLife() {
    lives--;
    renderLives();
    livesDisplay.classList.remove('lost-life');
    void livesDisplay.offsetWidth; // reflow para reiniciar animação
    livesDisplay.classList.add('lost-life');
}

// ---- Renderizar pergunta ----
function renderQuestion() {
    const q = questions[currentQuestion];

    questionCounter.textContent = `${currentQuestion + 1} / ${TOTAL_QUESTIONS}`;
    scoreDisplay.textContent    = `⭐ ${score}`;
    progressBar.style.width     = `${(currentQuestion / TOTAL_QUESTIONS) * 100}%`;
    progressBar.parentElement.setAttribute('aria-valuenow', Math.round((currentQuestion / TOTAL_QUESTIONS) * 100));
    renderLives();

    // Resetar dica
    hintUsed = false;
    btnHint.disabled = false;
    hintText.classList.remove('visible');
    hintText.textContent = '';

    // Carregar bandeira
    flagImage.classList.remove('loaded');
    flagSkeleton.classList.remove('hidden');
    flagImage.src = '';
    flagImage.alt = 'Bandeira do país a ser identificado';

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        flagImage.src = img.src;
        flagImage.classList.add('loaded');
        flagSkeleton.classList.add('hidden');
    };
    img.onerror = () => {
        flagImage.src = q.country.flags.png || '';
        flagImage.classList.add('loaded');
        flagSkeleton.classList.add('hidden');
    };
    img.src = q.country.flags.svg;

    // Renderizar opções
    const letters = ['A', 'B', 'C', 'D'];
    optionsGrid.innerHTML = '';

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.setAttribute('aria-label', `Opção ${letters[i]}: ${opt.name.common}`);
        btn.innerHTML = `<span class="option-letter" aria-hidden="true">${letters[i]}</span>${opt.name.common}`;
        btn.addEventListener('click', () => handleAnswer(i));
        btn.style.animationDelay = `${i * 0.06}s`;
        optionsGrid.appendChild(btn);
    });
}

// ---- Resposta ----
function handleAnswer(selectedIndex) {
    const q       = questions[currentQuestion];
    const buttons = optionsGrid.querySelectorAll('.option-btn');
    const isCorrect = selectedIndex === q.correctIndex;

    buttons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
        score++;
        scoreDisplay.textContent = `⭐ ${score}`;
        buttons[selectedIndex].classList.add('correct');
        buttons[selectedIndex].setAttribute('aria-label', 'Correto!');
    } else {
        buttons[selectedIndex].classList.add('wrong');
        buttons[q.correctIndex].classList.add('correct');
        buttons[selectedIndex].setAttribute('aria-label', 'Errado!');
        loseLife();
    }

    buttons.forEach((btn, i) => {
        if (i !== q.correctIndex && i !== selectedIndex) {
            btn.classList.add('dimmed');
        }
    });

    if (lives <= 0) {
        setTimeout(() => showResults(), 1800);
    } else {
        setTimeout(() => nextQuestion(), 1600);
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion >= TOTAL_QUESTIONS) {
        showResults();
    } else {
        renderQuestion();
    }
}

// ---- Dica ----
function showHint() {
    if (hintUsed) return;
    hintUsed = true;
    btnHint.disabled = true;

    const q       = questions[currentQuestion];
    const country = q.country;
    const hints   = [];

    if (country.region)                                hints.push(`Região: ${country.region}`);
    if (country.subregion)                             hints.push(`Sub-região: ${country.subregion}`);
    if (country.capital && country.capital.length > 0) hints.push(`Capital: ${country.capital[0]}`);

    const hint = hints[Math.floor(Math.random() * hints.length)] || 'Sem dica disponível';
    hintText.textContent = hint;
    hintText.classList.add('visible');
}

// ---- Resultados ----
function showResults() {
    const elapsed = Math.round((Date.now() - gameStartTime) / 1000);
    const pct     = Math.round((score / TOTAL_QUESTIONS) * 100);

    let emoji, title;
    if (pct === 100)    { emoji = '🏆'; title = 'Perfeito!'; }
    else if (pct >= 80) { emoji = '🔥'; title = 'Incrível!'; }
    else if (pct >= 60) { emoji = '😎'; title = 'Muito Bom!'; }
    else if (pct >= 40) { emoji = '🤔'; title = 'Quase lá!'; }
    else if (lives <= 0){ emoji = '💀'; title = 'Sem vidas!'; }
    else                { emoji = '📚'; title = 'Estude mais!'; }

    $('#result-emoji').textContent    = emoji;
    $('#result-title').textContent    = title;
    $('#result-subtitle').textContent = `Você acertou ${score} de ${TOTAL_QUESTIONS}!`;
    $('#stat-correct').textContent    = score;
    $('#stat-wrong').textContent      = TOTAL_QUESTIONS - score;
    $('#stat-time').textContent       = elapsed < 60
        ? `${elapsed}s`
        : `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

    // Anel animado
    const circumference = 2 * Math.PI * 52;
    const offset        = circumference - (pct / 100) * circumference;
    const ringFill      = $('#ring-fill');

    const svg = document.querySelector('.score-ring-svg');
    if (!svg.querySelector('defs')) {
        const defs  = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const grad  = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        grad.id = 'ring-gradient';
        grad.setAttribute('x1', '0%'); grad.setAttribute('y1', '0%');
        grad.setAttribute('x2', '100%'); grad.setAttribute('y2', '0%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%'); stop1.setAttribute('stop-color', '#4a2c1a');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%'); stop2.setAttribute('stop-color', '#b07050');

        grad.append(stop1, stop2);
        defs.append(grad);
        svg.prepend(defs);
        ringFill.setAttribute('stroke', 'url(#ring-gradient)');
    }

    ringFill.style.strokeDashoffset = circumference;
    showScreen(resultScreen);

    setTimeout(() => {
        ringFill.style.strokeDashoffset = offset;
        animateCounter($('#ring-label'), 0, pct, 1000, v => `${v}%`);
    }, 400);
}

function animateCounter(el, from, to, duration, format) {
    const start = performance.now();
    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        const value    = Math.round(from + (to - from) * ease);
        el.textContent = format(value);
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ---- Fluxo do jogo ----
function startGame() {
    currentQuestion = 0;
    score           = 0;
    lives           = MAX_LIVES;
    hintUsed        = false;
    gameStartTime   = Date.now();
    generateQuestions();
    showScreen(quizScreen);
    setTimeout(() => renderQuestion(), 300);
}

// ---- Eventos ----
btnRestart.addEventListener('click', startGame);
btnHint.addEventListener('click', showHint);

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
    if (!quizScreen.classList.contains('active')) return;

    const buttons = optionsGrid.querySelectorAll('.option-btn:not(:disabled)');
    const keyMap  = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
    const idx     = keyMap[e.key.toLowerCase()];

    if (idx !== undefined && buttons[idx]) buttons[idx].click();
    if (e.key.toLowerCase() === 'h') btnHint.click();
    if (e.key.toLowerCase() === 'q') btnQuit.click();
});

// ---- Init — o quiz começa automaticamente ----
fetchCountries();
