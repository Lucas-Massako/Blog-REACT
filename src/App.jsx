import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

// Importation de toutes les pages de ton architecture
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArticle from './pages/CreateArticle';
import EditArticle from './pages/EditArticle';
import MyArticles from './pages/MyArticles';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      {/* La Navbar reste affichée en haut de toutes les pages */}
      <Navbar /> 

      <main style={{ padding: '20px' }}>
        <Routes>
          {/* Routes Publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<div>Détail de l'article (à faire)</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes Privées (que l'on protégera avec ton ProtectedRoute plus tard) */}
          <Route path="/create" element={<CreateArticle />} />
          <Route path="/edit/:id" element={<EditArticle />} />
          <Route path="/my-articles" element={<MyArticles />} />

          {/* Route 404 - Pour toutes les URL inconnues */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;