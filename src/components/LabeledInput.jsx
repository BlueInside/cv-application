import { useState } from 'react';
import { formatLabel } from './utils';
function LabeledInput({
  id,
  value,
  label,
  placeholder,
  updateInputValues,
  property,
  index,
}) {
  const [inputValue, setInputValue] = useState(value);

  LabeledInput.defaultProps = {
    label: 'Default Label',
    placeholder: 'Enter ' + formatLabel(id).toLowerCase() + ' here',
    onChange: () => {},
  };

  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => {
          updateInputValues(property, e.target.value, index);
          setInputValue(e.target.value);
        }}
        placeholder={placeholder}
      />
    </>
  );
}

export default LabeledInput;
