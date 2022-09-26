import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./layout/Loader";
import Landing from "./pages/Landing";
import Layout from "./layout/Layout";
import ProtectedRoutes from "./shared/ProtectedRoutes";

//Lazy Imports
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Contact = lazy(() => import("./pages/Contact"));
const ViewProduct = lazy(() => import("./pages/ViewProduct"));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home/:id" element={<ViewProduct />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
