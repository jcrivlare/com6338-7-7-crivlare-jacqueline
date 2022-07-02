var quiz = document.querySelector("#quiz");
var questionIndex = 0;
var score = 0;
var timer = 30;
var timerId = null;
var questions = [
  {
    question: "What is the name of Ariel's crab companion in Little Mermaid?",
    answers: ["Scar", "Sebastian", "Mushu", "Gaston"],
    answerKey: "Sebastian",
  },
  {
    question: "What is Mickey's pet dog name?",
    answers: ["Pete", "Pluto", "Goofy", "Mortimer"],
    answerKey: "Pluto",
  },
  {
    question: "Which Princess lost her glass slipper at midnight?",
    answers: ["Aurora", "Snow White", "Moana", "Cinderella"],
    answerKey: "Cinderella",
  },
  {
    question: "Who in Frozen likes warm hugs?",
    answers: ["Elsa", "Sven", "Olaf", "Anna"],
    answerKey: Olaf,
  },
  {
    question: "A bite of what made Snow White fall into a deep sleep?",
    answers: ["Apple", "Pear", "Cheeseburger", "Pie"],
    answerKey: "Apple",
  },
];

function initializeGame() {
  score = 0;
  timer = 30;
  questionIndex = 0;
  var gameText = document.createElement("p");
  gameText.textContent = "Click start to start playing quiz";
  var button = document.createElement("button");
  button.textContent = "start!";
  quiz.innerHTML = "";
  quiz.appendChild(gameText);
  quiz.appendChild(button);
  button.addEventListener("click", renderQuestion);
}

function decrementTimer() {
  timer = timer - 1;
  console.log(timer);
  if (timer <= 0) {
    // time has expired, move on to next question
    clearInterval(timerId);
    nextQuestion();
  }
  timerDisplay = document.querySelector(".timer");
  timerDisplay.textContent = timer;
}

// var question = document.createElement('p');
// question.textContent = "This is a quiz question";
// quiz.appendChild(question);
// var pTag = document.querySelector('p');

initializeGame();

function renderQuestion() {
  quiz.innerHTML = "";
  var questionSet = questions[questionIndex];
  var question = document.createElement("p");
  var timerDisplay = document.createElement("p");
  var scoreDisplay = document.createElement("p");
  scoreDisplay.textContent = score;
  timerDisplay.classList.add("timer");
  timer = 30;
  timerDisplay.textContent = timer;
  question.textContent = questionSet.question;
  quiz.appendChild(scoreDisplay);
  quiz.appendChild(question);
  quiz.appendChild(timerDisplay);
  var answers = document.createElement("ol");
  quiz.appendChild(answers);
  for (var i = 0; i < questionSet.answers.length; i++) {
    var answerChoice = document.createElement("li");
    answerChoice.textContent = questionSet.answers[i];
    answers.appendChild(answerChoice);
  }
  answers.addEventListener("click", handleUserChoice);
  clearInterval(timerId);
  timerId = setInterval(decrementTimer, 1000);
}

function gameOver() {
  quiz.innerHMTL = "";
  quiz.innerHTML = `<div>
    <h2>Game Over!</h2>
    <p>Your final score is ${score} out of ${questions.length}</p>
  </div>`;
}

function handleUserChoice(event) {
  var answerChoice = event.target;
  var answerKey = questions[questionIndex].answerKey;
  if (answerChoice.textContent === answerKey) {
    console.log("Right answer!");
    score++;
  } else {
    console.log("Sorry! Wrong answer!");
  }
  nextQuestion();
}

function nextQuestion() {
  questionIndex = questionIndex + 1;
  if (questionIndex >= questions.length) {
    // Game is over at this point
    return gameOver();
  }
  renderQuestion();
}

// pTag.addEventListener("click", changeBoxColor);

// function changeBoxColor(event){
//   console.log(event);
//   var box = document.querySelector(".box");
//   box.classList.toggle("green");
// }
