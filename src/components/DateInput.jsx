import { useState } from 'react';
import { formatLabel } from './utils';

function DateInput({
  id,
  value,
  label,
  placeholder,
  updateInputValues,
  property,
  index,
}) {
  const [error, setError] = useState('');
  const [state, setState] = useState(value);
  const hasError = error !== '';

  function validateDate(value) {
    if (!value) {
      setError('Please choose correct date');
    } else {
      setError('');
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
            if (!hasError) {
              updateInputValues(property, monthYearDate);
            }
          }}
          placeholder={placeholder}
        />
      </label>
      {hasError && <p className="error">{error} </p>}
    </>
  );
}

export default DateInput;
