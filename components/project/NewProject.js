import React from 'react';
import buttonStyles from '../../styles/Buttons.module.css';
import newProjectStyles from '../../styles/components/project/NewProject.module.css';
import messageStyles from '../../styles/Message.module.css';

const NewProject = () => {
  return (
    <>
      <button
        type="button"
        className={`${buttonStyles.btn} ${buttonStyles.btnBlock} ${buttonStyles.btnPrimary}`}
      >
        New Project
      </button>
      <form className={newProjectStyles.newProjectForm}>
        <input
          type="text"
          className={newProjectStyles.inputText}
          placeholder="Project Name"
          name="name"
        />
        <button
          type="submit"
          className={`${buttonStyles.btn} ${buttonStyles.btnPrimary} ${buttonStyles.btnBlock}`}
        >
          Add Project
        </button>
      </form>
      <p className={`${messageStyles.message} ${messageStyles.error}`}>
        Project name required
      </p>
    </>
  );
};

export default NewProject;
