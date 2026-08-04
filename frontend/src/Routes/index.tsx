import { Fragment, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { adminRoutes, publicRoutes } from "./routelist";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { PageNotFound } from "../pages/PageNotFound";
import { AnnouncementBar } from "../pages/AnnouncementBar";
import { PageLoader } from "../pages/PageLoader";
import WhatsAppButton from "../components/WhatsAppButton";
import AdminLayout from "../pages/admin/AdminLayout";

const PublicLayout = () => (
  <Fragment>
    <AnnouncementBar />
    <Navbar />
    <main className="flex-1">
      <Outlet />
      <WhatsAppButton />
    </main>
    <Footer />
  </Fragment>
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

        <Route element={<AdminLayout />}>
          {adminRoutes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}
