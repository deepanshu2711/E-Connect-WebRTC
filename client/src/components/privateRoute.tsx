import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../provider/currentUserProvider";

export const PrivateRoute = () => {
  const currentUser = useUser();
  return currentUser.user ? <Outlet /> : <Navigate to={"/signIn"} />;
};
