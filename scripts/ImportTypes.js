import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Type from '../src/models/Type.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const typesDir = path.join(__dirname, '../assets/types');

// Correspondance entre numéro de fichier et nom de type
const typeMap = {
  1: "normal",
  2: "fighting",
  3: "flying",
  4: "poison",
  5: "ground",
  6: "rock",
  7: "bug",
  8: "ghost",
  9: "steel",
  10: "fire",
  11: "water",
  12: "grass",
  13: "electric",
  14: "psychic",
  15: "ice",
  16: "dragon",
  17: "dark",
  18: "fairy"
};

// Génère la liste des types à importer
const types = Object.entries(typeMap).map(([num, name]) => {
  const imagePath = path.join(typesDir, `${num}.png`);
  if (!fs.existsSync(imagePath)) {
    console.warn(`❗ Image manquante pour le type : ${name} (${num}.png)`);
    return null;
  }

  const buffer = fs.readFileSync(imagePath);
  const image = `data:image/png;base64,${buffer.toString('base64')}`;
  return { name, image };
}).filter(Boolean);

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Type.deleteMany(); // Vide la collection
  await Type.insertMany(types); // Insère les types corrects
  console.log('✅ Types réimportés avec noms corrects et images base64.');
  process.exit();
};

run();
