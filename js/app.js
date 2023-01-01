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

// Create tictactoe game elements


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
    // checkSelectMainMenu()
}

const checkSelectMainMenu = () => {

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

const launchTicTacToe = () => {
    screenDiv.className = 'tictactoe'
    const boxes = document.querySelectorAll('.box')
    for (let i = 0; i < boxes.length; i++) {
        screenDiv.appendChild(boxes[i])
        boxes[i].style.display = 'block'
    }
    playTicTacToe()
}

const playTicTacToe = () => {

}



// When DOMContentLoaded, start the game, show start screen
document.addEventListener('DOMContentLoaded', () => {
    getStartScreen()
})