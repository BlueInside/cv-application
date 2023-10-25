import { useState } from 'react';
import Button from './Button';

function hasEmptyProperty(object) {
  for (const property in object) {
    if (object[property] === '') return true;
  }
  return false;
}
// eslint-disable-next-line react/prop-types
export default function EducationForm({
  submitForm,
  closeForm,
  state,
  editObject = null,
}) {
  const [inputValues, setInputsValues] = useState({
    schoolName: '',
    title: '',
    date: '',
    description: '',
  });
  if (editObject) setInputsValues(editObject);
  let formTitle = state === 'adding' ? 'Add education' : 'Edit education';

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
          <fieldset>
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
            <Button text={'Cancel'} handleClick={closeForm} />
            <Button
              text={'Save'}
              type={'submit'}
              handleClick={(e) => {
                e.preventDefault();
                closeForm(e);
                if (!hasEmptyProperty(inputValues)) submitForm(inputValues);
              }}
            />
          </fieldset>
        </legend>
      </form>
    </div>
  );
}
