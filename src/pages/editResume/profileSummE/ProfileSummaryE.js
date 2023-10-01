import React from "react";

const ProfileSummaryE = ({
  profileSummary,
  addProSummary,
  removeProSum,
  handleProSumarryChange,
  proSumErrors,
}) => {
    console.log(profileSummary);
  return (
    <>
      {profileSummary?.map((item, i) => {
        return (
          <div key={i} className="profile_summary_fields">
            {/* Profile Summary */}
            <div className="input-field">
              <span>
                Profile Summary {item.id}
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
                style={{ fontSize: '16px',  fontFamily: 'Roboto Mono, monospace' }} 
              />
              {proSumErrors[i]?.profileSummary && (
                <div className="error-text">
                  {proSumErrors[i]?.profileSummary}
                </div>
              )}
            </div>
            {item.id === 1 ? null : (
              <button
                type="button"
                className="removeBtn"
                style={{ marginLeft: "0px" }}
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
    </>
  );
};

export default ProfileSummaryE;
