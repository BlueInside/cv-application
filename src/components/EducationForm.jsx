/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from './Button';
import { hasEmptyProperty } from './utils';

export default function EducationForm({
  submitForm,
  closeForm,
  state,
  data = {
    schoolName: '',
    title: '',
    date: '',
    description: '',
  },
}) {
  const [inputValues, setInputsValues] = useState(data);
  const [isFormValid, setIsFormValid] = useState(true);

  //Changes form titles depending if user wants to add or edit
  let formTitle = state === 'adding' ? 'Add education' : 'Edit education';

  //Updates input value on keypress
  function handleOnChange(e) {
    const newInputValues = { ...inputValues };
    newInputValues[e.target.id] = e.target.value;
    setInputsValues(newInputValues);
  }

  return (
    <div>
      <form action="">
        <legend>
          {formTitle}
          <fieldset className="educationForm">
            <div className="educationFormInputs">
              <label htmlFor="schoolName">School: </label>
              <input
                type="text"
                id="schoolName"
                placeholder="High school of nothingness"
                value={inputValues.schoolName}
                onChange={handleOnChange}
              />
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                placeholder="Diploma"
                value={inputValues.title}
                onChange={handleOnChange}
              />
              <label htmlFor="date">Date: </label>
              <input
                type="text"
                id="date"
                placeholder="June 2008"
                value={inputValues.date}
                onChange={handleOnChange}
              />
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                id="description"
                placeholder="Best 3 years of my life"
                value={inputValues.description}
                onChange={handleOnChange}
              />

              {/* TODO Made it disappear after few seconds */}
              {!isFormValid && <p>Please fill all the fields!</p>}
            </div>
            <div className="buttonsContainer">
              <Button text={'Cancel'} handleClick={closeForm} />
              <Button
                text={'Save'}
                type={'submit'}
                handleClick={(e) => {
                  e.preventDefault();
                  // Checks if any input is not empty string
                  if (!hasEmptyProperty(inputValues)) {
                    setIsFormValid(true);
                    submitForm(inputValues);
                  }

                  // Display error to user !
                  else {
                    setIsFormValid(false);
                  }
                }}
              />
            </div>
            <Button
              text={'x'}
              handleClick={closeForm}
              className={'button exitBtn'}
            />
          </fieldset>
        </legend>
      </form>
    </div>
  );
}
