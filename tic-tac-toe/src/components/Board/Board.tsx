import { FC, memo } from 'react';
import gridAnimation from '../../assets/grid.json';
import { Cell } from '../Cell/Cell';
import Lottie from 'lottie-react';

import styles from './Board.module.css';
import { CellValue } from '../../types/cellValue';

type BoardProps = {
    readonly cells: readonly CellValue[];
    readonly onCellClick: (index: number) => void;
    readonly onBoardInitialized: (isInitialized: boolean) => void;
    readonly winningCells: readonly number[];
    readonly isClearing: boolean;
};

const BoardComponent: FC<BoardProps> = ({
    cells,
    onCellClick,
    onBoardInitialized,
    winningCells,
    isClearing,
}) => {
    const handleBoardAnimationComplete = () => {
        onBoardInitialized(true);
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
                        isClearing={isClearing}
                    />
                ))}
            </div>
        </div>
    );
};

export const Board = memo(BoardComponent);
