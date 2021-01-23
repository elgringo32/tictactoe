let playerArray = [];
let player1
let player2
let currentPlayer
let maxPlays = 9;
let gameOver = false;

//Player Factory
const Player = (name, position) => {
	const getName = () => name;
	const getPosition = () => position;
	function playTurn() {
        if (position === 1) {
            return 'x';
        }
        if (position === 2) {
            return 'o';
        }
    }
    return {
        getName, 
        getPosition, 
        playTurn
    }
}


function setResetButton() {
    let startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
    let resetButton = document.getElementById('reset-button');
    resetButton.style.display = 'block';
}


function getPlayerNames() {
        let playerName1 = document.querySelector('#player-name-1').value;
        let playerName2 = document.querySelector('#player-name-2').value;
        const player1 = Player(playerName1,1);
        playerArray.push(player1);
        const player2 = Player(playerName2,2);
        playerArray.push(player2);
}

function startGame() {
        getPlayerNames();
        game.resetNames();
        game.setPlayers(playerArray);
        setResetButton();
        game.reset();
}

const getStartedButton = document.getElementById('start-game-button');
getStartedButton.addEventListener('click', startGame);

let  boardArray = new Array(9);

const game = (() => {
    const board = document.getElementById('game-board');

    const setPlayers = (playerArray) => {
        currentPlayer = playerArray[0];
        player1 = playerArray[0];
        player2 = playerArray[1];

        let divPlayer1 = document.getElementById('player-1');
        let headingName1 =  document.createElement('h2');
        headingName1.innerText = player1.getName();
        divPlayer1.appendChild(headingName1);

        let divPlayer2 = document.getElementById('player-2');
        let headingName2 =  document.createElement('h2');
        headingName2.innerText = player2.getName();
        divPlayer2.appendChild(headingName2);
    }
    const createBoard = () => {
        let i;
        for (i=0; i<9; i++) {
            const gridBlock = document.createElement('div');
            gridBlock.classList.add('grid-block');
            gridBlock.setAttribute('data-cell-id', i+1);
            board.appendChild(gridBlock);
        };

        let boardCells = document.querySelectorAll('.grid-block');
        boardCells.forEach(cell => cell.addEventListener('click', markCell)); 
    }

    const switchPlayer = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else if (currentPlayer === player2) {
            currentPlayer = player1;
        }; 
        return currentPlayer;
    }
    
    const resetNames = () => {
        document.getElementById('player-2').innerText = '';
        document.getElementById('player-1').innerText = '';
    }


    const reset = () => {
        board.innerHTML = '';
        game.createBoard();
        boardArray = [];
    }
    
    const markCell = (divGridBlock) => {
        let cell = divGridBlock.path[0];
        if (!cell.innerText) {
            let mark = currentPlayer.playTurn();
            cell.innerText = mark;
            updateArray(cell,mark);
            checkWinner.horizontalCheck();
            checkWinner.verticalCheck();
            checkWinner.diagonalCheck();
            switchPlayer();
        }
        else {
            alert('square is already taken :(')
        }
    }

    const updateArray = (cell,mark) => {
            arrayPosition = cell.dataset.cellId;
            boardArray[arrayPosition]= mark;
    }

    return {
        setPlayers, 
        createBoard, 
        resetNames,
        reset, 
        markCell, 
        boardArray};
})();

const checkWinner = (() => {
    const horizontalCheck = () => {
        if (boardArray[1] && boardArray[2] && boardArray[3]) {
            if(boardArray[1]===boardArray[2] && boardArray[2]===boardArray[3]) {
                console.log('horizontal ' + currentPlayer.getName());
            }
        }
        if (boardArray[4] && boardArray[5] && boardArray[6]) {
            if(boardArray[4]===boardArray[5] && boardArray[5]===boardArray[6]) {
                console.log('horizontal ' + currentPlayer.getName());
            }
        }
        if (boardArray[7] && boardArray[8] && boardArray[9]) {
            if(boardArray[7]===boardArray[8] && boardArray[8]===boardArray[9]) {
                console.log('horizontal ' + currentPlayer.getName());
            }
        }       
    }
    const verticalCheck = () => {
        if (boardArray[1] && boardArray[4] && boardArray[7]) {
            if(boardArray[1]===boardArray[4] && boardArray[4]===boardArray[7]) {
                console.log('vertical ' + currentPlayer.getName());
            }
        }
        if (boardArray[2] && boardArray[5] && boardArray[8]) {
            if(boardArray[2]===boardArray[5] && boardArray[5]===boardArray[8]) {
                console.log('vertical ' + currentPlayer.getName());
            }
        }
        if (boardArray[3] && boardArray[6] && boardArray[9]) {
            if(boardArray[3]===boardArray[6] && boardArray[6]===boardArray[9]) {
                console.log('vertical ' + currentPlayer.getName());
            }
        }       
    }
    const diagonalCheck = () => {
        if (boardArray[1] && boardArray[5] && boardArray[9]) {
            if(boardArray[1]===boardArray[5] && boardArray[5]===boardArray[9]) {
                console.log('diagonal ' + currentPlayer.getName());
            }
        }
        if (boardArray[3] && boardArray[5] && boardArray[7]) {
            if(boardArray[3]===boardArray[5] && boardArray[5]===boardArray[7]) {
                console.log('diagonal ' + currentPlayer.getName());
            }
        }     
    }

    const declareWinner = () => {
        return $('#winnerModal').modal('show');
    }

    return {
        horizontalCheck, 
        verticalCheck,
        diagonalCheck,
        declareWinner
    }
})();

game.createBoard();

