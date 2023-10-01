import React from "react";
import "./skill.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Skills = ({
  setNavigateForm,
  skills,
  handleSkillsChange,
  removeSkills,
  addSkills,
  ratings,
  skillsError,
}) => {
  return (
    <>
      {/* Skills */}
      <div className="skill_container ">
        <div className="skill_title">Professional Skills 6</div>
        <div className="skill_scrollable_container">
          {skills?.map((item, i) => {
            return (
              <div key={i} className="skill_fields">
                {/* Skills */}
                <div className="input-field">
                  <span>
                    Skill
                    <span className="mandatory">*</span>
                  </span>
                  <input
                    type="text"
                    name="skill"
                    placeholder="Enter skill"
                    value={item.skill || ""}
                    onChange={(e) => handleSkillsChange(e, i)}
                  />
                  {skillsError[i].skill && (
                    <div className="error-text">{skillsError[i].skill}</div>
                  )}
                </div>
                <div className="input-field">
                  <span>
                    Rate Yourself<span className="mandatory">*</span>
                  </span>
                  <select
                    name="ratting"
                    value={item.ratting || ""}
                    onChange={(e) => handleSkillsChange(e, i)}
                  >
                    <option value="">Select Rating</option>
                    {ratings?.map((r) => (
                      <option key={r.id} value={r.value}>
                        {r.value}
                      </option>
                    ))}
                  </select>
                </div>
                {item.id === 1 ? null : (
                  <div>
                    <button
                      type="button"
                      className="removeBtn"
                      onClick={() => {
                        removeSkills(item.id);
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
                addSkills();
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="skill_footer">
          <div>
            <button
              onClick={() => setNavigateForm(7)}
              className="nextBtn"
              type="button"
            >
              <span className="btnText">Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div>
            <button
              onClick={() => setNavigateForm(5)}
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

export default Skills;
