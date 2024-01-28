console.log('Script is running!');
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const squares = Array.from(document.getElementsByClassName('square'));
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('reset-btn');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [6, 4, 2] //diagonals
    ];

    squares.forEach((square, index) => {
        square.addEventListener('click', () => {
            if (gameActive && gameBoard[index] === '') {
                makeMove(index);
                checkGameStatus();
            }
        });
    });

    resetBtn.addEventListener('click', () => {
        resetGame();
    });

    const makeMove = (index) => {
        gameBoard[index] = currentPlayer;
        squares[index].textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? '0' : 'X';
        message.textContent = `It's ${currentPlayer}'s turn`;
    };

    const checkGameStatus = () => {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                endGame(`${gameBoard[a]} wins!`);
                return;
            }
        }
        if (!gameBoard.includes('')) {
            endGame("It's a draw!");
        }
    };

    const endGame = (result) => {
        gameActive = false;
        message.textContent = result;
    };

    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', '',];
        currentPlayer = 'X';
        gameActive = true;

        squares.forEach(square => {
            square.textContent = '';
        });
        message.textContent = `It's ${currentPlayer}'s turn`;
    };

});