import  { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import React from "react";

const ProtectedRoutes = ({ children }) => {
    const { user } = useAuth();

    return user ? children : <Navigate to="/authForm" />;
};

export default ProtectedRoutes;
