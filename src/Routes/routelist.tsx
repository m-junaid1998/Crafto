import { lazy } from "react";

const Home = lazy(() => import("../pages/Index"));
const Contact = lazy(() => import("../pages/Contact"));
const Shop = lazy(() => import("../pages/Shop"));

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "contact",
    element: <Contact />,
  },
  {
    path: "shop",
    element: <Shop />,
  },
];
