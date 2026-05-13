import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    api.post('/register', { email, password })
      .then(() => {
        alert("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        navigate('/login'); // Redirection vers le login
      })
      .catch((err) => {
        alert("Erreur lors de l'inscription : " + err.message);
      });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h2>Créer un compte</h2>
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
          placeholder="Choisissez un mot de passe" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', cursor: 'pointer', background: '#333', color: 'white', border: 'none' }}>
          S'inscrire
        </button>
      </form>
      <p style={{ marginTop: '20px' }}>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
}