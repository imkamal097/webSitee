document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const result = document.getElementById("result");
    const winnerElement = document.getElementById("winner");
    const restartButton = document.getElementById("restart-button");

    let currentPlayer = "X";
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    function checkWin() {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                return board[a];
            }
        }
        if (!board.includes("")) {
            gameActive = false;
            return "Draw";
        }
        return null;
    }

    function handleCellClick(cell, index) {
        if (board[index] === "" && gameActive) {
            cell.textContent = currentPlayer;
            board[index] = currentPlayer;
            const winner = checkWin();
            if (winner) { 
                if (winner === "Draw") {
                    winnerElement.textContent = "It's a Draw!";
                    alert("Better luck next time");
                } else {
                    winnerElement.textContent = `${winner} wins!`;
                }
                result.classList.remove("hidden");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            handleCellClick(cell, index);
        });
    });

    restartButton.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
        result.classList.add("hidden");
        gameActive = true;
    });
});
