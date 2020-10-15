import React, { useEffect, useState } from 'react';
import App from 'next/app';
import Router from 'next/router';
import { AuthState } from '../context/auth/AuthState';
import '../styles/globals.css';
import { axiosClient } from '../config/axios';

import { getToken } from '../utils/getToken';
import { routes } from '../utils/routes';
import Error from '../components/Error';
import { AlertState } from '../context/alerts/AlertState';
import { ProjectState } from '../context/projects/ProjectState';
import TaskState from '../context/tasks/TaskState';
import { tokenAuth } from '../config/tokenAuth';

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = process.browser && localStorage.getItem('token');
    if (user) {
      setUser({ user });
    }
  }, []);
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState user={user}>
            <Component {...pageProps} />
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

// Verify is user is authenticated, fill pageProp with that user
// and redirect to signin if not is auth
// MyApp.getInitialProps = async (appContext) => {
//   const {
//     ctx,
//     ctx: { req }
//   } = appContext;
//   let user = {},
//     error = null;
//   if (req) {
//     const token = localStorage.getItem('token');
//     if (token) {
//       tokenAuth(token);
//       try {
//         const { data } = await axiosClient().get('auth');
//         user = data.user || {};
//       } catch (e) {
//         error = { statusCode: 501 };
//       }
//     }
//     // Verify if url pathname exists
//     const route = routes.find((item) => item.path === ctx.pathname);
//     if (!route) {
//       error = { statusCode: 404 };
//     } else {
//       // If user is not signed in, redirect to signin page or 404
//       if (Object.keys(user).length <= 0) {
//         route.type === 1 && redirectUser(ctx, '/signin');
//       } else {
//         // If user is signed in, redirect to home or 404
//         route.type === 2 && redirectUser(ctx, '/');
//       }
//     }
//   }
//   const appProps = await App.getInitialProps(appContext);
//   // Adding user to props
//   appProps.pageProps.error = error;
//   appProps.pageProps.user = user;
//   // If no auth user and is a protected route, redirect to signin
//   return { ...appProps };
// };

export default MyApp;
