const board = document.getElementById('board');
const status = document.getElementById('status');
const squares = Array.from({ length: 9 }, (_, index) => index);
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const square = document.createElement('button');
        square.setAttribute('data-index', i);
        square.addEventListener('click', () => handleMove(i));
        board.appendChild(square);
    }
}

function handleMove(index) {
    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        renderBoard();
        checkForWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    squares.forEach((index) => {
        const square = board.querySelector(`[data-index="${index}"]`);
        square.textContent = gameBoard[index];
    });
}

function checkForWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            status.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        status.textContent = "It's a draw!";
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    status.textContent = '';
    renderBoard();
}

// Initialize the board when the page loads
createBoard();
