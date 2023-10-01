export const routes = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Services",
      link: "/services",
  
      subRoutes: [
        {
          name: "Resume Form",
          link: "/resumeForm",
        },
        {
          name: "My Resumes",
          link: "/myResumes",
        },
      ],
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];