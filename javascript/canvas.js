class HangmanCanvas {
  constructor(secretWord) {
    this.canvas = document.getElementById("hangman")
    this.context = this.canvas.getContext("2d")
    this.secretWord = secretWord
    this.firstPosition = {
      x: 420,
      y: 500,
    }
    this.wrongLetterPosition = {
      x: 800,
      y: 0,
    }
    this.lines = [
      {
        //BASE
        startingX: 50,
        endingX: 350,
        startingY: 550,
        endingY: 550,
      },
      //POLE
      {
        startingX: 200,
        endingX: 200,
        startingY: 550,
        endingY: 100,
      },
      //TOP
      {
        startingX: 200,
        endingX: 375,
        startingY: 100,
        endingY: 100,
      },
      //HANGER POLE
      {
        startingX: 375,
        endingX: 375,
        startingY: 100,
        endingY: 175,
      },
      //HEAD
      {
        x: 375,
        y: 210,
        radius: 35,
        start: 0,
        end: Math.PI * 2,
      },
      //NECK
      {
        startingX: 375,
        startingY: 245,
        endingX: 375,
        endingY: 285,
      },
      //RIGHT ARM
      {
        startingX: 375,
        startingY: 285,
        endingX: 330,
        endingY: 245,
      },
      //LEFT ARM
      {
        startingX: 375,
        startingY: 285,
        endingX: 420,
        endingY: 245,
      },
      //TORSO
      {
        startingX: 375,
        startingY: 285,
        endingX: 375,
        endingY: 345,
      },
      //RIGHT LEG
      {
        startingX: 375,
        startingY: 345,
        endingX: 330,
        endingY: 385,
      },
      //LEFT LEG
      {
        startingX: 375,
        startingY: 345,
        endingX: 420,
        endingY: 385,
      },
    ]
  }

  createBoard() {
    //clear all
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.wrongLetterPosition.x = 800
    this.wrongLetterPosition.y = 200

    //draw word lines
    this.drawLines()
  }

  drawLines() {
    let currentSpot = {
      x: 400,
      y: 550,
    }

    this.context.beginPath()
    for (let i = 0; i < this.secretWord.length; i++) {
      // draw each line
      this.context.moveTo(currentSpot.x, currentSpot.y)
      this.context.lineTo(currentSpot.x + 40, currentSpot.y)
      this.context.stroke()

      // Move current spot to next position
      currentSpot.x += 60
    }
    this.context.closePath()
  }

  writeCorrectLetter(index) {
    let x = this.firstPosition.x + 60 * index
    let y = this.firstPosition.y
    let letter = this.secretWord.charAt(index)

    this.context.beginPath()
    this.context.textBaseline = "top"
    this.context.textAlign = "center"
    this.context.font = "50px serif"
    this.context.strokeText(letter, x, y, 600)
    this.context.closePath()
  }

  writeWrongLetter(letter, errorsLeft) {
    this.drawHangman(errorsLeft)

    this.context.beginPath()
    this.context.textBaseline = "top"
    this.context.textAlign = "end"
    this.context.font = "50px arial"
    this.context.fillStyle = "red"
    this.context.fillText(
      letter,
      this.wrongLetterPosition.x,
      this.wrongLetterPosition.y
    )
    this.context.closePath

    this.wrongLetterPosition.y += 70
  }

  drawHangman(errorsLeft) {
    this.context.beginPath()
    this.context.lineWidth = 2
    for (let i = 0; i < this.lines.length - errorsLeft; i++) {
      let line = this.lines[i]
      if (i == 4) {
        this.context.moveTo(line.x + line.radius, line.y)
        this.context.arc(line.x, line.y, line.radius, line.start, line.end)
      } else {
        this.context.moveTo(line.startingX, line.startingY)
        this.context.lineTo(line.endingX, line.endingY)
      }
      this.context.stroke()
    }
    this.context.closePath()
  }

  gameOver() {
    // ... your code goes here
  }

  winner() {
    // ... your code goes here
  }
}
