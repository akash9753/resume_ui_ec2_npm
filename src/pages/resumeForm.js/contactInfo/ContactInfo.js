import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./contactinfo.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ContactInfo = ({
  formData,
  validationErrors,
  setNavigateForm,
  handleInputChange,
}) => {
  return (
    <>
      {/* Contact Info */}
      <div className="contactInfo_container">
        <div className="contactInfo_title">Contant Information 2</div>
        <div className="contactInfo_scrollable_container">
          <div className="contactInfo_fields">
            <div className="contactInfo_inputbox_devide">
              <div
                className={`input-field ${
                  validationErrors.emailId
                    ? "error"
                    : formData.emailId
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.emailId ? "green-text" : ""}>
                  Email<span className="mandatory">*</span>
                </span>
                <input
                  type="email"
                  name="emailId"
                  placeholder="Enter Email"
                  onChange={handleInputChange}
                  value={formData.emailId || ""}
                  className={
                    formData.emailId
                      ? "green-border"
                      : validationErrors.emailId
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.emailId && (
                  <div className="error-text">{validationErrors.emailId}</div>
                )}
              </div>
              {/* Contact Number */}
              <div
                className={`input-field ${
                  validationErrors.contactNo
                    ? "error"
                    : formData.contactNo
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.contactNo ? "green-text" : ""}>
                  Contact Number<span className="mandatory">*</span>
                </span>
                <input
                  type="tel"
                  name="contactNo"
                  placeholder="Enter Contact Number"
                  onChange={handleInputChange}
                  value={formData.contactNo || ""}
                  className={
                    formData.contactNo
                      ? "green-border"
                      : validationErrors.contactNo
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.contactNo && (
                  <div className="error-text">{validationErrors.contactNo}</div>
                )}
              </div>
              {/* Website Link */}
              <div
                className={`input-field ${
                  validationErrors.websiteLink
                    ? "error"
                    : formData.websiteLink
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.websiteLink ? "green-text" : ""}>
                  Website Link
                </span>
                <input
                  type="url"
                  name="websiteLink"
                  placeholder="Enter Website Link"
                  onChange={handleInputChange}
                  value={formData.websiteLink || ""}
                  className={
                    formData.websiteLink
                      ? "green-border"
                      : validationErrors.websiteLink
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.websiteLink && (
                  <div className="error-text">
                    {validationErrors.websiteLink}
                  </div>
                )}
              </div>
              {/* LinkedIn Link */}
              <div
                className={`input-field ${
                  validationErrors.linkedinLink
                    ? "error"
                    : formData.linkedinLink
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.linkedinLink ? "green-text" : ""}>
                  LinkedIn Link
                </span>
                <input
                  type="url"
                  name="linkedinLink"
                  placeholder="Enter LinkedIn Link"
                  onChange={handleInputChange}
                  value={formData.linkedinLink || ""}
                  className={
                    formData.linkedinLink
                      ? "green-border"
                      : validationErrors.linkedinLink
                      ? "error-border"
                      : ""
                  }
                />
                {validationErrors.linkedinLink && (
                  <div className="error-text">
                    {validationErrors.linkedinLink}
                  </div>
                )}
              </div>
            </div>
            {/* Complete Address */}
            <div className="textarea_inputbox">
              <div
                className={`input-field ${
                  validationErrors.currentAddress
                    ? "error"
                    : formData.currentAddress
                    ? "success"
                    : ""
                }`}
              >
                <span className={formData.currentAddress ? "green-text" : ""}>
                  Current Address<span className="mandatory">*</span>
                </span>
                <textarea
                rows={8}
                  name="currentAddress"
                  placeholder="Enter Current Address"
                  onChange={handleInputChange}
                  value={formData.currentAddress || ""}
                  className={
                    formData.currentAddress
                      ? "green-border"
                      : validationErrors.currentAddress
                      ? "error-border"
                      : ""
                  }
                ></textarea>
                {validationErrors.currentAddress && (
                  <div className="error-text">
                    {validationErrors.currentAddress}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="contactInfo_footer">
          <div>
            <button
              onClick={() => setNavigateForm(3)}
              className="nextBtn"
              type="button"
            >
              <span className="btnText">Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div>
            <button
              onClick={() => setNavigateForm(1)}
              className="previousBtn"
              type="button"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span className="btnText">Previous</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactInfo;
