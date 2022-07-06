import { Navigate } from "react-router-dom";
import { useAppContext } from "../contexts/appContext.js";

const ProtectedRoute = ({ children }) => {
    const { user } = useAppContext();
    if (!user) {
        return <Navigate to="/landing" />;
    }
    return children;
};

export default ProtectedRoute;
