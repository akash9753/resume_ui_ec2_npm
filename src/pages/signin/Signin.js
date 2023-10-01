import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { signin } from "../../redux/features/authSlice";
import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter, BsLinkedin } from "react-icons/bs";
import Loader from './../../components/loader/Loader';
const Signin = () => {
  const [formData, setFormData] = useState({
    email: "guest1234@gmail.com",
    password: "guest1234",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  
  

  const dispatch = useDispatch();
  const { loading, user , error } = useSelector((state) => ({ ...state.auth }));
  const token = user?.token;
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Update validation errors for the current input
    const errors = { ...validationErrors };
    if (name === "email") {
      if (!value) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Invalid email format";
      } else {
        errors.email = "";
      }
    } else if (name === "password") {
      if (!value) {
        errors.password = "Password is required";
      } else if (value.length < 8) {
        errors.password = "Password should be at least 8 characters long";
      } else if (/\s/.test(value)) {
        errors.password = "Password should not contain spaces";
      } else {
        errors.password = "";
      }
      if (formData.confirmPassword && formData.confirmPassword !== value) {
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

  // useEffect(() => {
  //   error && toast.error(error);
  // }, [error]);

  useEffect(() => {
    if (error !== "") {
      error && toast.error(error);
      console.log(error);
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      dispatch(signin({ formData, navigate, toast }));
    }
  };

  const validateInputs = () => {
    const errors = {};

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

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  if(token){
    navigate("/home")
  }else{
    return (
      <>
      
       {
        loading === true ? <Loader/> :  <div className="signin_container">
        <div className="imgBx">
          <img
            src="https://cdn.pixabay.com/photo/2016/06/02/02/33/triangles-1430105_1280.png"
            alt="imagei"
          />
        </div>
        <div className="contentBx">
          <div className="formBx">
            <h2>Signin</h2>
            <form onSubmit={handleSubmit}>
            <div className={`inputBx ${validationErrors.email ? "error" : ""} ${!validationErrors.email && formData.email ? "correct" : ""}`}>
            <span className={`${!validationErrors.email && formData.email ? "correct" : ""}`}>Email</span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={validationErrors.email ? "error" : !validationErrors.email && formData.email ? "correct" : ""}
            />
            {validationErrors.email && <span className="error-message">{validationErrors.email}</span>}
          </div>
          <div className={`inputBx ${validationErrors.password ? "error" : ""} ${!validationErrors.password && formData.password ? "correct" : ""}`}>
            <span className={`input-label ${!validationErrors.password && formData.password ? "correct" : ""}`}>Password</span>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className={validationErrors.password ? "error" : !validationErrors.password && formData.password ? "correct" : ""}
            />
            {validationErrors.password && <span className="error-message">{validationErrors.password}</span>}
          </div>
          
              <div className="remember">
                <label>
                  <input type="checkbox" name="" /> Remember me
                </label>
              </div>
              <div className="inputBx">
                <input type="submit" name="" value="Sign in" />
              </div>
              <div className="inputBx">
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </div>
            </form>
            <h3>Login with social media</h3>
            <ul className="social_media_icon">
              <li>
                <BsFacebook style={{ fontSize: "3rem" }} />
              </li>
              <li>
                <BsLinkedin style={{ fontSize: "3rem" }} />
              </li>
              <li>
                <BsInstagram style={{ fontSize: "3rem" }} />
              </li>
              <li>
                <BsTwitter style={{ fontSize: "3rem" }} />
              </li>
            </ul>
          </div>
        </div>
      </div>
       }
        
      </>
    );
  }

  
};

export default Signin;
