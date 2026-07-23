import { Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { publicRoutes } from "./routelist";
import { Navbar } from "../components/Navbar";
import {PageNotFound} from "../pages/PageNotFound";
import { Footer } from "../components/Footer";

const PublicLayout = () => (
  <>
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer/>
  </>
);

export default function MainRouter() {
  return (
    <Suspense fallback={<div className="h-12 w-12 rounded-full"></div>}>
      <Routes>
        <Route element={<PublicLayout />}>
          {publicRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}
