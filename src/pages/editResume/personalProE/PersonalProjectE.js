import React from "react";
import CustomCheckbox from "../../../components/customCheckbox/CustomCheckbox";
const personalProjectE = ({
  personalProject,
  personalProjectErrors,
  addPersonalProject,
  removePersonalProject,
  handlePersonalProjectChange,
}) => {
  return (
    <>
      <div className="title_container_personal_project">
        <div className="personal_project_title">Personal Project 5</div>
        <div className="personal_project_add_button">
          <div>
            <button
              type="button"
              className="addBtn"
              style={{ width: "100px" }}
              onClick={() => {
                addPersonalProject();
              }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      {/* <div className="checkbox_container">
        <div className="personal_project_checkbox">
          <CustomCheckbox
            label="I do not have personal projects."
            onChange={handlePersonalProjectChange}
            name="isPersonalProject"
            checked={personalProject?.isPersonalProject}
          />
        </div>
            </div> */}

      {personalProject?.projects?.map((item, i) => {
        return (
          <div key={i} className="personal_project_fields">
            <div className="personal_project_inputbox_devide">
              <div className="input-field">
                <span>
                  Role
                  <span className="mandatory">*</span>
                </span>
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={item.role || ""}
                  onChange={(e) => {
                    handlePersonalProjectChange(e, i);
                  }}
                  disabled={personalProject?.isPersonalProject}
                />
                {personalProjectErrors?.projectsErrors[i]?.role && (
                  <div className="error-text">
                    {personalProjectErrors?.projectsErrors[i]?.role}
                  </div>
                )}
              </div>

              <div className="input-field">
                <span>
                  Project Title
                  <span className="mandatory">*</span>
                </span>
                <input
                  type="text"
                  name="projectTitle"
                  placeholder="Project Title"
                  value={item.projectTitle || ""}
                  onChange={(e) => {
                    handlePersonalProjectChange(e, i);
                  }}
                  disabled={personalProject?.isPersonalProject}
                />
                {personalProjectErrors?.projectsErrors[i]?.projectTitle && (
                  <div className="error-text">
                    {personalProjectErrors?.projectsErrors[i]?.projectTitle}
                  </div>
                )}
              </div>

              <div className="input-field">
                <span>
                  Start Date<span className="mandatory">*</span>
                </span>
                <input
                  type="date"
                  name="startDate"
                  placeholder="Enter Start Year"
                  value={item.startDate || ""}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    handlePersonalProjectChange(e, i);
                  }}
                  disabled={personalProject?.isPersonalProject}
                />
                {personalProjectErrors?.projectsErrors[i]?.startYear && (
                  <div className="error-text">
                    {personalProjectErrors?.projectsErrors[i]?.startYear}
                  </div>
                )}
              </div>

              <div className="input-field">
                <span>
                  End Date<span className="mandatory">*</span>
                </span>
                <input
                  type="date"
                  name="endDate"
                  placeholder="Enter End Year"
                  value={item.endDate || ""}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => {
                    handlePersonalProjectChange(e, i);
                  }}
                  disabled={personalProject?.isPersonalProject}
                />
                {personalProjectErrors?.projectsErrors[i]?.endYear && (
                  <div className="error-text">
                    {personalProjectErrors?.projectsErrors[i]?.endYear}
                  </div>
                )}
              </div>
            </div>

            <div className="textarea_inputbox">
              <div className="input-field">
                <span>
                  Project Detail
                  <span className="mandatory">*</span>
                </span>
                <textarea
                  rows={8}
                  type="text"
                  name="projectDetail"
                  placeholder="Project Detail"
                  value={item.projectDetail || ""}
                  onChange={(e) => {
                    handlePersonalProjectChange(e, i);
                  }}
                  disabled={personalProject.isPersonalProject}
                />
                {personalProjectErrors?.projectsErrors[i]?.projectDetail && (
                  <div className="error-text">
                    {personalProjectErrors?.projectsErrors[i]?.projectDetail}
                  </div>
                )}
              </div>
            </div>
            {item.id === 1 ? null : (
              <div>
                <button
                  type="button"
                  className="removeBtn"
                  style={{ marginLeft: "0px" }}
                  onClick={() => {
                    removePersonalProject(item.id);
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
    </>
  );
};

export default personalProjectE;
