/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
function LabeledInput({
  id,
  value,
  label,
  placeholder,
  updateInputValues,
  property,
  index,
  editErrorsObject,
  validateResponsibilities,
}) {
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState(value);
  // Display errors on initial render
  useEffect(() => {
    validateText(inputValue);
  });

  // Properties that require maxLength validation
  const hasMaxLengthValidation =
    property === 'companyName' || property === 'position';

  // Properties that require special chars validation
  const hasSpecialCharsValidation =
    property === 'companyName' || property === 'position';
  const validPattern = /^[\p{L}\s.,!?&-]*$/u;

  // Checks if property is a responsibilities array
  const isResponsibility = property === 'responsibilities';

  // Validates input value
  function validateText(value) {
    if (isResponsibility) validateResponsibilities();

    if (value.trim() === '') {
      setError('This field cannot be empty.');
      editErrorsObject(property, true);
    }
    // Checks if input has right number of characters
    else if (hasMaxLengthValidation && value.length > 50) {
      setError('Max 50 characters length.');
      editErrorsObject(property, true);
    }
    //checks for special characters (Language special chars are excluded from checking)
    else if (hasSpecialCharsValidation && !validPattern.test(value)) {
      setError(`Invalid characters in the field.`);
      editErrorsObject(property, true);
    }
    // Hides error message and add property as false into errors object
    else {
      setError('');
      editErrorsObject(property, false);
    }
  }
  // ADD ERROR TO LABELED INPUT WE HAVE INDEX!
  return (
    <>
      <label htmlFor={id}>{label}:* </label>
      <input
        type="text"
        id={id}
        value={inputValue}
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          validateText(e.target.value);
          updateInputValues(property, e.target.value, index);
        }}
      />
      {error && <p>{error}</p>}
    </>
  );
}

LabeledInput.defaultProps = {
  label: 'Default Label',
  placeholder: 'Default placeholder',
  onChange: () => {},
};

export default LabeledInput;
