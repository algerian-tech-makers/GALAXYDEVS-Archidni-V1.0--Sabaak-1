import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  return (
    <Fragment>
      {(loading === false && isAuthenticated === false) ||
      (isAdmin === false && user.role !== "admin") ? (
        <Navigate to="/login" />
      ) : (
        <Outlet {...rest} />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;
