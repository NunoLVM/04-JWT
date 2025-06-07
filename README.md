# 🔐 TP Partie 2 : Structuration des Routes avec express.Router()

## 🎯 Objectifs

- Organiser les routes de l'application de manière modulaire.

- Utiliser express.Router() pour regrouper les routes liées aux utilisateurs.

- Mettre en place une nouvelle branche Git pour gérer ces modifications.

---

## 🗂️ Etape 1 : Création du Dossier router et du Fichier users.js

Créez un dossier router à la racine de votre projet, puis un fichier users.js à l'intérieur :

## 🛠️ Etape 2 : Déplacement des Routes /login et /register dans users.js

Dans `router/users.js`, importez Express et créez un routeur :

```js
const express = require('express');
const router = express.Router();

```

Déplacez ensuite les routes /login et /register dans ce fichier

N'oubliez pas d'exporter le routeur à la fin du fichier :

```js
module.exports = router; 
```

## 🔗 Etape 3 : Intégration du Routeur dans index.js

Dans votre fichier principal `index.js`, importez le routeur et montez-le sur le chemin `/users` :

```
const express = require('express');
const app = express();
const usersRouter = require('./router/users');

app.use('/users', usersRouter);
```

Avec cette configuration, les routes seront accessibles via :
- POST `/users/register`
- POST `/users/login`

## 🌿 Etpae 4 : Gestion de la Branche Git feat_router

Pour suivre les bonnes pratiques de développement, créez une nouvelle branche Git pour ces modifications :

```bash
git checkout -b feat_router
git add .
git commit -m "Structuration des routes utilisateurs avec express.Router()"
git push origin feat_router
```

## ✅ Résumé

- Les routes liées aux utilisateurs sont désormais regroupées dans un fichier dédié pour une meilleure organisation.

- L'utilisation de express.Router() facilite la maintenance et l'évolution de votre application.

- La gestion des branches Git permet de suivre l'historique des modifications de manière claire et structurée.
