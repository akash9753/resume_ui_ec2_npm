import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./basicInfo.css";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const BasicInfo = ({
  formData,
  validationErrors,
  setNavigateForm,
  handleImageChange,
  handleClearImages,
  handleInputChange,
  imagePreviews,
  image
}) => {
  return (
    <>
      {/* Basic Info */}
      <div className="basicInfo_container ">
        <span className="basicInfo_title">Personal Details 1</span>
        <div className="basicInfo_scrollable_container">
          <div className="basicInfo_fields">
            <div className="basicInfo_inputbox_devide">
              <div
                className={`input-field ${
                  validationErrors.firstName
                    ? "error"
                    : formData.firstName
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.firstName ? "green-text" : ""}>
                  First Name<span className="mandatory">*</span>
                </span>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  onChange={handleInputChange}
                  value={formData.firstName || ""}
                  className={
                    formData.firstName
                      ? "green-border"
                      : validationErrors.firstName
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.firstName && (
                  <div className="error-text">{validationErrors.firstName}</div>
                )}
              </div>
              {/* Middle Name */}
              <div
                className={`input-field ${
                  validationErrors.nativePlace
                    ? "error"
                    : formData.nativePlace
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.nativePlace ? "green-text" : ""}>
                  Native Place
                </span>
                <input
                  type="text"
                  name="nativePlace"
                  placeholder="Enter Native Place"
                  onChange={handleInputChange}
                  value={formData.nativePlace || ""}
                  className={
                    formData.nativePlace
                      ? "green-border"
                      : validationErrors.nativePlace
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.nativePlace && (
                  <div className="error-text">
                    {validationErrors.nativePlace}
                  </div>
                )}
              </div>
              {/* Last Name */}
              <div
                className={`input-field ${
                  validationErrors.lastName
                    ? "error"
                    : formData.lastName
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.lastName ? "green-text" : ""}>
                  Last Name<span className="mandatory">*</span>
                </span>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  onChange={handleInputChange}
                  value={formData.lastName || ""}
                  className={
                    formData.lastName
                      ? "green-border"
                      : validationErrors.lastName
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.lastName && (
                  <div className="error-text">{validationErrors.lastName}</div>
                )}
              </div>
              {/* Native Place */}
              <div
                className={`input-field ${
                  validationErrors.middleName
                    ? "error"
                    : formData.middleName
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.middleName ? "green-text" : ""}>
                  Middle Name
                </span>
                <input
                  type="text"
                  name="middleName"
                  placeholder="Enter Middle Name"
                  onChange={handleInputChange}
                  value={formData.middleName || ""}
                  className={
                    formData.middleName
                      ? "green-border"
                      : validationErrors.middleName
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.middleName && (
                  <div className="error-text">
                    {validationErrors.middleName}
                  </div>
                )}
              </div>
              {/* Date of Birth */}
              <div
                className={`input-field ${
                  validationErrors.dob ? "error" : formData.dob ? "success" : ""
                }`}
              >
                <span className={formData.dob ? "green-text" : ""}>
                  Date of Birth
                </span>
                <input
                  type="date"
                  name="dob"
                  onChange={handleInputChange}
                  max={new Date().toISOString().split("T")[0]}
                  value={formData.dob || ""}
                  className={
                    formData.dob
                      ? "green-border"
                      : validationErrors.dob
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.dob && (
                  <div className="error-text">{validationErrors.dob}</div>
                )}
              </div>
            </div>
          </div>
          <div className="basicInfo_fields_upload_image">
            <div className="basicInfo_inputbox_devide_upload_image">
              <div
                className={`input-field ${
                  validationErrors?.images
                    ? "error"
                    : formData?.images?.length > 0
                    ? "success"
                    : ""
                }`}
              >
                <span
                  className={formData?.images?.length > 0 ? "green-text" : ""}
                >
                  Upload Profile Image
                </span>
                <label className="upload-btn file-input-label">
                  Choose Image
                  <input
                    type="file"
                    name="images"
                    onChange={handleImageChange}
                    multiple
                    accept=".jpg, .jpeg, .png"
                  />
                </label>
                {validationErrors?.images && (
                  <div className="error-text">{validationErrors?.images}</div>
                )}
                <div className="image-preview-container">
                  {imagePreviews &&
                   
                      <div  className="image-preview">
                        <img src={imagePreviews} alt={`Preview`} />
                      </div>
                    }
                </div>
                {image && (
                  <button className="clear-btn" onClick={handleClearImages}>
                    Clear Images
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="basicInfo_footer">
          <button
            onClick={() => setNavigateForm(2)}
            className="nextBtn"
            type="button"
          >
            <span className="btnText">Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </>
  );
};

export default BasicInfo;
