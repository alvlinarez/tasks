import React, { useContext, useState, useEffect } from 'react';
// Form
import { useFormik } from 'formik';
import * as yup from 'yup';
// Styles
import buttonStyles from '../../styles/Buttons.module.css';
import newProjectStyles from '../../styles/components/project/NewProject.module.css';
import messageStyles from '../../styles/Message.module.css';
import { ProjectContext } from '../../context/projects/ProjectContext';

const NewProject = () => {
  const projectContext = useContext(ProjectContext);
  const { projectError, createProject } = projectContext;
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // If errors show the form
    if (projectError) {
      setShowForm(true);
    } else {
      // Hide the errors and reset the form
      setShowForm(false);
      formik.setValues({ name: '' });
    }
  }, [projectError]);

  const formik = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required')
    }),
    onSubmit: (values) => {
      createProject(values.name);
      setShowForm(false);
    }
  });
  return (
    <>
      <button
        type="button"
        className={`${buttonStyles.btn} ${buttonStyles.btnBlock} ${buttonStyles.btnPrimary}`}
        onClick={() => {
          setShowForm(!showForm);
          formik.setErrors({});
        }}
      >
        {showForm ? 'Cancel New Project' : 'New Project'}
      </button>
      {showForm && (
        <>
          <form
            className={newProjectStyles.newProjectForm}
            onSubmit={formik.handleSubmit}
          >
            <input
              type="text"
              className={newProjectStyles.inputText}
              placeholder="Project Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="submit"
              className={`${buttonStyles.btn} ${buttonStyles.btnPrimary} ${buttonStyles.btnBlock}`}
            >
              Add Project
            </button>
          </form>
          {formik.touched.name && formik.errors.name && (
            <p className={`${messageStyles.message} ${messageStyles.error}`}>
              {formik.errors.name}
            </p>
          )}
          {projectError && (
            <p className={`${messageStyles.message} ${messageStyles.error}`}>
              {projectError}
            </p>
          )}
        </>
      )}
    </>
  );
};

export default NewProject;
