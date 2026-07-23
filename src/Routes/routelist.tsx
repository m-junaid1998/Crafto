import { lazy } from "react";

const Home = lazy(() => import("../pages/Index"));
const Contact = lazy(() => import("../components/Contact"));
const Shop = lazy(() => import("../components/Shop"));

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
