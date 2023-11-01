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
  const [state, setState] = useState(value);
  DateInput.defaultProps = {
    label: 'Default',
    placeholder: 'Enter ' + formatLabel(id).toLowerCase() + ' here',
    onChange: (e) => {
      setState(e.target.value);
    },
  };

  return (
    <label htmlFor={id}>
      {label}
      <input
        type="date"
        id={id}
        name={property}
        value={state}
        onChange={(e) => {
          const monthYearDate = e.target.value;
          setState(monthYearDate);
          updateInputValues(property, monthYearDate);
        }}
        placeholder={placeholder}
      />
    </label>
  );
}

export default DateInput;
