import { lazy } from "react";


const Home = lazy(() => import("../pages/Index"));
const Contact = lazy(() => import("../pages/Contact"));
const Wishlist = lazy(() => import("../components/Wishlist"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "contact", element: <Contact /> },
  { path: "shop", element: <Shop /> },
  { path: "aboutus", element: <AboutUs /> },
  { path: "wishlist", element: <Wishlist /> },
  { path: "product/:id", element: <ProductDetails /> },
];