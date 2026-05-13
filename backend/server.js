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

// --- 1. BASE DE DONNÉES TEMPORAIRE ---
let users = []; 
let articles = [
    { 
        id: 1, 
        title: "Bienvenue sur mon Blog", 
        content: "Ceci est le tout premier article de mon blog en React !", 
        author: "admin@example.com", 
        date: new Date().toLocaleDateString() 
    }
];

// Création d'un compte admin au démarrage
(async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    users.push({ id: 1, email: 'admin@example.com', password: hashedPassword });
})();

// Middleware de protection des routes
function requireAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalide' });
    }
}

// --- 2. ROUTES D'AUTHENTIFICATION ---

// Inscription
app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: "Compte créé" });
});

// Connexion
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

// --- 3. ROUTES DES ARTICLES ---

app.get('/articles', (req, res) => res.json(articles));

app.get('/articles/:id', (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    article ? res.json(article) : res.status(404).send();
});

app.post('/articles', requireAuth, (req, res) => {
    const newArticle = { id: Date.now(), ...req.body, author: req.user.email, date: new Date().toLocaleDateString() };
    articles.push(newArticle);
    res.status(201).json(newArticle);
});

app.get('/my-articles', requireAuth, (req, res) => {
    res.json(articles.filter(a => a.author === req.user.email));
});

app.put('/articles/:id', requireAuth, (req, res) => {
    const index = articles.findIndex(a => a.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).send();
    if (articles[index].author !== req.user.email) return res.status(403).send();
    articles[index] = { ...articles[index], ...req.body };
    res.json(articles[index]);
});

app.delete('/articles/:id', requireAuth, (req, res) => {
    const article = articles.find(a => a.id === parseInt(req.params.id));
    if (!article) return res.status(404).send();
    if (article.author !== req.user.email) return res.status(403).send();
    articles = articles.filter(a => a.id !== article.id);
    res.status(204).send();
});

app.listen(Port, () => console.log(`Serveur démarré sur le port ${Port}`));