import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Board } from '../Board/Board';
import { calculateComputerMove } from '../../utils/calculateComputerIndex';
import { checkWinner } from '../../utils/calculateWinner';

const GameComponent: FC = () => {
    const [cells, setCells] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [isBoardInitialized, setIsBoardInitialized] = useState(false);
    const [computerIndex, setComputerIndex] = useState(4);
    const [winner, setWinner] = useState<('X' | 'O' | null)>(null);
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
            const calculatedWinner = checkWinner(newState);
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
            }, 500);
            return;
        }
        setIsCellsFreezed(true);
        setTimeout(() => {
            makeMove(computerIndex);
            setIsCellsFreezed(false);
        }, 500);
    }, [isBoardInitialized, computerIndex, currentPlayer, makeMove, winner]);

    return (
        <Board
            cells={cells}
            onCellClick={(index) => handleCellClick(index)}
            setIsBoardInitialized={setIsBoardInitialized}
            winningCells={winningCells}
            isClearing={isClearing}
        />
    );
};

export const Game = memo(GameComponent);
