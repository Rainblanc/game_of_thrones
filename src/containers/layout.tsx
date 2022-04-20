import styles from './layout.module.css';
import { Navigate, Outlet } from 'react-router-dom';
import { Navbar } from 'components/navbar';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listRootResourcesRequest } from 'store/slices/thunks/resource';
import useAuth from 'hooks/useAuth';

const AppLayout = () => {
  const dispatch = useDispatch();

  const authState = useAuth();

  useEffect(() => {
    dispatch(listRootResourcesRequest());
  }, []);

  if (!authState) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <main className={styles.container}>
        <Outlet />
      </main>
    </>
  );
};

export { AppLayout };
