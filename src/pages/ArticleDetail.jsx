import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function ArticleDetail() {
  const { id } = useParams(); // Récupère le numéro de l'article dans l'URL
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // On demande au backend l'article avec cet ID précis
    api.get(`/articles/${id}`)
      .then(data => setArticle(data))
      .catch(() => setError("Article introuvable ou erreur de chargement."));
  }, [id]);

  if (error) return <p style={{ textAlign: 'center', color: 'red', marginTop: '50px' }}>{error}</p>;
  if (!article) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Chargement de l'article...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
        &larr; Retour à l'accueil
      </Link>
      
      <h1 style={{ marginTop: '30px', fontSize: '2.5rem' }}>{article.title}</h1>
      
      <div style={{ padding: '10px', background: '#f4f4f4', borderRadius: '5px', marginBottom: '30px' }}>
        <p style={{ margin: 0, color: '#555' }}>
          Publié par <strong>{article.author}</strong> le {article.date}
        </p>
      </div>

      <div style={{ lineHeight: '1.8', fontSize: '1.2rem', whiteSpace: 'pre-wrap' }}>
        {article.content}
      </div>
    </div>
  );
}