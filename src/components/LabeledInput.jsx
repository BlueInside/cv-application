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
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState(value);
  const hasError = error !== '';

  function validateText(value) {
    if (value.trim() === '') {
      setError('This field cannot be empty');
    } else {
      setError('');
    }
  }

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
        placeholder={placeholder}
        onChange={(e) => {
          setInputValue(e.target.value);
          validateText(e.target.value);
          if (!hasError) {
            updateInputValues(property, e.target.value, index);
          }
        }}
      />
      {error && <p>{error}</p>}
    </>
  );
}

export default LabeledInput;
