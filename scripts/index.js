const gameboard = (() => {
    // Private Vars
    let currentTurn = -1;
    let currentPlayer = document.getElementById('turninfo')
    let newgame = document.getElementById('newgame')
    var playerOneTurn = ''
    var playerTwoTurn = ''
    var playerOne = ''
    var playerTwo = ''

    // public
    var action = {}

    action.submit = () => {
        currentTurn = randomStart()
        let submit = document.getElementById('submit')
        playerOne = document.getElementById('p1name').value
        playerTwo = document.getElementById('p2name').value
        playerOneTurn = `${playerOne}\'s ( X ) Turn!`
        playerTwoTurn = `${playerTwo}\'s ( O ) Turn!`
        if (playerOne && playerTwo){
            let board = document.getElementById('board')
            board.classList.remove('hidden')
            let playerName = document.getElementById('playername')
            let blackout = document.getElementById('blackout')
            blackout.classList.add('fullhidden')
            playerName.classList.add('fullhidden')
            playerName.style.zIndex = -1
            currentTurn = randomStart()
            if (currentTurn == 0){
                currentPlayer.textContent = playerOneTurn
            } else if (currentTurn == 1){
                currentPlayer.textContent = playerTwoTurn
            }
            submit.classList.add('fullhidden')
        }
    }

    action.back = () => {

    }

    action.chooseOnePlayer = () => {

    }

    action.chooseTwoPlayers = () => {
        let topWindow = document.getElementById('playerselect')
        topWindow.classList.add('fullhidden')
        topWindow.style.zIndex = -1
        let playerName = document.getElementById('playername')
        playerName.classList.remove('fullhidden')
    }

    action.playTurn = () => {
        let stamp = getCurrentPlayerSymbol()
        nextTurn()
        setNextPlayerTurnInfo()
        return stamp
    }

    action.verifyFinalState = () => {
        if (getGameStatus() == 0){
            currentPlayer.textContent = 'Game Over! This Game is a Tie!'
            newgame.classList.remove('fullhidden')
        } else if (getGameStatus() == 1){
            currentPlayer.textContent = `Game Over! ${playerOne} Wins!`
            newgame.classList.remove('fullhidden')
        } else if (getGameStatus() == 2){
            currentPlayer.textContent = `Game Over! ${playerTwo} Wins!`
            newgame.classList.remove('fullhidden')
        }
        return getGameStatus()
    }

    action.restart = () => {
        cleanGameboard()
    }

    //private
    /*
    const AIAction = () => {
        
    }
    */
    const checkWin = () => {
        const threeInRow = (a, b, c) => {
            if (a && b && c){
                if (a == b && a == c && b == c){
                    if (a == 'X'){
                        return 1
                    } else if (a == 'O'){
                        return 2
                    } else {
                        return false
                    }
                }
            }
        }

        let topleft = document.getElementById('topleft').textContent
        let top = document.getElementById('top').textContent
        let topright = document.getElementById('topright').textContent
        let centerleft = document.getElementById('centerleft').textContent
        let center = document.getElementById('center').textContent
        let centerright = document.getElementById('centerright').textContent
        let bottomleft = document.getElementById('bottomleft').textContent
        let bottom = document.getElementById('bottom').textContent
        let bottomright = document.getElementById('bottomright').textContent

        if (threeInRow(topleft, center, bottomright)){
            return threeInRow(topleft, center, bottomright)
        } else if (threeInRow(top, center, bottom)){
            return threeInRow(top, center, bottom)
        } else if (threeInRow(topright, center, bottomleft)){
            return threeInRow(topright, center, bottomleft)
        } else if (threeInRow(centerleft, center, centerright)){
            return threeInRow(centerleft, center, centerright)
        } else if (threeInRow(topleft, centerleft, bottomleft)){
            return threeInRow(topleft, centerleft, bottomleft)
        } else if (threeInRow(topright, centerright, bottomright)){
            return threeInRow(topright, centerright, bottomright)
        } else if (threeInRow(topright, top, topleft)){
            return threeInRow(topright, top, topleft)
        } else if (threeInRow(bottomleft, bottom, bottomright)){
            return threeInRow(bottomleft, bottom, bottomright)
        }
        return -1
    }

    const checkDraw = () => {
        let allSquares = document.querySelectorAll('.square')
        let gameover = true
        allSquares.forEach((e) => {
            if (!e.textContent){
                gameover = false
            }
        })
        return gameover
    }

    const getGameStatus = () => {
        if(checkDraw()){
            return 0
        } else if (checkWin()){
            return checkWin()
        } else {
            return -1
        }
    }

    const randomStart = () => {
        return Math.floor(Math.random() * 2);
    }

    const setNextPlayerTurnInfo = () => {
        if(checkDraw()) { currentPlayer.textContent = 'Tie!' }
        if (currentTurn == 0){
            currentPlayer.textContent = playerOneTurn
        } else if (currentTurn == 1){
            currentPlayer.textContent = playerTwoTurn
        }
    }

    const getCurrentPlayerSymbol = () => {
        if (currentTurn == 0){
            return 'X'
        } else if (currentTurn == 1) {
            return 'O'
        }
    }

    const nextTurn = () => {
        if (currentTurn == 0){
            currentTurn = 1
        } else if (currentTurn == 1) {
            currentTurn = 0
        }
    }

    // Currently Unused
    const cleanGameboard = () => {
        let allSquares = document.querySelectorAll('.square')
        allSquares.forEach((e) => {
            console.log(e)
            if (e.textContent == 'X'){
                e.classList.remove('stampX')
            } else if (e.textContent == 'O'){
                e.classList.remove('stampO')
            }
            e.textContent = ''
        })
        currentTurn = randomStart()
        setNextPlayerTurnInfo()
        newgame.classList.add('fullhidden')
    }

    return {
        action
    }
})();


//// Global


let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    gameboard.action.submit()
})

var p2 = document.getElementById('p2')
p2.addEventListener('click', () => {
    gameboard.action.chooseTwoPlayers()
})

var restart = document.getElementById('restart')
restart.addEventListener('click', () => {
    if (gameboard.action.verifyFinalState() >= 0){
        gameboard.action.restart()
    }
})

var newgame = document.getElementById('new')
newgame.addEventListener('click', () => {
    location.reload()
})

let allSquares = document.querySelectorAll('.square')
allSquares.forEach(square => {
    square.addEventListener('click', (e) => {
        if(gameboard.action.verifyFinalState() < 0){
            if (submit.classList.contains('fullhidden') && !e.target.textContent){
                e.target.textContent = gameboard.action.playTurn()
                if (e.target.textContent == 'X'){
                    e.target.classList.add('stampX')
                } else if (e.target.textContent == 'O'){
                    e.target.classList.add('stampO')
                }
            }
            gameboard.action.verifyFinalState()
        }
    })
})
