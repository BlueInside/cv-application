import { useState } from 'react';
import { formatDateToMonthYear } from './utils';
import { formatLabel } from './utils';
formatDateToMonthYear;
function DateInput({
  id,
  value,
  label,
  placeholder,
  updateInputValues,
  property,
  index,
}) {
  const [state, setState] = useState('');
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
          const monthYearDate = formatDateToMonthYear(e.target.value);
          setState(e.target.value);
          updateInputValues(property, monthYearDate);
        }}
        placeholder={placeholder}
      />
    </label>
  );
}

export default DateInput;
