// eslint-disable-next-line react/prop-types
function LabeledInput({ id, value, onChange, label, placeholder }) {
  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
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
