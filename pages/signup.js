import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import formStyles from '../styles/Forms.module.css';
import buttonStyles from '../styles/Buttons.module.css';
import Link from 'next/link';
import HeadSeo from '../components/HeadSeo';

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().email('Invalid email').required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .length(6, 'Password must be at least 6 characters')
    }),
    onSubmit: (values) => {}
  });
  return (
    <>
      <HeadSeo title="Sign Up" />
      <div className={formStyles.userForm}>
        <div className={`${formStyles.containerForm} ${formStyles.shadowDark}`}>
          <h1>Sign Up</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className={formStyles.fieldForm}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <div className={formStyles.inputError}>
                <p>{formik.errors.name}</p>
              </div>
            )}
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
              <button
                type="submit"
                className={`${buttonStyles.btn} ${buttonStyles.btnPrimary} ${buttonStyles.btnBlock}`}
              >
                Sign Up
              </button>
            </div>
          </form>
          <Link href="/signin">
            <a className={formStyles.linkAccount}>Sign In</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
