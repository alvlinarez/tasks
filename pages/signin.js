import React, { useEffect, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { useFormik } from 'formik';

import Spinner from '../components/Spinner';
import formStyles from '../styles/Forms.module.css';
import buttonStyles from '../styles/Buttons.module.css';
import alertStyles from '../styles/Alerts.module.css';
import HeadSeo from '../components/HeadSeo';
import { AuthContext } from '../context/auth/authContext';
import { AlertContext } from '../context/alerts/alertContext';

const SignIn = () => {
  const authContext = useContext(AuthContext);
  const { authLoading, signIn, error } = authContext;

  const alertContext = useContext(AlertContext);
  const { alert, showAlert } = alertContext;

  const router = useRouter();

  useEffect(() => {
    if (error) {
      showAlert(error);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup.string().required('Password is required')
    }),
    onSubmit: (values) => {
      signIn(values, router);
    }
  });

  return (
    <>
      <HeadSeo title="Sign In" />
      <div className={formStyles.userForm}>
        {alert && (
          <div className={`${alertStyles.alert} ${alertStyles.alertError}`}>
            {alert.message}
          </div>
        )}
        <div className={`${formStyles.containerForm} ${formStyles.shadowDark}`}>
          <h1>Sign In</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={formStyles.fieldForm}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <div className={formStyles.inputError}>
                <p>{formik.errors.email}</p>
              </div>
            )}
            <div className={formStyles.fieldForm}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className={formStyles.inputError}>
                <p>{formik.errors.password}</p>
              </div>
            )}
            <div className={formStyles.fieldForm}>
              {authLoading ? (
                <div className={formStyles.spinnerAuthContainer}>
                  <Spinner />
                </div>
              ) : (
                <button
                  type="submit"
                  className={`${buttonStyles.btn} ${buttonStyles.btnPrimary} ${buttonStyles.btnBlock}`}
                >
                  Sign In
                </button>
              )}
            </div>
          </form>
          <Link href="/signup">
            <a className={formStyles.linkAccount}>Sign Up</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignIn;
