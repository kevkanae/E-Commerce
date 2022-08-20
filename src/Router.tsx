import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import { lazy, Suspense } from "react";
import Loader from "./layout/Loader";
import Home from "./pages/Home";

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
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;
