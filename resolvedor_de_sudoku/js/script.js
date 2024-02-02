document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 9;
    const solveButton = document.getElementById("solve-btn");
    const resetButton = document.getElementById("reset-btn")

    // recarrega a página
    solveButton.addEventListener('click', solveSudoku);
    resetButton.addEventListener('click', function () {
        window.location.href = 'index.html';
    })

    const sudokuGrid = document.getElementById("sudoku-grid");
    // cria a tabela do sudoku e suas células com input dinâmicamente
    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "number";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            cell.appendChild(input);
            newRow.appendChild(cell);
        }
        sudokuGrid.appendChild(newRow);
    }
});

async function solveSudoku() {
    const gridSize = 9;
    const sudokuArray = [];

    // guarda os valores dos inputs da tabela do sudoku em um array
    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }

    // identifica as células já marcadas pelo usuário
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            }
        }
    }

    // resolve o sudoku e mostra a solução
    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                // Fill in solved values and apply animation
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    cell.disabled = true;
                    cell.style.cursor = 'default';
                    await sleep(20); // adiciona um delay antes de mostrar a solução
                }
            }
        }
    } else {
        alert("Não existe solução para esse sudoku.");
    }
}

function solveSudokuHelper(board) {
    const gridSize = 9;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;

                        // tenta resolver o sudoku recursivamente
                        if (solveSudokuHelper(board)) {
                            return true; // Sudoku resolvido
                        }

                        board[row][col] = 0; // voltar
                    }
                }
                return false; // Nenhum número válido encontrado
            }
        }
    }

    return true; // todas as células foram preenchidas
}

function isValidMove(board, row, col, num) {
    const gridSize = 9;

    // Check row and column for conflicts
    for (let i = 0; i < gridSize; i++) {
        if (board[row][i] === num || board[i][col] === num) {
            return false; // Conflito encontrado
        }
    }

    // Check the 3*3 subgrid for conflicts
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (board[i][j] === num) {
                return false; // Conflito encontrado
            }
        }
    }

    return true; // Nenhum conflito encontrado
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}