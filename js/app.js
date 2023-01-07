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

// Create exit button
const exitGameButton = document.createElement('button')

const winLoseScreen = document.createElement('div')

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
const playMenu = ['Tic-Tac-Toe']
const watchMenu = ['ICU', '2', '3']

const leaveOption = document.createElement('div')
leaveOption.id = 'leave'
leaveOption.textContent = 'Exit to Main Menu'

// Create selection option for screen div options to default to 0
let selection = 0

const movieOne = document.getElementById('alien')
const movieTwo = document.getElementById('placeholder')
const movieThree = document.getElementById('placeholder')
const trayTableDiv = document.getElementById('tray-table')
const attendantDiv = document.getElementById('attendant')
const attendantTextDiv = document.createElement('div')
const trayTableOptions = ['Comply', 'Ask for 5 more minutes', 'Make a scene']
const passengerDiv = document.getElementById('passenger')
const babyTextDiv = document.createElement('div')
const babyOptions = [
    'Try to ignore', 
    'Put in headphones', 
    'Cry louder than the baby', 
    'Play Peekaboo'
]

let phoneInteraction = true

const getStartScreen = () => {
    // Set up start button & add to screen div
    const startButton = document.createElement('button')
    startButton.id = 'start'
    startButton.innerText = 'Board Plane'
    screenDiv.appendChild(startButton)
    startButton.addEventListener('click', startGameLoop)
    // a! Will need to add more reset features to this screen.
}

const startGameLoop = () => {
    const startButton = document.getElementById('start')
    stylePage()
    displayStats(entertainmentScore, sanityScore, eta)
    startGameStats()
    screenDiv.removeChild(startButton)
    displayMainMenu()
    safetyCardSpan.textContent = 'Safety Card'
    safetyCardDiv.addEventListener('click', openSafetyCard)
    trayTableButton.addEventListener('click', startTrayTableInt)
    startButton.removeEventListener('click', startGameLoop)
}

const stylePage = () => {
    // const seatOuter = document.getElementById('seat-outer')
    // const seatMain = document.getElementById('seat-main')
    // seatOuter.style.boxShadow = '10px 0 3px 2px rgba(0,0,0,0.4)'
    // seatMain.style.boxShadow = '10px 0 3px 2px rgba(0,0,0,0.4)'
}

const checkGameConditions = () => {
    if (entertainmentScore <= 0) {
        stopCountdowns()
        displayGameOver('ent loss')
    } else if (sanityScore <= 0) {
        stopCountdowns()
        displayGameOver('san loss')
    } else if (eta === 0) {
        stopCountdowns()
        displayGameOver('win')
    }
}

const displayStats = (entScore, sanScore, currentEta) => {
    // Set mins & maxes for each score
    if (entScore > 100) {
        entertainmentScore = 100
        entScore = 100
    } else if (entScore < 0) {
        entertainmentScore = 0
        entScore = 0
    } else if (sanScore > 100) {
        sanityScore = 100
        sanScore = 100
    } else if (sanScore < 0) {
        sanityScore = 0
        sanScore = 0
    }  else if (currentEta < 0) {
        // eta has no max
        currentEta = 0
        eta = 0
    }
    // Style screen with scores
    entertainmentDiv.textContent = entScore
    sanityDiv.textContent = sanScore
    entertainmentDiv.style.width = `${entScore}%`
    sanityDiv.style.width = `${sanScore}%`
    // format eta, Math.floor method recommendation from https://www.golinuxcloud.com/javascript-integer-division/ 
    // Style ETA to show as a countdown timer
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
    // a! Some game end conditions
}

const stopCountdowns = () => {
    // creates clearIntervals for ETA, entertainment & sanity
    clearInterval(intervalEnt)
    clearInterval(intervalSanity)
    clearInterval(intervalEta)
}

const displayGameOver = (condition) => {
    // Create gameover screen elements
    const winLoseMsg = document.createElement('div')
    // Style win/lose screen
    winLoseScreen.style.gridArea = '1 / 1 / 5 / 5'
    winLoseScreen.style.display = 'flex'
    winLoseScreen.style.backgroundColor = 'rgba(0,0,0,0.6)'
    winLoseScreen.style.zIndex = '1'
    winLoseScreen.style.justifyContent = 'center'
    winLoseScreen.style.alignItems = 'center'
    winLoseScreen.style.flexDirection = 'column'
    // Append win/lose screen to the game div to overlay game
    gameDiv.appendChild(winLoseScreen)
    // Append win/lose elements to win/lose div
    winLoseScreen.appendChild(winLoseMsg)
    winLoseScreen.appendChild(exitGameButton)
    // Style exit button
    exitGameButton.innerText = 'Exit'
    // Add event listener to exit button
    exitGameButton.addEventListener('click', resetGame)
    if (condition === 'win') {
        winLoseMsg.innerText = 'Unbelievable & short-lived victory! You now get to continue sitting on this plane for the rest of your flight!'
        winLoseMsg.style.color = 'green'
        winLoseMsg.style.fontSize = '60px'
    } else if (condition === 'ent loss') {
        winLoseMsg.innerText = 'Died of Boredom!'
        winLoseMsg.style.color = 'green'
        winLoseMsg.style.fontSize = '60px'
    } else if (condition === 'san loss') {
        winLoseMsg.innerText = 'You lost all sanity and jumped from the emergency exit onto the tarmac!'
        winLoseMsg.style.color = 'red'
        winLoseMsg.style.fontSize = '60px'
    }
}

const resetGame = () => {
    location.reload()
    // // Remove event listener
    // exitGameButton.removeEventListener('click', resetGame)

    // // Reset all statistics
    // entertainmentScore = 100
    // sanityScore = 100
    // eta = 300
    // // Reset selection to 0
    // selection = 0
    // // Reset safety card span text
    // safetyCardSpan.innerText = 'Instructions'
    // while (screenDiv.firstChild) {
    //     screenDiv.removeChild(screenDiv.firstChild)
    // }
    // clearBabyInteraction()
    // gameDiv.removeChild(winLoseScreen)
    // phoneDiv.removeEventListener('click', touchPhone)
    // getStartScreen()
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
    screenDiv.style.justifyContent = 'left'
    screenDiv.style.alignItems = 'flex-end'
    const watchMenuOptions = document.querySelectorAll('.watch-menu-list')
    // Add event listeners
    checkLinearNavigators(watchMenuOptions, watchMenuUl)
}

const checkLinearNavigators = (list, ul) => {
    console.log(selection)
    let selected = list[selection]
    selected.style.fontWeight = '500'
    selected.style.color = 'yellow'
    downButton.addEventListener('click', 
        downAction = () => {        
            if (selection < (list.length - 1)) {
                selected = list[selection]
                selected.style.fontWeight = '300'
                selected.style.color = '#fdfded'
                selection += 1
                selected = list[selection]
                selected.style.fontWeight = '500'
                selected.style.color = 'yellow'
                }
    })
    upButton.addEventListener('click', upAction = () => {
        if (selection > 0) {
            selected.style.fontWeight = '300'
            selected.style.color = '#fdfded'
            selection--
            selected = list[selection]
            selected.style.fontWeight = '500'
            selected.style.color = 'yellow'
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
    if (num === 0) {
        screenDiv.appendChild(movieOne)
        const sourceOne = document.createElement('source')
        sourceOne.src = 'img/Alienmovie.mp4'
        sourceOne.type = 'video/mp4'
        movieOne.appendChild(sourceOne)
        movieOne.load()
        movieOne.play()
        movieOne.autoplay = true
        setTimeout(()=> {
            screenDiv.appendChild(leaveOption)
            selectButton.addEventListener('click', exitMovie)
        }, 8000)

        // update game stats
        entertainmentScore += 15
        sanityScore -= 10
        eta -=10
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (num === 1) {
        screenDiv.appendChild(movieTwo)
        const sourceTwo = document.createElement('source')
        sourceTwo.src = 'img/Alienmovie.mp4'
        sourceTwo.type = 'video/mp4'
        movieTwo.appendChild(sourceTwo)
        movieTwo.autoplay = true
        setTimeout(()=> {
            screenDiv.appendChild(leaveOption)
            selectButton.addEventListener('click', exitMovie)
        }, 8000)

        // update game stats
        entertainmentScore += 10
        sanityScore += 5
        eta -= 12
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (num === 2) {
        screenDiv.appendChild(movieThree)
        const sourceThree = document.createElement('source')
        sourceThree.src = 'img/Alienmovie.mp4'
        sourceThree.type = 'video/mp4'
        movieThree.appendChild(sourceTwo)
        movieOne.autoplay = true
        setTimeout(()=> {
            screenDiv.appendChild(leaveOption)
            selectButton.addEventListener('click', exitMovie)
        }, 8000)

        // update game stats
        entertainmentScore += 20
        sanityScore += 0
        eta += 5
        displayStats(entertainmentScore, sanityScore, eta)
    }
}

const exitMovie = () => {
    while (screenDiv.firstChild) {
        screenDiv.removeChild(screenDiv.firstChild)
    }
    selectButton.removeEventListener('click', exitMovie)
    displayMainMenu()
    interactPhone()
}

// Set Game Interactions with Attendant & Passenger

const interactAttendant = () => {
    // Create attendant text & add to screen
    let trayTableStr = "Excuse me! We can't take off until your tray table is closed!"
    attendantDiv.appendChild(attendantTextDiv)
    attendantTextDiv.innerText = trayTableStr

    // Style console div for player interaction
    consoleDiv.style.display = 'flex'
    consoleDiv.style.flexDirection = 'column'
    consoleDiv.style.justifyContent = 'center'
    consoleDiv.style.alignItems = 'center'
    // Hide other console elements
    controlsDiv.style.display = 'none'
    phoneDiv.classList.add('hide')
    screenDiv.classList.add('hide')

    // Create player interaction options & style
    for (let i=0; i < trayTableOptions.length; i++) {
        let button = document.createElement('button')
        const buttonDiv = document.createElement('div')
        button.innerText = trayTableOptions[i]
        button.id = `${i}opt`
        button.className = 'trayTableOptions'
        buttonDiv.appendChild(button)
        consoleDiv.appendChild(buttonDiv)
        button.addEventListener('click', reactTrayTable)
    }
}

const reactTrayTable = (event) => {
    // React to one of the tray table player options 
    if (event.target.id === '0opt') {
        // Comply option - impact on scores
        entertainmentScore += 0
        sanityScore += 5
        eta -= 0
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (event.target.id === '1opt') {
        // Ask for 5 more minutes - impact on score
        entertainmentScore += 5
        sanityScore += 2
        eta += 30
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (event.target.id === '2opt') {
        // Make a scene - impact on score
        entertainmentScore += 10
        sanityScore -= 20
        eta -= 0
        displayStats(entertainmentScore, sanityScore, eta)
    }

    // Remove event listeners from tray table player buttons
    const trayTableButtons = document.querySelectorAll('.trayTableOptions')
    trayTableButtons.forEach(ttbutton => {
        ttbutton.removeEventListener('click', reactTrayTable)
    })
    // Remove elements from console div
    while (consoleDiv.firstChild) {
        consoleDiv.removeChild(consoleDiv.firstChild)
    }
    // Unhide controls, phone and screen divs
    controlsDiv.style.display = 'grid'
    phoneDiv.classList.remove('hide')
    screenDiv.classList.remove('hide')
    // Remove flight attendant text div
    attendantDiv.removeChild(attendantTextDiv)
    // "Close tray table" by restyling to original image
    trayTableDiv.style.backgroundImage = "url('/img/brown_ice_by_darkwood67.jpg')"
    trayTableDiv.style.boxShadow = '0 0 10px 1px rgba(0,0,0,.5) inset, 0 -1px 4px .5px rgba(0,0,0,.9)'
    // Add event listener back onto tray table to be used again
    trayTableButton.addEventListener('click', startTrayTableInt)
}

const startTrayTableInt = () => {
    // Begin tray table interaction once clicked, delay attendant for more realistic interaction
    trayTableButton.removeEventListener('click', startTrayTableInt)
    // Style tray table to appear open
    trayTableDiv.style.backgroundImage = "url('/img/IMGP8093.JPG')"
    trayTableDiv.style.boxShadow = '0 0 10px 3px rgba(0,0,0,.9) inset, 0 -1px 4px .5px rgba(0,0,0,.9)'
    setTimeout(interactAttendant, 3000)
}

const interactBaby = () => {
    // Create baby text & set number to repeat
    const babyCryStr = 'Wah'
    passenger.appendChild(babyTextDiv)
    const addWah = () => {
        // Add divs to screen for each cry
        let wah = document.createElement('p')
        wah.textContent = babyCryStr
        babyTextDiv.appendChild(wah)
        // Decrease sanity score each time baby cries
        sanityScore -= 5 
        displayStats(entertainmentScore, sanityScore, eta)
    }
    // Set timeout for each cry for every 2 seconds
    // for (let i = 0; i < repeat; i++) {
    //     babyCry = setTimeout(addWah, 2000*i)
    // }
    addWah()
    babyCry = setInterval(addWah, 2000)
    setTimeout(babyCry, 18000)
    // Style console Div for player interaction
    consoleDiv.style.display = 'flex'
    consoleDiv.style.flexDirection = 'column'
    consoleDiv.style.justifyContent = 'center'
    consoleDiv.style.alignItems = 'center'
    // Hide other elements on top of console
    controlsDiv.style.display = 'none'
    phoneDiv.classList.add('hide')
    screenDiv.classList.add('hide')
    // Create player interaction options & add to the screen.
    const setReactions = () => {
        for (let i=0; i < babyOptions.length; i++) {
            let button = document.createElement('button')
            const buttonDiv = document.createElement('div')
            button.innerText = babyOptions[i]
            button.id = `${i}optb`
            button.className = 'babyOptions'
            buttonDiv.appendChild(button)
            consoleDiv.appendChild(buttonDiv)
            button.addEventListener('click', reactBaby)
        }    
    }
    setTimeout(setReactions, 1500)
}

const reactBaby = (event) => {
    // Update game statistics based on reaction selected
    clearInterval(babyCry)
    if (event.target.id === '0optb') {
        // Try to ignore - impact on scores
        eta += 60
        entertainmentScore -= 5
        sanityScore -= 5
        displayStats(entertainmentScore, sanityScore, eta)
        // Add baby crying sound at lower volume for remainder of game?
    } else if (event.target.id === '1optb') {
        // Put in headphones - impact on scores
        eta += 0
        entertainmentScore += 20
        sanityScore += 20
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (event.target.id === '2optb') {
        // Cry louder than baby - impact on scores
        eta += 0
        entertainmentScore += 10
        sanityScore -= 20
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (event.target.id === '3optb') {
        // Play peekaboo - impact on scores
        eta -= 30
        entertainmentScore += 20
        sanityScore += 10
        displayStats(entertainmentScore, sanityScore, eta)
    }
    clearBabyInteraction()
}

const clearBabyInteraction = () => {
    // Remove event listeners from player options
    const babyButtons = document.querySelectorAll('.babyOptions')
    babyButtons.forEach(babyButton => {
        babyButton.removeEventListener('click', reactBaby)
    })
    // Remove elements from console div - 
    while (consoleDiv.firstChild) {
        consoleDiv.removeChild(consoleDiv.firstChild)
    }
    while (passengerDiv.firstChild) {
        passengerDiv.removeChild(passengerDiv.firstChild)
    }
    // Redisplay console elements to continue gameplay
    controlsDiv.style.display = 'grid'
    phoneDiv.classList.remove('hide')
    screenDiv.classList.remove('hide')
}

const touchPhone = () => {
    // After phone clicked, return styling and remove event listener, start interaction
    phoneDiv.removeEventListener('click', touchPhone)
    interactCellPhone()
}

// Source for shake animation, including CSS: https://unused-css.com/blog/css-shake-animation/

const interactPhone = () => {
    // When seat phone touched
    // Add event listener to phone to allow click
    phoneDiv.addEventListener('click', touchPhone)
    // Style phone to simulate ringing
    phoneDiv.style.animation = 'skew-x-shake 1.3s infinite'
}

const interactCellPhone = () => {
    // Move cell phone div from game div to seat One div & unhide
    seatOneDiv.appendChild(cellPhoneDiv)
    cellPhoneDiv.classList.remove('hide')
    // Disable clicks for screen & controls
    screenDiv.classList.add('noclick')
    controlsDiv.classList.add('noclick')
    // Access cell phone parts
    const part0 = document.getElementById('part0')
    const part1 = document.getElementById('part1')
    const part2 = document.getElementById('part2')
    const part3 = document.getElementById('part3')
    const part4 = document.getElementById('part4')
    const part5 = document.getElementById('part5')
    const part6 = document.getElementById('part6')
    const part7 = document.getElementById('part7')    
    const part8 = document.getElementById('part8')
    const part9 = document.getElementById('part9')
    const part10 = document.getElementById('part10')
    const part11 = document.getElementById('part11')
    const part12 = document.getElementById('part12')
    const textContentSpan = document.getElementById('textcontent') 
    // Place parts in the correct grid areas
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
    
    const sendButton = document.getElementById('part9')
    // Add event listeners to the text options
    cellTextOneButton.addEventListener('click', chooseText)
    cellTextTwoButton.addEventListener('click', chooseText)
    cellTextThreeButton.addEventListener('click', chooseText)
    sendButton.addEventListener('click', sendText)
}
// Creates text content
const textOption1 = "I'll just take a taxi from the airport"
const textOption2 = "We've been delayed a few times, but I should be arriving at about 6:23 your time"
const textOption3 = "I don't care I'm just so excited to see you guys!"
const chooseText = (event) => {
    // Access necessary cell phone parts
    const textContentSpan = document.getElementById('textcontent') 
    // Populate text content area based on player selection
    if (event.target.id === 'cell-text-1'){
        textContentSpan.textContent = textOption1
    } else if (event.target.id === 'cell-text-2') {
        textContentSpan.textContent = textOption2
    } else if (event.target.id === 'cell-text-3') {
        textContentSpan.textContent = textOption3
    }
}

const sendText = () => {
    const sendButton = document.getElementById('part9')
    const playerText = document.getElementById('part7')
    const textContentSpan = document.getElementById('textcontent') 
    const exitPhone = () => {
        // Resets screen when finished with phone interaction
        playerText.innerText = ''
        textContentSpan.innerText = ''
        gameDiv.appendChild(cellPhoneDiv)
        cellPhoneDiv.classList.add('hide')
        screenDiv.classList.remove('noclick')
        controlsDiv.classList.remove('noclick')
    }    
    // Set the sent text to the text in the textContentSpan
    playerText.textContent = textContentSpan.textContent
    // adjust scores based on the text the player chose to send
    if (playerText.textContent === textOption1) {
        // Taxi option - impact to scores
        eta -= 0
        entertainmentScore += 0
        sanityScore -= 100
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (playerText.textContent === textOption2) {
        // Send ETA option - impact to scores
        eta -= 30
        entertainmentScore += 10
        sanityScore += 10
        displayStats(entertainmentScore, sanityScore, eta)
    } else if (playerText.textContent === textOption3) {
        // Excited option - impact to scores
        eta += 0
        entertainmentScore += 20
        sanityScore -= 30
        displayStats(entertainmentScore, sanityScore, eta)
    }
    // Erase text in content span
    textContentSpan.textContent = ""
    // Remove event listeners from cell phone
    cellTextOneButton.removeEventListener('click', chooseText)
    cellTextTwoButton.removeEventListener('click', chooseText)
    cellTextThreeButton.removeEventListener('click', chooseText)
    sendButton.removeEventListener('click', sendText)
    // Allow a short pause before phone exits
    setTimeout(exitPhone, 3000)
}

// When DOMContentLoaded, start the game, show start screen
document.addEventListener('DOMContentLoaded', () => {
    getStartScreen()
})

// Tic Tac Toe Puzzle

// Most code copied from ttt-project under github user estebbins
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
    // Add tictactoe boxes to screendiv & style
    screenDiv.classList.add('tictactoe')
    // screenDiv.style.display = 'grid'
    for (let i = 0; i < boxes.length; i++) {
        screenDiv.appendChild(boxes[i])
        boxes[i].style.display = 'block'
    }
    boxes[0].style.borderTop = 'none'
    boxes[0].style.borderLeft = 'none'
    boxes[1].style.borderTop = 'none'
    boxes[2].style.borderTop = 'none'
    boxes[2].style.borderRight = 'none'
    boxes[3].style.borderLeft = 'none'
    boxes[5].style.borderRight = 'none'
    boxes[6].style.borderBottom = 'none'
    boxes[6].style.borderLeft = 'none'
    boxes[7].style.borderBottom = 'none'
    boxes[8].style.borderBottom= 'none'
    boxes[8].style.borderRight = 'none'
    const boxOne = document.getElementById('box-1')
    boxOne.classList.add('tttselection')
    playTicTacToe()
}
const navAction = (event) => {
    // React to screen controls
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
            // Reduce sanity score if buttons are clicked unnecessarily
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
            // Reduce sanity score if buttons are clicked unnecessarily
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
            // Reduce sanity score if buttons are clicked unnecessarily
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
            // Reduce sanity score if buttons are clicked unnecessarily
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
            tttPlayerSelection.style.backgroundSize = '55%'
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
        // Reduce sanity score if buttons are clicked unnecessarily
        sanityScore--
        displayStats(entertainmentScore, sanityScore, eta) 
    }
    // Call print win function to determine if win result and assess move counter
    // in the case of a tie, which should not be assessed until all 9 moves have been made
    // and evaluated
    printWin(moveCounter, checkWin())
}

const playTicTacToe = () => {
    // Adds appropriate event listeners for TicTacToe game
    upButton.addEventListener('click', navAction)
    downButton.addEventListener('click', navAction)
    leftButton.addEventListener('click', navAction)
    rightButton.addEventListener('click', navAction)
    selectButton.addEventListener('click', makeMove)
}

const printWin = (moveCounter, result) => {
    // Displays result
    // If checkWin results in true or false, or if all moves have been made and no win is foung
    if (result === true | result === false | (result === null && moveCounter === 9)) {
        // Create div to display the results of the game & apply an id of result
        const resultBox = document.createElement('div')
        resultBox.id = 'tttresult'
        if (result === true) {
            // If player X wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player X Wins!"
            resultBox.style.color = 'rgb(51, 201, 206)'
            // adjust scores based on win result
            eta -= 30
            sanityScore += 5
            entertainmentScore += 10
            displayStats(entertainmentScore, sanityScore, eta) 
        } else if (result === false) {
            // If player O wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player O Wins!"
            resultBox.style.color = '#cdcdcd'
            // adjust scores based on win result
            eta -= 15
            sanityScore += 2
            entertainmentScore += 5
            displayStats(entertainmentScore, sanityScore, eta) 
        } else if (moveCounter === 9 && result === null) {
            // If neither player wins, add & style the text in the result div, increase the score counter and end the game. Apply complimentary textShadow to override default
            resultBox.textContent = "It's a Tie!"
            resultBox.style.color = '#e6a176'
            resultBox.style.textShadow = '1px 1px 2px #984464'
            // adjust scores based on win result
            eta += 10
            sanityScore -= 10
            entertainmentScore -= 10
            displayStats(entertainmentScore, sanityScore, eta) 
        }
        // Remove the tictactoe boxes from the screen.
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
        // Reset screen and controls
        leaveTicTacToe()
    }
}  

const findWinCombo = (array1, array2) => {
    // Compare two arrays
    const checkFor = (box) => {
        // Returns true if array includes a specific value
        return array1.includes(box)
    }
    // Return true if array includes every item that's being checked for
    return array2.every(checkFor) 
}


const checkWin = () => {
    // Function to compare player arrays to win combos. 
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
        // Removes tictactoe elements from screen and displays main menu
        const tttResult = document.getElementById('tttresult')
        const tttLeave = document.getElementById('leave')
        screenDiv.removeChild(tttResult)
        screenDiv.removeChild(tttLeave)
        displayMainMenu()
        // Removes event listener from select button
        selectButton.removeEventListener('click', exitToMain)
        interactBaby()
    }
    // Set short delay to be able to exit screen, add event listener to select
    setTimeout(selectButton.addEventListener('click', exitToMain), 3000)
}

// Safety Card Puzzle

// Used site for guidance and code for dragging & dropping https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/#:~:text=Most%20modern%20web%20browsers%20have,you%20would%20drag%20an%20image. 

// belted: https://cdn-icons-png.flaticon.com/512/7379/7379659.png 
// No smoking image = https://cdn.pixabay.com/photo/2016/04/01/08/43/no-smoking-1298904_960_720.png 
// Oxygen mask image opt two = https://cdn-icons-png.flaticon.com/512/2533/2533196.png 
// Bag under seat https://cdn-icons-png.flaticon.com/512/6429/6429835.png 


// Create answer divs
const answerOne = document.createElement('div')
const answerTwo = document.createElement('div')
const answerThree = document.createElement('div')
const answerFour = document.createElement('div')
const answerFive = document.createElement('div')

// Create player answer arrays & place into an array
let ansOneArray = []
let ansTwoArray = []
let ansThreeArray = []
let ansFourArray = []
let ansFiveArray = []
const ansArrays = [ansOneArray, ansTwoArray, ansThreeArray, ansFourArray, ansFiveArray]

// Create win conditions in arrays & place into an array
const scWinOne = ['0', '1']
const scWintwo = ['2', '3']
const scWinThree = ['4', '5']
const scWinFour = ['6', '7']
const scWinFive = ['8', '9']
const scWinArrays = [scWinOne, scWintwo, scWinThree, scWinFour, scWinFive]

// Access re-used HTML elements
const safetyImgDiv = document.getElementById('safety-imgs')

// Initialize move counter
let scMoveCounter = 0
let complete = 0

const openSafetyCard = () => {
    // Initalizes and styles open Safety Card
    // Remove original event listener from saftey card
    safetyCardDiv.removeEventListener('click', openSafetyCard)
    // Add event listener to track moves to avoid player getting stuck in safety card
    safetyCardDiv.addEventListener('click', increaseSCMoveCounter)
    // Move safety card div to game div for styling
    gameDiv.appendChild(safetyCardDiv)
    // Style safety card
    safetyCardDiv.classList.remove('closed')
    safetyCardDiv.style.gridArea = '3 / 3 / 4 / 4'
    safetyCardDiv.style.zIndex = '1'
    safetyCardDiv.style.display = 'grid'
    safetyCardDiv.style.gridTemplateRows = '.2fr repeat(5, 1fr)'
    safetyCardDiv.style.gridTemplateColumns = '1.5fr 1.5fr 1fr 2fr 1.5fr 1.5fr'
    safetyCardDiv.style.boxShadow = '0 8px 16px 8px rgba(0,0,0,0.5)'
    // Style title of safety card
    safetyCardSpan.style.gridArea = '1 / 1 / 2 / 7'
    safetyCardSpan.style.zIndex = '1'
    // Create 3 panel divs for styling & placement in game grid
    const panelOneDiv = document.createElement('div')
    const panelTwoDiv = document.createElement('div')
    const panelThreeDiv = document.createElement('div')
    panelOneDiv.style.gridArea = '1 / 1 / 7 / 3'
    panelTwoDiv.style.gridArea = '1 / 3 / 7 / 5'
    panelThreeDiv.style.gridArea = '1 / 5 / 7 / 7'
    // Add class to Panel divs
    panelOneDiv.classList.add('panelOne')
    panelTwoDiv.classList.add('panelTwo')
    panelThreeDiv.classList.add('panelThree')
    // Create divs to initialize draggable items
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
    // Give item divs a class
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
    // Style item divs
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
    // seatbeltOneDiv.style.backgroundColor = 'blue'
    // seatbeltTwoDiv.style.backgroundColor = 'blue'
    // smokingOneDiv.style.backgroundColor = 'red'
    // smokingTwoDiv.style.backgroundColor = 'red'
    // maskAOneDiv.style.backgroundColor = 'pink'
    // maskATwoDiv.style.backgroundColor = 'pink'
    // maskBOneDiv.style.backgroundColor = 'yellow'
    // maskBTwoDiv.style.backgroundColor = 'yellow'
    // bagOneDiv.style.backgroundColor = 'green'
    // bagTwoDiv.style.backgroundColor = 'green'
    // Give answer divs a class
    answerOne.className = ('safety-answer')
    answerTwo.className = ('safety-answer')
    answerThree.className = ('safety-answer')
    answerFour.className = ('safety-answer')
    answerFive.className = ('safety-answer')
    // Style answer divs
    answerOne.style.gridArea = '2 / 4 / 3 / 5'
    answerTwo.style.gridArea = '3 / 4 / 4 / 5'
    answerThree.style.gridArea = '4 / 4 / 5 / 5'
    answerFour.style.gridArea = '5 / 4 / 6 / 5'
    answerFive.style.gridArea = '6 / 4 / 7 / 5'
    // Append panels to safetycard
    safetyCardDiv.appendChild(panelOneDiv)
    safetyCardDiv.appendChild(panelTwoDiv)
    safetyCardDiv.appendChild(panelThreeDiv)
    // Append item divs to 
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
    // Append answer divs to safetycard
    safetyCardDiv.appendChild(answerOne)
    safetyCardDiv.appendChild(answerTwo)
    safetyCardDiv.appendChild(answerThree)
    safetyCardDiv.appendChild(answerFour)
    safetyCardDiv.appendChild(answerFive)

    const getSafetyAnsImgs = document.querySelectorAll('.safetyans-imgs')
    for (let i = 0; i < getSafetyAnsImgs.length; i++) {
        let answerImg = document.createElement('div')
        answerImg.classList.add('safetyanswerimage')
        answerImg.appendChild(getSafetyAnsImgs[i])
        // getSafetyAnsImgs[i].classList.remove('hide')
        answerImg.style.gridArea = `${2+i} / 3 / ${3+i} / 4`
        safetyCardDiv.appendChild(answerImg)
    }

    // Store arrays for answers, images, and item divs in variables
    const safetyAnswers = document.querySelectorAll('.safety-answer')
    const draggableImages = document.querySelectorAll('.safetycard-img')
    const dragDivs = document.querySelectorAll('.dragdiv')


    for (let i = 0; i < draggableImages.length; i++) {
        let div = dragDivs[i]
        let img = draggableImages[i]
        // Add unique Id to each draggable image
        img.id = i
        // Unhide images
        img.classList.remove('hide')
        // Append the images to the item divs
        div.appendChild(img)
        // Add drag start listenter to each image
        img.addEventListener('dragstart', dragStart)
    }
    safetyAnswers.forEach((div) => {
        // Add dragenter, dragover, dragleave, and drop event listeners to each answer div
        div.addEventListener('dragenter', dragEnter)
        div.addEventListener('dragover', dragEnter)
        div.addEventListener('dragleave', dragEnter)
        div.addEventListener('drop', drop)
    })
    // Add dragenter, dragover, dragleave, and drop event listeners to the safetycard
    safetyCardDiv.addEventListener('dragenter', dragEnter)
    safetyCardDiv.addEventListener('dragover', dragEnter)
    safetyCardDiv.addEventListener('dragleave', dragEnter)

    // a! Is drop event listener needed/helpful?
    // safetyCardDiv.addEventListener('drop', drop)
}

const dragStart = (event) => {
    // Transfer image data using ID when dragstart event
    event.dataTransfer.setData('text/plain', event.target.id)
    // Hide image during drag
    setTimeout(() => {
        event.target.classList.add('hide')
    }, 0)
    const getSafetyAnsImgs = document.querySelectorAll('.safetyans-imgs')
    getSafetyAnsImgs.forEach(img => img.classList.remove('hide'))
}

const dragEnter = (event) => {
    // Prevent default behavior during dragenter event
    event.preventDefault()
    const getSafetyAnsImgs = document.querySelectorAll('.safetyans-imgs')
    getSafetyAnsImgs.forEach(img => img.classList.remove('hide'))
}

const drop = (event) => {
    // Prevent default behavior during dragenter event
    event.preventDefault()
    // Get the draggable image data
    const id = event.dataTransfer.getData('text/plain')
    // Re-hide answers
    const getSafetyAnsImgs = document.querySelectorAll('.safetyans-imgs')
    getSafetyAnsImgs.forEach(img => img.classList.add('hide'))
    // Get draggable image
    const draggable = document.getElementById(id)
    // Add the draggable image to the drop target
    event.target.appendChild(draggable)
    // Push the move to the player answer arrays if placed correctly
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
    // Display the draggable element in it's new location
    draggable.classList.remove('hide')
    // Check if safety card puzzle complete after each drop event
    checkSafetyComplete()
}

const checkSafetyComplete = () => {
    // Checks if safety puzzle has been completed successfully
    // Create a score counter to track
    // Compare player answer arrays to win conditions & increase score by one each time
    for(i = 0; i < 5; i++) {
        if(findWinCombo(ansArrays[i], scWinArrays[i])) {
            complete++
        } else {
            complete = 0
        }
    } 
    console.log(complete)
    // When score of 5 is reached, safety card is complete
    if (complete === 5) {
        // When safety card puzzle complete, return to main screen
        while (safetyCardDiv.firstChild) {
            safetyCardDiv.removeChild(safetyCardDiv.firstChild)
        }
        // Adjust scores
        eta -= 30
        entertainmentScore += 30
        sanityScore += 10
        displayStats(entertainmentScore, sanityScore, eta) 
        // Change text of safety card title to show completed puzzle
        safetyCardSpan.innerText = "Safety Demonstration Complete"
        exitSafety()
    }
}


const exitSafety = () => {
    // Remove all elements from the safetycard
    while (safetyCardDiv.firstChild) {
        safetyCardDiv.removeChild(safetyCardDiv.firstChild)
    }
    // Add the safety card back to the seat one div
    seatOneDiv.append(safetyCardDiv)
    // Re-style the safety card div
    safetyCardDiv.style.gridArea = '4 / 6 / 5 / 8' 
    safetyCardDiv.style.display = 'block'
    safetyCardDiv.style.backgroundColor = 'red'
    safetyCardDiv.classList.add('closed')
    // Add back the safety card title span
    safetyCardDiv.append(safetyCardSpan)
    // Reset the move counter for the safety card in case it was failed
    scMoveCounter = 0
    complete = 0
}

const checkSCFail = () => {
    // After 15 clicks, fail the safety card demonstration
    if (scMoveCounter === 15) {
        // Move all the divs back to their original div to hide them
        while (safetyCardDiv.firstChild) {
            safetyImgDiv.appendChild(safetyCardDiv.firstChild)
        }
        safetyCardDiv.classList.add('closed')
        // Update title span to show player they failed the demonstration
        safetyCardSpan.innerText = "Safety Demonstration FAILED"
        // Exit the safety card
        exitSafety()
        // Remove event listener for move counter
        safetyCardDiv.removeEventListener('click', increaseSCMoveCounter)
        // Add back the event listener so player can redo the exercise
        safetyCardDiv.addEventListener('click', openSafetyCard)
    }
}
const increaseSCMoveCounter = () => {
    // Increases move counter & checks for fails after each click
    scMoveCounter++
    checkSCFail()
}