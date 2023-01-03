// When DOMContentLoaded, start the game. 

// Access HTML elements
const gameDiv = document.getElementById('game')
const screenDiv = document.getElementById('screen')
const entertainmentDiv = document.getElementById('entertainment-meter')
const sanityDiv = document.getElementById('sanity-meter')
const etaDiv = document.getElementById('eta')
const upButton = document.getElementById('up')
const downButton = document.getElementById('down')
const leftButton = document.getElementById('left')
const rightButton = document.getElementById('right')
const selectButton = document.getElementById('select')
const safetyCardDiv = document.getElementById('safety-card')
const safetyCardSpan = document.getElementById('safe-card')

// Create statistics
let entertainmentScore = 100
let sanityScore = 100
// eta is in units of seconds
let eta = 300

// Create Menu Options
const mainMenu = ['Play', 'Listen', 'Watch']
const playMenu = ['Tic-Tac-Toe', 'Other game']

// Create selection option for screen div options to default to 0
let selection = 0




const getStartScreen = () => {
    // Set up start button & add to screen div
    const startButton = document.createElement('button')
    startButton.id = 'start'
    startButton.innerText = 'Board Plane'
    screenDiv.appendChild(startButton)
    startButton.addEventListener('click', () => {
        displayStats(entertainmentScore, sanityScore, eta)
        startGameStats()
        screenDiv.removeChild(startButton)
        displayMainMenu()
        safetyCardSpan.textContent = 'Safety Card'
        safetyCardDiv.addEventListener('click', openSafetyCard)
    })
    


    // a! Will need to add more reset features to this screen.
}

const displayStats = (entScore, sanScore, currentEta) => {
    entertainmentDiv.textContent = entScore
    sanityDiv.textContent = sanScore
    // format eta, Math.floor method recommendation from https://www.golinuxcloud.com/javascript-integer-division/ 
    const etaMinute = Math.floor(currentEta / 60)
    const etaSecond = currentEta % 60
    if (etaSecond < 10) {
        etaDiv.textContent = `${etaMinute}:0${etaSecond}`
    } else {
        etaDiv.textContent = `${etaMinute}:${etaSecond}`
    }
}

const startGameStats = () => {
    // set Eta to a variable to use in setTimeout
    let totalEta = eta*1000

    const countdownEtaEnt = () => {
        eta -= 1
        entertainmentScore -= 1
        displayStats(entertainmentScore, sanityScore, eta)
    }
    const countdownSanity = () => {
        sanityScore -= 1
        displayStats(entertainmentScore, sanityScore, eta) 
    }
    // countdown for ETA & entertainment will be -1 each second
    // countdown for sanity will be -1 every three seconds
    const intervalEtaEnt = setInterval(countdownEtaEnt, 1000)
    const intervalSanity = setInterval(countdownSanity, 3000)
    // creates clearIntervals for ETA, entertainment & sanity
    const stopCountdowns = () => {
        clearInterval(intervalEtaEnt)
        clearInterval(intervalSanity)
    }
    // a! Some game end conditions
    if (eta === 0 || entertainmentScore === 0 || sanityScore === 0) {
        stopCountdowns()
    } else if (eta > 0) {
        setTimeout(stopCountdowns, totalEta)
    }
}

const displayMainMenu = () => {
    // Create Ul and Li items for main menu
    const mainMenuUl = document.createElement('ul')
    mainMenuUl.id = 'main-menu'
    for (let i = 0; i < mainMenu.length; i++) {
        const listItem = document.createElement('li')
        listItem.innerText = mainMenu[i]
        listItem.className = 'main-menu-list'
        mainMenuUl.appendChild(listItem)
    }
    // Append menu to screen div
    mainMenuUl.style.display = 'block'
    screenDiv.appendChild(mainMenuUl)
    const mainMenuOptions = document.querySelectorAll('.main-menu-list')
    // Add event listeners
    checkLinearNavigators(mainMenuOptions, mainMenuUl)
}

const displayPlayMenu = () => {                         
    // Create Ul and Li items for main menu
    const playMenuUl = document.createElement('ul')
    playMenuUl.id = 'play-menu'
    for (let i = 0; i < playMenu.length; i++) {
        const listItem = document.createElement('li')
        listItem.innerText = playMenu[i]
        listItem.className = 'play-menu-list'
        playMenuUl.appendChild(listItem)
    }
    // Append menu to screen div
    playMenuUl.style.display = 'block'
    screenDiv.appendChild(playMenuUl)
    const playMenuOptions = document.querySelectorAll('.play-menu-list')
    // Add event listeners
    checkLinearNavigators(playMenuOptions, playMenuUl)
}

const displayListenMenu = () => {
    console.log('display listen menu')
}
const displayWatchMenu = () => {
    console.log('display watch menu')
}
const checkLinearNavigators = (list, ul) => {
    let selected = list[selection]
    selected.style.fontWeight = 'bold'
    downButton.addEventListener('click', 
        downAction = () => {        
            if (selection < (list.length - 1)) {
                console.log(list)
                selected = list[selection]
                selected.style.fontWeight = 'normal'
                selection += 1
                selected = list[selection]
                selected.style.fontWeight = 'bold'
                }
    })
    upButton.addEventListener('click', upAction = () => {
        if (selection > 0) {
            selected.style.fontWeight = 'normal'
            selection--
            selected = list[selection]
            selected.style.fontWeight = 'bold'
        }
    })
    selectButton.addEventListener('click', selectAction = () => {
        ul.style.display = 'none'
        downButton.removeEventListener('click', downAction)
        upButton.removeEventListener('click', upAction)
        selectButton.removeEventListener('click', selectAction)
        if (ul.id === 'main-menu') {
            if (selection === 0) {
                displayPlayMenu()
            } else if (selection === 1) {
                displayListenMenu()
            } else if (selection === 2) {
                displayWatchMenu()
            }
        } else if (ul.id === 'play-menu') {
            if (selection === 0) {launchTicTacToe()}
        }
        selection = 0
        screenDiv.removeChild(ul)
    }, {once: true})
}

const gameOver = () => {
    alert('Game over!')
}

// When DOMContentLoaded, start the game, show start screen
document.addEventListener('DOMContentLoaded', () => {
    getStartScreen()
})

// if (entertainmentScore >= 100) {
//     entertainmentScore = 100
// } else if entertainmentScore < 0 {
//     gameOver()
// }

// Create tictactoe game elements
const boxes = document.querySelectorAll('.box')
// Style Player Markers
const playerXMarker = "url('https://cdn.pixabay.com/photo/2020/09/13/19/08/letter-x-5569116_960_720.png')"
const playerOMarker = "url('https://cdn.pixabay.com/photo/2020/09/13/19/13/letter-5569138_960_720.png')"
// Create tictactoe win conditions & combine into array
const winOne = ['box-1', 'box-2', 'box-3']
const winTwo = ['box-4', 'box-5', 'box-6']
const winThree = ['box-7', 'box-8', 'box-9']
const winFour = ['box-1', 'box-4', 'box-7']
const winFive = ['box-2', 'box-5', 'box-8']
const winSix = ['box-3', 'box-6', 'box-9']
const winSeven = ['box-1', 'box-5', 'box-9']
const winEight = ['box-3', 'box-5', 'box-7']
const winConditions = [winOne, winTwo, winThree, winFour, winFive, winSix, winSeven, winEight]

// Create game statistics
const playerXMoves = []
const playerOMoves = []
let moveCounter = 0

const launchTicTacToe = () => {
    screenDiv.classList.add('tictactoe')
    for (let i = 0; i < boxes.length; i++) {
        screenDiv.appendChild(boxes[i])
        boxes[i].style.display = 'block'
    }
    const boxOne = document.getElementById('box-1')
    boxOne.classList.add('tttselection')
    playTicTacToe()
}
const navAction = (event) => {
    if (event.target.id === 'down') {
        if (boxes[0].classList.contains('tttselection')) {
            boxes[0].classList.remove('tttselection')
            boxes[3].classList.add('tttselection')
        } else if (boxes[1].classList.contains('tttselection')) {
            boxes[1].classList.remove('tttselection')
            boxes[4].classList.add('tttselection')
        } else if (boxes[2].classList.contains('tttselection')) {
            boxes[2].classList.remove('tttselection')
            boxes[5].classList.add('tttselection')
        } else if (boxes[3].classList.contains('tttselection')) {
            boxes[3].classList.remove('tttselection')
            boxes[6].classList.add('tttselection')
        } else if (boxes[4].classList.contains('tttselection')) {
            boxes[4].classList.remove('tttselection')
            boxes[7].classList.add('tttselection')
        } else if (boxes[5].classList.contains('tttselection')) {
            boxes[5].classList.remove('tttselection')
            boxes[8].classList.add('tttselection')
        } else {
            sanityScore--
            displayStats(entertainmentScore, sanityScore, eta) 
        }
    } else if (event.target.id === 'up') {
        if (boxes[3].classList.contains('tttselection')) {
            boxes[3].classList.remove('tttselection')
            boxes[0].classList.add('tttselection')
        } else if (boxes[4].classList.contains('tttselection')) {
            boxes[4].classList.remove('tttselection')
            boxes[1].classList.add('tttselection')
        } else if (boxes[5].classList.contains('tttselection')) {
            boxes[5].classList.remove('tttselection')
            boxes[2].classList.add('tttselection')
        } else if (boxes[6].classList.contains('tttselection')) {
            boxes[6].classList.remove('tttselection')
            boxes[3].classList.add('tttselection')
        } else if (boxes[7].classList.contains('tttselection')) {
            boxes[7].classList.remove('tttselection')
            boxes[4].classList.add('tttselection')
        } else if (boxes[8].classList.contains('tttselection')) {
            boxes[8].classList.remove('tttselection')
            boxes[5].classList.add('tttselection')
        } else {
            sanityScore--
            displayStats(entertainmentScore, sanityScore, eta) 
        }
    } else if (event.target.id === 'left') {
        if (boxes[1].classList.contains('tttselection')) {
            boxes[1].classList.remove('tttselection')
            boxes[0].classList.add('tttselection')
        } else if (boxes[2].classList.contains('tttselection')) {
            boxes[2].classList.remove('tttselection')
            boxes[1].classList.add('tttselection')
        } else if (boxes[4].classList.contains('tttselection')) {
            boxes[4].classList.remove('tttselection')
            boxes[3].classList.add('tttselection')
        } else if (boxes[5].classList.contains('tttselection')) {
            boxes[5].classList.remove('tttselection')
            boxes[4].classList.add('tttselection')
        } else if (boxes[7].classList.contains('tttselection')) {
            boxes[7].classList.remove('tttselection')
            boxes[6].classList.add('tttselection')
        } else if (boxes[8].classList.contains('tttselection')) {
            boxes[8].classList.remove('tttselection')
            boxes[7].classList.add('tttselection')
        } else {
            sanityScore--
            displayStats(entertainmentScore, sanityScore, eta) 
        }
    } else if (event.target.id === 'right') {
        if (boxes[0].classList.contains('tttselection')) {
            boxes[0].classList.remove('tttselection')
            boxes[1].classList.add('tttselection')
        } else if (boxes[1].classList.contains('tttselection')) {
            boxes[1].classList.remove('tttselection')
            boxes[2].classList.add('tttselection')
        } else if (boxes[3].classList.contains('tttselection')) {
            boxes[3].classList.remove('tttselection')
            boxes[4].classList.add('tttselection')
        } else if (boxes[4].classList.contains('tttselection')) {
            boxes[4].classList.remove('tttselection')
            boxes[5].classList.add('tttselection')
        } else if (boxes[6].classList.contains('tttselection')) {
            boxes[6].classList.remove('tttselection')
            boxes[7].classList.add('tttselection')
        } else if (boxes[7].classList.contains('tttselection')) {
            boxes[7].classList.remove('tttselection')
            boxes[8].classList.add('tttselection')
        } else {
            sanityScore--
            displayStats(entertainmentScore, sanityScore, eta) 
        }
    } 
}


const makeMove = (event) => {
    // Increase move counter
    moveCounter++
    // Identify which box is selected
    const tttPlayerSelection = document.querySelector('.tttselection')
    if (event.target.id === 'select' && !tttPlayerSelection.classList.contains('played')) {
        // Identify which player's move it is based on move counter
        if (moveCounter % 2 === 0) {
            // Style player selection
            tttPlayerSelection.style.backgroundImage = playerOMarker
            tttPlayerSelection.style.backgroundSize = '80%'
            // Add class to div to deactivate click in CSS
            tttPlayerSelection.classList.add('played')
            // Push move into Player's game array
            playerOMoves.push(tttPlayerSelection.id)
        } else {
            // Style player selection
            tttPlayerSelection.style.backgroundImage = playerXMarker
            // Add class to div to deactivate click in CSS
            tttPlayerSelection.classList.add('played')
            // Push move into Player's game array
            playerXMoves.push(tttPlayerSelection.id)
        }
    } else if (event.target.id === 'select') {
        sanityScore--
        displayStats(entertainmentScore, sanityScore, eta) 
    }
    // Call print win function to determine if win result and assess move counter
    // in the case of a tie, which should not be assessed until all 9 moves have been made
    // and evaluated
    console.log('moves: ', moveCounter)
    console.log('playerX: ', playerXMoves)
    console.log('player0: ', playerOMoves)
    printWin(moveCounter, checkWin())

}

// Adds appropriate event listeners for TicTacToe game
const playTicTacToe = () => {
    upButton.addEventListener('click', navAction)
    downButton.addEventListener('click', navAction)
    leftButton.addEventListener('click', navAction)
    rightButton.addEventListener('click', navAction)
    selectButton.addEventListener('click', makeMove)
}

// Function to display results
const printWin = (moveCounter, result) => {
    // If checkWin results in true or false, or if all moves have been made and no win is foung
    if (result === true | result === false | (result === null && moveCounter === 9)) {
        // Create div to display the results of the game & apply an id of result
        const resultBox = document.createElement('div')
        resultBox.id = 'tttresult'
        if (result === true) {
            // If player X wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player X Wins!"
            resultBox.style.color = 'rgb(51, 201, 206)'
            sanityScore += 5
            entertainmentScore += 10
            displayStats(entertainmentScore, sanityScore, eta) 
        } else if (result === false) {
            // If player O wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player O Wins!"
            resultBox.style.color = '#cdcdcd'
            sanityScore += 2
            entertainmentScore += 5
            displayStats(entertainmentScore, sanityScore, eta) 
        } else if (moveCounter === 9 && result === null) {
            // If neither player wins, add & style the text in the result div, increase the score counter and end the game. Apply complimentary textShadow to override default
            resultBox.textContent = "It's a Tie!"
            resultBox.style.color = '#e6a176'
            resultBox.style.textShadow = '1px 1px 2px #984464'
            sanityScore -= 10
            entertainmentScore -= 10
            displayStats(entertainmentScore, sanityScore, eta) 
        }
        // Remove the tictactoe boxes from the screen.=
        screenDiv.classList.remove('tictactoe')
        for (let i = 0; i < boxes.length; i++) {
            gameDiv.appendChild(boxes[i])
            boxes[i].style.display = 'none'
            boxes[i].style.backgroundImage = 'none'
            boxes[i].classList.remove('played')
            boxes[i].classList.remove('tttselection')
        }
        // Append the result div to the screen
        screenDiv.appendChild(resultBox)
        // Add leave option to screen
        const leaveOption = document.createElement('div')
        leaveOption.id = 'leave'
        screenDiv.append(leaveOption)
        leaveOption.textContent = 'Exit to Main Menu'
        // Reset ttt statistics
        moveCounter = 0
        for (let i = 0; i < 9; i++) {
            playerXMoves.pop()
            playerOMoves.pop()
        }
        leaveTicTacToe()
    }
}  

// function to compare two arrays
const findWinCombo = (array1, array2) => {
    const checkFor = (box) => {
        return array1.includes(box)
    }
    return array2.every(checkFor) 
}

// Function to compare player arrays to win combos. 
const checkWin = () => {
    // Return unique values based on results - X win = true, O win = false
    for(i = 0; i < winConditions.length; i++) {
        if(findWinCombo(playerXMoves, winConditions[i]) === true) {
            return true
        } else if (findWinCombo(playerOMoves, winConditions[i]) === true) {
            return false
        } 
    }
    // No win returns null
    return null
}

const leaveTicTacToe = () => {
    // Remove game event listeners
    upButton.removeEventListener('click', navAction)
    downButton.removeEventListener('click', navAction)
    leftButton.removeEventListener('click', navAction)
    rightButton.removeEventListener('click', navAction)
    selectButton.removeEventListener('click', makeMove)

    const exitToMain = () => {
        const tttResult = document.getElementById('tttresult')
        const tttLeave = document.getElementById('leave')
        screenDiv.removeChild(tttResult)
        screenDiv.removeChild(tttLeave)
        displayMainMenu()
        selectButton.removeEventListener('click', exitToMain)
    }
    selectButton.addEventListener('click', exitToMain)
    console.log('selection ', selection)
    // Add select event listener for new option on screen

}

// Safety Card Puzzle

// Used site for guidance and code for dragging & dropping https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/#:~:text=Most%20modern%20web%20browsers%20have,you%20would%20drag%20an%20image. 



const openSafetyCard = () => {
    safetyCardDiv.removeEventListener('click', openSafetyCard)
    gameDiv.appendChild(safetyCardDiv)
    safetyCardDiv.style.gridArea = '3 / 3 / 4 / 4'
    safetyCardDiv.style.zIndex = '1'
    safetyCardDiv.style.display = 'grid'
    safetyCardDiv.style.backgroundColor = 'gray'
    safetyCardDiv.style.gridTemplateRows = '.2fr repeat(5, 1fr)'
    safetyCardDiv.style.gridTemplateColumns = '1.5fr 1.5fr 1fr 2fr 1.5fr 1.5fr'
    safetyCardSpan.style.gridArea = '1 / 1 / 7 / 2'
    const panelOneDiv = document.createElement('div')
    const panelTwoDiv = document.createElement('div')
    const panelThreeDiv = document.createElement('div')
    panelOneDiv.classList.add('panel')
    panelTwoDiv.classList.add('panel')
    panelThreeDiv.classList.add('panel')
    panelOneDiv.style.gridArea = '1 / 1 / 7 / 3'
    panelTwoDiv.style.gridArea = '1 / 3 / 7 / 5'
    panelThreeDiv.style.gridArea = '1 / 5 / 7 / 7'

    
    const seatbeltOneDiv = document.createElement('div')
    const seatbeltTwoDiv = document.createElement('div')
    const smokingOneDiv = document.createElement('div')
    const smokingTwoDiv = document.createElement('div')
    const maskAOneDiv = document.createElement('div')
    const maskATwoDiv = document.createElement('div')
    const maskBOneDiv = document.createElement('div')
    const maskBTwoDiv = document.createElement('div')
    const bagOneDiv = document.createElement('div')
    const bagTwoDiv = document.createElement('div')
    seatbeltOneDiv.className = 'dragdiv'
    seatbeltTwoDiv.className = 'dragdiv'
    smokingOneDiv.className = 'dragdiv'
    smokingTwoDiv.className = 'dragdiv'
    maskAOneDiv.className = 'dragdiv'
    maskATwoDiv.className = 'dragdiv'
    maskBOneDiv.className = 'dragdiv'
    maskBTwoDiv.className = 'dragdiv'
    bagOneDiv.className = 'dragdiv'
    bagTwoDiv.className = 'dragdiv'

    const answerOne = document.createElement('div')
    const answerTwo = document.createElement('div')
    const answerThree = document.createElement('div')
    const answerFour = document.createElement('div')
    const answerFive = document.createElement('div')

    answerOne.className = ('safety-answer')
    answerTwo.className = ('safety-answer')
    answerThree.className = ('safety-answer')
    answerFour.className = ('safety-answer')
    answerFive.className = ('safety-answer')

    safetyCardDiv.appendChild(answerOne)
    safetyCardDiv.appendChild(answerTwo)
    safetyCardDiv.appendChild(answerThree)
    safetyCardDiv.appendChild(answerFour)
    safetyCardDiv.appendChild(answerFive)

    answerOne.style.gridArea = '2 / 4 / 3 / 5'
    answerTwo.style.gridArea = '3 / 4 / 4 / 5'
    answerThree.style.gridArea = '4 / 4 / 5 / 5'
    answerFour.style.gridArea = '5 / 4 / 6 / 5'
    answerFive.style.gridArea = '6 / 4 / 7 / 5'

    seatbeltOneDiv.style.gridArea = '2 / 1 / 3 / 2'
    seatbeltTwoDiv.style.gridArea = '6 / 5 / 7 / 6'
    smokingOneDiv.style.gridArea = '3 / 2 / 4 / 3'
    smokingTwoDiv.style.gridArea = '5 / 6 / 6 / 7'
    maskAOneDiv.style.gridArea = '4 / 1 / 5 / 2'
    maskATwoDiv.style.gridArea = '2 / 5 / 3 / 6'
    maskBOneDiv.style.gridArea = '5 / 2 / 6 / 3'
    maskBTwoDiv.style.gridArea = '3 / 6 / 4 / 7'
    bagOneDiv.style.gridArea = '6 / 1 / 7 / 2'
    bagTwoDiv.style.gridArea = '4 / 5 / 5 / 6'
    seatbeltOneDiv.style.backgroundColor = 'blue'
    seatbeltTwoDiv.style.backgroundColor = 'blue'
    smokingOneDiv.style.backgroundColor = 'red'
    smokingTwoDiv.style.backgroundColor = 'red'
    maskAOneDiv.style.backgroundColor = 'pink'
    maskATwoDiv.style.backgroundColor = 'pink'
    maskBOneDiv.style.backgroundColor = 'yellow'
    maskBTwoDiv.style.backgroundColor = 'yellow'
    bagOneDiv.style.backgroundColor = 'green'
    bagTwoDiv.style.backgroundColor = 'green'

    safetyCardDiv.appendChild(panelOneDiv)
    safetyCardDiv.appendChild(panelTwoDiv)
    safetyCardDiv.appendChild(panelThreeDiv)

    safetyCardDiv.appendChild(seatbeltOneDiv)
    safetyCardDiv.appendChild(seatbeltTwoDiv)
    safetyCardDiv.appendChild(smokingOneDiv)
    safetyCardDiv.appendChild(smokingTwoDiv)
    safetyCardDiv.appendChild(maskAOneDiv)
    safetyCardDiv.appendChild(maskATwoDiv)
    safetyCardDiv.appendChild(maskBOneDiv)
    safetyCardDiv.appendChild(maskBTwoDiv)
    safetyCardDiv.appendChild(bagOneDiv)
    safetyCardDiv.appendChild(bagTwoDiv)

    const safetyPanelDivs = document.querySelectorAll('.panel')
    const safetyAnswers = document.querySelectorAll('.safety-answer')
    const draggableImages = document.querySelectorAll('.safetycard-img')
    const dragDivs = document.querySelectorAll('.dragdiv')

    for (let i = 0; i < draggableImages.length; i++) {
        let div = dragDivs[i]
        let img = draggableImages[i]
        img.id = i
        div.appendChild(img)
        img.addEventListener('dragstart', dragStart)
    }
    console.log(safetyAnswers)
    safetyAnswers.forEach((div) => {
        div.addEventListener('dragenter', dragEnter)
        div.addEventListener('dragover', dragOver)
        div.addEventListener('dragleave', dragLeave)
        div.addEventListener('drop', drop)
        div.textContent = 'hey'
    })
    safetyPanelDivs.forEach(div => {
        div.addEventListener('dragenter', dragEnter)
        div.addEventListener('dragover', dragOver)
        div.addEventListener('dragleave', dragLeave)
        div.addEventListener('drop', drop)
        div.style.border = '2px solid black'
    })
}

const dragStart = (event) => {
    console.log('dragstart')
    event.dataTransfer.setData('text/plain', event.target.id)
    setTimeout(() => {
        event.target.classList.add('hide')
    }, 0)
}

const dragEnter = (event) => {
    console.log('dragenter')
    event.preventDefault()
    event.target.classList.add('drag-over')
}
// why is this the same function???
const dragOver = (event) => {
    console.log('dragover')
    event.preventDefault()
    event.target.classList.add('drag-over')
}

const dragLeave = (event) => {
    console.log('dragleave')
    event.target.classList.remove('drag-over')
}

const drop = (event) => {
    console.log('drop')
    event.preventDefault()
    event.target.classList.remove('drag-over')
    // Get the draggable image
    const id = event.dataTransfer.getData('text/plain')
    const draggable = document.getElementById(id)
    console.log(draggable)
    // Add the draggable element to the drop target
    event.target.appendChild(draggable)

    // Display the draggable element
    draggable.classList.remove('hide')
}