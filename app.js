const board = document.getElementById("board");
const resetButton = document.getElementById("reset");
const statusText = document.getElementById("status");
const modeButton = document.getElementById("mode-toggle");
const body = document.body;

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
        
function toggleDarkMode() {
    body.classList.toggle("dark-mode");
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
            
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            statusText.innerHTML = `¡<span class="${gameState[a] === "X" ? "Xcolor" : "Ocolor"}">${gameState[a]}</span> ha ganado!`;
            return true;
        }
    }
    if (!gameState.includes("")) {
        gameActive = false;
        statusText.textContent = "¡Es un empate!";
        return true;
    }
    return false;
}
        
function handleClick(index, cell) {
    if (gameState[index] === "" && gameActive) {
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken", currentPlayer === "X" ? "Xcolor" : "Ocolor");
        if (!checkWinner()) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.innerHTML = `Turno de: <span class="${currentPlayer === "X" ? "Xcolor" : "Ocolor"}">${currentPlayer}</span>`;
        }
        
    }
}
        
function initializeBoard() {
    board.innerHTML = "";
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.innerHTML = "Turno de: <span class='Xcolor'>X</span>";
            
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => handleClick(i, cell));
        board.appendChild(cell);
    }
}
        
resetButton.addEventListener("click", initializeBoard);
modeButton.addEventListener("click", toggleDarkMode);
        
initializeBoard();