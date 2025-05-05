import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Board } from '../Board/Board';
import { calculateComputerMove } from '../../utils/calculateComputerIndex';
import { checkWinner } from '../../utils/calculateWinner';

const GameComponent: FC = () => {
    const [cells, setCells] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [isBoardInitialized, setIsBoardInitialized] = useState(false);
    const [computerIndex, setComputerIndex] = useState(4);
    const [winner, setWinner] = useState<string | null>(null);

    const makeMove = useCallback((index: number) => {
        if (winner != null) {
            return;
        }
        setCells(prevState => {
            const newState = [...prevState];
            newState[index] = currentPlayer;
            const calculatedWinner = checkWinner(prevState);
            setWinner(calculatedWinner);
            setComputerIndex(calculateComputerMove(newState));
            return newState;
        });
        setCurrentPlayer(prevState => prevState === 'O' ? 'X' : 'O');
    }, [currentPlayer, winner]);

    const handleCellClick = useCallback((index: number) => {
        makeMove(index);
    }, [makeMove]);

    useEffect(() => {
        if (isBoardInitialized && currentPlayer === 'X' && !winner) {
            makeMove(computerIndex);
        }
    }, [isBoardInitialized, computerIndex, currentPlayer, makeMove, winner]);

    return (
        <Board
            cells={cells}
            onCellClick={(index) => handleCellClick(index)}
            setIsBoardInitialized={setIsBoardInitialized}
        />
    );
};

export const Game = memo(GameComponent);
