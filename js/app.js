// When DOMContentLoaded, start the game. 

// Access HTML elements
const gameDiv = document.getElementById('game')
const seatOneDiv = document.getElementById('seat-1')
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
const trayTableButton =document.getElementById('tray-open')
const consoleDiv = document.getElementById('console')
const controlsDiv = document.getElementById('controls')
const phoneDiv = document.getElementById('phone')
const cellPhoneDiv = document.getElementById('cellphone')
const cellTextOneButton = document.getElementById('cell-text-1')
const cellTextTwoButton = document.getElementById('cell-text-2')
const cellTextThreeButton = document.getElementById('cell-text-3')

// Create statistics
let intervalEta
let intervalEnt
let intervalSanity
let entertainmentScore = 100
let entRate = 1000
let sanityScore = 100
let sanityRate = 3000
// eta is in units of seconds
let eta = 300
let etaRate = 1000

// Create Menu Options
const mainMenu = ['Play', 'Listen', 'Watch']
const playMenu = ['Tic-Tac-Toe', 'Other game']
const watchMenu = ['ICU', '2', '3']

const leaveOption = document.createElement('div')
leaveOption.id = 'leave'
leaveOption.textContent = 'Exit to Main Menu'

// Create selection option for screen div options to default to 0
let selection = 0

const movieOne = document.getElementById('alien')
const trayTableDiv = document.getElementById('tray-table')
const attendantDiv = document.getElementById('attendant')
const attendantTextDiv = document.createElement('div')
const trayTableOptions = ['Comply', 'Ask for 5 more minutes', 'Make a scene']
const passengerDiv = document.getElementById('passenger')
const babyTextDiv = document.createElement('div')
const babyOptions = ['Try to ignore', 'Put in headphones', 'Cry louder than the baby', 'Play Peekaboo']

let timer = Math.floor(Math.random() * 30000) + 10000

let phoneInteraction = true

const getStartScreen = () => {
    // Set up start button & add to screen div
    const startButton = document.createElement('button')
    startButton.id = 'start'
    startButton.innerText = 'Board Plane'
    screenDiv.appendChild(startButton)
    startButton.addEventListener('click', () => {
        stylePage()
        displayStats(entertainmentScore, sanityScore, eta)
        startGameStats()
        screenDiv.removeChild(startButton)
        displayMainMenu()
        safetyCardSpan.textContent = 'Safety Card'
        safetyCardDiv.addEventListener('click', openSafetyCard)
        trayTableButton.addEventListener('click', startTrayTableInt)
        startBabyTimer()
        startPhoneTimer()
    })
    // a! Will need to add more reset features to this screen.
}

const stylePage = () => {
    const seatOuter = document.getElementById('seat-outer')
    const seatMain = document.getElementById('seat-main')
    seatOuter.style.boxShadow = '10px 0 3px 2px rgba(0,0,0,0.4)'
    seatMain.style.boxShadow = '10px 0 3px 2px rgba(0,0,0,0.4)'
}

const checkGameConditions = () => {
    if (entertainmentScore === 0) {
        stopCountdowns()
        console.log('bored to death')
    } else if (sanityScore === 0) {
        console.log('You jumped out of the emergency exit')
    } else if (eta === 0) {
        console.log('congrats you made it to takeoff')
    }
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
    checkGameConditions()
}

const startGameStats = () => {
    // set Eta to a variable to use in setTimeout

    const countdownEta = () => {
        eta -= 1
        displayStats(entertainmentScore, sanityScore, eta)
    }
    const countdownEnt = () => {
        entertainmentScore -= 1
        displayStats(entertainmentScore, sanityScore, eta)
    }
    const countdownSanity = () => {
        sanityScore -= 1
        displayStats(entertainmentScore, sanityScore, eta) 
    }
    // countdown for ETA & entertainment will be -1 each second
    // countdown for sanity will be -1 every three seconds
    intervalEta = setInterval(countdownEta, etaRate)
    intervalEnt = setInterval(countdownEnt, entRate)
    intervalSanity = setInterval(countdownSanity, sanityRate)
    // creates clearIntervals for ETA, entertainment & sanity

    // a! Some game end conditions
}
const stopCountdowns = () => {
    clearInterval(intervalEnt)
    clearInterval(intervalSanity)
    clearInterval(intervalEta)
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
    const watchMenuUl = document.createElement('ul')
    watchMenuUl.id = 'watch-menu'
    for (let i = 0; i < watchMenu.length; i++) {
        const listItem = document.createElement('li')
        listItem.innerText = watchMenu[i]
        listItem.className = 'watch-menu-list'
        watchMenuUl.appendChild(listItem)
    }
    // Append menu to screen div
    watchMenuUl.style.display = 'block'
    screenDiv.appendChild(watchMenuUl)
    const watchMenuOptions = document.querySelectorAll('.watch-menu-list')
    // Add event listeners
    checkLinearNavigators(watchMenuOptions, watchMenuUl)

}
const checkLinearNavigators = (list, ul) => {
    console.log(selection)
    let selected = list[selection]
    selected.style.fontWeight = 'bold'
    downButton.addEventListener('click', 
        downAction = () => {        
            if (selection < (list.length - 1)) {
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
                selection = 0
                displayPlayMenu()
            } else if (selection === 1) {
                selection = 0
                displayListenMenu()
            } else if (selection === 2) {
                selection = 0
                displayWatchMenu()
            }
        } else if (ul.id === 'play-menu') {
            if (selection === 0) {
                selection = 0
                launchTicTacToe()
        }
        } else if (ul.id === 'watch-menu') {
            if (selection === 0) {
                watchMovie(0)
            }
        }
        selection = 0
        screenDiv.removeChild(ul)
    }, {once: true})
}


// Resource for Movie HTML guidance https://www.w3schools.com/html/html5_video.asp 
// Royalty Free Alien Movie - https://pixabay.com/videos/alien-eye-gel-aloe-vera-blender-139974/ 

const watchMovie = (num) => {
    screenDiv.appendChild(movieOne)
    const sourceOne = document.createElement('source')
    sourceOne.src = 'img/Alienmovie.mp4'
    sourceOne.type = 'video/mp4'
    movieOne.appendChild(sourceOne)
    movieOne.autoplay = true
    setTimeout(()=>screenDiv.appendChild(leaveOption), 8000)
    selectButton.addEventListener('click', exitMovie)
}

const exitMovie = () => {
    while (screenDiv.firstChild) {
        screenDiv.removeChild(screenDiv.firstChild)
    }
    displayMainMenu()
}

let trayTableStr = "Excuse me! We can't take off until your tray table is closed!"

const attendantInt = () => {
    attendantDiv.appendChild(attendantTextDiv)
    attendantTextDiv.innerText = trayTableStr
    // consoleDiv.style.zIndex = '1'
    consoleDiv.style.display = 'grid'
    consoleDiv.style.gridTemplate = '3fr repeat(3, 1fr) 3fr / 1fr'
    controlsDiv.style.display = 'none'
    phoneDiv.classList.add('hide')
    screenDiv.classList.add('hide')
    for (let i=0; i < trayTableOptions.length; i++) {
        let button = document.createElement('button')
        const buttonDiv = document.createElement('div')
        button.innerText = trayTableOptions[i]
        button.id = `${i}opt`
        button.className = 'trayTableOptions'
        buttonDiv.appendChild(button)
        consoleDiv.appendChild(buttonDiv)
        buttonDiv.style.display = 'flex'
        buttonDiv.style.gridArea = `${2+i} / 1 / ${3+i} / 2`
        buttonDiv.style.justifyContent = 'center'
    }
    const trayTableButtons = document.querySelectorAll('.trayTableOptions')
    trayTableButtons.forEach(ttbutton => {
        ttbutton.addEventListener('click', reactTrayTable)
    })
}

const reactTrayTable = (event) => {
    if (event.target.id === '0opt') {
        console.log('option 1 tray table')
    } else if (event.target.id === '1opt') {
        console.log('option 2 tray table')
    } else if (event.target.id === '2opt') {
        console.log('option 3 tray table')
    }
    const trayTableButtons = document.querySelectorAll('.trayTableOptions')
    trayTableButtons.forEach(ttbutton => {
        ttbutton.removeEventListener('click', reactTrayTable)
    })
    while (consoleDiv.firstChild) {
        consoleDiv.removeChild(consoleDiv.firstChild)
    }
    controlsDiv.style.display = 'grid'
    phoneDiv.classList.remove('hide')
    screenDiv.classList.remove('hide')
    // consoleDiv.style.zIndex = '0'
    // controlsDiv.style.zIndex = '1'
    // phoneDiv.style.zIndex = '1'
    attendantDiv.removeChild(attendantTextDiv)
    trayTableDiv.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2014/04/05/11/09/material-314790_960_720.jpg')"
    trayTableButton.addEventListener('click', startTrayTableInt)
}

const startTrayTableInt = () => {
    trayTableButton.removeEventListener('click', startTrayTableInt)
    trayTableDiv.style.backgroundImage = 'none'
    setTimeout(attendantInt, 5000)
}

const startBabyTimer = () => {
    setTimeout(interactBaby, timer)
}

const babyCryStr = 'Wah'

const interactBaby = () => {
    let repeat = 7
    passenger.appendChild(babyTextDiv)
    const addWah = () => {
        let wah = document.createElement('p')
        wah.textContent = babyCryStr
        babyTextDiv.appendChild(wah)
    }
    for (let i = 0; i < repeat; i++) {
        setTimeout(addWah, 2000*i)
    }
    consoleDiv.style.display = 'grid'
    consoleDiv.style.gridTemplate = '3fr repeat(3, 1fr) 3fr / 1fr'
    controlsDiv.style.display = 'none'
    phoneDiv.classList.add('hide')
    screenDiv.classList.add('hide')
    for (let i=0; i < babyOptions.length; i++) {
        let button = document.createElement('button')
        const buttonDiv = document.createElement('div')
        button.innerText = babyOptions[i]
        button.id = `${i}optb`
        button.className = 'babyOptions'
        buttonDiv.appendChild(button)
        consoleDiv.appendChild(buttonDiv)
        buttonDiv.style.display = 'flex'
        buttonDiv.style.gridArea = `${2+i} / 1 / ${3+i} / 2`
        buttonDiv.style.justifyContent = 'center'
    }
    const babyButtons = document.querySelectorAll('.babyOptions')
    babyButtons.forEach(babyButton => {
        babyButton.addEventListener('click', reactBaby)
    })
}

const reactBaby = (event) => {
    if (event.target.id === '0optb') {
        eta += 60
    } else if (event.target.id === '1optb') {
        console.log('option 2 baby')
    } else if (event.target.id === '2optb') {
        console.log('option 3 baby')
    } else if (event.target.id === '3optb') {
        console.log('option 4 baby')
    }
    const babyButtons = document.querySelectorAll('.babyOptions')
    babyButtons.forEach(babyButton => {
        babyButton.removeEventListener('click', reactBaby)
    })
    while (consoleDiv.firstChild) {
        consoleDiv.removeChild(consoleDiv.firstChild)
    }
    controlsDiv.style.display = 'grid'
    phoneDiv.classList.remove('hide')
    screenDiv.classList.remove('hide')
    passengerDiv.removeChild(babyTextDiv)
}

const startPhoneTimer = () => {
    let phoneTimer = timer*1.75
    console.log('phonetimer: ', phoneTimer)
    setTimeout(interactPhone, phoneTimer)
}

const interactPhone = () => {
    const touchPhone = () => {
        // phoneInteraction = false
        phoneDiv.style.border = '2px solid pink'
        phoneDiv.removeEventListener('click', touchPhone)
        console.log('touch phone')
        interactCellPhone()
    }
    console.log('interact')
    phoneDiv.addEventListener('click', touchPhone)
    phoneDiv.style.border = '3px solid red'
    // const blinkBright = () => {
    //     phoneDiv.style.border = '2px solid red'
    // }
    // const blinkLow = () => {
    //     phoneDiv.style.border = '2px solid pink'
    // }
    // while (phoneInteraction === true) {
    //     setTimeout(blinkBright, 1000)
    //     setTimeout(blinkLow, 2000)
    // }

}

const interactCellPhone = () => {
    console.log('interactcellphone')
    seatOneDiv.appendChild(cellPhoneDiv)
    cellPhoneDiv.classList.remove('hide')
    screenDiv.classList.add('noclick')
    controlsDiv.classList.add('noclick')
    const part0 =document.getElementById('part0')
    const part1 =document.getElementById('part1')
    const part2 =document.getElementById('part2')
    const part3 =document.getElementById('part3')
    const part4 =document.getElementById('part4')
    const part5 =document.getElementById('part5')
    const part6 =document.getElementById('part6')
    const part7 =document.getElementById('part7')    
    const part8 =document.getElementById('part8')
    const part9 =document.getElementById('part9')
    const part10 =document.getElementById('part10')
    const part11 =document.getElementById('part11')
    const part12 =document.getElementById('part12')
    const textContentSpan = document.getElementById('textcontent') 
    part0.style.gridArea = '1 / 1 / 2 / 5' 
    part1.style.gridArea = '2 / 1 / 3 / 2' 
    part2.style.gridArea = '2 / 2 / 3 / 4' 
    part3.style.gridArea = '3 / 1 / 4 / 2' 
    part4.style.gridArea = '3 / 2 / 4 / 4' 
    part5.style.gridArea = '4 / 1 / 5 / 2' 
    part6.style.gridArea = '4 / 2 / 5 / 4' 
    part7.style.gridArea = '5 / 3 / 6 / 5'
    part8.style.gridArea = '6 / 1 / 7 / 4' 
    part9.style.gridArea = '6 / 4 / 7 / 5' 
    part10.style.gridArea = '7 / 1 / 8 / 5' 
    part11.style.gridArea = '8 / 1 / 9 / 5' 
    part12.style.gridArea = '9 / 1 / 10 / 5'
    // style Fam div
    part0.style.backgroundColor = 'gray'
    // style text sender images
    part1.style.backgroundImage = ''
    part3.style.backgroundImage = ''
    part5.style.backgroundImage = ''
    // style family text messages
    part2.style.backgroundColor = 'darkgrey'
    part2.style.borderRadius = '5px'
    part2.style.padding = '2px'
    part4.style.backgroundColor = 'darkgrey'
    part4.style.borderRadius = '5px'
    part4.style.padding = '2px'
    part6.style.backgroundColor = 'darkgrey'
    part6.style.borderRadius = '5px'
    part6.style.padding = '2px'

    // style sent text
    part7.style.backgroudColor = 'blue'
    part7.style.borderRadius = '5px'
    part7.style.padding = '2px'


    // style my texts 
    part8.style.backgroundColor = 'gray'
    part9.style.backgroundColor ='gray'
    part10.style.backgroundColor = 'gray'
    part11.style.backgroundColor = 'gray'
    part12.style.backgroundColor = 'gray'
    // style send area - NOT WORKING
    // textContentSpan.backgroudColor = 'white'
    // textContentSpan.borderRadius = '10px'

    // Add event listeners to the text options
    cellTextOneButton.addEventListener('click', chooseText)
    cellTextTwoButton.addEventListener('click', chooseText)
    cellTextThreeButton.addEventListener('click', chooseText)
}

const chooseText = (event) => {
    const textContentSpan = document.getElementById('textcontent') 
    const sendButton = document.getElementById('part9')
    const playerText = document.getElementById('part7')
    if (event.target.id === 'cell-text-1'){
        textContentSpan.textContent = "I'll just take a taxi from the airport"
    } else if (event.target.id === 'cell-text-2') {
        textContentSpan.textContent = "We've been delayed a few times, but I should be arriving at about 6:23 your time"
    } else if (event.target.id === 'cell-text-3') {
        textContentSpan.textContent = "I don't care I'm just so excited to see you guys!"
    }
    const exitPhone = () => {
        gameDiv.appendChild(cellPhoneDiv)
        cellPhoneDiv.classList.add('hide')
    }
    const sendText = () => {
        playerText.textContent = textContentSpan.textContent
        textContentSpan.textContent = ""
        cellTextOneButton.removeEventListener('click', chooseText)
        cellTextTwoButton.removeEventListener('click', chooseText)
        cellTextThreeButton.removeEventListener('click', chooseText)
        sendButton.removeEventListener('click', sendText)
        setTimeout(exitPhone, 5000)
    }
    sendButton.addEventListener('click', sendText)
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
        screenDiv.append(leaveOption)
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

const answerOne = document.createElement('div')
const answerTwo = document.createElement('div')
const answerThree = document.createElement('div')
const answerFour = document.createElement('div')
const answerFive = document.createElement('div')

let ansOneArray = []
let ansTwoArray = []
let ansThreeArray = []
let ansFourArray = []
let ansFiveArray = []

const ansArrays = [ansOneArray, ansTwoArray, ansThreeArray, ansFourArray, ansFiveArray]

const scWinOne = ['0', '1']
const scWintwo = ['2', '3']
const scWinThree = ['4', '5']
const scWinFour = ['6', '7']
const scWinFive = ['8', '9']

const scWinArrays = [scWinOne, scWintwo, scWinThree, scWinFour, scWinFive]

const safteyImgDiv = document.getElementById('safety-imgs')

let scMoveCounter = 0

const openSafetyCard = () => {
    safetyCardDiv.removeEventListener('click', openSafetyCard)
    safetyCardDiv.addEventListener('click', increaseSCMoveCounter)
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



    answerOne.className = ('safety-answer')
    answerTwo.className = ('safety-answer')
    answerThree.className = ('safety-answer')
    answerFour.className = ('safety-answer')
    answerFive.className = ('safety-answer')

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

    safetyCardDiv.appendChild(answerOne)
    safetyCardDiv.appendChild(answerTwo)
    safetyCardDiv.appendChild(answerThree)
    safetyCardDiv.appendChild(answerFour)
    safetyCardDiv.appendChild(answerFive)

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

    const safetyAnswers = document.querySelectorAll('.safety-answer')
    const draggableImages = document.querySelectorAll('.safetycard-img')
    const dragDivs = document.querySelectorAll('.dragdiv')

    for (let i = 0; i < draggableImages.length; i++) {
        let div = dragDivs[i]
        let img = draggableImages[i]
        img.id = i
        img.classList.remove('hide')
        div.appendChild(img)
        img.addEventListener('dragstart', dragStart)
    }
    safetyAnswers.forEach((div) => {
        div.addEventListener('dragenter', dragEnter)
        div.addEventListener('dragover', dragEnter)
        div.addEventListener('dragleave', dragEnter)
        div.addEventListener('drop', drop)
    })
    safetyCardDiv.addEventListener('dragenter', dragEnter)
    safetyCardDiv.addEventListener('dragover', dragEnter)
    safetyCardDiv.addEventListener('dragleave', dragEnter)
    // safetyCardDiv.addEventListener('drop', drop)

    
}

const dragStart = (event) => {
    event.dataTransfer.setData('text/plain', event.target.id)
    setTimeout(() => {
        event.target.classList.add('hide')
    }, 0)
}

const dragEnter = (event) => {
    event.preventDefault()
    // event.target.classList.add('drag-over')
}

const drop = (event) => {
    event.preventDefault()
    // event.target.classList.remove('drag-over')
    // Get the draggable image
    const id = event.dataTransfer.getData('text/plain')
    const draggable = document.getElementById(id)
    // Add the draggable element to the drop target
    event.target.appendChild(draggable)


    if (event.target.style.gridArea === '2 / 4 / 3 / 5') {
        ansOneArray.push(id)
    } else if(event.target.style.gridArea === '3 / 4 / 4 / 5') {
        ansTwoArray.push(id)
    } else if(event.target.style.gridArea === '4 / 4 / 5 / 5') {
        ansThreeArray.push(id)
    } else if(event.target.style.gridArea === '5 / 4 / 6 / 5') {
        ansFourArray.push(id)
    } else if(event.target.style.gridArea === '6 / 4 / 7 / 5') {
        ansFiveArray.push(id)
    }
    console.log(ansArrays)
    // Display the draggable element
    draggable.classList.remove('hide')
    checkSafetyComplete()
}

const checkSafetyComplete = () => {
    // Return unique values based on results - X win = true, O win = false
    let complete = 0
    const leaveButton = document.createElement('button')
    leaveButton.innerText = 'Leave'
    for(i = 0; i < 5; i++) {
        if(findWinCombo(ansArrays[i], scWinArrays[i])) {
            complete++
        } 
    } 

    
    if (complete === 5) {
        while (safetyCardDiv.firstChild) {
            safetyCardDiv.removeChild(safetyCardDiv.firstChild)
        }
        safetyCardSpan.innerText = "Safety Demonstration Complete"
        exitSafety()
        // Creates button to leave - can probably just close it out.

        // safetyCardDiv.gridTemplateArea = '2fr / 1fr'
        // safetyCardDiv.appendChild(safetyCardSpan)
        // safetyCardDiv.appendChild(leaveButton)
        // safetyCardSpan.style.gridArea = '1 / 1 / 2 / 2'
        // leaveButton.style.gridArea = '2 / 1 / 3 / 2'
        // leaveButton.addEventListener('click', exitToMain)
    }

}

const exitSafety = () => {
    while (safetyCardDiv.firstChild) {
        safetyCardDiv.removeChild(safetyCardDiv.firstChild)
    }
    seatOneDiv.append(safetyCardDiv)
    safetyCardDiv.style.gridArea = '4 / 6 / 5 / 8' 
    safetyCardDiv.style.display = 'block'
    safetyCardDiv.append(safetyCardSpan)
    safetyCardDiv.style.backgroundColor = 'red'
    scMoveCounter = 0
    // leaveButton.removeEventListener('click', exitToMain)
}
const checkSCFail = () => {
    if (scMoveCounter === 15) {
        while (safetyCardDiv.firstChild) {
            safteyImgDiv.appendChild(safetyCardDiv.firstChild)
        }
        safetyCardSpan.innerText = "Safety Demonstration FAILED"
        exitSafety()
        safetyCardDiv.removeEventListener('click', increaseSCMoveCounter)
        safetyCardDiv.addEventListener('click', openSafetyCard)
    }
}
const increaseSCMoveCounter = () => {
    scMoveCounter++
    checkSCFail()
}