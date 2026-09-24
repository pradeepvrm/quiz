const quizBox = document.getElementById("quiz-box");
const quiz = document.getElementById("quiz");
const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
let currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
    nextButton.classList.add("hide");
    document.body.style.backgroundColor = "#7fffd4";
});

function showQuestion() {
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
    const selectedAnswer = event.target.textContent;
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const answers = document.querySelectorAll(".btn");

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
    } else {
        document.body.style.backgroundColor = "red"
    }
    nextButton.classList.remove("hide");
}

function startGame() {
    currentQuestionIndex = 0;
    startButton.classList.add("hide");
    quizBox.classList.remove("hide");
    showQuestion();
}

