import { Link } from 'react-router-dom';

export default function ArticleCard({ article }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h3>{article.title}</h3>
      <p style={{ color: '#666', fontSize: '0.9rem' }}>Par {article.author} le {article.date}</p>
      <p>{article.content.substring(0, 100)}...</p>
      <Link to={`/article/${article.id}`} style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>
        Lire la suite
      </Link>
    </div>
  );
}