import React from 'react';
import Head from 'next/head';

const HeadSeo = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Project to manage tasks with Next js, Express and MongoDB by @alvlinarez."
      />
      <link rel="preconnect" href="http://localhost:5000" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:400,900|Roboto:300,400,700&display=swap"
        rel="stylesheet"
        media="font"
      />
      <link rel="icon" href="/task-icon.ico" />
    </Head>
  );
};

export default HeadSeo;
