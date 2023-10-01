import React from 'react'

const LanguageE = ({
    language,
  handleLanguageChange,
  removeLanguage,
  addLanguage,
  languageError,
  proficiency
}) => {
  return (
    <>
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
              {languageError[i]?.language && (
                <div className="error-text">
                  {languageError[i]?.language}
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
    </>
  )
}

export default LanguageE