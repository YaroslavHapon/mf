import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({ isSignedIn, path, children }) {
  return (
    <Route path={path}>
      {!isSignedIn && <Redirect to="/" />}
      {children}
    </Route>
  );
}
