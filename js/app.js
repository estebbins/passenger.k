// When DOMContentLoaded, start the game. 

// Access HTML elements
const gameDiv = document.getElementById('game')
const seatOneDiv = document.getElementById('seat-1')
const screenDiv = document.getElementById('screen')
const screenCDiv = document.querySelector('.screenc')
const entertainmentDiv = document.getElementById('entertainment-meter')
const sanityDiv = document.getElementById('sanity-meter')
const departureDiv = document.getElementById('departure')
const upButton = document.getElementById('up')
const downButton = document.getElementById('down')
const leftButton = document.getElementById('left')
const rightButton = document.getElementById('right')
const selectButton = document.getElementById('select')
const volUpButton = document.getElementById('vol-up')
const volDownButton = document.getElementById('vol-down')
const safetyCardDiv = document.getElementById('safety-card')
const safetyCardSpan = document.getElementById('safety')
const trayTableButton =document.getElementById('tray-open')
const consoleDiv = document.getElementById('console')
const controlsDiv = document.getElementById('controls')
const phoneDiv = document.getElementById('phone')
const cellPhoneDiv = document.getElementById('cellphone')
const cellTextOneButton = document.getElementById('cell-text-1')
const cellTextTwoButton = document.getElementById('cell-text-2')
const cellTextThreeButton = document.getElementById('cell-text-3')

const backgroundVideo = document.getElementById('background-video')

// Create exit button
const exitGameButton = document.createElement('button')
// Create win/lose screen
const winLoseScreen = document.createElement('div')

// Create statistics
let intervalDep
let intervalEnt
let intervalSanity
let entertainmentScore = 100
let entRate = 1000
let sanityScore = 100
let sanityRate = 3000
// departure is in units of seconds
let departure = 300
let depRate = 1000

// Create Menu Options
const mainMenu = [
    'Play', 
    'Listen', 
    'Watch'
]
const playMenu = ['Tic-Tac-Toe']
const listenMenu = [
    'Empty mind by Lofi hour', 
    'sound k by nojisuma', 
    'Sensual Jazz by Grand Project Music', 
    'Pause Music', 
    'Exit to Main Menu'
]
const watchMenu = [
    'Eye Cee U', 
    'Matriception', 
    'Inner Piece'
]

const leaveOption = document.createElement('div')
leaveOption.id = 'leave'
leaveOption.textContent = 'Exit to Main Menu'

// Create selection option for screen div options to default to 0
let selection = 0

// Create variables for video & audio elements
const movieOne = document.getElementById('alien')
const movieTwo = document.getElementById('action')
const movieThree = document.getElementById('dog')
const soundOne = document.getElementById('emptymind')
const soundTwo = document.getElementById('soundk')
const soundThree = document.getElementById('sensualjazz')
const noiseOne = document.getElementById('genericcrowd')
const noiseTwo = document.getElementById('airplaneambience')
const phoneRingSound = document.getElementById('phonering')
const babyCrySound = document.getElementById('babycry')

// set volume for sounds
soundOne.volume = 0.5
soundTwo.volume = 0.5
soundThree.volume = 0.5
noiseOne.volume = 0.5
noiseTwo.volume = 0.7
phoneRingSound.volume = 0.5
babyCrySound.volume = 0.5

// Access elements for tray table & baby interactions
const trayTableDiv = document.getElementById('tray-table')
const attendantDiv = document.getElementById('attendant')
const attendantTextDiv = document.createElement('div')
const trayTableOptions = [
    'Comply', 
    'Ask for 5 more minutes', 
    'Make a scene'
]
const passengerDiv = document.getElementById('passenger')
const babyTextDiv = document.createElement('div')
const babyOptions = [
    'Try to ignore', 
    'Headphones!', 
    'Cry louder than baby', 
    'Peekaboo'
]

const getStartScreen = () => {
    // Sets up start button & add to screen div - this runs when DOM loads
    // Create start button
    const startButton = document.createElement('button')
    startButton.id = 'start'
    startButton.innerText = 'Board Plane'
    // Add button to screen
    gameDiv.appendChild(startButton)
    // Add event listener
    startButton.addEventListener('click', startGameLoop)
}

const startGameLoop = () => {
    // Starts all necessary game functions
    // Access relevant elements
    const startButton = document.getElementById('start')
    const safetySpan = document.getElementById('safety')
    const instructionsSpan = document.getElementById('instructions')
    const magazineSpan = document.getElementById('mag')
    // Show starting stats
    displayStats(entertainmentScore, sanityScore, departure)
    // Start ithe intervals
    startGameStats()
    // remove the start button from the window
    gameDiv.removeChild(startButton)
    // Display the console screen's main menu
    displayMainMenu()
    // Style the word Safety on the safety card to show it's now the instruction game
    safetySpan.style.textShadow = '1px 1px green, -1px -1px black'
    // Style the word instructions to de-emphasize it
    instructionsSpan.style.textShadow = 'none'
    // Change "Credits" to "Magazine"
    magazineSpan.innerText = 'Magazine'
    // Add event listeners to the safety, tray table, and volume button
    safetyCardDiv.addEventListener('click', openSafetyCard)
    trayTableButton.addEventListener('click', startTrayTableInt)
    volUpButton.addEventListener('click', changeVolume)
    volDownButton.addEventListener('click', changeVolume)
    // Remove the start button event listener to avoid redundant processes
    startButton.removeEventListener('click', startGameLoop)
    // Play ambient noise
    playBackgroundNoise()
}

const checkGameConditions = () => {
    // Checks to see if game won or lost - stop intervals in the startGameStats function if so
    if (entertainmentScore <= 0) {
        // If entertainment reaches 0 - loss
        stopCountdowns()
        displayGameOver('ent loss')
    } else if (sanityScore <= 0) {
        // If sanity reaches 0 - loss
        stopCountdowns()
        displayGameOver('san loss')
    } else if (departure === 0) {
        // If departure reaches 0 before sanity or entertainment - player has won
        stopCountdowns()
        displayGameOver('win')
    }
}

// Resources for guidance on configuring audio elements https://www.w3schools.com/html/html5_audio.asp, https://www.w3schools.com/tags/ref_av_dom.asp

const changeVolume = (event) => {
    // Change volume if user presses volume buttons
    // Set min & max of sounds
    if (event.target.id === 'vol-up') {
        // Noise two starts slightly louder at 0.7
        if (soundOne.volume >= .89) {
            // Can't go higher than one
            soundOne.volume = 1
            soundTwo.volume = 1
            soundThree.volume = 1
            noiseOne.volume = 1
            noiseTwo.volume = 1
            phoneRingSound.volume = 1
            babyCrySound.volume = 1
        } else if (soundOne.volume >= .69){
            soundOne.volume += .1
            soundTwo.volume += .1
            soundThree.volume += .1
            noiseOne.volume += .1
            // Max out Noise Two at this point
            noiseTwo.volume = 1
            phoneRingSound.volume += .1
            babyCrySound.volume += .1
        } else {
            // Increment by 10%
            soundOne.volume += .1
            soundTwo.volume += .1
            soundThree.volume += .1
            noiseOne.volume += .1
            noiseTwo.volume += .1
            phoneRingSound.volume += .1
            babyCrySound.volume += .1
        }
    } else if (event.target.id === 'vol-down') {
        if (noiseTwo.volume <= .29) {
            // Can't go lower than 0
            soundOne.volume = 0
            soundTwo.volume = 0
            soundThree.volume = 0
            noiseOne.volume = 0
            noiseTwo.volume = 0
            phoneRingSound.volume = 0
            babyCrySound.volume = 0
        } else {
            soundOne.volume -= .1
            soundTwo.volume -= .1
            soundThree.volume -= .1
            noiseOne.volume -= .1
            noiseTwo.volume -= .1
            phoneRingSound.volume -= .1
            babyCrySound.volume -= .1
        }
    }
}

const playBackgroundNoise = () => {
    // Sets up ambient sounds to loop while playing the game
    // Generic crowd
    const sourceOne = document.createElement('source')
    sourceOne.src = 'sounds/generic-crowd-background-noise-31310.mp3'
    sourceOne.type = 'audio/mpeg'
    noiseOne.appendChild(sourceOne)
    noiseOne.load()
    noiseOne.play()
    noiseOne.loop = true
    // Airplane ambience
    const sourceTwo = document.createElement('source')
    sourceTwo.src = 'sounds/airplane_ambience-6830.mp3'
    sourceTwo.type = 'audio/mpeg'
    noiseTwo.appendChild(sourceTwo)
    noiseTwo.load()
    noiseTwo.play()
    noiseTwo.loop = true
}

const displayStats = (entScore, sanScore, currentDep) => {
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
    }  else if (currentDep > 300) {
        currentDep = 300
        departure = 300
    } else if (currentDep < 0) {
        currentDep = 0
        departure = 0
    }
    // Style meters by changing width
    entertainmentDiv.style.width = `${entScore}%`
    sanityDiv.style.width = `${sanScore}%`
    departureDiv.style.width = `${(currentDep/300)*100}%`
    // Code if time remaining to be displayed - need to rename variable to departure nomenclature from eta.
    // format eta, Math.floor method recommendation from https://www.golinuxcloud.com/javascript-integer-division/ 
    // Style ETA to show as a countdown timer
    // const etaMinute = Math.floor(currentEta / 60)
    // const etaSecond = currentEta % 60
    // if (etaSecond < 10) {
    //     etaDiv.textContent = `${etaMinute}:0${etaSecond}`
    // } else {
    //     etaDiv.textContent = `${etaMinute}:${etaSecond}`
    // }

    // Consistently check game conditions to detect win or loss
    checkGameConditions()
}

const startGameStats = () => {
    // Sets up countdowns for each stat
    const countdownDep = () => {
        departure -= 1
        displayStats(entertainmentScore, sanityScore, departure)
    }
    const countdownEnt = () => {
        entertainmentScore -= 1
        displayStats(entertainmentScore, sanityScore, departure)
    }
    const countdownSanity = () => {
        sanityScore -= 1
        displayStats(entertainmentScore, sanityScore, departure) 
    }
    // countdown for departure & entertainment will be -1 each second
    // countdown for sanity will be -1 every three seconds
    intervalDep = setInterval(countdownDep, depRate)
    intervalEnt = setInterval(countdownEnt, entRate)
    intervalSanity = setInterval(countdownSanity, sanityRate)
}

const stopCountdowns = () => {
    // creates clearIntervals for departure, entertainment & sanity
    clearInterval(intervalEnt)
    clearInterval(intervalSanity)
    clearInterval(intervalDep)
}

const displayGameOver = (condition) => {
    // Create gameover screen elements
    const winLoseMsg = document.createElement('div')
    // Append win/lose screen to the game div to overlay game
    gameDiv.appendChild(winLoseScreen)
    winLoseScreen.id = 'winlose'
    exitGameButton.id = 'exitgame'
    // Append win/lose elements to win/lose div
    winLoseScreen.appendChild(winLoseMsg)
    winLoseScreen.appendChild(exitGameButton)
    // Style exit button
    exitGameButton.innerText = 'Return to start'
    // Add event listener to exit button
    exitGameButton.addEventListener('click', resetGame)
    // Print win message
    if (condition === 'win') {
        winLoseMsg.innerText = 'What an unbelievable & short-lived victory! You may now continue sitting on this plane for the rest of your flight!'
        winLoseMsg.style.color = 'purple'
    } else if (condition === 'ent loss') {
        winLoseMsg.innerText = 'You died of boredom!'
        winLoseMsg.style.color = 'green'
    } else if (condition === 'san loss') {
        winLoseMsg.innerText = 'You lost all sanity and jumped from the emergency exit onto the tarmac!'
        winLoseMsg.style.color = 'red'
    }
}

const resetGame = () => {
    // Reset is currently refreshing page as there are are no stats that carry over
    location.reload()
}

const displayMainMenu = () => {
    // Create Ul and Li items for main menu
    const mainMenuUl = document.createElement('ul')
    // give them a class
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
    const listenMenuUl = document.createElement('ul')
    listenMenuUl.id = 'listen-menu'
    for (let i = 0; i < listenMenu.length; i++) {
        const listItem = document.createElement('li')
        listItem.innerText = listenMenu[i]
        listItem.className = 'listen-menu-list'
        listenMenuUl.appendChild(listItem)
    }
    // Append menu to screen div
    listenMenuUl.style.display = 'block'
    screenDiv.appendChild(listenMenuUl)
    // screenDiv.style.justifyContent = 'left'
    // screenDiv.style.alignItems = 'flex-end'
    const listenMenuOptions = document.querySelectorAll('.listen-menu-list')
    // Add event listeners
    checkLinearNavigators(listenMenuOptions, listenMenuUl)
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
    // screenDiv.style.justifyContent = 'left'
    // screenDiv.style.alignItems = 'flex-end'
    const watchMenuOptions = document.querySelectorAll('.watch-menu-list')
    // Add event listeners
    checkLinearNavigators(watchMenuOptions, watchMenuUl)
}

const checkLinearNavigators = (list, ul) => {
    // Reacts to the use of the controls for linear menus
    // Access selected li & style it
    let selected = list[selection]
    selected.style.fontWeight = '500'
    selected.style.color = 'yellow'
    // Restyle next selection if down is clicked
    downButton.addEventListener('click', downAction = () => {        
        if (selection < (list.length - 1)) {
            selected = list[selection]
            selected.style.fontWeight = '300'
            selected.style.color = '#fdfded'
            // Move selection counter up one
            selection += 1
            selected = list[selection]
            selected.style.fontWeight = '500'
            selected.style.color = 'yellow'
        }
    })
    // Restyle next selection if down is clicked
    upButton.addEventListener('click', upAction = () => {
        if (selection > 0) {
            selected.style.fontWeight = '300'
            selected.style.color = '#fdfded'
            // Move selection counter down one
            selection--
            selected = list[selection]
            selected.style.fontWeight = '500'
            selected.style.color = 'yellow'
        }
    })
    selectButton.addEventListener('click', selectAction = () => {
        // Hide ul
        ul.style.display = 'none'
        // Remove listeners
        downButton.removeEventListener('click', downAction)
        upButton.removeEventListener('click', upAction)
        selectButton.removeEventListener('click', selectAction)
        // Navigate to the appropriate sub menu/process based on which list is currently populated
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
                selection = 0
                watchMovie(0)
            } else if (selection === 1) {
                selection = 0
                watchMovie(1)
            } else if (selection === 2) {
                selection = 0
                watchMovie(2)
            }
        } else if (ul.id === 'listen-menu') {
            // Listen menu will kick user back to main menu after each selection
            if (selection === 0) {
                selection = 0
                listenMusic(0)
                displayMainMenu()
            } else if (selection === 1) {
                selection = 0
                listenMusic(1)
                displayMainMenu()
            } else if (selection === 2) {
                selection = 0
                listenMusic(2)
                displayMainMenu()
            } else if (selection === 3) {
                selection = 0
                listenMusic(3)
                displayMainMenu()
            } 
        }
        selection = 0
        screenDiv.removeChild(ul)
    }, {once: true})
}

// Resource for Movie HTML guidance https://www.w3schools.com/html/html5_video.asp 
// Royalty Free Alien Movie - https://pixabay.com/videos/alien-eye-gel-aloe-vera-blender-139974/ 
// How to set movie as background https://blog.hubspot.com/website/video-background-css
// https://pixabay.com/videos/dog-pet-animal-small-furry-cute-15305/
const watchMovie = (num) => {
    // Loads timed movies
    // Use classes to style screen for movies
    screenDiv.classList.remove('screenc')
    screenDiv.classList.add('screenmovie')
    if (num === 0) {
        // Eye Cee You
        // Add to screen
        screenDiv.appendChild(movieOne)
        // Give properties
        const sourceOne = document.createElement('source')
        sourceOne.src = 'img/Alienmovie.mp4'
        sourceOne.type = 'video/mp4'
        movieOne.appendChild(sourceOne)
        // Load movie each time, & tell to autoplay
        movieOne.load()
        movieOne.play()
        movieOne.autoplay = true
        // Add a "leave option" after the movie finishes to prompt user interaction with select button
        setTimeout(()=> {
            screenDiv.appendChild(leaveOption)
            selectButton.addEventListener('click', exitMovie)
        }, 8000)
        // This movie prompts Phone/Cell Phone interaction
        setTimeout(() => {
            interactPhone()
        }, 10000)
        // update game stats
        entertainmentScore += 15
        sanityScore -= 10
        departure -=10
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (num === 1) {
        // Matriception
        // Add to screen
        screenDiv.appendChild(movieTwo)
        // Give propertise
        const sourceTwo = document.createElement('source')
        sourceTwo.src = 'img/action_movie.mp4'
        sourceTwo.type = 'video/mp4'
        movieTwo.appendChild(sourceTwo)
        // Load movie each time, & tell to autoplay
        movieTwo.load()
        movieTwo.play()
        movieTwo.autoplay = true
        // This movie changes the background of the window to simulate being in the movie
        backgroundVideo.classList.remove('hide')
        // Load & play the background movie
        backgroundVideo.load()
        backgroundVideo.play()
        backgroundVideo.autoplay = true
        // Style the game div for the background movie
        gameDiv.style.backgroundImage = 'none'
        gameDiv.style.backgroundColor = 'transparent'
        setTimeout(()=> {
            // add the leave button & return window to normal after movie playd
            screenDiv.appendChild(leaveOption)
            selectButton.addEventListener('click', exitMovie)
            gameDiv.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2014/11/06/10/54/passengers-519008_960_720.jpg')"
            gameDiv.style.backgroundColor = 'rgb(221, 221, 203)'
            backgroundVideo.classList.add('hide')
        }, 18000)
        // update game stats
        entertainmentScore += 30
        sanityScore += 5
        departure -= 12
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (num === 2) {
        // Add movie to screen
        screenDiv.appendChild(movieThree)
        // Give properties
        const sourceThree = document.createElement('source')
        sourceThree.src = 'img/dog_movie.mp4'
        sourceThree.type = 'video/mp4'
        movieThree.appendChild(sourceThree)
        // Load & play movie
        movieThree.load()
        movieThree.play()
        movieThree.autoplay = true
        // Add leave option
        setTimeout(()=> {
            screenDiv.appendChild(leaveOption)
            selectButton.addEventListener('click', exitMovie)
        }, 14000)
        // update game stats
        entertainmentScore += 20
        sanityScore += 20
        departure += 5
        displayStats(entertainmentScore, sanityScore, departure)
    } 
}

const exitMovie = () => {
    // Resets screen to main menu
    // Remove everything on screen
    while (screenDiv.firstChild) {
        screenDiv.removeChild(screenDiv.firstChild)
    }
    // Remove select button event listener
    selectButton.removeEventListener('click', exitMovie)
    // Add styling class back on & remove screenmovie class
    screenDiv.classList.add('screenc')
    screenDiv.classList.remove('screenmovie')
    // Return screen to main menu
    displayMainMenu()
}

const listenMusic = (num) => {
    if (num === 0) {
        // Pause other sounds if active
        soundTwo.pause()
        soundThree.pause()
        // Load and loop sound one - empty mind
        const sourceOne = document.createElement('source')
        sourceOne.src = 'sounds/empty-mind-118973.mp3'
        sourceOne.type = 'audio/mpeg'
        soundOne.appendChild(sourceOne)
        soundOne.load()
        soundOne.play()
        soundOne.loop = true
        // update game stats
        entertainmentScore += 15
        sanityScore += 20
        departure -= 15
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (num === 1) {
        // Pause other sounds if activce
        soundOne.pause()
        soundThree.pause()
        // Load and loop sound two - soundk
        const sourceTwo = document.createElement('source')
        sourceTwo.src = 'sounds/sound-k-117217.mp3'
        sourceTwo.type = 'audio/mpeg'
        soundTwo.appendChild(sourceTwo)
        soundTwo.load()
        soundTwo.play()
        soundTwo.loop = true
        // update game stats
        entertainmentScore += 20
        sanityScore += 25
        departure -= 10
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (num === 2) {
        // Pause other sounds if active
        soundOne.pause()
        soundTwo.pause()
        // Load and loop sound three - sensual jazz
        const sourceThree = document.createElement('source')
        sourceThree.src = 'sounds/sensual-jazz-130483.mp3'
        sourceThree.type = 'audio/mpeg'
        soundThree.appendChild(sourceThree)
        soundThree.load()
        soundThree.play()
        soundThree.loop = true
        // update game stats
        entertainmentScore += 10
        sanityScore -= 5
        departure -= 5
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (num === 3) {
        // Pause all music
        soundOne.pause()
        soundTwo.pause()
        soundThree.pause()
    }
}

// Set Game Interactions with Attendant & Passenger

const interactAttendant = () => {
    // Create attendant text & add to screen
    let trayTableStr = '"Excuse me! We cant take off until your tray table is closed!"'
    attendantDiv.appendChild(attendantTextDiv)
    attendantTextDiv.innerText = trayTableStr

    // Style console div for player interaction
    consoleDiv.style.display = 'flex'
    consoleDiv.style.flexDirection = 'column'
    consoleDiv.style.justifyContent = 'center'
    consoleDiv.style.alignItems = 'center'
    consoleDiv.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2022/11/30/06/13/tunnel-7626014_960_720.png')"
    consoleDiv.style.boxShadow = '0 0 10px 3px rgba(235, 245, 236, 0.582)'
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
        departure -= 0
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (event.target.id === '1opt') {
        // Ask for 5 more minutes - impact on score
        entertainmentScore += 5
        sanityScore += 2
        departure += 30
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (event.target.id === '2opt') {
        // Make a scene - impact on score
        entertainmentScore += 10
        sanityScore -= 20
        departure -= 0
        displayStats(entertainmentScore, sanityScore, departure)
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
    // Restyle console div
    consoleDiv.style.backgroundImage = 'url("https://i.imgur.com/H6hh6Pw.jpg")'
    consoleDiv.style.boxShadow = '0 0 10px 5px rgba(0,0,0,.6) inset'
    // Unhide controls, phone and screen divs
    controlsDiv.style.display = 'grid'
    phoneDiv.classList.remove('hide')
    screenDiv.classList.remove('hide')
    // Remove flight attendant text div
    attendantDiv.removeChild(attendantTextDiv)
    // "Close tray table" by restyling to original image
    trayTableDiv.style.backgroundImage = 'url("https://i.imgur.com/H6hh6Pw.jpg")'
    trayTableDiv.style.boxShadow = '0 0 10px 1px rgba(0,0,0,.5) inset, 0 -1px 4px .5px rgba(0,0,0,.9)'
    trayTableButton.style.transform = ''
    // Add event listener back onto tray table to be used again
    trayTableButton.addEventListener('click', startTrayTableInt)
}

const startTrayTableInt = () => {
    // Begin tray table interaction once clicked, delay attendant for more realistic interaction
    trayTableButton.removeEventListener('click', startTrayTableInt)
    // Style tray table to appear open
    trayTableDiv.style.backgroundImage = 'url("https://i.imgur.com/zQkpBLL.jpg")'
    trayTableDiv.style.boxShadow = '0 0 10px 3px rgba(0,0,0,.9) inset, 0 -1px 4px .5px rgba(0,0,0,.9)'
    // Rotate the button to simulate a tray table
    trayTableButton.style.transform = 'rotate(90deg)'
    // set flight attendant interaction to start 3 seconds after tray table is open
    setTimeout(interactAttendant, 3000)
}

const interactBaby = () => {
    // Creates interaction with a passenger baby crying
    // Create baby text & set number to repeat
    const babyCryStr = 'Wah'
    passenger.appendChild(babyTextDiv)
    const addWah = () => {
        // Add divs to screen for each cry
        let wah = document.createElement('p')
        wah.textContent = babyCryStr
        babyTextDiv.appendChild(wah)
        babyTextDiv.appendChild(wah)
        // Play sound for each cry
        const sourceBaby = document.createElement('source')
        sourceBaby.src = 'sounds/tre-em-bi-on-43927.mp3'
        sourceBaby.type = 'audio/mpeg'
        babyCrySound.appendChild(sourceBaby)
        babyCrySound.load()
        babyCrySound.play()
        // Decrease sanity score each time baby cries
        sanityScore -= 5 
        displayStats(entertainmentScore, sanityScore, departure)
    }
    // Cry once before interval begins
    addWah()
    babyCry = setInterval(addWah, 2000)
    // Clear interval after 14 seconds
    setTimeout(()=>{clearInterval(babyCry)}, 14000)
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
        // Style console Div for player interaction
        consoleDiv.style.display = 'flex'
        consoleDiv.style.flexDirection = 'column'
        consoleDiv.style.justifyContent = 'center'
        consoleDiv.style.alignItems = 'center'
        consoleDiv.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2022/11/30/06/13/tunnel-7626014_960_720.png')"
        consoleDiv.style.boxShadow = '0 0 10px 3px rgba(235, 245, 236, 0.582)'
        // Hide other elements on top of console
        controlsDiv.style.display = 'none'
        phoneDiv.classList.add('hide')
        screenDiv.classList.add('hide')    
    }
    // Run function after a brief pause following tic tac toe
    setTimeout(setReactions, 1500)
}

const reactBaby = (event) => {
    // Update game statistics based on reaction selected
    clearInterval(babyCry)
    if (event.target.id === '0optb') {
        // Try to ignore - impact on scores
        departure += 60
        entertainmentScore -= 5
        sanityScore -= 5
        displayStats(entertainmentScore, sanityScore, departure)
        // Add baby crying sound at lower volume for remainder of game?
    } else if (event.target.id === '1optb') {
        // Put in headphones - impact on scores
        departure += 0
        entertainmentScore += 20
        sanityScore += 20
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (event.target.id === '2optb') {
        // Cry louder than baby - impact on scores
        departure += 0
        entertainmentScore += 10
        sanityScore -= 20
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (event.target.id === '3optb') {
        // Play peekaboo - impact on scores
        departure -= 30
        entertainmentScore += 20
        sanityScore += 10
        displayStats(entertainmentScore, sanityScore, departure)
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
    // Restyle console div
    consoleDiv.style.backgroundImage = 'url("https://i.imgur.com/H6hh6Pw.jpg")'
    consoleDiv.style.boxShadow = '0 0 10px 5px rgba(0,0,0,.6) inset'
    // Redisplay console elements to continue gameplay
    controlsDiv.style.display = 'grid'
    phoneDiv.classList.remove('hide')
    screenDiv.classList.remove('hide')
}

const touchPhone = () => {
    // After phone clicked, return styling and remove event listener, start interaction
    phoneDiv.removeEventListener('click', touchPhone)
    phoneDiv.style.animation = 'none'
    // Stop ringing sound
    phoneRingSound.loop = false
    // Open uop cell phone
    interactCellPhone()
}

// Source for shake animation, including CSS: https://unused-css.com/blog/css-shake-animation/

const interactPhone = () => {
    // Adds animation & sound to prompt user reaction
    // Add event listener to phone to allow click
    phoneDiv.addEventListener('click', touchPhone)
    // Style phone to simulate ringing
    phoneDiv.style.animation = 'skew-x-shake 1.3s infinite'
    // Add sound to get user's attention
    const sourcePhone = document.createElement('source')
    sourcePhone.src = 'sounds/vintage-phone-ringing-121778.mp3'
    sourcePhone.type = 'audio/mpeg'
    phoneRingSound.appendChild(sourcePhone)
    phoneRingSound.load()
    phoneRingSound.play()
    phoneRingSound.loop = true
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
    part0.style.textAlign = 'center'
    part0.style.fontSize = '25px'
    // style family text messages
    part2.style.backgroundColor = 'darkgrey'
    part2.style.borderRadius = '5px'
    part2.style.marginTop = '2px'
    part4.style.backgroundColor = 'darkgrey'
    part4.style.borderRadius = '5px'
    part4.style.marginTop = '2px'
    part6.style.backgroundColor = 'darkgrey'
    part6.style.borderRadius = '5px'
    part6.style.marginTop = '2px'
    // style sent text
    part7.style.borderRadius = '5px'
    part7.style.marginTop = '2px'
    
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
        playerText.style.backgroundColor = 'white'
    }    
    // Set the sent text to the text in the textContentSpan
    playerText.textContent = textContentSpan.textContent
    playerText.style.backgroundColor = 'blue'
    // adjust scores based on the text the player chose to send
    if (playerText.textContent === textOption1) {
        // Taxi option - impact to scores
        departure -= 0
        entertainmentScore += 0
        sanityScore -= 20
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (playerText.textContent === textOption2) {
        // Send ETA option - impact to scores
        departure -= 30
        entertainmentScore += 10
        sanityScore += 10
        displayStats(entertainmentScore, sanityScore, departure)
    } else if (playerText.textContent === textOption3) {
        // Excited option - impact to scores
        departure += 0
        entertainmentScore += 20
        sanityScore -= 15
        displayStats(entertainmentScore, sanityScore, departure)
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
            displayStats(entertainmentScore, sanityScore, departure) 
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
            displayStats(entertainmentScore, sanityScore, departure) 
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
            displayStats(entertainmentScore, sanityScore, departure) 
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
            displayStats(entertainmentScore, sanityScore, departure) 
        }
    } 
}

const makeMove = (event) => {

    
    // Identify which box is selected
    const tttPlayerSelection = document.querySelector('.tttselection')
    if (event.target.id === 'select' && !tttPlayerSelection.classList.contains('played')) {
        // Increase move counter
        moveCounter++
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
        displayStats(entertainmentScore, sanityScore, departure) 
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
            departure -= 30
            sanityScore += 5
            entertainmentScore += 10
            displayStats(entertainmentScore, sanityScore, departure) 
        } else if (result === false) {
            // If player O wins, add & style the text in the result div, increase the score counter and end the game
            resultBox.textContent = "Player O Wins!"
            resultBox.style.color = '#cdcdcd'
            // adjust scores based on win result
            departure -= 15
            sanityScore += 2
            entertainmentScore += 5
            displayStats(entertainmentScore, sanityScore, departure) 
        } else if (moveCounter === 9 && result === null) {
            // If neither player wins, add & style the text in the result div, increase the score counter and end the game. Apply complimentary textShadow to override default
            resultBox.textContent = "It's a Tie!"
            resultBox.style.color = '#e6a176'
            resultBox.style.textShadow = '1px 1px 2px #984464'
            // adjust scores based on win result
            departure += 10
            sanityScore -= 10
            entertainmentScore -= 10
            displayStats(entertainmentScore, sanityScore, departure) 
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
    const tttResult = document.getElementById('tttresult')
    const tttLeave = document.getElementById('leave')
    // Remove game event listeners
    upButton.removeEventListener('click', navAction)
    downButton.removeEventListener('click', navAction)
    leftButton.removeEventListener('click', navAction)
    rightButton.removeEventListener('click', navAction)
    selectButton.removeEventListener('click', makeMove)
    screenDiv.classList.add('screenmovie')
    tttResult.style.margin = '50px'
    // Reset ttt statistics
    moveCounter = 0
    for (let i = 0; i < 9; i++) {
        playerXMoves.pop()
        playerOMoves.pop()
    }
    const exitToMain = () => {
        // Removes tictactoe elements from screen and displays main menu
        screenDiv.removeChild(tttResult)
        screenDiv.removeChild(tttLeave)
        displayMainMenu()
        // Removes event listener from select button
        selectButton.removeEventListener('click', exitToMain)
        screenDiv.classList.remove('screenmovie')
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

// Create player answer arrays
let ansOneArray = []
let ansTwoArray = []
let ansThreeArray = []
let ansFourArray = []
let ansFiveArray = []

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
    safetyCardDiv.classList.add('opened')
    // Place Safety card span for title
    safetyCardSpan.style.gridArea = '1 / 1 / 2 / 7'
    safetyCardSpan.style.zIndex = '1'
    safetyCardSpan.innerText = 'Safety Demonstration: Drag images to correct boxes to complete'
    // Create 3 panel divs for styling & placement in game grid
    const panelOneDiv = document.createElement('div')
    const panelTwoDiv = document.createElement('div')
    const panelThreeDiv = document.createElement('div')
    panelOneDiv.style.gridArea = '1 / 1 / 7 / 3'
    panelTwoDiv.style.gridArea = '1 / 3 / 7 / 5'
    panelThreeDiv.style.gridArea = '1 / 5 / 7 / 7'
    // Add class to Panel div
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
    // Display the draggable element in it's new location
    draggable.classList.remove('hide')
    // Increase move counter to avoid player getting stuck
    scMoveCounter++
    // Check if safety card puzzle complete after each drop event
    checkSafetyComplete()
    // Check for fails
    checkSCFail()
}

const checkSafetyComplete = () => {
    // Checks if safety puzzle has been completed successfully
    // Clear arrays for each check
    ansOneArray = []
    ansTwoArray = []
    ansThreeArray = []
    ansFourArray = []
    ansFiveArray = []
    // Populate player arrays with current child nodes
    for (let i = 0; i < 2; i++) {
        if (answerOne.childNodes.length >= 2 && answerTwo.childNodes.length >= 2 && answerThree.childNodes.length >= 2 && answerFour.childNodes.length >= 2 && answerFive.childNodes.length >= 2) {
            // Only run below if each answer Div has at least two images
            let childOne = answerOne.childNodes[i]
            let childTwo = answerTwo.childNodes[i]
            let childThree = answerThree.childNodes[i]
            let childFour = answerFour.childNodes[i]
            let childFive = answerFive.childNodes[i]
            ansOneArray.push(childOne.id)
            ansTwoArray.push(childTwo.id)
            ansThreeArray.push(childThree.id)
            ansFourArray.push(childFour.id)
            ansFiveArray.push(childFive.id)
        }
    }
    // Compare player answer arrays to win conditions & increase score by one each time
    const ansArrays = [ansOneArray, ansTwoArray, ansThreeArray, ansFourArray, ansFiveArray]
    for(let i = 0; i < 5; i++) {
        if(findWinCombo(ansArrays[i], scWinArrays[i])) {
            complete++
        } 
    } 
    // When score of 5 is reached, safety card is complete
    if (complete === 5) {
        // When safety card puzzle complete, return to main screen
        while (safetyCardDiv.firstChild) {
            safetyImgDiv.appendChild(safetyCardDiv.firstChild)
        }
        // Adjust scores
        departure -= 30
        entertainmentScore += 30
        sanityScore += 20
        displayStats(entertainmentScore, sanityScore, departure) 
        // Change text of safety card title to show completed puzzle
        safetyCardSpan.innerText = "COMPLETE"
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
    safetyCardDiv.classList.remove('opened')
    safetyCardDiv.classList.add('closed')
    // Add back the safety card title span
    const planeNumberSpan = document.getElementById('planenumber')
    safetyCardDiv.append(planeNumberSpan)
    safetyCardDiv.append(safetyCardSpan)
    safetyCardSpan.style.gridArea = '2 / 3 / 3 / 4'
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
        // Update title span to show player they failed the demonstration
        safetyCardSpan.innerText = "TRY AGAIN"
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