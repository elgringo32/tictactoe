const gameBoard = document.getElementById('game-board')
    var i;
    for (i=0; i<9; i++) {
        console.log(i);
        const gridBlock = document.createElement('div');
        gridBlock.classList.add('grid-block');
        gameBoard.appendChild(gridBlock);
    }    



//Player Factory
const Player = (name, position) => {
	const getName = () => name;
	const getPosition = () => position;
	const playTurn  = () => {
        if (position === 1) {
            console.log('x');
        }
        if (position === 2) {
            console.log('o');
        }
    }
    return {getName, getPosition, playTurn}
}

const player1 = Player('brian', 1);
const player2 = Player('cruz', 2);


//Board Module
const gameBord = (() => {

})();