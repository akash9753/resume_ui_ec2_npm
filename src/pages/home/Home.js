import {useState, useEffect} from "react";
import "./home.css";
import img1 from './template_Image/img1.jpg';
import img2 from './template_Image/img2.jpg';
import img3 from './template_Image/img3.webp';
import img4 from './template_Image/img4.jpg';
import img5 from './template_Image/img5.jpg';
import img6 from './template_Image/img6.avif';
import img7 from './template_Image/img7.avif';
import img8 from './template_Image/img8.jpg';
import img9 from './template_Image/img9.jpg';
import resume from "../../assets/image/resume.jpg"
import CustomModal from "../../components/customModal/CustomModal";
import { useDispatch, useSelector  } from "react-redux";
import { setResumeTemplateSelect } from "../../redux/features/tempSlice";
import { useNavigate } from "react-router-dom";


  


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const token = user?.token;
  const [popupTitle, setPopupTitle] = useState("");
  const [popupMessage, setPopupMessage] = useState("");

  const resumeTemplates = [
    { 
      id:1,
      image: resume,
      title: "Classic Resume 1",
      description: "A traditional and professional resume template.",
      type:"tryThis"
    },
    { 
      id:2,
      image: resume,
      title: "Classic Resume 2",
      description: "A traditional and professional resume template.",
      type:"tryThis"
    },
    {
      id:3,
      image: img2,
      title: "Creative CV",
      description: "A unique and creative CV template to showcase your skills.",
      type:"Paid"
    },
    {
      id:4,
      image: img3,
      title: "Minimalist Portfolio",
      description: "A clean and minimalistic portfolio template.",
      type:"Paid"
    },


    {
      id:5,
      image: img4,
      title: "Classic Resume",
      description: "A traditional and professional resume template.",
      type:"Paid"
    },
    {
      id:6,
      image: img5,
      title: "Creative CV",
      description: "A unique and creative CV template to showcase your skills.",
      type:"Paid"
    },
    {
      id:7,
      image: img6,
      title: "Minimalist Portfolio",
      description: "A clean and minimalistic portfolio template.",
      type:"Paid"
    },
    {
      id:8,
      image: img7,
      title: "Classic Resume",
      description: "A traditional and professional resume template.",
      type:"Paid"
    },
    {
      id:9,
      image: img8,
      title: "Creative CV",
      description: "A unique and creative CV template to showcase your skills.",
      type:"Paid"
    },
    {
      id:10,
      image: img9,
      title: "Minimalist Portfolio",
      description: "A clean and minimalistic portfolio template.",
      type:"Paid"
    },
    // Add more templates here
  ];

  const openModal = (title,message,headerColor) => {
    setPopupTitle(title);
    setPopupMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onResumeTemplateSelect = (t) =>{
       if(t.type === "tryThis"){
        if(!token){
          openModal("Sign In","Please Signin to Continue")
        }else{
          dispatch(setResumeTemplateSelect(t));
          navigate("/resumeForm");
        }
        
       }else{
        openModal("Premium Subscription","Premium Subcription Comming Soon...");
       }
  }

  return (
    <>
    <div className="home-container">
      <div className="app">
        <h1>Resume Templates</h1>
        <div className="card_home-container">
          {resumeTemplates.map((template, index) => (
            <div onClick={()=>{onResumeTemplateSelect(template)}} className={`card_home card-${template.type.toLowerCase()}`} key={index}>
              <img
                src={template.image}
                alt={template.title}
                className="card-image"
              />
              <h2 className="card-title">{template.title}</h2>
              <p className="card-description">{template.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
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
        headerColor="#ffA500"
        isModalOpen={isModalOpen}
      />
    )}
    </>
  );
};

export default Home;
