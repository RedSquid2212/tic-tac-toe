import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Board } from '../Board/Board';
import { calculateComputerMove } from '../../utils/calculateComputerIndex';
import { calculateWinner } from '../../utils/calculateWinner';
import { CellValue } from '../../types/cellValue';
import { Player } from '../../types/player';

const COMPUTER_DELAY = 500;

const GameComponent: FC = () => {
    const [cells, setCells] = useState<CellValue[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
    const [isBoardInitialized, setIsBoardInitialized] = useState(false);
    const [computerIndex, setComputerIndex] = useState(4);
    const [winner, setWinner] = useState<CellValue>(null);
    const [winningCells, setWinningCells] = useState<readonly number[]>([]);
    const [isClearing, setIsClearing] = useState(false);
    const [isCellsFreezed, setIsCellsFreezed] = useState(true);

    const resetGame = () => {
        setIsClearing(false);
        setCells(Array(9).fill(null));
        setCurrentPlayer('X');
        setComputerIndex(4);
        setWinner(null);
        setWinningCells([]);
    };

    const makeMove = useCallback((index: number) => {
        if (winner != null) {
            return;
        }
        setCells(prevState => {
            const newState = [...prevState];
            newState[index] = currentPlayer;
            setComputerIndex(calculateComputerMove(newState));
            const calculatedWinner = calculateWinner(newState);
            setWinner(calculatedWinner?.winner ?? null);
            setWinningCells(calculatedWinner?.winLines ?? []);
            if (calculatedWinner?.winLines != null || newState.every(cell => cell != null)) {
                setTimeout(() => {
                    setIsClearing(true);
                    setTimeout(() => {
                        resetGame();
                    }, 1000);
                }, 2200);
            }
            return newState;
        });
        setCurrentPlayer(prevState => prevState === 'O' ? 'X' : 'O');
    }, [currentPlayer, winner]);

    const handleCellClick = useCallback((index: number) => {
        if (isCellsFreezed) {
            return;
        }
        makeMove(index);
    }, [makeMove, isCellsFreezed]);

    useEffect(() => {
        if (!isBoardInitialized || currentPlayer === 'O' || winner != null) {
            return;
        }
        if (computerIndex === 4) {
            makeMove(computerIndex);
            setTimeout(() => {
                setIsCellsFreezed(false);
            }, COMPUTER_DELAY);
            return;
        }
        setIsCellsFreezed(true);
        setTimeout(() => {
            makeMove(computerIndex);
            setIsCellsFreezed(false);
        }, COMPUTER_DELAY);
    }, [isBoardInitialized, computerIndex, currentPlayer, makeMove, winner]);

    return (
        <Board
            cells={cells}
            onCellClick={(index) => handleCellClick(index)}
            onBoardInitialized={setIsBoardInitialized}
            winningCells={winningCells}
            isClearing={isClearing}
        />
    );
};

export const Game = memo(GameComponent);
