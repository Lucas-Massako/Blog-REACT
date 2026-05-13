const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

// 1. Fonction utilitaire pour récupérer le token et préparer les headers
const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        'Content-Type': 'application/json',
       
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
};

// 2. L'objet API avec toutes les méthodes CRUD sécurisées
export const api = {
    
    get: (url) => fetch(`${BASE_URL}${url}`, {
        headers: getHeaders()
    }).then(res => {
        if (!res.ok) throw new Error("Erreur de récupération");
        return res.json();
    }),

    // POST (Créer)
    post: (url, body) => fetch(`${BASE_URL}${url}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(body)
    }).then(res => {
        if (!res.ok) throw new Error("Erreur de création");
        return res.json();
    }),

    // PUT (Modifier - ex: cocher/décocher une tâche)
    put: (url, body) => fetch(`${BASE_URL}${url}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body)
    }).then(res => {
        if (!res.ok) throw new Error("Erreur de modification");
        return res.json();
    }),

    // DELETE (Supprimer)
    delete: (url) => fetch(`${BASE_URL}${url}`, {
        method: 'DELETE',
        headers: getHeaders()
    }).then(res => {
        if (!res.ok) throw new Error("Erreur de suppression");
        // On ne fait pas res.json() ici car notre route DELETE renvoie juste un statut 204 (sans JSON)
    })
};