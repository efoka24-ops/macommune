# Test E2E - Rapide d'exécution

## 📊 Résultats du Test Complet

### ✅ 13/13 Tests Réussis

```
✅ 1. Health Check (200)
✅ 2. Admin Login (200) - JWT Token généré
✅ 3. Token Verification (200)
✅ 4. List Articles (200)
✅ 5. Create Article (201) - Admin
✅ 6. Get CMS Page (200)
✅ 7. Update CMS Page (200) - Admin only
✅ 8. Initiate Donation (200)
✅ 9. Verify Donation (200)
✅ 10. Editor Login (200) - JWT Token généré
✅ 11. Create Article (201) - Editor
❌ 12. Failed Login Test (401) - Expected failure
❌ 13. Missing Fields Validation (400) - Expected failure
```

---

## 🚀 Comment Exécuter les Tests

### Test E2E Complet
```bash
# Assure-toi que le serveur est en cours d'exécution
npm run server

# Dans un autre terminal
npm run test:e2e
```

### Test API Existant
```bash
npm run test:api
```

### Démarrage Complet (Frontend + Backend)
```bash
npm run dev
```

---

## 🔐 Credentials de Test

### Admin
```
Email: admin@macommune.cm
Password: ChangeMe123!
Role: admin (accès complet)
```

### Editor
```
Email: editor@macommune.cm
Password: Editor123!
Role: editor (créer/modifier contenu)
```

---

## 📚 Exemples d'Utilisation avec cURL

### 1. Login et Obtenir un Token
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@macommune.cm",
    "password": "ChangeMe123!"
  }'

# Résponse:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "admin@macommune.cm",
    "email": "admin@macommune.cm",
    "full_name": "Administrator",
    "role": "admin"
  }
}
```

### 2. Vérifier le Token
```bash
curl -X GET http://localhost:3001/api/auth/verify \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"

# Résponse:
{
  "valid": true,
  "user": {
    "userId": "admin@macommune.cm",
    "email": "admin@macommune.cm",
    "role": "admin",
    "iat": 1778159850,
    "exp": 1778246250
  }
}
```

### 3. Obtenir les Articles
```bash
curl -X GET http://localhost:3001/api/NewsArticle
```

### 4. Créer un Article (Authentifié)
```bash
curl -X POST http://localhost:3001/api/NewsArticle \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon Article",
    "content": "Contenu de l'\''article...",
    "excerpt": "Résumé",
    "category": "terrain",
    "canton": "figuil",
    "published": true
  }'

# Résponse (201 Created):
{
  "id": "news-1778159850051",
  "title": "Mon Article",
  "content": "Contenu de l'article...",
  "excerpt": "Résumé",
  "category": "terrain",
  "canton": "figuil",
  "published": true,
  "created_date": "2026-05-07T13:17:30.051Z"
}
```

### 5. Obtenir une Page CMS
```bash
curl -X GET http://localhost:3001/api/pages/about
```

### 6. Modifier une Page CMS (Admin Seulement)
```bash
curl -X PUT http://localhost:3001/api/pages/about \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "hero": "À Propos d'\''Emmanuel Foka",
    "content": "Contenu de la page..."
  }'
```

### 7. Initier un Don
```bash
curl -X POST http://localhost:3001/api/donations/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5000,
    "phone_number": "237699123456",
    "donor_name": "Jean Dupont",
    "message": "Soutien à la campagne"
  }'

# Résponse:
{
  "transactionId": "txn-1778159850065",
  "status": "PENDING",
  "amount": 5000,
  "phone_number": "237699123456"
}
```

### 8. Vérifier le Statut d'un Don
```bash
curl -X GET http://localhost:3001/api/donations/verify
```

---

## 🛡️ Gestion des Erreurs

### Erreur d'Authentification
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@macommune.cm",
    "password": "MauvaisMotDePasse"
  }'

# Résponse (401):
{ "error": "Invalid email or password" }
```

### Erreur de Validation
```bash
curl -X POST http://localhost:3001/api/donations/initiate \
  -H "Content-Type: application/json" \
  -d '{ "amount": 5000 }'

# Résponse (400):
{ "error": "Amount and phone number required" }
```

### Erreur d'Autorisation
```bash
# Utilise un token d'editor pour modifier une page (admin only)
curl -X PUT http://localhost:3001/api/pages/about \
  -H "Authorization: Bearer EDITOR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "content": "..." }'

# Résponse (403):
{ "error": "Admin only" }
```

---

## 📝 Structure du Backend

```
server.js
├── Authentication (/api/auth)
│   ├── POST /login - Obtenir JWT
│   ├── POST /register - Créer utilisateur
│   └── GET /verify - Vérifier token
├── News Articles (/api/NewsArticle)
│   ├── GET / - Lister
│   └── POST / - Créer (auth requis)
├── CMS Pages (/api/pages/:key)
│   ├── GET / - Obtenir page
│   └── PUT / - Modifier (admin)
├── Donations (/api/donations)
│   ├── POST /initiate - Créer don
│   └── GET /verify - Vérifier statut
└── Health (/api/health) - État du serveur
```

---

## ✅ Checklist de Vérification

- [x] Backend démarre sans erreurs
- [x] Authentification fonctionnelle
- [x] JWT tokens générés correctement
- [x] Token verification fonctionne
- [x] Articles peuvent être listés
- [x] Articles peuvent être créés (authentifié)
- [x] Pages CMS peuvent être lues
- [x] Pages CMS peuvent être modifiées (admin)
- [x] Donations initiées correctement
- [x] Donations vérifiées
- [x] Gestion d'erreurs appropriée
- [x] Validation des données
- [x] Contrôle d'accès par rôle

---

## 🎯 Prochaines Étapes

1. **Frontend**: Intégrer le login et utiliser les tokens
2. **Base de données**: Passer à PostgreSQL pour production
3. **Migrations**: Exécuter les migrations Sequelize
4. **Deployment**: Déployer sur un serveur production
5. **Monitoring**: Ajouter des logs et monitoring

---

## 📞 Support

Si tu rencontres des problèmes:

1. Vérify que le serveur est en cours d'exécution: `npm run server`
2. Vérify le port 3001 est libre: `netstat -ano | findstr :3001`
3. Exécute les tests: `npm run test:e2e`
4. Vérifie les logs du serveur pour les erreurs
