/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from './Button';
import { hasEmptyProperty } from './utils';
import { format } from 'date-fns';

export default function EducationForm({
  submitForm,
  closeForm,
  state,
  data = {
    schoolName: '',
    title: '',
    date: '1997-05',
    description: '',
  },
}) {
  const [inputValues, setInputsValues] = useState(data);
  const [isFormValid, setIsFormValid] = useState(true);
  const [timeoutId, setTimeoutId] = useState('null');
  //Changes form titles depending if user wants to add or edit
  let formTitle = state === 'adding' ? 'Add education' : 'Edit education';

  //Updates input value on keypress
  function handleOnChange(e) {
    const newInputValues = { ...inputValues };
    let value = e.target.value;
    if (e.target.type === 'month')
      value = format(new Date(e.target.value), 'MMMM-yyyy');
    newInputValues[e.target.id] = value;
    setInputsValues(newInputValues);
  }

  return (
    <>
      <div className="backdrop"></div>
      <div className="formContainer">
        <form action="">
          <legend>
            {formTitle}
            <fieldset className="educationForm">
              <div className="educationFormInputs">
                <p className="warning">
                  {!isFormValid && 'Please fill all inputs!'}
                </p>

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
                  type="month"
                  id="date"
                  placeholder="June 2008"
                  value={format(new Date(inputValues.date), 'yyyy-MM')}
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
                      let id = null;
                      if (timeoutId) clearTimeout(timeoutId);
                      setIsFormValid(false);
                      id = setTimeout(() => {
                        setIsFormValid(true);
                      }, 2000);
                      setTimeoutId(id);
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
    </>
  );
}
