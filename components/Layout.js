import React from 'react';
import layoutStyles from '../styles/components/Layout.module.css';
import buttonStyles from '../styles/Buttons.module.css';
import HeadSeo from './HeadSeo';
import Sidebar from './layout/Sidebar';
import Bar from './layout/Bar';

const Layout = ({ children }) => {
  return (
    <>
      <div className={layoutStyles.containerApp}>
        <Sidebar />
        <div className={layoutStyles.sectionPrincipal}>
          <Bar />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
