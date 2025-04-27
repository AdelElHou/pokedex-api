import React, { useEffect, useRef } from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [pokemon]);

  return (
    <div className="pokemon-card-container">
      <div className="pokemon-card" ref={cardRef}>
        <img src={pokemon.image} alt={pokemon.name.english} className="pokemon-image" />
        <h2>{pokemon.name.french} ({pokemon.name.english})</h2>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span key={type} className="type-pill">{type}</span>
          ))}
        </div>
        <div className="pokemon-stats">
          <p><strong>HP:</strong> {pokemon.stats.hp}</p>
          <p><strong>Attack:</strong> {pokemon.stats.attack}</p>
          <p><strong>Defense:</strong> {pokemon.stats.defense}</p>
          <p><strong>Sp. Atk:</strong> {pokemon.stats.specialAttack}</p>
          <p><strong>Sp. Def:</strong> {pokemon.stats.specialDefense}</p>
          <p><strong>Speed:</strong> {pokemon.stats.speed}</p>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
