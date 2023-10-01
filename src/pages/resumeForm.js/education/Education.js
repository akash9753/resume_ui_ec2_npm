import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./education.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Education = ({
  handleEducationChange,
  courseOptions,
  removeEducation,
  addEducation,
  eduErrors,
  eduFormData,
  setNavigateForm,
}) => {
  return (
    <>
      {/* Education */}
      <div className="education_container">
        <div className="education_title_box">
          <div className="education_title">Education 3</div>
          <div>
            <button
              type="button"
              className="addBtn"
              style={{ width: "100px" }}
              onClick={() => {
                addEducation();
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className="education_scrollable_container">
          {eduFormData?.map((item, i) => {
            return (
              <div key={i} className="education_fields">
                <div className="education_inputbox_devide">
                  <div className="input-field">
                    <span>
                      Course Name<span className="mandatory">*</span>
                    </span>
                    <select
                      name="courseName"
                      value={item.courseName || ""}
                      onChange={(e) => handleEducationChange(e, i)}
                    >
                      <option value="">Select a course</option>
                      {courseOptions?.map((option) => (
                        <option key={option.id} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Contact Number */}
                  <div className="input-field">
                    <span>
                      College Name / University Name / School
                      <span className="mandatory">*</span>
                    </span>
                    <input
                      type="text"
                      name="collegeName"
                      placeholder="College Name / University Name / School"
                      value={item.collegeName || ""}
                      onChange={(e) => {
                        handleEducationChange(e, i);
                      }}
                    />
                    {eduErrors[i].collegeName && (
                      <div className="error-text">
                        {eduErrors[i].collegeName}
                      </div>
                    )}
                  </div>

                  {/* Start Year */}
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
                        handleEducationChange(e, i);
                      }}
                    />
                    {eduErrors[i].startYear && (
                      <div className="error-text">
                        {eduErrors[i].startYear}
                      </div>
                    )}
                  </div>
                  {/* End Year */}
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
                        handleEducationChange(e, i);
                      }}
                    />
                    {eduErrors[i].endYear && (
                      <div className="error-text">
                        {eduErrors[i].endYear}
                      </div>
                    )}
                  </div>
                  {/* CGPA or Percentage */}
                  <div className="input-field">
                    <span>
                      CGPA or Percentage
                      <span className="mandatory">*</span>
                    </span>
                    <input
                      type="number"
                      name="cgpaOrPercentage"
                      placeholder="Enter CGPA or Percentage"
                      value={item.cgpaOrPercentage || ""}
                      onChange={(e) => {
                        handleEducationChange(e, i);
                      }}
                    />
                    {eduErrors[i].cgpaOrPercentage && (
                      <div className="error-text">
                        {eduErrors[i].cgpaOrPercentage}
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
                        removeEducation(item.id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="education_footer">
          <div>
            <button
              onClick={() => setNavigateForm(4)}
              className="nextBtn"
              type="button"
            >
              <span className="btnText">Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div>
            <button
              onClick={() => setNavigateForm(2)}
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

export default Education;
