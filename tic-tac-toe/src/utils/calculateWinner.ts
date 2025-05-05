import { CellValue } from '../types/cellValue';

type GameResult = {
    readonly winner: CellValue;
    readonly winLines: readonly number[];
};

export const calculateWinner = (cells: CellValue[]): GameResult | null => {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return {
                winner: cells[a],
                winLines: [a, b, c],
            };
        }
    }
    return null;
};