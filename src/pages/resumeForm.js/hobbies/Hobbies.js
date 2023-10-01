import React from "react";
import "./hobbies.css";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Hobbies = ({
  setNavigateForm,
  hobbies,
  handleSubmit,
  handleHobbiesChange,
  addHobbies,
  hobbiesError,
  removeHobbies,
}) => {

  return (
    <>
      {/* Hobbies */}
      <div className="hobbies_container ">
        <div className="hobbies_title">Hobbies 9</div>
        <div className="hobbies_scrollable_container">
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
        </div>
        <div className="hobbies_footer">
          <div>
            <button onClick={handleSubmit} className="submitBtn" type="submit">
              <span className="btnText">Submit</span>
            </button>
          </div>
          <div>
            <button
              onClick={() => setNavigateForm(8)}
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

export default Hobbies;
