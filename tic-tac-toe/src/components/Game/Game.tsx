import { FC, memo, useCallback, useEffect, useState } from 'react';
import { Board } from '../Board/Board';

const GameComponent: FC = () => {
    const [cells, setCells] = useState<('X' | 'O' | null)[]>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X');
    const [isBoardInitialized, setIsBoardInitialized] = useState(false);

    const handleCellClick = useCallback((index: number) => {
        setCells(prevState => {
            const newState = [...prevState];
            newState[index] = currentPlayer;
            return newState;
        });
        setCurrentPlayer(prevPlayer => prevPlayer === 'X' ? 'O' : 'X');
    }, [currentPlayer]);

    useEffect(() => {
        if (isBoardInitialized) {
            setCells(prevState => {
                const newState = [...prevState];
                newState[4] = 'X';
                return newState;
            });
            setCurrentPlayer('O');
        }
        setIsBoardInitialized(false);
    }, [isBoardInitialized]);

    return (
        <Board
            cells={cells}
            onCellClick={(index) => handleCellClick(index)}
            setIsBoardInitialized={setIsBoardInitialized}
        />
    );
};

export const Game = memo(GameComponent);
