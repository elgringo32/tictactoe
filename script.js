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

const player1 = Player('brian', 1);
const player2 = Player('cruz', 2);

let currentPlayer = player1;



function switchPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    }
    else if (currentPlayer === player2) {
        currentPlayer = player1;
    }; 
    return currentPlayer;
}

let  boardArray = new Array(9);

const gameBoard = (() => {
    const board = document.getElementById('game-board');
    const create = () => {
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
    
    const reset = () => {
        board.innerHTML = '';
        gameBoard.create();
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

    
    return {create, reset, markCell, boardArray};
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

    return {
        horizontalCheck, 
        verticalCheck,
        diagonalCheck
    }
})();


    //     else if(boardArray[4]===boardArray[5] && boardArray[5]===boardArray[6]) {
    //         console.log(currentPlayer.getName());
    //     }
    //     else if(boardArray[7]===boardArray[8] && boardArray[8]===boardArray[9]) {
    //         console.log(currentPlayer.getName());
    //     }


gameBoard.create();

