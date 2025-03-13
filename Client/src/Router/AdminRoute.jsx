
import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoadingSpinner from "../Components/LoadingSpinner";
import useRole from "../hooks/useRole";


const AdminRoute = ({children}) => {
    const [role, isLoading]=useRole();
    const {user,loading} = useContext(AuthContext);
    const location = useLocation()
    if(loading || isLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(user && role === "admin"){
        return children;
    }
    return (
        <Navigate state={location.pathname} to="/"></Navigate>
    );
};

export default AdminRoute;