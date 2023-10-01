import React from "react";
import "./language.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Language = ({
  setNavigateForm,
  language,
  handleLanguageChange,
  removeLanguage,
  addLanguage,
  languageError,
  proficiency
}) => {
  return (
    <>
      {/* Skills */}
      <div className="language_container">
        <div className="language_title">Language 8</div>
        <div className="hobbies_scrollable_container">
          {language?.map((item, i) => {
            return (
              <div key={i} className="language_fields">
                {/* Skills */}
                <div className="input-field">
                  <span>
                    Language{" "}{item.id}
                    <span className="mandatory">*</span>
                  </span>
                  <input
                    type="text"
                    name="language"
                    placeholder="Enter Langauge"
                    value={item.language || ""}
                    onChange={(e) => handleLanguageChange(e, i)}
                  />
                  {languageError[i].language && (
                    <div className="error-text">
                      {languageError[i].language}
                    </div>
                  )}
                </div>
               
                <div className="input-field" style={{marginLeft:"8px"}}>
                <span>
                Proficiency<span className="mandatory">*</span>
                </span>
                <select
                  name="proficiency"
                  value={item.proficiency || ""}
                  onChange={(e) => handleLanguageChange(e, i)}
                  className="select-element"
                >
                  <option value="">Select Proficiency</option>
                  {proficiency?.map((r) => (
                    <option key={r.id} value={r.value}>
                      {r.value}
                    </option>
                  ))}
                </select>
              </div>
                {item.id === 1 ? null : (
                  <button
                    type="button"
                    className="removeBtn"
                    onClick={() => {
                      removeLanguage(item.id);
                    }}
                  >
                    Remove
                  </button>
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
                addLanguage();
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className="language_footer">
          <button
            onClick={() => setNavigateForm(9)}
            className="nextBtn"
            type="button"
          >
            <span className="btnText">Next</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button
            onClick={() => setNavigateForm(7)}
            className="previousBtn"
            type="button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span className="btnText">Previous</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Language;
