const gameBoard = document.getElementById('game-board');
const guessBtn = document.getElementById('guess-btn');
const restartBtn = document.getElementById('restart-btn');
const currentPlayerMessage = document.getElementById('current-player-message');
const timerElement = document.getElementById('timer');
const audioElement = document.getElementById('background-audio');
const toggleAudioBtn = document.getElementById('toggle-audio');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');

// قائمة بأسماء لاعبي كرة القدم الحقيقية
const footballPlayers = [
    "محمد صلاح", "ليونيل ميسي", "كريستيانو رونالدو", "نيمار", "كيليان مبابي", "إيدن هازارد", 
    "فان دايك", "ديفيد بيكهام", "زين الدين زيدان", "داني ألفيس", "سيرجيو راموس", "أندريس إنييستا", 
    "جاريث بيل", "فرانشيسكو توتي", "روبرتو كارلوس", "أوليغ كونونوف", "دييغو مارادونا", "رونالدينيو", 
    "واين روني", "سامي الجابر", "ياسر القحطاني", "إبراهيموفيتش", "أندريه شيفتشينكو", "أريين روبن",
    // أكمل باقي الأسماء حتى تصل إلى 160 لاعبًا
];

let cards = [];
let selectedCards = [];
let currentPlayer = 1; // 1 = Player 1, 2 = Player 2
let playerSelections = { player1: null, player2: null };
let timerInterval;
let isAudioPlaying = true;
let scores = { player1: 0, player2: 0 };

// إنشاء 160 كارت مع أسماء لاعبي كرة القدم
for (let i = 0; i < 160; i++) {
    cards.push({
        id: i + 1,
        player: footballPlayers[i % footballPlayers.length], // استخدام الأسماء من القائمة
        color: (i % 2 === 0) ? 'red' : 'blue', // تغيير اللون بناءً على الرقم
    });
}

// اختيار 40 كارت عشوائيًا
function shuffleAndSelect() {
    const shuffled = cards.sort(() => Math.random() - 0.5);
    selectedCards = shuffled.slice(0, 40);
}

// عرض الكروت
function displayCards(enableSelection = true) {
    gameBoard.innerHTML = '';
    selectedCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.className = `card ${card.color}`;
        cardElement.innerHTML = card.player; // اسم اللاعب
        if (enableSelection) {
            cardElement.addEventListener('click', () => selectCard(card, cardElement));
        }
        gameBoard.appendChild(cardElement);
    });
}

// اختيار الكارت
function selectCard(card, cardElement) {
    if (currentPlayer === 1) {
        playerSelections.player1 = card;
        currentPlayerMessage.textContent = 'اللاعب الثاني، اختر الكارت!';
        currentPlayer = 2;
    } else if (currentPlayer === 2) {
        playerSelections.player2 = card;
        startRound();
    }
    cardElement.style.border = '3px solid gold';
}

// بدء الجولة
function startRound() {
    currentPlayerMessage.textContent = 'الجولة بدأت! حان وقت التخمين.';
    displayCards(false);
    guessBtn.disabled = false;
}

// التخمين
guessBtn.addEventListener('click', () => {
    const guessedCard = prompt('اختر اسم اللاعب الذي تظن أنه صحيح:');
    const selectedPlayer = currentPlayer === 1 ? playerSelections.player2 : playerSelections.player1;

    if (guessedCard && selectedPlayer.player === guessedCard) {
        alert('تخمين صحيح! الجولة انتهت.');
        scores[`player${currentPlayer}`]++;
        updateScores();
        resetGame();
    } else {
        alert('تخمين خاطئ! استمر في المحاولة.');
    }
});

// إعادة تشغيل اللعبة
restartBtn.addEventListener('click', resetGame);

// إعادة ضبط اللعبة
function resetGame() {
    currentPlayer = 1;
    playerSelections = { player1: null, player2: null };
    shuffleAndSelect();
    displayCards();
    currentPlayerMessage.textContent = 'اللاعب الأول، اختر الكارت!';
}

// تحديث النقاط
function updateScores() {
    player1Score.textContent = scores.player1;
    player2Score.textContent = scores.player2;
}

// تشغيل/إيقاف الصوت
toggleAudioBtn.addEventListener('click', () => {
    if (isAudioPlaying) {
        audioElement.pause();
        toggleAudioBtn.textContent = 'تشغيل الصوت';
    } else {
        audioElement.play();
        toggleAudioBtn.textContent = 'إيقاف الصوت';
    }
    isAudioPlaying = !isAudioPlaying;
});

// بدء اللعبة
window.onload = () => {
    shuffleAndSelect();
    displayCards();
};
