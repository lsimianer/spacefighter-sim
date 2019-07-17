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
    if(shooter.style.left === "2%"){
        return
    } else {
        let position = parseInt(leftPosition)
        position -= 4
        shooter.style.left = `${position}px`
    }

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
console.log("shit happens")
// not y axis is fixed so laser creation will grab current x axis.. offset the y axis to appear its nose of ship firing
// var gameArea = document.getElementById("gameArea")

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
    newLaser.style.left = `${xPosition - 290}px`
    newLaser.style.top = `${yPosition}px`
    return newLaser
}
//y is vertical x is horizontal
function moveLaser(laser) {
    let laserInterval = setInterval(() =>{
        let yPosition = parseInt(laser.style.top)
        let enemies = document.querySelectorAll('.enemyShip')
        enemies.forEach(enemy => {
            if(checkLaserHit(laser,enemy)) {
                enemy.classList.remove("enemy")
                enemy.classList.add("dead-enemy")
                scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
            }
        })
        if(yPosition === 0){
            laser.remove()
        } else {
            laser.style.top = `${yPosition -10}px`
        }
    },10)
}

// enemies

function createEnemy(){
    let newEnemy = document.createElement('img')
    let enemySpriteImg = enemyImg[Math.floor(Math.random()*enemyImg.length)]
    newEnemy.src =enemySpriteImg
    newEnemy.classList.add('enemy')
    newEnemy.classList.add('enemy-transition')
    newEnemy.style.left = `${Math.floor(Math.random()*330)+30}px`
    newEnemy.style.top = '0px'
    gameArea.appendChild(newEnemy)
    moveEnemy(newEnemy)
}
function moveEnemy(enemy){
    let moveEnemyInterval = setInterval(() => {
        let yPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue('top'))
        if(yPosition <= 70){
            if (Array.from(enemy.classList).includes("dead-enemy")) {
                enemy.remove()
            } else {
                gameOver()
            }
        } else {
            enemy.style.top = `${yPosition + 4}px`
        }
    }, 5)
}
// end enemy creation and movement functions
function checkLaserHit(laser,enemy){
    let laserLeft = parseInt(laser.style.left)
    let laserTop = parseInt(laser.style.top)
    let laserBottom = laserTop - 20
    let enemyTop = parseInt(enemy.style.top)
    let enemyBottom = enemyTop - 30
    let enemyLeft = parseInt(enemy.style.left)
    if( laserLeft != 340 && laserLeft + 40 >= monsterBottom) {
        if( ( laserTop <= enemyTop && laserTop >= enemyBottom) ){
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
    enemyInterval = setInterval(() => { createEnemy() }, 2100)
}
