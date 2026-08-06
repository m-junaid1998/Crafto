import { lazy } from "react";
import Checkout from "../pages/Checkout";
import AdminProducts from "../pages/admin/AdminProducts";


// Public Pages
const Home = lazy(() => import("../pages/Index"));
const Contact = lazy(() => import("../pages/Contact"));
const Wishlist = lazy(() => import("../components/Wishlist"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const Shop = lazy(() => import("../pages/Shop"));
const ProductDetails = lazy(() => import("../pages/ProductDetails"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("../pages/TermsAndConditions"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Login = lazy(() => import("../pages/Login"));
const MyProfile = lazy(() => import("../pages/MyProfile"));

// Admin Routes
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const AdminCategories = lazy(() => import("../pages/admin/AdminCategories"));
const AdminOrders = lazy(() => import("../pages/admin/AdminOrders"));
const AdminCustomers = lazy(() => import("../pages/admin/AdminCustomers"));
const AdminSettings = lazy(() => import("../pages/admin/AdminSettings"));


export const publicRoutes = [
  { path: "/", element: <Home /> },
  { path: "contact", element: <Contact /> },
  { path: "shop", element: <Shop /> },
  { path: "aboutus", element: <AboutUs /> },
  { path: "wishlist", element: <Wishlist /> },
  { path: "checkout", element: <Checkout /> },
  { path: "product/:id", element: <ProductDetails /> },
  { path: "privacy", element: <PrivacyPolicy /> },
  { path: "terms", element: <TermsAndConditions /> },
  { path: "signup", element: <SignUp /> },
  { path: "login", element: <Login /> },
  { path: "myprofile", element: <MyProfile /> },
];

export const adminRoutes = [
  { path: "/admin", element: <Dashboard /> },
  { path: "/admin/categories", element: <AdminCategories /> },
  { path: "/admin/products", element: <AdminProducts /> },
  { path: "/admin/orders", element: <AdminOrders /> },
  { path: "/admin/customers", element: <AdminCustomers /> },
  { path: "/admin/settings", element: <AdminSettings /> },
];