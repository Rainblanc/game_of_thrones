import { ButtonHTMLAttributes } from 'react';
import isString from 'lodash/isString';
import styles from './button.module.css';

const Button = ({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={styles.container} {...props}>
      {isString(children) ? <span className={styles.title}>{children}</span> : children}
    </button>
  );
};

export { Button };
