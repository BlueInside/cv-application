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
  property,
  handleRemoveResponsibility,
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
function WorkInput({ work, property, updateInputValues }) {
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
      />
    </div>
  );
}

// Component accepts work object and returns labeled inputs
function DisplayWorkInputs({ work, handleCancelButton, handleAddButton }) {
  const [workObject, setWorkObject] = useState({ ...work });

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

  function addResponsibility(e) {
    e.preventDefault();
    const newWorksObject = { ...inputValues };
    newWorksObject.responsibilities.push('');
    setWorkObject(newWorksObject);
  }

  function handleRemoveResponsibility(e, index) {
    e.preventDefault();
    const newWorkObject = { ...inputValues };
    newWorkObject.responsibilities.splice(index, 1);
    setWorkObject(newWorkObject);
  }

  function inputList(work) {
    const inputFields = [];
    for (const property in inputValues) {
      const currentProperty = work[property];

      // Doesn't make input for id property
      if (property === 'id') continue;
      else if (property === 'startDate' || property === 'endDate') {
        inputFields.push(
          <DateInput
            key={property}
            id={property}
            property={property}
            updateInputValues={updateInputValues}
            label={formatLabel(property)}
          />
        );
      } else if (property !== 'responsibilities') {
        inputFields.push(
          <WorkInput
            key={property}
            work={work}
            property={property}
            updateInputValues={updateInputValues}
          />
        );
      }
      // Create inputs for each responsibilities Array item
      else if (Array.isArray(currentProperty) && currentProperty.length > 0) {
        inputFields.push(
          <DisplayResponsibilities
            property={property}
            key={property}
            responsibilities={currentProperty}
            updateInputValues={updateInputValues}
            handleRemoveResponsibility={handleRemoveResponsibility}
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
          <Button text={'Cancel'} handleClick={handleCancelButton} />
          <Button
            text={'Add'}
            handleClick={(e) => {
              e.preventDefault(), handleAddButton(inputValues);
            }}
          />
        </fieldset>
      </legend>
    </form>
  );
}

export default DisplayWorkInputs;
