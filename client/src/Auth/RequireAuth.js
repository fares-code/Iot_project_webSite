import Cookie from 'cookie-universal';

import { Navigate, Outlet } from "react-router-dom";


export default function RequirAuth() {
    const cookie = Cookie();
    const token = cookie.get("Iot_Project");

    if (token) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;  // Redirect to login page
    }
}
