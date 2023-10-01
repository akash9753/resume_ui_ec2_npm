import React, { useRef, useState, useEffect } from "react";
import "./generateResume1.css";
import { BiMobile, BiCurrentLocation } from "react-icons/bi";
import { AiOutlineMail, AiFillLinkedin } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { TbCricket } from "react-icons/tb";
import { FaGamepad } from "react-icons/fa";
import { FcReading } from "react-icons/fc";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Elon from "../../../assets/image/Elon_Musk.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resumeById } from "../../../redux/features/resumeSlice";
import Loader from "../../../components/loader/Loader";

const GenerateResume1 = () => {
  let { id } = useParams();
  const [resumeId, setResumeId] = useState(id);
  useEffect(() => {
    dispatch(resumeById({ resumeId }));
  }, [resumeId]);

  const dispatch = useDispatch();
  const { error, loading, resumeByResumeId } = useSelector(
    (state) => state.resumeForm
  );
  const [resumeInfo, setResumeInfo] = useState(null);
  // const [loading, setLoading] = useState(false);
  useEffect(() => {
    setResumeInfo(resumeByResumeId.resumeById);
  }, [resumeByResumeId]);
  const contentRef = useRef(null);

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  const handleDownloadPDF = () => {
    const input = contentRef.current;

    html2canvas(input, { scrollY: -window.scrollY })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const contentWidth = canvas.width;
        const contentHeight = canvas.height;
        const pdf = new jsPDF("p", "pt", [contentWidth, contentHeight]);
        pdf.setProperties({ compress: true });
        pdf.addImage(imgData, "PNG", 0, 0, contentWidth, contentHeight);
        pdf.output("datauristring", {
          compress: true,
          quality: 0.1, // Adjust the quality setting as needed
        });
        const capitalizedFirstName = capitalizeFirstLetter(
          resumeInfo?.firstName
        );
        const capitalizedLastName = capitalizeFirstLetter(resumeInfo?.lastName);
        const pdfFileName = `${capitalizedFirstName} ${capitalizedLastName} Resume.pdf`;
        pdf.save(pdfFileName);
      })
      .catch((error) => {
        console.error("Error during HTML to canvas conversion:", error);
      });
  };

  {
    /* const getResumeData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:7000/resume/byResumeId/${id}`
      );
      setResumeInfo(res.data.resumeById);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };
  console.log(resumeInfo);
  useEffect(()=>{
    getResumeData(resumeId)
  },[]) */
  }

  // useEffect(() => {
  //   if (error !== "") {
  //     // openModal(error, false);
  //     console.log(error);
  //   }
  // }, [error]);

  const [imageDataUrl, setImageDataUrl] = useState(null);

  // useEffect(() => {
  //   // Assuming you have the image directly available as a URL or path
  //   const imageUrl = resumeInfo?.images?.[0].url; // Replace with your image URL

  //   if (imageUrl) {
  //     // Convert the image URL to Base64
  //     const convertToBase64 = async () => {
  //       try {
  //         const response = await fetch(imageUrl);
  //         const blob = await response.blob();
  //         const reader = new FileReader();

  //         reader.onload = () => {
  //           const dataUrl = reader.result;
  //           setImageDataUrl(dataUrl);
  //         };

  //         reader.readAsDataURL(blob);
  //       } catch (error) {
  //         console.error('Error converting image to Base64:', error);
  //       }
  //     };

  //     convertToBase64();
  //   }
  // }, [resumeInfo?.images]);

  useEffect(() => {
    // Assuming you have the image directly available as a URL or path
    const imageUrl = resumeInfo?.images?.[0]?.url; // Replace with your image URL

    if (imageUrl) {
      // Convert the image URL to Base64 with improved quality
      const convertToBase64 = async () => {
        try {
          const img = new Image();
          img.crossOrigin = "Anonymous"; // Set crossOrigin attribute
          img.src = imageUrl;

          img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = img.width; // Match canvas dimensions to image dimensions
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);

            // Get the Base64 data URL with improved quality
            const dataUrl = canvas.toDataURL("image/jpeg"); // You can specify image format and quality here
            setImageDataUrl(dataUrl);
          };
        } catch (error) {
          console.error("Error converting image to Base64:", error);
        }
      };

      convertToBase64();
    }
  }, [resumeInfo?.images]);

  function extractYearFromISODate(isoDateString) {
    const date = new Date(isoDateString);
    return date.getFullYear();
  }

  return (
    <>
      {!loading ? (
        <div className="gr_resume_background">
          <div className="header_position">
            <div className="heading_Position_rt1">
              <div>{`Resume Template : ${resumeInfo?.resumeTemplateTitle}`}</div>
              <div>{`Resume : ${resumeInfo?.resumeName}`}</div>
            </div>
            <div className="button_Pos_rt1">
              <div className="pdf_download_button">
                <button onClick={handleDownloadPDF} className="download_pdf">
                  Send Me As Email
                </button>
              </div>
              <div className="pdf_download_button">
                <button onClick={handleDownloadPDF} className="download_pdf">
                  Download as Pdf
                </button>
              </div>
            </div>
          </div>
          <div className="gr_resume_position">
            <div ref={contentRef}>
              <div className="gr_resume_container">
                <div className="left_side">
                  <div className="profileText">
                    <div className="imgBx">
                      <img src={imageDataUrl || Elon} alt="profileIma" />
                    </div>
                    <h2>
                      {resumeInfo?.firstName} {resumeInfo?.lastName}
                      <br></br>
                      <span>{resumeInfo?.experience?.[0].designation}</span>
                    </h2>
                  </div>
                  <div className="contactInfo">
                    <h3 className="title">Contact Info</h3>
                    <ul>
                      <li className="contact-item">
                        <span className="icon">
                          <BiMobile />
                        </span>
                        <span className="text">
                          {" "}
                          +91{resumeInfo?.contactNo}
                        </span>
                      </li>
                      <li className="contact-item">
                        <span className="icon">
                          <AiOutlineMail />
                        </span>
                        <span className="text"> {resumeInfo?.emailId}</span>
                      </li>
                      {resumeInfo?.websiteLink === null ||
                      resumeInfo?.websiteLink === "" ||
                      resumeInfo?.websiteLink === undefined ? null : (
                        <li className="contact-item">
                          <span className="icon">
                            <CgWebsite />
                          </span>
                          <span className="text">
                            {" "}
                            <a
                              className="hover-blue"
                              style={{ color: "white" }}
                              href={resumeInfo?.websiteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {resumeInfo?.websiteLink}
                            </a>
                          </span>
                        </li>
                      )}
                      {resumeInfo?.linkedinLink === null ||
                      resumeInfo?.linkedinLink === "" ||
                      resumeInfo?.linkedinLink === undefined ? null : (
                        <li className="contact-item">
                          <span className="icon">
                            <AiFillLinkedin />
                          </span>
                          <span className="text">
                            {" "}
                            <a
                              className="hover-blue"
                              style={{ color: "white" }}
                              href={resumeInfo?.websiteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {resumeInfo?.linkedinLink}
                            </a>
                          </span>
                        </li>
                      )}

                      <li className="contact-item">
                        <span className="icon">
                          <BiCurrentLocation />
                        </span>
                        <span className="text">
                          {" "}
                          {resumeInfo?.currentAddress}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="contactInfo education">
                    <h3 className="title">Education</h3>
                    <ul>
                      {resumeInfo?.education?.map((ed) => {
                        return (
                          <li key={ed.id} className="education-item">
                            <h5>
                              {extractYearFromISODate(ed?.startYear)} -{" "}
                              {extractYearFromISODate(ed?.endYear)}
                            </h5>
                            <h4>{ed.courseName.toUpperCase()}</h4>
                            <h4>{ed.collegeName.toUpperCase()}</h4>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="language">
                    <h3 className="title">Languages</h3>
                    <ul>
                      {resumeInfo?.language?.map((l) => {
                        const proficiency = l?.proficiency; // Replace with your skill rating value

                        // Convert rating to a percentage
                        const percentage = (proficiency / 10) * 100;
                        return (
                          <li key={l.id}>
                            <span className="text">{l?.language}</span>
                            <span className="percent">
                              <div style={{ width: `${percentage}%` }}></div>
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className="right_side">
                  <div className="about">
                    <h2 className="title2">Profile</h2>
                    <p>{resumeInfo?.profileSummary[0]?.profileSummary}</p>
                  </div>
                  <div className="about">
                    <h2 className="title2">Experience</h2>
                    {resumeInfo?.experience?.map((ex) => {
                      return (
                        <div className="box">
                          <div className="year_company">
                            <h5>
                              {extractYearFromISODate(ex?.startYear) || 2019} -{" "}
                              {extractYearFromISODate(ex?.startYear) === null
                                ? "Present"
                                : extractYearFromISODate(ex?.startYear)}
                            </h5>
                            <h5>{ex?.companyName}</h5>
                          </div>
                          <div className="text">
                            <h4>{ex?.designation}</h4>
                            <p>{ex?.workExperience}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="about skill">
                    <h2 className="title2">Professional Skill</h2>
                    {resumeInfo?.skills?.map((s) => {
                      // Assuming s.ratting represents the skill rating from 1 to 10
                      const rating = s?.ratting; // Replace with your skill rating value

                      // Convert rating to a percentage
                      const percentage = (rating / 10) * 100;

                      return (
                        <div key={s.id} className="box">
                          <h4>{s?.skill}</h4>
                          <div className="percentage">
                            <div style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="about hobbies">
                    <h2 className="title2">Hobbies</h2>
                    <ul>
                      {resumeInfo?.hobbies?.map((h) => {
                        return (
                          <li>
                            <TbCricket
                              style={{ fontSize: "18px", color: "#03a9f4" }}
                            />{" "}
                            {h.hobbies}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default GenerateResume1;
