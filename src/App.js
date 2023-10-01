import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Signin from "./pages/signin/Signin";
import Signup from "./pages/signup/Signup";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/authSlice";
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/notFound/NotFound';
import Header from './components/header/Header';
import TemplateOne from './pages/template/template1/Template1';
import TemplateTwo from './pages/template/template2/Template2';
import ResumeForm from './pages/resumeForm.js/ResumeForm';
import GenerateResume1 from './pages/generateResume/template1/GenerateResume1';
import Footer from './components/footer/Footer';
import MyResumes from './pages/myResumes/MyResumes';
import GenerateResume2 from "./pages/generateResume/template2/generateResume2";
import EditResume from './pages/editResume/EditResume';




function App() {
  // const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem("profile"));
  // useEffect(() => {
  //   dispatch(setUser(user));
  //   console.log("App.js setUser");
  // }, [dispatch, user]);
  
  const routesConfig = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signin',
      element: <Signin />,
    },
    {
      path: '/signup',
      element: <Signup />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <TemplateOne />
        </PrivateRoute>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <PrivateRoute>
          <TemplateTwo />
        </PrivateRoute>
      ),
    },
    {
      path: '/resumeForm',
      element: (
        <PrivateRoute>
          <ResumeForm />
        </PrivateRoute>
      ),
    },
    {
      path: '/myResumes',
      element: (
        <PrivateRoute>
          <MyResumes />
        </PrivateRoute>
      ),
    },
    {
      path: '/generateResume1/:id',
      element: (
        <PrivateRoute>
          <GenerateResume1 />
        </PrivateRoute>
      ),
    },
    {
      path: '/EditResume/:id',
      element: (
        <PrivateRoute>
          <EditResume />
        </PrivateRoute>
      ),
    },
    {
      path: '/generateResume2/:id',
      element: (
        <PrivateRoute>
          <GenerateResume2 />
        </PrivateRoute>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return (
    <BrowserRouter>
      <Header />
      <ToastContainer />
        <Routes>
          {routesConfig.map((route, index) => (
            <Route exact key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
