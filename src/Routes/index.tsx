import { Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { publicRoutes } from "./routelist";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageNotFound } from "../pages/PageNotFound";
import { AnnouncementBar } from "../pages/AnnouncementBar";
import { PageLoader } from "../pages/PageLoader";


const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <AnnouncementBar />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default function MainRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
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