import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();

  if (isLoaded && !isSignedIn) {
    return <Navigate to="/?sign-in=true" state={{ from: pathname }} />;
  }

  if (
    user !== undefined &&
    (!user.unsafeMetadata || !user.unsafeMetadata.role) &&
    pathname !== "/onboard"
  ) {
    return <Navigate to="/onboard" />;
  }
  

  return children;
};

export default ProtectedRoute;
