# Projet Final - Authentication & Feature
## 🎯 Objectifs
Pour ce projet final, nous avons implémenté :

Un système d'authentification complet pour l'application Pokémon
Des fonctionnalités spécifiques assignées parmi les exigences du projet

## 📋 Réalisation de l'Authentification
Nous avons développé une solution d'authentification robuste avec :
### Frontend

Une page de connexion intuitive avec validation des champs
Une interface d'inscription sécurisée
Gestion complète des tokens JWT côté client
Protection des routes privées avec redirection automatique

### Backend

Routes d'authentification (login/register) entièrement fonctionnelles
Système avancé de génération et validation des JWT
Middleware de protection pour sécuriser les routes sensibles
Stockage sécurisé des mots de passe avec hachage bcrypt

## 🔍 Fonctionnalités spéciales implémentées
### Stockage d'images en Base64
Nous avons implémenté une solution permettant aux utilisateurs de télécharger des images de profil ou de Pokémon, qui sont ensuite converties et stockées en Base64 dans la base de données. Cette approche permet un stockage efficace tout en évitant la gestion complexe de fichiers externes.

### Sécurisation des mots de passe
Les mots de passe utilisateurs sont protégés grâce à un hachage robuste utilisant bcrypt avec un facteur de coût approprié, garantissant une sécurité optimale même en cas de fuite de données.

### Booster de type aléatoire
Nous avons développé un système innovant de "boosters" qui attribue des Pokémon aléatoires à l'utilisateur lors de certaines actions dans l'application, enrichissant ainsi l'expérience utilisateur avec un élément de surprise et de collection.
## 🔒 Bonnes pratiques de sécurité
Notre projet respecte les meilleures pratiques de sécurité :

Variables d'environnement stockées dans un fichier .env non versionné
Utilisation d'un secret JWT fort et complexe
Routes sensibles protégées par middleware d'authentification

## ✅ État du projet
Toutes les tâches requises ont été complétées avec succès :

Mise en place d'un front simple
Mise ne place d'un API et d'une BDD
Système d'authentification entièrement fonctionnel
Fonctionnalités spéciales implémentées et testées
Code bien documenté et structuré
API robuste et sécurisée

## 📹 Démonstration
Une vidéo démontrant toutes les fonctionnalités et aspects techniques du projet est disponible ici. https://youtu.be/qtiCk-OaHIw
## 📚 Documentation
La documentation complète de l'API, les instructions d'installation et les détails techniques sont disponibles dans le README du projet sur GitHub.
Le projet démontre notre maîtrise des technologies d'authentification modernes et notre capacité à implémenter des fonctionnalités avancées dans une application Pokémon complète et sécurisée.
