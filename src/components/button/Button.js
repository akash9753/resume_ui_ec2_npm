import React from 'react';
import './button.css'; // Import your CSS file for styling

const Button = ({
  width,
  height,
  color,
  backgroundColor,
  buttonName,
  type,
  onClick = () => {}, // Default empty function
}) => {
  const buttonStyle = {
    width: width || 'auto',
    height: height || 'auto',
    color: color || 'white',
    backgroundColor: backgroundColor || 'blue',
  };

  return (
    <button
      className="custom-button" // Apply your CSS class for styling
      style={buttonStyle}
      type={type || 'button'}
      onClick={onClick}
    >
      {buttonName}
    </button>
  );
};

export default Button;

