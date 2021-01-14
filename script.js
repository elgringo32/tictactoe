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


//Board Module
// function gameBoardBuilder(){
//     const gameBoard = document.getElementById('game-board');
//         var i;
//         for (i=0; i<9; i++) {
//             const gridBlock = document.createElement('div');
//             gridBlock.classList.add('grid-block');
//             gridBlock.setAttribute('data-cell-id', i+1);
//             gameBoard.appendChild(gridBlock);

//         };
//     let gameBoardCells = document.querySelectorAll('.grid-block');
//     gameBoardCells.forEach(cell => cell.addEventListener('click', markCell));    
// }
let  boardArray = new Array(9);
const gameBoard = (() => {
    const buildNew = () => {
    const gameBoard = document.getElementById('game-board');
        let i;
        for (i=0; i<9; i++) {
            const gridBlock = document.createElement('div');
            gridBlock.classList.add('grid-block');
            gridBlock.setAttribute('data-cell-id', i+1);
            gameBoard.appendChild(gridBlock);
            
        };
    let gameBoardCells = document.querySelectorAll('.grid-block');
    gameBoardCells.forEach(cell => cell.addEventListener('click', markCell)); 
    }  
    
    const markCell = (divGridBlock) => {
        let cell = divGridBlock.path[0];
        if (!cell.innerText) {
            let mark = currentPlayer.playTurn();
            cell.innerText = mark;
            arrayPosition = cell.dataset.cellId;
            boardArray[arrayPosition]= mark;
            console.log(boardArray);
            checkWinner.horizontalCheck();
            switchPlayer();
        }
        else {
            alert('square is already taken :(')
        }
    }

    
    return {buildNew,markCell,boardArray};
})();

const checkWinner = (() => {
    const horizontalCheck = () => {
        if (boardArray[1] && boardArray[2] && boardArray[3]) {
            if(boardArray[1]===boardArray[2] && boardArray[2]===boardArray[3]) {
                console.log(currentPlayer.getName());
            }
        }   
    }
    return {
        horizontalCheck
    }
})();


    //     else if(boardArray[4]===boardArray[5] && boardArray[5]===boardArray[6]) {
    //         console.log(currentPlayer.getName());
    //     }
    //     else if(boardArray[7]===boardArray[8] && boardArray[8]===boardArray[9]) {
    //         console.log(currentPlayer.getName());
    //     }


gameBoard.buildNew();

