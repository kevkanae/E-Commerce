import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import Loader from "../layout/Loader";
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
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default ProtectedRoutes;
