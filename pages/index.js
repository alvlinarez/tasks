import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth/AuthContext';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import HeadSeo from '../components/HeadSeo';
import TaskForm from '../components/task/TaskForm';
import TaskList from '../components/task/TaskList';
import SignIn from './signin';

export default function Home() {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, authenticated, getUserLoading, error } = authContext;

  if (!authenticated) {
    return <SignIn />;
  }

  if (error) {
    return <div>An unexpected error happened!</div>;
  }

  return (
    <>
      <HeadSeo title="Tasks" />
      <Layout>
        <TaskForm />
        <div className={styles.taskContainer}>
          <TaskList />
        </div>
      </Layout>
    </>
  );
}
