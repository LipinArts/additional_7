module.exports = function solveSudoku(matrix) {
	//превращаем матрицу в обычный массив
	let layout = matrix
		.join(",")
		.split(",")
		.map(function(item) {
			return Number(item);
		});
	//
	//проверям уникальность числа в заданной ячейке
	function checkNumber(number, row, col) {
		for (let i = 0; i < 9; i++) {
			let index =
				(Math.floor(row / 3) * 3 + Math.floor(i / 3)) * 9 +
				Math.floor(col / 3) * 3 +
				i % 3;
			if (
				number === layout[row * 9 + i] ||
				number === layout[col + i * 9] ||
				number === layout[index]
			) {
				return false;
			}
		}
		return true;
	}
	//
	//рекурсивно проверяем все возможные номера для данной ячейки
	function checkIndexCell(index) {
		if (index >= layout.length) {
			return true;
		} else if (layout[index] != 0) {
			return checkIndexCell(index + 1);
		}

		for (let i = 1; i <= 9; i++) {
			if (checkNumber(i, Math.floor(index / 9), index % 9)) {
				layout[index] = i;
				if (checkIndexCell(index + 1)) {
					return true;
				}
			}
		}

		layout[index] = 0;
		return false;
	}
	//
	//запускаем проверку начиная с нулевой
	checkIndexCell(0);
	//
	//превращаем обычный массив в матрицу
	function backToMatrix(arr) {
		let result = [];
		for (let i = 0; i < arr.length; i += 9) {
			result.push(arr.slice(i, i + 9));
		}
		return result;
	}
	//
	//возвращаем решение
	return backToMatrix(layout);
};
