import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error(' UseAuth debe ser usado en un AuthProvider')
    }

    return context
}