# 🔐 TP : Authentification avec Express, Bcrypt et JWT

## 🎯 Objectifs

- Créer une API Express avec un système d'inscription et de connexion
- Stocker les utilisateurs en mémoire
- Sécuriser les mots de passe avec **bcrypt**
- Gérer l’authentification avec **JWT**

---

## 🛠️ Étape 1 : Création du projet Express

```bash
npm init -y
npm install express jsonwebtoken bcrypt
npm install nodemon --save-dev
```

Ajoutez un script dans le `package.json` :
```js
"scripts": {
  "dev": "nodemon index.js"
}
```

## 📁 Étape 2 : Mise en place du serveur

Créez le fichier `index.js` :

```js
const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () => console.log('🚀 Serveur lancé sur http://localhost:3000'));

```

## 👤 Étape 3 : Création du modèle User

Version simple en mémoire :

```
const users = []; // [{ email, passwordHash }]
```

## 🔐 Étape 4 : Route /register (Inscription)

```js
const bcrypt = require('bcrypt');

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  const userExists = users.find(user => user.email === email);
  if (userExists) return res.status(400).json({ message: 'Utilisateur déjà inscrit' });

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ email, passwordHash });

  res.status(201).json({ message: 'Utilisateur créé ✅' });
});
```

## 🔑 Étape 5 : Route /login (Connexion)

```js
const jwt = require('jsonwebtoken');
const SECRET = 'monsecretdev'; // à stocker dans une variable d'environnement normalement. Bonus 

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email);
  if (!user) return res.status(401).json({ message: 'Identifiants invalides' });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: 'Mot de passe incorrect' });

  const token = jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

```

## 🔍 Tests à faire avec Thunder Client

    ✅ POST /register avec { "email": "alice@example.com", "password": "1234" }

    ✅ POST /login avec les bons identifiants → vous recevez un token

    ❌ POST /login avec un mauvais mot de passe → erreur 401

## 🧹 Modularité 

Pour améliorer la lisibilité et la maintenabilité de ton code, il est recommandé de séparer les responsabilités en plaçant les données des utilisateurs dans un fichier distinct. 

Pour cela, il faudra 
1. Créer un fichier `users.json` dans /data
2. Modifier les méthodes dans `index.js` pour qu'elles lisent et écrivent les nouvelles données.  





