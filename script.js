document.addEventListener('DOMContentLoaded', () => {
    const quizArea = document.getElementById('quiz-area');
    const questionTextElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const feedbackTextElement = document.getElementById('feedback-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const currentQuestionNumberElement = document.getElementById('current-question-number');
    const totalQuestionNumberElement = document.getElementById('total-question-number');
    const resultsContainer = document.getElementById('results-container');
    const scoreElement = document.getElementById('score');
    const totalScoreElement = document.getElementById('total-score');
    const restartBtn = document.getElementById('restart-btn');

    let questions = [];
    let currentQuestionIndex = 0;
    let userAnswers = [];
    let score = 0;

    async function fetchQuestions() {
        try {
            // Initially fetching from JSON, will change to API endpoint
            const response = await fetch('/api/questions'); // Changed to API endpoint 
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            questions = await response.json();
            if (questions.length > 0) {
                userAnswers = new Array(questions.length).fill(null);
                totalQuestionNumberElement.textContent = questions.length;
                loadQuestion(currentQuestionIndex);
            } else {
                questionTextElement.textContent = 'No questions loaded. Please check the question source.';
            }
        } catch (error) {
            console.error('Failed to fetch questions:', error);
            questionTextElement.textContent = 'Failed to load questions. Please try again later.';
        }
    }

    function loadQuestion(index) {
        if (index < 0 || index >= questions.length) return;

        const question = questions[index];
        questionTextElement.textContent = question.question;
        optionsContainer.innerHTML = '';
        feedbackTextElement.textContent = '';
        feedbackTextElement.className = '';

        question.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            button.addEventListener('click', () => selectOption(button, option, index));
            optionsContainer.appendChild(button);
        });

        if (userAnswers[index] !== null) {
            highlightSelectedOption(userAnswers[index].selectedOption);
            if (userAnswers[index].isCorrect !== undefined) {
                showFeedback(userAnswers[index].isCorrect, questions[index].answer);
                disableOptions();
            }
        }

        currentQuestionNumberElement.textContent = index + 1;
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === questions.length - 1 && userAnswers[index] === null;
        
        if (index === questions.length - 1) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-block';
            submitBtn.disabled = !allQuestionsAnswered(); 
        } else {
            nextBtn.style.display = 'inline-block';
            submitBtn.style.display = 'none';
        }
    }

    function selectOption(button, selectedOption, questionIndex) {
        if (userAnswers[questionIndex] && userAnswers[questionIndex].isCorrect !== undefined) {
            return; // Already answered and feedback shown
        }

        userAnswers[questionIndex] = { selectedOption };
        highlightSelectedOption(selectedOption);
        
        // Immediate feedback (can be moved to server-side validation if preferred)
        const correctAnswer = questions[questionIndex].answer;
        const isCorrect = selectedOption === correctAnswer;
        userAnswers[questionIndex].isCorrect = isCorrect;
        showFeedback(isCorrect, correctAnswer);
        disableOptions();

        nextBtn.disabled = false;
        if (currentQuestionIndex === questions.length - 1) {
            submitBtn.disabled = !allQuestionsAnswered();
        }
    }

    function highlightSelectedOption(selectedOptionText) {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
            if (btn.textContent === selectedOptionText) {
                btn.classList.add('selected');
            }
        });
    }

    function showFeedback(isCorrect, correctAnswer) {
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('correct');
            }
            if (btn.classList.contains('selected') && !isCorrect && btn.textContent !== correctAnswer) {
                btn.classList.add('incorrect');
            }
        });

        let feedbackHTML = '';
        if (isCorrect) {
            feedbackHTML = '<strong>Correct!</strong><br>';
            feedbackTextElement.className = 'correct';
        } else {
            feedbackHTML = `<strong>Incorrect.</strong> The correct answer is: <strong>${correctAnswer}</strong><br>`;
            feedbackTextElement.className = 'incorrect';
        }
        // Add explanation
        const explanation = questions[currentQuestionIndex].explanation;
        if (explanation) {
            feedbackHTML += `<span style="font-size: 0.9em; color: #555; display: block; margin-top: 5px;">${explanation}</span>`;
        }
        feedbackTextElement.innerHTML = feedbackHTML;
    }

    function disableOptions() {
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
        });
    }

    function allQuestionsAnswered() {
        return userAnswers.every(answer => answer !== null && answer.isCorrect !== undefined);
    }

    nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    submitBtn.addEventListener('click', () => {
        if (!allQuestionsAnswered()) {
            alert('Please answer all questions before submitting.');
            return;
        }
        calculateScore();
        showResults();
    });

    function calculateScore() {
        score = 0;
        userAnswers.forEach(answer => {
            if (answer && answer.isCorrect) {
                score++;
            }
        });
    }

    function showResults() {
        quizArea.style.display = 'none';
        document.getElementById('navigation-container').style.display = 'none';
        document.getElementById('progress-container').style.display = 'none';
        resultsContainer.style.display = 'block';
        scoreElement.textContent = score;
        totalScoreElement.textContent = questions.length;
    }

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        userAnswers = new Array(questions.length).fill(null);
        score = 0;
        resultsContainer.style.display = 'none';
        quizArea.style.display = 'block';
        document.getElementById('navigation-container').style.display = 'flex';
        document.getElementById('progress-container').style.display = 'block';
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
        loadQuestion(currentQuestionIndex);
    });

    fetchQuestions();
});
