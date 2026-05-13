import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../lib/api';
import ArticleForm from '../components/ArticleForm';

export default function EditArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    api.get(`/articles/${id}`)
      .then(data => setArticle(data))
      .catch(err => alert("Erreur de récupération"));
  }, [id]);

  const handleUpdate = (formData) => {
    api.put(`/articles/${id}`, formData)
      .then(() => navigate('/my-articles'))
      .catch(err => alert("Erreur : " + err.message));
  };

  if (!article) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: '30px auto' }}>
      <h1>Modifier l'article</h1>
      <ArticleForm 
        onSubmit={handleUpdate} 
        initialData={{ title: article.title, content: article.content }} 
        buttonText="Enregistrer les modifications"
      />
    </div>
  );
}