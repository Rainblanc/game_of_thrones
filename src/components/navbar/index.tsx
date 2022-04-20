import { LogoutIcon } from 'components/icons/logout';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { authActions } from 'store/slices/auth';
import styles from './navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logoutRequest());
  };

  return (
    <header className={styles.container}>
      <div>
        <Link to="/">
          <img className="w-20" src="/assets/images/logo.png" />
        </Link>
      </div>
      <div aria-hidden onClick={handleLogout} className="my-auto cursor-pointer">
        <LogoutIcon />
      </div>
    </header>
  );
};

export { Navbar };
