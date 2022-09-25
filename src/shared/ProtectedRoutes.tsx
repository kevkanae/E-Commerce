import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Loader from "../layout/Loader";
import Navbar from "../layout/Navbar/Navbar";
import { useToken } from "../services/useToken.Hook";

const ProtectedRoutes = () => {
  const auth = useToken();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:8080/refresh")
      .then((res) => {
        console.log(res.data.token);
        localStorage.setItem("ACCESS_KEY", res.data.token);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoading) return <Loader />;

  return (
    <>
      {auth ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoutes;
