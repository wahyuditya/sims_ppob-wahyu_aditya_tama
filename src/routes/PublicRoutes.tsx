import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const isTokenExpired = (token: string) => {
  try {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem("jwtToken");

  if (token && !isTokenExpired(token)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PublicRoute;
