import React from "react";

//imports
const Home = React.lazy(() => import("./views/Homepage"));
const Dash = React.lazy(() => import("./views/Dashboard"));
const About = React.lazy(() => import("./views/About"));
const routes = [
  // { path: "/console", exact: true, name: "Home", component: View1 },
  // { path: "/console/view2", name: "View2", component: View2 },
  {
    path: "/",
    exact: true,
    name: "Home",
    component: Home,
  },
  {
    path: "/dash",
    exact: true,
    name: "Dashboard",
    component: Dash,
  },
  {
    path: "/about",
    exact: true,
    name: "About",
    component: About,
  },
];

export default routes;
