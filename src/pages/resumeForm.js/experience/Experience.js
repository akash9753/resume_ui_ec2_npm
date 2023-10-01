import React from "react";
import "./experience.css";
import "../../../style/buttonStyle.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Experience = ({
  setNavigateForm,
  handleExperienceChange,
  removeExperience,
  addExperience,
  expErrors,
  experienceFormData,
}) => {
  return (
    <>
      {/* Experience */}
      <div className="experience_container">
        <div className="experience_title">Experience 4</div>
        <div className="experience_scrollable_container">
          {experienceFormData?.map((item, i) => {
            return (
              <div key={i} className="experience_fields">
                <div className="experience_inputbox_devide">
                  <div className="input-field">
                    <span>
                      Designation
                      <span className="mandatory">*</span>
                    </span>
                    <input
                      type="text"
                      name="designation"
                      placeholder="Designation"
                      value={item.designation || ""}
                      onChange={(e) => {
                        handleExperienceChange(e, i);
                      }}
                    />
                    {expErrors[i].designation && (
                      <div className="error-text">
                        {expErrors[i].designation}
                      </div>
                    )}
                  </div>
                 
                  <div className="input-field">
                    <span>
                      Company Name
                      <span className="mandatory">*</span>
                    </span>
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Compnay Name"
                      value={item.companyName || ""}
                      onChange={(e) => {
                        handleExperienceChange(e, i);
                      }}
                    />
                    {expErrors[i].companyName && (
                      <div className="error-text">
                        {expErrors[i].companyName}
                      </div>
                    )}
                  </div>

               
                  <div className="input-field">
                    <span>
                      Start Year<span className="mandatory">*</span>
                    </span>
                    <input
                      type="date"
                      name="startYear"
                      placeholder="Enter Start Year"
                      value={item.startYear || ""}
                      max={new Date().toISOString().split('T')[0]} 
                      onChange={(e) => {
                        handleExperienceChange(e, i);
                      }}
                    />
                    {expErrors[i].startYear && (
                      <div className="error-text">
                        {expErrors[i].startYear}
                      </div>
                    )}
                  </div>
              
                  <div className="input-field">
                    <span>
                      End Year<span className="mandatory">*</span>
                    </span>
                    <input
                      type="date"
                      name="endYear"
                      placeholder="Enter End Year"
                      value={item.endYear || ""}
                      max={new Date().toISOString().split('T')[0]} 
                      onChange={(e) => {
                        handleExperienceChange(e, i);
                      }}
                    />
                    {expErrors[i].endYear && (
                      <div className="error-text">
                        {expErrors[i].endYear}
                      </div>
                    )}
                  </div>
                </div>
          
                <div className="textarea_inputbox">
                  <div className="input-field">
                    <span>
                      Work Experience
                      <span className="mandatory">*</span>
                    </span>
                    <textarea
                    rows={8}
                      type="text"
                      name="workExperience"
                      placeholder="Enter Work Description"
                      value={item.workExperience || ""}
                      onChange={(e) => {
                        handleExperienceChange(e, i);
                      }}
                    />
                    {expErrors[i].workExperience && (
                      <div className="error-text">
                        {expErrors[i].workExperience}
                      </div>
                    )}
                  </div>
                </div>
                {item.id === 1 ? null : (
                  <div>
                  <button
                    type="button"
                    className="removeBtn"
                    style={{marginLeft:"0px"}}
                    onClick={() => {
                      removeExperience(item.id);
                    }}
                  >
                    Remove
                  </button>
                  </div>
                )}
              </div>
            );
          })}

          <br />
          <div>
            <button
              type="button"
              className="addBtn"
              onClick={() => {
                addExperience();
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="experience_footer">
          <div>
            <button
              onClick={() => setNavigateForm(5)}
              className="nextBtn"
              type="button"
            >
              <span className="btnText">Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div>
            <button
              onClick={() => setNavigateForm(3)}
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

export default Experience;
