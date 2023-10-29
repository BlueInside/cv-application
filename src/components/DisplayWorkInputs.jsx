import Button from './Button';
import { formatLabel } from './utils';

// Used as key for DisplayResponsibilities and WorkInput
let count = 0;

// Creates labeled input
function WorkInput({ work, property }) {
  return (
    <div key={count++}>
      {/* Formats label based on property name space Capitals and UpperCase first letter */}
      <label htmlFor={property}>{formatLabel(property)}: </label>
      <input
        type="text"
        id={property}
        // Implement value state?
        value={work[property]}
        // TODO make it controlled
        onChange={(e) => e.target.value}
      />
    </div>
  );
}

// Takes array of responsibilities and creates an input for each array element (responsibility)
function DisplayResponsibilities({ responsibilities }) {
  return (
    <>
      <p>Responsibilities: </p>
      {responsibilities.map((responsibility, index) => (
        <div key={count++}>
          {' '}
          <label htmlFor={'responsibility' + index}>{index + 1}: </label>
          <input
            type="text"
            id={'responsibility' + index}
            // TODO make it controlled !
            value={responsibility}
            onChange={(e) => e.target.value}
          />
        </div>
      ))}
    </>
  );
}

// Component accepts work object and returns labeled inputs
function DisplayWorkInputs({ work, handleCancelButton }) {
  function inputList() {
    const inputFields = [];

    for (const property in work) {
      const currentProperty = work[property];

      // Doesn't make input for id property
      if (property === 'id') continue;

      // Create inputs for each responsibilities Array item
      if (Array.isArray(currentProperty)) {
        inputFields.push(
          <DisplayResponsibilities
            key={property}
            responsibilities={currentProperty}
          />
        );
      } else {
        inputFields.push(
          <WorkInput key={property} work={work} property={property} />
        );
      }
    }
    return inputFields;
  }

  const inputs = inputList();

  // Returns form with inputs to edit to user
  return (
    <form action="#">
      <legend>
        <fieldset>
          {inputs.map((input) => input)}
          <Button text={'Cancel'} handleClick={handleCancelButton} />
          <Button text={'Add'} />
        </fieldset>
      </legend>
    </form>
  );
}

export default DisplayWorkInputs;
