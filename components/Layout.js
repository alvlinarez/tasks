import React from 'react';
import Head from 'next/head';
import styles from '../styles/components/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Tasks</title>
        <meta
          name="description"
          content="Project to manage tasks with Next js, Express and MongoDB by @alvlinarez."
        />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:400,900|Roboto:300,400,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/task-icon.ico" />
      </Head>

      <header className={styles.appHeader}>
        <p className={styles.userName}>
          Hello <span>Alvaro</span>
        </p>
        <nav className={styles.navPrincipal}>
          <button
            className={`${styles.btn} ${styles.btnBlank} ${styles.signOut}`}
          >
            Sign Out
          </button>
        </nav>
      </header>
      <div>{children}</div>
    </>
  );
};

export default Layout;
