class Hangman {
  constructor(words) {
    this.words = words
    this.secretWord = this.pickWord()
    this.letters = []
    this.guessedLetters = ""
    this.errorsLeft = 10
  }

  pickWord() {
    return this.words[Math.floor(Math.random() * this.words.length)]
  }

  checkIfLetter(keyCode) {
    return keyCode >= 65 && keyCode <= 90
  }

  checkClickedLetters(letter) {
    return this.letters.indexOf(letter) === -1
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter
    if (this.checkWinner()) hangmanCanvas.winner()
  }

  addWrongLetter(letter) {
    this.errorsLeft--
    if (!this.letters.includes(letter)) this.letters.push(letter)
    if (this.checkGameOver()) hangmanCanvas.gameOver()
  }

  checkGameOver() {
    return this.errorsLeft <= 0
  }

  checkWinner() {
    for (const letter of this.secretWord) {
      if (!this.guessedLetters.includes(letter)) return false
    }

    return true
  }
}

const startGameButton = document.getElementById("start-game-button")

if (startGameButton) {
  startGameButton.addEventListener("click", (event) => {
    hangman = new Hangman([
      "node",
      "javascript",
      "react",
      "miami",
      "paris",
      "amsterdam",
      "lisboa",
    ])

    console.log("I've been clicked")

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord()
    hangmanCanvas = new HangmanCanvas(hangman.secretWord)

    // ... your code goes here
    hangmanCanvas.createBoard()
  })
}

document.addEventListener("keydown", (event) => {
  if (hangman.checkIfLetter(event.keyCode)) {
    if (hangman.checkClickedLetters(event.key)) {
      if (hangman.secretWord.includes(event.key)) {
        for (let i = 0; i < hangman.secretWord.length; i++) {
          if (hangman.secretWord.charAt(i) === event.key) {
            hangman.addCorrectLetter(event.key)
            hangmanCanvas.writeCorrectLetter(i)
          }
        }
      } else {
        hangman.addWrongLetter(event.key)
        hangmanCanvas.writeWrongLetter(event.key, hangman.errorsLeft)
      }
    }
  }
})
