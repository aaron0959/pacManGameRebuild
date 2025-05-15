document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 28 //28x28 sqrs = 784 sqrs
    let score = 0
    // === -- deeply equals
    //layout of grid. And what is in the squares.
    //LEGEND:
        //-0 = Pellet
        //-1 = Wall
        //-2 = Ghost Spawn
        //-3 = Power Pellet
        //-4 = Empty(where user will start) -- and where the 2 exits/entrances are as user does not acc go on them squares
     const layout = [
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
      1,3,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,3,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,0,1,1,1,2,2,1,1,1,0,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
      0,0,0,0,0,0,0,0,0,0,1,2,2,2,2,2,2,1,0,0,0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
      1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
      1,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
      1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
      1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
      1,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,1,
      1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
    ]

    const squares = [] //empty as will be pushing using function on ln 50

    //creating the grid and rendering it using for loop

    function createBoard() {
      for (let i = 0; i < layout.length; i++){
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)

        //add the layout to the board
        if(layout[i] === 0){//creating an if loop to check what value is in the space and then changing it to a visual according to the LEGEND ln 7
          squares[i].classList.add('pellet')
        }
        else if (layout[i] === 1){
          squares[i].classList.add('wall')
        }
        else if(layout[i] === 2){
          squares[i].classList.add('ghostLair')
        }
        else if (layout[i] === 3){
          squares[i].classList.add('powerPellet')
        }
      }
    }
    createBoard()

    //where pac man will start

    let pacmanCurrentIndex = 490
    //adding pacman to the 490th index of the array. Just passing through a number
    squares[pacmanCurrentIndex].classList.add('PacMan')

    let blinkyCurrentIndex = 348
    squares[blinkyCurrentIndex].classList.add('blinky')

    let inkyCurrentIndex = 351
    squares[inkyCurrentIndex].classList.add('inky')

    let pinkyCurrentIndex = 376
    squares[pinkyCurrentIndex].classList.add('pinky')

    let clydeCurrentIndex = 379
    squares[clydeCurrentIndex].classList.add('clyde')

    //creating a function to allow us to move pacman with keybinds. arrows and such
    function movePacMan(e) {

      squares[pacmanCurrentIndex].classList.remove('PacMan')

      switch(e.keyCode){
        case 37://using switch - if key press = left (keycode 37) checking if pacman is in a square where the nummber is divisible by the width(28) and doesn leave remainder 0. if true- pacman continue left
          if(pacmanCurrentIndex % width !==0 && !squares[pacmanCurrentIndex -1].classList.contains('wall') && !squares[pacmanCurrentIndex -1].classList.contains('ghostLair')) //only if both cases are true do we proceed with the statement
          pacmanCurrentIndex -=1
          //checking if pacman is in the left exit (the side tunnel on the left) -- this is so it can pass through to the right side as in the original game
          //363 is the index position of the left tunnel entrance/exit
          //position index of right entrance/exit is 391
          if((pacmanCurrentIndex -1) === 363){
            pacmanCurrentIndex = 391
          }
          break
        case 38://if press up (keycode 38) if pacman in square where index number where you sub 28 and is greater than 0 then keep moving up
          if(pacmanCurrentIndex - width >=0 && !squares[pacmanCurrentIndex -width].classList.contains('wall') && !squares[pacmanCurrentIndex -width].classList.contains('ghostLair'))
          pacmanCurrentIndex -=width
          break
        case 39://keycode 39 = right
          if(pacmanCurrentIndex % width < width-1 && !squares[pacmanCurrentIndex +1].classList.contains('wall') && !squares[pacmanCurrentIndex +1].classList.contains('ghostLair'))
          pacmanCurrentIndex +=1
          if((pacmanCurrentIndex +1) === 392){
            pacmanCurrentIndex = 364
          }
          break
        case 40://keycode 40 = down
          if(pacmanCurrentIndex + width < width*width && !squares[pacmanCurrentIndex +width].classList.contains('wall') && !squares[pacmanCurrentIndex +width].classList.contains('ghostLair'))
          pacmanCurrentIndex +=width
          break

        }

        squares[pacmanCurrentIndex].classList.add('PacMan')

        pelletEaten()
        powerPelletEaten()
        checkGameOver()
        checkForWin()
        checkForFruit()

    }

    document.addEventListener('keyup', movePacMan)

    //pacman eats pac dot
    function pelletEaten(){
      if (squares[pacmanCurrentIndex].classList.contains('pellet')){
        score += 10
        scoreDisplay.innerHTML = score
        squares[pacmanCurrentIndex].classList.remove('pellet')
      }

    }

    //when eat power pellet

    function powerPelletEaten(){
      if(squares[pacmanCurrentIndex].classList.contains('powerPellet')){
        squares[pacmanCurrentIndex].classList.remove('powerPellet')
        score += 50

        squares[blinkyCurrentIndex].classList.add('scaredBlinky')
        squares[blinkyCurrentIndex].classList.remove('blinky')
        squares[inkyCurrentIndex].classList.add('scaredInky')
        squares[inkyCurrentIndex].classList.remove('inky')
        squares[pinkyCurrentIndex].classList.add('scaredPinky')
        squares[pinkyCurrentIndex].classList.remove('pinky')
        squares[clydeCurrentIndex].classList.add('scaredClyde')
        squares[clydeCurrentIndex].classList.remove('clyde')

        moveScaredBlinky()
        moveScaredPinky()
        moveScaredInky()
        moveScaredClyde()

        setTimeout(unScareGhosts(), 10000)


      }
    }

    function checkForFruit(){
      if(score === 1480){
        let fruitCurrentIndex = 490
        squares[fruitCurrentIndex].classList.add('fruit')
      }
    }

    function unScareGhosts(){
      squares[scaredBlinkyCurrentIndex].classList.add('blinky')
      squares[scaredBlinkyCurrentIndex].classList.remove('scaredBlinky')
      squares[scaredInkyCurrentIndex].classList.add('inky')
      squares[scaredInkyCurrentIndex].classList.remove('scaredInky')
      squares[scaredPinkyCurrentIndex].classList.add('pinky')
      squares[scaredPinkyCurrentIndex].classList.remove('scaredPinky')
      squares[scaredClydeCurrentIndex].classList.add('clyde')
      squares[scaredClydeCurrentIndex].classList.remove('scaredClyde')
    }

    //get coords of pacman/ghosts -- for AI travelling
    function getCoordinates(index) {
      return [index % width, Math.floor(index/width)]//Math.floor rounds down to nearest int

    }
    console.log(getCoordinates(pacmanCurrentIndex))//test to check if works

    //function to move ghosts
    function moveBlinky() {

      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      console.log(directions.length)
      console.log(directions[Math.floor(Math.random()*directions.length)])
      let ghostTimerID = NaN

      ghostTimerID = setInterval (function(){
        squares[blinkyCurrentIndex].classList.remove('blinky')
        if (!squares[blinkyCurrentIndex + direction].classList.contains('wall')){
          //remove blinky
          squares[blinkyCurrentIndex].classList.remove('blinky')
          blinkyCurrentIndex += direction
          //check if new space is near PacMan
          const [blinkyX, blinkyY] = getCoordinates(blinkyCurrentIndex)
          const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)
          const [blinkyNewX, blinkyNewY] = getCoordinates(blinkyCurrentIndex + direction)

          function isBlinkyCoordXCloser() {
            let newBlinkyDistanceX = (blinkyNewX - pacmanX)
            if(newBlinkyDistanceX < 0){
              newBlinkyDistanceX = Math.abs(newBlinkyDistanceX)
            }

            let currentBlinkyDistanceX = (blinkyX - pacmanX)
            if(currentBlinkyDistanceX < 0){
              currentBlinkyDistanceX = Math.abs(currentBlinkyDistanceX)
            }

            if(newBlinkyDistanceX < currentBlinkyDistanceX){
              return true
            }else{
              return false
            }
          }

          function isBlinkyCoordYCloser(){
            let newBlinkyDistanceY = (blinkyNewY - pacmanY)
            if(newBlinkyDistanceY < 0){
              newBlinkyDistanceY = Math.abs(newBlinkyDistanceY)
            }

            let currentBlinkyDistanceY = (blinkyY - pacmanY)
            if(currentBlinkyDistanceY < 0){
              currentBlinkyDistanceY = Math.abs(currentBlinkyDistanceY)
            }

            if(newBlinkyDistanceY < currentBlinkyDistanceY){
              return true
            } else{
              return false
            }
          }

          if (isBlinkyCoordXCloser() || isBlinkyCoordYCloser()){//|| OR
            blinkyCurrentIndex += direction
            squares[blinkyCurrentIndex].classList.add('blinky')
          } else {
            squares[blinkyCurrentIndex].classList.add('blinky')
            direction = directions[Math.floor(Math.random()*directions.length)]
          }
          //stop game when pacman is eaten
          if(squares[blinkyCurrentIndex].classList.contains('pacman')) clearInterval(ghostTimerID){
            blinkyCurrentIndex += direction
            squares[blinkyCurrentIndex].classList.add('blinky')
          }
        }else{ direction = directions[Math.floor(Math.random()*directions.length)]
      } 
      100);
    }
    moveBlinky()

    function moveInky() {
      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      let ghostTimerID = NaN

      ghostTimerID = setInterval(function(){
        if (!squares[inkyCurrentIndex + direction].classList.contains('wall')){
          //remove inky
          squares[inkyCurrentIndex].classList.remove('inky')
          inkyCurrentIndex += direction
          //check if new space is near PacMan
          const [inkyX, inkyY] = getCoordinates(inkyCurrentIndex)
          const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)
          const [inkyNewX, inkyNewY] = getCoordinates(inkyCurrentIndex + direction)

          function isInkyCoordXCloser() {
            let newInkyDistanceX = (inkyNewX - pacmanX)
            if(newInkyDistanceX < 0){
              newInkyDistanceX = Math.abs(newInkyDistanceX)
            }
            let currentInkyDistanceX = (inkyX - pacmanX)
            if(currentInkyDistanceX < 0){
              currentInkyDistanceX = Math.abs(currentInkyDistanceX)
            }

            if(newInkyDistanceX < currentInkyDistanceX){
              return true
            }else{
              return false
            }
          }

          function isInkyCoordYCloser(){
            let newInkyDistanceY = (inkyNewY - pacmanY)
            if(newInkyDistanceY < 0){
              newInkyDistanceY = Math.abs(newInkyDistanceY)
            }

            let currentInkyDistanceY = (inkyY - pacmanY)
            if(currentInkyDistanceY < 0){
              currentInkyDistanceY = Math.abs(currentInkyDistanceY)
            }

            if(newInkyDistanceY < currentInkyDistanceY){
              return true
            }else{
              return false
            }
           }

          if (isInkyCoordXCloser() || isInkyCoordYCloser()){
            inkyCurrentIndex += direction
            squares[inkyCurrentIndex].classList.add('inky')
          } else {
            squares[inkyCurrentIndex].classList.add('inky')
            direction = directions[Math.floor(Math.random()*directions.length)]
          }
          //stop game when pacman is eaten
          if(squares[inkyCurrentIndex].classList.contains('pacman')) clearInterval(ghostTimerID)
          inkyCurrentIndex += direction
          squares[inkyCurrentIndex].classList.add('inky')
        } else direction = directions[Math.floor(Math.random()*directions.length)]
      }, 350)
    }
    moveInky()

    function movePinky() {
      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      let ghostTimerID = NaN

      ghostTimerID = setInterval(function(){
        if (!squares[pinkyCurrentIndex + direction].classList.contains('wall')){
          //remove pinky
          squares[pinkyCurrentIndex].classList.remove('pinky')
          pinkyCurrentIndex += direction
          //check if new space is near PacMan
          const [pinkyX, pinkyY] = getCoordinates(pinkyCurrentIndex)
          const [pacmanX, pacmanY] = getCoordinates(pacmanCurrentIndex)
          const [pinkyNewX, pinkyNewY] = getCoordinates(pinkyCurrentIndex + direction)

          function isPinkyCoordXCloser() {
            let newPinkyDistanceX = (pinkyNewX - pacmanX)
            if(newPinkyDistanceX < 0){
              newPinkyDistanceX = Math.abs(newPinkyDistanceX)
            }

            let currentPinkyDistanceX = (pinkyX - pacmanX)
            if(currentPinkyDistanceX < 0){
              currentPinkyDistanceX = Math.abs(currentPinkyDistanceX)
            }

            if(newPinkyDistanceX < currentPinkyDistanceX){
              return true
            }else{
              return false
            }
          }

          function isPinkyCoordYCloser(){
            let newPinkyDistanceY = (pinkyNewY - pacmanY)
            if(newPinkyDistanceY < 0){
              newPinkyDistanceY = Math.abs(newPinkyDistanceY)
            }

            let currentPinkyDistanceY = (pinkyY - pacmanY)
            if(currentPinkyDistanceY < 0){
              currentPinkyDistanceY = Math.abs(currentPinkyDistanceY)
            }

            if(newPinkyDistanceY < currentPinkyDistanceY){
              return true
            }else{
              return false
            }
          }

          if (isPinkyCoordXCloser() || isPinkyCoordYCloser()){
            pinkyCurrentIndex += direction
            squares[pinkyCurrentIndex].classList.add('pinky')
          } else {
            squares[pinkyCurrentIndex].classList.add('pinky')
            direction = directions[Math.floor(Math.random()*directions.length)]
          }
          //stop game when pacman is eaten
          if(squares[pinkyCurrentIndex].classList.contains('pacman')) clearInterval(ghostTimerID)

          pinkyCurrentIndex += direction
          squares[pinkyCurrentIndex].classList.add('pinky')
        } else direction = directions[Math.floor(Math.random()*directions.length)]
      }, 300)
    }
    movePinky()

    function moveClyde() {
      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      let ghostTimerID = NaN
      ghostTimerID = setInterval(function(){
        if (!squares[clydeCurrentIndex + direction].classList.contains('wall')){
          squares[clydeCurrentIndex].classList.remove('clyde')
          clydeCurrentIndex += direction
          squares[clydeCurrentIndex].classList.add('clyde')
        } else direction = directions[Math.floor(Math.random()*directions.length)]
      }, 400)
    }
    moveClyde()

    function moveScaredBlinky() {
      let scaredBlinkyCurrentIndex = blinkyCurrentIndex
      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      let ghostTimerID = NaN
      ghostTimerID = setInterval(function(){
        if(squares[scaredBlinkyCurrentIndex].classList.contains('PacMan')){
          squares[scaredBlinkyCurrentIndex].classList.remove('scaredBlinky')
          score += 100
        }else if (!squares[scaredBlinkyCurrentIndex + direction].classList.contains('wall')){
          squares[scaredBlinkyCurrentIndex].classList.remove('scaredBlinky')
          scaredBlinkyCurrentIndex += direction
          squares[scaredBlinkyCurrentIndex].classList.add('scaredBlinky')
        } else {
          direction = directions[Math.floor(Math.random()*directions.length)]
        }
      }, 300)
    }

    function moveScaredInky() {
      let scaredInkyCurrentIndex = inkyCurrentIndex
      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      let ghostTimerID = NaN
      ghostTimerID = setInterval(function(){
        if(squares[scaredInkyCurrentIndex].classList.contains('PacMan')){
          squares[scaredInkyCurrentIndex].classList.remove('scaredInky')
          score += 100
        }else if (!squares[scaredInkyCurrentIndex + direction].classList.contains('wall')){
          squares[scaredInkyCurrentIndex].classList.remove('scaredInky')
          scaredInkyCurrentIndex += direction
          squares[scaredInkyCurrentIndex].classList.add('scaredInky')
        } else {
          direction = directions[Math.floor(Math.random()*directions.length)]
        }
      }, 300)
    }

    function moveScaredPinky() {
      let scaredPinkyCurrentIndex = pinkyCurrentIndex
      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      let ghostTimerID = NaN
      ghostTimerID = setInterval(function(){
        if(squares[scaredPinkyCurrentIndex].classList.contains('PacMan')){
          squares[scaredPinkyCurrentIndex].classList.remove('scaredPinky')
          score += 100
        }else if (!squares[scaredPinkyCurrentIndex + direction].classList.contains('wall')){
          squares[scaredPinkyCurrentIndex].classList.remove('scaredPinky')
          moveScaredPinkyCurrentIndex += direction
          squares[scaredPinkyCurrentIndex].classList.add('scaredPinky')
        } else {
          direction = directions[Math.floor(Math.random()*directions.length)]
        }
      }, 300)
    }

    function moveScaredClyde() {
      let scaredClydeCurrentIndex = clydeCurrentIndex
      const directions = [-1, +1, +width, -width]
      let direction = directions[Math.floor(Math.random()*directions.length)]
      let ghostTimerID = NaN
      ghostTimerID = setInterval(function(){
        if(squares[scaredClydeCurrentIndex].classList.contains('PacMan')){
          squares[scaredClydeCurrentIndex].classList.remove('scaredClyde')
          score += 100
        }else if (!squares[scaredClydeCurrentIndex + direction].classList.contains('wall')){
          squares[scaredClydeCurrentIndex].classList.remove('scaredClyde')
          scaredClydeCurrentIndex += direction
          squares[scaredClydeCurrentIndex].classList.add('scaredClyde')
        } else {
          direction = directions[Math.floor(Math.random()*directions.length)]
        }
      }, 300)
    }

    //check for game over

    function checkGameOver() {
      if(squares[pacmanCurrentIndex].classList.contains('blinky') || squares[pacmanCurrentIndex].classList.contains('inky') || squares[pacmanCurrentIndex].classList.contains('pinky') || squares[pacmanCurrentIndex].classList.contains('clyde')){
        clearInterval(blinky.ghostTimerID)
        clearInterval(inky.ghostTimerID)
        clearInterval(pinky.ghostTimerID)
        clearInterval(clyde.ghostTimerID)
        document.removeEventListener('keyup', movePacMan)
        setTimeout(function(){alert('GAME OVER !!')
      }, 500)
      }
    }

//check for win

    function checkForWin() {
      if(score > 2969) {
        clearInterval(blinky.ghostTimerID)
        clearInterval(inky.ghostTimerID)
        clearInterval(pinky.ghostTimerID)
        clearInterval(clyde.ghostTimerID)
        document.removeEventListener('keyup', movePacMan)
        setTimeout(function(){alert('YOU WON !!!')
      }, 500)
      }
    }





})
