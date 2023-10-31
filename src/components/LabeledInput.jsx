import { useState } from 'react';

function LabeledInput({ id, value, label, placeholder }) {
  const [inputValue, setInputValue] = useState(value);
  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
}

LabeledInput.defaultProps = {
  label: 'Default Label',
  placeholder: 'Default Placeholder',
  onChange: () => {},
};
export default LabeledInput;
