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
function gameBoardBuilder(){
    const gameBoard = document.getElementById('game-board');
        var i;
        for (i=0; i<9; i++) {
            const gridBlock = document.createElement('div');
            gridBlock.classList.add('grid-block');
            gridBlock.setAttribute('data-cell-id', i+1);
            gameBoard.appendChild(gridBlock);

        };
    let gameBoardCells = document.querySelectorAll('.grid-block');
    gameBoardCells.forEach(cell => cell.addEventListener('click', markCell));    
    }


function markCell() {
    if (!this.innerText) {
        let mark = currentPlayer.playTurn();
        this.innerText = mark;
        switchPlayer();
    }
    else {
        alert('square is already taken :(')
    }
    
}

gameBoardBuilder();

