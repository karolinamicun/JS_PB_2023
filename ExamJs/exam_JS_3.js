//Write a program that will solve simple sudoku (not only the example below!)
/*let inputSudoku = [
	['2', '3', '.', '9', '4', '.', '6', '7', '.'],
	 ['8', '.', '.', '3', '2', '5', '9', '1', '4'],
	 ['9', '.', '.', '7', '6', '.', '3', '2', '.'],
	 ['1', '.', '.', '.', '.', '.', '7', '9', '2'],
	 ['5', '.', '3', '2', '1', '.', '4', '8', '6'],
	 ['4', '.', '.', '6', '8', '.', '5', '3', '1'],
	 ['7', '.', '.', '1', '.', '.', '.', '.', '9'],
	 ['6', '5', '9', '8', '7', '2', '1', '4', '3'],
	 ['3', '.', '.', '.', '9', '.', '.', '.', '7'],
 ];*/
let inputSudoku = [
	['7', '.', '4', '8', '.', '.', '3', '.', '1'],
	['8', '2', '.', '5', '.', '.', '.', '4', '.'],
	['.', '.', '9', '4', '3', '.', '5', '.', '.'],
	['3', '1', '.', '.', '.', '.', '8', '.', '7'],
	['.', '8', '.', '.', '.', '.', '.', '1', '.'],
	['9', '.', '7', '.', '.', '.', '.', '3', '2'],
	['.', '.', '6', '.', '1', '5', '4', '.', '.'],
	['.', '7', '.', '.', '.', '9', '.', '6', '5'],
	['5', '.', '8', '.', '.', '2', '1', '.', '3'],
];
/*let inputSudoku = [
	['4', '6', '.', '.', '.', '.', '.', '8', '5'],
	['3', '.', '.', '.', '6', '8', '.', '.', '.'],
	['.', '1', '2', '4', '.', '.', '.', '.', '.'],
	['.', '.', '4', '.', '.', '1', '9', '.', '.'],
	['.', '.', '.', '.', '.', '.', '7', '.', '.'],
	['7', '.', '9', '.', '.', '.', '.', '3', '.'],
	['.', '7', '.', '.', '3', '.', '.', '.', '2'],
	['6', '.', '.', '7', '9', '4', '.', '.', '.'],
	['.', '.', '.', '.', '1', '.', '6', '7', '3'],
];*/

// y - wiersz, x- kolumna, n - czy liczba pasuje
function checkNumber(y, x, n) {
	// wszystkie elementy z wiersza czy są równe n
	for (let i = 0; i < 9; i++) {
		if (inputSudoku[y][i] == n) return false;
	}
	// wszystkie elementy z kolumny czy są równe n
	for (let i = 0; i < 9; i++) {
		if (inputSudoku[i][x] == n) return false;
	}
	//pomocnicze
	let x0 = Math.floor(x / 3) * 3;
	let y0 = Math.floor(y / 3) * 3;
	//sprawdza w kwadracie 3x3
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (inputSudoku[y0 + i][x0 + j] == n) return false;
		}
	}
	return true;
}

function solveSudoku() {
	//funkcja idzie po wszystkich elementach z sudoku
	for (let y = 0; y < 9; y++) {
		for (let x = 0; x < 9; x++) {
			if (inputSudoku[y][x] == '.') {
				for (let n = 1; n < 10; n++) {
					if (checkNumber(y, x, n) == true) {
						inputSudoku[y][x] = n;
						//rekurencja
						solveSudoku();
						//próbujemy rozwiązać sudoku, ale jak się nie da uzupełnić, to następuje backtracking
						inputSudoku[y][x] = '.';
					}
				}
				//jeśli sprawdziło wszystkie możliwe liczby
				return;
			}
		}
	}
	for (let i = 0; i < inputSudoku.length; i++) {
		console.log(...inputSudoku[i]);
	}
}

solveSudoku();
