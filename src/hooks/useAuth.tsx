import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { verifyAuth } from 'store/services/auth';

const useAuth = () => {
  const cipher = useSelector((state) => state.auth.cipher);

  return useMemo(() => {
    if (!cipher) return null;
    try {
      return verifyAuth(cipher);
    } catch (error) {
      return null;
    }
  }, [cipher]);
};

export default useAuth;
