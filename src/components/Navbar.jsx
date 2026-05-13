import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display: 'flex', gap: '15px', padding: '15px', background: '#333', color: 'white' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Accueil</Link>
      <Link to="/my-articles" style={{ color: 'white', textDecoration: 'none' }}>Mes Articles</Link>
      <Link to="/create" style={{ color: 'white', textDecoration: 'none' }}>Créer un article</Link>
      
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '15px' }}>
        <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Connexion</Link>
        <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Inscription</Link>
      </div>
    </nav>
  );
}