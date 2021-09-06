const gameboard = (() => {
    // Private Vars
    let currentTurn = -1;
    let currentPlayer = document.getElementById('turninfo')
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

            // Set Turninfo to the value of current player using privFunc
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


    action.test = () => {
        console.log(currentTurn)
        console.log(playerOne)
        console.log(playerTwo)
        console.log(allSquares)
    }

    //private
    /*
    const AIAction = () => {
        
    }
    */
    const checkWin = () => {
    }

    const checkDraw = () => {

    }

    const randomStart = () => {
        return Math.floor(Math.random() * 2);
    }

    const setNextPlayerTurnInfo = () => {
        if (currentTurn == 0){
            currentPlayer.textContent = playerOneTurn
        } else if (currentTurn == 1){
            currentPlayer.textContent = playerTwoTurn
        }
    }

    const getPlayerInt = () => {
        return currentTurn
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


    return {
        action
    }
})();


////


let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    gameboard.action.submit()
    gameboard.action.test()
})

var p2 = document.getElementById('p2')
p2.addEventListener('click', () => {
    gameboard.action.chooseTwoPlayers()
})

let allSquares = document.querySelectorAll('.square')
allSquares.forEach(square => {
    square.addEventListener('click', (e) => {
        if (submit.classList.contains('fullhidden') && !e.target.textContent){
            e.target.textContent = gameboard.action.playTurn()
            if (e.target.textContent == 'X'){
                e.target.classList.add('stampX')
            } else if (e.target.textContent == 'O'){
                e.target.classList.add('stampO')
            }
        }
    })
})

