const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "data-structure",
  "programmer",
  "web-developer",
  // "meme-time",
];

let disable = false;

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = ["-"];
const wrongLetters = [];

// show the hidden word
const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          // if (letter === " " && !correctLetters.includes(letter))
          //   correctLetters.push(letter);
          `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
      </span>`
      )
      .join("")}
  `;

  // used to remove the new line for each guess
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText =
      "Good for you, you got it. Now go do something productive";
    popup.style.display = "flex";
    disable = true;
  }
};

const updateWrongLettersEl = () => {
  // display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;

  // display hanging man
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index >= errors) return (part.style.display = "none");
    if (index < errors) return (part.style.display = "block");
  });

  // check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText =
      "You suck! Now get your poop in a group and go do something productive";
    popup.style.display = "flex";
    disable = true;
  }
};

const showNotification = (message) => {
  notification.classList.add("show");
  notification.innerHTML = `
    <p>${message}</p>
  `;
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
};

// key down event listning for letter press
window.addEventListener("keydown", (e) => {
  let letter = null;
  if (disable) return;
  if (e.keyCode >= 65 && e.keyCode <= 90) letter = e.key;
  console.log("letter", letter);
  if (letter === null) return showNotification("Letter not valid");
  if (!selectedWord.includes(letter) && !wrongLetters.includes(letter)) {
    wrongLetters.push(letter);
    return updateWrongLettersEl();
  }
  if (!selectedWord.includes(letter) && wrongLetters.includes(letter))
    return showNotification("Letter has already been guessed");
  if (!correctLetters.includes(letter)) {
    correctLetters.push(letter);
    return displayWord();
  }
  showNotification("Letter has already been guessed");
});

// restart game to play again
playAgainBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Empty Arrays
  correctLetters.splice(1);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  console.log("wrongLetters", wrongLetters);

  updateWrongLettersEl();
  popup.style.display = "none";
  disable = false;
});

// runs after every guess
displayWord();
