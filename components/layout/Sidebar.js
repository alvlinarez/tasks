import React from 'react';
import NewProject from '../project/NewProject';
import sidebarStyles from '../../styles/components/layout/Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside id={sidebarStyles.tasks}>
      <h1>
        <span>Tasks</span>
      </h1>

      <NewProject />

      <div className={sidebarStyles.projects}>
        <h2>Your projects</h2>
      </div>
    </aside>
  );
};

export default Sidebar;
