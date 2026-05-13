import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ArticleCard from '../components/ArticleCard';

export default function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // On récupère les articles depuis l'API
    api.get('/articles')
      .then(data => setArticles(data))
      .catch(err => console.error("Erreur de chargement:", err));
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Tous les articles</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {articles.length > 0 ? (
          articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Aucun article pour le moment.</p>
        )}
      </div>
    </div>
  );
}