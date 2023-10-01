import React, { useState, useEffect } from "react";
import "./editResume.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resumeById,
  updateResumeDataById,
} from "../../redux/features/resumeSlice";
import Loader from "../../components/loader/Loader";
import Button from "./../../components/button/Button";
import BasicInfoE from "./basicInfoE/BasicInfoE";
import ContactInfoE from "./contactInfoE/ContactInfoE";
import EducationE from "./educationE/EducationE";
import ExperienceE from "./experienceE/ExperienceE";
import PersonalProjectE from "./personalProE/PersonalProjectE";
import SkillE from "./skillE/SkillE";
import ProfileSummaryE from "./profileSummE/ProfileSummaryE";
import HobbiesE from "./hobbiesE/HobbiesE";
import LanguageE from "./languageE/LanguageE";
import CustomModal from "../../components/customModal/CustomModal";

const EditResume = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const [resumeId, setResumeId] = useState(id);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [headerColor, setHeaderColor] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [showInputBox, setShowInputBox] = useState(false);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    dispatch(resumeById({ resumeId }));
  }, [id]);

  const { error, loading, resumeByResumeId } = useSelector(
    (state) => state.resumeForm
  );

  const [resumeInfo, setResumeInfo] = useState(null);

  /* ------------------------------Basic & Contact Info 1 2------------------------------------ */
  /* ------------------------------Basic & Contact Info 1 2------------------------------------ */
  /* ------------------------------Basic & Contact Info 1 2------------------------------------ */
  /* ------------------------------Basic & Contact Info 1 2------------------------------------ */

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    images: "",
    contactNo: "",
    emailId: "",
    websiteLink: "",
    linkedinLink: "",
    currentAddress: "",
    nativePlace:""
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    emailId: "",
    contactNo: "",
    currentAddress: "",
    website: "",
    linkedin: "",
    images: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);

  const handleInputChange = (event) => {
    // console.log(event.target.name, event.target.value);
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errors = { ...validationErrors };

    if (name === "firstName") {
      if (!value) {
        errors.firstName = "First name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errors.firstName =
          "First name should only contain alphabetic characters";
      } else if (value.length < 2) {
        errors.firstName = "First name should be at least 2 characters long";
      } else if (value.length > 20) {
        errors.firstName = "First name length must not exceed 20 characters";
      } else {
        errors.firstName = "";
      }
    } else if (name === "lastName") {
      if (!value) {
        errors.lastName = "Last name is required";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errors.lastName = "Last name should only contain alphabetic characters";
      } else if (value.length < 2) {
        errors.lastName = "Last name should be at least 2 characters long";
      } else if (value.length > 20) {
        errors.lastName = "Last name length must not exceed 20 characters";
      } else {
        errors.lastName = "";
      }
    } else if (name === "middleName") {
      if (!/^[a-zA-Z]+$/.test(value)) {
        errors.middleName =
          "Middle name should only contain alphabetic characters";
      } else if (value.length < 2) {
        errors.middleName = "Middle name should be at least 2 characters long";
      } else if (value.length > 20) {
        errors.middleName = "Middle name length must not exceed 20 characters";
      } else {
        errors.middleName = "";
      }
    } else if (name === "dob") {
      if (!value) {
        errors.dob = "Date of Birth is required";
      } else {
        errors.dob = "";
      }
    } else if (name === "nativePlace") {
      if (!value) {
        errors.nativePlace = "Native place is required";
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        errors.nativePlace =
          "Native place should only contain alphabetic characters";
      } else if (value.length < 2) {
        errors.nativePlace =
          "Native place should be at least 2 characters long";
      } else if (value.length > 50) {
        errors.nativePlace =
          "Native place length must not exceed 50 characters";
      } else {
        errors.nativePlace = "";
      }
    } else if (name === "currentAddress") {
      if (!value) {
        errors.currentAddress = "Current address is required";
      } else if (value.length < 2) {
        errors.currentAddress =
          "Current address should be at least 2 characters long";
      } else if (value.length > 100) {
        errors.currentAddress =
          "Current address length must not exceed 100 characters";
      } else if (!/^[a-zA-Z0-9\s,'.#-]*$/.test(value)) {
        errors.currentAddress = "Invalid address";
      } else {
        errors.currentAddress = "";
      }
    } else if (name === "emailId") {
      if (!value) {
        errors.emailId = "Email address is required";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
        errors.emailId = "Invalid email address format";
      } else {
        errors.emailId = "";
      }
    } else if (name === "contactNo") {
      if (!value) {
        errors.contactNo = "Contact number is required";
      } else if (!/^\d{10}$/.test(value)) {
        errors.contactNo = "Contact number should be 10 digits";
      } else {
        errors.contactNo = "";
      }
    } else if (name === "websiteLink") {
      if (value && !/^https?:\/\/\S+$/.test(value)) {
        errors.websiteLink = "Invalid URL format";
      } else {
        errors.websiteLink = "";
      }
    } else if (name === "linkedinLink") {
      if (value && !/^https?:\/\/\S+$/.test(value)) {
        errors.linkedinLink = "Invalid URL format";
      } else {
        errors.linkedinLink = "";
      }
    }
    setValidationErrors(errors);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    const isValidExtension = /\.(jpg|jpeg|png)$/i.test(file.name);
    const maxSizeBytes = 2 * 1024 * 1024; // 2MB

    // Create a copy of the existing validationErrors state
    const newValidationErrors = { ...validationErrors };

    if (!isValidExtension) {
      newValidationErrors.images =
        "Invalid file type. Only JPG, JPEG, and PNG files are allowed.";
    } else if (file.size > maxSizeBytes) {
      newValidationErrors.images =
        "Image size is too large. Please select a smaller image (less than 2MB).";
    } else {
      // Clear the images error message if no validation errors
      newValidationErrors.images = "";
    }

    setValidationErrors(newValidationErrors);

    if (
      Object.keys(newValidationErrors).every((key) => !newValidationErrors[key])
    ) {
      // No validation errors, proceed with reading the image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreviews(reader.result);
        setImage(reader.result);
      };
    } else {
      // Clear image previews when there are validation errors
      setImagePreviews("");
    }
  };

  // console.log(validationErrors.images);

  const handleClearImages = () => {
    setFormData((prevData) => ({
      ...prevData,
      images: "",
    }));
    setImagePreviews("");
    validationErrors.images = "";
    setValidationErrors(validationErrors);
  };

  /* ------------------------------Education 3------------------------------------ */
  /* ------------------------------Education 3------------------------------------ */
  /* ------------------------------Education 3------------------------------------ */
  /* ------------------------------Education 3------------------------------------ */

  const [eduFormData, setEduFormData] = useState([
    {
      id: 1,
      courseName: "",
      collegeName: "",
      startYear: "",
      endYear: "",
      cgpaOrPercentage: "",
    },
  ]);

  const [eduErrors, setEduErrors] = useState([
    {
      id: 1,
      courseName: "",
      collegeName: "",
      startYear: "",
      endYear: "",
      cgpaOrPercentage: "",
    },
  ]);

  const addEducation = () => {
    let id = eduFormData.length + 1;
    setEduFormData((eduFormData) => [
      ...eduFormData,
      {
        id: id,
        courseName: "",
        collegeName: "",
        startYear: "",
        endYear: "",
        cgpaOrPercentage: "",
      },
    ]);
    setEduErrors((eduErrors) => [
      ...eduErrors,
      {
        id: id,
        courseName: "",
        collegeName: "",
        startYear: "",
        endYear: "",
        cgpaOrPercentage: "",
      },
    ]);
  };

  const removeEducation = (id) => {
    setEduFormData((prevFormData) =>
      prevFormData.filter((item) => item.id !== id)
    );
    setEduErrors((prevEduErrors) =>
      prevEduErrors.filter((item) => item.id !== id)
    );
  };

  const courseOptions = [
    { id: 1, label: "Post Graduation", value: "Post Graduation" },
    { id: 2, label: "Graduation", value: "Graduation" },
    { id: 3, label: "Diploma", value: "Diploma" },
    { id: 4, label: "12th", value: "12th" },
    { id: 5, label: "10th", value: "11th" },
    // Add more course options
  ];

  const handleEducationChange = (e, i) => {
    // console.log(e.target.name, e.target.value, i);
    let newForm = [...eduFormData];
    let { name, value } = e.target;
    newForm[i][e.target.name] = e.target.value;
    setEduFormData(newForm);
    const errors = [...eduErrors];

    if (name === "collegeName") {
      if (!value) {
        errors[i].collegeName = "College Name is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].collegeName = "College Name cannot consist of only spaces";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          errors[i].collegeName =
            "College Name must contain only alphanumeric.";
        } else if (value.length < 2) {
          errors[i].collegeName =
            "College Name should be at least 2 characters long";
        } else if (value.length > 30) {
          errors[i].collegeName =
            "College Name length must not exceed 30 characters";
        } else {
          errors[i].collegeName = "";
        }
      }
    } else if (name === "cgpaOrPercentage") {
      if (!value) {
        errors[i].cgpaOrPercentage = "CGPA Or Percentage is required";
      } else if (value <= 0) {
        errors[i].cgpaOrPercentage =
          "CGPA Or Percentage cant be negative or zero";
      } else if (value > 10) {
        errors[i].cgpaOrPercentage = "CGPA Or Percentage must be less than 10";
      } else {
        errors[i].cgpaOrPercentage = "";
      }
    } else if (name === "startYear") {
      if (!value) {
        errors[i].startYear = "Work Experience is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].startYear = "Work Experience cannot consist of only spaces";
        } else {
          errors[i].startYear = "";
        }
      }
    } else if (name === "endYear") {
      if (!value) {
        errors[i].endYear = "Work Experience is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].endYear = "Work Experience cannot consist of only spaces";
        } else {
          errors[i].endYear = "";
        }
      }
    }
    setEduErrors(errors);
  };
  console.log(`eduFormData`,eduFormData);
  console.log(`eduErrors`,eduErrors);
  /* -------------------------------Experience 4------------------------------------ */
  /* -------------------------------Experience 4------------------------------------ */
  /* -------------------------------Experience 4------------------------------------ */
  /* -------------------------------Experience 4------------------------------------ */

  const [experienceFormData, setExperienceFormData] = useState([
    {
      id: 1,
      designation: "software dev",
      companyName: "google",
      startYear: "",
      endYear: "",
      workExperience: "gbnfgnghmgmj",
      techstack: "",
    },
  ]);

  const [expErrors, setExpErrors] = useState([
    {
      id: 1,
      designation: "",
      companyName: "",
      startYear: "",
      endYear: "",
      workExperience: "",
      techstack: "",
    },
  ]);

  const addExperience = () => {
    let id = experienceFormData.length + 1;
    setExperienceFormData((experienceFormData) => [
      ...experienceFormData,
      {
        id: id,
        designation: "",
        companyName: "",
        startYear: "",
        endYear: "",
        workDescription: "",
        techStack: "",
      },
    ]);
    setExpErrors((expErrors) => [
      ...expErrors,
      {
        id: id,
        designation: "",
        companyName: "",
        startYear: "",
        endYear: "",
        workExperience: "",
        techstack: "",
      },
    ]);
  };

  const removeExperience = (id) => {
    setExperienceFormData((prevFormData) =>
      prevFormData.filter((item) => item.id !== id)
    );
    setExpErrors((prevEduErrors) =>
      prevEduErrors.filter((item) => item.id !== id)
    );
  };

  const handleExperienceChange = (e, i) => {
    // console.log(e.target.name, e.target.value, i);
    let newForm = [...experienceFormData];
    let { name, value } = e.target;
    newForm[i][e.target.name] = e.target.value;
    setExperienceFormData(newForm);
    let errors = [...expErrors];

    if (name === "designation") {
      if (!value) {
        errors[i].designation = "Designation is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].designation = "Designation cannot consist of only spaces";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          errors[i].designation = "Designation must contain only alphanumeric.";
        } else if (value.length < 2) {
          errors[i].designation =
            "Designation should be at least 2 characters long";
        } else if (value.length > 50) {
          errors[i].designation =
            "Designation length must not exceed 50 characters";
        } else {
          errors[i].designation = "";
        }
      }
    } else if (name === "companyName") {
      if (!value) {
        errors[i].companyName = "Company Name is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].companyName = "Company Name cannot consist of only spaces";
        } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
          errors[i].companyName =
            "Company Name must contain only alphanumeric.";
        } else if (value.length < 2) {
          errors[i].companyName =
            "Company Name should be at least 2 characters long";
        } else if (value.length > 50) {
          errors[i].companyName =
            "Company Name length must not exceed 50 characters";
        } else {
          errors[i].companyName = "";
        }
      }
    } else if (name === "workExperience") {
      if (!value) {
        errors[i].workExperience = "Work Experience is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].workExperience =
            "Work Experience cannot consist of only spaces";
        } else if (!/^[a-zA-Z0-9.\s"',]*$/.test(value)) {
          errors[i].workExperience =
            "Work Experience must contain only alphanumeric characters, dots, and double quotation marks";
        } else if (value.length < 2) {
          errors[i].workExperience =
            "Work Experience should be at least 2 characters long";
        } else if (value.length > 400) {
          errors[i].workExperience =
            "Work Experience length must not exceed 400 characters";
        } else {
          errors[i].workExperience = "";
        }
      }
    } else if (name === "startYear") {
      if (!value) {
        errors[i].startYear = "Work Experience is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].startYear = "Work Experience cannot consist of only spaces";
        } else {
          errors[i].startYear = "";
        }
      }
    } else if (name === "endYear") {
      if (!value) {
        errors[i].endYear = "Work Experience is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].endYear = "Work Experience cannot consist of only spaces";
        } else {
          errors[i].endYear = "";
        }
      }
    }
    setExpErrors(errors);
  };

  /* -------------------------------Personal Project 5------------------------------------ */
  /* -------------------------------Personal Project 5------------------------------------ */
  /* -------------------------------Personal Project 5------------------------------------ */
  /* -------------------------------Personal Project 5------------------------------------ */

  const [personalProject, setPersonalProject] = useState({
    isPersonalProject: true,
    projects: [
      {
        id: 1,
        role: "Full Stack Developer",
        projectTitle: "Resume Maker App",
        startDate: "",
        endDate: "",
        projectDetail: "",
        techStack: [],
        liveUrl: [],
        githubLink: "",
      },
    ],
  });

  const [personalProjectErrors, setPersonalProjectErrors] = useState({
    isPersonalProject: false,
    projectsErrors: [
      {
        id: 1,
        role: "",
        projectTitle: "",
        startDate: "",
        endDate: "",
        projectDetail: "",
        techStack: [],
        liveUrl: [],
        githubLink: "",
      },
    ],
  });
  const addPersonalProject = () => {
    const newProject = {
      id: personalProject?.projects?.length + 1,
      role: "",
      projectTitle: "",
      startDate: "",
      endDate: "",
      projectDetail: "",
      techStack: [],
      liveUrl: [],
      githubLink: "",
    };

    // Initialize a new error object for the project
    const newProjectError = {
      id: newProject.id,
      role: "",
      projectTitle: "",
      startDate: "",
      endDate: "",
      projectDetail: "",
      techStack: [],
      liveUrl: [],
      githubLink: "",
    };

    setPersonalProject((prevPersonalProject) => ({
      ...prevPersonalProject,
      projects: [...prevPersonalProject.projects, newProject],
    }));

    setPersonalProjectErrors((prevPersonalProjectErrors) => ({
      ...prevPersonalProjectErrors,
      projectsErrors: [
        ...prevPersonalProjectErrors.projectsErrors,
        newProjectError,
      ],
    }));
  };

  const removePersonalProject = (id) => {
    setPersonalProject((prevPersonalProject) => {
      const updatedProjects = prevPersonalProject.projects.filter(
        (item) => item.id !== id
      );
      return { ...prevPersonalProject, projects: updatedProjects };
    });

    setPersonalProjectErrors((prevPersonalProjectError) => {
      const updatedErrors = prevPersonalProjectError.projectsErrors.filter(
        (item) => item.id !== id
      );
      return { ...prevPersonalProjectError, projects: updatedErrors };
    });
  };

  const handlePersonalProjectChange = (e, i) => {
    const newProjects = [...personalProject.projects];
    let { name, value, type } = e.target;
    console.log(value, name, i);

    if (type === "checkbox" && name === "isPersonalProject") {
      setPersonalProject((prevPersonalProject) => ({
        ...prevPersonalProject,
        [name]: e.target.checked, // Update isPersonalProject checkbox
      }));
    } else {
      newProjects[i][name] = value;

      setPersonalProject((prevPersonalProject) => ({
        ...prevPersonalProject,
        projects: newProjects,
      }));
      let errors = [...personalProjectErrors.projectsErrors];

      if (name === "role") {
        if (!value) {
          errors[i].role = "Role is required";
        } else {
          value = value.trim();
          if (value === "") {
            errors[i].role = "Role cannot consist of only spaces";
          } else if (!/^[a-zA-Z0-9\s]+$/.test(value)) {
            errors[i].role = "Role must contain only alphanumeric.";
          } else if (value.length < 2) {
            errors[i].role = "Role should be at least 2 characters long";
          } else if (value.length > 20) {
            errors[i].role = "Role length must not exceed 20 characters";
          } else {
            errors[i].role = "";
          }
        }
      } else if (name === "projectTitle") {
        if (!value) {
          errors[i].projectTitle = "Project Title is required";
        } else {
          value = value.trim();
          if (value === "") {
            errors[i].projectTitle =
              "Project Title cannot consist of only spaces";
          } else if (value.length < 2) {
            errors[i].projectTitle =
              "Project Title should be at least 2 characters long";
          } else if (value.length > 50) {
            errors[i].projectTitle =
              "Project Title length must not exceed 50 characters";
          } else {
            errors[i].projectTitle = "";
          }
        }
      } else if (name === "projectDetail") {
        if (!value) {
          errors[i].projectDetail = "Project Detail is required";
        } else {
          // Remove leading and trailing spaces
          value = value.trim();

          if (value === "") {
            errors[i].projectDetail =
              "Project Detail cannot consist of only spaces";
          } else if (!/^[a-zA-Z0-9.\s"',]*$/.test(value)) {
            errors[i].projectDetail =
              "Project Detail must contain only alphanumeric characters, dots, and double quotation marks";
          } else if (value.length < 2) {
            errors[i].projectDetail =
              "Project Detail should be at least 2 characters long";
          } else if (value.length > 400) {
            errors[i].projectDetail =
              "Project Detail length must not exceed 400 characters";
          } else {
            errors[i].projectDetail = "";
          }
        }
      } else if (name === "startYear") {
        if (!value) {
          errors[i].startYear = "Start Year is required";
        } else {
          // Remove leading and trailing spaces
          value = value.trim();

          if (value === "") {
            errors[i].startYear = "Start Year cannot consist of only spaces";
          } else {
            errors[i].startYear = "";
          }
        }
      } else if (name === "endYear") {
        if (!value) {
          errors[i].endYear = "End Year is required";
        } else {
          // Remove leading and trailing spaces
          value = value.trim();

          if (value === "") {
            errors[i].endYear = "End Year cannot consist of only spaces";
          } else {
            errors[i].endYear = "";
          }
        }
      }

      setPersonalProjectErrors((prevErrors) => ({
        ...prevErrors,
        projectsErrors: errors,
      }));
    }
  };
  // console.log(personalProject);
  // console.log(personalProjectErrors);

  /* -------------------------------Profile Summary 6------------------------------------ */
  /* -------------------------------Profile Summary 6------------------------------------ */
  /* -------------------------------Profile Summary 6------------------------------------ */
  /* -------------------------------Profile Summary 6------------------------------------ */

  const [profileSummary, setProfileSummary] = useState([
    {
      id: 1,
      profileSummary: "",
      primary: false,
    },
  ]);

  const [proSumErrors, setProSumErrors] = useState([
    {
      id: 1,
      profileSummary: "",
    },
  ]);

  const addProSummary = () => {
    let id = profileSummary.length + 1;
    setProfileSummary((profileSummary) => [
      ...profileSummary,
      {
        id: id,
        profileSummary: "",
        primary: false,
      },
    ]);
    setProSumErrors((proSumErrors) => [
      ...proSumErrors,
      {
        id: id,
        profileSummary: "",
      },
    ]);
  };

  const removeProSum = (id) => {
    setProfileSummary((prevFormData) =>
      prevFormData.filter((item) => item.id !== id)
    );
    setProSumErrors((prevEduErrors) =>
      prevEduErrors.filter((item) => item.id !== id)
    );
  };

  const handleProSumarryChange = (e, i) => {
    // console.log(e.target.name, e.target.value, i);
    let newForm = [...profileSummary];
    let { name, value } = e.target;
    newForm[i][e.target.name] = e.target.value;
    setProfileSummary(newForm);
    let errors = [...proSumErrors];

    if (name === "profileSummary") {
      if (!value) {
        errors[i].profileSummary = "Profile Summary is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].profileSummary =
            "Profile Summary cannot consist of only spaces";
        } else if (!/^[a-zA-Z0-9.\s"',]*$/.test(value)) {
          errors[i].profileSummary =
            "Profile Summary must contain only alphanumeric characters, dots, and double quotation marks";
        } else if (value.length < 2) {
          errors[i].profileSummary =
            "Profile Summary should be at least 2 characters long";
        } else if (value.length > 500) {
          errors[i].profileSummary =
            "Profile Summary length must not exceed 500 characters";
        } else {
          errors[i].profileSummary = "";
        }
      }
    }
    setProSumErrors(errors);
  };

  /* -------------------------------Skills 7------------------------------------ */
  /* -------------------------------Skills 7------------------------------------ */
  /* -------------------------------Skills 7------------------------------------ */
  /* -------------------------------Skills 7------------------------------------ */

  const [skills, setSkills] = useState([
    {
      id: 1,
      skill: "react",
      ratting: "",
      primary: false,
    },
  ]);
  const [skillsError, setSkillsError] = useState([
    {
      id: 1,
      skill: "",
    },
  ]);
  const addSkills = () => {
    let id = skills.length + 1;
    setSkills((skills) => [
      ...skills,
      {
        id: id,
        skill: "",
        ratting: "",
        primary: false,
      },
    ]);
    setSkillsError((skillsError) => [
      ...skillsError,
      {
        id: id,
        skill: "",
        ratting: "",
        primary: false,
      },
    ]);
  };
  const removeSkills = (id) => {
    setSkills((skills) => skills.filter((item) => item.id !== id));
    setSkillsError((skillsError) =>
      skillsError.filter((item) => item.id !== id)
    );
  };

  const ratings = [
    { id: 1, label: 1, value: 1 },
    { id: 2, label: 2, value: 2 },
    { id: 3, label: 3, value: 3 },
    { id: 4, label: 4, value: 4 },
    { id: 5, label: 5, value: 5 },
    { id: 6, label: 6, value: 6 },
    { id: 7, label: 7, value: 7 },
    { id: 8, label: 8, value: 8 },
    { id: 9, label: 9, value: 9 },
    { id: 10, label: 10, value: 10 },
  ];

  console.log(`skill`, skills);
  console.log(`skillError`, skillsError);

  const handleSkillsChange = (e, i) => {
    // console.log(e.target.name, e.target.value, i);
    let newForm = [...skills];
    let { name, value } = e.target;
    newForm[i][e.target.name] = e.target.value;
    setSkills(newForm);
    let errors = [...skillsError];

    if (name === "skill") {
      if (!value) {
        errors[i].skill = "skill is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].skill = "skill cannot consist of only spaces";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          errors[i].skill = "skill must contain only alphabet characters";
        } else if (value.length < 2) {
          errors[i].skill = "skill should be at least 2 characters long";
        } else if (value.length > 20) {
          errors[i].skill = "skill length must not exceed 20 characters";
        } else {
          errors[i].skill = "";
        }
      }
    }
    setSkillsError(errors);
  };

  /* -------------------------------Languages 8------------------------------------ */
  /* -------------------------------Languages 8------------------------------------ */
  /* -------------------------------Languages 8------------------------------------ */
  /* -------------------------------Languages 8------------------------------------ */

  const [language, setLanguage] = useState([
    {
      id: 1,
      language: "Hindi",
      proficiency: "",
      primary: false,
    },
  ]);

  const [languageError, setLanguageError] = useState([
    {
      id: 1,
      language: "",
      proficiency: "",
      primary: false,
    },
  ]);

  const addLanguage = () => {
    let id = language.length + 1;
    setLanguage((language) => [
      ...language,
      {
        id: id,
        language: "",
        proficiency: "",
        primary: false,
      },
    ]);
    setLanguageError((languageError) => [
      ...languageError,
      {
        id: id,
        language: "",
        proficiency: "",
        primary: false,
      },
    ]);
  };

  const removeLanguage = (id) => {
    setLanguage((l) => l.filter((item) => item.id !== id));
    setLanguageError((l) => l.filter((item) => item.id !== id));
  };

  const proficiency = [
    { id: 1, label: 1, value: 1 },
    { id: 2, label: 2, value: 2 },
    { id: 3, label: 3, value: 3 },
    { id: 4, label: 4, value: 4 },
    { id: 5, label: 5, value: 5 },
    { id: 6, label: 6, value: 6 },
    { id: 7, label: 7, value: 7 },
    { id: 8, label: 8, value: 8 },
    { id: 9, label: 9, value: 9 },
    { id: 10, label: 10, value: 10 },
  ];

  const handleLanguageChange = (e, i) => {
    // console.log(e.target.name, e.target.value, i);
    let newForm = [...language];
    let { name, value } = e.target;
    newForm[i][e.target.name] = e.target.value;
    setLanguage(newForm);
    let errors = [...languageError];

    if (name === "language") {
      if (!value) {
        errors[i].language = "Language is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].language = "Language cannot consist of only spaces";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          errors[i].language =
            "Language must contain only alphabet characters.";
        } else if (value.length < 2) {
          errors[i].language = "Language should be at least 2 characters long";
        } else if (value.length > 20) {
          errors[i].language = "Language length must not exceed 20 characters";
        } else {
          errors[i].language = "";
        }
      }
    }
    // console.log(errors);
    setLanguageError(errors);
  };

  /* -------------------------------Hobbies 9------------------------------------ */
  /* -------------------------------Hobbies 9------------------------------------ */
  /* -------------------------------Hobbies 9------------------------------------ */
  /* -------------------------------Hobbies 9------------------------------------ */
  const [hobbies, setHobbeis] = useState([
    {
      id: 1,
      hobbies: "cricket",
      primary: false,
    },
  ]);

  const [hobbiesError, setHobbiesError] = useState([
    {
      id: 1,
      hobbies: "",
    },
  ]);
  const addHobbies = () => {
    let id = hobbies.length + 1;
    setHobbeis((hobbies) => [
      ...hobbies,
      {
        id: id,
        hobbies: "",
        primary: false,
      },
    ]);
    setHobbiesError((hobbiesError) => [
      ...hobbiesError,
      {
        id: id,
        hobbies: "",
      },
    ]);
  };
  const removeHobbies = (id) => {
    console.log(id);
    setHobbeis((h) => h.filter((item) => item.id !== id));
    setHobbiesError((h) => h.filter((item) => item.id !== id));
    console.log(hobbiesError);
  };
  const handleHobbiesChange = (e, i) => {
    // console.log(e.target.name, e.target.value, i);
    let newForm = [...hobbies];
    let { name, value } = e.target;
    newForm[i][e.target.name] = e.target.value;
    setHobbeis(newForm);
    let errors = [...hobbiesError];

    if (name === "hobbies") {
      if (!value) {
        errors[i].hobbies = "Hobbies is required";
      } else {
        // Remove leading and trailing spaces
        value = value.trim();

        if (value === "") {
          errors[i].hobbies = "Hobbies cannot consist of only spaces";
        } else if (!/^[A-Za-z\s]+$/.test(value)) {
          errors[i].hobbies = "Hobbies must contain only alphabet characters.";
        } else if (value.length < 2) {
          errors[i].hobbies = "Hobbies should be at least 2 characters long";
        } else if (value.length > 20) {
          errors[i].hobbies = "Hobbies length must not exceed 20 characters";
        } else {
          errors[i].hobbies = "";
        }
      }
    }
    setHobbiesError(errors);
  };

  /* ---------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------- */
  /* ---------------------------------------------------------------------------- */
  console.log(resumeByResumeId.resumeById);

  useEffect(() => {
    setIsLoading(true);
    setResumeInfo(resumeByResumeId.resumeById);

    // Introduce a delay using setTimeout

    setImagePreviews(resumeInfo?.images);

    const formattedDob = resumeByResumeId.resumeById?.dob
      ? new Date(resumeByResumeId.resumeById.dob).toISOString().split("T")[0]
      : "";
    setFormData({
      ...formData,
      firstName: resumeInfo?.firstName || "",
      lastName: resumeInfo?.lastName || "",
      middleName: resumeInfo?.middleName || "",
      dob: formattedDob || "",
      images: "",
      contactNo: resumeInfo?.contactNo || "",
      emailId: resumeInfo?.emailId || "",
      websiteLink: resumeInfo?.websiteLink || "",
      linkedinLink: resumeInfo?.linkedinLink || "",
      currentAddress: resumeInfo?.currentAddress || "",
      nativePlace:resumeInfo?.nativePlace || "",
      // Update other fields as needed
    });
    setEduFormData(
      resumeInfo?.education.map((edu) => ({
        ...edu,
        startYear: new Date(edu.startYear).toISOString().split("T")[0],
        endYear: new Date(edu.endYear).toISOString().split("T")[0],
      }))
    );
    const initialEduErrors = (resumeInfo?.education || []).map((edu) => ({
      id: edu.id,
      courseName: "",
      collegeName: "",
      startYear: "",
      endYear: "",
      cgpaOrPercentage: "",
    }));
    
    // Set the initial state for eduErrors
    setEduErrors(initialEduErrors);
    //----------------------------------------------------
    setExperienceFormData(
      resumeInfo?.experience.map((exp) => ({
        ...exp,
        startYear: new Date(exp.startYear).toISOString().split("T")[0],
        endYear: new Date(exp.endYear).toISOString().split("T")[0],
      }))
    );
    const initialExpErrors = (resumeInfo?.experience || []).map((exp) => ({
      id: exp.id,
      designation: "",
      companyName: "",
      startYear: "",
      endYear: "",
      workExperience: "",
      techstack: "",
    }));
    
    
    
    setExpErrors(initialExpErrors);
    //----------------------------------------------------
    setPersonalProject({
      isPersonalProject:
        resumeInfo?.personalProject?.isPersonalProject || false,
      projects: (resumeInfo?.personalProject?.projects || []).map((project) => {
        // console.log(project);
        return {
          ...project,
          startDate: new Date(project?.startDate).toISOString().split("T")[0], // Format the start date
          endDate: new Date(project?.endDate).toISOString().split("T")[0], // Format the end date
        };
      }),
    });
    const initialPersonalProjectErrors = (resumeInfo?.personalProject?.projects || []).map((project) => ({
      id: project.id,
      role: "",
      projectTitle: "",
      startDate: "",
      endDate: "",
      projectDetail: "",
      techStack: [],
      liveUrl: [],
      githubLink: "",
    }));
    
    // Set the initial state for personalProjectErrors
    const initialPersonalProjectState = {
      isPersonalProject: resumeInfo?.personalProject?.isPersonalProject || false,
      projectsErrors: initialPersonalProjectErrors,
    };
    
    setPersonalProjectErrors(initialPersonalProjectState);
    //---------------------------------------------------------
    setSkills(
      resumeInfo?.skills.map((sk) => ({
        ...sk,
      }))
    );
    const initialSkillsError = (resumeInfo?.skills || [])?.map((skill) => ({
      id: skill.id,
      skill: "", // Initialize the skill error as an empty string
    }));
    setSkillsError(initialSkillsError);
    //--------------------------------------------------------
    setProfileSummary(
      resumeInfo?.profileSummary.map((ps) => ({
        ...ps,
      }))
    );
    // Initialize profileSummary based on skills
    const initialProfileSummary = (resumeInfo?.profileSummary  || []).map((ps) => ({
      id: ps.id,
      profileSummary: "", // Initialize the profileSummary as an empty string
    }));
    setProSumErrors(initialProfileSummary);
    //-------------------------------------------------------------
    setLanguage(
      resumeInfo?.language?.map((ps) => ({
        ...ps,
      }))
    );

    const initialLanguageError = (resumeInfo?.language || []).map(
      (language) => ({
        id: language.id,
        language: "",
        proficiency: "",
        primary: false,
      })
    );
    setLanguageError(initialLanguageError);
    //----------------------------------------------------------------
    setHobbeis(
      resumeInfo?.hobbies?.map((ps) => ({
        ...ps,
      }))
    );
    const initialHobbiesError = (resumeInfo?.hobbies || []).map((hobby) => ({
      id: hobby.id,
      hobbies: "", // Initialize the hobbies error as an empty string
    }));
    setHobbiesError(initialHobbiesError);

    setIsLoading(false);
  }, [resumeByResumeId.resumeById, id, resumeInfo]);

  // console.log(imagePreviews);
  // console.log(personalProject.projects.length);
  // console.log(personalProject.projects);

  const openModal = (message, success) => {
    if (success === true) {
      setIsModalOpen(true);
      setPopupTitle("Success");
      setPopupMessage(`${message}`);
      setHeaderColor("green");
      setShowInputBox(false);
      setConfirm(false);
    } else {
      setIsModalOpen(true);
      setPopupTitle("Error");
      setPopupMessage(message);
      setHeaderColor("red");
      setConfirm(false);
    }
  };

  const handleModalOK = () => {
    setResumeName(resumeInfo?.resumeName);
    formData.education = eduFormData;
    formData.experience = experienceFormData;
    formData.skills = skills;
    formData.profileSummary = profileSummary;
    formData.language = language;
    formData.hobbies = hobbies;
    formData.userId = resumeInfo?.userId;
    formData.resumeName = resumeInfo?.resumeName;
    formData.personalProject = personalProject;
    formData.resumeTemplateTitle = resumeInfo?.resumeTemplateTitle;
    console.log(formData);

    const formDataa = new FormData();
    formDataa.append("formData", JSON.stringify(formData));
    formDataa.append("image", imagePreviews);
    dispatch(updateResumeDataById({ resumeId, formDataa, openModal }));
    closeModal();
  };

  useEffect(() => {
    if (error !== "") {
      // openModal(error, false);
      console.log(error);
    }
  }, [error]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const validateInputs = () => {
    const errors = {};
    let eduErr = [...eduErrors];
    let expErr = [...expErrors];
    let proSumErr = [...proSumErrors];
    let skillErr = [...skillsError];
    let lngErr = [...languageError];
    let hobErr = [...hobbiesError];

    if (!formData.firstName) {
      errors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      errors.lastName = "Last name is required";
    }
    if (!formData.dob) {
      errors.dob = "Date of Birth is required";
    }

    // if (formData.images.length === 0) {
    //   errors.images = "Please upload at least one image";
    // }

    if (!formData.contactNo) {
      errors.contactNo = "Contact number is required";
    }

    if (!formData.currentAddress) {
      errors.currentAddress = "Current address is required";
    }

    if (!formData.emailId) {
      errors.emailId = "Email address is required";
    }

    eduFormData.forEach((item, i) => {
      if (item.cgpaOrPercentage.trim() === "") {
        eduErr[i].cgpaOrPercentage = "CGPA Or Percentage is required";
      }
      if (item.collegeName.trim() === "") {
        eduErr[i].collegeName =
          "College Name / University Name / School is required";
      }
      if (item.startYear.trim() === "") {
        eduErr[i].startYear = "Start Year is required";
      }
      if (item.endYear.trim() === "") {
        eduErr[i].endYear = "End Year is required";
      }
    });

    experienceFormData.forEach((item, i) => {
      if (item.designation.trim() === "") {
        expErr[i].designation = "Designation is required";
      }
      if (item.companyName.trim() === "") {
        expErr[i].companyName = "Compnay Name is required";
      }
      if (item.workExperience.trim() === "") {
        expErr[i].workExperience = "Work Experience is required";
      }
      if (item.startYear.trim() === "") {
        expErr[i].startYear = "Start Year is required";
      }
      if (item.endYear.trim() === "") {
        expErr[i].endYear = "End Year is required";
      }
    });

    profileSummary.forEach((item, i) => {
      if (item.profileSummary.trim() === "") {
        proSumErr[i].profileSummary = "Profile Summary is required";
      }
    });

    skills.forEach((item, i) => {
      if (item.skill.trim() === "") {
        skillErr[i].skill = "Skill is required";
      }
    });

    language.forEach((item, i) => {
      if (item.language.trim() === "") {
        lngErr[i].language = "Language is required";
      }
    });

    hobbies.forEach((item, i) => {
      if (item.hobbies.trim() === "") {
        hobErr[i].hobbies = "Hobby is required";
      }
    });

    setEduErrors(eduErr);
    setExpErrors(expErr);
    setSkillsError(skillErr);
    setProSumErrors(proSumErr);
    setLanguageError(lngErr);
    setHobbiesError(hobErr);

    function checkEmptyObjects(eduErr) {
      for (const obj of eduErr) {
        for (const value of Object.values(obj)) {
          if (typeof value === "string" && value.trim() !== "") {
            return false;
          }
        }
      }
      return true;
    }

    let edu = checkEmptyObjects(eduErr);
    let exp = checkEmptyObjects(expErr);
    let proSum = checkEmptyObjects(proSumErr);
    let sklErr = checkEmptyObjects(skillErr);
    let lErr = checkEmptyObjects(lngErr);
    let hErr = checkEmptyObjects(hobErr);

    setValidationErrors(errors);
    // console.log(Object.keys(errors).length === 0 && edu && exp);
    return (
      Object.keys(errors).length === 0 &&
      edu &&
      exp &&
      proSum &&
      sklErr &&
      lErr &&
      hErr
    );
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    delete formData.images;
    if (validateInputs()) {
      setIsModalOpen(true);
      setPopupTitle("Update Resume");
      setPopupMessage(`Are you sure you want to update resume.`);
      setHeaderColor("green");
      setConfirm(true)
    }else{
      setIsModalOpen(true);
      setPopupTitle("Error");
      setPopupMessage(`One or more error. please check input fields`);
      setHeaderColor("red");
      setShowInputBox(false);
      setConfirm(false)
    }
  };

  return (
    <>
      {loading === false && isLoading === false ? (
        <div className="edit_resume_background">
          <div className="edit_resume_container">
            <div className="edit_resume_header_container">
              <h3 className="">{`Update - ${resumeInfo?.resumeName}`}</h3>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="edit_resume_form_container">
                <div className="edit_resume_main_form">
                  <div className="edit_section_container">
                    <div className="edit_section_heading">
                      Basic Information 1
                    </div>
                    <BasicInfoE
                      handleClearImages={handleClearImages}
                      handleImageChange={handleImageChange}
                      handleInputChange={handleInputChange}
                      imagePreviews={imagePreviews}
                      validationErrors={validationErrors}
                      formData={formData}
                    />
                  </div>

                  <div className="edit_section_container">
                    <div className="edit_section_heading">
                      Contact Information 2
                    </div>
                    <ContactInfoE
                      handleClearImages={handleClearImages}
                      handleImageChange={handleImageChange}
                      handleInputChange={handleInputChange}
                      imagePreviews={imagePreviews}
                      validationErrors={validationErrors}
                      formData={formData}
                    />
                  </div>

                  <div className="edit_section_container">
                    <div className="edit_section_heading">Education 3</div>
                    <EducationE
                      handleEducationChange={handleEducationChange}
                      courseOptions={courseOptions}
                      removeEducation={removeEducation}
                      addEducation={addEducation}
                      eduErrors={eduErrors}
                      eduFormData={eduFormData}
                    />
                  </div>

                  <div className="edit_section_container">
                    <div className="edit_section_heading">Experience 4</div>
                    <ExperienceE
                      handleExperienceChange={handleExperienceChange}
                      removeExperience={removeExperience}
                      addExperience={addExperience}
                      expErrors={expErrors}
                      experienceFormData={experienceFormData}
                    />
                  </div>

                  <div className="edit_section_container">
                    <div className="edit_section_heading">
                      Personal Project 5
                    </div>
                    <PersonalProjectE
                      personalProject={personalProject}
                      personalProjectErrors={personalProjectErrors}
                      addPersonalProject={addPersonalProject}
                      removePersonalProject={removePersonalProject}
                      handlePersonalProjectChange={handlePersonalProjectChange}
                    />
                  </div>
                  <div className="edit_section_container">
                    <div className="edit_section_heading">Skill 6</div>
                    <SkillE
                      skills={skills}
                      handleSkillsChange={handleSkillsChange}
                      removeSkills={removeSkills}
                      addSkills={addSkills}
                      ratings={ratings}
                      skillsError={skillsError}
                    />
                  </div>
                  <div className="edit_section_container">
                    <div className="edit_section_heading">
                      Profile Summary 7
                    </div>
                    <ProfileSummaryE
                      handleProSumarryChange={handleProSumarryChange}
                      removeProSum={removeProSum}
                      addProSummary={addProSummary}
                      profileSummary={profileSummary}
                      proSumErrors={proSumErrors}
                    />
                  </div>
                  <div className="edit_section_container">
                    <div className="edit_section_heading">Language 8</div>
                    <LanguageE
                      language={language}
                      handleLanguageChange={handleLanguageChange}
                      removeLanguage={removeLanguage}
                      addLanguage={addLanguage}
                      languageError={languageError}
                      proficiency={proficiency}
                    />
                  </div>
                  <div className="edit_section_container">
                    <div className="edit_section_heading">Hobbies 9</div>
                    <HobbiesE
                      hobbies={hobbies}
                      handleHobbiesChange={handleHobbiesChange}
                      removeHobbies={removeHobbies}
                      addHobbies={addHobbies}
                      hobbiesError={hobbiesError}
                    />
                  </div>
                </div>
                <div className="edit_resume_footer">
                  <div className="update_btn">
                    <Button buttonName="Update" type="submit" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {isModalOpen && (
        <CustomModal
          title={popupTitle}
          description={popupMessage}
          width="400px"
          height="auto"
          onCancel={closeModal}
          onOK={handleModalOK}
          cancelColor="red"
          okColor="green"
          cancelButtonLabel="Cancel"
          okButtonLabel="Ok"
          headerColor={headerColor}
          isModalOpen={isModalOpen}
          showInputBox={showInputBox}
          confirm={confirm}
          onConfirmDelete={handleModalOK}
        />
      )}
    </>
  );
};

export default EditResume;
