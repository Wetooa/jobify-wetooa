import { FunctionComponentElement } from "react";
import { Navigate } from "react-router-dom";
import { ParentNodesProps } from "../components/interfaces";
import { useAppContext } from "../context/appContext";

function ProtectedRoute({
  children,
}: ParentNodesProps): FunctionComponentElement<any> {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="landing" />;
  }
  return <>{children}</>;
}
export default ProtectedRoute;
