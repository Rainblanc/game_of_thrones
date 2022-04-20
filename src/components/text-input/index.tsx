import classNames from 'classnames';
import { InputHTMLAttributes, useState } from 'react';
import styles from './text-input.module.css';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const TextInput = ({ label, className, type = 'text', error, required, ...props }: TextInputProps) => {
  const [focused, setFocused] = useState(props.autoFocus || false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(false);
    props.onBlur?.(e);
  };

  return (
    <div
      className={classNames(className, {
        [styles.container]: !className,
      })}
    >
      {!!label && (
        <label
          htmlFor={props.id}
          className={classNames(styles.label, {
            [styles.label_focused]: focused,
            [styles.label_error]: !!error && !focused,
          })}
        >
          {label}
          {required && '*'}
        </label>
      )}
      <input
        type={type}
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={classNames(styles.input, {
          [styles.input_error]: !!error,
        })}
      />
      {!!error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export { TextInput, TextInputProps };
