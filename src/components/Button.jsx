function Button({
  text,
  color = 'black',
  fontSize = '1rem',
  handleClick = () => {},
}) {
  const buttonStyle = {
    color: color,
    fontSize: fontSize + 'px',
  };
  return (
    <button onClick={handleClick} style={buttonStyle}>
      {text}
    </button>
  );
}

export default Button;
