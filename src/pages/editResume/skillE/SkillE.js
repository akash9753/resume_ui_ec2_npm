import React from 'react'

const SkillE = ({
  skills,
  handleSkillsChange,
  removeSkills,
  addSkills,
  ratings,
  skillsError,
}) => {
  return (
    <>
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
              {skillsError[i]?.skill && (
                <div className="error-text">{skillsError[i]?.skill}</div>
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
    
    </>
  )
}

export default SkillE