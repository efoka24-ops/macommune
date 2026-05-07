# 🧪 Guide de Test d'Intégration Frontend-Backend

## ✅ Statut Actuel
- ✅ Backend API (Express) fonctionnel sur port 3001
- ✅ Frontend React (Vite) fonctionnel sur port 5176
- ✅ Authentification JWT configurée
- ✅ Auth headers implémentés dans base44Client.js

## 🚀 Démarrage pour Tests

### Terminal 1 : Serveur API
```bash
cd c:\Users\YCXL3291\Documents\macommune
node --env-file=.env server.js
```
Devrait afficher: `✅ API server running at http://localhost:3001`

### Terminal 2 : Frontend Vite
```bash
cd c:\Users\YCXL3291\Documents\macommune
npm run dev
```
Ou directement:
```bash
npx vite
```
Devrait afficher: `➜  Local:   http://localhost:5176/`

## 🔐 Credentials de Test
- **Admin**: admin@macommune.cm / ChangeMe123!
- **Editor**: editor@macommune.cm / Editor123!

## 🧪 Test 1 : Login → Admin Dashboard

1. Ouvrir http://localhost:5176/login
2. Entrer credentials admin
3. ✅ Devrait rediriger vers /admin
4. ✅ Devrait afficher le dashboard avec stats

## 🧪 Test 2 : Admin News Page

1. Depuis /admin, cliquer "Nouvelle Actualité"
2. Devrait naviguer vers /admin/news
3. ✅ Devrait charger la liste des articles via GET /api/NewsArticle
4. ✅ Devrait afficher le formulaire de création

## 🧪 Test 3 : Créer un Article

1. Sur /admin/news, cliquer "Nouvel Article"
2. Remplir: titre, contenu, image, catégorie, canton
3. Cliquer "Enregistrer"
4. ✅ POST /api/NewsArticle avec token Bearer
5. ✅ Devrait créer l'article et recharger la liste

## 🧪 Test 4 : Admin Pages (Paramètres)

1. Depuis /admin, cliquer "Gérer les Pages"
2. Devrait naviguer vers /admin/pages
3. ✅ Devrait charger les données via GET /api/pages/about
4. ✅ Devrait afficher formulaire d'édition

## 🧪 Test 5 : Logout

1. Depuis /admin, chercher bouton Logout
2. ✅ Devrait supprimer le token de localStorage
3. ✅ Devrait rediriger vers /login

## 🔍 Diagnostic

### Si le login échoue :
```bash
# Test direct de l'API
Invoke-WebRequest -Uri http://localhost:3001/api/auth/login `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"admin@macommune.cm","password":"ChangeMe123!"}'
```

### Si proxy Vite ne fonctionne pas :
```bash
# Vérifier que Vite est en dev mode
# Vérifier que l'API répond
Invoke-WebRequest http://localhost:3001/api/health
```

## 📊 Checklist de Succès

- [ ] Frontend charge sur http://localhost:5176
- [ ] Page login s'affiche
- [ ] Login réussit avec credentials admin
- [ ] Redirection vers /admin fonctionne
- [ ] Dashboard affiche les stats
- [ ] Page /admin/news charge
- [ ] Liste des articles s'affiche
- [ ] Créer article fonctionne
- [ ] Page /admin/pages charge
- [ ] Modifier page fonctionne
- [ ] Logout fonctionne

## 🎯 Prochaines Étapes
1. ✅ API Backend - 100% opérationnel
2. ✅ Frontend - 100% opérationnel  
3. **EN COURS**: Intégration frontend-backend
4. TODO: Tester création de contenu
5. TODO: Tester suppression de contenu
6. TODO: Tester editor role
