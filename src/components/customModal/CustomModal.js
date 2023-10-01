import { useState } from "react";
import "./customModal.css"; // Create a CSS file for styling

const CustomModal = ({
  title,
  description,
  width,
  height,
  onCancel,
  onOK,
  cancelColor,
  okColor,
  cancelButtonLabel,
  okButtonLabel,
  headerColor,
  isModalOpen,
  showInputBox = false,
  confirm = false,
  onConfirmDelete,
}) => {
  const modalStyle = {
    width: width || "400px",
    height: height || "200px",
  };
  const headerStyle = {
    backgroundColor: headerColor || "#3498db", // Use the provided header color or default to #3498db
  };

  const [inputValue, setInputValue] = useState(""); // State to store input value
  const [error, setError] = useState("");
  const handleInputChange = (e) => {
    const value = e.target.value.trim();
    setInputValue(e.target.value);
    console.log(inputValue);
    // Validate the input and set the error message
    const isValidInput = /^[a-zA-Z0-9_. -]+$/.test(value);
    if (value.trim() === "") {
      setError("Input cannot be blank.");
    } else if (!isValidInput) {
      setError(
        "Only alphanumeric characters, dots, underscores, and dashes are allowed."
      );
    } else {
      setError(""); // Clear the error message when the input is valid
    }
  };

  const validateError = () => {
    if (inputValue.trim() === "") {
      setError("Resume Name cannot be blank.");
      return true; // Return true to indicate an error
    } else {
      setError(""); // Clear the error message when the input is not blank
      return false; // Return false to indicate no error
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateError()) {
      console.log(validateError);
      onOK(inputValue);
    }
  };

  const onConfirm = () => {
    onConfirmDelete();
  };

  const onOkYes = () =>{
    onOK()
  }

  return (
    <div className={`custom-modal ${isModalOpen ? "show" : ""}`}>
      <div className="modal-content" style={modalStyle}>
        <form onSubmit={handleSubmit}>
          <div className="modal-header" style={headerStyle}>
            <h2>{title}</h2>
            <button onClick={onCancel} className="close-button">
              &times;
            </button>
          </div>
          <div className="modal-body">
            {showInputBox ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Resume Name"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="custom-input"
                />
                {error && <p className="error-message">{error}</p>}
                <span style={{ fontSize: "12px" }}>Ex - My _First_Resume</span>
              </>
            ) : (
              <p>{description}</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="cancel_button"
              onClick={onCancel}
              style={{ backgroundColor: cancelColor }}
            >
              {confirm ? "No" : cancelButtonLabel}
            </button>
            {showInputBox ? (
              <button
                type="submit"
                className="ok_button"
                style={{ backgroundColor: okColor }}
              >
                Submit
              </button>
            ) : (
              okButtonLabel === "Yes" ? (
                <button
                  className="ok_button"
                  onClick={onOkYes}
                  style={{ backgroundColor: okColor }}
                >
                  Yes
                </button>
              ) : (
                <button
                  className="ok_button"
                  onClick={confirm ? onConfirm : onCancel}
                  style={{ backgroundColor: okColor }}
                >
                  {confirm ? "Yes" : okButtonLabel}
                </button>
              )
            )}
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomModal;
