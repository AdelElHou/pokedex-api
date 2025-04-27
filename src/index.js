<<<<<<< Updated upstream
import express from "express";
import cors from "cors";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import verifyToken from "./middlewares/verifytoken.js";
import getPokemonById from "./utils/getPokemonById.js";
import pokemonNotFound from "./utils/pokemonNotFound.js";
import writePokemonsList from "./utils/writePokemonList.js";
import {  postPokemons, getPokemons   } from "./controllers/pokemons.js";

=======
// index.js (backend complet avec JWT, login, pokemons protégés)

import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import Pokemon from './models/Pokemon.js';
import Type from './models/Type.js';
import User from './models/User.js';
import { authenticate } from './middlewares/authMiddleware.js';
>>>>>>> Stashed changes

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

<<<<<<< Updated upstream
// Middleware pour CORS
app.use(cors())

// Middleware pour parser le JSON
app.use(express.json());

// Middleware pour servir des fichiers statiques
// 'app.use' est utilisé pour ajouter un middleware à notre application Express
// '/assets' est le chemin virtuel où les fichiers seront accessibles
// 'express.static' est un middleware qui sert des fichiers statiques
// 'path.join(__dirname, '../assets')' construit le chemin absolu vers le dossier 'assets'
app.use("/assets", express.static(path.join(__dirname, "../assets")));



// Route GET de base
app.get("/api/pokemons", getPokemons)
 


app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    res.status(200).send({ token });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

app.get("/me", (req, res) => {
  try{
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  res.status(200).send({ username: decoded.username });
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
=======
// Middleware
app.use(cors());
app.use(express.json()); // ⬆️ Obligatoire pour req.body en POST
app.use("/assets", express.static(path.join(__dirname, "../assets")));

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connecté à MongoDB");
}).catch((err) => {
  console.error("❌ Erreur de connexion à MongoDB :", err);
});

app.get("/api/pokemons/all", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    // Vérifie si c'est bien l'admin (email correct)
    if (user.email !== 'admin@admin') {
      return res.status(403).json({ error: "Accès interdit" });
    }

    // Récupérer TOUS les Pokémon pour l'admin
    const pokemons = await Pokemon.find();

    // Charger les types avec leurs images
    const typesFromDB = await Type.find();
    const typesWithImages = typesFromDB.reduce((acc, t) => {
      acc[t.name.toLowerCase()] = t.image;
      return acc;
    }, {});

    res.status(200).send({
      types: typesWithImages,
      pokemons
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send({ error: "Erreur lors de la récupération des pokémons" });
>>>>>>> Stashed changes
  }
});



<<<<<<< Updated upstream
app.get("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  const pokemon = getPokemonById(id)

  if (!pokemon) {
    return pokemonNotFound(res)
  }

  return res.status(200).send({
    pokemon,
    message: "pokemon trouvé",
  });
});

app.delete("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  const pokemon = getPokemonById(id)
  if (!pokemon) {
      return pokemonNotFound(res)
  }
  const pokemonListWithoutSelectedPokemon = pokemonsList.filter((pokemon) => {
    return pokemon.id !== parseInt(id)
  })
  writePokemonsList(pokemonListWithoutSelectedPokemon)

  res.status(200).send({
    message: "pokemon supprimé",
  });
})

app.put("/api/pokemons/:id", (req, res) => {
  const id = req.params.id;
  console.log(req.params)
  const pokemon = getPokemonById(id)
  if (!pokemon) {
    return pokemonNotFound(res)
  }
  const indexOfPokemon = pokemonsList.indexOf(pokemon)
  
  pokemonsList.splice(indexOfPokemon, 1, req.body)
  
  writePokemonsList(pokemonsList)

  res.status(200).send({
    pokemon: pokemonsList[indexOfPokemon],
    message: "pokemon modifié",
  });
})

app.post("/api/pokemons", postPokemons)


app.get("/", (req, res) => {
  res.send("bienvenue sur l'API Pokémon");
=======
// Route inscription
app.post('/api/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email et mot de passe requis." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Définir les Pokémon de départ ici
    const starterPokemons = [1, 4, 7]; // Bulbizarre, Salamèche, Carapuce

    const user = await User.create({
      email,
      password: hashedPassword,
      ownedPokemons: starterPokemons // Ajouter les Pokémon de départ
    });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    res.status(201).json({ 
      token,
      user: {
        email: user.email
      }
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    res.status(500).json({ error: "Erreur lors de l'inscription." });
  }
});

// Route login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Champs requis." });

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "Utilisateur inconnu." });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Mot de passe incorrect." });

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ 
    token,
    user: {
      email: user.email
    }
  });
});

// Route protégée pour les pokémons de l'utilisateur
app.get("/api/pokemons", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    let pokemons;

    // Si l'email est celui de l'admin => tous les pokémons
    if (user.email === 'admin@admin.com') {
      pokemons = await Pokemon.find(); // TOUS les pokémons
    } else {
      // Sinon => seulement ceux que l'utilisateur possède
      pokemons = await Pokemon.find({
        id: { $in: user.ownedPokemons }
      });
    }

    // Charger les types avec leurs images
    const typesFromDB = await Type.find();
    const typesWithImages = typesFromDB.reduce((acc, t) => {
      acc[t.name.toLowerCase()] = t.image;
      return acc;
    }, {});

    res.status(200).send({
      types: typesWithImages,
      pokemons
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).send({ error: "Erreur lors de la récupération des pokémons" });
  }
>>>>>>> Stashed changes
});


app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Pokémon");
});

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});