
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const squares = Array.from(document.getElementsByClassName('square'));
    const message = document.getElementById('message');
    const resetBtn = document.getElementById('reset-btn');
    const xWinsDisplay = document.getElementById('x-wins');
    const oWinsDisplay = document.getElementById('o-wins');

    let currentPlayer = 'X';
    let gameActive = true;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let xWins = 0;
    let oWins = 0;

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
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `It's ${currentPlayer}'s turn`;
        
        if (currentPlayer === 'O' && gameActive) {
            computerMove();
            updateWins();
        }
    };

    const checkGameStatus = () => {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                endGame(`${gameBoard[a]} wins!`);
                updateWins();
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
        message.textContent = `${currentPlayer}'s turn`;
    };

    const computerMove = () => {
        console.log('Computer is making a move');
        if (gameActive) {
            const emptySquares = gameBoard.reduce((acc, value, index) => {
                if (!value) {
                    acc.push(index);
                }
                return acc;
            }, []);
    
            const randomIndex = Math.floor(Math.random() * emptySquares.length);
            const computerChoice = emptySquares[randomIndex];
    
            setTimeout(() => {
                makeMove(computerChoice);
                checkGameStatus();
            }, 1000);
        }
    };
    

    const updateWins = () => {
        if (message.textContent.includes('X wins')) {
            xWins++;
            xWinsDisplay.textContent = `Player X Wins: ${xWins}`;
        } else if (message.textContent.includes('O wins')) {
            oWins++;
            oWinsDisplay.textContent = `Player O Wins: ${oWins}`;
        }
    };

});