import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import User from '../src/models/User.js';
import Pokemon from '../src/models/Pokemon.js';

dotenv.config();

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("✅ Connecté à MongoDB pour créer les utilisateurs");

  // Récupérer TOUS les pokémons existants
  const allPokemons = await Pokemon.find();
  if (allPokemons.length === 0) {
    console.error("❌ Aucun Pokémon trouvé en base.");
    mongoose.connection.close();
    return;
  }

  const allPokemonIds = allPokemons.map(p => p.id);
  console.log(`✅ ${allPokemonIds.length} Pokémons trouvés.`);

  // Hash des mots de passe
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const hashedUserPassword = await bcrypt.hash('user123', 10);

  // Supprimer anciens utilisateurs
  await User.deleteMany({});

  // Créer Admin
  await User.create({
    email: 'admin@admin.com',
    password: hashedAdminPassword,
    ownedPokemons: allPokemonIds
  });

  // Créer Utilisateur normal (avec seulement les 2 premiers Pokémon de la base)
  await User.create({
    email: 'user@user.com',
    password: hashedUserPassword,
    ownedPokemons: allPokemonIds.slice(0, 2)
  });

  console.log("✅ Utilisateurs créés : admin@admin.com / user@user.com");

  mongoose.connection.close();
}).catch((err) => {
  console.error("❌ Erreur :", err);
});
