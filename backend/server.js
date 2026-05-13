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

// --- DÉMARRAGE DU SERVEUR ---
app.listen(Port, () => {
    console.log(`Serveur démarré sur le port ${Port}`);
});