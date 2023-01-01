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

// Create Main Menu Options
const mainMenu = ['Play', 'Listen', 'Watch']

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
    checkLinearNavigators(mainMenuOptions)
    checkSelectMainMenu(mainMenuOptions)
}

const checkLinearNavigators = (list) => {
    let selected = list[selection]
    selected.style.fontWeight = 'bold'
    downButton.addEventListener('click', () => {
        if (selection < (list.length - 1)) {
            selected.style.fontWeight = 'normal'
            selection++
            selected = list[selection]
            selected.style.fontWeight = 'bold'
            console.log(selection)
        }
    })
    upButton.addEventListener('click', () => {
        if (selection > 0) {
            selected.style.fontWeight = 'normal'
            selection--
            selected = list[selection]
            selected.style.fontWeight = 'bold'
        }
    })    
} 

const checkSelectMainMenu = (list) => {
    selectButton.addEventListener('click', () => {
        const mainMenuUl = document.getElementById('main-menu')
        mainMenuUl.style.display = 'none'
        if (selection === 0) {
            displayGameMenu()
        } else if (selection === 1) {
            displayListenMenu()
        } else if (selection === 2) {
            displayWatchMenu()
        }
    })
}

const displayPlayMenu = () => {
    console.log('display game menu')
}
const displayListenMenu = () => {
    console.log('display listen menu')
}
const displayWatchMenu = () => {
    console.log('display watch menu')
}

// When DOMContentLoaded, start the game, show start screen
document.addEventListener('DOMContentLoaded', () => {
    getStartScreen()
})