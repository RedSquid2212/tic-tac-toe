import { CellValue } from '../types/cellValue';
import { calculateWinner } from './calculateWinner';

export const calculateComputerMove = (board: CellValue[]): number => {
    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = 'O';
            if (calculateWinner(newBoard)?.winner === 'X') {
                return i;
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            const newBoard = [...board];
            newBoard[i] = 'O';
            if (calculateWinner(newBoard)?.winner === 'O') {
                if (Math.random() < 0.6) {
                    return i;
                }
            }
        }
    }

    const corners = [0, 2, 6, 8];
    const edges = [1, 3, 5, 7];

    const availableCorners = corners.filter(i => board[i] === null);

    if (availableCorners.length > 0 && Math.random() < 0.6) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    const availableEdges = edges.filter(i => board[i] === null);

    if (availableEdges.length > 0) {
        return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
            return i;
        }
    }

    return -1;
};