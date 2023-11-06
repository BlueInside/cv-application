/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { formatLabel } from './utils';

function DateInput({
  id,
  value,
  label,
  placeholder,
  updateInputValues,
  property,
  // index,
  editErrorsObject,
}) {
  const [error, setError] = useState('');
  const [state, setState] = useState(value);
  const hasError = error !== '';
  useEffect(() => {
    validateDate(state);
  });

  function validateDate(value) {
    if (!value) {
      setError('Please choose correct date');
      editErrorsObject(property, true);
    } else {
      setError('');
      editErrorsObject(property, false);
    }
  }

  DateInput.defaultProps = {
    label: 'Default',
    placeholder: 'Enter ' + formatLabel(id).toLowerCase() + ' here',
    onChange: (e) => {
      setState(e.target.value);
    },
  };

  return (
    <>
      <label htmlFor={id}>
        {label}*{' '}
        <input
          type="date"
          id={id}
          name={property}
          value={state}
          onChange={(e) => {
            console.log(e.target.value);
            const monthYearDate = e.target.value;
            setState(monthYearDate);
            validateDate(e.target.value);
            updateInputValues(property, monthYearDate);
          }}
          placeholder={placeholder}
        />
      </label>
      {hasError && <p className="error">{error} </p>}
    </>
  );
}

export default DateInput;
