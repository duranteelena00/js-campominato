/* Consegna
Il computer deve generare 16 numeri casuali tra 1 e 100, queste saranno le nostre bombe.
I numeri delle bombe non possono essere duplicati (i 16 numeri devono essere tutti diversi)
Il giocatore, deve cercare di non prendere le bombe. Gli chiederemo 100 - 16 volte di scegliere un numero, uno alla volta, sempre compreso tra 1 e 100.
L'utente non può inserire 2 volte lo stesso numero
Ogni  volta che l'utente sceglie un numero che non è presente tra le bombe, guadagna un punto e poi gli chiediamo un altro numero.
Se il numero scelto dall'utente è presente tra i numeri bomba, la partita termina.
Quando la partita termina, comunichiamo all'utente il suo punteggio.
BONUS: (da fare solo se funziona tutto il resto)
all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
con difficoltà 0 => tra 1 e 100
con difficoltà 1 => tra 1 e 80
con difficoltà 2 => tra 1 e 50
 */

//Placeholders
const userNumbersPlaceholder = document.getElementById("user-numbers");
const messagePlaceholder = document.getElementById("message");
const scorePlaceholder = document.getElementById("score");

//Generate 16 user different numbers for the bombs (from 1 to 100)
const bombNumbers = [];
let b = 0;
while (bombNumbers.length < 16) {
  let currentNumber = Math.floor(Math.random() * 100 - 1) + 1;
  if (!bombNumbers.includes(currentNumber)) {
    bombNumbers.push(currentNumber);
  }
  b++;
}
console.table(bombNumbers);

//Ask user to choose the difficulty level (easy, medium, difficult)
do {
  var difficulty = prompt(
    "Scegli il livello di difficoltà: 'facile', 'normale', 'difficile'"
  )
    .toLocaleLowerCase()
    .trim();
} while (
  difficulty !== "facile" &&
  difficulty !== "normale" &&
  difficulty !== "difficile"
);

//Choose the maximum of numbers to insert (based on the difficulty level)
var max;
if (difficulty === "facile") {
  max = 100 - 16;
} else if (difficulty === "normale") {
  max = 80 - 16;
} else if (difficulty === "difficile") {
  max = 50 - 16;
}

//GAME: Ask user to choose up to 84 different numbers until he picks a bomb (this will make the game end). 
const userNumbers = [];
let chosenNumber;
let score = 0;
let n = 0;
while (userNumbers.length < max && !bombNumbers.includes(chosenNumber)) {
  chosenNumber = parseInt(
    prompt("Scegli un numero tra 1 e 100 (" + (n + 1) + ")")
  );
  if (
    isNaN(chosenNumber) ||
    chosenNumber < 1 ||
    chosenNumber > max ||
    userNumbers.includes(chosenNumber)
  ) {
    n--;
  } else if (!bombNumbers.includes(chosenNumber)) {
    userNumbers.push(chosenNumber);
    score += 1;
  }
  n++;
}
console.table(userNumbers);
userNumbersPlaceholder.innerText =
"Hai scelto con successo: " + userNumbers.join(", ");

//Check if the user has picked any bomb number and print the result of the game
if (bombNumbers.includes(chosenNumber)) {
  alert("GAME OVER!");
  messagePlaceholder.innerText =
  "Hai fatto esplodere una bomba al numero " + chosenNumber + ". GAME OVER!";
}
//Print the score (1 point per each number that is not a bomb)
console.log("Score = " + score);
scorePlaceholder.innerText = "Hai totalizzato " + score + " punti";
