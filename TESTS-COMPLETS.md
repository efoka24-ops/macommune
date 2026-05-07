# Guide Complet - Tests Fonctionnels E2E

## 📊 État Actuel: ✅ TOUS LES TESTS RÉUSSIS (13/13)

Le système backend est **complètement fonctionnel** avec:
- ✅ JWT Authentication (JWT tokens générés et vérifiés)
- ✅ Role-based Access (Admin + Editor)
- ✅ CRUD Operations (Articles, Pages, Donations)
- ✅ Error Handling et Validation
- ✅ CMS Page Management

---

## 🚀 Commandes Rapides

### Lancer les tests
```bash
# Test E2E complet (Node.js)
npm run test:e2e

# Test API simplifié
node test-api-simple.js

# Test API original
npm run test:api
```

### Démarrer le serveur
```bash
# Backend seulement
npm run server

# Frontend + Backend (recommandé)
npm run dev
```

### Vérifier la santé du serveur
```bash
curl http://localhost:3001/api/health
```

---

## 🔐 Comptes de Test

| Rôle | Email | Mot de passe | Permissions |
|------|-------|--------------|-------------|
| Admin | `admin@macommune.cm` | `ChangeMe123!` | Tous les endpoints |
| Editor | `editor@macommune.cm` | `Editor123!` | Créer/modifier articles |

---

## 📋 Résultats Détaillés des 13 Tests

### ✅ Test 1: Health Check
**Endpoint:** `GET /api/health`
**Statut:** 200 OK
```json
{
  "status": "ok",
  "timestamp": "2026-05-07T13:22:58.766Z"
}
```

### ✅ Test 2: Admin Login
**Endpoint:** `POST /api/auth/login`
**Statut:** 200 OK
```json
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

### ✅ Test 3: Token Verification
**Endpoint:** `GET /api/auth/verify`
**Statut:** 200 OK
**Headers Requis:** `Authorization: Bearer {token}`
```json
{
  "valid": true,
  "user": {
    "userId": "admin@macommune.cm",
    "email": "admin@macommune.cm",
    "role": "admin",
    "iat": 1778160178,
    "exp": 1778246578
  }
}
```

### ✅ Test 4: List Articles
**Endpoint:** `GET /api/NewsArticle`
**Statut:** 200 OK
```json
[
  {
    "id": "news001",
    "title": "Grande mobilisation à Figuil",
    "content": "Plus de 500 habitants réunis pour un meeting",
    "excerpt": "Meeting historique",
    "category": "terrain",
    "canton": "figuil",
    "published": true,
    "created_date": "2026-03-10T10:00:00Z"
  },
  {
    "id": "news-1778160178800",
    "title": "Test Article - 2026-05-07T13:22:58.796Z",
    "content": "This article was created during E2E testing",
    "excerpt": "Test summary",
    "category": "terrain",
    "canton": "figuil",
    "published": true,
    "created_date": "2026-05-07T13:22:58.800Z"
  }
]
```

### ✅ Test 5: Create Article (Admin)
**Endpoint:** `POST /api/NewsArticle`
**Statut:** 201 Created
**Headers Requis:** `Authorization: Bearer {admin_token}`
**Body:**
```json
{
  "title": "Test Article - 2026-05-07T13:22:58.796Z",
  "content": "This article was created during E2E testing",
  "excerpt": "Test summary",
  "category": "terrain",
  "canton": "figuil",
  "published": true
}
```
**Réponse:**
```json
{
  "title": "Test Article - 2026-05-07T13:22:58.796Z",
  "content": "This article was created during E2E testing",
  "excerpt": "Test summary",
  "category": "terrain",
  "canton": "figuil",
  "published": true,
  "id": "news-1778160178800",
  "created_date": "2026-05-07T13:22:58.800Z"
}
```

### ✅ Test 6: Get CMS Page
**Endpoint:** `GET /api/pages/{key}`
**Exemple:** `GET /api/pages/about`
**Statut:** 200 OK
```json
{
  "about": {
    "hero": "About Emmanuel Foka Campaign",
    "content": "Updated content for about page - E2E Test",
    "lastUpdated": "2026-05-07T13:17:30.056Z"
  }
}
```

### ✅ Test 7: Update CMS Page (Admin)
**Endpoint:** `PUT /api/pages/{key}`
**Exemple:** `PUT /api/pages/about`
**Statut:** 200 OK
**Headers Requis:** `Authorization: Bearer {admin_token}`
**Body:**
```json
{
  "hero": "About Emmanuel Foka - Updated",
  "content": "This page was updated during E2E testing"
}
```
**Réponse:**
```json
{
  "about": {
    "hero": "About Emmanuel Foka - Updated",
    "content": "This page was updated during E2E testing"
  }
}
```

### ✅ Test 8: Initiate Donation
**Endpoint:** `POST /api/donations/initiate`
**Statut:** 200 OK
**Body:**
```json
{
  "amount": 5000,
  "phone_number": "237699123456",
  "donor_name": "Test Donor",
  "message": "Support for campaign"
}
```
**Réponse:**
```json
{
  "transactionId": "txn-1778160178814",
  "status": "PENDING",
  "amount": 5000,
  "phone_number": "237699123456"
}
```

### ✅ Test 9: Verify Donation
**Endpoint:** `GET /api/donations/verify`
**Statut:** 200 OK
```json
{
  "status": "PENDING",
  "amount": 5000,
  "network": "MTN"
}
```

### ✅ Test 10: Editor Login
**Endpoint:** `POST /api/auth/login`
**Statut:** 200 OK
**Body:**
```json
{
  "email": "editor@macommune.cm",
  "password": "Editor123!"
}
```
**Réponse:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "editor@macommune.cm",
    "email": "editor@macommune.cm",
    "full_name": "Editor",
    "role": "editor"
  }
}
```

### ✅ Test 11: Create Article (Editor)
**Endpoint:** `POST /api/NewsArticle`
**Statut:** 201 Created
**Headers Requis:** `Authorization: Bearer {editor_token}`
**Body:**
```json
{
  "title": "Editor Article - 2026-05-07T13:22:58.827Z",
  "content": "This article was created by editor role",
  "excerpt": "Editor summary",
  "category": "reunion",
  "canton": "lam",
  "published": true
}
```
**Réponse:**
```json
{
  "title": "Editor Article - 2026-05-07T13:22:58.827Z",
  "content": "This article was created by editor role",
  "excerpt": "Editor summary",
  "category": "reunion",
  "canton": "lam",
  "published": true,
  "id": "news-1778160178829",
  "created_date": "2026-05-07T13:22:58.829Z"
}
```

### ❌ Test 12: Failed Login (Intentionnel)
**Endpoint:** `POST /api/auth/login`
**Statut:** 401 Unauthorized
**Body:**
```json
{
  "email": "admin@macommune.cm",
  "password": "WrongPassword123"
}
```
**Réponse d'Erreur:**
```json
{
  "error": "Invalid email or password"
}
```

### ❌ Test 13: Validation Error (Intentionnel)
**Endpoint:** `POST /api/donations/initiate`
**Statut:** 400 Bad Request
**Body (Incomplet):**
```json
{
  "amount": 5000
}
```
**Réponse d'Erreur:**
```json
{
  "error": "Amount and phone number required"
}
```

---

## 🎯 Cas d'Usage Pratiques

### Cas 1: Créer un Article et le Publier

```bash
# 1. Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@macommune.cm",
    "password": "ChangeMe123!"
  }' | jq '.token' # Extraire le token

# 2. Créer l'article
TOKEN="your_token_here"
curl -X POST http://localhost:3001/api/NewsArticle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Notre plateforme se lance!",
    "content": "Bienvenue sur notre nouvelle plateforme de campagne...",
    "excerpt": "Le lancement officiel",
    "category": "annonce",
    "canton": "figuil",
    "published": true
  }'
```

### Cas 2: Vérifier si l'Utilisateur est Connecté

```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
curl -X GET http://localhost:3001/api/auth/verify \
  -H "Authorization: Bearer $TOKEN"

# Si statut 200: Utilisateur valide
# Si statut 401: Token expiré/invalide
```

### Cas 3: Parcourir les Articles d'un Canton

```bash
# Articles de Figuil
curl http://localhost:3001/api/NewsArticle | jq '.[] | select(.canton=="figuil")'

# Articles publiés
curl http://localhost:3001/api/NewsArticle | jq '.[] | select(.published==true)'
```

### Cas 4: Mettre à Jour la Page "À Propos"

```bash
TOKEN="your_admin_token"
curl -X PUT http://localhost:3001/api/pages/about \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "hero": "Qui sommes-nous?",
    "content": "Notre campagne pour Emmanuel Foka..."
  }'
```

### Cas 5: Accepter un Don et Vérifier le Paiement

```bash
# 1. Initialiser le don
curl -X POST http://localhost:3001/api/donations/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10000,
    "phone_number": "237690123456",
    "donor_name": "Jean Paul Cameroun",
    "message": "Soutien total à la campagne"
  }'

# 2. Vérifier le statut
curl http://localhost:3001/api/donations/verify | jq '.'
```

---

## 🔍 Dépannage

### Erreur: "Cannot connect to http://localhost:3001"
**Solution:** Assure-toi que le serveur est en cours d'exécution
```bash
npm run server
```

### Erreur: "Invalid token" (401)
**Solutions:**
1. Le token a expiré (24h) → Reconnexion
2. Le token a été mal copié → Vérifier la chaîne
3. Le format Bearer est incorrect → Utiliser `Authorization: Bearer {token}`

### Erreur: "Admin only" (403)
**Solution:** Utiliser un compte admin au lieu d'editor

### Les articles créés ne s'affichent pas
**Solution:** Vérifier le champ `published: true` dans la création

---

## 📚 Documentation Complète

Pour plus de détails, consulte:
- [API.md](API.md) - Documentation API complète
- [BACKEND.md](BACKEND.md) - Architecture backend
- [server.js](server.js) - Code source du serveur

---

## ✅ Checklist Déploiement

Avant de passer en production:

- [ ] Remplacer les credentials de test par des vrais comptes
- [ ] Ajouter une vraie base de données SQL (PostgreSQL/MySQL)
- [ ] Configurer les variables d'environnement (.env)
- [ ] Ajouter HTTPS/SSL
- [ ] Tester tous les endpoints avec production URLs
- [ ] Mettre en place la journalisation (logging)
- [ ] Ajouter le monitoring
- [ ] Sauvegarder les données
- [ ] Configurer les notifications par SMS/Email

---

## 🎉 Résumé

**Tous les 13 tests fonctionnels passent avec succès!**

Le backend est prêt pour:
- ✅ Tests d'intégration avec le frontend
- ✅ Déploiement en staging
- ✅ Tests utilisateurs
- ✅ Migration vers une vraie base de données (optionnel)

**Prochaines étapes:** Intégrer le frontend avec ces endpoints et tester les flux complets.
