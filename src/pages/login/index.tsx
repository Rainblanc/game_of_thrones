import { LoginForm, LoginFormValues } from 'forms/login';
import { FormikHelpers } from 'formik';
import styles from './login.module.css';
import { login } from 'store/services/auth';
import { useDispatch } from 'react-redux';
import { authActions } from 'store/slices/auth';
import { commonActions } from 'store/slices/common';
import { Navigate } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { sleep } from 'utils/sleep';

const Login = () => {
  const dispatch = useDispatch();

  const authState = useAuth();

  if (authState) {
    return <Navigate to="/resources" replace />;
  }

  const handleLogin = async (values: LoginFormValues, helpers: FormikHelpers<LoginFormValues>) => {
    try {
      dispatch(commonActions.setLoading(true));
      await sleep(1500);
      const { cipher } = login(values);
      dispatch(authActions.loginSuccess({ cipher }));
    } catch (error) {
      helpers.setFieldError('validation', 'Invalid email or password');
    } finally {
      dispatch(commonActions.setLoading(false));
    }
  };
  return (
    <div className={styles.container}>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export { Login };
