import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import ArticleForm from '../components/ArticleForm';

export default function CreateArticle() {
  const navigate = useNavigate();

  const handleCreate = (formData) => {
    // On utilise la méthode POST de ton API
    api.post('/articles', formData)
      .then(() => {
        // Une fois créé, on redirige l'utilisateur vers l'accueil
        navigate('/');
      })
      .catch(err => alert("Erreur lors de la création : " + err.message));
  };

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto' }}>
      <h1 style={{ textAlign: 'center' }}>Nouvel Article</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Partagez vos pensées avec la communauté.
      </p>
      <ArticleForm onSubmit={handleCreate} />
    </div>
  );
}