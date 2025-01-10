import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import { useRole } from "../Hooks/useRole";
import { LoadingSpin } from "../Components/LoadingSpin";

export const AdminRoute = ({children}) => {
  const {user, loader} = useAuth();
  const [isAdmin, isAdminPeinding] = useRole();

  const location = useLocation();

  if (loader || isAdminPeinding) return <LoadingSpin />
  if (user && isAdmin) return children
  return <Navigate to='/' state={location.pathname} />
}
