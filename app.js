const startButton = document.getElementById("startBtn")
const instructions = document.getElementById("instructions")
const gameArea = document.getElementById("gameArea")
const shooter = document.getElementById("playerShip")
const enemyImg = ['images/enemy1.png', 'images/enemy2.png', 'images/enemy3.png', ]
const scoreCounter = document.querySelector('#score span')
// end constants begin lets
let justice
let enemyInterval
//lets play
startButton.addEventListener("click", (event) => {
    playGame()
  })
// begin functions defining arrow key movement
function moveLeft(){
    let leftPosition = window.getComputedStyle(shooter).getPropertyValue('left')
    var end;
    if(shooter.style.left === "2%"){
        end
        // 
    } else {
        let position = parseInt(leftPosition)
        position -= 4
        shooter.style.left = `${position}px`
    }
    return end
}

function moveRight(){
    let leftPosition = window.getComputedStyle(shooter).getPropertyValue('left')
    if(shooter.style.left === "88%"){
        return
    } else {
        let position = parseInt(leftPosition)
        position += 4
        shooter.style.left = `${position}px`
    }
}
function moveUp() {
let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
if (shooter.style.top === "0px") {
    return
} else {
    let position = parseInt(topPosition)
    position -= 4
    shooter.style.top = `${position}px`
    }
}  
function moveDown() {
let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
if (shooter.style.top === "360px") {
    return
} else {
    let position = parseInt(topPosition)
    position += 4
    shooter.style.top = `${position}px`
    }
}
// end functions defining arrow key movement
function flyBoy(){
    if(event.key === "ArrowLeft"){
        event.preventDefault()
        moveLeft()
    } else if (event.key === "ArrowRight"){
        event.preventDefault()
        moveRight()
    } else if (event.key === " ") {
        event.preventDefault()
        fireAway()
    };
    if (event.key === "ArrowUp") {
        event.preventDefault()
        moveUp()
      } else if (event.key === "ArrowDown") {
        event.preventDefault()
        moveDown()
    }
}
window.addEventListener("keydown", flyBoy)
// not y axis is fixed so laser creation will grab current x axis.. offset the y axis to appear its nose of ship firing
// var gameArea = document.getElementById("gameArea")

// enemies
function createEnemy(){
    let newEnemy = document.createElement('img')
    let enemySpriteImg = enemyImg[Math.floor(Math.random()*enemyImg.length)]
    newEnemy.src =enemySpriteImg
    newEnemy.classList.add('enemy')
    newEnemy.style.left = `${Math.floor(Math.random()*330)+10}px`
    newEnemy.style.top = '-200px'
    gameArea.appendChild(newEnemy)
    moveEnemy(newEnemy)
}
function moveEnemy(enemy){
    let moveEnemyInterval = setInterval(() => {
        let yPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('top'))
        console.log(yPosition)
    if( yPosition === 340){
      enemy.remove()
    };
    if (yPosition <= 400) {
      if (Array.from(enemy.classList).includes("dead-enemy")) {
        console.log("im back")
      } else {
      enemy.style.top = `${yPosition + 2}px`
        }
      }
    }, 70)
}
// end enemy creation and movement functions
// begin laser fire functions 
function fireAway(){
    let laser = createLaserElement()
    gameArea.appendChild(laser)
    // let laserSFX = new Audio(filename#)
    moveLaser(laser)
}

function createLaserElement(){
    let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
    let xPosition = parseInt(window.getComputedStyle(playerShip).getPropertyValue('left'))
    let newLaser = document.createElement('img')
    newLaser.src = 'images/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition - 145}px`
    newLaser.style.top = `${yPosition-21}px`
    return newLaser
}


function moveLaser(laser) {
    let laserInterval = setInterval(() => {
      let yPosition = parseInt(laser.style.top)
      let enemies = document.querySelectorAll(".enemy")
      enemies.forEach(enemy => {
        if (checkLaserHit(laser, enemy)) {
          enemy.src = "images/explosion.png"
          enemy.classList.remove("enemy")
          enemy.classList.add("dead-enemy")
          scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
        }
      })
      if (yPosition <= 00) {
        laser.remove()
      } else {
        laser.style.top = `${yPosition - 18}px`
      }
    }, 10)
  }
//




// var scorecounter = 0;
function checkLaserHit(laser,enemy){
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let enemyTop = parseInt(enemy.style.top)
    let enemyBottom = (enemyTop - 30)
    let enemyLeft = parseInt(enemy.style.left)
    // left (x axis)= 0-400 px top(y axis)= 300- (-10)px
    console.log(enemyLeft)
    if (laserLeft != 400 && laserLeft + 40 >= enemyLeft) {
      if ( (laserTop <= enemyTop && laserTop >= enemyBottom) ) {
        console.log("hit me bitch")
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
       

function gameOver(){
    window.removeEventListener("keydown",flyBoy)
    clearInterval(enemyInterval)
    let enemies = document.querySelectorAll(".enemy")
    enemies.forEach(enemy => enemy.remove())
    let lasers = document.querySelectorAll(".laser")
    lasers.forEach(laser => laser.remove())
    setTimeout(() => {
        alert('game over, your final score is ${scoreCounter.innerText}!')
        startButton.style.display = "block"
        instructions.style.display = "block"
        scoreCounter.innerText = 0
    }, 1300)
}

function playGame(){
    startButton.style.display = "none"
    instructions.style.display = "none"
    window.addEventListener("keydown", flyBoy)
    // how often new enemy ship is created
    enemyInterval = setInterval(() => { createEnemy() }, 10500)
}
