import { useState } from 'react';

// On utilise des "props" pour rendre le formulaire flexible (utile pour la modification plus tard)
const ArticleForm = ({ onSubmit, initialData = { title: '', content: '' }, buttonText = "Publier l'article" }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Veuillez remplir le titre et le contenu");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Titre de l'article"
          value={formData.title}
          onChange={handleChange}
          style={{ width: '100%', padding: '10px', fontSize: '1.1rem' }}
        />
      </div>
      <div>
        <textarea
          name="content"
          placeholder="Rédigez votre article ici..."
          value={formData.content}
          onChange={handleChange}
          rows="12"
          style={{ width: '100%', padding: '10px', fontFamily: 'inherit' }}
        />
      </div>
      <button type="submit" style={{ padding: '12px', background: '#333', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
        {buttonText}
      </button>
    </form>
  );
};

export default ArticleForm;