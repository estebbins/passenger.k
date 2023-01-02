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

const clearNavigatorListeners = () => {
    upButton.removeEventListener('click', downAction)
    downButton.removeEventListener('click', downAction, true)
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
    }, {once: true})
}

// When DOMContentLoaded, start the game, show start screen
document.addEventListener('DOMContentLoaded', () => {
    getStartScreen()
})


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
        } else if (result === false) {
            // If player O wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player O Wins!"
            resultBox.style.color = '#cdcdcd'
        } else if (moveCounter === 9 && result === null) {
            // If neither player wins, add & style the text in the result div, increase the score counter and end the game. Apply complimentary textShadow to override default
            resultBox.textContent = "It's a Tie!"
            resultBox.style.color = '#e6a176'
            resultBox.style.textShadow = '1px 1px 2px #984464'
        }
        // Remove the tictactoe boxes from the screen.=
        screenDiv.classList.remove('tictactoe')
        for (let i = 0; i < boxes.length; i++) {
            gameDiv.appendChild(boxes[i])
            boxes[i].style.display = 'none'
        }
        // Append the result div to the screen
        screenDiv.appendChild(resultBox)
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

// const gameOver = () => {
//     // When the game ends in win/lose/tie, deactivate clicks on remaining boxes
//     for (let i = 0; i < divGame.length; i++) {
//         divGame[i].classList.add('played')
//     }
//     // Show the updated scores in the stats divs
//     document.querySelector('#player-X').textContent = `${playerXScore}`
//     document.querySelector('#player-O').textContent = `${playerOScore}`
//     document.querySelector('#tie').textContent = `${tieScore}`
//     // Style the new game button to indicate to user they should click it
//     newGameButton.style.backgroundColor = '#82981e'
// }

// const newGame = () => {
//     // Once clicked, the new game button turns grey since a new game already started, though can still be used
//     newGameButton.style.backgroundColor = 'grey'
//     // Remove played tags & images from all boxes & return to default color
//     for (let i = 0; i < divGame.length; i++) {
//         divGame[i].classList.remove('played')
//         divGame[i].style.backgroundImage = 'none'
//     }
//     // Empty player arrays 
//     for (let i = 0; i < 9; i++) {
//         playerXMoves.pop()
//         playerOMoves.pop()
//     }
//     // reset move counter to 0
//     moveCounter = 0
//     // Remove resultBox from the messages div
//     const resultBox = document.getElementById('result')
//     if(divMessages.contains(resultBox)) {
//         divMessages.removeChild(resultBox)
//     }
//     // Style change first button to indicate it can be selected
//     changeFirstButton.style.backgroundColor = '#82981e'
//     // Bold the first player based on whether there is an offset or not
//     if (playerOffset === 0) {
//         document.querySelector('#pX-indicator').style.fontWeight = 'bolder'
//         document.querySelector('#pO-indicator').style.fontWeight = 'normal'
//     } else {
//         document.querySelector('#pO-indicator').style.fontWeight = 'bolder'
//         document.querySelector('#pX-indicator').style.fontWeight = 'normal'
//     }
// }

// // Function to restart statistic tracking
// const resetGame = () => {
//     // Call new game function
//     newGame()
//     // Reset remaining statistics
//     playerXScore = 0
//     playerOScore = 0
//     tieScore = 0
//     // Reset player offset to default
//     playerOffset = 0
//     // Reset statistics displayed on the screen
//     document.querySelector('#player-X').textContent = `${playerXScore}`
//     document.querySelector('#player-O').textContent = `${playerOScore}`
//     document.querySelector('#tie').textContent = `${tieScore}`
// }

// // Function to change which player X or O will start the game
// const changeFirstPlayer = () => {
//     // This can only be used when the game is new (move counter = 0)
//     if (moveCounter === 0) {
//         // Alternate between the players using the offset of 0 or 1
//         if (playerOffset === 0) {
//             // Change to player O
//             playerOffset = 1
//             // Change button text to alternate player to indicate what the button will do
//             changeFirstButton.textContent = 'Change First to: X'
//             // Style the next player in bold in the stats div
//             document.querySelector('#pX-indicator').style.fontWeight = 'normal'
//             document.querySelector('#pO-indicator').style.fontWeight = 'bolder'
//         } else if (playerOffset === 1) {
//             // Change to player X
//             playerOffset = 0
//             // Change button text to alternate player to indicate what the button will do
//             changeFirstButton.textContent = 'Change First to: O'
//             // Style the next player in bold in the stats div
//             document.querySelector('#pX-indicator').style.fontWeight = 'bolder'
//             document.querySelector('#pO-indicator').style.fontWeight = 'normal'
//         }
//     }
// }