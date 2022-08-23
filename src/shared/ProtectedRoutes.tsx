import { Outlet, Navigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { useToken } from "../services/useToken.Hook";

const ProtectedRoutes = () => {
  const auth = useToken();
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
