import React from "react";
import "./profileSummary.css";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileSummary = ({
  profileSummary,
  addProSummary,
  removeProSum,
  handleProSumarryChange,
  setNavigateForm,
  proSumErrors,
}) => {
  return (
    <>
      {/* Profile Summary */}
      <div className="profile_summary_container">
        <div className="profile_summary_title">Profile Summary 7</div>
        <div className="profile_summary_scrollable_container">
          {profileSummary?.map((item, i) => {
            return (
              <div key={i} className="profile_summary_fields">
                {/* Profile Summary */}
                <div className="input-field">
                  <span>
                    Profile Summary{" "}{item.id}
                    <span className="mandatory">*</span>
                  </span>
                  <textarea
                    rows={8}
                    type="text"
                    name="profileSummary"
                    placeholder="Enter Profile Summary"
                    value={item.profileSummary || ""}
                    onChange={(e) => {
                      handleProSumarryChange(e, i);
                    }}
                  />
                  {proSumErrors[i].profileSummary && (
                    <div className="error-text">
                      {proSumErrors[i].profileSummary}
                    </div>
                  )}
                </div>
                {item.id === 1 ? null : (
                  <button
                    type="button"
                    className="removeBtn"
                    style={{marginLeft:"0px"}}
                    onClick={() => {
                      removeProSum(item.id);
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
                addProSummary();
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="profile_summary_footer">
          <div>
            <button
              onClick={() => setNavigateForm(8)}
              className="nextBtn"
              type="button"
            >
              <span className="btnText">Next</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <div>
            <button
              onClick={() => setNavigateForm(6)}
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

export default ProfileSummary;
