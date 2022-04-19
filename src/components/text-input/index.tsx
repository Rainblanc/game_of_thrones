import classNames from 'classnames';
import { InputHTMLAttributes, useState } from 'react';
import styles from './text-input.module.css';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const TextInput = ({ label, className, type = 'text', ...props }: TextInputProps) => {
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
    <div className={className}>
      {!!label && (
        <label
          htmlFor={props.id}
          className={classNames(styles.label, {
            [styles.label_focused]: focused,
          })}
        >
          {label}
        </label>
      )}
      <input type={type} {...props} onFocus={handleFocus} onBlur={handleBlur} className={styles.input} />
    </div>
  );
};

export { TextInput, TextInputProps };
