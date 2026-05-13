import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth(); // 2. On récupère la fonction login
  const navigate = useNavigate(); // 3. Outil pour changer de page

  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    login(email, password)
      .then(() => {
        // Si ça marche, on redirige vers l'accueil
        navigate('/');
      })
      .catch((err) => {
        // Si le mot de passe est faux, on affiche une alerte
        alert("Erreur de connexion : " + err.message);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Votre email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <input 
          type="password" 
          placeholder="Votre mot de passe" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#333', color: 'white', border: 'none' }}>
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Pas encore de compte ? <Link to="/register">S'inscrire</Link>
      </p>
    </div>
  );
}