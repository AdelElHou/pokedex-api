🐱‍👤 Projet Pokémon - Authentification & Gestion des Pokémon
🎯 Objectif
Ce projet est une application web de gestion de Pokémon avec un système d'authentification sécurisé basé sur JWT. Les utilisateurs peuvent se connecter, voir leurs Pokémon, et effectuer des recherches avancées. Un utilisateur admin peut accéder à tous les Pokémon.

🛠️ Fonctionnalités
🔐 Authentification (JWT)
Connexion / Inscription via formulaire.

Mots de passe sécurisés (bcrypt).

Stockage du token JWT côté client (localStorage).

Protection des routes (frontend + backend).

Déconnexion automatique après expiration du token.

📋 Gestion des Pokémon
Affichage dynamique des Pokémon possédés.

Filtres avancés (par types, HP, attaque, etc.).

Animation 3D des cartes Pokémon.

Accès Admin : voir tous les Pokémon.

🚀 Installation
Prérequis :
Node.js (v16+)

MongoDB local ou distant (Atlas)

1️⃣ Cloner le projet :
bash
Copier
Modifier
git clone https://github.com/ton-utilisateur/pokedex-auth.git
cd pokedex-auth
2️⃣ Installer les dépendances :
bash
Copier
Modifier
npm install
3️⃣ Créer un fichier .env :
env
Copier
Modifier
MONGO_URI=mongodb://localhost:27017/pokedex
JWT_SECRET=supersecret
4️⃣ Démarrer le backend :
bash
Copier
Modifier
npm run dev
5️⃣ Démarrer le frontend :
bash
Copier
Modifier
cd frontend
npm install
npm start
📂 Structure du Projet
markdown
Copier
Modifier
/models
  - User.js
  - Pokemon.js
  - Type.js
/middlewares
  - authMiddleware.js
/scripts
  - createUsers.js
/frontend
  - App.jsx
  - PokemonList.jsx
📡 API Documentation
🔑 Authentification

Méthode	Endpoint	Description
POST	/api/register	Inscription utilisateur
POST	/api/login	Connexion utilisateur
🐱‍🏍 Pokémon

Méthode	Endpoint	Description
GET	/api/pokemons	Récupère les Pokémon de l'utilisateur ou tous si admin
🎬 Démonstration Vidéo
👉 Voir la démo sur YouTube

📝 Livrables
 Code source sur GitHub.

 README.md complet.

 Vidéo de démonstration sur YouTube montrant :

L'authentification fonctionnelle.

Les filtres et animations sur les cartes Pokémon.

L'accès admin à tous les Pokémon.

💡 Conseils
Commencez par l'authentification avant la feature.

Testez régulièrement vos endpoints avec Postman.

Utilisez les best practices de sécurité pour l'authentification.

Commentez votre code et documentez vos API.

⏰ Date de remise : 27 avril
🤝 Crédits
Développé par [Ton Nom] - Projet pédagogique.