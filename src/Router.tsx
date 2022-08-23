import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./layout/Loader";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import ProtectedRoutes from "./shared/ProtectedRoutes";

//Lazy Imports
const Feed = lazy(() => import("./pages/Feed"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Contact = lazy(() => import("./pages/Contact"));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
