import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Chargement...</div>;
    
    // Si pas connecté, on renvoie vers le login
    if (!user) return <Navigate to="/login" />;
    
    // Sinon, on affiche le contenu (ContactList ou ContactForm)
    return children;
}