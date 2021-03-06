// Array Sort
let myArray = ["rural", "wonderful", "wary", "fast", "desk", "outstanding", "entertain", "didactic", "stage", "guess", "north", "spot", "butter", "dogs", "knowledgeable", "rightful", "light", "same", "stir", "frame", "bath", "beneficial", "breakable", "pickle", "relieved", "dangerous", "crowded", "bike", "risk", "ultra", "round", "innate", "exist", "flash", "unlock", "sordid", "abortive", "animated", "cheap", "share", "imminent", "dusty", "reject", "person", "helpful", "motionless", "keen", "selfish", "need", "chance", "friends", "luxuriant", "road", "absorbing", "cushion", "excuse", "melted", "groovy", "charming", "brief", "gruesome", "screw", "fill", "afraid", "suppose", "cat", "wind", "shiny", "tongue", "open", "detailed", "milky", "nice", "hose", "alive", "man", "seed", "pets", "kick", "ruddy", "tickle", "careless", "mice", "tricky", "turn", "clean", "attend", "stormy", "enchanted", "guttural", "judicious", "flavor", "talented", "serious", "roasted", "elfin", "label", "eatable", "mark", "frequent", "used", "shallow", "standing", "advise", "fog", "poison", "blot", "snail", "fade", "faithful", "religion", "wrench", "fasten", "quixotic", "doll", "undesirable", "greasy", "brawny", "cast", "houses", "bruise", "ancient", "delicious", "well-off", "pop", "adorable", "suit", "dance", "dreary", "aloof", "screeching", "mouth", "cloudy", "icy", "womanly", "yes", "iron", "boorish", "harsh", "wool", "pedal", "bite", "obey", "mourn", "bridge", "educated", "fire", "end", "scrub", "chalk", "planes", "crush", "amusement", "notebook", "race", "sore", "stem", "delirious", "ask", "fat", "damaging", "ubiquitous", "hobbies", "different", "current", "square", "strap", "trot", "capable", "invention", "want", "impartial", "pet", "idea", "rhetorical", "straw", "crown", "racial", "arithmetic", "suffer", "super", "befitting", "plane"]

function SortWords() {
    for(let i = 0; i <= myArray.length; ++ i) {
        let newSpan = document.createElement('span')
        document.querySelector('#textSpanAppear').appendChild(newSpan)

        newSpan.innerHTML = myArray[Math.floor(Math.random() * myArray.length)]
    }
}

SortWords()


// Declaration
let testBox = document.querySelector('#textBox')
let testBoxText = document.querySelector('#textSpanAppear')
let inputText = document.querySelector('#writeBox')
let timerText = document.querySelector('#timerText')
let scoreCointainer = document.querySelector('#scoreText')
let scoreWPM = document.querySelector('#scoreWPM')
let bubble = document.querySelector('#ballMoving')

let userScore = 0
let gameStart = false
let isFocus = false

let currentWordNumber = 1
let currentWord = document.querySelector(`#textSpanAppear span:nth-child(${currentWordNumber})`)
currentWord.classList.add('currentWord')


// Start Game
function inputType() {
    if(!gameStart) {
        startTimer(60, timerText)
        gameStart = true
    }
}


// Text Input
window.addEventListener('keyup', function (event) {
    if(inputText.value.indexOf(' ') === 0) {
        inputText.value = ''
    }
    // event.target.value.charAt(event.target.selectionStart - 1).charCodeAt() === 32
    
    if(inputText.value.indexOf(' ') > 0 && isFocus && inputText.value.trim().length) { //Trims the string of white spaces from the value > 0 ('  ' -> '')
        let wordStore = inputText.value.split(' ')
        inputText.value = wordStore[1]
        
        ++ currentWordNumber
        selectThisWord(currentWordNumber, wordStore[0])
    }
})


// Word selected and previous add class
function selectThisWord(currWordNumber, wordStore) {
    if(document.querySelector(`#textSpanAppear span:nth-child(${currentWordNumber})`).offsetTop + 30 > testBox.offsetHeight) {
        document.querySelector('#textSpanAppear').innerHTML = ''
        SortWords()

        currentWordNumber = 1
        currentWord = document.querySelector(`#textSpanAppear span:nth-child(${currentWordNumber})`)
        currentWord.classList.add('currentWord')
    }
    else {
        let prevWord = document.querySelector(`#textSpanAppear span:nth-child(${currWordNumber - 1})`)
        prevWord.classList.remove('currentWord')
        prevWord.classList.remove('wrongWord')

        bubble.classList.add('currentBubble')
        bubble.classList.remove('wrongBubble')

        currentWord = document.querySelector(`#textSpanAppear span:nth-child(${currWordNumber})`)
        currentWord.classList.add('currentWord')

        shouldUserScore(wordStore, prevWord)
    }
}


// Test if user scored
function shouldUserScore(userInput, prevWord) {
    let textValue = prevWord.textContent

    if(userInput === textValue) {
        prevWord.style.color = 'green'
        ++ userScore
    }
    else {
        prevWord.style.color = 'red'
    }
}


// Test if word typed wrong, red background appears
inputText.addEventListener('input', function () {
    let cevaMergi = currentWord.innerText // Take text from span
    let character = inputText.value.split(' ') // Splits the input value when finding space

    // Adding Wrong Class (Red)
    if(!cevaMergi.startsWith(character[0])) {
        currentWord.classList.add('wrongWord')
        currentWord.classList.remove('currentWord')

        bubble.classList.add('wrongBubble')
        bubble.classList.remove('currentBubble')
    }
    // Removing Wrong Class (White)
    else {
        currentWord.classList.add('currentWord')
        currentWord.classList.remove('wrongWord')

        bubble.classList.add('currentBubble')
        bubble.classList.remove('wrongBubble')
    }
})


// End Game Message
function showGameOver() {
    inputText.disabled = true
    inputText.value = ''

    let wordPerMinute = Math.round((userScore / 60) * 100)
    scoreWPM.textContent = wordPerMinute + ' WPM'
    scoreCointainer.style.display = 'block'

    setTimeout(function () {
        scoreCointainer.style.opacity = '1'
    }, 500)
}


// Moving Ball animation
{
    // First Appearance of the Ball
    let ceva1 = Math.floor(Math.random() * 80 )
    let ceva2 = Math.floor(Math.random() * 80 )
    document.querySelector('#ballMoving').style.top = ceva1 + '%'
    document.querySelector('#ballMoving').style.left = ceva2 + '%'

    // Animation Appearance of the Ball
    setInterval(function () {
        ceva1 = Math.floor(Math.random() * 80 )
        ceva2 = Math.floor(Math.random() * 80 )
        document.querySelector('#ballMoving').style.top = ceva1 + '%'
        document.querySelector('#ballMoving').style.left = ceva2 + '%'
    }, 10000)
}


// Timer
function startTimer(duration, elem) {
    let timer = duration
    let minutes
    let seconds

    let tick = setInterval(function () {
        minutes = parseInt(timer / 60)
        seconds = parseInt(timer % 60)
        
        if(timer == 57) {
            elem.style.opacity = '0'
            setTimeout(function () {
                elem.style.display = 'none'
                document.querySelector('#ballMoving').style.opacity = '1'
            }, 500)
        }
        else if(timer == 6) {
            elem.style.display = 'block'
            setTimeout(function () {
                elem.style.opacity = '0.5'
            }, 500)
        }

        if(seconds < 10) {
            seconds = '0' + seconds
        }
        else {
            seconds = seconds
        }

        -- timer

        elem.textContent = minutes + ':' + seconds

        if(timer < 0) {
            clearInterval(tick)

            elem.style.opacity = '0'
            document.querySelector('#ballMoving').style.opacity = '0'
            setTimeout(function () {
                elem.style.display = 'none'
            }, 500)

            showGameOver()
        }
    }, 1000)
}


// Test if the player is in the form
function onFocus() {
    isFocus = true
}

function onBlur() {
    isFocus = false
}