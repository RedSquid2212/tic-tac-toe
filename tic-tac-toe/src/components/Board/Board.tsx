import { Dispatch, FC, memo, SetStateAction } from 'react';
import gridAnimation from '../../assets/grid.json';
import { Cell } from '../Cell/Cell';
import Lottie from 'lottie-react';

import styles from './Board.module.css';

type BoardProps = {
    readonly cells: readonly ('X' | 'O' | null)[];
    readonly onCellClick: (index: number) => void;
    readonly setIsBoardInitialized: Dispatch<SetStateAction<boolean>>;
    readonly winningCells: readonly number[];
};

const BoardComponent: FC<BoardProps> = ({ cells, onCellClick, setIsBoardInitialized, winningCells }) => {
    const handleBoardAnimationComplete = () => {
        setIsBoardInitialized(true);
    };

    return (
        <div className={styles.container}>
            <div className={styles.animation}>
                <Lottie
                    animationData={gridAnimation}
                    loop={false}
                    onComplete={handleBoardAnimationComplete}
                />
            </div>
            <div className={styles.board}>
                {cells.map((cell, index) => (
                    <Cell
                        value={cell}
                        key={index}
                        onClick={() => onCellClick(index)}
                        isWinning={winningCells.includes(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export const Board = memo(BoardComponent);
