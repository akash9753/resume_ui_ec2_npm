import React from "react";

const HobbiesE = ({
  hobbies,
  handleHobbiesChange,
  addHobbies,
  hobbiesError,
  removeHobbies,
}) => {
  return <>
  {hobbies?.map((item, i) => {
    return (
    <div className="hobbies_fields" key={item.id}>
      {/* Hobbies */}
      <div key={i}  className="input-field">
        <span>
          Hobby{" "}{item.id}
          <span className="mandatory">*</span>
        </span>
        <input
          type="text"
          name="hobbies"
          placeholder="Enter Hobbies"
          value={item.hobbies || ""}
            onChange={(e) => {
              handleHobbiesChange(e, i);
            }}
            className={hobbiesError[i]?.hobbies ? "" : "valid-input"}
        />
        {hobbiesError[i]?.hobbies && (
          <div className="error-text">{hobbiesError[i]?.hobbies}</div>
        )}
      </div>
      {item.id === 1 ? null : (
      <div>
        <button
          type="button"
          className="removeBtn"
          onClick={() => {
            removeHobbies(item.id);
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
          addHobbies();
        }}
      >
        Add
      </button>
    </div>
  </>;
};

export default HobbiesE;
