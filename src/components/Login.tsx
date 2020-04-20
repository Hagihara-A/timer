import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { AuthConfig } from "../firebase";

export const Login = () => {
  return <StyledFirebaseAuth {...AuthConfig} />;
};
