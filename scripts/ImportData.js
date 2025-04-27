// server/scripts/importData.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Pokemon from '../src/models/Pokemon.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemins vers les fichiers
const dataPath = path.join(__dirname, '../src/data/pokemons.json');
const imagesDir = path.join(__dirname, '../assets/pokemons');

// Lecture du JSON
const rawPokemons = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Transformation des données
const pokemons = rawPokemons.map(p => {
  const imagePath = path.join(imagesDir, `${p.id}.png`);
  let imageBase64 = '';
  console.log(imagePath);
  if (fs.existsSync(imagePath)) {
    const buffer = fs.readFileSync(imagePath);
    imageBase64 = `data:image/png;base64,${buffer.toString('base64')}`;
    console.log(imageBase64);
  }

  return {
    id: p.id,
    name: {
      french: p.name.french,
      english: p.name.english,
      japanese: p.name.japanese,
      chinese: p.name.chinese
    },
    types: p.type.map(t => t.toLowerCase()), // pour coller à l'enum
    image: imageBase64,
    stats: {
      hp: p.base.HP,
      attack: p.base.Attack,
      defense: p.base.Defense,
      specialAttack: p.base['Sp. Attack'],
      specialDefense: p.base['Sp. Defense'],
      speed: p.base.Speed
    },
    evolutions: [] // vide pour l’instant
  };
});

// Insertion dans MongoDB
const run = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  await Pokemon.deleteMany();
  await Pokemon.insertMany(pokemons);

  console.log('✅ Importation réussie avec images encodées');
  process.exit();
};

run();
