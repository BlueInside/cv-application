/* eslint-disable react/prop-types */
import { useState } from 'react';
import Button from './Button';
import LabeledInput from './LabeledInput';
import DateInput from './DateInput';
import { formatLabel } from './utils';

// Used as key for DisplayResponsibilities and WorkInput
let count = 0;

// Takes array of responsibilities and creates an input for each array element (responsibility)
function DisplayResponsibilities({
  responsibilities,
  updateInputValues,
  // property,
  handleRemoveResponsibility,
  editErrorsObject,
  validateResponsibilities,
}) {
  return (
    <>
      <p>Responsibilities: </p>
      {responsibilities.map((responsibility, index) => (
        <div key={count++}>
          <LabeledInput
            id={'responsibility' + index}
            index={index}
            property={'responsibilities'}
            value={responsibility}
            label={index + 1}
            updateInputValues={updateInputValues}
            placeholder={'Enter responsibility here.'}
            editErrorsObject={editErrorsObject}
            validateResponsibilities={validateResponsibilities}
          />
          <Button
            text={'Remove Me'}
            handleClick={(e) => handleRemoveResponsibility(e, index)}
          />
        </div>
      ))}
    </>
  );
}

// Creates labeled input
function WorkInput({ work, property, updateInputValues, editErrorsObject }) {
  return (
    <div key={count++}>
      {/* Formats label based on property name space Capitals and UpperCase first letter */}
      <LabeledInput
        id={property}
        property={property}
        value={work[property]}
        label={formatLabel(property)}
        placeholder={'Enter ' + formatLabel(property).toLowerCase() + ' here.'}
        updateInputValues={updateInputValues}
        editErrorsObject={editErrorsObject}
      />
    </div>
  );
}

// Component accepts work object and returns labeled inputs
function DisplayWorkInputs({ work, handleCancelButton, handleSaveButton }) {
  const [workObject, setWorkObject] = useState({ ...work });
  const [isFormInvalid, setIsFormInvalid] = useState(false);
  // Object that will store errors from all inputs that occur on change
  let errors = {};
  // Stores values of displayed inputs
  let inputValues = { ...workObject };
  const inputs = inputList(inputValues);

  function updateInputValues(property, value, index = null) {
    // updates array when input comes from responsibilities field
    if (property === 'responsibilities') {
      const updatedResponsibilities = [...inputValues.responsibilities];
      updatedResponsibilities[index] = value;
      inputValues = {
        ...inputValues,
        responsibilities: updatedResponsibilities,
      };
    } else if (property !== 'responsibilities') {
      inputValues = { ...inputValues, [property]: value };
    }
  }

  // Checks if errors object contain any properties that return true (are invalid)
  function hasAnyErrors() {
    for (const error in errors) {
      if (errors[error]) return true;
    }
    return false;
  }

  // Edits errors object
  function editErrorsObject(property, value) {
    if (property === 'responsibilities') {
      const newErrorsObject = {
        ...errors,
        [property]: validateResponsibilities(),
      };
      errors = newErrorsObject;
    } else {
      const newErrorsObject = { ...errors, [property]: value };
      errors = newErrorsObject;
    }
  }

  // validates inputs during rendering
  function validateInput(property, value) {
    // Properties that have max length restrain
    const hasMaxLengthValidation =
      property === 'companyName' || property === 'position';

    // Properties that have special chars validation
    const hasSpecialCharsValidation =
      property === 'companyName' || property === 'position';

    // Regex pattern for special chars validation
    const validPattern = /^[\p{L}\s.,!?&-]*$/u;

    // Checks if input is not empty
    if (value === '') {
      editErrorsObject(property, true);
    }

    // Checks if input's value is not longer than 50
    else if (hasMaxLengthValidation && value.length > 50) {
      editErrorsObject(property, true);
    }

    // Checks for special chars
    else if (hasSpecialCharsValidation && !validPattern.test(value)) {
      editErrorsObject(property, true);
    }

    // Property is valid edits error object
    else {
      editErrorsObject(property, false);
    }
  }

  // Validates all responsibilities inside inputValues.responsibilities array
  function validateResponsibilities() {
    const respArr = inputValues.responsibilities;
    if (respArr) {
      for (let index = 0; index < respArr.length; index++) {
        const resp = respArr[index];
        if (resp.trim() === '') return true;
      }
      return false;
    } else {
      return false;
    }
  }

  // Adds empty responsibility to the work object
  function addResponsibility(e) {
    e.preventDefault();
    const newWorksObject = { ...inputValues };
    newWorksObject.responsibilities.push('');
    setWorkObject(newWorksObject);
  }

  // Removes responsibility element from responsibilities array inside work object
  function handleRemoveResponsibility(e, index) {
    e.preventDefault();
    const newWorkObject = { ...inputValues };
    newWorkObject.responsibilities.splice(index, 1);
    setWorkObject(newWorkObject);
  }

  // Creates array with inputs based on work object
  function inputList(work) {
    const inputFields = [];
    for (const property in inputValues) {
      const currentProperty = work[property];

      // Doesn't make input for id property
      if (property === 'id') continue;

      if (property === 'responsibilities') {
        // For responsibilities array decide whether its true of false by checking whole array
        editErrorsObject(property, validateResponsibilities());
      } else if (property) validateInput(property, work[property]);
      if (property === 'startDate' || property === 'endDate') {
        inputFields.push(
          <DateInput
            key={property}
            id={property}
            value={currentProperty}
            property={property}
            updateInputValues={updateInputValues}
            label={formatLabel(property)}
            editErrorsObject={editErrorsObject}
          />
        );
        // creates input for property that is not a date or array
      } else if (property !== 'responsibilities') {
        inputFields.push(
          <WorkInput
            key={property}
            work={work}
            property={property}
            updateInputValues={updateInputValues}
            editErrorsObject={editErrorsObject}
          />
        );
      }
      // Create inputs for each responsibilities Array property
      else if (Array.isArray(currentProperty) && currentProperty.length > 0) {
        inputFields.push(
          <DisplayResponsibilities
            property={property}
            key={property}
            responsibilities={currentProperty}
            updateInputValues={updateInputValues}
            handleRemoveResponsibility={handleRemoveResponsibility}
            editErrorsObject={editErrorsObject}
            validateResponsibilities={validateResponsibilities}
          />
        );
      }
    }
    return inputFields;
  }

  // Returns form with inputs to edit to user
  return (
    <form action="#">
      <legend>
        <fieldset>
          {inputs.map((input) => input)}
          <Button
            text={'Add Responsibility'}
            handleClick={(e) => addResponsibility(e)}
          />

          {/* TODO Make p show and hide after few seconds with CSS */}
          {isFormInvalid && <p>Please correct above errors before saving!</p>}
          <Button text={'Cancel'} handleClick={handleCancelButton} />
          <Button
            text={'Save'}
            handleClick={(e) => {
              e.preventDefault();
              if (hasAnyErrors()) setIsFormInvalid(true);
              else {
                setIsFormInvalid(false);
                handleSaveButton(inputValues);
              }
            }}
          />
        </fieldset>
      </legend>
    </form>
  );
}

export default DisplayWorkInputs;
