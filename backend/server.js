require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');
const app = express();
app.use(cors());
app.use(express.json());

const Port = 3002;
const JWT_SECRET = process.env.JWT_SECRET;

// --- 1. AUTHENTIFICATION ---
const users = []; 
(async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    users.push({ id: 1, email: 'admin@example.com', password: hashedPassword });
})();

function requireAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token manquant' });
    }
    const token = authHeader.split(' ')[1];
   
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
}

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// --- 2. GESTION DES ARTICLES ---

// Voici la liste qui manquait !
let articles = [
    { 
        id: 1, 
        title: "Bienvenue sur mon Blog", 
        content: "Ceci est le tout premier article de mon blog en React !", 
        author: "admin@example.com", 
        date: new Date().toLocaleDateString() 
    }
];

// GET : Récupérer TOUS les articles (Route Publique)
app.get('/articles', (req, res) => {
    res.json(articles);
});

// POST : Créer un nouvel article (Route Privée)
app.post('/articles', requireAuth, (req, res) => {
    const newArticle = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content,
        author: req.user.email,
        date: new Date().toLocaleDateString()
    };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

// GET : Récupérer UN SEUL article par son ID (Route Publique)
app.get('/articles/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const article = articles.find(a => a.id === id);
    
    if (article) {
        res.json(article);
    } else {
        res.status(404).json({ message: "Article non trouvé" });
    }
});

// PUT : Modifier un article (Route Privée + Vérification de l'auteur)
app.put('/articles/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const index = articles.findIndex(a => a.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: "Article non trouvé" });
    }

    if (articles[index].author !== req.user.email) {
        return res.status(403).json({ message: "Non autorisé : vous n'êtes pas l'auteur" });
    }

    articles[index] = { ...articles[index], title: req.body.title, content: req.body.content };
    res.json(articles[index]);
});

// DELETE : Supprimer un article (Route Privée + Vérification de l'auteur)
app.delete('/articles/:id', requireAuth, (req, res) => {
    const id = parseInt(req.params.id);
    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({ message: "Article non trouvé" });
    }

    if (article.author !== req.user.email) {
        return res.status(403).json({ message: "Non autorisé : vous n'êtes pas l'auteur" });
    }

    articles = articles.filter(a => a.id !== id);
    res.status(204).send(); 
});

// --- DÉMARRAGE DU SERVEUR ---
app.listen(Port, () => {
    console.log(`Serveur démarré sur le port ${Port}`);
});