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
      <label className="bold" htmlFor={id}>
        {' '}
        {label}*{' '}
      </label>
      <input
        className="workInput"
        type="date"
        id={id}
        name={property}
        value={state}
        onChange={(e) => {
          const monthYearDate = e.target.value;
          setState(monthYearDate);
          validateDate(e.target.value);
          updateInputValues(property, monthYearDate);
        }}
        placeholder={placeholder}
      />
      <p className={`warning  ${error ? 'active' : 'hidden'}`}>{error}</p>
    </>
  );
}

export default DateInput;
