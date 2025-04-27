import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const typeImageMapping = {
  "Normal": "1.png",
  "Fighting": "2.png",
  "Flying": "3.png",
  "Poison": "4.png",
  "Ground": "5.png",
  "Rock": "6.png",
  "Bug": "7.png",
  "Ghost": "8.png",
  "Steel": "9.png",
  "Fire": "10.png",
  "Water": "11.png",
  "Grass": "12.png",
  "Electric": "13.png",
  "Psychic": "14.png",
  "Ice": "15.png",
  "Dragon": "16.png",
  "Dark": "17.png",
  "Fairy": "18.png"
};

const types = Object.keys(typeImageMapping);

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ types: [], minHP: '', maxHP: '', minAttack: '', maxAttack: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Appliquer le filtrage uniquement lorsque les filtres changent
  useEffect(() => {
    onSearch(searchTerm, filters);
  }, [searchTerm, filters, onSearch]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (type) => {
    setFilters((prevFilters) => {
      const newTypes = prevFilters.types.includes(type)
        ? prevFilters.types.filter((t) => t !== type) // Supprime si déjà sélectionné
        : [...prevFilters.types, type]; // Ajoute sinon

      return { ...prevFilters, types: newTypes };
    });
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔎 Rechercher un Pokémon..."
        value={searchTerm}
        onChange={handleChange}
      />

      {/* Sélecteur de types avec affichage multiple */}
      <div className="select-container">
        <div className="selected-types" onClick={() => setDropdownOpen(!dropdownOpen)}>
          {filters.types.length > 0 ? (
            filters.types.map((type) => (
              <img
                key={type}
                src={`src/assets/types/${typeImageMapping[type]}`}
                alt={type}
                className="selected-type-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFilterChange(type);
                }}
              />
            ))
          ) : (
            <span className="placeholder-text">Sélectionner des types</span>
          )}
        </div>

        {/* Liste déroulante des types */}
        {dropdownOpen && (
          <div className="custom-dropdown">
            {types.map((type) => (
              <div key={type} className={`dropdown-item ${filters.types.includes(type) ? 'selected' : ''}`} onClick={() => handleFilterChange(type)}>
                <img src={`src/assets/types/${typeImageMapping[type]}`} alt={type} className="type-icon" />
              </div>
            ))}
          </div>
        )}
      </div>

      <input type="number" name="minHP" placeholder="🔋 HP min" value={filters.minHP} onChange={(e) => setFilters({ ...filters, minHP: e.target.value })} />
      <input type="number" name="maxHP" placeholder="🛡️ HP max" value={filters.maxHP} onChange={(e) => setFilters({ ...filters, maxHP: e.target.value })} />
      <input type="number" name="minAttack" placeholder="⚔️ Attaque min" value={filters.minAttack} onChange={(e) => setFilters({ ...filters, minAttack: e.target.value })} />
      <input type="number" name="maxAttack" placeholder="💥 Attaque max" value={filters.maxAttack} onChange={(e) => setFilters({ ...filters, maxAttack: e.target.value })} />
    </div>
  );
};

export default SearchBar;
