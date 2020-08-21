import React from 'react';

const Error = (props) => {
  const { error } = props;
  if (error.statusCode === 404) {
    return <h1>404</h1>;
  }
  return <h1>Error</h1>;
};

export default Error;
