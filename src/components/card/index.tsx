import styles from './card.module.css';
import { HTMLAttributes } from 'react';

const Card = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={styles.container} {...props}>
      {children}
    </div>
  );
};

export { Card };
