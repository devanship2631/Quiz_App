// BRAIN//SPARK - MAIN SCRIPT
// Quiz application logic

// ============================================
// STATE MANAGEMENT
// ============================================

const state = {
    selectedCategory: null,
    currentQuestionIndex: 0,
    score: 0,
    totalScore: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    currentQuestions: [],
    userAnswers: [],
    selectedAnswer: null,
    answerSubmitted: false
};

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    // Sections
    welcomeSection: document.getElementById('welcomeSection'),
    quizSection: document.getElementById('quizSection'),
    resultsSection: document.getElementById('resultsSection'),
    dashboardSection: document.getElementById('dashboardSection'),
    
    // Navigation
    navLinks: document.querySelectorAll('.nav-link'),
    
    // Welcome
    categoryCards: document.querySelectorAll('.category-card'),
    startButton: document.getElementById('startButton'),
    
    // Quiz
    questionCategory: document.getElementById('questionCategory'),
    questionNumber: document.getElementById('questionNumber'),
    questionText: document.getElementById('questionText'),
    answersGrid: document.getElementById('answersGrid'),
    progressFill: document.getElementById('progressFill'),
    progressText: document.getElementById('progressText'),
    quizScore: document.getElementById('quizScore'),
    skipButton: document.getElementById('skipButton'),
    submitButton: document.getElementById('submitButton'),
    
    // Results
    finalScore: document.getElementById('finalScore'),
    correctCount: document.getElementById('correctCount'),
    incorrectCount: document.getElementById('incorrectCount'),
    accuracyPercent: document.getElementById('accuracyPercent'),
    resultsMessage: document.getElementById('resultsMessage'),
    breakdownList: document.getElementById('breakdownList'),
    newCategoryButton: document.getElementById('newCategoryButton'),
    retryButton: document.getElementById('retryButton'),
    
    // Dashboard
    totalQuizzes: document.getElementById('totalQuizzes'),
    totalPoints: document.getElementById('totalPoints'),
    avgAccuracy: document.getElementById('avgAccuracy'),
    bestCategory: document.getElementById('bestCategory'),
    historyList: document.getElementById('historyList'),
    emptyState: document.getElementById('emptyState'),
    clearHistoryBtn: document.getElementById('clearHistoryBtn'),
    
    // Nav
    navScore: document.getElementById('navScore')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatScore(score) {
    return score.toString().padStart(4, '0');
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav links
    elements.navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Local Storage Functions
function getQuizHistory() {
    const history = localStorage.getItem('brainSparkHistory');
    return history ? JSON.parse(history) : [];
}

function saveQuizResult(result) {
    const history = getQuizHistory();
    history.unshift(result); // Add to beginning
    localStorage.setItem('brainSparkHistory', JSON.stringify(history));
}

function clearQuizHistory() {
    localStorage.removeItem('brainSparkHistory');
    loadDashboard();
}

// ============================================
// NAVIGATION
// ============================================

elements.navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const sectionId = this.dataset.section;
        showSection(sectionId);
        
        // Load dashboard if switching to it
        if (sectionId === 'dashboardSection') {
            loadDashboard();
        }
    });
});

// ============================================
// CATEGORY SELECTION
// ============================================

elements.categoryCards.forEach(card => {
    card.addEventListener('click', function() {
        // Remove selection from all cards
        elements.categoryCards.forEach(c => c.classList.remove('selected'));
        
        // Select this card
        this.classList.add('selected');
        state.selectedCategory = this.dataset.category;
        
        // Enable start button
        elements.startButton.disabled = false;
    });
});

// ============================================
// START QUIZ
// ============================================

elements.startButton.addEventListener('click', startQuiz);
elements.retryButton.addEventListener('click', startQuiz);

function startQuiz() {
    if (!state.selectedCategory) return;
    
    // Reset state
    state.currentQuestionIndex = 0;
    state.score = 0;
    state.correctAnswers = 0;
    state.incorrectAnswers = 0;
    state.userAnswers = [];
    state.selectedAnswer = null;
    state.answerSubmitted = false;
    
    // Get and shuffle questions for this category
    const categoryQuestions = window.quizDatabase[state.selectedCategory];
    state.currentQuestions = shuffleArray(categoryQuestions);
    
    // Update UI
    updateNavScore();
    showSection('quizSection');
    loadQuestion();
}

// ============================================
// LOAD QUESTION
// ============================================

function loadQuestion() {
    if (state.currentQuestionIndex >= state.currentQuestions.length) {
        showResults();
        return;
    }
    
    const question = state.currentQuestions[state.currentQuestionIndex];
    state.selectedAnswer = null;
    state.answerSubmitted = false;
    
    // Update question info
    elements.questionCategory.textContent = state.selectedCategory.toUpperCase();
    elements.questionNumber.textContent = `QUESTION ${(state.currentQuestionIndex + 1).toString().padStart(2, '0')}`;
    elements.questionText.textContent = question.question;
    
    // Update progress
    const progress = ((state.currentQuestionIndex) / state.currentQuestions.length) * 100;
    elements.progressFill.style.width = progress + '%';
    elements.progressText.textContent = `${(state.currentQuestionIndex + 1).toString().padStart(2, '0')}/${state.currentQuestions.length.toString().padStart(2, '0')}`;
    
    // Update score display
    elements.quizScore.textContent = formatScore(state.score);
    
    // Load answers
    elements.answersGrid.innerHTML = '';
    question.answers.forEach((answer, index) => {
        const answerDiv = document.createElement('div');
        answerDiv.className = 'answer-option';
        answerDiv.innerHTML = `
            <div class="answer-letter">${String.fromCharCode(65 + index)}</div>
            <div class="answer-text">${answer}</div>
        `;
        answerDiv.addEventListener('click', () => selectAnswer(index, answerDiv));
        elements.answersGrid.appendChild(answerDiv);
    });
    
    // Reset button states
    elements.submitButton.disabled = true;
    elements.skipButton.disabled = false;
}

// ============================================
// ANSWER SELECTION
// ============================================

function selectAnswer(index, element) {
    if (state.answerSubmitted) return; // Prevent selection after answer is submitted
    
    // Remove selection from all answers
    document.querySelectorAll('.answer-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Select this answer
    element.classList.add('selected');
    state.selectedAnswer = index;
    
    // Enable submit button
    elements.submitButton.disabled = false;
}

// ============================================
// SUBMIT ANSWER
// ============================================

elements.submitButton.addEventListener('click', () => submitAnswer(false));
elements.skipButton.addEventListener('click', () => submitAnswer(true));

function submitAnswer(skipped = false) {
    if (state.answerSubmitted) return; // Prevent double submission
    
    const question = state.currentQuestions[state.currentQuestionIndex];
    const userAnswer = skipped ? null : state.selectedAnswer;
    const correctAnswer = question.correctAnswer;
    const isCorrect = userAnswer === correctAnswer;
    
    state.answerSubmitted = true;
    
    // Calculate points
    let points = 0;
    if (isCorrect) {
        points = 100;
        state.correctAnswers++;
        state.score += points;
    } else {
        state.incorrectAnswers++;
    }
    
    // Store answer
    state.userAnswers.push({
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
        isCorrect: isCorrect,
        skipped: skipped
    });
    
    // Update score display
    elements.quizScore.textContent = formatScore(state.score);
    updateNavScore();
    
    // Show answer feedback directly in the UI
    showAnswerFeedback(isCorrect, correctAnswer, userAnswer, skipped);
}

// ============================================
// SHOW ANSWER FEEDBACK (NO MODAL)
// ============================================

function showAnswerFeedback(isCorrect, correctAnswer, userAnswer, skipped) {
    const allAnswers = document.querySelectorAll('.answer-option');
    
    // Disable all answer options
    allAnswers.forEach((opt, index) => {
        opt.classList.add('disabled');
        opt.style.pointerEvents = 'none';
        
        // Show correct answer
        if (index === correctAnswer) {
            opt.classList.add('correct');
        }
        
        // Show incorrect answer if user selected wrong
        if (!isCorrect && !skipped && index === userAnswer) {
            opt.classList.add('incorrect');
        }
    });
    
    // Disable skip button and change submit button to "Next"
    elements.skipButton.disabled = true;
    elements.submitButton.disabled = false;
    elements.submitButton.innerHTML = `
        <span>NEXT QUESTION</span>
        <span class="button-arrow">→</span>
    `;
    
    // Update submit button action to go to next question
    elements.submitButton.onclick = () => {
        state.currentQuestionIndex++;
        
        // Reset submit button
        elements.submitButton.innerHTML = `
            <span>SUBMIT ANSWER</span>
            <span class="button-arrow">→</span>
        `;
        elements.submitButton.onclick = null;
        elements.submitButton.addEventListener('click', () => submitAnswer(false));
        
        loadQuestion();
    };
}

// ============================================
// UPDATE NAV SCORE
// ============================================

function updateNavScore() {
    const scoreValue = elements.navScore.querySelector('.score-value');
    scoreValue.textContent = formatScore(state.score);
}

// ============================================
// SHOW RESULTS
// ============================================

function showResults() {
    const totalQuestions = state.currentQuestions.length;
    const accuracy = Math.round((state.correctAnswers / totalQuestions) * 100);
    
    // Update results display
    elements.finalScore.textContent = formatScore(state.score);
    elements.correctCount.textContent = state.correctAnswers.toString().padStart(2, '0');
    elements.incorrectCount.textContent = state.incorrectAnswers.toString().padStart(2, '0');
    elements.accuracyPercent.textContent = accuracy + '%';
    
    // Performance message
    let message = '';
    if (accuracy === 100) {
        message = 'PERFECT SCORE! // EXCEPTIONAL MASTERY';
    } else if (accuracy >= 80) {
        message = 'OUTSTANDING! // EXCELLENT PERFORMANCE';
    } else if (accuracy >= 70) {
        message = 'WELL DONE! // STRONG KNOWLEDGE';
    } else if (accuracy >= 60) {
        message = 'GOOD EFFORT! // ROOM FOR GROWTH';
    } else if (accuracy >= 50) {
        message = 'DECENT START! // KEEP LEARNING';
    } else {
        message = 'CHALLENGE ACCEPTED! // PRACTICE MORE';
    }
    elements.resultsMessage.textContent = message;
    
    // Question breakdown
    elements.breakdownList.innerHTML = '';
    state.userAnswers.forEach((answer, index) => {
        const question = state.currentQuestions[index];
        const item = document.createElement('div');
        item.className = `breakdown-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        
        let statusText = answer.isCorrect ? 'CORRECT' : 'WRONG';
        if (answer.skipped) statusText = 'SKIPPED';
        
        item.innerHTML = `
            <div class="breakdown-question">
                <div class="breakdown-q-number">Q${(index + 1).toString().padStart(2, '0')}</div>
                <div class="breakdown-q-text">${answer.question}</div>
            </div>
            <div class="breakdown-answer">
                ${answer.skipped ? 'Skipped' : `Your answer: ${question.answers[answer.userAnswer]}`}
            </div>
            <div class="breakdown-correct">Correct: ${question.answers[answer.correctAnswer]}</div>
            <div class="breakdown-status ${answer.isCorrect ? 'correct' : 'incorrect'}">${statusText}</div>
        `;
        elements.breakdownList.appendChild(item);
    });
    
    // Save result to history
    const result = {
        date: new Date().toISOString(),
        category: state.selectedCategory,
        score: state.score,
        correct: state.correctAnswers,
        incorrect: state.incorrectAnswers,
        total: totalQuestions,
        accuracy: accuracy
    };
    saveQuizResult(result);
    
    showSection('resultsSection');
}

// ============================================
// DASHBOARD
// ============================================

function loadDashboard() {
    const history = getQuizHistory();
    
    if (history.length === 0) {
        elements.emptyState.classList.remove('hidden');
        elements.historyList.innerHTML = '';
        elements.totalQuizzes.textContent = '0';
        elements.totalPoints.textContent = '0000';
        elements.avgAccuracy.textContent = '0%';
        elements.bestCategory.textContent = '—';
        return;
    }
    
    elements.emptyState.classList.add('hidden');
    
    // Calculate overview stats
    const totalQuizzes = history.length;
    const totalPoints = history.reduce((sum, item) => sum + item.score, 0);
    const avgAccuracy = Math.round(
        history.reduce((sum, item) => sum + item.accuracy, 0) / totalQuizzes
    );
    
    // Find best category
    const categoryScores = {};
    history.forEach(item => {
        if (!categoryScores[item.category]) {
            categoryScores[item.category] = { total: 0, count: 0 };
        }
        categoryScores[item.category].total += item.accuracy;
        categoryScores[item.category].count += 1;
    });
    
    let bestCategory = '—';
    let bestAvg = 0;
    for (const [category, data] of Object.entries(categoryScores)) {
        const avg = data.total / data.count;
        if (avg > bestAvg) {
            bestAvg = avg;
            bestCategory = category.toUpperCase();
        }
    }
    
    // Update overview
    elements.totalQuizzes.textContent = totalQuizzes;
    elements.totalPoints.textContent = formatScore(totalPoints);
    elements.avgAccuracy.textContent = avgAccuracy + '%';
    elements.bestCategory.textContent = bestCategory;
    
    // Render history list
    elements.historyList.innerHTML = '';
    history.forEach((item, index) => {
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.innerHTML = `
            <div class="history-date">${formattedDate}</div>
            <div class="history-category">
                <span class="category-badge">${item.category.toUpperCase()}</span>
            </div>
            <div class="history-stats">
                <div class="stat-small">
                    <div class="stat-small-value">${item.correct}/${item.total}</div>
                    <div class="stat-small-label">CORRECT</div>
                </div>
                <div class="stat-small">
                    <div class="stat-small-value">${item.accuracy}%</div>
                    <div class="stat-small-label">ACCURACY</div>
                </div>
            </div>
            <div class="history-score">${formatScore(item.score)}</div>
        `;
        elements.historyList.appendChild(historyItem);
    });
}

elements.clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all quiz history?')) {
        clearQuizHistory();
    }
});

// ============================================
// RESULTS ACTIONS
// ============================================

elements.newCategoryButton.addEventListener('click', () => {
    // Reset category selection
    elements.categoryCards.forEach(card => card.classList.remove('selected'));
    state.selectedCategory = null;
    elements.startButton.disabled = true;
    
    // Reset total score
    state.totalScore = 0;
    updateNavScore();
    
    showSection('welcomeSection');
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    const currentSection = document.querySelector('.section.active').id;
    
    if (currentSection === 'quizSection' && !state.answerSubmitted) {
        // A, B, C, D for answer selection
        if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
            const index = e.key.toLowerCase().charCodeAt(0) - 97;
            const answers = document.querySelectorAll('.answer-option');
            if (answers[index]) {
                selectAnswer(index, answers[index]);
            }
        }
        
        // Enter to submit
        if (e.key === 'Enter' && !elements.submitButton.disabled) {
            submitAnswer();
        }
        
        // S to skip
        if (e.key.toLowerCase() === 's') {
            submitAnswer(true);
        }
    }
});

// ============================================
// INITIALIZE
// ============================================

// Load dashboard on page load
loadDashboard();

console.log('%c BRAIN//SPARK ', 'background: #1a1612; color: #ebe5dd; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Knowledge Challenge Initialized ', 'background: #c4a582; color: #1a1612; font-size: 14px; padding: 5px;');