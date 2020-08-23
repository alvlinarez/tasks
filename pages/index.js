import React from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import HeadSeo from '../components/HeadSeo';
import TaskForm from '../components/task/TaskForm';
import TaskList from '../components/task/TaskList';

export default function Home() {
  return (
    <>
      <HeadSeo title="Projects" />
      <Layout>
        <TaskForm />
        <div className={styles.taskContainer}>
          <TaskList />
        </div>
      </Layout>
    </>
  );
}
