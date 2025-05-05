import Lottie from 'lottie-react';
import { FC, memo} from 'react';
import crossAnimation from '../../assets/cross.json';
import ovalAnimation from '../../assets/oval.json';

import styles from './Cell.module.css';

type CellProps = {
    readonly value: 'X' | 'O' | null;
    readonly onClick: () => void;
    readonly isWinning: boolean;
}

const CellComponent: FC<CellProps> = ({ value, onClick, isWinning }) => {
    return (
        <button
            onClick={onClick}
            type='button'
            className={styles.cell}
            disabled={value !== null}
        >
            <div className={`${styles.animation} ${isWinning ? styles.winningCell : ''}`}>
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
