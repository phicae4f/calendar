import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const isLoading = useSelector((state: RootState) => state.auth.isLoading)
    const location = useLocation()

    if(isLoading) {
        return <div>Loading...</div>
    }
    
    if(!isAuthenticated) {
        return <Navigate to="/login" state={{from: location}} replace />
    }
    
    return children
}


export default ProtectedRoute