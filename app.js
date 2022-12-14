const cardsContainer = document.getElementById("cards-container"),
  prevBtn = document.getElementById("prev"),
  nextBtn = document.getElementById("next"),
  currentEl = document.getElementById("current"),
  showBtn = document.getElementById("show"),
  hideBtn = document.getElementById("hide"),
  questionEl = document.getElementById("question"),
  answerEl = document.getElementById("answer"),
  addCardBtn = document.getElementById("add-card"),
  clearBtn = document.getElementById("clear"),
  addContainer = document.getElementById("add-container");

let currentActiveCard = 0;

const cardsEl = [];

const cardsData = getCardsData();

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");

  if (index === 0) card.classList.add("active");

  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${data.question}</p>
      </div>
      <div class="inner-card-back">
        <p>${data.answer}</p>
      </div>
    </div>
  `;

  card.addEventListener("click", () => card.classList.toggle("show-answer"));

  cardsEl.push(card);
  cardsContainer.appendChild(card);

  updateCurrentText();
}

function updateCurrentText() {
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}
function setCardsData(cardsData) {
  localStorage.setItem("cards", JSON.stringify(cardsData));
  window.location.reload();
}

createCards();

// Event listeners
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card left";
  currentActiveCard = currentActiveCard + 1;

  if (currentActiveCard > cardsEl.length - 1)
    currentActiveCard = cardsEl.length - 1;

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].className = "card right";
  currentActiveCard = currentActiveCard - 1;

  if (currentActiveCard < 0) currentActiveCard = 0;

  cardsEl[currentActiveCard].className = "card active";

  updateCurrentText();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value,
    answer = answerEl.value;

  if (question.trim() && question.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";

    addContainer.classList.remove("show");
    cardsData.push(newCard);

    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload();
});
