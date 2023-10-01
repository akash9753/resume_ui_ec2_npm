import React from 'react';
import './customCheckbox.css'; // Import your CSS file for styling

const CustomCheckbox = ({ label, checked, onChange, name }) => {
  
    const handleChange = (e) => {
        // Call the parent's onChange function with both e and index
        onChange(e);
      };

  return (
    <label className="custom-checkbox-label">
      <input
        type="checkbox"
        className="custom-checkbox"
        checked={checked}
        onChange={handleChange}
        name={name} 
      />
      <span className="custom-checkbox-checkmark"></span>
      {label}
    </label>
  );
};

export default CustomCheckbox;


