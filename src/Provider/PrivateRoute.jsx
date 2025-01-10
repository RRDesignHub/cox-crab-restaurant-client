
import { LoadingSpin } from "../Components/LoadingSpin";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

export const PrivateRoute = ({children}) => {
  const {user, loader} = useAuth();
  const location = useLocation();

  if (loader) return <LoadingSpin />
  if (user) return children
  return <Navigate to='/login' state={location.pathname} />
}
