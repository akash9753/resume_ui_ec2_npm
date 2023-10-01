import { useState,useEffect } from "react";
/* eslint-disable no-undef */
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../components/customModal/CustomModal";
import Loader from "./../../components/loader/Loader";
import { deleteByResumeId } from "./../../redux/features/resumeSlice";
import { allResumeByUserId } from "./../../redux/features/resumeSlice";
import "./card.css";
const Card = ({ title, image, resumeId, resumeName, setData }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [headerColor, setHeaderColor] = useState("");
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.resumeForm);
  const [confirm, setConfirm] = useState(false)
  const { user } = useSelector((state) => ({ ...state.auth }));
  const [reload, setReload] = useState()
  const userId = user.result._id;

  const {  allResumeByU } = useSelector(
    (state) => state.resumeForm
  );

  const fetchData = () =>{
    dispatch(allResumeByUserId({ userId }));
  }
  useEffect(()=>{
    fetchData()
  },[])

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
       setConfirm(false)
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
    fetchData()
  };

  const onConfirmDelete = () => {
    dispatch(deleteByResumeId({ resumeId, openModal }));
  };

  const onDeleteResume = () => {
    
    setConfirm(true)
    setPopupTitle("Warning!");
    setPopupMessage(`Are you sure you want to delete ${resumeName}`);
    setHeaderColor("#ff6347");
    setIsModalOpen(true);
  };

  return (
    <>
  {!loading ? (
    <div className="card">
      <div onClick={() => navigate(`/generateResume/${resumeId}`)}>
        <img
          src={image}
          alt={title}
          className="card-image"
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="card-content">
        <div className="card_resume_name">
          <h2>{resumeName}</h2>
        </div>
        <div className="card_button_box">
          <div>
            <button className="edit-button">Edit</button>
          </div>
          <div>
            <button onClick={() => onDeleteResume()} className="delete-button">
              Delete
            </button>
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

export default Card;
