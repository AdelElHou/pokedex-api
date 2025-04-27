import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';
import './PokemonList.css';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [typeImages, setTypeImages] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const cardRefs = useRef({});

  // Charger les Pokémon (admin ou user)
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/pokemons', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (res.status === 401) {
          throw new Error("Non autorisé");
        }

        const data = await res.json();
        setPokemons(data.pokemons);
        setFilteredPokemon(data.pokemons);
        setTypeImages(data.types);
      } catch (err) {
        console.error("Erreur API :", err);
        if (err.message === "Non autorisé") {
          localStorage.removeItem("token");
          window.location.reload();
        }
      }
    };

    fetchPokemons();
  }, []);

  const handleSearch = (searchTerm, filters) => {
    let filtered = pokemons.filter((pokemon) =>
      pokemon.name.french.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filters.types.length > 0) {
      filtered = filtered.filter((pokemon) =>
        filters.types.some((type) => pokemon.types.includes(type))
      );
    }

    if (filters.minHP) {
      filtered = filtered.filter((pokemon) => pokemon.stats.hp >= parseInt(filters.minHP, 10));
    }

    if (filters.maxHP) {
      filtered = filtered.filter((pokemon) => pokemon.stats.hp <= parseInt(filters.maxHP, 10));
    }

    if (filters.minAttack) {
      filtered = filtered.filter((pokemon) => pokemon.stats.attack >= parseInt(filters.minAttack, 10));
    }

    if (filters.maxAttack) {
      filtered = filtered.filter((pokemon) => pokemon.stats.attack <= parseInt(filters.maxAttack, 10));
    }

    setFilteredPokemon(filtered);
  };

  const handleMouseMove = (e, id) => {
    const card = cardRefs.current[id];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -20;
    const rotateY = ((x - centerX) / centerX) * 20;

    card.style.transition = 'transform 0.1s ease-out';
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseEnter = (id) => {
    setActiveCard(id);
  };

  const handleMouseLeave = (id) => {
    const card = cardRefs.current[id];
    if (card) {
      card.style.transition = 'transform 0.3s ease-out';
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
    setActiveCard(null);
  };

  return (
    <div className="pokemon-list-container">
      <SearchBar onSearch={handleSearch} />
      <div className="pokemon-list">
        {filteredPokemon.map((pokemon) => (
          <div
            key={pokemon.id}
            className={`pokemon-card ${activeCard === pokemon.id ? 'active' : ''}`}
            ref={(el) => (cardRefs.current[pokemon.id] = el)}
            onMouseMove={(e) => handleMouseMove(e, pokemon.id)}
            onMouseEnter={() => handleMouseEnter(pokemon.id)}
            onMouseLeave={() => handleMouseLeave(pokemon.id)}
          >
            <img src={pokemon.image} alt={pokemon.name.english} className="pokemon-image" />
            <h2 className="pokemon-name">{pokemon.name.french}</h2>
            <div className="pokemon-types">
              {pokemon.types.map((type) => (
                <img
                  key={type}
                  src={typeImages[type.toLowerCase()]}
                  alt={type}
                  className="type-icon"
                  title={type}
                />
              ))}
            </div>

            <div className="pokemon-stats">
              <p><strong>HP:</strong> {pokemon.stats.hp}</p>
              <p><strong>Attack:</strong> {pokemon.stats.attack}</p>
              <p><strong>Defense:</strong> {pokemon.stats.defense}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
