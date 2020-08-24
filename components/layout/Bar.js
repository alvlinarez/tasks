import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import barStyles from '../../styles/components/layout/Bar.module.css';
import buttonStyles from '../../styles/Buttons.module.css';
import { AuthContext } from '../../context/auth/AuthContext';

const Bar = () => {
  const authContext = useContext(AuthContext);
  const { user, signOut } = authContext;

  const router = useRouter();
  return (
    <header className={barStyles.appHeader}>
      {user && (
        <p className={barStyles.userName}>
          Hello <span>{user.name}</span>
        </p>
      )}
      <nav className={barStyles.navPrincipal}>
        <button
          onClick={() => signOut(router)}
          className={`${buttonStyles.btn} ${buttonStyles.btnBlank} ${barStyles.signOut}`}
        >
          Sign Out
        </button>
      </nav>
    </header>
  );
};

export default Bar;
