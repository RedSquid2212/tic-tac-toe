import Lottie from 'lottie-react';
import { FC, memo } from 'react';
import crossAnimation from '../../assets/cross.json';
import ovalAnimation from '../../assets/oval.json';

import styles from './Cell.module.css';

type CellProps = {
    readonly value: 'X' | 'O' | null;
    readonly onClick: () => void;
}

const CellComponent: FC<CellProps> = ({ value, onClick }) => {
    return (
        <button onClick={onClick} type='button' className={styles.cell}>
            <div className={styles.animation}>
                <Lottie animationData={value === 'X' ? crossAnimation : ovalAnimation} loop={false} />
            </div>
        </button>
    )
};

export const Cell = memo(CellComponent);
