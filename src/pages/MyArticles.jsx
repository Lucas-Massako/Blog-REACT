import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Outil pour changer de page
import { api } from '../lib/api';
import ArticleCard from '../components/ArticleCard';

export default function MyArticles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate(); // 2. Initialisation de l'outil de navigation

  useEffect(() => {
    api.get('/my-articles')
      .then(data => setArticles(data))
      .catch(err => console.error("Erreur:", err));
  }, []);

  // 3. La fonction qui s'active quand on clique sur "Supprimer"
  const handleDelete = (id) => {
    // Demande confirmation avant de supprimer
    if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
      api.delete(`/articles/${id}`)
        .then(() => {
          // Si ça marche côté serveur, on enlève l'article de l'écran
          setArticles(articles.filter(a => a.id !== id));
        })
        .catch(err => alert("Erreur lors de la suppression : " + err.message));
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Mes Publications</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article.id}>
              <ArticleCard article={article} />
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                
                {/* 4. On ajoute les actions "onClick" sur les boutons */}
                <button 
                  onClick={() => navigate(`/edit/${article.id}`)} 
                  style={{ flex: 1, padding: '5px', background: '#ffa500', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Modifier
                </button>

                <button 
                  onClick={() => handleDelete(article.id)} 
                  style={{ flex: 1, padding: '5px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Supprimer
                </button>

              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>Vous n'avez pas encore publié d'articles.</p>
        )}
      </div>
    </div>
  );
}