import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 1. Importation du context

export default function Navbar() {
  const { user, logout } = useAuth(); // 2. Récupération de l'utilisateur et de la fonction logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirection après déconnexion
  };

  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', background: '#333', color: 'white', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link>
      
      {/* 🟢 Affiché uniquement si CONNECTÉ */}
      {user && (
        <>
          <Link to="/my-articles" style={{ color: 'white', textDecoration: 'none' }}>Mes Articles</Link>
          <Link to="/create" style={{ color: 'white', textDecoration: 'none' }}>Créer un article</Link>
        </>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
        {/* 🟢 Condition : si connecté -> Bouton Déconnexion, sinon -> Connexion/Inscription */}
        {user ? (
          <button 
            onClick={handleLogout} 
            style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer', borderRadius: '4px' }}
          >
            Déconnexion
          </button>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Connexion</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
}