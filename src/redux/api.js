import axios from "axios"

          // const API = axios.create({baseURL:"https://resume-server-q1g2.onrender.com/"})
          // const API = axios.create({baseURL:"http://localhost:7000/"})
         const API = axios.create({baseURL:"http://15.206.173.187:7000/"})

API.interceptors.request.use((req) => {
    if (sessionStorage.getItem("userDetail")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(sessionStorage.getItem("userDetail")).token
      }`;
    }
    return req;
  });

//auth
export const signIn = (formData) => API.post("auth/signin", formData)

export const signUp = (formData) => API.post("auth/signup", formData)

//resume
//for saving resume form data
export const resumeFormDataPost = async (formDataa) => await API.post("resume/formInfo", formDataa)
 
//fetch all resume by userid
export const allResumeByUserId = async (id) => await API.get(`resume/allResumeByUserId/${id}`)

//resume by resume id
export const resumeByResumeId = async (id) => await API.get(`resume/byResumeId/${id}`)

//delete by resume id
export const deleteByResumeId= async (id) => await API.delete(`resume/deleteByResumeId/${id}`)

export const updateResumeById = async (resumeId, updateData) => await API.patch(`resume/updateResume/${resumeId}`, updateData);
  