import Lottie from 'lottie-react';
import { FC, memo} from 'react';
import crossAnimation from '../../assets/cross.json';
import ovalAnimation from '../../assets/oval.json';

import styles from './Cell.module.css';
import { CellValue } from '../../types/cellValue';

type CellProps = {
    readonly value: CellValue;
    readonly onClick: () => void;
    readonly isWinning: boolean;
    readonly isClearing: boolean;
}

const CellComponent: FC<CellProps> = ({ value, onClick, isWinning, isClearing }) => {
    return (
        <button
            onClick={onClick}
            type='button'
            className={styles.cell}
            disabled={value !== null}
        >
            <div className={`${styles.animation} ${isWinning ? styles.winningCell : ''} ${isClearing ? styles.boardClearing : ''}`}>
                {value !== null &&
                    <Lottie
                        animationData={value === 'X' ? crossAnimation : ovalAnimation}
                        loop={false}
                        autoPlay={true}
                    />
                }
            </div>
        </button>
    );
};

export const Cell = memo(CellComponent);
