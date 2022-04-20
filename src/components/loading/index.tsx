import { LoadingIcon } from 'components/icons/loading';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import styles from './loading.module.css';

const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const loading = useSelector((state) => state.common.loading);

  return (
    <>
      {loading && (
        <div className={styles.container}>
          <LoadingIcon />
        </div>
      )}
      {children}
    </>
  );
};

export { LoadingProvider };
