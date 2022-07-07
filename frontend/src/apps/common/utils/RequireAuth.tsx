import React from "react";

import { Navigate } from "react-router-dom";
import { AuthProps } from "../models/authProps";

export function RequireAuth(props: AuthProps) {
  if (localStorage.getItem("user")) {
    return props.children;
  }
  return <Navigate to={props.redirectTo} />;
}
