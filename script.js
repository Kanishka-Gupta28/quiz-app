const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Which protocol is used to transfer web pages?",
    options: ["FTP", "SSH", "HTTP", "SMTP"],
    answer: "HTTP"
  },
  {
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "CSS", "JavaScript", "Python"],
    answer: "CSS"
  },
  {
    question: "Which tag is used for the largest heading in HTML?",
    options: ["<h3>", "<heading>", "<h1>", "<title>"],
    answer: "<h1>"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "React", "Django", "Flask"],
    answer: "React"
  },
  {
    question: "Which symbol is used to access properties in JavaScript objects?",
    options: [". (dot)", "# (hash)", "$ (dollar)", "& (ampersand)"],
    answer: ". (dot)"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Control Styling System",
      "Color Styling Structure"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which company owns GitHub?",
    options: ["Google", "Microsoft", "Apple", "Meta"],
    answer: "Microsoft"
  },
  {
    question: "Which method adds an item at the end of an array in JavaScript?",
    options: ["push()", "add()", "append()", "insertEnd()"],
    answer: "push()"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Mark Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];


// Elements
const startBtn = document.getElementById("startBtn");
const quiz = document.getElementById("quiz");
const intro = document.getElementById("intro");
const questionText = document.getElementById("questionText");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const feedback = document.getElementById("feedback");
 
let timeLeft = 120; 
let timerInterval = null;

let currentQuestionIndex = 0;
let score = 0;

// Start Quiz
startBtn.addEventListener("click", () => {
  intro.classList.add("hidden");
  quiz.classList.remove("hidden");
  loadQuestion();
  startTimer(); // <-- start timer
});
function startTimer() {
  const timerDisplay = document.getElementById("timer");

  timerInterval = setInterval(() => {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    // Format time → 02:00, 01:09 etc.
    timerDisplay.textContent = 
      `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showResults(); // End quiz automatically when timer finishes
    }

  }, 1000);
}



// Load Question
function loadQuestion() {
  const q = questions[currentQuestionIndex];

  // Update question number
  document.getElementById("qIndex").textContent = currentQuestionIndex + 1;

  questionText.textContent = q.question;
  options.innerHTML = ""; 
  feedback.textContent = "";
  nextBtn.disabled = true;

  q.options.forEach(opt => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.classList.add("option");

    if (opt === q.answer) {
      li.dataset.correct = true;
    }

    li.addEventListener("click", selectAnswer);
    options.appendChild(li);
  });
}


function selectAnswer(e) {
  const selected = e.target;
  const correct = selected.dataset.correct === "true";

  // Disable all options
  Array.from(options.children).forEach(option => {
    option.style.pointerEvents = "none";

    if (option.dataset.correct === "true") {
      option.classList.add("correct");
    } else {
      option.classList.add("wrong");
    }
  });

  if (correct) {
    score++;
    feedback.textContent = "✔ Correct!";
    feedback.className = "feedback correct-text";
  } else {
    feedback.textContent = "❌ Wrong!";
    feedback.className = "feedback wrong-text";
  }

  nextBtn.disabled = false;
}

// Next Button
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  clearInterval(timerInterval); // stop countdown

  quiz.innerHTML = `<h2>Your score: ${score}/${questions.length}</h2>`;
}

