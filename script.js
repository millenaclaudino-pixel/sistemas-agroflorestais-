let currentPage = 1;
let fontSize = 18;

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function nextPage() {
  currentPage++;
  showPage("page" + currentPage);
}

function prevPage() {
  currentPage--;
  showPage("page" + currentPage);
}

/* FONT SIZE */
function mudarFonte(valor) {
  fontSize += valor;
  document.body.style.fontSize = fontSize + "px";
}

/* QUIZ */
const quiz = [
  {
    q: "O que são sistemas agroflorestais?",
    a: [
      "Sistema de mineração sustentável",
      "Integração de árvores e agricultura",
      "Apenas cultivo de soja",
      "Criação de fábricas no campo"
    ],
    correct: 1
  },
  {
    q: "Qual benefício dos SAFs?",
    a: [
      "Aumento de erosão",
      "Redução da biodiversidade",
      "Conservação do solo",
      "Desmatamento acelerado"
    ],
    correct: 2
  },
  {
    q: "Um exemplo de SAF é:",
    a: [
      "Plantação de monocultura",
      "Café sob sombra de árvores",
      "Deserto agrícola",
      "Uso de plástico no solo"
    ],
    correct: 1
  },
  {
    q: "Os SAFs ajudam a:",
    a: [
      "Piorar o clima",
      "Aumentar sustentabilidade",
      "Eliminar árvores",
      "Reduzir produção alimentar"
    ],
    correct: 1
  }
];

let currentQ = 0;
let score = 0;

function startQuiz() {
  showPage("quiz");
  loadQuestion();
}

function loadQuestion() {
  let q = quiz[currentQ];
  document.getElementById("question").innerText = q.q;

  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  q.a.forEach((alt, index) => {
    let btn = document.createElement("button");
    btn.innerText = alt;
    btn.onclick = () => checkAnswer(btn, index);
    answersDiv.appendChild(btn);
  });
}

function checkAnswer(button, index) {
  let correctIndex = quiz[currentQ].correct;

  if (index === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  setTimeout(() => {
    currentQ++;

    if (currentQ < quiz.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 800);
}

function showResult() {
  showPage("result");
  document.getElementById("scoreText").innerText =
    `Você acertou ${score} de ${quiz.length} perguntas!`;

  let msg = "";

  if (score === 4) msg = "Excelente! Você domina o tema!";
  else if (score >= 2) msg = "Bom trabalho! Continue estudando!";
  else msg = "Precisa revisar o conteúdo!";

  document.getElementById("congrats").innerText = msg;
}

function restart() {
  currentQ = 0;
  score = 0;
  currentPage = 1;
  showPage("page1");
}
