/* eslint-disable react/prop-types */
import '../styles/buttons.css';
function Button({ text, color, fontSize, handleClick, className }) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + 'px',
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      onSubmit={handleClick}
      style={buttonStyle}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  text: 'Button',
  color: 'white',
  fontSize: '1rem',
  handleClick: () => {},
  disabled: false,
  className: 'button',
};
export default Button;
