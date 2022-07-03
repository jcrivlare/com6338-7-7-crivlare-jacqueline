var quiz = document.querySelector("#quiz");
var questionIndex = 0;
var score = 0;
var timer = 30;
var timerId = null;
var questionsArr = [
  {
    question: "What is the name of Ariel's crab companion in Little Mermaid?",
    options: ["Scar", "Sebastian", "Mushu", "Gaston"],
    answer: "Sebastian",
  },
  {
    question: "What is Mickey's pet dog name?",
    options: ["Pete", "Pluto", "Goofy", "Mortimer"],
    answer: "Pluto",
  },
  {
    question: "Which Princess lost her glass slipper at midnight?",
    options: ["Aurora", "Snow White", "Moana", "Cinderella"],
    answer: "Cinderella",
  },
  {
    question: "Who in Frozen likes warm hugs?",
    options: ["Elsa", "Sven", "Olaf", "Anna"],
    answer: "Olaf",
  },
  {
    question: "A bite of what made Snow White fall into a deep sleep?",
    options: ["Apple", "Pear", "Cheeseburger", "Pie"],
    answer: "Apple",
  },
];

function initializeGame() {
  score = 0;
  timer = 30;
  questionIndex = 0;
  quiz.innerHTML = "";
  var prevScore = localStorage.getItem("previous-score");
  if (prevScore || prevScore === 0) {
    var gameText = document.createElement("p");
    var scorePct = (prevScore / questionsArr.length) * 100;
    gameText.textContent = `Previous Score: ${scorePct}%`;
    quiz.appendChild(gameText);
  }
  var button = document.createElement("button");
  button.setAttribute("id", "start-quiz");
  button.textContent = "start!";
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
  if (timerDisplay === null) return;
  timerDisplay.textContent = timer;
}

// var question = document.createElement('p');
// question.textContent = "This is a quiz question";
// quiz.appendChild(question);
// var pTag = document.querySelector('p');

initializeGame();

function renderQuestion() {
  quiz.innerHTML = "";
  var question = document.createElement("p");
  var timerDisplay = document.createElement("p");
  timerDisplay.classList.add("timer");
  timer = 30;
  timerDisplay.textContent = timer;
  question.textContent = questionsArr[questionIndex].question;
  quiz.appendChild(question);
  var answers = document.createElement("div");
  quiz.appendChild(answers);
  quiz.appendChild(timerDisplay);
  for (var i = 0; i < questionsArr[questionIndex].options.length; i++) {
    var answerChoice = document.createElement("button");
    answerChoice.textContent = questionsArr[questionIndex].options[i];
    answers.appendChild(answerChoice);
  }
  answers.addEventListener("click", handleUserChoice);
  clearInterval(timerId);
  timerId = setInterval(decrementTimer, 1000);
}

function gameOver() {
  clearInterval(timerId);
  localStorage.setItem("previous-score", score);
  initializeGame();
}

function handleUserChoice(event) {
  var answerChoice = event.target;
  var answer = questionsArr[questionIndex].answer;
  if (answerChoice.textContent === answer) {
    console.log("Right answer!");
    score++;
  } else {
    console.log("Sorry! Wrong answer!");
  }
  nextQuestion();
}

function nextQuestion() {
  questionIndex = questionIndex + 1;
  if (questionIndex >= questionsArr.length) {
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
