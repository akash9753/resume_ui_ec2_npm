import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { allResumeByUserId } from "../../redux/features/resumeSlice";
import "./myResume.css";
import resume from "../../assets/image/resume.jpg";
import "../../style/buttonStyle.css";
import { deleteByResumeId } from "../../redux/features/resumeSlice";
import CustomModal from "../../components/customModal/CustomModal";
const MyResumes = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state.auth }));
  const userId = user.result._id;
  const { error, loading, allResumeByU } = useSelector(
    (state) => state.resumeForm
  );
  const [data, setData] = useState([]);

  const {  title } = useSelector((state) => ({
    ...state.temp.resumeTemplateSelect,
  }));

  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const [resumeId, setResumeId] = useState(null);

  const [confirm, setConfirm] = useState(false);

  const filterData = data?.map((d, i) => ({
    id: i + 1,
    image: resume,
    description: `resume ${i + 1}`,
    resumeId: d._id,
    resumeName: d.resumeName,
    resumeTemplateTitle:d.resumeTemplateTitle
  }));

  const fetchData = () => {
    dispatch(allResumeByUserId({ userId }));
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (allResumeByU) {
      setData(allResumeByU.allResumeByUserId);
    }
  }, [allResumeByU]);

  const openModal = (message, success) => {
    if (success === true) {
      // alert("Resume Deleted succesfully")
      setPopupTitle("Success");
      setPopupMessage(message);
      setHeaderColor("#28a745");
      setConfirm(false);
      setIsModalOpen(true);
    } else {
      setPopupTitle("Error");
      setPopupMessage(message);
      setHeaderColor("#ff6347");
      setIsModalOpen(true);
    }
  };
  useEffect(() => {
    if (error !== "") {
      openModal(error, false);
      console.log(error);
    }
  }, [error]);

  const closeModal = () => {
    setIsModalOpen(false);
    fetchData();
  };

  const onConfirmDelete = () => {
    dispatch(deleteByResumeId({ resumeId, openModal }));
  };

  const onDeleteResume = (rName) => {
    setConfirm(true);
    setPopupTitle("Warning!");
    setPopupMessage(`Are you sure you want to delete ${rName}`);
    setHeaderColor("#ff6347");
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(allResumeByUserId({ userId }));
  }, []);

  useEffect(() => {
    if (allResumeByU) {
      setData(allResumeByU.allResumeByUserId);
    }
  }, [allResumeByU]);

  useEffect(() => {
    if (error !== "") {
      // openModal(error, false);
      console.log(error);
    }
  }, [error]);
  console.log(data);
  const navigateToResume = (f) =>{
        if(f.resumeTemplateTitle === "Classic Resume 1"){
          navigate(`/generateResume1/${f.resumeId}`)
        }else if(f.resumeTemplateTitle === "Classic Resume 2"){
          navigate(`/generateResume2/${f.resumeId}`)
        }
  }

  const navigateToEditResume = (f) =>{
    navigate(`/editResume/${f.resumeId}`)
  }

  return (
    <>
      {!loading ? (
        <div className="card__container">
          <div className="title_my_resume">
            <div className="title__">
              <h2>My Resumes - {filterData?.length}</h2>
            </div>
           { /* <div>
              <button className="delete-button">Delete All</button>
      </div> */}
          </div>
          <div className="resume_template_container_outer">
            <div className="resume_template_container_inner">
              <div className="card-list">
                {filterData?.map((f) => (
                  <div className="card" key={f.id}>
                    <div
                      onClick={() => navigateToResume(f)}
                    >
                      <img
                        src={f.image}
                        alt={f.title}
                        className="card-image"
                        style={{ cursor: "pointer" }}
                      />
                    </div>

                    <div className="card-content">
                      <div className="card_resume_name">
                        <h2>{f.resumeName}</h2>
                      </div>
                      <div className="card_button_box">
                         <div>
                          <button onClick={()=>navigateToEditResume(f)} className="edit-button">Edit</button>
                </div> 
                        <div>
                          <button
                            onClick={() => {
                              onDeleteResume(f.resumeName);
                              setResumeId(f.resumeId);
                            }}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )).reverse()}
              </div>
            </div>
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
          onOK={closeModal}
          cancelButtonLabel="Close"
          okButtonLabel="Ok"
          headerColor={headerColor}
          isModalOpen={isModalOpen}
          confirm={confirm}
          onConfirmDelete={onConfirmDelete}
        />
      )}
    </>
  );
};

export default MyResumes;
