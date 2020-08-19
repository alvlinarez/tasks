import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import { AuthState } from '../context/auth/AuthState';
import '../styles/globals.css';
import { axiosClient } from '../config/axios';
import { protectedRoutes } from '../utils/protectedRoutes';

export const redirectUser = (ctx, location) => {
  //const router = useRouter();
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

function MyApp({ Component, pageProps }) {
  const { user } = pageProps;
  return (
    <AuthState user={user}>
      <Component {...pageProps} />
    </AuthState>
  );
}

// Verify is user is authenticated, fill pageProp with that user
// and redirect to signin if not is auth
MyApp.getInitialProps = async (appContext) => {
  const { ctx } = appContext;
  let user = {};
  try {
    const { data } = await axiosClient().get('auth');
    user = data.user || {};
  } catch (e) {
    user = {};
  }
  const appProps = await App.getInitialProps(appContext);
  // Adding user to props
  appProps.pageProps.user = user;
  // If no auth user and is a protected route, redirect to signin
  if (Object.keys(user).length === 0) {
    protectedRoutes.includes(ctx.pathname) && redirectUser(ctx, '/signin');
  }
  return { ...appProps };
};

export default MyApp;
