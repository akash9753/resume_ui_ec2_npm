import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signup } from "../../redux/features/authSlice";
import "./signup.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from './../../components/loader/Loader';




const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading,error } = useSelector((state) => ({ ...state.auth }));
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update validation errors for the current input
    const errors = { ...validationErrors };

    if (name === "firstName") {
      if (!value) {
        errors.firstName = "First name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errors.firstName =
          "First name should only contain alphabetic characters";
      } else if (value.length < 2) {
        errors.firstName = "First name should be at least 2 characters long";
      } else if (value.length > 20) {
        errors.firstName = "First name length must not exceed 20 characters";
      } else {
        errors.firstName = "";
      }
    } else if (name === "lastName") {
      if (!value) {
        errors.lastName = "Last name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errors.lastName = "Last name should only contain alphabetic characters";
      } else if (value.length < 2) {
        errors.lastName = "Last name should be at least 2 characters long";
      } else if (value.length > 20) {
        errors.lastName = "Last name length must not exceed 20 characters";
      } else {
        errors.lastName = "";
      }
    } else if (name === "email") {
      if (!value) {
        errors.email = "Email is required";
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
        errors.email = "Invalid email format";
      } else {
        errors.email = "";
      }
    } else if (name === "password") {
      if (!value) {
        errors.password = "Password is required";
      } else if (value.length < 8) {
        errors.password = "Password should be at least 8 characters long";
      } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)) {
        errors.password = "Password should be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character";
      } else {
        errors.password = "";
      }
      if (formData.confirmPassword && formData.confirmPassword !== value) {
        errors.confirmPassword = "Passwords do not match";
      } else {
        errors.confirmPassword = "";
      }
    } else if (name === "confirmPassword") {
      if (!value) {
        errors.confirmPassword = "Confirm password is required";
      } else if (formData.password !== value) {
        errors.confirmPassword = "Passwords do not match";
      } else {
        errors.confirmPassword = "";
      }
    }

    setValidationErrors(errors);

    // Remove validation class if input becomes valid
    if (!errors[name]) {
      event.target.classList.remove("invalid");
    }
  };

  useEffect(() => {
    if (error !== "") {
      error && toast.error(error);
      console.log(error);
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      dispatch(signup({ formData, navigate, toast }));
    }
  };

  const validateInputs = () => {
    const errors = {};

    // First Name Validation
    if (!formData.firstName) {
      errors.firstName = "First name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      errors.firstName = "First name should only contain alphabetic characters";
    } else if (formData.firstName.length < 2) {
      errors.firstName = "First name should be at least 2 characters long";
    }else if (formData.firstName.length >= 20) {
      errors.firstName = "firstName length must not exceed to 20 character";
    }

    // Last Name Validation
    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      errors.lastName = "Last name should only contain alphabetic characters";
    } else if (formData.lastName.length < 2) {
      errors.lastName = "Last name should be at least 2 characters long";
    }else if (formData.lastName.length >= 20) {
      errors.lastName = "firstName length must not exceed to 20 character";
    }

    // Email Validation
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Password Validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 8) {
      errors.password = "Password should be at least 8 characters long";
    } else if (/\s/.test(formData.password)) {
      errors.password = "Password should not contain spaces";
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <>
    {
      loading === true ? <Loader/> : <div className="signup_container">
      <div className="imgBx">
        <img
          src="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png"
          alt="imagei"
        />
      </div>
      <div className="contentBx">
        <div className="formBx">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <div
              className={`inputBx ${
                validationErrors.firstName ? "error" : ""
              } ${
                !validationErrors.firstName && formData.firstName
                  ? "correct"
                  : ""
              }`}
            >
              <span
                className={`${
                  !validationErrors.firstName && formData.firstName
                    ? "correct"
                    : ""
                }`}
              >
                First Name
              </span>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`${validationErrors.firstName ? "error" : ""} ${
                  !validationErrors.firstName && formData.firstName
                    ? "correct"
                    : ""
                }`}
              />
              {validationErrors.firstName && (
                <span className="error-message">
                  {validationErrors.firstName}
                </span>
              )}
            </div>
            <div
              className={`inputBx ${validationErrors.lastName ? "error" : ""} ${
                !validationErrors.lastName && formData.lastName ? "correct" : ""
              }`}
            >
              <span
                className={`${
                  !validationErrors.lastName && formData.lastName
                    ? "correct"
                    : ""
                }`}
              >
                Last Name
              </span>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`${validationErrors.lastName ? "error" : ""} ${
                  !validationErrors.lastName && formData.lastName
                    ? "correct"
                    : ""
                }`}
              />
              {validationErrors.lastName && (
                <span className="error-message">
                  {validationErrors.lastName}
                </span>
              )}
            </div>
            <div
              className={`inputBx ${validationErrors.email ? "error" : ""} ${
                !validationErrors.email && formData.email ? "correct" : ""
              }`}
            >
              <span
                className={`${
                  !validationErrors.email && formData.email ? "correct" : ""
                }`}
              >
                Email
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={
                  validationErrors.email
                    ? "error"
                    : !validationErrors.email && formData.email
                    ? "correct"
                    : ""
                }
              />
              {validationErrors.email && (
                <span className="error-message">{validationErrors.email}</span>
              )}
            </div>
            <div
              className={`inputBx ${validationErrors.password ? "error" : ""} ${
                !validationErrors.password && formData.password ? "correct" : ""
              }`}
            >
              <span
                className={`input-label ${
                  !validationErrors.password && formData.password
                    ? "correct"
                    : ""
                }`}
              >
                Password
              </span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={
                  validationErrors.password
                    ? "error"
                    : !validationErrors.password && formData.password
                    ? "correct"
                    : ""
                }
              />
              {validationErrors.password && (
                <span className="error-message">
                  {validationErrors.password}
                </span>
              )}
            </div>
            <div
              className={`inputBx ${
                validationErrors.confirmPassword ? "error" : ""
              }`}
            >
              <span
                className={`input-label ${
                  !validationErrors.confirmPassword && formData.confirmPassword
                    ? "correct"
                    : ""
                }`}
              >
                Confirm Password
              </span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`${validationErrors.confirmPassword ? "error" : ""}`}
              />
              {validationErrors.confirmPassword && (
                <span className="error-message">
                  {validationErrors.confirmPassword}
                </span>
              )}
            </div>

            <div className="remember">
              <label>
                <input type="checkbox" name="" /> Remember me
              </label>
            </div>
            <div className="inputBx">
              <input type="submit" name="" value="Sign Up" />
            </div>
            <div className="inputBx">
              <p>
                Already have an account? <Link to="/signin">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
    }
    </>
  );
};

export default Signup;
