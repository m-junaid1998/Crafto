import { lazy } from "react";
import Wishlist from "../components/Wishlist";

const Home = lazy(() => import("../pages/Index"));
const Contact = lazy(() => import("../pages/Contact"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));

export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "contact", element: <Contact /> },
  { path: "shop", element: <Shop /> },
  { path: "product/:id", element: <ProductDetails /> },
  { path: "wishlist", element: <Wishlist /> },
];