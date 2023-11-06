/* eslint-disable react/prop-types */
function Button({ text, color, fontSize, handleClick }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + 'px',
  };

  return (
    <button onClick={handleClick} onSubmit={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'Button',
  color: 'black',
  fontSize: '1rem',
  handleClick: () => {},
  disabled: false,
};
export default Button;
