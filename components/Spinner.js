import React from 'react';
import spinnerStyles from '../styles/components/Spinner.module.css';

const Spinner = () => {
  return (
    <div className={spinnerStyles.spinner}>
      <div className={spinnerStyles.doubleBounce1} />
      <div className={spinnerStyles.doubleBounce2} />
    </div>
  );
};

export default Spinner;
