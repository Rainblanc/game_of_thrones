import { LoginForm } from 'forms/login';
import styles from './login.module.css';

const Login = () => {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};

export { Login };
