import { useOutlet } from "react-router-dom";
import Layout from "./Layout";

const ProtectedRoutes = () => {
  const outlet = useOutlet();

  //Check for auth
  //Redirect to login or feed

  return (
    <>
      <Layout>{outlet}</Layout>
    </>
  );
};

export default ProtectedRoutes;
