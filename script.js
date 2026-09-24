const quizBox = document.getElementById("quiz-box");
const quiz = document.getElementById("quiz");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const score = document.getElementById("scoreCount")
const header = document.getElementById("header");

const timerDisplay = document.getElementById("timer");
let timeLeft ;
let timerInterval;

const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestionIndex, currentScore;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
    nextButton.classList.add("hide");
    document.body.style.backgroundColor = "#7fffd4";
});

function showQuestion() {
    // clearInterval(timerInterval);
    startTimer();

    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    quiz.textContent = currentQuestion.question;

    const answers = document.querySelectorAll(".btn");
    currentQuestion.options.forEach((optionText, index) => {
        let option = answers[index];
        option.textContent = optionText;
        option.disabled = false;
        option.classList.remove("correct", "wrong");
    });

    answers.forEach((answer) => {
        answer.addEventListener("click", selectAnswer);
    });
}

function selectAnswer(event) {
    const selectedAnswer = event ? event.target.textContent: null;
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const answers = document.querySelectorAll(".btn");
    // timeLeft = 1;
    clearInterval(timerInterval);

    answers.forEach((answer) => {
        answer.disabled = true;

        if (answer.textContent == currentQuestion.answer) {
            answer.classList.add("correct");
        }
        if (answer.textContent != currentQuestion.answer) {
            answer.classList.add("wrong");
        }
    });

    if (selectedAnswer === currentQuestion.answer) {
        document.body.style.backgroundColor = "green"
        currentScore++;
        score.textContent = `Score: ${currentScore}`;
    } else {
        document.body.style.backgroundColor = "red"
    }
    nextButton.classList.remove("hide");
}

function startGame() {
    currentQuestionIndex = 0;
    currentScore = 0;
    header.classList.remove("hide");
    startButton.classList.add("hide");
    quizBox.classList.remove("hide");
    showQuestion();
}

function startTimer() {
  timeLeft = 15;

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      selectAnswer(null); 
    }
  }, 1000);
}

